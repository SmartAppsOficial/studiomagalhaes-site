/* Site de Serviços · vitrine: topo 3D, diferenciais, serviços por categoria,
   profissionais, portfólio, depoimentos, FAQ e agendamento/orçamento no WhatsApp ou online. */
(() => {
  'use strict';
  const C = window.Servicos, N = C.NEGOCIO, I = window.ICONES;
  let V = C.visual, T = C.textos;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = C.esc, R = C.dinheiro;
  const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || ''}</svg>`;
  const lerLocal = (k, p) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : p; } catch { return p; } };
  const gravarLocal = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* */ } };
  const D = () => C.dados;
  const CH = 'sm-servicos:' + N.id;
  const HASH_AMOSTRA = C.linkParamAmostra || '';

  /* ---------- Tema ---------- */
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
  document.body.classList.add('modo-loja');
  const marca = () => V.logo ? `<img src="${esc(V.logo)}" alt="">` : esc(V.sigla);

  /* ---------- Modos de atendimento e pagamento ---------- */
  const modoAtend = () => V.atendimentoModo || N.visual.atendimentoModo || 'local';
  const temLocal = () => { const m = modoAtend(); return m === 'local' || m === 'hibrido' || m === 'local_domicilio'; };
  const temDomicilio = () => { const m = modoAtend(); return m === 'domicilio' || m === 'local_domicilio'; };
  const temOnline = () => { const m = modoAtend(); return m === 'online' || m === 'hibrido'; };
  const pagOnline = () => V.pagOnline || '';
  const nomePagOnline = () => pagOnline() === 'infinitepay' ? 'InfinitePay' : pagOnline() === 'mercadopago' ? 'Mercado Pago' : '';
  const ehOrcamento = () => N.fluxo === 'orcamento';
  const verboAcao = () => ehOrcamento() ? 'Pedir orçamento' : 'Agendar horário';

  function pagamentosAtivos(tipoAt = cliente.tipoAtendimento) {
    if (pagOnline()) return ['Pix online', 'Cartão de crédito online', 'Cartão de débito online'];
    const lista = D().negocio.pagamentos || [];
    if (tipoAt === 'online') {
      const on = lista.filter(pg => !/dinheiro|no local/i.test(pg));
      return on.length >= 2 ? on : [...new Set([...on, 'Pix', 'Cartão de crédito (link)', 'Transferência'])];
    }
    return lista;
  }

  /* ---------- Estado do cliente ---------- */
  let selecionados = lerLocal(CH + ':sel', []); // array de IDs de serviços
  const cliente = Object.assign({
    tipoAtendimento: '', profissional: '', data: '', hora: '', bairro: '', endereco: '',
    nome: '', whats: '', pagamento: '', obs: '', extras: {}
  }, lerLocal(CH + ':cliente', {}));
  const salvarSel = () => gravarLocal(CH + ':sel', selecionados);
  const salvarCli = () => gravarLocal(CH + ':cliente', cliente);
  const visivel = s => !s.pausado;
  const selValidos = () => selecionados.map(id => C.servico(id)).filter(s => s && visivel(s));
  const subtotalFixo = () => selValidos().reduce((t, s) => t + (s.precoTipo !== 'orcamento' ? (+s.preco || 0) : 0), 0);
  const temItemOrcamento = () => selValidos().some(s => s.precoTipo === 'orcamento' || !(+s.preco > 0));
  const temItemApartir = () => selValidos().some(s => s.precoTipo === 'apartir');
  const duracaoSel = () => selValidos().reduce((t, s) => t + (+s.duracao || 0), 0);

  /* ---------- Avisos ---------- */
  let aviT;
  function aviso(texto, icone = 'check') {
    const a = $('.aviso'); a.innerHTML = ic(icone) + esc(texto); a.hidden = false;
    clearTimeout(aviT); aviT = setTimeout(() => { a.hidden = true; }, 2600);
  }

  /* ---------- Estrutura da página ---------- */
  const app = $('#app');
  app.innerHTML = `
${N.demo ? `<div class="demo-faixa" data-faixa></div>` : ''}
<header class="topo"><div class="caixa topo-in">
  <a class="logo" href="#inicio" data-marca></a>
  <div class="status" data-status></div>
  <button type="button" class="btn-sacola" data-abrir-agenda aria-label="${esc(verboAcao())}">
    ${ic('sv-agenda')}<span class="conta" data-contador></span>
  </button>
</div></header>

<section class="hero" id="inicio"><div class="caixa hero-in" data-hero></div></section>

<nav class="cats-barra" aria-label="Categorias"><div class="caixa cats-in">
  <div class="cats-rolo">
    <button type="button" class="cats-seta esq" data-rolar="-1" aria-label="Ver categorias anteriores" hidden>${ic('esq')}</button>
    <div class="cats-lista" data-cats></div>
    <button type="button" class="cats-seta dir" data-rolar="1" aria-label="Ver mais categorias" hidden>${ic('dir')}</button>
  </div>
  <label class="busca" data-busca>${ic('lupa')}<input type="search" placeholder="Buscar serviço…" aria-label="Buscar serviço"></label>
</div></nav>

<main id="servicos">
  <section class="caixa" data-diffs></section>
  <section class="secao caixa" data-destaques></section>
  <div data-secoes></div>
  <section class="secao caixa" data-profissionais></section>
  <section class="secao caixa" data-galeria></section>
  <section class="secao caixa" data-depoimentos></section>
  <section class="secao caixa" data-faq></section>
</main>

<footer class="rodape"><div class="caixa" data-rodape></div></footer>

<button type="button" class="barra" data-barra hidden></button>
<div class="fundo-escuro" data-fundo hidden></div>
<section class="folha" data-folha="servico" role="dialog" aria-modal="true" hidden></section>
<section class="folha" data-folha="agenda" role="dialog" aria-modal="true" aria-label="Agendamento ou orçamento" hidden></section>
<div class="sv-luz" data-luz hidden><button type="button" class="sv-luz-x" data-fechar-luz aria-label="Fechar">${ic('x')}</button><div class="sv-luz-box"><img alt=""><p></p></div></div>
<div class="aviso" role="status" hidden></div>`;

  /* ---------- Marca e Hero ---------- */
  function renderMarca() {
    $('[data-marca]').innerHTML = `<span class="logo-sigla">${marca()}</span><span><span class="logo-nome">${esc(V.nome)}</span><span class="logo-seg">${esc(V.segmento)}</span></span>`;
    const f = $('[data-faixa]');
    if (!f) return;
    if (HASH_AMOSTRA) {
      f.innerHTML = `Prévia exclusiva para <b>${esc(V.nome)}</b> · Studio Magalhães · <a href="admin.html${esc(HASH_AMOSTRA)}">Testar Área do negócio</a>`;
      return;
    }
    f.innerHTML = C.ajustado()
      ? `Prévia do <b>Site de Serviços</b> para ${esc(V.nome)} · serviços e valores de exemplo · <a href="admin.html">ver a área do negócio</a>`
      : `Demonstração de <b>Site de Serviços</b> · nome, serviços e valores são exemplos · <a href="admin.html">ver a área do negócio</a> · <a href="../">outros modelos</a>`;
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
      <div class="hero-acoes">
        <a class="btn btn-p" href="#servicos">${esc(T.botao || 'Ver serviços')} ${ic('dir')}</a>
        <button type="button" class="btn btn-borda" style="color:inherit;border-color:currentColor;opacity:.92" data-abrir-agenda>${ic('sv-agenda')} ${esc(verboAcao())}</button>
      </div>
      <ul class="hero-infos" data-infos></ul>
    </div>
    ${cena ? `<div class="cena" data-cena aria-hidden="true">
      <div class="cena-brilho"></div>
      <div class="cena-principal">${cena.principal}</div>
      ${cena.soltos.map(s => `<div class="solto" style="left:${s.x}%;top:${s.y}%;--t:${s.t};--prof:${s.p}"><div>${s.s}</div></div>`).join('')}</div>` : ''}`;
    renderInfos();
  }

  function renderStatus() {
    const s = C.situacao();
    const el = $('[data-status]'); el.className = 'status' + (s.aberta ? '' : ' fechada');
    el.innerHTML = `${esc(s.texto)} <small>${esc(s.detalhe)}</small>`;
  }

  function renderInfos() {
    const out = [];
    if (temLocal()) out.push(`${ic('loja')}Atendimento presencial`);
    if (temDomicilio()) out.push(`${ic('entrega')}Atendimento a domicílio / visita`);
    if (temOnline()) out.push(`${ic('sv-video')}Atendimento online`);
    if (pagOnline()) out.push(`${ic('check')}Pagamento online via ${esc(nomePagOnline())}`);
    else out.push(`${ic('whats')}Confirmação direta no WhatsApp`);
    $('[data-infos]').innerHTML = out.map(x => `<li>${x}</li>`).join('');
  }

  /* ---------- Diferenciais, Serviços, Profissionais, Galeria, Depoimentos, FAQ ---------- */
  function renderDiffs() {
    const list = D().diferenciais || [];
    const el = $('[data-diffs]');
    el.hidden = !list.length;
    el.innerHTML = list.length ? `<div class="sv-diffs">${list.map(d => `<div class="sv-diff"><span class="sv-diff-ic">${ic(d.icone || 'sv-escudo')}</span><div><b>${esc(d.titulo)}</b><p>${esc(d.texto)}</p></div></div>`).join('')}</div>` : '';
  }

  const servicosDa = cid => (D().servicos || []).filter(s => s.cat === cid && visivel(s));
  const cartaoServ = s => {
    const ativo = selecionados.includes(s.id);
    const dur = C.duracaoTxt(s.duracao);
    return `<button type="button" class="prod${ativo ? ' selecionado' : ''}" data-servico="${esc(s.id)}">
      <span class="prod-txt">
        ${s.destaque ? '<span class="sv-tag-dest">Mais procurado</span>' : ''}
        <b>${esc(s.nome)}</b>
        <p>${esc(s.desc)}</p>
        <span class="sv-meta-row">
          <span class="prod-preco" style="margin-top:0;padding-top:0">${C.precoTxt(s)}</span>
          ${dur ? `<span class="sv-duracao">${ic('relogio')}${esc(dur)}</span>` : ''}
        </span>
      </span>
      <span class="prod-foto">${s.foto ? `<img src="${esc(s.foto)}" alt="" loading="lazy">` : ''}<span class="prod-mais" data-toggle-serv aria-label="${ativo ? 'Remover' : 'Selecionar'}">${ic(ativo ? 'check' : 'mais')}</span></span>
    </button>`;
  };

  let termo = '';
  function renderServicos() {
    const cats = (D().categorias || []).filter(c => servicosDa(c.id).length);
    $('[data-cats]').innerHTML = cats.map((c, i) => `<button type="button" class="cat" data-cat="${esc(c.id)}" aria-current="${i === 0}">${c.icone ? ic(c.icone) : ''}${esc(c.nome)}</button>`).join('');
    const busca = termo.trim().toLowerCase();
    const destaques = (D().servicos || []).filter(s => s.destaque && visivel(s));
    const dest = $('[data-destaques]');
    dest.hidden = !!busca || !destaques.length;
    dest.innerHTML = `<div class="secao-cab"><h2>Mais procurados</h2><small>arraste para o lado</small></div>
      <div class="trilho">${destaques.map(s => `<button type="button" class="destaque" data-servico="${esc(s.id)}">${s.foto ? `<img src="${esc(s.foto)}" alt="" loading="lazy">` : ''}
        <span class="etiqueta">${s.duracao ? esc(C.duracaoTxt(s.duracao)) : 'Destaque'}</span>
        <span class="destaque-txt"><b>${esc(s.nome)}</b><span>${esc(C.precoPlanoTxt(s))}</span></span></button>`).join('')}</div>`;
    const bate = s => !busca || (s.nome + ' ' + s.desc).toLowerCase().includes(busca);
    const html = cats.map(c => {
      const lista = servicosDa(c.id).filter(bate);
      if (!lista.length) return '';
      return `<section class="secao caixa" id="cat-${esc(c.id)}" data-secao="${esc(c.id)}"><div class="secao-cab"><h2>${c.icone ? `<span class="secao-ic">${ic(c.icone)}</span>` : ''}${esc(c.nome)}</h2><small>${lista.length} ${lista.length === 1 ? 'serviço' : 'serviços'}</small></div>
        <div class="grade">${lista.map(cartaoServ).join('')}</div></section>`;
    }).join('');
    $('[data-secoes]').innerHTML = html || `<p class="vazio caixa">Nenhum serviço encontrado para “${esc(termo)}”.</p>`;
    observarSecoes();
    requestAnimationFrame(() => typeof setas === 'function' && setas());
  }

  function renderProfissionais() {
    const profs = (D().profissionais || []).filter(p => p.ativo !== false);
    const el = $('[data-profissionais]');
    el.hidden = !profs.length;
    if (!profs.length) return;
    el.innerHTML = `<div class="secao-cab"><h2>${esc(N.rotuloEquipe || 'Nossa equipe')}</h2><small>${profs.length} ${profs.length === 1 ? 'especialista' : 'especialistas'}</small></div>
      <div class="sv-profs">${profs.map(p => {
        const ini = p.nome.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
        return `<article class="sv-prof"><div class="sv-prof-topo"><span class="sv-prof-foto">${p.foto ? `<img src="${esc(p.foto)}" alt="">` : esc(ini)}</span>
          <div><b>${esc(p.nome)}</b><small>${esc(p.cargo || '')}${p.registro ? ` · ${esc(p.registro)}` : ''}</small></div></div>
          ${p.bio ? `<p>${esc(p.bio)}</p>` : ''}
          <button type="button" class="sv-prof-btn" data-agendar-prof="${esc(p.nome)}">${ic('sv-agenda')}${ehOrcamento() ? 'Falar com' : 'Agendar com'} ${esc(p.nome.split(' ')[0])}</button></article>`;
      }).join('')}</div>`;
  }

  function renderGaleria() {
    const gal = D().galeria || [];
    const el = $('[data-galeria]');
    el.hidden = !gal.length;
    if (!gal.length) return;
    el.innerHTML = `<div class="secao-cab"><h2>${esc(N.rotuloGaleria || 'Trabalhos e espaço')}</h2><small>toque para ampliar</small></div>
      <div class="sv-gal">${gal.map((g, i) => `<button type="button" class="sv-gal-item" data-luz-i="${i}"><img src="${esc(g.foto)}" alt="${esc(g.legenda || '')}" loading="lazy">${g.legenda ? `<span>${esc(g.legenda)}</span>` : ''}</button>`).join('')}</div>`;
  }

  function renderDepoimentos() {
    const deps = D().depoimentos || [];
    const el = $('[data-depoimentos]');
    el.hidden = !deps.length;
    if (!deps.length) return;
    el.innerHTML = `<div class="secao-cab"><h2>O que dizem nossos clientes</h2><small>avaliações de exemplo</small></div>
      <div class="sv-deps">${deps.map(d => `<article class="sv-dep"><div class="sv-estrelas" aria-label="5 estrelas">★★★★★</div><p>“${esc(d.texto)}”</p><small>${esc(d.autor)}${d.detalhe ? ` · ${esc(d.detalhe)}` : ''}</small></article>`).join('')}</div>`;
  }

  function renderFaq() {
    const faq = D().faq || [];
    const el = $('[data-faq]');
    el.hidden = !faq.length;
    if (!faq.length) return;
    el.innerHTML = `<div class="secao-cab"><h2>Perguntas frequentes</h2></div>
      <div class="sv-faq">${faq.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.p)}</summary><p>${esc(f.r)}</p></details>`).join('')}</div>`;
  }

  function renderRodape() {
    const l = D().negocio, soOnline = modoAtend() === 'online';
    const linhas = C.DIAS.map((d, i) => { const h = l.horario[i] || []; return `<tr><td>${d}</td><td>${h.length ? h.map(([a, b]) => `${C.hora(a)} às ${C.hora(b)}`).join(' · ') : 'Fechado'}</td></tr>`; }).join('');
    const pagsRodape = pagOnline() ? [`Pagamento online via ${nomePagOnline()} (Pix e cartão)`] : pagamentosAtivos(soOnline ? 'online' : 'local');
    const txtAtend = [];
    if (temLocal()) txtAtend.push('Atendimento presencial com hora marcada.');
    if (temDomicilio()) txtAtend.push(`Atendimento a domicílio${(l.bairros || []).length ? ` em ${l.bairros.map(esc).join(', ')}` : ''}.`);
    if (temOnline()) txtAtend.push('Atendimento 100% online por vídeo ou WhatsApp para todo o Brasil.');
    $('[data-rodape]').innerHTML = `<div class="rodape-grade">
      <div><a class="logo" href="#inicio"><span class="logo-sigla">${marca()}</span><span><span class="logo-nome">${esc(V.nome)}</span></span></a>
        ${soOnline
          ? `<p style="margin-top:14px">Atendimento online · ${esc(l.cidade)}</p>`
          : `<p style="margin-top:14px">${esc(l.endereco)}<br>${esc(l.cidade)}</p><p style="margin-top:12px"><a href="#" data-mapa>Como chegar</a></p>`}
        <h3 style="margin-top:22px">Pagamento</h3><p>${pagsRodape.map(esc).join(' · ')}</p></div>
      <div><h3>Horário</h3><table>${linhas}</table></div>
      <div><h3>Atendimento</h3><p>${txtAtend.join('<br>')}</p></div>
    </div>
    <div class="rodape-base"><span>© ${new Date().getFullYear()} ${esc(V.nome)}</span>
      <span>Site de Serviços por Studio Magalhães · <a href="admin.html${esc(HASH_AMOSTRA)}">Área do negócio</a></span></div>`;
  }

  function renderBarra() {
    const lista = selValidos(), n = lista.length;
    $('[data-contador]').textContent = n || '';
    const b = $('[data-barra]');
    const folhaAberta = $$('.folha').some(f => !f.hidden);
    b.hidden = !n || folhaAberta;
    const sub = subtotalFixo();
    const resumoVal = temItemOrcamento() && !sub ? 'Sob orçamento'
      : (temItemOrcamento() || temItemApartir() ? `a partir de ${R(sub)}` : R(sub));
    b.innerHTML = `<span class="qtd">${n}</span><span class="txt">${resumoVal}${duracaoSel() ? ` · ${C.duracaoTxt(duracaoSel())}` : ''}</span><span class="ir">${esc(verboAcao())}${ic('dir')}</span>`;
  }

  function renderTudo() {
    renderMarca(); renderHero(); renderStatus(); renderDiffs(); renderServicos();
    renderProfissionais(); renderGaleria(); renderDepoimentos(); renderFaq(); renderRodape(); renderBarra();
  }

  /* ---------- Setas e rolagem das categorias ---------- */
  const listaCats = $('[data-cats]');
  function setas() {
    const max = listaCats.scrollWidth - listaCats.clientWidth;
    $('.cats-seta.esq').hidden = listaCats.scrollLeft < 8;
    $('.cats-seta.dir').hidden = listaCats.scrollLeft > max - 8;
  }
  listaCats.addEventListener('scroll', setas, { passive: true });
  window.addEventListener('resize', setas);
  $('.cats-rolo').addEventListener('click', e => { const b = e.target.closest('[data-rolar]'); if (b) listaCats.scrollBy({ left: +b.dataset.rolar * listaCats.clientWidth * .7, behavior: 'smooth' }); });

  let observador, secaoAtiva = '', timerCat;
  function centralizarCat(id, suave = false) {
    const btn = $(`.cat[data-cat="${CSS.escape(id)}"]`);
    if (!btn || listaCats.scrollWidth <= listaCats.clientWidth) return;
    const rLista = listaCats.getBoundingClientRect(), rBtn = btn.getBoundingClientRect();
    if (!suave && rBtn.left >= rLista.left + 8 && rBtn.right <= rLista.right - 8) return;
    const destino = Math.max(0, Math.min(listaCats.scrollWidth - listaCats.clientWidth,
      listaCats.scrollLeft + (rBtn.left - rLista.left) - (rLista.width - rBtn.width) / 2));
    if (suave) listaCats.scrollTo({ left: destino, behavior: 'smooth' });
    else listaCats.scrollLeft = destino;
  }
  function observarSecoes() {
    observador?.disconnect(); secaoAtiva = '';
    observador = new IntersectionObserver(ent => {
      const vis = ent.find(e => e.isIntersecting); if (!vis) return;
      const id = vis.target.dataset.secao; if (id === secaoAtiva) return;
      secaoAtiva = id;
      $$('.cat').forEach(b => b.setAttribute('aria-current', String(b.dataset.cat === id)));
      clearTimeout(timerCat); timerCat = setTimeout(() => centralizarCat(id, false), 140);
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('[data-secao]').forEach(s => observador.observe(s));
  }

  /* ---------- Cena 3D: mouse + giroscópio pausados fora da tela ---------- */
  const hero = $('.hero');
  {
    let heroVisivel = true, rafCena = 0, mxP = 0, myP = 0;
    const aplicarMov = () => { rafCena = 0; if (!heroVisivel) return; const c = $('[data-cena]'); if (!c) return; c.style.setProperty('--mx', mxP.toFixed(3)); c.style.setProperty('--my', myP.toFixed(3)); };
    const mover = (x, y) => { if (!heroVisivel) return; mxP = x; myP = y; if (!rafCena) rafCena = requestAnimationFrame(aplicarMov); };
    new IntersectionObserver(ent => { heroVisivel = !!ent[0]?.isIntersecting; hero.classList.toggle('pausado', !heroVisivel); }, { threshold: 0.01 }).observe(hero);
    hero.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; const r = hero.getBoundingClientRect(); mover((e.clientX - r.left) / r.width * 2 - 1, (e.clientY - r.top) / r.height * 2 - 1); });
    hero.addEventListener('pointerleave', () => mover(0, 0));
    window.addEventListener('deviceorientation', e => { if (!heroVisivel || e.gamma == null) return; mover(Math.max(-1, Math.min(1, e.gamma / 30)), Math.max(-1, Math.min(1, (e.beta - 40) / 30))); }, { passive: true });
  }

  /* ---------- Folhas ---------- */
  const fundo = $('[data-fundo]');
  function abrirFolha(nome) {
    $$('.folha').forEach(f => { f.hidden = f.dataset.folha !== nome; });
    fundo.hidden = false; document.body.style.overflow = 'hidden'; renderBarra();
  }
  function fecharFolhas() {
    $$('.folha').forEach(f => { f.hidden = true; });
    fundo.hidden = true; document.body.style.overflow = ''; renderBarra();
  }
  fundo.addEventListener('click', fecharFolhas);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!$('[data-luz]').hidden) $('[data-luz]').hidden = true;
      else fecharFolhas();
    }
  });

  /* ---------- Detalhe do Serviço ---------- */
  let servAberto = null;
  function abrirServico(id) {
    const s = C.servico(id); if (!s) return;
    servAberto = s;
    const f = $('[data-folha="servico"]'), ativo = selecionados.includes(s.id);
    f.innerHTML = `<div class="folha-topo"><h3>${esc(s.nome)}</h3><button type="button" class="fechar" data-fechar aria-label="Fechar">${ic('x')}</button></div>
      <div class="folha-corpo">
        ${s.foto ? `<img class="prod-hero-foto" src="${esc(s.foto)}" alt="">` : ''}
        <p style="margin:0 0 12px;color:var(--suave);line-height:1.55">${esc(s.desc)}</p>
        <div class="resumo" style="margin-bottom:14px">
          <div><span>Valor</span><b>${C.precoPlanoTxt(s)}</b></div>
          ${s.duracao ? `<div><span>Duração estimada</span><b>${esc(C.duracaoTxt(s.duracao))}</b></div>` : ''}
        </div>
        ${(s.inclusos || []).length ? `<div class="campo"><span class="rotulo">O que está incluído</span><ul style="margin:4px 0 0;padding-left:18px;color:var(--suave);font-size:.9rem;line-height:1.6">${s.inclusos.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
      </div>
      <div class="folha-pe">
        <button type="button" class="btn btn-p btn-total" data-confirmar-serv="${esc(s.id)}">
          <span>${ativo ? `${ic('check')} Já selecionado · ir para ${ehOrcamento() ? 'orçamento' : 'agendamento'}` : `${ic('mais')} Selecionar e ${ehOrcamento() ? 'pedir orçamento' : 'agendar'}`}</span>
          <span>${esc(C.precoPlanoTxt(s))}</span>
        </button>
      </div>`;
    abrirFolha('servico');
  }
  $('[data-folha="servico"]').addEventListener('click', e => {
    if (e.target.closest('[data-fechar]')) { fecharFolhas(); return; }
    const b = e.target.closest('[data-confirmar-serv]');
    if (b) {
      const id = b.dataset.confirmarServ;
      if (!selecionados.includes(id)) { selecionados.push(id); salvarSel(); renderServicos(); }
      abrirAgenda();
    }
  });

  /* ---------- Próximos dias disponíveis e horários ---------- */
  function proximosDias() {
    const out = [], l = D().negocio, hoje = new Date();
    const abr = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    for (let i = 0; i < 14 && out.length < 7; i++) {
      const d = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + i);
      const h = (l.horario[d.getDay()] || [])[0];
      if (!h) continue;
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const label = i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : abr[d.getDay()];
      out.push({ iso, label, diaMes: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`, janela: h });
    }
    return out;
  }
  function horariosDoDia(iso) {
    const dia = proximosDias().find(x => x.iso === iso);
    if (!dia) return ['09:00', '10:30', '14:00', '15:30', '17:00'];
    const [a, b] = dia.janela;
    const minA = parseInt(a.split(':')[0], 10) * 60 + parseInt(a.split(':')[1] || '0', 10);
    const minB = parseInt(b.split(':')[0], 10) * 60 + parseInt(b.split(':')[1] || '0', 10);
    const passo = Math.max(30, Math.min(90, +(D().negocio.intervaloMin || 60)));
    const out = [];
    for (let m = minA; m <= minB - 30 && out.length < 16; m += passo) {
      out.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`);
    }
    return out.length ? out : ['09:00', '11:00', '14:00', '16:00'];
  }

  /* ---------- Cupons (com trava 1 uso por cliente) ---------- */
  let erroEnvio = '', cupomCod = '', cupomDigitado = '', cupomErro = '';
  const cuponsUsados = lerLocal(CH + ':cupons-usados', {});
  const normWhats = w => String(w || '').replace(/\D/g, '');
  function cupomJaUsado(cod) {
    if (!cod) return false;
    const reg = cuponsUsados[cod], w = normWhats(cliente.whats);
    if (reg && (reg.aparelho || (w.length >= 10 && Array.isArray(reg.whats) && reg.whats.includes(w)))) return true;
    if (w.length >= 10) return C.solicitacoes().some(p => p.status !== 'cancelado' && String(p.cupom || '').trim().toUpperCase() === cod && normWhats(p.whats) === w);
    return false;
  }
  function registrarUsoCupom(cod, whats) {
    if (!cod) return;
    const reg = cuponsUsados[cod] || { aparelho: false, whats: [] };
    reg.aparelho = true;
    const w = normWhats(whats);
    if (w.length >= 10 && !reg.whats.includes(w)) reg.whats.push(w);
    cuponsUsados[cod] = reg;
    gravarLocal(CH + ':cupons-usados', cuponsUsados);
  }
  function calcularCupom(sub) {
    if (!cupomCod) return { cupom: null, desconto: 0, motivo: '' };
    const cp = (D().cupons || []).find(c => c.ativo !== false && String(c.codigo || '').trim().toUpperCase() === cupomCod);
    if (!cp) return { cupom: null, desconto: 0, motivo: 'Cupom inválido ou desativado.' };
    if (cp.usoUnico !== false && cupomJaUsado(cupomCod)) return { cupom: cp, desconto: 0, motivo: 'Este cupom é de uso único e já foi utilizado.' };
    if (+cp.minimo && sub < +cp.minimo) return { cupom: cp, desconto: 0, motivo: `Válido a partir de ${R(cp.minimo)}.` };
    if (!sub) return { cupom: cp, desconto: 0, motivo: '' };
    const raw = cp.tipo === 'valor' ? (+cp.valor || 0) : sub * ((+cp.valor || 0) / 100);
    return { cupom: cp, desconto: Math.min(sub, Math.round(raw * 100) / 100), motivo: '' };
  }

  /* ---------- Folha de Agendamento / Orçamento ---------- */
  function renderAgenda() {
    const l = D().negocio, f = $('[data-folha="agenda"]'), lista = selValidos();
    const uLoc = temLocal(), uDom = temDomicilio(), uOn = temOnline();
    const valido = (cliente.tipoAtendimento === 'local' && uLoc) || (cliente.tipoAtendimento === 'domicilio' && uDom) || (cliente.tipoAtendimento === 'online' && uOn);
    if (!valido) cliente.tipoAtendimento = uLoc ? 'local' : (uDom ? 'domicilio' : 'online');
    const pagsDisp = pagamentosAtivos(cliente.tipoAtendimento);
    if (cliente.pagamento && !pagsDisp.includes(cliente.pagamento)) cliente.pagamento = '';
    const dias = proximosDias();
    if (!ehOrcamento() && dias.length && !dias.some(d => d.iso === cliente.data)) cliente.data = dias[0].iso;
    const horas = !ehOrcamento() ? horariosDoDia(cliente.data) : [];
    const profs = (D().profissionais || []).filter(p => p.ativo !== false);
    const sub = subtotalFixo(), sit = C.situacao();
    const { cupom, desconto, motivo: cupomMotivo } = calcularCupom(sub);
    const temCupons = (D().cupons || []).some(c => c.ativo !== false);
    const totalFinal = Math.max(0, Math.round((sub - desconto) * 100) / 100);
    const camposExtra = N.camposSolicitacao || [];

    f.innerHTML = `<div class="folha-topo"><h3>${esc(verboAcao())}</h3><button type="button" class="fechar" data-fechar aria-label="Fechar">${ic('x')}</button></div>
    <div class="folha-corpo">
      <div class="campo"><span class="rotulo">${lista.length ? 'Serviços escolhidos' : 'Escolha um serviço (opcional)'}</span>
        ${lista.length ? lista.map(s => `<div class="item-car">${s.foto ? `<img src="${esc(s.foto)}" alt="">` : '<span></span>'}
          <div><b>${esc(s.nome)}</b><ul>${s.duracao ? `<li>Duração: ${esc(C.duracaoTxt(s.duracao))}</li>` : ''}</ul><div class="preco">${esc(C.precoPlanoTxt(s))}</div></div>
          <button type="button" class="fechar" style="width:36px;height:36px" data-tirar-serv="${esc(s.id)}" aria-label="Remover">${ic('lixo')}</button></div>`).join('')
          : `<p class="vazio" style="padding:14px 8px">Você pode enviar uma solicitação geral ou selecionar serviços abaixo.</p>`}
      </div>

      ${(uLoc + uDom + uOn) > 1 ? `<div class="campo"><span class="rotulo">Como prefere o atendimento?</span><div class="escolha2">
        ${uLoc ? `<button type="button" data-tipo-at="local" aria-pressed="${cliente.tipoAtendimento === 'local'}">Presencial<small>No nosso espaço</small></button>` : ''}
        ${uDom ? `<button type="button" data-tipo-at="domicilio" aria-pressed="${cliente.tipoAtendimento === 'domicilio'}">A domicílio<small>Vamos até você</small></button>` : ''}
        ${uOn ? `<button type="button" data-tipo-at="online" aria-pressed="${cliente.tipoAtendimento === 'online'}">Online<small>Vídeo ou WhatsApp</small></button>` : ''}
      </div></div>` : ''}

      ${cliente.tipoAtendimento === 'local' ? `<div class="alerta">${ic('pin')}<span>Atendimento em ${esc(l.endereco)} · ${esc(l.cidade)}.</span></div>` : ''}
      ${cliente.tipoAtendimento === 'online' ? `<div class="alerta">${ic('sv-video')}<span>Atendimento 100% online por videochamada ou WhatsApp.</span></div>` : ''}
      ${cliente.tipoAtendimento === 'domicilio' ? `
        ${(l.bairros || []).length ? `<label class="campo"><span>Bairro / Região</span><select class="entrada" data-cli="bairro"><option value="">Escolha o bairro</option>${l.bairros.map(b => `<option value="${esc(b)}"${b === cliente.bairro ? ' selected' : ''}>${esc(b)}</option>`).join('')}</select></label>` : ''}
        <label class="campo"><span>Endereço para visita</span><input class="entrada" data-cli="endereco" value="${esc(cliente.endereco)}" placeholder="Ex.: Rua das Flores, 120 · apto 302"></label>` : ''}

      ${profs.length ? `<div class="campo"><span class="rotulo">Profissional de preferência</span><div class="chips">
        <button type="button" data-prof="" aria-pressed="${!cliente.profissional}">Qualquer disponível</button>
        ${profs.map(p => `<button type="button" data-prof="${esc(p.nome)}" aria-pressed="${cliente.profissional === p.nome}">${esc(p.nome.split(' ')[0])}</button>`).join('')}
      </div></div>` : ''}

      ${!ehOrcamento() ? `
        <div class="campo"><span class="rotulo">Escolha o dia</span>
          <div class="sv-dias-chips">${dias.map(d => `<button type="button" class="sv-dia-btn" data-dia-iso="${d.iso}" aria-pressed="${cliente.data === d.iso}"><b>${d.label}</b><small>${d.diaMes}</small></button>`).join('')}</div></div>
        <div class="campo"><span class="rotulo">Horário preferido</span>
          <div class="chips">${horas.map(h => `<button type="button" data-hora-sel="${h}" aria-pressed="${cliente.hora === h}">${h}</button>`).join('')}</div></div>` : ''}

      ${camposExtra.map(cp => cp.tipo === 'select'
        ? `<label class="campo"><span>${esc(cp.rotulo)}${cp.obrig ? '' : ' (opcional)'}</span><select class="entrada" data-extra="${esc(cp.id)}"><option value="">Selecione…</option>${(cp.opcoes || []).map(op => `<option value="${esc(op)}"${(cliente.extras || {})[cp.id] === op ? ' selected' : ''}>${esc(op)}</option>`).join('')}</select></label>`
        : `<label class="campo"><span>${esc(cp.rotulo)}${cp.obrig ? '' : ' (opcional)'}</span><input class="entrada" type="${cp.tipo || 'text'}" data-extra="${esc(cp.id)}" value="${esc((cliente.extras || {})[cp.id] || '')}" placeholder="${esc(cp.placeholder || '')}"></label>`).join('')}

      <label class="campo"><span>Seu nome</span><input class="entrada" data-cli="nome" value="${esc(cliente.nome)}" autocomplete="name" placeholder="Como podemos te chamar?"></label>
      <label class="campo"><span>Seu WhatsApp</span><input class="entrada" data-cli="whats" type="tel" inputmode="tel" autocomplete="tel" value="${esc(cliente.whats)}" placeholder="(21) 99999-9999"></label>

      ${sub > 0 || pagOnline() ? `<div class="campo"><span class="rotulo">Forma de pagamento${pagOnline() ? ' (sinal / online)' : ' prevista'}</span><div class="chips">
        ${pagsDisp.map(pg => `<button type="button" data-pag="${esc(pg)}" aria-pressed="${cliente.pagamento === pg}">${esc(pg)}</button>`).join('')}</div>
        ${pagOnline() ? `<div class="alerta" style="margin-top:10px">${ic('check')}<span>Pagamento seguro direto no site via <b>${esc(nomePagOnline())}</b>${pagOnline() === 'infinitepay' ? ' (Pix taxa zero e cartão)' : ' (Pix e cartão)'}.</span></div>` : ''}</div>` : ''}

      ${temCupons || cupomCod ? `<div class="campo"><span class="rotulo">Cupom promocional (opcional)</span>
        ${cupom && !cupomMotivo ? `<div class="cupom-ok"><span>${ic('tag')} ${esc(cupomCod)}${desconto > 0 ? ` · - ${R(desconto)}` : ' · aplicado'}</span><button type="button" data-tirar-cupom>Remover</button></div>`
          : `<div class="cupom-linha"><input class="entrada" data-cupom-in value="${esc(cupomDigitado)}" maxlength="24" placeholder="Ex.: BEMVINDO10"><button type="button" class="btn btn-borda" data-aplicar-cupom>Aplicar</button></div>`}
        ${cupomErro || cupomMotivo ? `<div class="cupom-erro">${esc(cupomErro || cupomMotivo)}</div>` : ''}</div>` : ''}

      <label class="campo"><span>Detalhes / observações (opcional)</span><textarea class="entrada" data-cli="obs" maxlength="240" placeholder="${esc(N.obsPlaceholder || 'Conte qualquer detalhe importante para o atendimento…')}">${esc(cliente.obs)}</textarea></label>

      ${sub > 0 || duracaoSel() ? `<div class="resumo">
        ${duracaoSel() ? `<div><span>Duração estimada</span><span>${esc(C.duracaoTxt(duracaoSel()))}</span></div>` : ''}
        ${sub > 0 ? `<div><span>Valor estimado</span><span>${temItemApartir() || temItemOrcamento() ? 'a partir de ' : ''}${R(sub)}</span></div>` : ''}
        ${desconto > 0 ? `<div class="desc-linha"><span>Cupom ${esc(cupomCod)}</span><span>- ${R(desconto)}</span></div>` : ''}
        ${sub > 0 ? `<div class="total"><span>Total estimado</span><span>${temItemApartir() || temItemOrcamento() ? 'a partir de ' : ''}${R(totalFinal)}</span></div>` : ''}
      </div>` : ''}

      ${!sit.aberta ? `<div class="alerta erro">${ic('relogio')}<span>${esc(sit.texto)} · ${esc(sit.detalhe)}.</span></div>` : ''}
      ${erroEnvio ? `<div class="alerta erro" data-erro>${ic('info')}<span>${esc(erroEnvio)}</span></div>` : ''}
    </div>
    <div class="folha-pe"><button type="button" class="btn btn-p btn-total" data-enviar${!sit.aberta ? ' disabled' : ''}>
      <span>${pagOnline() && sub > 0 ? `${ic('check')} Confirmar com ${esc(nomePagOnline())}` : `${ic('whats')} ${esc(verboAcao())}`}</span>
      <span>${sub > 0 ? (temItemApartir() || temItemOrcamento() ? `~${R(totalFinal)}` : R(totalFinal)) : 'Grátis'}</span></button>
      <p class="nota">${pagOnline() && sub > 0 ? `Checkout seguro via ${esc(nomePagOnline())}. Na demonstração, confirma na hora na Área do negócio.` : 'Abre pronto no WhatsApp para você confirmar com nossa equipe.'}</p></div>`;
  }

  function abrirAgenda() { erroEnvio = ''; cupomErro = ''; renderAgenda(); abrirFolha('agenda'); }
  const folhaAg = $('[data-folha="agenda"]');
  const manterRolagem = fn => { const c = $('.folha-corpo', folhaAg), y = c ? c.scrollTop : 0; fn(); const n = $('.folha-corpo', folhaAg); if (n) n.scrollTop = y; };

  folhaAg.addEventListener('click', e => {
    if (e.target.closest('[data-fechar]')) { fecharFolhas(); return; }
    const rm = e.target.closest('[data-tirar-serv]');
    if (rm) { selecionados = selecionados.filter(x => x !== rm.dataset.tirarServ); salvarSel(); renderServicos(); renderBarra(); manterRolagem(renderAgenda); return; }
    if (e.target.closest('[data-aplicar-cupom]')) {
      const cod = String($('[data-cupom-in]', folhaAg)?.value || '').trim().toUpperCase().replace(/\s+/g, '');
      cupomDigitado = cod; cupomErro = '';
      if (!cod) { cupomCod = ''; manterRolagem(renderAgenda); return; }
      cupomCod = cod;
      const r = calcularCupom(subtotalFixo());
      if (r.motivo) { cupomErro = r.motivo; if (!r.cupom) cupomCod = ''; }
      else aviso(`Cupom ${cod} aplicado`, 'tag');
      manterRolagem(renderAgenda); return;
    }
    if (e.target.closest('[data-tirar-cupom]')) { cupomCod = ''; cupomDigitado = ''; cupomErro = ''; manterRolagem(renderAgenda); return; }
    const b = e.target.closest('[data-tipo-at],[data-prof],[data-dia-iso],[data-hora-sel],[data-pag],[data-enviar]');
    if (!b) return;
    if (b.dataset.tipoAt) cliente.tipoAtendimento = b.dataset.tipoAt;
    if (b.dataset.prof !== undefined) cliente.profissional = b.dataset.prof;
    if (b.dataset.diaIso) { cliente.data = b.dataset.diaIso; cliente.hora = ''; }
    if (b.dataset.horaSel) cliente.hora = b.dataset.horaSel;
    if (b.dataset.pag) cliente.pagamento = b.dataset.pag;
    if (b.dataset.enviar !== undefined) { enviar(); return; }
    salvarCli(); manterRolagem(renderAgenda);
  });
  folhaAg.addEventListener('input', e => {
    if (e.target.matches('[data-cupom-in]')) { cupomDigitado = e.target.value.toUpperCase().replace(/\s+/g, ''); return; }
    if (e.target.dataset.extra) { (cliente.extras ||= {})[e.target.dataset.extra] = e.target.value; salvarCli(); return; }
    if (e.target.dataset.cli) { cliente[e.target.dataset.cli] = e.target.value; salvarCli(); }
  });
  folhaAg.addEventListener('change', e => {
    if (e.target.dataset.extra) { (cliente.extras ||= {})[e.target.dataset.extra] = e.target.value; salvarCli(); return; }
    if (e.target.dataset.cli === 'whats' && cupomCod) manterRolagem(renderAgenda);
    else if (e.target.dataset.cli) { cliente[e.target.dataset.cli] = e.target.value; salvarCli(); }
  });

  function dataBR(iso) { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || '')); return m ? `${m[3]}/${m[2]}/${m[1]}` : iso; }
  function enviar() {
    const l = D().negocio, lista = selValidos(), falta = [];
    if (!ehOrcamento() && !cliente.hora) falta.push('o horário preferido');
    if (cliente.tipoAtendimento === 'domicilio' && !cliente.endereco.trim()) falta.push('o endereço da visita');
    for (const cp of (N.camposSolicitacao || [])) {
      if (cp.obrig && !String((cliente.extras || {})[cp.id] || '').trim()) falta.push(cp.rotulo.toLowerCase());
    }
    if (!cliente.nome.trim()) falta.push('seu nome');
    if (normWhats(cliente.whats).length < 10) falta.push('seu WhatsApp com DDD');
    if (falta.length) { erroEnvio = 'Falta preencher: ' + falta.join(', ') + '.'; manterRolagem(renderAgenda); $('[data-erro]', folhaAg)?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    const sub = Math.round(subtotalFixo() * 100) / 100;
    const { cupom, desconto, motivo: cupomMotivo } = calcularCupom(sub);
    if (cupomCod && cupomMotivo) { cupomErro = cupomMotivo; erroEnvio = cupomMotivo; manterRolagem(renderAgenda); $('[data-erro]', folhaAg)?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    const total = Math.max(0, Math.round((sub - desconto) * 100) / 100);
    const provOnline = sub > 0 ? nomePagOnline() : '';
    const extrasResumo = (N.camposSolicitacao || []).map(cp => [cp.rotulo, String((cliente.extras || {})[cp.id] || '').trim()]).filter(([, v]) => v);
    const sol = C.registrarSolicitacao({
      servicos: lista.map(s => ({ id: s.id, nome: s.nome, preco: s.precoTipo === 'orcamento' ? 0 : (+s.preco || 0), precoTipo: s.precoTipo || 'fixo', duracao: +s.duracao || 0 })),
      subtotal: sub, desconto, cupom: cupom ? cupomCod : '', total, temOrcamento: temItemOrcamento() || !lista.length,
      tipoAtendimento: cliente.tipoAtendimento,
      profissional: cliente.profissional || '',
      dataDesejada: !ehOrcamento() ? cliente.data : ((cliente.extras || {}).dataEvento || ''),
      horaDesejada: !ehOrcamento() ? cliente.hora : '',
      bairro: cliente.tipoAtendimento === 'domicilio' ? cliente.bairro : '',
      endereco: cliente.tipoAtendimento === 'domicilio' ? cliente.endereco.trim() : '',
      camposExtra: extrasResumo,
      nome: cliente.nome.trim(), whats: cliente.whats.trim(),
      pagamento: provOnline ? `${cliente.pagamento || 'Pix online'} (${provOnline})` : (cliente.pagamento || 'A combinar'),
      pagoOnline: provOnline || '', obs: cliente.obs.trim()
    });
    if (!provOnline) {
      const m = [`*${ehOrcamento() ? 'Orçamento' : 'Agendamento'} nº ${sol.numero} · ${V.nome}*`, ''];
      if (lista.length) lista.forEach(s => m.push(`• *${s.nome}* (${C.precoPlanoTxt(s)}${s.duracao ? ` · ${C.duracaoTxt(s.duracao)}` : ''})`));
      else m.push('• Solicitação geral de atendimento');
      if (sol.profissional) m.push(`*Profissional:* ${sol.profissional}`);
      if (sol.dataDesejada) m.push(`*Data:* ${dataBR(sol.dataDesejada)}${sol.horaDesejada ? ` às ${sol.horaDesejada}` : ''}`);
      m.push(`*Atendimento:* ${sol.tipoAtendimento === 'online' ? 'Online' : sol.tipoAtendimento === 'domicilio' ? `A domicílio (${[sol.endereco, sol.bairro].filter(Boolean).join(' · ')})` : 'Presencial'}`);
      extrasResumo.forEach(([k, v]) => m.push(`*${k}:* ${v}`));
      if (sub > 0) {
        m.push('', `Valor estimado: ${R(sub)}`);
        if (desconto > 0) m.push(`Cupom (${cupomCod}): - ${R(desconto)}`);
        m.push(`*Total estimado: ${R(total)}*`);
      } else if (cupom) m.push(`*Cupom:* ${cupomCod}`);
      if (sol.pagamento) m.push(`*Pagamento:* ${sol.pagamento}`);
      m.push(`*Nome:* ${sol.nome}`, `*WhatsApp:* ${sol.whats}`);
      if (sol.obs) m.push(`*Observações:* ${sol.obs}`);
      const num = normWhats(l.whats), n = num && num.length <= 11 ? '55' + num : num;
      window.open(`https://wa.me/${n}?text=${encodeURIComponent(m.join('\n'))}`, '_blank', 'noopener');
    }
    if (cupom && cupomCod) registrarUsoCupom(cupomCod, cliente.whats);
    selecionados = []; cupomCod = ''; cupomDigitado = ''; cliente.obs = ''; cliente.hora = '';
    salvarSel(); salvarCli(); fecharFolhas(); renderServicos(); renderBarra();
    aviso(provOnline ? `Agendamento nº ${sol.numero} confirmado via ${provOnline} (simulação)` : `${ehOrcamento() ? 'Orçamento' : 'Agendamento'} nº ${sol.numero} pronto no WhatsApp`, provOnline ? 'check' : 'whats');
  }

  /* ---------- Cliques gerais ---------- */
  app.addEventListener('click', e => {
    const t = e.target;
    const ancora = t.closest('a[href="#servicos"], a[href="#inicio"]');
    if (ancora) {
      e.preventDefault();
      if (ancora.getAttribute('href') === '#inicio') window.scrollTo({ top: 0, behavior: 'smooth' });
      else { const alv = $('#servicos'); if (alv) window.scrollTo({ top: Math.max(0, alv.getBoundingClientRect().top + window.scrollY - 115), behavior: 'smooth' }); }
      return;
    }
    if (t.closest('[data-abrir-agenda],[data-barra]')) { abrirAgenda(); return; }
    const profBtn = t.closest('[data-agendar-prof]');
    if (profBtn) { cliente.profissional = profBtn.dataset.agendarProf; salvarCli(); abrirAgenda(); return; }
    const luzBtn = t.closest('[data-luz-i]');
    if (luzBtn) {
      const item = (D().galeria || [])[+luzBtn.dataset.luzI]; if (!item) return;
      const lz = $('[data-luz]'); $('img', lz).src = item.foto; $('p', lz).textContent = item.legenda || ''; lz.hidden = false; return;
    }
    if (t.closest('[data-fechar-luz]') || t === $('[data-luz]')) { $('[data-luz]').hidden = true; return; }
    const cat = t.closest('[data-cat]');
    if (cat) {
      const id = cat.dataset.cat; secaoAtiva = id;
      $$('.cat').forEach(b => b.setAttribute('aria-current', String(b.dataset.cat === id)));
      centralizarCat(id, true);
      const sec = $(`#cat-${CSS.escape(id)}`);
      if (sec) window.scrollTo({ top: Math.max(0, sec.getBoundingClientRect().top + window.scrollY - 128), behavior: 'smooth' });
      return;
    }
    const sv = t.closest('[data-servico]');
    if (sv) {
      const id = sv.dataset.servico;
      if (t.closest('[data-toggle-serv]')) {
        if (selecionados.includes(id)) { selecionados = selecionados.filter(x => x !== id); aviso('Serviço removido', 'info'); }
        else { selecionados.push(id); aviso(`${C.servico(id).nome} selecionado`, 'check'); }
        salvarSel(); renderServicos(); renderBarra(); return;
      }
      abrirServico(id); return;
    }
    if (t.closest('[data-mapa]')) { e.preventDefault(); const l = D().negocio; window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${l.endereco} ${l.cidade}`), '_blank', 'noopener'); }
  });
  const buscaEl = $('[data-busca]'), buscaIn = $('input', buscaEl);
  buscaEl.addEventListener('click', () => { buscaEl.classList.add('aberta'); buscaIn.focus(); });
  buscaIn.addEventListener('input', () => { termo = buscaIn.value; renderServicos(); });
  buscaIn.addEventListener('blur', () => { if (!buscaIn.value) buscaEl.classList.remove('aberta'); });

  renderTudo();
  setInterval(renderStatus, 60000);
  C.aoMudar(tipo => {
    if (tipo === 'visual') { V = C.visual; T = C.textos; aplicarTema(); renderMarca(); renderHero(); renderStatus(); renderRodape(); if (!$('[data-folha="agenda"]').hidden) renderAgenda(); return; }
    if (tipo === 'dados') { renderStatus(); renderInfos(); renderDiffs(); renderServicos(); renderProfissionais(); renderGaleria(); renderDepoimentos(); renderFaq(); renderRodape(); renderBarra(); if (!$('[data-folha="agenda"]').hidden) renderAgenda(); }
  });
})();
