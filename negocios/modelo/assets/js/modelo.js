/* Site modelo · Studio Magalhães
   Monta o site a partir de ramos.js e controla o painel de edição. */
(() => {
  'use strict';
  const R = window.RAMOS, I = window.ICONES;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || I.ponto}</svg>`;

  /* ---------- Opções do painel ---------- */
  const FONTES = {
    moderna:    { nome: 'Moderna',    t: "'Montserrat', sans-serif",          c: "'Inter', sans-serif",         tn: 'Montserrat', cn: 'Inter' },
    elegante:   { nome: 'Elegante',   t: "'Playfair Display', Georgia, serif", c: "'Source Sans 3', sans-serif", tn: 'Playfair Display', cn: 'Source Sans 3' },
    acolhedora: { nome: 'Acolhedora', t: "'Fraunces', Georgia, serif",         c: "'Nunito Sans', sans-serif",   tn: 'Fraunces', cn: 'Nunito Sans' },
    marcante:   { nome: 'Marcante',   t: "'Bricolage Grotesque', sans-serif",  c: "'DM Sans', sans-serif",       tn: 'Bricolage Grotesque', cn: 'DM Sans' }
  };
  const ESTILOS = {
    arredondado: { nome: 'Arredondado', desc: 'Cantos suaves, botões em pílula e foto com cartão.' },
    reto:        { nome: 'Reto',        desc: 'Linhas firmes e foto em tela cheia no topo.' },
    minimalista: { nome: 'Minimalista', desc: 'Centralizado, sem sombras, muito respiro.' },
    vibrante:    { nome: 'Vibrante',    desc: 'Cor forte no topo, formas soltas e contornos.' }
  };
  const PALETAS = [
    ['Estúdio', '#0c1a36', '#4fc3c8'], ['Terracota', '#b5482a', '#e9b949'], ['Petróleo', '#1f6f78', '#9ad8c8'],
    ['Grafite e ouro', '#2b2522', '#c9a46a'], ['Vinho e rosé', '#8e3b5a', '#f2c1b0'], ['Azul e amarelo', '#1d4ed8', '#fbbf24'],
    ['Oliva', '#4f6b2f', '#e3c07b'], ['Lavanda', '#5b4b9a', '#f4a6c1'], ['Laranja e marinho', '#e8590c', '#1b4965'],
    ['Verde e limão', '#15803d', '#d9f99d']
  ];
  const SECOES = ['destaques', 'catalogo', 'passos', 'sobre', 'galeria', 'agenda', 'depoimentos', 'faq', 'contato'];
  const DISP = { tablet: [820, 1180], celular: [390, 844] };
  const CHAVE = 'sm-site-modelo:v1', CHAVE_SALVOS = 'sm-site-modelo:salvos', CHAVE_UI = 'sm-site-modelo:ui';

  /* ---------- Armazenamento (nunca quebra o site se o navegador bloquear) ---------- */
  const ler = (k, padrao) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : padrao; } catch { return padrao; } };
  const gravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sem armazenamento */ } };

  function estadoInicial(ramo = 'restaurante') {
    const s = R[ramo].sugestao;
    return { v: 1, ramo, nome: '', whats: '', logo: 'monograma', cor1: s.cor1, cor2: s.cor2, tema: s.tema || 'claro',
      fonte: s.fonte, estilo: s.estilo, secoes: {}, flutuante: true, textos: {}, visualTocado: false };
  }
  function normalizar(o) {
    if (!o || typeof o !== 'object' || !R[o.ramo]) return null;
    const base = estadoInicial(o.ramo);
    const s = { ...base, ...o };
    if (!FONTES[s.fonte]) s.fonte = base.fonte;
    if (!ESTILOS[s.estilo]) s.estilo = base.estilo;
    if (!/^#[0-9a-f]{6}$/i.test(s.cor1)) s.cor1 = base.cor1;
    if (!/^#[0-9a-f]{6}$/i.test(s.cor2)) s.cor2 = base.cor2;
    if (s.tema !== 'escuro') s.tema = 'claro';
    if (!['monograma', 'icone', 'texto'].includes(s.logo)) s.logo = 'monograma';
    s.secoes = (s.secoes && typeof s.secoes === 'object') ? s.secoes : {};
    s.textos = (s.textos && typeof s.textos === 'object') ? s.textos : {};
    s.nome = String(s.nome || '').slice(0, 60);
    s.whats = String(s.whats || '').slice(0, 30);
    return s;
  }
  const codificar = obj => btoa(unescape(encodeURIComponent(JSON.stringify(obj)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const decodificar = txt => {
    try {
      let t = String(txt).trim().replace(/^.*#v=/, '').replace(/^SM1:/, '').replace(/-/g, '+').replace(/_/g, '/');
      while (t.length % 4) t += '=';
      return normalizar(JSON.parse(decodeURIComponent(escape(atob(t)))));
    } catch { return null; }
  };

  let S = (location.hash.startsWith('#v=') && decodificar(location.hash)) || normalizar(ler(CHAVE)) || estadoInicial();
  if (location.hash.startsWith('#v=')) history.replaceState(null, '', location.pathname + location.search);
  const ui = Object.assign({ disp: 'livre', editar: true, aba: 'negocio', dicaVista: false }, ler(CHAVE_UI, {}), { painel: false, apresentando: false });
  if (!DISP[ui.disp]) ui.disp = 'livre';
  let sacola = {};               // índice do item -> quantidade
  const fotosTemp = {};          // fotos trocadas na hora (só nesta sessão)
  let salvarTimer;
  const salvar = () => { clearTimeout(salvarTimer); salvarTimer = setTimeout(() => gravar(CHAVE, S), 250); };
  window.addEventListener('pagehide', () => { clearTimeout(salvarTimer); gravar(CHAVE, S); });
  const salvarUI = () => gravar(CHAVE_UI, { disp: ui.disp, editar: ui.editar, aba: ui.aba, dicaVista: ui.dicaVista });

  /* ---------- Acesso aos textos ---------- */
  const ramo = () => R[S.ramo];
  const nome = () => S.nome.trim() || ramo().nomePadrao;
  const secoes = () => ({ ...ramo().secoesPadrao, ...(S.secoes[S.ramo] || {}) });
  function original(k) { return k.split('.').reduce((o, p) => (o == null ? o : o[p]), ramo().textos); }
  function tx(k) { const o = S.textos[S.ramo]; return (o && o[k] != null) ? o[k] : (original(k) ?? ''); }
  const T = (tag, k, cls = '', extra = '') => `<${tag}${cls ? ` class="${cls}"` : ''} data-k="${k}"${extra}>${esc(tx(k))}</${tag}>`;
  // window.FOTOS existe só na versão de arquivo único (fotos embutidas)
  const foto = k => fotosTemp[S.ramo + '/' + k] || (window.FOTOS && window.FOTOS[S.ramo + '/' + k]) || `assets/fotos/${S.ramo}/${k}.jpg`;
  const trocar = k => `<button type="button" class="trocar-foto" data-trocar="${k}">${ic('foto')}Trocar foto</button>`;
  const iniciais = n => n.replace(/&/g, ' ').split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase();
  const slug = n => n.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');

  /* ---------- Cores: contraste automático ---------- */
  function rgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function lum([r, g, b]) { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); }
  const contraste = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + .05) / (y + .05); };
  const hex = c => '#' + c.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const misturar = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  function tintaSobre(h) { const c = rgb(h); return contraste(c, [255, 255, 255]) >= contraste(c, [20, 18, 22]) ? '#ffffff' : '#16141a'; }
  function corLegivel(h, escuro) {
    const fundo = escuro ? [16, 17, 20] : [252, 251, 248], alvo = escuro ? [255, 255, 255] : [0, 0, 0];
    let c = rgb(h);
    for (let i = 0; i < 12 && contraste(c, fundo) < 4.5; i++) c = misturar(c, alvo, .14);
    return hex(c);
  }

  /* ---------- Elementos fixos ---------- */
  const aparelho = $('#aparelho'), rolagem = $('#rolagem'), site = $('#site'), moldura = $('#moldura'), palco = $('#palco');
  const PT = (() => { const d = document.createElement('div'); try { d.contentEditable = 'plaintext-only'; } catch { return false; } return d.contentEditable === 'plaintext-only'; })();

  /* ============================================================
     Montagem do site
     ============================================================ */
  function logoHTML() {
    const r = ramo();
    const marca = S.logo === 'icone' ? ic(r.icone) : esc(iniciais(nome()));
    return `<a class="logo" href="#inicio" data-ir="inicio" data-logo="${S.logo}">
      <span class="logo-marca" data-marca>${marca}</span>
      <span class="logo-textos"><span class="logo-nome" data-nome>${esc(nome())}</span><span class="logo-seg">${esc(r.segmento)}</span></span></a>`;
  }

  function render() {
    const r = ramo(), t = r.textos;
    const itens = t.itens.map((it, i) => ({ ...it, i }));
    const cats = [...new Set(itens.map(x => x.cat))];
    const dias = proximosDias();
    const ag = r.agenda;
    const rotServ = ag.rotuloServico || 'Serviço';

    const campoAgenda = c => {
      switch (c) {
        case 'servico': return `<label class="campo"><span>${esc(rotServ)}</span><select class="entrada" name="servico">${itens.map(x => `<option value="${x.i}">${esc(tx(`itens.${x.i}.nome`))}</option>`).join('')}</select></label>`;
        case 'pessoas': return `<fieldset class="campo"><legend>Pessoas</legend><div class="opcoes" data-grupo="pessoas">${['1 a 2', '3 a 4', '5 a 6', '7 ou mais'].map((p, i) => `<button type="button" class="op" aria-pressed="${i === 0}" data-valor="${p}">${p}</button>`).join('')}</div></fieldset>`;
        case 'dia': return `<fieldset class="campo"><legend>Dia</legend><div class="opcoes" data-grupo="dia">${dias.map((d, i) => `<button type="button" class="op" aria-pressed="${i === 1}" data-valor="${d.valor}">${d.rotulo}<small>${d.data}</small></button>`).join('')}</div></fieldset>`;
        case 'horario': return `<fieldset class="campo"><legend>Horário</legend><div class="opcoes" data-grupo="horario">${ag.horarios.map((h, i) => `<button type="button" class="op" aria-pressed="${i === 0}" data-valor="${h}">${h}</button>`).join('')}</div></fieldset>`;
        case 'periodo': return `<fieldset class="campo"><legend>Período da visita</legend><div class="opcoes" data-grupo="periodo">${['Manhã', 'Tarde'].map((h, i) => `<button type="button" class="op" aria-pressed="${i === 0}" data-valor="${h}">${h}</button>`).join('')}</div></fieldset>`;
        case 'nome': return `<label class="campo"><span>Seu nome</span><input class="entrada" name="nome" autocomplete="name" placeholder="Como podemos te chamar?"></label>`;
        case 'bairro': return `<label class="campo"><span>Bairro</span><input class="entrada" name="bairro" placeholder="Onde é o serviço?"></label>`;
        case 'obs': return `<label class="campo"><span>Observações</span><textarea class="entrada" name="obs" placeholder="${esc(tx('agenda.obs'))}"></textarea></label>`;
        default: return '';
      }
    };
    // nome e bairro lado a lado quando os dois existem
    let camposHTML = '';
    for (let i = 0; i < ag.campos.length; i++) {
      const c = ag.campos[i];
      if (c === 'nome' && ag.campos[i + 1] === 'bairro') { camposHTML += `<div class="campos-2">${campoAgenda('nome')}${campoAgenda('bairro')}</div>`; i++; }
      else camposHTML += campoAgenda(c);
    }

    site.innerHTML = `
<header class="topo-site"><div class="caixa topo-inner">
  ${logoHTML()}
  <nav class="nav" aria-label="Seções" data-nav></nav>
  <a class="btn btn-p btn-sm topo-cta" href="#" data-wa="geral">${ic('whats')}<span>WhatsApp</span></a>
  <button type="button" class="menu-btn" data-abrir="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>

<section class="hero" id="inicio">
  <div class="caixa hero-grid">
    <div class="hero-texto">
      ${T('span', 'hero.selo', 'selo')}
      ${T('h1', 'hero.titulo')}
      ${T('p', 'hero.sub', 'hero-sub')}
      <div class="hero-acoes">
        <a class="btn btn-p btn-lg" href="#" data-wa="geral">${ic('whats')}${T('span', 'hero.cta1')}</a>
        <a class="btn btn-l btn-lg" href="#catalogo" data-ir="catalogo">${T('span', 'hero.cta2')}${ic('seta')}</a>
      </div>
      <ul class="hero-chips">${t.hero.chips.map((_, i) => `<li>${ic('check')}${T('span', `hero.chips.${i}`)}</li>`).join('')}</ul>
    </div>
    <div class="hero-midia">
      <img src="${foto('hero')}" data-foto="hero" alt="" fetchpriority="high">
      ${trocar('hero')}
      <div class="hero-cartao"><span class="hero-cartao-ic">${ic(r.icone)}</span><div>${T('b', 'hero.cartaoTitulo')}${T('small', 'hero.cartaoTexto')}</div></div>
      ${T('span', 'hero.adesivo', 'hero-adesivo')}
    </div>
  </div>
</section>

<section class="sec destaques" data-sec="destaques" id="destaques"><div class="caixa">
  <ul class="destaques-lista">${t.destaques.map((d, i) => `<li><span class="bolha">${ic(d.icone)}</span><div>${T('h3', `destaques.${i}.titulo`)}${T('p', `destaques.${i}.texto`)}</div></li>`).join('')}</ul>
</div></section>

<section class="sec catalogo" data-sec="catalogo" id="catalogo"><div class="caixa">
  <header class="sec-cab">${T('span', 'catalogo.eyebrow', 'eyebrow')}${T('h2', 'catalogo.titulo')}${T('p', 'catalogo.sub')}</header>
  ${r.filtros ? `<div class="filtros" role="group" aria-label="Filtrar">${['Todos', ...cats].map((c, i) => `<button type="button" class="filtro" aria-pressed="${i === 0}" data-filtro="${esc(i === 0 ? '' : c)}">${esc(c)}</button>`).join('')}</div>` : ''}
  <div class="itens">${itens.map(x => `
    <article class="item" data-cat="${esc(x.cat)}">
      <div class="item-foto"><img src="${foto('item' + (x.i + 1))}" data-foto="item${x.i + 1}" alt="" loading="lazy">${trocar('item' + (x.i + 1))}${r.filtros ? `<span class="item-cat">${esc(x.cat)}</span>` : ''}</div>
      <div class="item-corpo">
        ${T('h3', `itens.${x.i}.nome`)}
        ${T('p', `itens.${x.i}.desc`)}
        <div class="item-pe">${T('span', `itens.${x.i}.preco`, 'preco', ' title="Preço de exemplo: clique para digitar o preço real"')}
          <button type="button" class="btn btn-p btn-sm item-add" data-item="${x.i}">${ic(r.pedido ? 'mais' : 'calendario')}${T('span', 'catalogo.botao')}</button></div>
      </div>
    </article>`).join('')}</div>
</div></section>

<section class="sec passos" data-sec="passos" id="passos"><div class="caixa">
  <header class="sec-cab">${T('span', 'passos.eyebrow', 'eyebrow')}${T('h2', 'passos.titulo')}</header>
  <ol class="passos-lista">${t.passos.lista.map((_, i) => `<li>${T('h3', `passos.lista.${i}.titulo`)}${T('p', `passos.lista.${i}.texto`)}</li>`).join('')}</ol>
</div></section>

<section class="sec sobre" data-sec="sobre" id="sobre"><div class="caixa sobre-grid">
  <div class="sobre-foto"><img src="${foto('sobre')}" data-foto="sobre" alt="" loading="lazy">${trocar('sobre')}</div>
  <div class="sobre-texto">
    ${T('span', 'sobre.eyebrow', 'eyebrow')}${T('h2', 'sobre.titulo')}
    ${T('p', 'sobre.texto')}${T('p', 'sobre.texto2', 'sobre-nota')}
    <ul class="pontos">${t.sobre.pontos.map((_, i) => `<li>${ic('check')}${T('span', `sobre.pontos.${i}`)}</li>`).join('')}</ul>
  </div>
</div></section>

<section class="sec galeria" data-sec="galeria" id="galeria"><div class="caixa">
  <header class="sec-cab">${T('span', 'galeria.eyebrow', 'eyebrow')}${T('h2', 'galeria.titulo')}</header>
  <div class="galeria-grid">${[1, 2, 3, 4, 5, 6].map(n => `<figure data-luz="${n - 1}"><img src="${foto('gal' + n)}" data-foto="gal${n}" alt="" loading="lazy">${trocar('gal' + n)}</figure>`).join('')}</div>
</div></section>

<section class="sec agenda" data-sec="agenda" id="agenda"><div class="caixa agenda-grid">
  <div>
    ${T('span', 'agenda.eyebrow', 'eyebrow')}${T('h2', 'agenda.titulo')}
    ${T('p', 'agenda.sub', '', ' style="color:var(--suave);font-size:1.05rem"')}
    <ul class="vantagens">${t.agenda.vantagens.map((_, i) => `<li>${ic('check')}${T('span', `agenda.vantagens.${i}`)}</li>`).join('')}</ul>
  </div>
  <form class="form-agenda" data-form="agenda" novalidate>
    ${camposHTML}
    <button type="submit" class="btn btn-p btn-lg">${ic('whats')}${T('span', 'agenda.botao')}</button>
    <p class="form-nota">A mensagem abre pronta no WhatsApp. Nada é enviado sem você confirmar.</p>
  </form>
</div></section>

<section class="sec depoimentos" data-sec="depoimentos" id="depoimentos"><div class="caixa">
  <header class="sec-cab">${T('span', 'depoimentos.eyebrow', 'eyebrow')}${T('h2', 'depoimentos.titulo')}
    <p class="depo-aviso">${ic('info')}Depoimentos de exemplo. Aqui entram os comentários reais dos clientes.</p></header>
  <div class="depo-grid">${t.depoimentos.lista.map((_, i) => `
    <figure class="depo"><span class="tag-exemplo">Exemplo</span>${ic('aspas', 'aspas')}
      <blockquote data-k="depoimentos.lista.${i}.texto">${esc(tx(`depoimentos.lista.${i}.texto`))}</blockquote>
      <figcaption><span class="depo-avatar">${ic('grupo')}</span>${T('span', `depoimentos.lista.${i}.autor`)}</figcaption></figure>`).join('')}</div>
</div></section>

<section class="sec faq" data-sec="faq" id="faq"><div class="caixa faq-grid">
  <header class="sec-cab">${T('span', 'faq.eyebrow', 'eyebrow')}${T('h2', 'faq.titulo')}
    <p>Não achou sua dúvida? <a href="#" data-wa="geral">Chame no WhatsApp</a>.</p></header>
  <div class="faq-lista">${t.faq.lista.map((_, i) => `<details${i === 0 ? ' open' : ''}><summary>${T('span', `faq.lista.${i}.p`)}${ic('mais')}</summary>${T('p', `faq.lista.${i}.r`)}</details>`).join('')}</div>
</div></section>

<section class="sec contato" data-sec="contato" id="contato"><div class="caixa">
  <header class="sec-cab">${T('span', 'contato.eyebrow', 'eyebrow')}${T('h2', 'contato.titulo')}</header>
  <div class="contato-grid">
    <div class="contato-info">
      <div class="contato-linha"><span class="bolha">${ic('pin')}</span><div><b>Endereço</b>${T('span', 'contato.endereco')}<br>${T('span', 'contato.cidade', '', ' style="color:var(--suave)"')}</div></div>
      <div class="contato-linha"><span class="bolha">${ic('relogio')}</span><div style="flex:1"><b>Horário</b>
        <table class="horarios"><tbody>${t.contato.horario.map((_, i) => `<tr>${T('td', `contato.horario.${i}.0`)}${T('td', `contato.horario.${i}.1`)}</tr>`).join('')}</tbody></table></div></div>
      <div class="contato-linha"><span class="bolha">${ic('telefone')}</span><div><b>Telefone e redes</b>${T('span', 'contato.telefone')}<br><span style="color:var(--suave)" data-insta>@${esc(slug(nome()))}</span></div></div>
      <div class="contato-acoes">
        <a class="btn btn-p" href="#" data-wa="geral">${ic('whats')}Chamar no WhatsApp</a>
        <a class="btn btn-l" href="#" data-mapa>${ic('pin')}Como chegar</a>
      </div>
    </div>
    <div class="mapa" aria-label="Mapa ilustrativo">${mapaSVG()}
      <span class="mapa-pulso"></span>
      <div class="mapa-pin"><span class="mapa-etiqueta" data-nome>${esc(nome())}</span><span class="mapa-alfinete">${ic('pin')}</span></div>
    </div>
  </div>
</div></section>

<footer class="rodape"><div class="caixa">
  <div class="rodape-grid">
    <div>${logoHTML()}${T('p', 'rodape.frase')}</div>
    <div><h4>Navegue</h4><ul data-nav-rodape></ul></div>
    <div><h4>Fale com a gente</h4><ul>
      <li><a href="#" data-wa="geral">WhatsApp</a></li>
      <li><span data-k="contato.endereco">${esc(tx('contato.endereco'))}</span></li>
      <li><span data-insta>@${esc(slug(nome()))}</span></li></ul></div>
  </div>
  <div class="rodape-base"><span>© ${new Date().getFullYear()} <span data-nome>${esc(nome())}</span></span>
    <span class="credito-estudio">Modelo de demonstração · Studio Magalhães</span></div>
</div></footer>`;

    $('#camadas').innerHTML = `
<button type="button" class="wa-flut" data-wa="geral" aria-label="Chamar no WhatsApp">${ic('whats')}</button>
<button type="button" class="sacola-barra" data-abrir="sacola" hidden><span class="conta">0</span><span data-sacola-rotulo>Ver pedido</span><span class="ir">${ic('whats')}Finalizar</span></button>
<div class="folha" data-folha="menu" hidden><div class="folha-corpo menu-movel">
  <div class="folha-topo"><h3 data-nome>${esc(nome())}</h3><button type="button" class="fechar" data-fechar aria-label="Fechar">${ic('x')}</button></div>
  <nav data-nav-movel></nav>
  <a class="btn btn-p btn-lg" href="#" data-wa="geral">${ic('whats')}Chamar no WhatsApp</a>
</div></div>
<div class="folha" data-folha="sacola" hidden><div class="folha-corpo sacola-corpo">
  <div class="folha-topo"><h3>Seu pedido</h3><button type="button" class="fechar" data-fechar aria-label="Fechar">${ic('x')}</button></div>
  <ul class="sacola-lista" data-sacola-lista></ul>
  <label class="campo"><span>Seu nome</span><input class="entrada" data-sacola-nome placeholder="Como podemos te chamar?"></label>
  <fieldset class="campo"><legend>Como prefere receber?</legend><div class="opcoes" data-grupo="receber"><button type="button" class="op" aria-pressed="true" data-valor="Entrega">Entrega</button><button type="button" class="op" aria-pressed="false" data-valor="Retirada no local">Retirar no local</button></div></fieldset>
  <button type="button" class="btn btn-p btn-lg" data-enviar-pedido>${ic('whats')}Enviar pedido pelo WhatsApp</button>
  <p class="form-nota" style="margin-top:10px">O pedido abre pronto no WhatsApp para você revisar e enviar.</p>
</div></div>
<div class="caixa-luz" hidden><img alt=""><button type="button" class="luz-fechar" data-luz-fechar aria-label="Fechar">${ic('x')}</button><button type="button" class="luz-ant" data-luz-passo="-1" aria-label="Anterior">${ic('esq')}</button><button type="button" class="luz-prox" data-luz-passo="1" aria-label="Próxima">${ic('dir')}</button></div>`;

    aplicarVisual();
    aplicarSecoes();
    aplicarEdicao();
    atualizarSacola();
  }

  function mapaSVG() {
    return `<svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect class="m-fundo" width="600" height="420"/>
      <g class="m-quadras">
        <rect class="m-quadra" x="18" y="20" width="140" height="92" rx="8"/><rect class="m-quadra" x="182" y="20" width="160" height="92" rx="8"/>
        <rect class="m-quadra" x="366" y="20" width="110" height="92" rx="8"/><rect class="m-quadra" x="500" y="20" width="90" height="92" rx="8"/>
        <rect class="m-quadra" x="18" y="136" width="140" height="104" rx="8"/><rect class="m-quadra" x="182" y="136" width="160" height="104" rx="8"/>
        <rect class="m-quadra" x="500" y="136" width="90" height="104" rx="8"/><rect class="m-quadra" x="182" y="264" width="160" height="70" rx="8"/>
        <rect class="m-quadra" x="366" y="264" width="224" height="70" rx="8"/>
      </g>
      <rect class="m-parque" x="366" y="136" width="110" height="104" rx="14"/>
      <rect class="m-parque" x="18" y="264" width="140" height="70" rx="12"/>
      <path class="m-agua" d="M0 360 C110 338 190 392 320 368 S520 334 600 356 V420 H0Z"/>
      <path class="m-rua" d="M0 124 H600 M170 0 V350 M354 0 V350 M0 252 H600 M488 0 V350"/>
      <path class="m-rua-f" d="M0 346 H600 M60 124 V252 M260 124 V252 M420 252 V346"/>
    </svg>`;
  }

  function proximosDias() {
    const sem = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    const out = [], hoje = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(hoje); d.setDate(hoje.getDate() + i);
      const data = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
      const rot = i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : sem[d.getDay()];
      out.push({ rotulo: rot, data, valor: `${i < 2 ? rot.toLowerCase() : sem[d.getDay()]}, ${data}` });
    }
    return out;
  }

  /* ---------- Aplicar visual (sem remontar o site) ---------- */
  function aplicarVisual() {
    const a = aparelho, f = FONTES[S.fonte];
    a.dataset.estilo = S.estilo; a.dataset.tema = S.tema; a.dataset.fonte = S.fonte;
    a.style.setProperty('--p', S.cor1); a.style.setProperty('--d', S.cor2);
    a.style.setProperty('--p-ink', tintaSobre(S.cor1)); a.style.setProperty('--d-ink', tintaSobre(S.cor2));
    a.style.setProperty('--p-txt', corLegivel(S.cor1, S.tema === 'escuro'));
    a.style.setProperty('--f-t', f.t); a.style.setProperty('--f-c', f.c);
    document.title = `${nome()} · Site modelo`;
    const tc = $('meta[name="theme-color"]'); if (tc) tc.content = S.cor1;
  }

  function atualizarNome() {
    $$('[data-nome]').forEach(e => { e.textContent = nome(); });
    $$('[data-marca]').forEach(e => { e.innerHTML = S.logo === 'icone' ? ic(ramo().icone) : esc(iniciais(nome())); });
    $$('.logo').forEach(e => { e.dataset.logo = S.logo; });
    $$('[data-insta]').forEach(e => { e.textContent = '@' + slug(nome()); });
    document.title = `${nome()} · Site modelo`;
  }

  function aplicarSecoes() {
    const on = secoes(), r = ramo();
    let alt = false;
    $$('[data-sec]', site).forEach(s => {
      const id = s.dataset.sec, vis = !!on[id];
      s.hidden = !vis;
      if (vis && id !== 'destaques') { s.classList.toggle('alt', alt); alt = !alt; } else s.classList.remove('alt');
    });
    const destaquesAlt = on.destaques; $('[data-sec="destaques"]', site)?.classList.toggle('alt', destaquesAlt);
    const links = ['catalogo', 'sobre', 'galeria', 'agenda', 'faq', 'contato'].filter(id => on[id]);
    const a = id => `<a href="#${id}" data-ir="${id}">${esc(r.rotulos[id])}</a>`;
    const nav = $('[data-nav]', site); if (nav) nav.innerHTML = links.slice(0, 5).map(a).join('');
    const nr = $('[data-nav-rodape]', site); if (nr) nr.innerHTML = links.map(id => `<li>${a(id)}</li>`).join('');
    const nm = $('[data-nav-movel]'); if (nm) nm.innerHTML = links.map(id => `<a href="#${id}" data-ir="${id}">${esc(r.rotulos[id])}${ic('dir')}</a>`).join('');
    const wa = $('.wa-flut'); if (wa) wa.hidden = !S.flutuante;
    const cta2 = $('.hero [data-ir="catalogo"]', site); if (cta2) cta2.hidden = !on.catalogo;
  }

  function aplicarEdicao() {
    const on = ui.editar && !ui.apresentando;
    aparelho.classList.toggle('editando', on);
    $$('[data-k]', site).forEach(e => {
      // textos dentro de botões, links e perguntas: um clique usa, dois cliques editam
      const acao = !!e.closest('a,button,summary');
      if (on && !acao) { e.contentEditable = PT ? 'plaintext-only' : 'true'; e.spellcheck = false; }
      else e.removeAttribute('contenteditable');
      if (on && acao) e.title = 'Dois cliques para editar este texto'; else if (acao) e.removeAttribute('title');
    });
  }
  site.addEventListener('dblclick', e => {
    if (!aparelho.classList.contains('editando')) return;
    const el = e.target.closest('[data-k]'); if (!el || el.isContentEditable) return;
    e.preventDefault();
    el.contentEditable = PT ? 'plaintext-only' : 'true'; el.spellcheck = false; el.focus();
    getSelection().selectAllChildren(el);
    el.addEventListener('blur', () => el.removeAttribute('contenteditable'), { once: true });
  });

  /* ---------- WhatsApp ---------- */
  function abrirWhats(msg) {
    const num = S.whats.replace(/\D/g, '');
    const n = num && num.length <= 11 ? '55' + num : num;
    const url = `https://wa.me/${n}?text=${encodeURIComponent(msg)}`;
    aviso(num ? 'Abrindo o WhatsApp com a mensagem pronta' : 'Abrindo o WhatsApp (sem número: escolha o contato)', 'whats');
    window.open(url, '_blank', 'noopener');
  }
  const ola = () => `Olá, ${nome()}!`;

  function enviarAgenda(form) {
    const r = ramo(), ag = r.agenda, linhas = [`${ola()} Gostaria de ${ag.acao}.`, ''];
    const val = g => $(`[data-grupo="${g}"] [aria-pressed="true"]`, form)?.dataset.valor;
    for (const c of ag.campos) {
      if (c === 'servico') linhas.push(`${ag.rotuloServico || 'Serviço'}: ${tx(`itens.${form.servico.value}.nome`)}`);
      if (c === 'pessoas') linhas.push(`Pessoas: ${val('pessoas')}`);
      if (c === 'dia') linhas.push(`Dia: ${val('dia')}`);
      if (c === 'horario') linhas.push(`Horário: ${val('horario')}`);
      if (c === 'periodo') linhas.push(`Período: ${val('periodo')}`);
      if (c === 'nome' && form.nome.value.trim()) linhas.push(`Nome: ${form.nome.value.trim()}`);
      if (c === 'bairro' && form.bairro.value.trim()) linhas.push(`Bairro: ${form.bairro.value.trim()}`);
      if (c === 'obs' && form.obs.value.trim()) linhas.push(`Observações: ${form.obs.value.trim()}`);
    }
    abrirWhats(linhas.join('\n'));
  }

  /* ---------- Sacola de pedido ---------- */
  function atualizarSacola() {
    const barra = $('.sacola-barra'); if (!barra) return;
    const total = Object.values(sacola).reduce((a, b) => a + b, 0);
    barra.hidden = !ramo().pedido || total === 0;
    $('.conta', barra).textContent = total;
    $('[data-sacola-rotulo]', barra).textContent = total === 1 ? '1 item no pedido' : `${total} itens no pedido`;
    const lista = $('[data-sacola-lista]');
    const chaves = Object.keys(sacola).filter(k => sacola[k] > 0);
    lista.innerHTML = chaves.length ? chaves.map(i => `<li><img src="${foto('item' + (+i + 1))}" alt="">
      <div><b>${esc(tx(`itens.${i}.nome`))}</b><small>${esc(tx(`itens.${i}.preco`))}</small></div>
      <span class="qtd"><button type="button" data-qtd="${i}" data-passo="-1" aria-label="Menos">${ic('menos')}</button><span>${sacola[i]}</span><button type="button" data-qtd="${i}" data-passo="1" aria-label="Mais">${ic('mais')}</button></span></li>`).join('')
      : '<li class="sacola-vazia">Sua sacola está vazia.</li>';
    $$('.item-add').forEach(b => b.classList.toggle('pronto', !!sacola[b.dataset.item]));
  }
  function enviarPedido() {
    const chaves = Object.keys(sacola).filter(k => sacola[k] > 0);
    if (!chaves.length) return;
    const nomeCli = $('[data-sacola-nome]').value.trim();
    const receber = $('[data-grupo="receber"] [aria-pressed="true"]').dataset.valor;
    const linhas = [`${ola()} Gostaria de fazer um pedido:`, '', ...chaves.map(i => `• ${sacola[i]}x ${tx(`itens.${i}.nome`)}`), '', `Receber: ${receber}`];
    if (nomeCli) linhas.push(`Nome: ${nomeCli}`);
    abrirWhats(linhas.join('\n'));
  }

  /* ---------- Folhas, galeria e avisos ---------- */
  function abrirFolha(nomeFolha) { fecharFolhas(); const f = $(`[data-folha="${nomeFolha}"]`); if (f) f.hidden = false; }
  function fecharFolhas() { $$('.folha').forEach(f => { f.hidden = true; }); }
  let luzIdx = 0;
  function abrirLuz(i) { luzIdx = i; const l = $('.caixa-luz'); $('img', l).src = foto('gal' + (i + 1)); l.hidden = false; }
  function passoLuz(p) { abrirLuz((luzIdx + p + 6) % 6); }
  let avisoTimer;
  function aviso(msg, icone = 'check') {
    let el = $('.aviso-site');
    if (!el) { el = document.createElement('div'); el.className = 'aviso-site'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.innerHTML = ic(icone) + esc(msg); el.hidden = false;
    el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
    clearTimeout(avisoTimer); avisoTimer = setTimeout(() => { el.hidden = true; }, 2600);
  }
  function irPara(id) {
    fecharFolhas();
    const alvo = id === 'inicio' ? null : $(`#${id}`, site);
    if (alvo && alvo.hidden) return;
    if (!alvo) { rolagem.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const topo = $('.topo-site', site).offsetHeight;
    rolagem.scrollTo({ top: alvo.offsetTop - topo + 1, behavior: 'smooth' });
  }

  /* ---------- Eventos do site ---------- */
  aparelho.addEventListener('click', e => {
    const t = e.target;
    const editando = aparelho.classList.contains('editando');
    if (t.closest('[data-trocar]')) { e.preventDefault(); trocarFoto(t.closest('[data-trocar]').dataset.trocar); return; }
    if (editando && t.closest('[data-k]')?.isContentEditable) { e.preventDefault(); return; }
    const el = t.closest('[data-wa],[data-ir],[data-filtro],[data-item],[data-abrir],[data-fechar],[data-qtd],[data-enviar-pedido],[data-luz],[data-luz-passo],[data-luz-fechar],.op,[data-mapa],a[href^="#"]');
    if (!el) { if (t.classList.contains('folha')) fecharFolhas(); return; }
    const d = el.dataset;
    if (d.wa !== undefined) { e.preventDefault(); abrirWhats(`${ola()} ${ramo().msgGeral}`); return; }
    if (d.ir) { e.preventDefault(); irPara(d.ir); return; }
    if (d.filtro !== undefined) {
      $$('.filtro', site).forEach(b => b.setAttribute('aria-pressed', String(b === el)));
      $$('.item', site).forEach(it => { it.hidden = !!d.filtro && it.dataset.cat !== d.filtro; });
      return;
    }
    if (d.item !== undefined) {
      const i = +d.item, r = ramo();
      if (r.pedido) { sacola[i] = (sacola[i] || 0) + 1; atualizarSacola(); aviso(`${tx(`itens.${i}.nome`)} adicionado ao pedido`, 'sacola'); }
      else if (secoes().agenda) {
        const sel = $('[data-form="agenda"] select[name="servico"]', site); if (sel) sel.value = String(i);
        irPara('agenda');
      } else abrirWhats(`${ola()} Gostaria de saber mais sobre ${tx(`itens.${i}.nome`)}.`);
      return;
    }
    if (d.abrir) { abrirFolha(d.abrir); return; }
    if (d.fechar !== undefined) { fecharFolhas(); return; }
    if (d.qtd !== undefined) { const i = d.qtd; sacola[i] = Math.max(0, (sacola[i] || 0) + +d.passo); if (!sacola[i]) delete sacola[i]; atualizarSacola(); if (!Object.keys(sacola).length) fecharFolhas(); return; }
    if (d.enviarPedido !== undefined) { enviarPedido(); return; }
    if (d.luz !== undefined) { abrirLuz(+d.luz); return; }
    if (d.luzPasso) { passoLuz(+d.luzPasso); return; }
    if (d.luzFechar !== undefined) { $('.caixa-luz').hidden = true; return; }
    if (d.mapa !== undefined) { e.preventDefault(); window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${tx('contato.endereco')} ${tx('contato.cidade')}`), '_blank', 'noopener'); return; }
    if (el.classList.contains('op')) { const g = el.closest('[data-grupo]'); $$('.op', g).forEach(b => b.setAttribute('aria-pressed', String(b === el))); return; }
    if (el.matches('a[href^="#"]')) { e.preventDefault(); }
  });
  aparelho.addEventListener('submit', e => { if (e.target.matches('[data-form="agenda"]')) { e.preventDefault(); enviarAgenda(e.target); } });

  // edição de textos
  site.addEventListener('input', e => {
    const el = e.target.closest('[data-k]'); if (!el) return;
    const k = el.dataset.k, v = el.textContent;
    (S.textos[S.ramo] ||= {})[k] = v;
    // mantém cópias do mesmo texto em sincronia (ex.: endereço no rodapé)
    $$(`[data-k="${CSS.escape(k)}"]`, site).forEach(o => { if (o !== el) o.textContent = v; });
    const m = k.match(/^itens\.(\d+)\.nome$/);
    if (m) { const op = $(`select[name="servico"] option[value="${m[1]}"]`, site); if (op) op.textContent = v; }
    salvar();
  });
  site.addEventListener('keydown', e => {
    const ed = e.target.closest('[contenteditable]'); if (!ed) return;
    if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); ed.blur(); }
    else if (e.key === ' ' && ed.closest('summary,button,a')) { e.preventDefault(); document.execCommand('insertText', false, ' '); }
  });
  site.addEventListener('paste', e => {
    const el = e.target.closest('[contenteditable]'); if (!el || PT) return;
    e.preventDefault(); document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain'));
  });

  // trocar foto (só nesta sessão, não vai para o código salvo)
  const entradaFoto = Object.assign(document.createElement('input'), { type: 'file', accept: 'image/*', hidden: true });
  document.body.appendChild(entradaFoto);
  let fotoAlvo = null;
  function trocarFoto(k) { fotoAlvo = k; entradaFoto.value = ''; entradaFoto.click(); }
  entradaFoto.addEventListener('change', () => {
    const f = entradaFoto.files[0]; if (!f || !fotoAlvo) return;
    const url = URL.createObjectURL(f);
    fotosTemp[S.ramo + '/' + fotoAlvo] = url;
    $$(`img[data-foto="${fotoAlvo}"]`).forEach(img => { img.src = url; });
    aviso('Foto trocada (vale até fechar a página)', 'foto');
  });

  /* ============================================================
     Aparelho: computador, tablet e celular
     ============================================================ */
  function ajustarAparelho() {
    document.body.dataset.disp = ui.disp;
    if (ui.disp === 'livre') {
      moldura.style.width = moldura.style.height = '';
      aparelho.style.width = aparelho.style.height = aparelho.style.transform = '';
      return;
    }
    const [w, h] = DISP[ui.disp];
    const cs = getComputedStyle(palco);
    const aw = palco.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 70;
    const ah = palco.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - 70;
    const s = Math.max(.2, Math.min(1, aw / w, ah / h));
    moldura.style.width = w * s + 'px'; moldura.style.height = h * s + 'px';
    aparelho.style.width = w + 'px'; aparelho.style.height = h + 'px'; aparelho.style.transform = `scale(${s})`;
  }
  new ResizeObserver(ajustarAparelho).observe(palco);
  window.addEventListener('resize', () => { ajustarAparelho(); atualizarEmpurra(); });

  /* ============================================================
     Painel de edição
     ============================================================ */
  const painel = $('#painel');
  function montarPainel() {
    const ramosHTML = Object.entries(R).map(([id, r]) => `<button type="button" class="sm-op" data-acao="ramo" data-v="${id}">${ic(r.icone)}${esc(r.rotulo)}</button>`).join('');
    const paletasHTML = PALETAS.map(([n, a, b]) => `<button type="button" class="sm-paleta" data-acao="paleta" data-a="${a}" data-b="${b}" title="${esc(n)}" aria-label="Paleta ${esc(n)}"><i style="background:${a}"></i><i style="background:${b}"></i></button>`).join('');
    const amostra = {
      arredondado: '<i style="left:10px;top:10px;width:46%;height:26px;border-radius:13px;background:#4fc3c8"></i><i style="right:10px;top:8px;width:34%;height:30px;border-radius:10px;background:#3d7cc0"></i>',
      reto: '<i style="inset:0;background:linear-gradient(90deg,#0b1222,#2a4b7c)"></i><i style="left:10px;top:12px;width:44%;height:4px;background:#fff"></i><i style="left:10px;top:22px;width:30%;height:4px;background:#fff;opacity:.6"></i><i style="left:10px;bottom:9px;width:26%;height:9px;background:#4fc3c8"></i>',
      minimalista: '<i style="left:30%;top:10px;width:40%;height:4px;background:#e7edf7"></i><i style="left:38%;top:19px;width:24%;height:3px;background:#8ea2c4"></i><i style="left:12px;right:12px;bottom:8px;height:12px;border-radius:2px;border:1px solid #8ea2c4"></i>',
      vibrante: '<i style="inset:0;background:#3d7cc0"></i><i style="right:-10px;top:-14px;width:46px;height:46px;border-radius:50%;background:#f2c46d"></i><i style="left:10px;top:12px;width:40%;height:16px;border-radius:8px;background:#f2c46d;box-shadow:3px 3px 0 #0c1a36"></i>'
    };
    const estilosHTML = Object.entries(ESTILOS).map(([id, e]) => `<button type="button" class="sm-cartao" data-acao="estilo" data-v="${id}"><span class="sm-amostra-estilo">${amostra[id]}</span><b>${e.nome}</b><small>${e.desc}</small></button>`).join('');
    const fontesHTML = Object.entries(FONTES).map(([id, f]) => `<button type="button" class="sm-cartao" data-acao="fonte" data-v="${id}"><span class="sm-amostra-fonte" style="font-family:${f.t.replace(/"/g, "'")};font-weight:${id === 'elegante' || id === 'acolhedora' ? 600 : 700}">Aa</span><b>${f.nome}</b><small>${f.tn} + ${f.cn}</small></button>`).join('');

    painel.innerHTML = `
<div class="sm-topo"><span class="sm-marca">SM</span><div><h2>Painel do modelo</h2><small>Mudanças aparecem na hora</small></div>
  <button type="button" class="sm-x" data-acao="fechar" aria-label="Fechar painel">${ic('x')}</button></div>
<div class="sm-abas" role="tablist">
  ${[['negocio', 'loja', 'Negócio'], ['cores', 'paleta', 'Cores'], ['estilo', 'formas', 'Estilo'], ['secoes', 'camadas', 'Seções'], ['salvar', 'salvar', 'Salvar']]
    .map(([id, icn, n]) => `<button type="button" role="tab" data-aba="${id}">${ic(icn)}${n}</button>`).join('')}
</div>
<div class="sm-corpo">
  <section class="sm-aba" data-painel-aba="negocio">
    <div class="sm-grupo"><h3>Ramo do negócio</h3><div class="sm-ramos">${ramosHTML}</div>
      <p class="sm-nota">Textos, fotos, ícones e seções mudam junto. Se você ainda não mexeu no visual, as cores e a fonte sugeridas para o ramo também entram.</p></div>
    ${window.FOTOS ? '' : `<div class="sm-grupo"><h3>Catálogo digital</h3>
      <a class="sm-btn sm-btn-p" href="catalogo/" style="width:100%;text-decoration:none">${ic('sacola')}Abrir os modelos de catálogo</a>
      <p class="sm-nota">Lojas prontas por ramo, com carrinho que envia o pedido para o WhatsApp e área da loja com senha.</p></div>`}
    <div class="sm-grupo"><h3>Identidade</h3>
      <label class="sm-campo"><span>Nome do negócio</span><input class="sm-entrada" data-campo="nome" maxlength="60" autocomplete="off"></label>
      <label class="sm-campo"><span>WhatsApp do negócio (com DDD)</span><input class="sm-entrada" data-campo="whats" inputmode="tel" maxlength="30" placeholder="Ex.: (21) 99999-9999" autocomplete="off"></label>
      <div class="sm-campo"><span>Logo em texto</span><div class="sm-seg">
        <button type="button" data-acao="logo" data-v="monograma">Iniciais</button><button type="button" data-acao="logo" data-v="icone">Ícone</button><button type="button" data-acao="logo" data-v="texto">Só o nome</button></div></div>
      <p class="sm-nota">Sem número, o WhatsApp abre a mensagem pronta e pede para escolher o contato.</p></div>
    <div class="sm-grupo"><h3>Textos e fotos</h3>
      <label class="sm-chave"><input type="checkbox" data-ui="editar"><span class="trilho"></span><span>Editar textos clicando neles</span></label>
      <p class="sm-nota">Clique em qualquer título, preço ou parágrafo do site e digite. Nas fotos aparece “Trocar foto” (a foto trocada vale até fechar a página).</p>
      <div class="sm-linha" style="margin-top:12px"><button type="button" class="sm-btn" data-acao="restaurar-textos">${ic('desfazer')}Restaurar textos deste ramo</button></div></div>
  </section>

  <section class="sm-aba" data-painel-aba="cores" hidden>
    <div class="sm-grupo"><h3>Paletas prontas</h3><div class="sm-paletas">${paletasHTML}</div></div>
    <div class="sm-grupo"><h3>Escolher à mão</h3>
      <div class="sm-cor"><input type="color" data-cor="cor1" aria-label="Cor principal"><label><span>Cor principal</span><input class="sm-entrada" data-hex="cor1" maxlength="7" spellcheck="false"></label></div>
      <div class="sm-cor"><input type="color" data-cor="cor2" aria-label="Cor de destaque"><label><span>Cor de destaque</span><input class="sm-entrada" data-hex="cor2" maxlength="7" spellcheck="false"></label></div>
      <div class="sm-linha"><button type="button" class="sm-btn" data-acao="inverter">${ic('troca')}Inverter as duas</button></div>
      <p class="sm-nota">O texto sobre cada cor fica claro ou escuro sozinho, para continuar legível.</p></div>
    <div class="sm-grupo"><h3>Tema</h3><div class="sm-seg">
      <button type="button" data-acao="tema" data-v="claro">${ic('sol')}Claro</button><button type="button" data-acao="tema" data-v="escuro">${ic('lua')}Escuro</button></div></div>
    <div class="sm-grupo"><button type="button" class="sm-btn" data-acao="sugerido" style="width:100%">${ic('brilho')}Usar o visual sugerido para o ramo</button></div>
  </section>

  <section class="sm-aba" data-painel-aba="estilo" hidden>
    <div class="sm-grupo"><h3>Estilo</h3><div class="sm-cartoes">${estilosHTML}</div></div>
    <div class="sm-grupo"><h3>Fontes</h3><div class="sm-cartoes">${fontesHTML}</div></div>
  </section>

  <section class="sm-aba" data-painel-aba="secoes" hidden>
    <div class="sm-grupo"><h3>Seções do site</h3><div class="sm-secoes" data-lista-secoes></div>
      <p class="sm-nota">O topo e o rodapé ficam sempre. O menu do site se ajusta às seções ligadas.</p></div>
    <div class="sm-grupo"><label class="sm-chave"><input type="checkbox" data-acao="flutuante"><span class="trilho"></span><span>Botão flutuante do WhatsApp</span></label></div>
  </section>

  <section class="sm-aba" data-painel-aba="salvar" hidden>
    <div class="sm-grupo"><h3>Salvar este visual</h3>
      <label class="sm-campo"><span>Nome para lembrar</span><input class="sm-entrada" data-salvar-nome maxlength="50" placeholder="Ex.: reunião com a pizzaria"></label>
      <button type="button" class="sm-btn sm-btn-p" data-acao="salvar" style="width:100%">${ic('salvar')}Salvar neste aparelho</button>
      <ul class="sm-salvos" data-salvos></ul></div>
    <div class="sm-grupo"><h3>Copiar ou compartilhar</h3>
      <div class="sm-linha"><button type="button" class="sm-btn" data-acao="copiar-codigo">${ic('copiar')}Copiar código</button><button type="button" class="sm-btn" data-acao="copiar-link">${ic('link')}Copiar link</button>
      <button type="button" class="sm-btn" data-acao="compartilhar" data-so-share>${ic('compartilhar')}Compartilhar</button></div>
      <p class="sm-nota">O código guarda ramo, cores, estilo, fonte, seções e textos editados. Cole em outro aparelho que tenha o modelo para abrir igual. O link funciona onde o modelo estiver no mesmo endereço.</p>
      <label class="sm-campo" style="margin-top:12px"><span>Colar um código</span><textarea class="sm-entrada" data-colar placeholder="Cole aqui o código copiado"></textarea></label>
      <button type="button" class="sm-btn" data-acao="aplicar-codigo" style="width:100%">${ic('check')}Abrir este visual</button></div>
    <div class="sm-grupo" data-grupo-offline hidden><h3>Usar sem internet</h3>
      <button type="button" class="sm-btn sm-btn-p" data-acao="instalar" style="width:100%;margin-bottom:10px" hidden>${ic('celular')}Instalar como app</button>
      <p class="sm-nota" style="margin-top:0"><b style="color:#dfe7f3">Android (Chrome):</b> menu ⋮ › “Instalar app” ou “Adicionar à tela inicial”.<br>
      <b style="color:#dfe7f3">iPad e iPhone (Safari):</b> botão Compartilhar › “Adicionar à Tela de Início”.</p>
      <p class="sm-nota" data-offline-estado>Guardando o modelo neste aparelho…</p></div>
    <div class="sm-grupo"><h3>Recomeçar</h3>
      <button type="button" class="sm-btn sm-btn-perigo" data-acao="zerar" style="width:100%">${ic('desfazer')}Voltar o modelo ao padrão</button>
      <p class="sm-nota">Os visuais salvos continuam guardados.</p></div>
  </section>
</div>
<div class="sm-rodape"><span>Studio Magalhães · site modelo</span><span>Esc fecha</span></div>`;
    if (!navigator.share) $$('[data-so-share]', painel).forEach(b => b.remove());
  }

  function sincronizarPainel() {
    const marca = (sel, ativo) => $$(sel, painel).forEach(b => b.setAttribute('aria-pressed', String(ativo(b))));
    marca('[data-acao="ramo"]', b => b.dataset.v === S.ramo);
    marca('[data-acao="logo"]', b => b.dataset.v === S.logo);
    marca('[data-acao="tema"]', b => b.dataset.v === S.tema);
    marca('[data-acao="estilo"]', b => b.dataset.v === S.estilo);
    marca('[data-acao="fonte"]', b => b.dataset.v === S.fonte);
    marca('[data-acao="paleta"]', b => b.dataset.a.toLowerCase() === S.cor1.toLowerCase() && b.dataset.b.toLowerCase() === S.cor2.toLowerCase());
    $$('[data-aba]', painel).forEach(b => b.setAttribute('aria-selected', String(b.dataset.aba === ui.aba)));
    $$('[data-painel-aba]', painel).forEach(s => { s.hidden = s.dataset.painelAba !== ui.aba; });
    const campoNome = $('[data-campo="nome"]', painel);
    if (document.activeElement !== campoNome) campoNome.value = S.nome;
    campoNome.placeholder = ramo().nomePadrao;
    const campoW = $('[data-campo="whats"]', painel); if (document.activeElement !== campoW) campoW.value = S.whats;
    ['cor1', 'cor2'].forEach(c => {
      $(`[data-cor="${c}"]`, painel).value = S[c];
      const h = $(`[data-hex="${c}"]`, painel); if (document.activeElement !== h) h.value = S[c].toUpperCase();
    });
    $('[data-ui="editar"]', painel).checked = ui.editar;
    $('[data-acao="flutuante"]', painel).checked = S.flutuante;
    const on = secoes(), r = ramo();
    $('[data-lista-secoes]', painel).innerHTML = SECOES.map(id => `<label class="sm-chave"><input type="checkbox" data-secao="${id}"${on[id] ? ' checked' : ''}><span class="trilho"></span><span>${esc(r.rotulos[id])}</span></label>`).join('');
    listarSalvos();
    $$('.sm-barra [data-disp]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.disp === ui.disp)));
  }

  function mudarVisual(patch) {
    Object.assign(S, patch, { visualTocado: true });
    aplicarVisual(); sincronizarPainel(); salvar();
  }
  function trocarRamo(id) {
    if (!R[id] || id === S.ramo) return;
    S.ramo = id;
    if (!S.visualTocado) Object.assign(S, R[id].sugestao);
    sacola = {};
    render(); sincronizarPainel(); salvar();
    rolagem.scrollTo({ top: 0 });
    aviso(`Ramo: ${R[id].rotulo}`, R[id].icone);
  }
  function aplicarEstado(novo, msg) {
    S = novo; sacola = {};
    render(); sincronizarPainel(); salvar();
    rolagem.scrollTo({ top: 0 });
    if (msg) aviso(msg);
  }

  async function copiar(texto, msg) {
    try { await navigator.clipboard.writeText(texto); aviso(msg, 'copiar'); }
    catch {
      const t = Object.assign(document.createElement('textarea'), { value: texto }); t.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); aviso(msg, 'copiar'); } catch { aviso('Não deu para copiar. Selecione o código manualmente.', 'info'); }
      t.remove();
    }
  }
  const codigoAtual = () => 'SM1:' + codificar(S);
  const linkAtual = () => location.href.split('#')[0] + '#v=' + codificar(S);

  function listarSalvos() {
    const lista = ler(CHAVE_SALVOS, []), ul = $('[data-salvos]', painel);
    if (!ul) return;
    ul.innerHTML = lista.length ? lista.map((v, i) => `<li><span class="mini"><i style="background:${esc(v.estado.cor1)}"></i><i style="background:${esc(v.estado.cor2)}"></i></span>
      <div style="min-width:0"><b>${esc(v.nome)}</b><small>${esc(R[v.estado.ramo]?.rotulo || '')} · ${esc(v.quando)}</small></div>
      <button type="button" class="usar" data-acao="usar-salvo" data-i="${i}">Abrir</button>
      <button type="button" data-acao="apagar-salvo" data-i="${i}" aria-label="Apagar ${esc(v.nome)}">${ic('lixo')}</button></li>`).join('')
      : '<li class="sm-vazio">Nenhum visual salvo ainda.</li>';
  }

  painel.addEventListener('click', e => {
    const b = e.target.closest('[data-acao],[data-aba]'); if (!b) return;
    if (b.dataset.aba) { ui.aba = b.dataset.aba; salvarUI(); sincronizarPainel(); return; }
    const a = b.dataset.acao, v = b.dataset.v;
    switch (a) {
      case 'fechar': abrirPainel(false); break;
      case 'ramo': trocarRamo(v); break;
      case 'logo': S.logo = v; atualizarNome(); sincronizarPainel(); salvar(); break;
      case 'paleta': mudarVisual({ cor1: b.dataset.a, cor2: b.dataset.b }); break;
      case 'inverter': mudarVisual({ cor1: S.cor2, cor2: S.cor1 }); break;
      case 'tema': mudarVisual({ tema: v }); break;
      case 'estilo': mudarVisual({ estilo: v }); break;
      case 'fonte': mudarVisual({ fonte: v }); break;
      case 'sugerido': Object.assign(S, ramo().sugestao, { visualTocado: false }); aplicarVisual(); sincronizarPainel(); salvar(); aviso('Visual sugerido aplicado', 'brilho'); break;
      case 'restaurar-textos':
        if (confirm('Voltar todos os textos deste ramo ao original?')) { delete S.textos[S.ramo]; render(); salvar(); aviso('Textos restaurados', 'desfazer'); }
        break;
      case 'salvar': {
        const campo = $('[data-salvar-nome]', painel);
        const lista = ler(CHAVE_SALVOS, []);
        const quando = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        lista.unshift({ nome: campo.value.trim() || nome(), quando, estado: JSON.parse(JSON.stringify(S)) });
        gravar(CHAVE_SALVOS, lista.slice(0, 30)); campo.value = ''; listarSalvos(); aviso('Visual salvo neste aparelho', 'salvar');
        break;
      }
      case 'usar-salvo': { const it = ler(CHAVE_SALVOS, [])[+b.dataset.i]; const s = it && normalizar(it.estado); if (s) aplicarEstado(s, `Visual “${it.nome}” aberto`); break; }
      case 'apagar-salvo': {
        const lista = ler(CHAVE_SALVOS, []); const it = lista[+b.dataset.i];
        if (it && confirm(`Apagar o visual “${it.nome}”?`)) { lista.splice(+b.dataset.i, 1); gravar(CHAVE_SALVOS, lista); listarSalvos(); }
        break;
      }
      case 'copiar-codigo': copiar(codigoAtual(), 'Código copiado'); break;
      case 'copiar-link': copiar(linkAtual(), 'Link copiado'); break;
      case 'compartilhar': navigator.share?.({ title: `${nome()} · site modelo`, text: codigoAtual() }).catch(() => {}); break;
      case 'aplicar-codigo': {
        const campo = $('[data-colar]', painel); const s = decodificar(campo.value);
        if (s) { campo.value = ''; aplicarEstado(s, 'Visual aberto a partir do código'); } else aviso('Código não reconhecido. Confira se copiou inteiro.', 'info');
        break;
      }
      case 'instalar':
        if (pedidoInstalar) { pedidoInstalar.prompt(); pedidoInstalar.userChoice.finally(() => { pedidoInstalar = null; b.hidden = true; }); }
        break;
      case 'zerar': if (confirm('Voltar o modelo ao padrão? Os textos editados e as cores atuais serão perdidos (os visuais salvos ficam).')) aplicarEstado(estadoInicial(), 'Modelo de volta ao padrão'); break;
    }
  });
  painel.addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.campo === 'nome') { S.nome = t.value; atualizarNome(); salvar(); }
    else if (t.dataset.campo === 'whats') { S.whats = t.value; salvar(); }
    else if (t.dataset.cor) mudarVisual({ [t.dataset.cor]: t.value });
    else if (t.dataset.hex) { let h = t.value.trim(); if (!h.startsWith('#')) h = '#' + h; if (/^#[0-9a-f]{6}$/i.test(h)) mudarVisual({ [t.dataset.hex]: h.toLowerCase() }); }
  });
  painel.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.ui === 'editar') { ui.editar = t.checked; salvarUI(); aplicarEdicao(); }
    else if (t.dataset.acao === 'flutuante') { S.flutuante = t.checked; aplicarSecoes(); salvar(); }
    else if (t.dataset.secao) { (S.secoes[S.ramo] ||= {})[t.dataset.secao] = t.checked; aplicarSecoes(); salvar(); }
  });

  /* ---------- Abrir e fechar painel, apresentação ---------- */
  function atualizarEmpurra() { document.body.classList.toggle('empurra', ui.painel && innerWidth >= 1100); }
  function abrirPainel(abrir = !ui.painel) {
    ui.painel = abrir;
    document.body.classList.toggle('painel-aberto', abrir);
    $('.sm-fab').setAttribute('aria-expanded', String(abrir));
    atualizarEmpurra();
    if (abrir) { esconderDica(); sincronizarPainel(); }
  }
  function apresentar(on) {
    ui.apresentando = on;
    document.body.classList.toggle('apresentando', on);
    if (on) { abrirPainel(false); const el = document.documentElement; if (el.requestFullscreen && !document.fullscreenElement) el.requestFullscreen().catch(() => {}); aviso('Modo apresentação. Toque no pontinho do canto ou aperte Esc para sair.', 'play'); }
    else if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    aplicarEdicao();
  }
  function esconderDica() { const d = $('.sm-dica'); if (d) d.hidden = true; if (!ui.dicaVista) { ui.dicaVista = true; salvarUI(); } }

  $('.sm-fab').addEventListener('click', () => abrirPainel());
  $('.sm-barra').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.disp) { ui.disp = b.dataset.disp; salvarUI(); ajustarAparelho(); sincronizarBarra(); }
    if (b.dataset.tela !== undefined) { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.().catch(() => {}); }
    if (b.dataset.apresentar !== undefined) apresentar(true);
  });
  function sincronizarBarra() { $$('.sm-barra [data-disp]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.disp === ui.disp))); }
  $('.sm-sair').addEventListener('click', () => apresentar(false));
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && ui.apresentando) apresentar(false); });
  if (!document.documentElement.requestFullscreen) $$('[data-tela]').forEach(b => b.remove());
  document.addEventListener('keydown', e => {
    const luz = $('.caixa-luz');
    if (luz && !luz.hidden) { if (e.key === 'Escape') luz.hidden = true; if (e.key === 'ArrowLeft') passoLuz(-1); if (e.key === 'ArrowRight') passoLuz(1); return; }
    if (e.key !== 'Escape') return;
    if ($$('.folha').some(f => !f.hidden)) { fecharFolhas(); return; }
    if (ui.apresentando) { apresentar(false); return; }
    if (ui.painel) abrirPainel(false);
  });

  /* ---------- App instalável e sem internet (só na versão publicada) ---------- */
  let pedidoInstalar = null;
  function prepararOffline() {
    if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol) || location.hostname === 'localhost') return;
    const grupo = $('[data-grupo-offline]', painel); if (grupo) grupo.hidden = false;
    const estado = $('[data-offline-estado]', painel);
    navigator.serviceWorker.register('sw.js').catch(() => { if (estado) estado.textContent = 'Este navegador não deixou guardar o modelo para usar sem internet.'; });
    navigator.serviceWorker.ready.then(() => { if (estado) estado.innerHTML = '✓ Pronto: este aparelho já guardou o modelo e abre mesmo sem internet.'; });
    window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); pedidoInstalar = e; const b = $('[data-acao="instalar"]', painel); if (b) b.hidden = false; });
  }

  /* ---------- Início ---------- */
  montarPainel();
  prepararOffline();
  render();
  ajustarAparelho();
  sincronizarPainel();
  sincronizarBarra();
  if (!ui.dicaVista) { const d = $('.sm-dica'); if (d) { d.hidden = false; setTimeout(esconderDica, 9000); } }
})();
