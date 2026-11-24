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
  const raiz = document.documentElement.style;
  function aplicarTema() {
    raiz.setProperty('--p', V.cores.p); raiz.setProperty('--d', V.cores.d);
    raiz.setProperty('--escuro', V.cores.escuro); raiz.setProperty('--fundo', V.cores.fundo);
    raiz.setProperty('--p-ink', tinta(V.cores.p)); raiz.setProperty('--d-ink', tinta(V.cores.d));
    raiz.setProperty('--f-t', V.fontes.t); raiz.setProperty('--f-c', V.fontes.c);
    document.title = `${V.nome} · ${V.segmento}`;
    const meta = $('meta[name="theme-color"]'); if (meta) meta.content = V.cores.escuro;
  }
  aplicarTema();
  const marca = () => V.logo ? `<img src="${esc(V.logo)}" alt="">` : esc(V.sigla);

  /* ---------- Estado do cliente ---------- */
  let carrinho = lerLocal(CH + ':carrinho', []);
  const cliente = Object.assign({ tipo: '', bairro: '', endereco: '', compl: '', nome: '', pagamento: '', troco: '', obs: '' }, lerLocal(CH + ':cliente', {}));
  const salvarCarrinho = () => gravarLocal(CH + ':carrinho', carrinho);
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
  <label class="busca" data-busca>${ic('busca')}<input type="search" placeholder="Buscar no cardápio" aria-label="Buscar no cardápio"></label>
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
    const cena = window.CENAS && window.CENAS[V.cena] ? window.CENAS[V.cena]() : null;
    $('[data-hero]').innerHTML = `
    <div class="hero-texto">
      <span class="hero-selo">${esc(T.selo)}</span>
      <h1>${palavras}</h1>
      <p class="hero-sub">${esc(T.sub)}</p>
      <div class="hero-acoes"><a class="btn btn-p" href="#cardapio">${esc(T.botao)}${ic('seta')}</a>
        <button type="button" class="btn btn-claro" data-abrir-carrinho>${ic('sacola')}Meu pedido</button></div>
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
    if (l.entrega.ativa) out.push(`${ic('entrega')}Entrega ${esc(l.entrega.tempo)}`);
    if (l.retirada) out.push(`${ic('loja')}Retirada no balcão`);
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
      <span class="prod-txt"><b>${esc(p.nome)}</b><p>${esc(p.desc)}</p><span class="prod-preco">${precoTexto(p)}</span></span>
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
      <div><h3>Entrega</h3><p>${l.entrega.ativa ? `Entregamos em ${l.entrega.bairros.map(b => esc(b.nome)).join(', ')}.` : 'No momento, só retirada no local.'}</p>
        ${l.retirada ? '<p style="margin-top:8px">Retirada no balcão.</p>' : ''}</div>
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
  let observador;
  function observarSecoes() {
    observador?.disconnect();
    observador = new IntersectionObserver(ent => {
      ent.filter(e => e.isIntersecting).forEach(e => {
        const id = e.target.dataset.secao;
        $$('.cat').forEach(b => b.setAttribute('aria-current', String(b.dataset.cat === id)));
        $(`.cat[data-cat="${CSS.escape(id)}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('[data-secao]').forEach(s => observador.observe(s));
  }

  /* ---------- Cena: segue o mouse e o dedo ---------- */
  const hero = $('.hero');
  {
    const mover = (x, y) => { const c = $('[data-cena]'); if (!c) return; c.style.setProperty('--mx', x.toFixed(3)); c.style.setProperty('--my', y.toFixed(3)); };
    hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); mover((e.clientX - r.left) / r.width * 2 - 1, (e.clientY - r.top) / r.height * 2 - 1); });
    hero.addEventListener('pointerleave', () => mover(0, 0));
    window.addEventListener('deviceorientation', e => { if (e.gamma == null) return; mover(Math.max(-1, Math.min(1, e.gamma / 30)), Math.max(-1, Math.min(1, (e.beta - 40) / 30))); });
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
  function faltando() {
    const p = C.produto(montando.produto), out = [];
    for (const gid of p.grupos || []) { const g = C.grupo(gid); if (g && g.tipo === 'um' && g.obrig && !(montando.escolhas[gid] || []).length) out.push(g.nome.toLowerCase()); }
    return out;
  }
  function abrirProduto(id) {
    const p = C.produto(id); if (!p || p.esgotado) return;
    montando = { produto: id, escolhas: {}, meio: '', qtd: 1, obs: '' };
    for (const gid of p.grupos || []) { const g = C.grupo(gid); if (g && g.tipo === 'um' && g.obrig && g.itens.length === 1) montando.escolhas[gid] = [0]; }
    renderProduto(); abrirFolha('produto');
  }
  function renderProduto() {
    const p = C.produto(montando.produto), f = $('[data-folha="produto"]');
    f.setAttribute('aria-label', p.nome);
    const grupos = (p.grupos || []).map(gid => C.grupo(gid)).filter(Boolean).map(g => {
      if (g.tipo === 'meio') {
        const outros = D().produtos.filter(o => o.cat === p.cat && o.id !== p.id && visivel(o) && !o.esgotado);
        if (!outros.length) return '';
        return `<div class="grupo"><div class="grupo-cab"><div><b>${esc(g.nome)}</b><small>Escolha um segundo sabor. Vale o preço do mais caro.</small></div></div>
          <label class="op"><input type="radio" name="meio" value=""${!montando.meio ? ' checked' : ''}><span class="marca"></span><span class="op-nome">Só ${esc(p.nome)}</span></label>
          ${outros.map(o => `<label class="op"><input type="radio" name="meio" value="${esc(o.id)}"${montando.meio === o.id ? ' checked' : ''}><span class="marca"></span>
            ${o.foto ? `<img src="${esc(o.foto)}" alt="">` : ''}<span class="op-nome">Metade ${esc(o.nome)}</span><span class="op-preco">${o.preco > p.preco ? '+ ' + R(o.preco - p.preco) : ''}</span></label>`).join('')}</div>`;
      }
      const sel = montando.escolhas[g.id] || [];
      const tipo = g.tipo === 'varios' ? 'checkbox' : 'radio';
      const cheio = g.tipo === 'varios' && g.max && sel.length >= g.max;
      const sub = g.tipo === 'varios' ? (g.max ? `Escolha até ${g.max}` : 'Escolha quantos quiser') : 'Escolha 1';
      const selo = g.obrig ? `<span class="obrig${sel.length ? ' ok' : ''}">${sel.length ? 'Pronto' : 'Obrigatório'}</span>` : '';
      const nenhum = g.tipo === 'um' && !g.obrig ? `<label class="op"><input type="radio" name="g-${esc(g.id)}" value="-1"${!sel.length ? ' checked' : ''}><span class="marca"></span><span class="op-nome">Sem ${esc(g.nome.toLowerCase())}</span></label>` : '';
      return `<div class="grupo"><div class="grupo-cab"><div><b>${esc(g.nome)}</b><small>${sub}</small></div>${selo}</div>${nenhum}
        ${g.itens.map((it, i) => `<label class="op"><input type="${tipo}" name="g-${esc(g.id)}" value="${i}"${sel.includes(i) ? ' checked' : ''}${cheio && !sel.includes(i) ? ' disabled' : ''}><span class="marca"></span>
          <span class="op-nome">${esc(it.nome)}</span><span class="op-preco">${+it.preco ? '+ ' + R(it.preco) : ''}</span></label>`).join('')}</div>`;
    }).join('');
    const falta = faltando();
    const total = C.precoItem(montando) * montando.qtd;
    f.innerHTML = `<div class="folha-corpo" style="padding-top:0">
      <div class="pf-foto">${p.foto ? `<img src="${esc(p.foto)}" alt="">` : ''}<button type="button" class="fechar" data-fechar aria-label="Fechar">${ic('x')}</button></div>
      <h3 class="pf-nome">${esc(p.nome)}</h3><p class="pf-desc">${esc(p.desc)}</p>
      ${grupos}
      <label class="campo"><span>Alguma observação?</span><textarea class="entrada" data-obs placeholder="Ex.: bem passada, sem orégano" maxlength="140">${esc(montando.obs)}</textarea></label>
    </div>
    <div class="folha-pe"><div class="pe-linha">
      <span class="passo-qtd"><button type="button" data-qtd="-1" aria-label="Menos">${ic('menos')}</button><span>${montando.qtd}</span><button type="button" data-qtd="1" aria-label="Mais">${ic('mais')}</button></span>
      <button type="button" class="btn btn-p btn-total" data-adicionar${falta.length ? ' disabled' : ''}>${falta.length ? `Escolha ${esc(falta[0])}` : `<span>Adicionar</span><span>${R(total)}</span>`}</button>
    </div></div>`;
  }
  $('[data-folha="produto"]').addEventListener('change', e => {
    const t = e.target;
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
  $('[data-folha="produto"]').addEventListener('input', e => { if (e.target.matches('[data-obs]')) montando.obs = e.target.value; });
  $('[data-folha="produto"]').addEventListener('click', e => {
    if (e.target.closest('[data-fechar]')) { fecharFolhas(); return; }
    const q = e.target.closest('[data-qtd]');
    if (q) { montando.qtd = Math.max(1, Math.min(50, montando.qtd + +q.dataset.qtd)); const y = $('[data-folha="produto"] .folha-corpo').scrollTop; renderProduto(); $('[data-folha="produto"] .folha-corpo').scrollTop = y; return; }
    if (e.target.closest('[data-adicionar]') && !faltando().length) adicionar({ ...montando });
  });
  function adicionar(item) {
    item.uid = C.novoId('i');
    // junta com um item igual que já esteja no carrinho
    const igual = carrinho.find(c => c.produto === item.produto && c.meio === item.meio && c.obs === item.obs && JSON.stringify(c.escolhas) === JSON.stringify(item.escolhas));
    if (igual) igual.qtd += item.qtd; else carrinho.push(item);
    salvarCarrinho(); fecharFolhas();
    aviso(`${C.produto(item.produto).nome} no pedido`, 'sacola');
  }

  /* ---------- Carrinho e envio ---------- */
  let erroEnvio = '';
  function renderCarrinho() {
    const l = D().loja, f = $('[data-folha="carrinho"]'), itens = itensValidos();
    if (!cliente.tipo || (cliente.tipo === 'entrega' && !l.entrega.ativa) || (cliente.tipo === 'retirada' && !l.retirada)) cliente.tipo = l.entrega.ativa && !l.retirada ? 'entrega' : !l.entrega.ativa && l.retirada ? 'retirada' : (cliente.tipo || '');
    if (cliente.pagamento && !l.pagamentos.includes(cliente.pagamento)) cliente.pagamento = '';
    const bairro = l.entrega.bairros.find(b => b.nome === cliente.bairro);
    const taxa = cliente.tipo === 'entrega' && bairro ? +bairro.taxa : 0;
    const sub = subtotal(), sit = C.situacao();
    const abaixo = l.pedidoMinimo && sub < l.pedidoMinimo;
    const lista = itens.map(it => { const p = C.produto(it.produto); return `<div class="item-car">${p.foto ? `<img src="${esc(p.foto)}" alt="">` : '<span></span>'}
        <div><b>${esc(p.nome)}</b><ul>${C.detalhes(it).map(d => `<li>${esc(d)}</li>`).join('')}</ul><div class="preco">${R(C.precoItem(it) * it.qtd)}</div></div>
        <span class="passo-qtd"><button type="button" data-car="${it.uid}" data-passo="-1" aria-label="Menos">${ic(it.qtd === 1 ? 'lixo' : 'menos')}</button><span>${it.qtd}</span><button type="button" data-car="${it.uid}" data-passo="1" aria-label="Mais">${ic('mais')}</button></span></div>`; }).join('');
    f.innerHTML = `<div class="folha-topo"><h3>Seu pedido</h3><button type="button" class="fechar" data-fechar aria-label="Fechar">${ic('x')}</button></div>
    <div class="folha-corpo">
      ${itens.length ? lista : `<p class="vazio">Seu pedido está vazio.<br>Escolha algo no cardápio.</p>`}
      ${itens.length ? `
      <div class="campo"><span class="rotulo">Como você quer receber?</span><div class="escolha2">
        ${l.entrega.ativa ? `<button type="button" data-tipo="entrega" aria-pressed="${cliente.tipo === 'entrega'}">Entrega<small>${esc(l.entrega.tempo)}</small></button>` : ''}
        ${l.retirada ? `<button type="button" data-tipo="retirada" aria-pressed="${cliente.tipo === 'retirada'}">Retirar no local<small>${esc(l.tempoRetirada || '')}</small></button>` : ''}</div></div>
      ${cliente.tipo === 'entrega' ? `
      <label class="campo"><span>Bairro</span><select class="entrada" data-cli="bairro"><option value="">Escolha o bairro</option>
        ${l.entrega.bairros.map(b => `<option value="${esc(b.nome)}"${b.nome === cliente.bairro ? ' selected' : ''}>${esc(b.nome)} · ${+b.taxa ? R(b.taxa) : 'grátis'}</option>`).join('')}</select></label>
      <label class="campo"><span>Rua e número</span><input class="entrada" data-cli="endereco" value="${esc(cliente.endereco)}" autocomplete="street-address" placeholder="Ex.: Rua das Flores, 120"></label>
      <label class="campo"><span>Complemento ou ponto de referência</span><input class="entrada" data-cli="compl" value="${esc(cliente.compl)}" placeholder="Ex.: apto 302, perto da praça"></label>` : ''}
      ${cliente.tipo === 'retirada' ? `<div class="alerta">${ic('pin')}<span>Retirada em ${esc(l.endereco)}.</span></div>` : ''}
      <label class="campo"><span>Seu nome</span><input class="entrada" data-cli="nome" value="${esc(cliente.nome)}" autocomplete="name" placeholder="Como podemos te chamar?"></label>
      <div class="campo"><span class="rotulo">Forma de pagamento</span><div class="chips">
        ${l.pagamentos.map(pg => `<button type="button" data-pag="${esc(pg)}" aria-pressed="${cliente.pagamento === pg}">${esc(pg)}</button>`).join('')}</div></div>
      ${/dinheiro/i.test(cliente.pagamento) ? `<label class="campo"><span>Troco para quanto? (opcional)</span><input class="entrada" data-cli="troco" inputmode="decimal" value="${esc(cliente.troco)}" placeholder="Ex.: 100"></label>` : ''}
      <label class="campo"><span>Observações do pedido (opcional)</span><textarea class="entrada" data-cli="obs" maxlength="200" placeholder="Ex.: interfone quebrado, ligar quando chegar">${esc(cliente.obs)}</textarea></label>
      <div class="resumo"><div><span>Subtotal</span><span>${R(sub)}</span></div>
        ${cliente.tipo === 'entrega' ? `<div><span>Entrega${bairro ? ' · ' + esc(bairro.nome) : ''}</span><span>${bairro ? (taxa ? R(taxa) : 'grátis') : 'escolha o bairro'}</span></div>` : ''}
        <div class="total"><span>Total</span><span>${R(sub + taxa)}</span></div></div>
      ${abaixo ? `<div class="alerta">${ic('info')}<span>O pedido mínimo é ${R(l.pedidoMinimo)}. Faltam ${R(l.pedidoMinimo - sub)}.</span></div>` : ''}
      ${!sit.aberta ? `<div class="alerta erro">${ic('relogio')}<span>${esc(sit.texto)}${sit.detalhe ? ', ' + esc(sit.detalhe) : ''}. Você pode montar o pedido e enviar quando abrirmos.</span></div>` : ''}
      ${erroEnvio ? `<div class="alerta erro" data-erro>${ic('info')}<span>${esc(erroEnvio)}</span></div>` : ''}` : ''}
    </div>
    ${itens.length ? `<div class="folha-pe"><button type="button" class="btn btn-p btn-total" data-enviar${abaixo || !sit.aberta ? ' disabled' : ''}><span>${ic('whats')} Enviar pedido</span><span>${R(sub + taxa)}</span></button>
      <p class="nota">O pedido abre pronto no WhatsApp da loja. É só conferir e enviar.</p></div>` : ''}`;
  }
  function abrirCarrinho() { erroEnvio = ''; renderCarrinho(); abrirFolha('carrinho'); }
  const folhaCar = $('[data-folha="carrinho"]');
  const manterRolagem = fn => { const c = $('.folha-corpo', folhaCar), y = c ? c.scrollTop : 0; fn(); const n = $('.folha-corpo', folhaCar); if (n) n.scrollTop = y; };
  folhaCar.addEventListener('click', e => {
    if (e.target.closest('[data-fechar]')) { fecharFolhas(); return; }
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
  folhaCar.addEventListener('input', e => { const k = e.target.dataset.cli; if (!k) return; cliente[k] = e.target.value; salvarCliente(); });
  folhaCar.addEventListener('change', e => { if (e.target.dataset.cli === 'bairro') manterRolagem(renderCarrinho); });

  function enviar() {
    const l = D().loja, itens = itensValidos(), falta = [];
    if (!cliente.tipo) falta.push('como quer receber');
    if (cliente.tipo === 'entrega') { if (!cliente.bairro) falta.push('o bairro'); if (!cliente.endereco.trim()) falta.push('a rua e o número'); }
    if (!cliente.nome.trim()) falta.push('seu nome');
    if (!cliente.pagamento) falta.push('a forma de pagamento');
    if (falta.length) { erroEnvio = 'Falta preencher: ' + falta.join(', ') + '.'; manterRolagem(renderCarrinho); $('[data-erro]', folhaCar)?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    const bairro = l.entrega.bairros.find(b => b.nome === cliente.bairro);
    const taxa = cliente.tipo === 'entrega' && bairro ? +bairro.taxa : 0;
    const cent = v => Math.round(v * 100) / 100;
    const sub = cent(subtotal()), total = cent(sub + taxa);
    const linhasItens = itens.map(it => ({ nome: C.produto(it.produto).nome, qtd: it.qtd, detalhes: C.detalhes(it), total: cent(C.precoItem(it) * it.qtd), produto: it.produto }));
    const pedido = C.registrarPedido({
      itens: linhasItens, subtotal: sub, taxa, total, tipo: cliente.tipo, bairro: cliente.tipo === 'entrega' ? cliente.bairro : '',
      endereco: cliente.tipo === 'entrega' ? [cliente.endereco, cliente.compl].filter(Boolean).join(' · ') : '',
      nome: cliente.nome.trim(), pagamento: cliente.pagamento, troco: cliente.troco, obs: cliente.obs.trim()
    });
    const m = [`*Pedido nº ${pedido.numero} · ${V.nome}*`, ''];
    for (const it of linhasItens) { m.push(`*${it.qtd}x ${it.nome}* · ${R(it.total)}`); it.detalhes.forEach(d => m.push(`   ${d}`)); }
    m.push('', `Subtotal: ${R(sub)}`);
    if (cliente.tipo === 'entrega') m.push(`Entrega (${cliente.bairro}): ${taxa ? R(taxa) : 'grátis'}`);
    m.push(`*Total: ${R(total)}*`, '');
    m.push(cliente.tipo === 'entrega' ? `*Entrega:* ${pedido.endereco} · ${cliente.bairro}` : '*Retirada no local*');
    m.push(`*Pagamento:* ${cliente.pagamento}${/dinheiro/i.test(cliente.pagamento) && cliente.troco ? ` (troco para R$ ${cliente.troco})` : ''}`);
    m.push(`*Nome:* ${pedido.nome}`);
    if (pedido.obs) m.push(`*Observações:* ${pedido.obs}`);
    const num = String(l.whats || '').replace(/\D/g, ''), n = num && num.length <= 11 ? '55' + num : num;
    window.open(`https://wa.me/${n}?text=${encodeURIComponent(m.join('\n'))}`, '_blank', 'noopener');
    carrinho = []; cliente.obs = ''; cliente.troco = ''; salvarCarrinho(); salvarCliente(); fecharFolhas();
    aviso(`Pedido nº ${pedido.numero} pronto no WhatsApp`, 'whats');
  }

  /* ---------- Cliques gerais ---------- */
  app.addEventListener('click', e => {
    const t = e.target;
    const car = t.closest('[data-abrir-carrinho],[data-barra]'); if (car) { abrirCarrinho(); return; }
    const cat = t.closest('[data-cat]');
    if (cat) { $(`#cat-${CSS.escape(cat.dataset.cat)}`)?.scrollIntoView({ behavior: 'smooth' }); return; }
    const pr = t.closest('[data-produto]');
    if (pr) {
      const p = C.produto(pr.dataset.produto); if (!p || p.esgotado) return;
      const precisaEscolher = (p.grupos || []).some(g => { const gr = C.grupo(g); return gr && ((gr.tipo === 'um' && gr.obrig && gr.itens.length > 1)); });
      if (t.closest('[data-rapido]') && !precisaEscolher) { adicionar({ produto: p.id, escolhas: {}, meio: '', qtd: 1, obs: '' }); renderBarra(); return; }
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
    if (tipo === 'visual') { V = C.visual; T = C.textos; aplicarTema(); renderMarca(); renderHero(); renderRodape(); return; }
    if (tipo === 'dados') { renderStatus(); renderInfos(); renderCardapio(); renderRodape(); renderBarra(); if (!$('[data-folha="carrinho"]').hidden) renderCarrinho(); }
  });
})();
