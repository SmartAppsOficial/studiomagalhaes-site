/* Catálogo digital · vitrine da loja: apresentação, categorias, cardápio,
   montagem do item, carrinho e envio do pedido pelo WhatsApp. */
(() => {
  'use strict';
  const C = window.Catalogo, L = C.LOJA, I = window.ICONES;
  let V = C.visual, T = C.textos;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = C.esc, R = C.dinheiro;
  const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || ''}</svg>`;
  const lerLocal = (k, p) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : p; } catch { return p; } };
  const gravarLocal = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sem espaço */ } };
  const D = () => C.dados;
  const CH = 'sm-catalogo:' + L.id;

  /* ---------- Tema da loja ---------- */
  function lum(h) { const n = parseInt(h.slice(1), 16), c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; }
  const tinta = h => (lum(h) > .4 ? '#1e130e' : '#ffffff');
  const FONTES_LOCAIS = new Set(['Bricolage Grotesque', 'DM Sans', 'Fraunces', 'Nunito Sans', 'Montserrat', 'Inter', 'Playfair Display', 'Source Sans 3']);
  const fontesCarregadas = new Set();
  function garantirFonte(stack) {
    if (!stack) return;
    const m = stack.match(/['"]([^'"]+)['"]/);
    const nome = m && m[1];
    if (!nome || FONTES_LOCAIS.has(nome) || fontesCarregadas.has(nome)) return;
    fontesCarregadas.add(nome);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(nome).replace(/%20/g, '+')}:wght@400;600;700;800&display=swap`;
    document.head.appendChild(link);
  }
  const raiz = document.documentElement.style;
  function aplicarTema() {
    raiz.setProperty('--p', V.cores.p); raiz.setProperty('--d', V.cores.d);
    raiz.setProperty('--escuro', V.cores.escuro); raiz.setProperty('--fundo', V.cores.fundo);
    raiz.setProperty('--p-ink', tinta(V.cores.p)); raiz.setProperty('--d-ink', tinta(V.cores.d));
    raiz.setProperty('--f-t', V.fontes.t); raiz.setProperty('--f-c', V.fontes.c);
    garantirFonte(V.fontes.t); garantirFonte(V.fontes.c);
    document.body.dataset.heroEstilo = V.estiloHero || 'escuro';
    document.body.dataset.heroFundo = V.fundoHero || 'pontos';
    document.body.dataset.cantos = V.cantos || 'arredondado';
    document.body.dataset.grade = V.grade || 'horizontal';
    document.body.dataset.topo = V.topoEstilo || 'claro';
    document.title = `${V.nome} · ${V.segmento}`;
    const meta = $('meta[name="theme-color"]'); if (meta) meta.content = V.cores.escuro;
  }
  aplicarTema();
  if (L.tipo === 'loja') document.body.classList.add('modo-loja');
  const marca = () => V.logo ? `<img src="${esc(V.logo)}" alt="">` : esc(V.sigla);

  /* ---------- Estado do cliente ---------- */
  const MESA = (new URLSearchParams(location.search).get('mesa') || '').trim().slice(0, 20);
  let carrinho = lerLocal(CH + ':carrinho', []);
  let ultimoPedido = lerLocal(CH + ':ultimo', null);
  const cliente = Object.assign({ tipo: '', bairro: '', endereco: '', compl: '', cep: '', cidadeUf: '', freteServ: '', nome: '', whats: '', pagamento: '', troco: '', obs: '' }, lerLocal(CH + ':cliente', {}));
  let freteInfo = null, freteCarregando = false, freteErro = '';
  const modoEntrega = () => V.entregaModo || 'entregadores';
  const temLocal = () => { const m = modoEntrega(); return (m === 'entregadores' || m === 'ambos') && !!D().loja.entrega.ativa; };
  const temCorreios = () => { const m = modoEntrega(); return m === 'correios' || m === 'ambos'; };
  const temRetirada = () => { const m = modoEntrega(); return m === 'correios' ? false : (m === 'nenhuma' ? true : !!D().loja.retirada); };
  function estimarFrete(cepLimpo, uf) {
    const orig = String(V.cepOrigem || '24220000').replace(/\D/g, '').padEnd(8, '0');
    const regO = orig[0], regD = cepLimpo[0];
    const mesmaRegiao = regO === regD;
    const sudeste = ['0', '1', '2', '3'].includes(regO) && ['0', '1', '2', '3'].includes(regD);
    const qtd = Math.max(1, totalItens());
    const pesoExtra = Math.max(0, qtd - 2) * 3.5;
    if (mesmaRegiao) return [
      { id: 'PAC', nome: 'PAC · Correios', prazo: '3 a 6 dias úteis', valor: Math.round((18.9 + pesoExtra) * 100) / 100 },
      { id: 'SEDEX', nome: 'SEDEX · Correios', prazo: '1 a 3 dias úteis', valor: Math.round((29.9 + pesoExtra) * 100) / 100 }
    ];
    if (sudeste) return [
      { id: 'PAC', nome: 'PAC · Correios', prazo: '5 a 8 dias úteis', valor: Math.round((24.9 + pesoExtra) * 100) / 100 },
      { id: 'SEDEX', nome: 'SEDEX · Correios', prazo: '2 a 4 dias úteis', valor: Math.round((42.9 + pesoExtra) * 100) / 100 }
    ];
    return [
      { id: 'PAC', nome: 'PAC · Correios', prazo: '7 a 12 dias úteis', valor: Math.round((32.9 + pesoExtra) * 100) / 100 },
      { id: 'SEDEX', nome: 'SEDEX · Correios', prazo: '3 a 6 dias úteis', valor: Math.round((58.9 + pesoExtra) * 100) / 100 }
    ];
  }
  async function consultarCep(cepBruto) {
    const cep = String(cepBruto || '').replace(/\D/g, '').slice(0, 8);
    if (cep.length !== 8) { freteErro = 'Digite um CEP válido com 8 números.'; freteInfo = null; manterRolagem(renderCarrinho); return; }
    freteCarregando = true; freteErro = ''; manterRolagem(renderCarrinho);
    let end = null;
    try {
      const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (r.ok) { const j = await r.json(); if (!j.erro) end = j; }
    } catch { /* sem internet: usa estimativa por faixa de CEP */ }
    freteCarregando = false;
    const ops = estimarFrete(cep, end?.uf || '');
    freteInfo = { cep, local: end ? `${end.localidade}/${end.uf}` : `CEP ${cep.slice(0, 5)}-${cep.slice(5)}`, ops };
    if (end) {
      cliente.cidadeUf = `${end.localidade}/${end.uf}`;
      if (end.logradouro && !cliente.endereco) cliente.endereco = `${end.logradouro}${end.bairro ? ' · ' + end.bairro : ''}`;
    }
    if (!cliente.freteServ || !ops.some(o => o.id === cliente.freteServ)) cliente.freteServ = ops[0].id;
    salvarCliente();
    manterRolagem(renderCarrinho);
  }
  if (MESA) cliente.tipo = 'mesa';
  const salvarCarrinho = () => gravarLocal(CH + ':carrinho', carrinho);
  const salvarUltimo = itens => { ultimoPedido = itens; gravarLocal(CH + ':ultimo', itens); };
  const salvarCliente = () => { const { obs, troco, ...resto } = cliente; gravarLocal(CH + ':cliente', resto); };
  const visivel = p => p && !p.pausado;
  const itensValidos = () => carrinho.filter(it => visivel(C.produto(it.produto)));
  const totalItens = () => itensValidos().reduce((s, it) => s + it.qtd, 0);
  const subtotal = () => itensValidos().reduce((s, it) => s + C.precoItem(it) * it.qtd, 0);

  /* ---------- Estrutura ---------- */
  const app = $('#app');
  app.innerHTML = `
${L.demo ? `<div class="demo-faixa" data-faixa></div>` : ''}
<header class="topo"><div class="caixa topo-in">
  <a class="logo" href="#inicio" data-marca></a>
  <span class="status" data-status></span>
  <div class="topo-acoes"><button type="button" class="btn-ic" data-abrir-carrinho aria-label="Ver pedido">${ic('sacola')}<span class="contador" data-contador></span></button></div>
</div></header>

<section class="hero" id="inicio">
  <div class="hero-fundo" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="caixa hero-in" data-hero></div>
</section>

<nav class="cats" aria-label="Categorias"><div class="caixa cats-in">
  <div class="cats-rolo"><button type="button" class="cats-seta esq" data-rolar="-1" aria-label="Ver categorias anteriores" hidden>${ic('esq')}</button>
    <div class="cats-lista" data-cats></div>
    <button type="button" class="cats-seta dir" data-rolar="1" aria-label="Ver mais categorias" hidden>${ic('dir')}</button></div>
  <label class="busca" data-busca>${ic('busca')}<input type="search" placeholder="${esc(T.busca || 'Buscar no cardápio')}" aria-label="${esc(T.busca || 'Buscar no cardápio')}"></label>
</div></nav>

<main id="cardapio">
  <section class="secao caixa" data-destaques></section>
  <div data-secoes></div>
</main>

<footer class="rodape"><div class="caixa" data-rodape></div></footer>

<button type="button" class="barra" data-barra hidden></button>
<div class="fundo-escuro" data-fundo hidden></div>
<section class="folha" data-folha="produto" role="dialog" aria-modal="true" hidden></section>
<section class="folha" data-folha="carrinho" role="dialog" aria-modal="true" aria-label="Seu pedido" hidden></section>
<div class="aviso" role="status" hidden></div>`;

  /* ---------- Marca e apresentação (mudam com o visual) ---------- */
  function renderMarca() {
    $('[data-marca]').innerHTML = `<span class="logo-sigla">${marca()}</span><span><span class="logo-nome">${esc(V.nome)}</span><span class="logo-seg">${esc(V.segmento)}</span></span>`;
    const f = $('[data-faixa]');
    if (f) f.innerHTML = C.ajustado()
      ? `Prévia do <b>Catálogo digital</b> para ${esc(V.nome)} · produtos e preços de exemplo · <a href="admin.html">ver a área da loja</a>`
      : `Loja de demonstração do <b>Catálogo digital</b> · nome, produtos e preços são exemplos · <a href="admin.html">ver a área da loja</a> · <a href="../">outros modelos</a>`;
  }
  function renderHero() {
    const palavras = T.titulo.split(' ').map((w, i) => `<span class="palavra" style="animation-delay:${120 + i * 90}ms">${esc(w)}</span>`).join(' ');
    const cena = V.cena !== 'nenhuma' && window.CENAS && window.CENAS[V.cena] ? window.CENAS[V.cena]() : null;
    const heroEl = $('[data-hero]');
    heroEl.classList.toggle('sem-cena', !cena);
    heroEl.innerHTML = `
    <div class="hero-texto">
      <span class="hero-selo">${esc(T.selo)}</span>
      <h1>${palavras}</h1>
      <p class="hero-sub">${esc(T.sub)}</p>
      <div class="hero-acoes"><a class="btn btn-p" href="#cardapio">${esc(T.botao)}${ic('seta')}</a>
        <button type="button" class="btn btn-claro" data-abrir-carrinho>${ic('sacola')}Meu pedido</button>
        ${(ultimoPedido && ultimoPedido.length) || L.repetirExemplo ? `<button type="button" class="btn btn-claro" data-repetir-ultimo>${ic('troca')}Repetir último pedido</button>` : ''}</div>
      <ul class="hero-infos" data-infos></ul>
    </div>
    ${cena ? `<div class="cena" data-cena><div class="cena-principal">${cena.principal}</div>
      ${cena.soltos.map(s => `<div class="solto" style="left:${s.x}%;top:${s.y}%;--t:${s.t};--prof:${s.p}"><div>${s.s}</div></div>`).join('')}</div>` : ''}`;
    renderInfos();
  }

  /* ---------- Partes que mudam com os dados ---------- */
  function renderStatus() {
    const s = C.situacao();
    const el = $('[data-status]'); el.className = 'status' + (s.aberta ? '' : ' fechada');
    el.innerHTML = `${esc(s.texto)} <small>${esc(s.detalhe)}</small>`;
  }
  function renderInfos() {
    const l = D().loja, out = [];
    if (temLocal()) out.push(`${ic('entrega')}Entrega ${esc(l.entrega.tempo)}`);
    if (temCorreios()) out.push(`${ic('entrega')}Correios (PAC e SEDEX para todo o Brasil)`);
    if (temRetirada()) out.push(`${ic('loja')}${modoEntrega() === 'nenhuma' ? 'Somente retirada no local' : (L.tipo === 'loja' ? 'Retirada na loja' : 'Retirada no balcão')}`);
    if (l.pedidoMinimo) out.push(`${ic('sacola')}Pedido mínimo ${R(l.pedidoMinimo)}`);
    $('[data-infos]').innerHTML = out.map(x => `<li>${x}</li>`).join('');
  }
  const produtosDa = cid => D().produtos.filter(p => p.cat === cid && visivel(p));
  const precoTexto = p => {
    const min = C.precoMinimo(p);
    const varia = (p.grupos || []).some(g => { const gr = C.grupo(g); return gr && gr.tipo === 'um' && gr.obrig && gr.itens.some(i => +i.preco !== +gr.itens[0].preco); });
    return varia ? `<small>a partir de</small>${R(min)}` : R(min);
  };
  const cartao = p => `<button type="button" class="prod${p.esgotado ? ' esgotado' : ''}" data-produto="${esc(p.id)}"${p.esgotado ? ' aria-disabled="true"' : ''}>
      <span class="prod-txt">${p.pecaUnica ? '<span class="etiqueta-unica">Peça única</span>' : ''}<b>${esc(p.nome)}</b><p>${esc(p.desc)}</p><span class="prod-preco">${precoTexto(p)}</span></span>
      <span class="prod-foto">${p.foto ? `<img src="${esc(p.foto)}" alt="" loading="lazy">` : ''}<span class="prod-mais" data-rapido>${ic('mais')}</span></span>
    </button>`;
  let termo = '';
  function renderCardapio() {
    const cats = D().categorias.filter(c => produtosDa(c.id).length);
    $('[data-cats]').innerHTML = cats.map((c, i) => `<button type="button" class="cat" data-cat="${esc(c.id)}" aria-current="${i === 0}">${c.icone ? ic(c.icone) : ''}${esc(c.nome)}</button>`).join('');
    const busca = termo.trim().toLowerCase();
    const destaques = D().produtos.filter(p => p.destaque && visivel(p) && !p.esgotado);
    const dest = $('[data-destaques]');
    dest.hidden = !!busca || !destaques.length;
    dest.innerHTML = `<div class="secao-cab"><h2>Mais pedidos</h2><small>arraste para o lado</small></div>
      <div class="trilho">${destaques.map(p => `<button type="button" class="destaque" data-produto="${esc(p.id)}">${p.foto ? `<img src="${esc(p.foto)}" alt="" loading="lazy">` : ''}
        <span class="etiqueta">Destaque</span><span class="destaque-txt"><b>${esc(p.nome)}</b><span>${precoTexto(p).replace(/<small>.*?<\/small>/, 'a partir de ')}</span></span></button>`).join('')}</div>`;
    const bate = p => !busca || (p.nome + ' ' + p.desc).toLowerCase().includes(busca);
    const html = cats.map(c => {
      const lista = produtosDa(c.id).filter(bate);
      if (!lista.length) return '';
      return `<section class="secao caixa" id="cat-${esc(c.id)}" data-secao="${esc(c.id)}"><div class="secao-cab"><h2>${c.icone ? `<span class="secao-ic">${ic(c.icone)}</span>` : ''}${esc(c.nome)}</h2><small>${lista.length} ${lista.length === 1 ? 'item' : 'itens'}</small></div>
        <div class="grade">${lista.map(cartao).join('')}</div></section>`;
    }).join('');
    $('[data-secoes]').innerHTML = html || `<p class="vazio caixa">Nada encontrado para “${esc(termo)}”.</p>`;
    observarSecoes();
    requestAnimationFrame(() => typeof setas === 'function' && setas());
  }
  function renderRodape() {
    const l = D().loja;
    const linhas = C.DIAS.map((d, i) => { const h = l.horario[i] || []; return `<tr><td>${d}</td><td>${h.length ? h.map(([a, b]) => `${C.hora(a)} às ${C.hora(b)}`).join(' · ') : 'Fechado'}</td></tr>`; }).join('');
    $('[data-rodape]').innerHTML = `<div class="rodape-grade">
      <div><a class="logo" href="#inicio"><span class="logo-sigla">${marca()}</span><span><span class="logo-nome">${esc(V.nome)}</span></span></a>
        <p style="margin-top:14px">${esc(l.endereco)}<br>${esc(l.cidade)}</p>
        <p style="margin-top:12px"><a href="#" data-mapa>Como chegar</a></p>
        <h3 style="margin-top:22px">Pagamento</h3><p>${l.pagamentos.map(esc).join(' · ')}</p></div>
      <div><h3>Horário</h3><table>${linhas}</table></div>
      <div><h3>Entrega</h3><p>${temLocal() ? `Entregamos em ${l.entrega.bairros.map(b => esc(b.nome)).join(', ')}.` : ''}${temLocal() && temCorreios() ? '<br>' : ''}${temCorreios() ? 'Enviamos para todo o Brasil pelos Correios (PAC e SEDEX).' : ''}${!temLocal() && !temCorreios() ? 'No momento, somente retirada no local.' : ''}</p>
        ${temRetirada() && (temLocal() || temCorreios()) ? `<p style="margin-top:8px">${L.tipo === 'loja' ? 'Retirada na loja.' : 'Retirada no balcão.'}</p>` : ''}</div>
    </div>
    <div class="rodape-base"><span>© ${new Date().getFullYear()} ${esc(V.nome)}</span>
      <span>Catálogo digital por Studio Magalhães · <a href="admin.html">Área da loja</a></span></div>`;
  }
  function renderBarra() {
    const n = totalItens();
    $('[data-contador]').textContent = n || '';
    const b = $('[data-barra]');
    const folhaAberta = $$('.folha').some(f => !f.hidden);
    b.hidden = !n || folhaAberta;
    b.innerHTML = `<span class="qtd">${n}</span><span class="txt">${R(subtotal())}</span><span class="ir">Ver pedido${ic('dir')}</span>`;
  }
  function renderTudo() { renderMarca(); renderHero(); renderStatus(); renderCardapio(); renderRodape(); renderBarra(); }

  /* ---------- Setas das categorias (telas pequenas) ---------- */
  const listaCats = $('[data-cats]');
  function setas() {
    const max = listaCats.scrollWidth - listaCats.clientWidth;
    $('.cats-seta.esq').hidden = listaCats.scrollLeft < 8;
    $('.cats-seta.dir').hidden = listaCats.scrollLeft > max - 8;
  }
  listaCats.addEventListener('scroll', setas, { passive: true });
  window.addEventListener('resize', setas);
  $('.cats-rolo').addEventListener('click', e => { const b = e.target.closest('[data-rolar]'); if (b) listaCats.scrollBy({ left: +b.dataset.rolar * listaCats.clientWidth * .7, behavior: 'smooth' }); });

  /* ---------- Categorias: rolagem e destaque ---------- */
  let observador, secaoAtiva = '', timerCat;
  function centralizarCat(id, suave = false) {
    const btn = $(`.cat[data-cat="${CSS.escape(id)}"]`);
    if (!btn || listaCats.scrollWidth <= listaCats.clientWidth) return;
    const rLista = listaCats.getBoundingClientRect(), rBtn = btn.getBoundingClientRect();
    // durante rolagem natural, só mexe na faixa se o botão saiu da área visível
    if (!suave && rBtn.left >= rLista.left + 8 && rBtn.right <= rLista.right - 8) return;
    const destino = Math.max(0, Math.min(listaCats.scrollWidth - listaCats.clientWidth,
      listaCats.scrollLeft + (rBtn.left - rLista.left) - (rLista.width - rBtn.width) / 2));
    if (suave) listaCats.scrollTo({ left: destino, behavior: 'smooth' });
    else listaCats.scrollLeft = destino;
  }
  function observarSecoes() {
    observador?.disconnect();
    secaoAtiva = '';
    observador = new IntersectionObserver(ent => {
      const vis = ent.find(e => e.isIntersecting);
      if (!vis) return;
      const id = vis.target.dataset.secao;
      if (id === secaoAtiva) return;
      secaoAtiva = id;
      $$('.cat').forEach(b => b.setAttribute('aria-current', String(b.dataset.cat === id)));
      clearTimeout(timerCat);
      timerCat = setTimeout(() => centralizarCat(id, false), 140);
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('[data-secao]').forEach(s => observador.observe(s));
  }

  /* ---------- Cena: segue o mouse e o giroscópio (só quando o topo está visível) ---------- */
  const hero = $('.hero');
  {
    let heroVisivel = true, rafCena = 0, mxP = 0, myP = 0;
    const aplicarMov = () => {
      rafCena = 0;
      if (!heroVisivel) return;
      const c = $('[data-cena]'); if (!c) return;
      c.style.setProperty('--mx', mxP.toFixed(3)); c.style.setProperty('--my', myP.toFixed(3));
    };
    const mover = (x, y) => { if (!heroVisivel) return; mxP = x; myP = y; if (!rafCena) rafCena = requestAnimationFrame(aplicarMov); };
    new IntersectionObserver(ent => {
      heroVisivel = !!ent[0]?.isIntersecting;
      hero.classList.toggle('pausado', !heroVisivel);
    }, { threshold: 0.01 }).observe(hero);
    hero.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      const r = hero.getBoundingClientRect();
      mover((e.clientX - r.left) / r.width * 2 - 1, (e.clientY - r.top) / r.height * 2 - 1);
    });
    hero.addEventListener('pointerleave', () => mover(0, 0));
    window.addEventListener('deviceorientation', e => {
      if (!heroVisivel || e.gamma == null) return;
      mover(Math.max(-1, Math.min(1, e.gamma / 30)), Math.max(-1, Math.min(1, (e.beta - 40) / 30)));
    }, { passive: true });
  }

  /* ---------- Folhas ---------- */
  const fundo = $('[data-fundo]');
  function abrirFolha(nome) {
    $$('.folha').forEach(f => { f.hidden = f.dataset.folha !== nome; });
    fundo.hidden = false; document.body.classList.add('travado'); renderBarra();
    setTimeout(() => $(`[data-folha="${nome}"] .folha-corpo`)?.scrollTo(0, 0), 0);
  }
  function fecharFolhas() { $$('.folha').forEach(f => { f.hidden = true; }); fundo.hidden = true; document.body.classList.remove('travado'); renderBarra(); }
  fundo.addEventListener('click', fecharFolhas);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharFolhas(); });

  let avisoT;
  function aviso(txt, icone = 'check') {
    const a = $('.aviso'); a.innerHTML = ic(icone) + esc(txt); a.hidden = false;
    a.style.animation = 'none'; void a.offsetWidth; a.style.animation = '';
    clearTimeout(avisoT); avisoT = setTimeout(() => { a.hidden = true; }, 2400);
  }

  /* ---------- Montar o item ---------- */
  let montando = null;
  function dataMinima(dias = 0) {
    const d = new Date(); d.setDate(d.getDate() + (+dias || 0));
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function grupoFalta(g) {
    if (!g || !g.obrig) return false;
    if (g.tipo === 'um') return !(montando.escolhas[g.id] || []).length;
    if (g.tipo === 'varios') return (montando.escolhas[g.id] || []).length < (+g.min || 1);
    if (g.tipo === 'texto' || g.tipo === 'data') return !String((montando.campos || {})[g.id] || '').trim();
    return false;
  }
  function faltando(lista) {
    const p = C.produto(montando.produto), out = [];
    for (const gid of (lista || p.grupos || [])) {
      const g = C.grupo(gid);
      if (grupoFalta(g)) out.push(g.nome.toLowerCase());
    }
    return out;
  }
  function abrirProduto(id) {
    const p = C.produto(id); if (!p || p.esgotado) return;
    montando = { produto: id, escolhas: {}, campos: {}, meio: '', qtd: 1, obs: '', passo: 0 };
    for (const gid of p.grupos || []) { const g = C.grupo(gid); if (g && g.tipo === 'um' && g.obrig && g.itens.length === 1) montando.escolhas[gid] = [0]; }
    renderProduto(); abrirFolha('produto');
  }
  function renderGrupo(p, g) {
    if (g.tipo === 'meio') {
      const outros = D().produtos.filter(o => o.cat === p.cat && o.id !== p.id && visivel(o) && !o.esgotado);
      if (!outros.length) return '';
      return `<div class="grupo"><div class="grupo-cab"><div><b>${esc(g.nome)}</b><small>Escolha um segundo sabor. Vale o preço do mais caro.</small></div></div>
        <label class="op"><input type="radio" name="meio" value=""${!montando.meio ? ' checked' : ''}><span class="marca"></span><span class="op-nome">Só ${esc(p.nome)}</span></label>
        ${outros.map(o => `<label class="op"><input type="radio" name="meio" value="${esc(o.id)}"${montando.meio === o.id ? ' checked' : ''}><span class="marca"></span>
          ${o.foto ? `<img src="${esc(o.foto)}" alt="">` : ''}<span class="op-nome">Metade ${esc(o.nome)}</span><span class="op-preco">${o.preco > p.preco ? '+ ' + R(o.preco - p.preco) : ''}</span></label>`).join('')}</div>`;
    }
    if (g.tipo === 'texto' || g.tipo === 'data') {
      const val = String((montando.campos || {})[g.id] || '');
      const ok = !!val.trim();
      const sub = g.dica || (g.tipo === 'data'
        ? (g.antecedencia ? `Pedido com pelo menos ${g.antecedencia} ${g.antecedencia === 1 ? 'dia' : 'dias'} de antecedência` : 'Escolha o dia desejado')
        : 'Escreva como preferir');
      const selo = g.obrig ? `<span class="obrig${ok ? ' ok' : ''}" data-selo="${esc(g.id)}">${ok ? 'Pronto' : 'Obrigatório'}</span>` : '';
      const controle = g.tipo === 'data'
        ? `<input class="entrada" type="date" data-campo="${esc(g.id)}" value="${esc(val)}" min="${dataMinima(g.antecedencia || 0)}">`
        : `<input class="entrada" type="text" data-campo="${esc(g.id)}" value="${esc(val)}" maxlength="${+g.max || 100}" placeholder="${esc(g.placeholder || 'Escreva aqui')}">`;
      return `<div class="grupo"><div class="grupo-cab"><div><b>${esc(g.nome)}</b><small>${esc(sub)}</small></div>${selo}</div>
        <div class="campo-grupo">${controle}</div></div>`;
    }
    const sel = montando.escolhas[g.id] || [];
    const tipo = g.tipo === 'varios' ? 'checkbox' : 'radio';
    const cheio = g.tipo === 'varios' && g.max && sel.length >= g.max;
    const sub = g.tipo === 'varios' ? (g.max ? `Escolha até ${g.max}` : 'Escolha quantos quiser') : 'Escolha 1';
    const ok = g.tipo === 'varios' ? sel.length >= (+g.min || 1) : !!sel.length;
    const selo = g.obrig ? `<span class="obrig${ok ? ' ok' : ''}">${ok ? 'Pronto' : 'Obrigatório'}</span>` : '';
    const nenhum = g.tipo === 'um' && !g.obrig ? `<label class="op"><input type="radio" name="g-${esc(g.id)}" value="-1"${!sel.length ? ' checked' : ''}><span class="marca"></span><span class="op-nome">Sem ${esc(g.nome.toLowerCase())}</span></label>` : '';
    return `<div class="grupo"><div class="grupo-cab"><div><b>${esc(g.nome)}</b><small>${sub}</small></div>${selo}</div>${nenhum}
      ${g.itens.map((it, i) => `<label class="op"><input type="${tipo}" name="g-${esc(g.id)}" value="${i}"${sel.includes(i) ? ' checked' : ''}${cheio && !sel.includes(i) ? ' disabled' : ''}><span class="marca"></span>
        <span class="op-nome">${it.cor ? `<span class="op-cor" style="background:${esc(it.cor)}"></span>` : ''}${esc(it.nome)}</span><span class="op-preco">${+it.preco ? '+ ' + R(it.preco) : ''}</span></label>`).join('')}</div>`;
  }
  function renderProduto() {
    const p = C.produto(montando.produto), f = $('[data-folha="produto"]');
    f.setAttribute('aria-label', p.nome);
    const listaGrupos = (p.grupos || []).map(gid => C.grupo(gid)).filter(Boolean);
    const porPassos = !!p.passos && listaGrupos.length > 1;
    const passo = porPassos ? Math.max(0, Math.min(listaGrupos.length - 1, montando.passo || 0)) : 0;
    montando.passo = passo;
    const ultimoPasso = !porPassos || passo === listaGrupos.length - 1;
    const gruposHTML = porPassos ? renderGrupo(p, listaGrupos[passo]) : listaGrupos.map(g => renderGrupo(p, g)).join('');
    const passosHTML = porPassos ? `<div class="passos">
      <div class="passos-topo"><b>Passo ${passo + 1} de ${listaGrupos.length}</b><small>${esc(listaGrupos[passo].nome)}</small></div>
      <div class="passos-barra"><i style="width:${Math.round(((passo + 1) / listaGrupos.length) * 100)}%"></i></div>
      <div class="passos-trilha">${listaGrupos.map((g, i) => {
        const feito = i < passo || (!grupoFalta(g) && ((montando.escolhas[g.id] || []).length || String((montando.campos || {})[g.id] || '').trim()));
        return `<button type="button" class="passo-pill${feito ? ' ok' : ''}" data-passo-num="${i}" aria-current="${i === passo}"><span>${i + 1}</span>${esc(g.nome)}</button>`;
      }).join('')}</div></div>` : '';
    const resumoItens = porPassos && ultimoPasso ? C.detalhes({ ...montando, obs: '' }) : [];
    const resumoHTML = resumoItens.length ? `<div class="resumo-montagem"><b>Sua montagem</b><ul>${resumoItens.map(d => `<li>${esc(d)}</li>`).join('')}</ul></div>` : '';
    const falta = faltando();
    const faltaPasso = porPassos ? faltando([listaGrupos[passo].id]) : falta;
    const total = C.precoItem(montando) * montando.qtd;
    const obsPlaceholder = T.obsPlaceholder || 'Ex.: bem passada, sem orégano';
    const medidas = p.medidas === false ? null : (p.medidas || D().medidas || null);
    const medidasHTML = medidas && medidas.linhas && medidas.linhas.length ? `<details class="medidas-box"><summary>${esc(medidas.titulo || 'Tabela de medidas')}</summary>
      <table class="medidas-tab"><thead><tr>${medidas.colunas.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>
        <tbody>${medidas.linhas.map(ln => `<tr>${ln.map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></details>` : '';
    const peHTML = porPassos && !ultimoPasso
      ? `<div class="pe-linha">${passo > 0 ? `<button type="button" class="btn btn-borda btn-voltar" data-passo-ir="-1">${ic('esq')}Voltar</button>` : ''}
          <button type="button" class="btn btn-p btn-total" data-passo-ir="1"${faltaPasso.length ? ' disabled' : ''}>${faltaPasso.length ? `Escolha ${esc(faltaPasso[0])}` : `<span>Próximo: ${esc(listaGrupos[passo + 1].nome)}</span><span>${R(total)}</span>`}</button></div>`
      : `<div class="pe-linha">${porPassos ? `<button type="button" class="btn btn-borda btn-voltar-ic" data-passo-ir="-1" aria-label="Voltar passo">${ic('esq')}</button>` : ''}
          ${p.pecaUnica ? '' : `<span class="passo-qtd"><button type="button" data-qtd="-1" aria-label="Menos">${ic('menos')}</button><span>${montando.qtd}</span><button type="button" data-qtd="1" aria-label="Mais">${ic('mais')}</button></span>`}
          <button type="button" class="btn btn-p btn-total" data-adicionar${falta.length ? ' disabled' : ''}>${falta.length ? `Escolha ${esc(falta[0])}` : `<span>Adicionar</span><span>${R(total)}</span>`}</button></div>`;
    f.innerHTML = `<div class="folha-corpo" style="padding-top:0">
      <div class="pf-foto">${p.foto ? `<img src="${esc(p.foto)}" alt="">` : ''}<button type="button" class="fechar" data-fechar aria-label="Fechar">${ic('x')}</button></div>
      ${p.pecaUnica ? '<span class="etiqueta-unica" style="margin-bottom:6px">Peça única · estoque exclusivo</span>' : ''}
      <h3 class="pf-nome">${esc(p.nome)}</h3><p class="pf-desc">${esc(p.desc)}</p>
      ${medidasHTML}
      ${passosHTML}
      ${gruposHTML}
      ${resumoHTML}
      ${ultimoPasso ? `<label class="campo"><span>Alguma observação?</span><textarea class="entrada" data-obs placeholder="${esc(obsPlaceholder)}" maxlength="140">${esc(montando.obs)}</textarea></label>` : ''}
    </div>
    <div class="folha-pe">${peHTML}</div>`;
    if (porPassos) {
      const trilha = $('.passos-trilha', f), atual = $('.passo-pill[aria-current="true"]', f);
      if (trilha && atual) trilha.scrollLeft = Math.max(0, atual.offsetLeft - (trilha.clientWidth - atual.offsetWidth) / 2);
    }
  }
  function atualizarBotaoProduto() {
    const p = C.produto(montando.produto), f = $('[data-folha="produto"]');
    const listaGrupos = (p.grupos || []).map(gid => C.grupo(gid)).filter(Boolean);
    const porPassos = !!p.passos && listaGrupos.length > 1;
    const passo = montando.passo || 0;
    const total = C.precoItem(montando) * montando.qtd;
    const btnProx = $('[data-passo-ir="1"]', f);
    if (btnProx && porPassos) {
      const faltaPasso = faltando([listaGrupos[passo].id]);
      btnProx.disabled = !!faltaPasso.length;
      btnProx.innerHTML = faltaPasso.length ? `Escolha ${esc(faltaPasso[0])}` : `<span>Próximo: ${esc(listaGrupos[passo + 1].nome)}</span><span>${R(total)}</span>`;
    }
    const btnAdd = $('[data-adicionar]', f);
    if (btnAdd) {
      const falta = faltando();
      btnAdd.disabled = !!falta.length;
      btnAdd.innerHTML = falta.length ? `Escolha ${esc(falta[0])}` : `<span>Adicionar</span><span>${R(total)}</span>`;
    }
  }
  $('[data-folha="produto"]').addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.campo) {
      const gid = t.dataset.campo;
      (montando.campos ||= {})[gid] = t.value;
      const selo = $(`[data-selo="${CSS.escape(gid)}"]`, $('[data-folha="produto"]'));
      if (selo) { const ok = !!t.value.trim(); selo.className = 'obrig' + (ok ? ' ok' : ''); selo.textContent = ok ? 'Pronto' : 'Obrigatório'; }
      atualizarBotaoProduto();
      return;
    }
    if (t.name === 'meio') montando.meio = t.value;
    else if (t.name?.startsWith('g-')) {
      const gid = t.name.slice(2), g = C.grupo(gid), v = +t.value;
      if (g.tipo === 'varios') {
        const s = new Set(montando.escolhas[gid] || []); t.checked ? s.add(v) : s.delete(v);
        montando.escolhas[gid] = [...s].sort((a, b) => a - b);
      } else montando.escolhas[gid] = v < 0 ? [] : [v];
    } else return;
    const corpo = $('[data-folha="produto"] .folha-corpo'), y = corpo.scrollTop;
    renderProduto(); $('[data-folha="produto"] .folha-corpo').scrollTop = y;
  });
  $('[data-folha="produto"]').addEventListener('input', e => {
    const t = e.target;
    if (t.matches('[data-obs]')) { montando.obs = t.value; return; }
    if (t.dataset.campo) {
      const gid = t.dataset.campo;
      (montando.campos ||= {})[gid] = t.value;
      const selo = $(`[data-selo="${CSS.escape(gid)}"]`, $('[data-folha="produto"]'));
      if (selo) { const ok = !!t.value.trim(); selo.className = 'obrig' + (ok ? ' ok' : ''); selo.textContent = ok ? 'Pronto' : 'Obrigatório'; }
      atualizarBotaoProduto();
    }
  });
  $('[data-folha="produto"]').addEventListener('click', e => {
    if (e.target.closest('[data-fechar]')) { fecharFolhas(); return; }
    const ir = e.target.closest('[data-passo-ir]');
    if (ir) {
      const delta = +ir.dataset.passoIr;
      const p = C.produto(montando.produto);
      const listaGrupos = (p.grupos || []).map(gid => C.grupo(gid)).filter(Boolean);
      if (delta > 0 && faltando([listaGrupos[montando.passo].id]).length) return;
      montando.passo = Math.max(0, Math.min(listaGrupos.length - 1, (montando.passo || 0) + delta));
      renderProduto();
      $('[data-folha="produto"] .folha-corpo')?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const pill = e.target.closest('[data-passo-num]');
    if (pill) {
      const alvo = +pill.dataset.passoNum;
      const p = C.produto(montando.produto);
      const listaGrupos = (p.grupos || []).map(gid => C.grupo(gid)).filter(Boolean);
      if (alvo > montando.passo && faltando(listaGrupos.slice(0, alvo).map(g => g.id)).length) { aviso('Complete o passo obrigatório antes de avançar', 'info'); return; }
      montando.passo = alvo; renderProduto(); return;
    }
    const q = e.target.closest('[data-qtd]');
    if (q) { montando.qtd = Math.max(1, Math.min(50, montando.qtd + +q.dataset.qtd)); const y = $('[data-folha="produto"] .folha-corpo').scrollTop; renderProduto(); $('[data-folha="produto"] .folha-corpo').scrollTop = y; return; }
    if (e.target.closest('[data-adicionar]') && !faltando().length) {
      const { passo, ...itemLimpo } = montando;
      adicionar(itemLimpo);
    }
  });
  function adicionar(item) {
    item.uid = C.novoId('i');
    item.campos = item.campos || {};
    // junta com um item igual que já esteja no carrinho (exceto peça única, que trava em 1)
    const prod = C.produto(item.produto);
    const igual = carrinho.find(c => c.produto === item.produto && c.meio === item.meio && c.obs === item.obs
      && JSON.stringify(c.escolhas || {}) === JSON.stringify(item.escolhas || {})
      && JSON.stringify(c.campos || {}) === JSON.stringify(item.campos || {}));
    if (igual) igual.qtd = prod?.pecaUnica ? 1 : igual.qtd + item.qtd; else carrinho.push(item);
    salvarCarrinho(); fecharFolhas();
    aviso(`${C.produto(item.produto).nome} no pedido`, 'sacola');
  }

  /* ---------- Carrinho e envio ---------- */
  let erroEnvio = '', cupomCod = '', cupomDigitado = '', cupomErro = '';
  function calcularCupom(sub) {
    if (!cupomCod) return { cupom: null, desconto: 0, motivo: '' };
    const lista = D().cupons || [];
    const cp = lista.find(c => c.ativo !== false && String(c.codigo || '').trim().toUpperCase() === cupomCod);
    if (!cp) return { cupom: null, desconto: 0, motivo: 'Cupom inválido ou desativado.' };
    if (+cp.minimo && sub < +cp.minimo) return { cupom: cp, desconto: 0, motivo: `Válido para pedidos a partir de ${R(cp.minimo)}.` };
    const raw = cp.tipo === 'valor' ? (+cp.valor || 0) : sub * ((+cp.valor || 0) / 100);
    const desconto = Math.min(sub, Math.round(raw * 100) / 100);
    return { cupom: cp, desconto, motivo: '' };
  }
  function renderCarrinho() {
    const l = D().loja, f = $('[data-folha="carrinho"]'), itens = itensValidos();
    const uLoc = temLocal(), uCor = temCorreios(), uRet = temRetirada();
    if (MESA && !cliente.tipo) cliente.tipo = 'mesa';
    const valido = (cliente.tipo === 'mesa' && MESA) || (cliente.tipo === 'entrega' && uLoc) || (cliente.tipo === 'correios' && uCor) || (cliente.tipo === 'retirada' && uRet);
    if (!valido) cliente.tipo = MESA ? 'mesa' : (uLoc ? 'entrega' : uCor ? 'correios' : uRet ? 'retirada' : '');
    if (cliente.pagamento && !l.pagamentos.includes(cliente.pagamento)) cliente.pagamento = '';
    const bairro = l.entrega.bairros.find(b => b.nome === cliente.bairro);
    const cepLimpo = String(cliente.cep || '').replace(/\D/g, '');
    if (cliente.tipo === 'correios' && cepLimpo.length === 8 && (!freteInfo || freteInfo.cep !== cepLimpo) && !freteCarregando) {
      const ops = estimarFrete(cepLimpo);
      freteInfo = { cep: cepLimpo, local: cliente.cidadeUf || `CEP ${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5)}`, ops };
      if (!cliente.freteServ || !ops.some(o => o.id === cliente.freteServ)) cliente.freteServ = ops[0].id;
    }
    const freteOp = cliente.tipo === 'correios' && freteInfo ? freteInfo.ops.find(o => o.id === cliente.freteServ) : null;
    const taxa = cliente.tipo === 'entrega' && bairro ? +bairro.taxa : (freteOp ? +freteOp.valor : 0);
    const sub = subtotal(), sit = C.situacao();
    const { cupom, desconto, motivo: cupomMotivo } = calcularCupom(sub);
    const temCupons = (D().cupons || []).some(c => c.ativo !== false);
    const totalFinal = Math.max(0, Math.round((sub - desconto + taxa) * 100) / 100);
    const abaixo = l.pedidoMinimo && sub < l.pedidoMinimo;
    const lista = itens.map(it => { const p = C.produto(it.produto); return `<div class="item-car">${p.foto ? `<img src="${esc(p.foto)}" alt="">` : '<span></span>'}
        <div><b>${esc(p.nome)}</b><ul>${C.detalhes(it).map(d => `<li>${esc(d)}</li>`).join('')}</ul><div class="preco">${R(C.precoItem(it) * it.qtd)}</div></div>
        <span class="passo-qtd"><button type="button" data-car="${it.uid}" data-passo="-1" aria-label="Menos">${ic(it.qtd === 1 ? 'lixo' : 'menos')}</button><span>${it.qtd}</span><button type="button" data-car="${it.uid}" data-passo="1" aria-label="Mais">${ic('mais')}</button></span></div>`; }).join('');
    f.innerHTML = `<div class="folha-topo"><h3>Seu pedido</h3><button type="button" class="fechar" data-fechar aria-label="Fechar">${ic('x')}</button></div>
    <div class="folha-corpo">
      ${itens.length ? lista : `<p class="vazio">Seu pedido está vazio.<br>Escolha algo no ${L.tipo === 'loja' ? 'catálogo' : 'cardápio'}.${(ultimoPedido && ultimoPedido.length) || L.repetirExemplo ? `<br><br><button type="button" class="btn btn-borda" data-repetir-ultimo>${ic('troca')}Repetir último pedido</button>` : ''}</p>`}
      ${itens.length ? `
      <div class="campo"><span class="rotulo">Como você quer receber?</span><div class="escolha2">
        ${MESA ? `<button type="button" data-tipo="mesa" aria-pressed="${cliente.tipo === 'mesa'}">Na mesa ${esc(MESA)}<small>Servir no local</small></button>` : ''}
        ${uLoc ? `<button type="button" data-tipo="entrega" aria-pressed="${cliente.tipo === 'entrega'}">Entregador<small>${esc(l.entrega.tempo)}</small></button>` : ''}
        ${uCor ? `<button type="button" data-tipo="correios" aria-pressed="${cliente.tipo === 'correios'}">Correios<small>PAC ou SEDEX por CEP</small></button>` : ''}
        ${uRet ? `<button type="button" data-tipo="retirada" aria-pressed="${cliente.tipo === 'retirada'}">Retirar no local<small>${esc(l.tempoRetirada || '')}</small></button>` : ''}</div></div>
      ${cliente.tipo === 'mesa' && MESA ? `<div class="alerta">${ic('loja')}<span>Pedido para servir na <b>Mesa ${esc(MESA)}</b>.</span></div>` : ''}
      ${cliente.tipo === 'entrega' ? `
      <label class="campo"><span>Bairro</span><select class="entrada" data-cli="bairro"><option value="">Escolha o bairro</option>
        ${l.entrega.bairros.map(b => `<option value="${esc(b.nome)}"${b.nome === cliente.bairro ? ' selected' : ''}>${esc(b.nome)} · ${+b.taxa ? R(b.taxa) : 'grátis'}</option>`).join('')}</select></label>
      <label class="campo"><span>Rua e número</span><input class="entrada" data-cli="endereco" value="${esc(cliente.endereco)}" autocomplete="street-address" placeholder="Ex.: Rua das Flores, 120"></label>
      <label class="campo"><span>Complemento ou ponto de referência</span><input class="entrada" data-cli="compl" value="${esc(cliente.compl)}" placeholder="Ex.: apto 302, perto da praça"></label>` : ''}
      ${cliente.tipo === 'correios' ? `
      <div class="campo"><span class="rotulo">CEP de destino</span>
        <div class="cupom-linha"><input class="entrada" data-cli="cep" inputmode="numeric" maxlength="9" value="${esc(cliente.cep)}" placeholder="00000-000">
          <button type="button" class="btn btn-borda" data-calc-frete${freteCarregando ? ' disabled' : ''}>${freteCarregando ? 'Calculando...' : 'Calcular'}</button></div>
        ${freteErro ? `<div class="cupom-erro">${esc(freteErro)}</div>` : ''}
        ${freteInfo ? `<div class="chips" style="margin-top:10px">${freteInfo.ops.map(o => `<button type="button" data-frete="${esc(o.id)}" aria-pressed="${cliente.freteServ === o.id}">${esc(o.nome)} · <b>${R(o.valor)}</b><small style="display:block;font-weight:500;opacity:.8">${esc(o.prazo)}</small></button>`).join('')}</div>
          <p class="nota" style="text-align:left;margin-top:6px">Destino: <b>${esc(freteInfo.local)}</b> · Estimativa por região (na versão com Melhor Envio/Correios, o valor é exato na hora).</p>` : ''}</div>
      <label class="campo"><span>Rua, número e bairro</span><input class="entrada" data-cli="endereco" value="${esc(cliente.endereco)}" autocomplete="street-address" placeholder="Ex.: Rua das Flores, 120 · Centro"></label>
      <label class="campo"><span>Complemento (opcional)</span><input class="entrada" data-cli="compl" value="${esc(cliente.compl)}" placeholder="Ex.: apto 302, bloco B"></label>` : ''}
      ${cliente.tipo === 'retirada' ? `<div class="alerta">${ic('pin')}<span>Retirada em ${esc(l.endereco)}.</span></div>` : ''}
      <label class="campo"><span>Seu nome</span><input class="entrada" data-cli="nome" value="${esc(cliente.nome)}" autocomplete="name" placeholder="Como podemos te chamar?"></label>
      <label class="campo"><span>Seu WhatsApp (fica salvo para os próximos pedidos)</span><input class="entrada" data-cli="whats" type="tel" inputmode="tel" autocomplete="tel" value="${esc(cliente.whats)}" placeholder="(21) 99999-9999"></label>
      <div class="campo"><span class="rotulo">Forma de pagamento</span><div class="chips">
        ${l.pagamentos.map(pg => `<button type="button" data-pag="${esc(pg)}" aria-pressed="${cliente.pagamento === pg}">${esc(pg)}</button>`).join('')}</div></div>
      ${/dinheiro/i.test(cliente.pagamento) ? `<label class="campo"><span>Troco para quanto? (opcional)</span><input class="entrada" data-cli="troco" inputmode="decimal" value="${esc(cliente.troco)}" placeholder="Ex.: 100"></label>` : ''}
      ${temCupons || cupomCod ? `<div class="campo"><span class="rotulo">Cupom de desconto (opcional)</span>
        ${cupom && desconto > 0 ? `<div class="cupom-ok"><span>${ic('tag')} ${esc(cupomCod)} · - ${R(desconto)}</span><button type="button" data-tirar-cupom>Remover</button></div>`
          : `<div class="cupom-linha"><input class="entrada" data-cupom-in value="${esc(cupomDigitado)}" maxlength="24" placeholder="Ex.: BEMVINDO10"><button type="button" class="btn btn-borda" data-aplicar-cupom>Aplicar</button></div>`}
        ${cupomErro || cupomMotivo ? `<div class="cupom-erro">${esc(cupomErro || cupomMotivo)}</div>` : ''}</div>` : ''}
      <label class="campo"><span>Observações do pedido (opcional)</span><textarea class="entrada" data-cli="obs" maxlength="200" placeholder="Ex.: interfone quebrado, ligar quando chegar">${esc(cliente.obs)}</textarea></label>
      <div class="resumo"><div><span>Subtotal</span><span>${R(sub)}</span></div>
        ${desconto > 0 ? `<div class="desc-linha"><span>Cupom ${esc(cupomCod)}</span><span>- ${R(desconto)}</span></div>` : ''}
        ${cliente.tipo === 'entrega' ? `<div><span>Entrega${bairro ? ' · ' + esc(bairro.nome) : ''}</span><span>${bairro ? (taxa ? R(taxa) : 'grátis') : 'escolha o bairro'}</span></div>` : ''}
        ${cliente.tipo === 'correios' ? `<div><span>Frete Correios${freteOp ? ' · ' + esc(freteOp.id) : ''}</span><span>${freteOp ? R(freteOp.valor) : 'informe o CEP'}</span></div>` : ''}
        <div class="total"><span>Total</span><span>${R(totalFinal)}</span></div></div>
      ${abaixo ? `<div class="alerta">${ic('info')}<span>O pedido mínimo é ${R(l.pedidoMinimo)}. Faltam ${R(l.pedidoMinimo - sub)}.</span></div>` : ''}
      ${!sit.aberta ? `<div class="alerta erro">${ic('relogio')}<span>${esc(sit.texto)}${sit.detalhe ? ', ' + esc(sit.detalhe) : ''}. Você pode montar o pedido e enviar quando abrirmos.</span></div>` : ''}
      ${erroEnvio ? `<div class="alerta erro" data-erro>${ic('info')}<span>${esc(erroEnvio)}</span></div>` : ''}` : ''}
    </div>
    ${itens.length ? `<div class="folha-pe"><button type="button" class="btn btn-p btn-total" data-enviar${abaixo || !sit.aberta ? ' disabled' : ''}><span>${ic('whats')} Enviar pedido</span><span>${R(totalFinal)}</span></button>
      <p class="nota">O pedido abre pronto no WhatsApp da loja. É só conferir e enviar.</p></div>` : ''}`;
  }
  function abrirCarrinho() { erroEnvio = ''; cupomErro = ''; renderCarrinho(); abrirFolha('carrinho'); }
  const folhaCar = $('[data-folha="carrinho"]');
  const manterRolagem = fn => { const c = $('.folha-corpo', folhaCar), y = c ? c.scrollTop : 0; fn(); const n = $('.folha-corpo', folhaCar); if (n) n.scrollTop = y; };
  folhaCar.addEventListener('click', e => {
    if (e.target.closest('[data-fechar]')) { fecharFolhas(); return; }
    if (e.target.closest('[data-aplicar-cupom]')) {
      const cod = String($('[data-cupom-in]', folhaCar)?.value || '').trim().toUpperCase().replace(/\s+/g, '');
      cupomDigitado = cod; cupomErro = '';
      if (!cod) { cupomCod = ''; manterRolagem(renderCarrinho); return; }
      cupomCod = cod;
      const r = calcularCupom(subtotal());
      if (r.motivo) { cupomErro = r.motivo; if (!r.cupom) cupomCod = ''; }
      else aviso(`Cupom ${cod} aplicado`, 'tag');
      manterRolagem(renderCarrinho); return;
    }
    if (e.target.closest('[data-tirar-cupom]')) { cupomCod = ''; cupomDigitado = ''; cupomErro = ''; manterRolagem(renderCarrinho); return; }
    if (e.target.closest('[data-calc-frete]')) { consultarCep(cliente.cep); return; }
    const fr = e.target.closest('[data-frete]');
    if (fr) { cliente.freteServ = fr.dataset.frete; salvarCliente(); manterRolagem(renderCarrinho); return; }
    const b = e.target.closest('[data-car],[data-tipo],[data-pag],[data-enviar]'); if (!b) return;
    if (b.dataset.car) {
      const it = carrinho.find(c => c.uid === b.dataset.car); if (!it) return;
      it.qtd += +b.dataset.passo; if (it.qtd <= 0) carrinho = carrinho.filter(c => c !== it);
      salvarCarrinho(); renderBarra(); if (!itensValidos().length) { fecharFolhas(); return; }
    }
    if (b.dataset.tipo) cliente.tipo = b.dataset.tipo;
    if (b.dataset.pag) cliente.pagamento = b.dataset.pag;
    if (b.dataset.enviar !== undefined) { enviar(); return; }
    salvarCliente(); manterRolagem(renderCarrinho);
  });
  folhaCar.addEventListener('input', e => {
    if (e.target.matches('[data-cupom-in]')) { cupomDigitado = e.target.value.toUpperCase().replace(/\s+/g, ''); return; }
    const k = e.target.dataset.cli; if (!k) return;
    if (k === 'cep') {
      const d = e.target.value.replace(/\D/g, '').slice(0, 8);
      cliente.cep = d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
      e.target.value = cliente.cep;
      salvarCliente();
      if (d.length === 8) consultarCep(d);
      return;
    }
    cliente[k] = e.target.value; salvarCliente();
  });
  folhaCar.addEventListener('change', e => { if (e.target.dataset.cli === 'bairro') manterRolagem(renderCarrinho); });

  function enviar() {
    const l = D().loja, itens = itensValidos(), falta = [];
    if (!cliente.tipo) falta.push('como quer receber');
    if (cliente.tipo === 'entrega') { if (!cliente.bairro) falta.push('o bairro'); if (!cliente.endereco.trim()) falta.push('a rua e o número'); }
    if (cliente.tipo === 'correios') {
      if (String(cliente.cep || '').replace(/\D/g, '').length !== 8) falta.push('o CEP de destino');
      if (!freteInfo || !cliente.freteServ) falta.push('o tipo de frete (PAC ou SEDEX)');
      if (!cliente.endereco.trim()) falta.push('a rua e o número');
    }
    if (!cliente.nome.trim()) falta.push('seu nome');
    if (String(cliente.whats || '').replace(/\D/g, '').length < 10) falta.push('seu WhatsApp com DDD');
    if (!cliente.pagamento) falta.push('a forma de pagamento');
    if (falta.length) { erroEnvio = 'Falta preencher: ' + falta.join(', ') + '.'; manterRolagem(renderCarrinho); $('[data-erro]', folhaCar)?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    const bairro = l.entrega.bairros.find(b => b.nome === cliente.bairro);
    const freteOp = cliente.tipo === 'correios' && freteInfo ? freteInfo.ops.find(o => o.id === cliente.freteServ) : null;
    const taxa = cliente.tipo === 'entrega' && bairro ? +bairro.taxa : (freteOp ? +freteOp.valor : 0);
    const cent = v => Math.round(v * 100) / 100;
    const sub = cent(subtotal());
    const { desconto } = calcularCupom(sub);
    const total = Math.max(0, cent(sub - desconto + taxa));
    const linhasItens = itens.map(it => ({ nome: C.produto(it.produto).nome, qtd: it.qtd, detalhes: C.detalhes(it), total: cent(C.precoItem(it) * it.qtd), produto: it.produto }));
    const pedido = C.registrarPedido({
      itens: linhasItens, subtotal: sub, desconto, cupom: desconto > 0 ? cupomCod : '', taxa, total, tipo: cliente.tipo, mesa: cliente.tipo === 'mesa' ? MESA : '',
      bairro: cliente.tipo === 'entrega' ? cliente.bairro : (cliente.tipo === 'correios' ? `Correios ${freteOp?.id || ''}` : ''),
      endereco: (cliente.tipo === 'entrega' || cliente.tipo === 'correios') ? [cliente.endereco, cliente.compl, cliente.tipo === 'correios' ? `CEP ${cliente.cep} · ${freteInfo?.local || ''}` : ''].filter(Boolean).join(' · ') : '',
      nome: cliente.nome.trim(), whats: cliente.whats.trim(), pagamento: cliente.pagamento, troco: cliente.troco, obs: cliente.obs.trim()
    });
    const m = [`*Pedido nº ${pedido.numero} · ${V.nome}*`, ''];
    for (const it of linhasItens) { m.push(`*${it.qtd}x ${it.nome}* · ${R(it.total)}`); it.detalhes.forEach(d => m.push(`   ${d}`)); }
    m.push('', `Subtotal: ${R(sub)}`);
    if (desconto > 0) m.push(`Desconto (${cupomCod}): - ${R(desconto)}`);
    if (cliente.tipo === 'entrega') m.push(`Entrega (${cliente.bairro}): ${taxa ? R(taxa) : 'grátis'}`);
    if (cliente.tipo === 'correios' && freteOp) m.push(`Frete (${freteOp.nome} · ${freteOp.prazo}): ${R(freteOp.valor)}`);
    m.push(`*Total: ${R(total)}*`, '');
    m.push(cliente.tipo === 'mesa' && MESA ? `*Mesa:* ${MESA}`
      : cliente.tipo === 'entrega' ? `*Entrega:* ${pedido.endereco} · ${cliente.bairro}`
      : cliente.tipo === 'correios' ? `*Envio Correios (${freteOp?.id || ''}):* ${pedido.endereco}`
      : '*Retirada no local*');
    m.push(`*Pagamento:* ${cliente.pagamento}${/dinheiro/i.test(cliente.pagamento) && cliente.troco ? ` (troco para R$ ${cliente.troco})` : ''}`);
    m.push(`*Nome:* ${pedido.nome}`);
    if (pedido.whats) m.push(`*WhatsApp:* ${pedido.whats}`);
    if (pedido.obs) m.push(`*Observações:* ${pedido.obs}`);
    const num = String(l.whats || '').replace(/\D/g, ''), n = num && num.length <= 11 ? '55' + num : num;
    window.open(`https://wa.me/${n}?text=${encodeURIComponent(m.join('\n'))}`, '_blank', 'noopener');
    salvarUltimo(itens.map(({ uid, ...it }) => it));
    carrinho = []; cupomCod = ''; cupomDigitado = ''; cliente.obs = ''; cliente.troco = ''; salvarCarrinho(); salvarCliente(); fecharFolhas();
    renderHero();
    aviso(`Pedido nº ${pedido.numero} pronto no WhatsApp`, 'whats');
  }

  /* ---------- Cliques gerais ---------- */
  function repetirUltimoPedido() {
    const fonte = (ultimoPedido && ultimoPedido.length) ? ultimoPedido : (L.repetirExemplo || []);
    const validos = fonte.filter(it => { const p = C.produto(it.produto); return p && visivel(p) && !p.esgotado; });
    if (!validos.length) { aviso('Nenhum pedido anterior disponível para repetir', 'info'); return; }
    validos.forEach(it => adicionar({ ...C.copia(it), campos: it.campos || {}, escolhas: it.escolhas || {}, meio: it.meio || '', obs: it.obs || '' }));
    renderBarra(); abrirCarrinho();
    aviso('Último pedido colocado no carrinho', 'troca');
  }
  app.addEventListener('click', e => {
    const t = e.target;
    const ancora = t.closest('a[href="#cardapio"], a[href="#inicio"]');
    if (ancora) {
      e.preventDefault();
      if (ancora.getAttribute('href') === '#inicio') window.scrollTo({ top: 0, behavior: 'smooth' });
      else { const alv = $('#cardapio'); if (alv) window.scrollTo({ top: Math.max(0, alv.getBoundingClientRect().top + window.scrollY - 120), behavior: 'smooth' }); }
      return;
    }
    if (t.closest('[data-repetir-ultimo]')) { repetirUltimoPedido(); return; }
    const car = t.closest('[data-abrir-carrinho],[data-barra]'); if (car) { abrirCarrinho(); return; }
    const cat = t.closest('[data-cat]');
    if (cat) {
      const id = cat.dataset.cat;
      secaoAtiva = id;
      $$('.cat').forEach(b => b.setAttribute('aria-current', String(b.dataset.cat === id)));
      centralizarCat(id, true);
      const sec = $(`#cat-${CSS.escape(id)}`);
      if (sec) window.scrollTo({ top: Math.max(0, sec.getBoundingClientRect().top + window.scrollY - 128), behavior: 'smooth' });
      return;
    }
    const pr = t.closest('[data-produto]');
    if (pr) {
      const p = C.produto(pr.dataset.produto); if (!p || p.esgotado) return;
      const precisaEscolher = p.passos || (p.grupos || []).some(g => {
        const gr = C.grupo(g);
        return gr && ((gr.tipo === 'um' && gr.obrig && gr.itens.length > 1) || (gr.tipo === 'varios' && gr.obrig) || ((gr.tipo === 'texto' || gr.tipo === 'data') && gr.obrig));
      });
      if (t.closest('[data-rapido]') && !precisaEscolher) { adicionar({ produto: p.id, escolhas: {}, campos: {}, meio: '', qtd: 1, obs: '' }); renderBarra(); return; }
      abrirProduto(p.id); return;
    }
    if (t.closest('[data-mapa]')) { e.preventDefault(); const l = D().loja; window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${l.endereco} ${l.cidade}`), '_blank', 'noopener'); }
  });
  const buscaEl = $('[data-busca]'), buscaIn = $('input', buscaEl);
  buscaEl.addEventListener('click', () => { buscaEl.classList.add('aberta'); buscaIn.focus(); });
  buscaIn.addEventListener('input', () => { termo = buscaIn.value; renderCardapio(); });
  buscaIn.addEventListener('blur', () => { if (!buscaIn.value) buscaEl.classList.remove('aberta'); });

  /* ---------- Início ---------- */
  renderTudo();
  setInterval(renderStatus, 60000);
  C.aoMudar(tipo => {
    if (tipo === 'visual') { V = C.visual; T = C.textos; aplicarTema(); renderMarca(); renderHero(); renderStatus(); renderRodape(); if (!$('[data-folha="carrinho"]').hidden) renderCarrinho(); return; }
    if (tipo === 'dados') { renderStatus(); renderInfos(); renderCardapio(); renderRodape(); renderBarra(); if (!$('[data-folha="carrinho"]').hidden) renderCarrinho(); }
  });
})();
