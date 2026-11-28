/* Painel do Studio Magalhães dentro das lojas de demonstração.
   - Modo Studio e Modo apresentação: ambos abrem todas as abas do pincel (Marca, Visual,
     Entrega e Enviar) para preparar a loja, personalizar ao vivo com o cliente, enviar
     amostra online ou registrar fechamento. No modo apresentação, a tela fica limpa
     (sem faixa de demonstração e em tela cheia).
   Não vai para o site do cliente. */
(() => {
  'use strict';
  const C = window.Catalogo, L = C.LOJA, I = window.ICONES;
  if (!L.demo) return;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = C.esc;
  const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || ''}</svg>`;
  const CH = 'sm-catalogo:estudio';
  const PASTA = location.pathname.split('/').filter(Boolean).slice(-2, -1)[0] || L.id; // ex.: "lanchonete"
  const URL_PUB = 'https://studiomagalhaes.com.br/negocios/modelo/catalogo/';

  /* ---------- Modo amostra recebida por link (#amostra=...) para cliente remoto ---------- */
  if (location.hash.startsWith('#amostra=')) {
    const am = C.decodificar(location.hash.slice(9));
    if (am) {
      C.aplicarAmostra(am);
      document.body.classList.add('modo-amostra');
      const faixa = $('[data-faixa]');
      if (faixa) faixa.innerHTML = `Prévia exclusiva para <b>${esc(C.visual.nome)}</b> · preparada pelo <b>Studio Magalhães</b> · modelo demonstrativo (pedidos não enviados)`;
      return;
    }
  }

  /* Registra o Service Worker para o app do Catálogo funcionar instalável e sem internet */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    navigator.serviceWorker.register('../../sw.js', { scope: '../../' }).catch(() => {});
  }

  const FONTES = {
    marcante:    { nome: 'Marcante',    t: "'Bricolage Grotesque', system-ui, sans-serif", c: "'DM Sans', system-ui, sans-serif" },
    moderna:     { nome: 'Moderna',     t: "'Montserrat', system-ui, sans-serif",          c: "'Inter', system-ui, sans-serif" },
    acolhedora:  { nome: 'Acolhedora',  t: "'Fraunces', Georgia, serif",                   c: "'Nunito Sans', system-ui, sans-serif" },
    elegante:    { nome: 'Elegante',    t: "'Playfair Display', Georgia, serif",           c: "'Source Sans 3', system-ui, sans-serif" },
    geometrica:  { nome: 'Geométrica',  t: "'Outfit', system-ui, sans-serif",              c: "'Plus Jakarta Sans', system-ui, sans-serif", g: ['Outfit', 'Plus Jakarta Sans'] },
    minimalista: { nome: 'Minimalista', t: "'Space Grotesk', system-ui, sans-serif",       c: "'Inter', system-ui, sans-serif",             g: ['Space Grotesk'] },
    impacto:     { nome: 'Impacto',     t: "'Syne', system-ui, sans-serif",                c: "'DM Sans', system-ui, sans-serif",           g: ['Syne'] },
    forte:       { nome: 'Forte',       t: "'Bebas Neue', system-ui, sans-serif",          c: "'DM Sans', system-ui, sans-serif",           g: ['Bebas Neue'] },
    urbana:      { nome: 'Urbana',      t: "'Anton', system-ui, sans-serif",               c: "'Inter', system-ui, sans-serif",             g: ['Anton'] },
    luxo:        { nome: 'Luxo',        t: "'Cormorant Garamond', Georgia, serif",         c: "'Lato', system-ui, sans-serif",              g: ['Cormorant Garamond', 'Lato'] },
    boutique:    { nome: 'Boutique',    t: "'Cinzel', Georgia, serif",                     c: "'Montserrat', system-ui, sans-serif",        g: ['Cinzel'] },
    editorial:   { nome: 'Editorial',   t: "'DM Serif Display', Georgia, serif",           c: "'DM Sans', system-ui, sans-serif",           g: ['DM Serif Display'] },
    artesanal:   { nome: 'Artesanal',   t: "'Abril Fatface', Georgia, serif",              c: "'Poppins', system-ui, sans-serif",           g: ['Abril Fatface', 'Poppins'] },
    jovem:       { nome: 'Jovem',       t: "'Poppins', system-ui, sans-serif",             c: "'Nunito', system-ui, sans-serif",            g: ['Poppins', 'Nunito'] },
    suave:       { nome: 'Suave',       t: "'Quicksand', system-ui, sans-serif",           c: "'Nunito', system-ui, sans-serif",            g: ['Quicksand', 'Nunito'] },
    clean:       { nome: 'Clean',       t: "'Sora', system-ui, sans-serif",                c: "'Inter', system-ui, sans-serif",             g: ['Sora'] },
    tech:        { nome: 'Tech',        t: "'Exo 2', system-ui, sans-serif",               c: "'Inter', system-ui, sans-serif",             g: ['Exo 2'] },
    classica:    { nome: 'Clássica',    t: "'Merriweather', Georgia, serif",               c: "'Open Sans', system-ui, sans-serif",         g: ['Merriweather', 'Open Sans'] },
    sofisticada: { nome: 'Sofisticada', t: "'Lora', Georgia, serif",                       c: "'Work Sans', system-ui, sans-serif",         g: ['Lora', 'Work Sans'] },
    gourmet:     { nome: 'Gourmet',     t: "'Libre Baskerville', Georgia, serif",          c: "'Lato', system-ui, sans-serif",              g: ['Libre Baskerville', 'Lato'] },
    delicada:    { nome: 'Delicada',    t: "'Bodoni Moda', Georgia, serif",                c: "'Montserrat', system-ui, sans-serif",        g: ['Bodoni Moda'] },
    bold:        { nome: 'Condensada',  t: "'Oswald', system-ui, sans-serif",              c: "'Open Sans', system-ui, sans-serif",         g: ['Oswald', 'Open Sans'] },
    retro:       { nome: 'Retrô',       t: "'Righteous', system-ui, sans-serif",           c: "'Nunito', system-ui, sans-serif",            g: ['Righteous', 'Nunito'] },
    manuscrita:  { nome: 'Manuscrita',  t: "'Pacifico', cursive",                          c: "'Quicksand', system-ui, sans-serif",         g: ['Pacifico', 'Quicksand'] }
  };
  let fontesExtrasCarregadas = false;
  function carregarFontesPainel() {
    if (fontesExtrasCarregadas) return;
    fontesExtrasCarregadas = true;
    const nomes = [...new Set(Object.values(FONTES).flatMap(f => f.g || []))];
    const query = nomes.map(n => `family=${encodeURIComponent(n).replace(/%20/g, '+')}:wght@400;600;700;800`).join('&');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${query}&display=swap`;
    document.head.appendChild(link);
  }
  const PALETAS = [
    ['#c8321e', '#f6b52e'], ['#e85d04', '#ffd166'], ['#c94a72', '#f3b7c8'], ['#6b238c', '#f4b942'], ['#1d4ed8', '#fbbf24'],
    ['#15803d', '#facc15'], ['#7c3aed', '#fb7185'], ['#0f766e', '#f59e0b'], ['#8c4a2f', '#e9c46a'], ['#111827', '#f97316'],
    ['#991b1b', '#eab308'], ['#0e7490', '#38bdf8'], ['#be185d', '#f9a8d4'], ['#3f6212', '#d9f99d'], ['#4338ca', '#a5b4fc'],
    ['#b45309', '#fde047'], ['#1e293b', '#10b981'], ['#9d174d', '#fbbf24'], ['#047857', '#6ee7b7'], ['#581c87', '#e879f9']
  ];
  const PLANOS = ['Catálogo digital · R$ 49,90/mês', 'Site premium · R$ 79,90/mês', 'Site premium · R$ 199,90/mês (2 atualizações)', 'Outro (anotar nas observações)'];

  /* ---------- Cores ---------- */
  const hexRgb = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const rgbHex = c => '#' + c.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const mistura = (a, b, t) => rgbHex(hexRgb(a).map((v, i) => v + (hexRgb(b)[i] - v) * t));
  const derivadas = (p, d) => ({ p, d, escuro: mistura(p, '#0b0806', .84), fundo: mistura(p, '#ffffff', .95) });
  function rgbHsl([r, g, b]) {
    r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
    if (mx === mn) return [0, 0, l];
    const d = mx - mn, s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
    const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, s, l];
  }
  function hslHex(h, s, l) {
    const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return rgbHex([f(0) * 255, f(8) * 255, f(4) * 255]);
  }
  /** Tira as duas cores mais marcantes de uma imagem (logo). */
  function coresDaImagem(url) {
    return new Promise(ok => {
      const img = new Image(); img.onload = () => {
        const c = document.createElement('canvas'); c.width = c.height = 72; const g = c.getContext('2d');
        g.drawImage(img, 0, 0, 72, 72); const px = g.getImageData(0, 0, 72, 72).data;
        const bins = Array.from({ length: 18 }, () => ({ w: 0, r: 0, g: 0, b: 0, n: 0, s: 0 }));
        for (let i = 0; i < px.length; i += 4) {
          if (px[i + 3] < 140) continue;
          const rgb = [px[i], px[i + 1], px[i + 2]], [h, s, l] = rgbHsl(rgb);
          if (s < .22 || l < .14 || l > .9) continue;
          const bin = bins[Math.floor(h / 20) % 18], w = s * (1 - Math.abs(l - .5));
          bin.w += w; bin.r += rgb[0] * w; bin.g += rgb[1] * w; bin.b += rgb[2] * w; bin.n++; bin.s += s;
        }
        // só faixas de cor com bastante pixel e cor forte (tira as bordas misturadas do desenho)
        const total = bins.reduce((t, b) => t + b.n, 0);
        const ord = bins.map((b, i) => ({ ...b, i })).filter(b => b.n > total * .03 && b.s / b.n > .38).sort((a, b) => b.w - a.w);
        if (!ord.length) { ok(null); return; }
        const cor = b => rgbHex([b.r / b.w, b.g / b.w, b.b / b.w]);
        const p = ord[0], d = ord.find(b => Math.min(Math.abs(b.i - p.i), 18 - Math.abs(b.i - p.i)) >= 2 && b.w > p.w * .08);
        // sem segunda cor no logo: usa a cor oposta no círculo das cores, clara e viva
        const oposta = () => { const [h] = rgbHsl(hexRgb(cor(p))); return hslHex((h + 165) % 360, .78, .6); };
        ok({ p: cor(p), d: d ? cor(d) : oposta() });
      };
      img.onerror = () => ok(null); img.src = url;
    });
  }
  function reduzirLogo(arquivo) {
    return new Promise((ok, erro) => {
      const img = new Image(), url = URL.createObjectURL(arquivo);
      img.onload = () => { const s = Math.min(1, 360 / Math.max(img.width, img.height));
        const c = Object.assign(document.createElement('canvas'), { width: Math.round(img.width * s), height: Math.round(img.height * s) });
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
        const png = /png|svg|webp/.test(arquivo.type); ok(c.toDataURL(png ? 'image/png' : 'image/jpeg', .88)); };
      img.onerror = () => { URL.revokeObjectURL(url); erro(); };
      img.src = url;
    });
  }
  const sigla = nome => { const p = nome.trim().split(/\s+/).filter(w => !/^(de|da|do|das|dos|e|&)$/i.test(w));
    return ((p[0] || nome || 'L')[0] + (p[1] ? p[1][0] : '')).toUpperCase(); };

  /* ---------- Estrutura ---------- */
  const raiz = document.createElement('div'); raiz.className = 'est';
  raiz.innerHTML = `<button type="button" class="est-fab" aria-label="Abrir o painel de edição" aria-expanded="false">${ic('pincel')}</button>
    <button type="button" class="est-fab-plano" aria-label="Abrir valores e planos" aria-expanded="false">${ic('moeda')}<span>Valores</span></button>
    <div class="est-dica" hidden>Toque aqui para personalizar a loja ou em Valores ao lado para montar a proposta.</div>
    <button type="button" class="est-sair" aria-label="Sair do modo apresentação" title="Sair do modo apresentação"></button>
    <div class="est-flut" data-flut hidden></div>
    <aside class="est-painel" aria-label="Painel"></aside>
    <aside class="est-planos" aria-label="Valores e fechamento"></aside>`;
  document.body.appendChild(raiz);
  const painel = $('.est-painel', raiz);
  const painelPlanos = $('.est-planos', raiz);
  const flut = $('[data-flut]', raiz);
  let aviT;
  function aviso(t, icone = 'check') {
    let a = $('.est-aviso'); if (!a) { a = document.createElement('div'); a.className = 'est-aviso est'; a.setAttribute('role', 'status'); document.body.appendChild(a); }
    a.innerHTML = ic(icone) + esc(t); a.hidden = false; clearTimeout(aviT); aviT = setTimeout(() => { a.hidden = true; }, 2600);
  }
  const apresentando = () => document.body.classList.contains('est-apresentando');
  let previaAberta = true;
  let rascunho = { responsavel: '', contato: '', plano: PLANOS[0], obs: '' };

  /* ---------- Histórico da sessão para estilos aleatórios + botão flutuante ---------- */
  const CH_HIST = CH + ':hist:' + L.id;
  const CH_FLUT = CH + ':flut:' + L.id;
  let histEstilos = [], histIdx = -1, flutAtivo = false, flutListaAberta = false;
  try {
    const salvo = JSON.parse(sessionStorage.getItem(CH_HIST) || 'null');
    if (salvo && Array.isArray(salvo.lista) && salvo.lista.length) {
      histEstilos = salvo.lista;
      histIdx = Math.max(0, Math.min(histEstilos.length - 1, +salvo.idx || 0));
    }
    flutAtivo = sessionStorage.getItem(CH_FLUT) === '1';
  } catch { /* sem sessionStorage */ }
  const salvarHist = () => { try { sessionStorage.setItem(CH_HIST, JSON.stringify({ lista: histEstilos, idx: histIdx })); } catch { /* */ } };
  const salvarFlut = () => { try { sessionStorage.setItem(CH_FLUT, flutAtivo ? '1' : '0'); } catch { /* */ } };
  const snapEstilo = () => {
    const v = C.visual;
    return {
      cores: { ...v.cores },
      cena: v.cena,
      fontes: { ...v.fontes },
      estiloHero: v.estiloHero || 'escuro',
      fundoHero: v.fundoHero || 'pontos',
      grade: v.grade || 'horizontal',
      cantos: v.cantos || 'arredondado',
      topoEstilo: v.topoEstilo || 'claro'
    };
  };
  function aplicarDoHistorico(i) {
    if (i < 0 || i >= histEstilos.length) return;
    histIdx = i;
    salvarHist();
    const s = histEstilos[i];
    mudar({ ...s, cores: { ...s.cores }, fontes: { ...s.fontes } }, null, document.body.classList.contains('est-aberto'));
    renderFlut();
    aviso(`Modelo #${i + 1} de ${histEstilos.length}`, 'check');
  }
  function gerarAleatorio(origemPainel = false) {
    if (!histEstilos.length) { histEstilos.push(snapEstilo()); histIdx = 0; }
    const sort = (arr, atual) => { const f = arr.filter(x => x !== atual); const a = f.length ? f : arr; return a[Math.floor(Math.random() * a.length)]; };
    const cenasDisp = [...Object.keys(window.CENAS_NOMES || {}), 'nenhuma'];
    const fontesDisp = Object.values(FONTES);
    const pal = sort(PALETAS, PALETAS.find(([p]) => p.toLowerCase() === C.visual.cores.p.toLowerCase()));
    const f = sort(fontesDisp, fontesDisp.find(x => x.t === C.visual.fontes.t));
    const novo = {
      cores: derivadas(pal[0], pal[1]),
      cena: sort(cenasDisp, C.visual.cena),
      fontes: { t: f.t, c: f.c },
      estiloHero: sort(['escuro', 'claro', 'vibrante', 'central'], C.visual.estiloHero || 'escuro'),
      fundoHero: sort(['pontos', 'grade', 'listras', 'liso'], C.visual.fundoHero || 'pontos'),
      grade: sort(['horizontal', 'vitrine', 'compacto'], C.visual.grade || 'horizontal'),
      cantos: sort(['arredondado', 'editorial', 'pilula'], C.visual.cantos || 'arredondado'),
      topoEstilo: sort(['claro', 'escuro'], C.visual.topoEstilo || 'claro')
    };
    histEstilos.push(novo);
    histIdx = histEstilos.length - 1;
    salvarHist();
    mudar({ ...novo, cores: { ...novo.cores }, fontes: { ...novo.fontes } }, null, origemPainel);
    renderFlut();
    aviso(`Estilo #${histIdx + 1} gerado! Volte nas setas se gostou de algum anterior.`, 'brilho');
  }
  const chipsHistorico = () => histEstilos.map((h, i) =>
    `<button type="button" class="est-hist-chip" data-hist-ir="${i}" aria-current="${i === histIdx}">
      <span class="est-hist-cor"><i style="background:${esc(h.cores.p)}"></i><i style="background:${esc(h.cores.d)}"></i></span>#${i + 1}</button>`).join('');
  function renderFlut() {
    flut.hidden = !flutAtivo;
    if (!flutAtivo) return;
    const n = histEstilos.length;
    flut.innerHTML = `${n > 1 ? `<div class="est-flut-lista"${flutListaAberta ? '' : ' hidden'}>${chipsHistorico()}</div>` : ''}
      <div class="est-flut-bar">
        ${n > 1 ? `<button type="button" class="est-flut-btn" data-hist-passo="-1" aria-label="Estilo anterior"${histIdx <= 0 ? ' disabled' : ''}>${ic('esq')}</button>` : ''}
        <button type="button" class="est-flut-btn p" data-aleatorio>${ic('brilho')}Aleatório${n > 0 ? `<span class="est-flut-cont">${histIdx + 1}/${n}</span>` : ''}</button>
        ${n > 1 ? `<button type="button" class="est-flut-btn" data-hist-passo="1" aria-label="Próximo estilo"${histIdx >= n - 1 ? ' disabled' : ''}>${ic('dir')}</button>
        <button type="button" class="est-flut-btn" data-flut-lista aria-label="Ver todos os estilos gerados" title="Ver histórico">${ic('lista')}</button>` : ''}
        <button type="button" class="est-flut-btn" data-toggle-flut aria-label="Esconder barra" title="Esconder">${ic('x')}</button>
      </div>`;
  }
  flut.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const d = b.dataset;
    if (d.aleatorio !== undefined) gerarAleatorio(false);
    else if (d.histPasso) aplicarDoHistorico(histIdx + +d.histPasso);
    else if (d.histIr !== undefined) aplicarDoHistorico(+d.histIr);
    else if (d.flutLista !== undefined) { flutListaAberta = !flutListaAberta; renderFlut(); }
    else if (d.toggleFlut !== undefined) { flutAtivo = false; salvarFlut(); renderFlut(); aviso('Botão Aleatório escondido. Ative de novo no pincel.', 'info'); }
  });
  renderFlut();

  function htmlPreviaViva() {
    const V = C.visual, T = C.textos;
    const cena = V.cena !== 'nenhuma' && window.CENAS && window.CENAS[V.cena] ? window.CENAS[V.cena]() : null;
    const prods = (C.dados.produtos || []).filter(p => !p.pausado).slice(0, 3);
    const aberta = C.situacao().aberta;
    return `<div class="est-previa-bar">
        <b>Prévia ao vivo</b>
        <div class="est-previa-acoes">
          <button type="button" class="est-previa-btn" data-aleatorio title="Gerar estilo aleatório">${ic('brilho')}Aleatório</button>
          <button type="button" class="est-previa-btn" data-toggle-previa>${previaAberta ? 'Ocultar' : 'Mostrar'}</button>
        </div>
      </div>
      <div class="est-mini-site" data-hero-estilo="${esc(V.estiloHero || 'escuro')}" data-hero-fundo="${esc(V.fundoHero || 'pontos')}" data-grade="${esc(V.grade || 'horizontal')}" data-cantos="${esc(V.cantos || 'arredondado')}" data-topo="${esc(V.topoEstilo || 'claro')}">
        <div class="est-mini-topo">
          <span class="est-mini-logo">${V.logo ? `<img src="${esc(V.logo)}" alt="">` : esc(V.sigla)}</span>
          <div class="est-mini-marca"><b>${esc(V.nome)}</b><small>${esc(V.segmento)}</small></div>
          <span class="est-mini-dot${aberta ? '' : ' fechada'}" title="${aberta ? 'Aberto' : 'Fechado'}"></span>
        </div>
        <div class="est-mini-hero${cena ? '' : ' sem-cena'}">
          <div class="est-mini-htxt">
            <span class="est-mini-selo">${esc(T.selo)}</span>
            <div class="est-mini-tit">${esc(T.titulo)}</div>
            <span class="est-mini-cta">${esc(T.botao || 'Ver catálogo')}</span>
          </div>
          ${cena ? `<div class="est-mini-cena">${cena.principal}</div>` : ''}
        </div>
        <div class="est-mini-cards">
          ${prods.map(p => `<div class="est-mini-card"><div><span></span><span></span></div><img src="${esc(p.foto)}" alt=""></div>`).join('')}
        </div>
      </div>`;
  }
  function atualizarPrevia() {
    const w = $('[data-previa-wrap]', painel);
    if (!w) return;
    w.classList.toggle('fechada', !previaAberta);
    w.innerHTML = htmlPreviaViva();
  }

  let abaPainel = 'marca';
  const sanfonas = { textos: false, cena: true, layout: false, cores: false, fontes: false, salvar: false, fechar: false };

  function montar() {
    const V = C.visual, T = C.textos, l = C.dados.loja, cliente = apresentando();
    const fonteAtual = Object.entries(FONTES).find(([, f]) => f.t === V.fontes.t)?.[0];
    const clientes = C.clientes();
    const sanf = (id, tit, detalhe, corpo) => `<div class="est-sanfona${sanfonas[id] ? ' aberta' : ''}" data-sanf-wrap="${id}">
      <button type="button" class="est-sanfona-cab" data-sanf="${id}" aria-expanded="${!!sanfonas[id]}">
        <span>${tit}${detalhe ? `<small>· ${esc(detalhe)}</small>` : ''}</span>${ic('baixo', 'ic-seta')}
      </button><div class="est-sanfona-corpo">${corpo}</div></div>`;
    const secPrevia = () => `<div class="est-previa-wrap${previaAberta ? '' : ' fechada'}" data-previa-wrap>${htmlPreviaViva()}</div>`;
    const abasLista = [['marca', 'Marca'], ['visual', 'Visual'], ['entrega', 'Entrega'], ['enviar', 'Enviar']];
    const secAbas = () => `<div class="est-abas" role="tablist">
      ${abasLista.map(([id, nm]) => `<button type="button" class="est-aba" role="tab" data-aba-est="${id}" aria-selected="${abaPainel === id}">${nm}</button>`).join('')}</div>`;

    const secNome = () => `<section class="est-grupo" style="padding-top:12px">
        <label class="est-campo"><span>Nome da loja</span><input class="est-entrada" data-v="nome" value="${esc(V.nome)}" maxlength="40" autocomplete="off"></label>
        <label class="est-campo"><span>Frase abaixo do nome</span><input class="est-entrada" data-v="segmento" value="${esc(V.segmento)}" maxlength="40" autocomplete="off"></label>
        <div class="est-logo"><span class="previa">${V.logo ? `<img src="${esc(V.logo)}" alt="">` : esc(V.sigla)}</span>
          <div class="est-linha"><label class="est-btn">${ic('foto')}${V.logo ? 'Trocar logo' : 'Foto do logo'}<input type="file" accept="image/*" data-logo hidden></label>
          ${V.logo ? `<button type="button" class="est-btn" data-cores-logo>${ic('paleta')}Cores do logo</button><button type="button" class="est-btn est-btn-perigo" data-tirar-logo aria-label="Tirar logo">${ic('lixo')}</button>` : ''}</div></div>
        <div class="est-addon${!V.demoFechada ? ' ativo' : ''}" style="margin:10px 0">
          <div class="est-addon-txt"><b>${V.demoFechada ? 'Simulando loja fechada' : 'Demonstração sempre aberta'}</b><small>${V.demoFechada ? 'Mostra aviso de loja fechada na vitrine.' : 'Fica aberta em qualquer horário para testar pedidos.'}</small></div>
          <button type="button" class="est-btn" style="min-height:36px;padding:6px 10px;font-size:.78rem" data-toggle-aberta>${V.demoFechada ? 'Abrir' : 'Fechar'}</button>
        </div>
        <label class="est-campo" style="margin-top:10px"><span>WhatsApp da loja (pedido de teste)</span><input class="est-entrada" data-whats inputmode="tel" value="${esc(l.whats)}" placeholder="(21) 99999-9999"></label>
      </section>
      ${sanf('textos', 'Textos do topo', 'título e frase', `
        <label class="est-campo"><span>Frase pequena</span><input class="est-entrada" data-t="selo" value="${esc(T.selo)}" maxlength="40"></label>
        <label class="est-campo"><span>Título</span><input class="est-entrada" data-t="titulo" value="${esc(T.titulo)}" maxlength="60"></label>
        <label class="est-campo" style="margin-bottom:0"><span>Texto</span><textarea class="est-entrada" data-t="sub" maxlength="180">${esc(T.sub)}</textarea></label>`)}`;

    const cenasLista = (L.cenas && L.cenas.length ? L.cenas : Object.keys(window.CENAS_NOMES || {})).filter(id => (window.CENAS_NOMES || {})[id]);
    const thumbCena = id => {
      try { const c = window.CENAS && window.CENAS[id] && window.CENAS[id](); return c && c.principal ? `<span class="est-thumb-cena">${c.principal}</span>` : ic('brilho'); }
      catch { return ic('brilho'); }
    };
    const grpEstilo = (tit, attr, atual, ops) => `<div style="margin-bottom:12px"><div style="font-size:.78rem;font-weight:700;color:#b5c3da;margin-bottom:6px">${tit}</div>
      <div class="est-ops">${ops.map(([id, nm, sw]) => `<button type="button" class="est-op" style="min-height:68px;padding:8px 8px" data-estilo="${attr}:${id}" aria-pressed="${atual === id}"><span class="est-swatch ${sw}"></span>${nm}</button>`).join('')}</div></div>`;

    const secVisual = () => `<section class="est-grupo" style="padding:12px 0 6px;border-bottom:0">
        <button type="button" class="est-btn est-btn-p est-cheio" data-aleatorio style="margin-bottom:8px">${ic('brilho')}Gerar estilo aleatório</button>
        <button type="button" class="est-btn est-cheio" data-toggle-flut aria-pressed="${flutAtivo}" style="margin-bottom:6px${flutAtivo ? ';border-color:#4fc3c8;background:#15305a' : ''}">${ic(flutAtivo ? 'check' : 'play')}${flutAtivo ? 'Botão Aleatório visível fora do pincel' : 'Mostrar botão Aleatório fora do pincel'}</button>
        ${histEstilos.length > 1 ? `<div class="est-hist-box"><div class="est-hist-topo"><span>Gerados nesta sessão (${histIdx + 1}/${histEstilos.length})</span>
          <div class="est-hist-nav"><button type="button" data-hist-passo="-1" aria-label="Anterior"${histIdx <= 0 ? ' disabled' : ''}>${ic('esq')}</button>
          <button type="button" data-hist-passo="1" aria-label="Próximo"${histIdx >= histEstilos.length - 1 ? ' disabled' : ''}>${ic('dir')}</button></div></div>
          <div class="est-hist-trilha">${chipsHistorico()}</div></div>` : ''}
      </section>
      ${sanf('cena', 'Animação 3D do topo', V.cena === 'nenhuma' ? 'Sem 3D' : (window.CENAS_NOMES[V.cena] || `${cenasLista.length} opções`), `
        <div class="est-ops">
          <button type="button" class="est-op" data-cena="nenhuma" aria-pressed="${V.cena === 'nenhuma'}"><span class="est-thumb-cena">${ic('olhoFechado')}</span>Sem animação 3D</button>
          ${cenasLista.map(id => `<button type="button" class="est-op" data-cena="${id}" aria-pressed="${V.cena === id}">${thumbCena(id)}${esc(window.CENAS_NOMES[id])}</button>`).join('')}
        </div>
        <p class="est-nota">Escolhida com o cliente antes da entrega (a loja não troca depois).</p>`)}
      ${sanf('layout', 'Layout e cartões', '5 ajustes', `
        ${grpEstilo('Apresentação do topo', 'estiloHero', V.estiloHero || 'escuro', [['escuro', 'Escuro elegante', 'sw-escuro'], ['claro', 'Claro editorial', 'sw-claro'], ['vibrante', 'Cor da marca', 'sw-vibrante'], ['central', 'Centralizado', 'sw-central']])}
        ${grpEstilo('Fundo do topo', 'fundoHero', V.fundoHero || 'pontos', [['pontos', 'Pontilhado', 'sw-pontos'], ['grade', 'Grade fina', 'sw-grade'], ['listras', 'Listras sutis', 'sw-listras'], ['liso', 'Brilho limpo', 'sw-liso']])}
        ${grpEstilo('Estilo dos cartões', 'grade', V.grade || 'horizontal', [['horizontal', 'Lateral', 'sw-horizontal'], ['vitrine', 'Vitrine grande', 'sw-vitrine'], ['compacto', 'Lista rápida', 'sw-compacto']])}
        ${grpEstilo('Cantos e formato', 'cantos', V.cantos || 'arredondado', [['arredondado', 'Moderno', 'sw-arredondado'], ['editorial', 'Reto editorial', 'sw-editorial'], ['pilula', 'Arredondado', 'sw-pilula']])}
        ${grpEstilo('Barra do topo', 'topoEstilo', V.topoEstilo || 'claro', [['claro', 'Barra clara', 'sw-topo-claro'], ['escuro', 'Barra escura', 'sw-topo-escuro']])}`)}
      ${sanf('cores', 'Cores da loja', `${PALETAS.length} paletas`, `
        <div class="est-paletas">${PALETAS.map(([p, d]) => `<button type="button" class="est-paleta" data-paleta="${p},${d}" aria-pressed="${V.cores.p.toLowerCase() === p && V.cores.d.toLowerCase() === d}" aria-label="Paleta de cores"><i style="background:${p}"></i><i style="background:${d}"></i></button>`).join('')}</div>
        <div class="est-cores">${[['p', 'Principal'], ['d', 'Destaque'], ['escuro', 'Fundo do topo'], ['fundo', 'Fundo da página']].map(([k, nm]) => `<label class="est-cor"><input type="color" data-cor="${k}" value="${esc(V.cores[k])}"><span>${nm}</span></label>`).join('')}</div>`)}
      ${sanf('fontes', 'Letras e fontes', FONTES[fonteAtual]?.nome || `${Object.keys(FONTES).length} fontes`, `
        <div class="est-ops">${Object.entries(FONTES).map(([id, f]) => `<button type="button" class="est-op" data-fonte="${id}" aria-pressed="${fonteAtual === id}"><span class="aa" style="font-family:${f.t.replace(/"/g, "'")};font-weight:700">Aa</span>${f.nome}</button>`).join('')}</div>`)}`;

    const modoEnt = V.entregaModo || 'entregadores';
    const secEntrega = () => `<section class="est-grupo" style="padding-top:12px">
        <div class="est-ops">
          ${[['entregadores', 'Entregadores', 'entrega'], ['correios', 'Correios (digital)', 'entrega'], ['ambos', 'Entregadores e Correios', 'entrega'], ['nenhuma', 'Sem entrega', 'loja']].map(([id, nm, icn]) =>
            `<button type="button" class="est-op" style="min-height:68px;padding:10px 8px" data-entrega-modo="${id}" aria-pressed="${modoEnt === id}">${ic(icn)}${nm}</button>`).join('')}
        </div>
        ${modoEnt === 'correios' || modoEnt === 'ambos' ? `<label class="est-campo" style="margin-top:12px"><span>CEP de origem da loja (para cálculo de frete)</span><input class="est-entrada" data-v="cepOrigem" inputmode="numeric" maxlength="9" value="${esc(V.cepOrigem || '24220-000')}" placeholder="24220-000"></label>` : ''}
        <p class="est-nota">No modo <b>Correios</b>, a loja funciona como negócio 100% digital com cálculo por CEP no carrinho.</p>
      </section>
      <section class="est-grupo"><div class="est-linha"><a class="est-btn" style="flex:1" href="admin.html">${ic('cadeado')}Área da loja</a><a class="est-btn" style="flex:1" href="../">${ic('lista')}Outros modelos</a></div></section>`;

    const fila = window.Nuvem ? window.Nuvem.fila().length : 0, us = window.Nuvem && window.Nuvem.usuario;
    const secEnviar = () => `<section class="est-grupo" style="padding-top:12px">
        <h3 style="margin-bottom:8px"><span class="n">1</span>Enviar amostra online (WhatsApp / E-mail)</h3>
        <p class="est-nota" style="margin:0 0 10px">Link exclusivo desta prévia para clientes de qualquer estado — abre direto sem login do Studio.</p>
        <div class="est-linha">
          <button type="button" class="est-btn est-btn-p" style="flex:1" data-amostra-whats>${ic('whats')}WhatsApp</button>
          <button type="button" class="est-btn" style="flex:1" data-amostra-email>${ic('envia')}E-mail</button>
        </div>
        <button type="button" class="est-btn est-cheio" style="margin-top:8px" data-amostra-copiar>${ic('copiar2')}Copiar link da amostra</button>
      </section>
      ${sanf('salvar', 'Guardar para a visita', `${clientes.length} salvos`, `
        <div class="est-linha"><input class="est-entrada" style="flex:1;min-width:0" data-nome-cliente value="${esc(C.ajustado() ? V.nome : '')}" placeholder="Nome para lembrar"><button type="button" class="est-btn est-btn-p" data-guardar>${ic('salvar')}Guardar</button></div>
        <ul class="est-salvos">${clientes.length ? clientes.map((c, i) => { const v = (c.ajuste && c.ajuste.visual) || {}, cr = v.cores || L.visual.cores; return `<li><span class="mini"><i style="background:${esc(cr.p)}"></i><i style="background:${esc(cr.d)}"></i></span>
          <div style="min-width:0"><b>${esc(c.nome)}</b><small>${new Date(c.quando).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</small></div>
          <button type="button" class="abrir" data-abrir="${i}">Abrir</button><button type="button" data-apagar="${i}" aria-label="Apagar ${esc(c.nome)}">${ic('lixo')}</button></li>`; }).join('') : '<li class="vazio">Nada guardado ainda.</li>'}</ul>
        <div class="est-linha" style="margin-top:12px"><button type="button" class="est-btn est-btn-perigo est-cheio" data-zerar>${ic('desfazer')}Voltar ao modelo original</button></div>`)}
      ${sanf('fechar', 'Fechamento rápido', fila ? `${fila} na fila` : 'Clientes fechados', `
        <button type="button" class="est-btn est-btn-p est-cheio" style="margin-bottom:12px" data-ir-valores>${ic('moeda')}Abrir painel dinâmico de Valores</button>
        <label class="est-campo"><span>Nome do responsável</span><input class="est-entrada" data-f="responsavel" value="${esc(rascunho.responsavel)}" maxlength="60" autocomplete="off"></label>
        <label class="est-campo"><span>WhatsApp do cliente</span><input class="est-entrada" data-f="contato" inputmode="tel" value="${esc(rascunho.contato || l.whats)}" maxlength="30"></label>
        <label class="est-campo"><span>Plano</span><select class="est-entrada" data-f="plano">${PLANOS.map(p => `<option${p === rascunho.plano ? ' selected' : ''}>${esc(p)}</option>`).join('')}</select></label>
        <label class="est-campo"><span>Observações</span><textarea class="est-entrada" data-f="obs" maxlength="3000" placeholder="O que combinou, prazos, pedidos…">${esc(rascunho.obs)}</textarea></label>
        <button type="button" class="est-btn est-btn-p est-cheio" data-fechamento>${ic('check')}Salvar fechamento</button>
        <p class="est-nota" data-nuvem>${us ? `Conectado como ${esc(us.email)}.` : `Para enviar, entre com o Google. <button type="button" class="est-btn" data-entrar style="margin-top:8px">${ic('cadeado')}Entrar com Google</button>`}
          ${fila ? `<br><b style="color:#f2c46d">${fila} esperando para subir.</b> <button type="button" class="est-btn" data-enviar-fila style="margin-top:8px">Enviar agora</button>` : ''}
          ${window.Nuvem && window.Nuvem.erro ? `<br><b style="color:#f5a596">${esc(window.Nuvem.erro)}</b>` : ''}
          ${us ? `<br><button type="button" class="est-btn" data-sair-google style="margin-top:8px">Trocar de conta</button>` : ''}</p>
        <a class="est-btn est-cheio" style="margin-top:8px" href="https://studiomagalhaes.com.br/negocios/clientes/" target="_blank" rel="noopener">${ic('lista')}Ver clientes fechados</a>`)}`;

    const conteudoAba = abaPainel === 'marca' ? secNome() : abaPainel === 'visual' ? secVisual() : abaPainel === 'entrega' ? secEntrega() : secEnviar();
    painel.innerHTML = `
    <div class="est-topo"><span class="est-marca">${cliente ? esc(V.sigla) : 'SM'}</span><div><b>${cliente ? 'Personalizar o site' : 'Preparar para o cliente'}</b><small>Organizado por abas com prévia ao vivo</small></div>
      <button type="button" class="est-x" data-fechar aria-label="Fechar">${ic('x')}</button></div>
    ${secPrevia()}${secAbas()}
    <div class="est-corpo">${conteudoAba}</div>
    <div class="est-pe">${cliente
      ? `<button type="button" class="est-btn" data-sair-apresentar>${ic('x')}Sair da apresentação</button><button type="button" class="est-btn est-btn-p" data-fechar>${ic('check')}Ver como ficou</button>`
      : `<button type="button" class="est-btn" data-fechar>${ic('check')}Pronto</button><button type="button" class="est-btn est-btn-p" data-apresentar>${ic('play')}Apresentar</button>`}</div>`;
  }

  /* ---------- Painel dinâmico de valores, adicionais e fechamento ---------- */
  const PLANOS_DET = [
    {
      id: 'catalogo', tag: 'Mais escolhido', nome: 'Catálogo digital', mensal: 49.9, criacao: 0,
      resumo: 'Criação grátis · permanência mínima de 6 meses.',
      inclusos: [
        'Site personalizado com nome, logo, cores, fonte e animação 3D escolhidos',
        'Até 20 produtos cadastrados pelo Studio na entrega (o resto a loja edita)',
        'Área da loja com senha: dono + até 3 funcionários + até 3 entregadores',
        'Pedidos prontos no WhatsApp, cupons, QR Code de balcão/mesa e impressão térmica',
        'Correção de erros e suporte técnico sempre gratuitos'
      ]
    },
    {
      id: 'premium-base', tag: 'Site completo', nome: 'Site premium', mensal: 79.9, criacao: 490,
      resumo: 'Criação a partir de R$ 490 · atualizações avulsas à parte.',
      inclusos: [
        'Site completo multi-páginas personalizado com animações 3D do ramo',
        'Catálogo/pedidos + painel para cores, logo, frases e faixa de avisos',
        'Atualizações avulsas sob demanda (a partir de R$ 89,90)',
        'Correção de erros e emergências sempre gratuitos'
      ]
    },
    {
      id: 'premium-2at', tag: 'Completo + manutenção', nome: 'Site premium + 2 atualizações/mês', mensal: 199.9, criacao: 490,
      resumo: 'Criação a partir de R$ 490 · 2 atualizações mensais incluídas.',
      inclusos: [
        'Tudo do Site premium multi-páginas personalizado',
        '2 atualizações mensais incluídas (banners, textos, campanhas, ajustes)',
        'Correção de erros e emergências não contam como atualização'
      ]
    }
  ];
  const prop = {
    planoId: 'catalogo',
    pagOnline: false,
    dominio: false,
    funcExtras: 0,
    entExtras: 0,
    chatIA: false,
    correios: (C.visual.entregaModo === 'correios' || C.visual.entregaModo === 'ambos'),
    formaPag: 'Pix'
  };
  const R = C.dinheiro;
  function calcProposta() {
    const p = PLANOS_DET.find(x => x.id === prop.planoId) || PLANOS_DET[0];
    const linhas = [[p.nome, R(p.mensal) + '/mês']];
    let mensal = p.mensal;
    const extrasTxt = [];
    if (prop.pagOnline) { mensal += 25; linhas.push(['Pagamento online no site (Pix/Cartão)', '+ R$ 25,00/mês']); extrasTxt.push('Pagamento online (+R$ 25)'); }
    if (prop.dominio) { mensal += 20; linhas.push(['Domínio próprio (.com.br)', '+ R$ 20,00/mês']); extrasTxt.push('Domínio próprio (+R$ 20)'); }
    if (prop.funcExtras > 0) { const v = prop.funcExtras * 10; mensal += v; linhas.push([`+${prop.funcExtras} funcionário${prop.funcExtras > 1 ? 's' : ''} extra${prop.funcExtras > 1 ? 's' : ''}`, `+ ${R(v)}/mês`]); extrasTxt.push(`+${prop.funcExtras} func. (+${R(v)})`); }
    if (prop.entExtras > 0) { const v = prop.entExtras * 10; mensal += v; linhas.push([`+${prop.entExtras} entregador${prop.entExtras > 1 ? 'es' : ''} extra${prop.entExtras > 1 ? 's' : ''}`, `+ ${R(v)}/mês`]); extrasTxt.push(`+${prop.entExtras} entreg. (+${R(v)})`); }
    if (prop.chatIA) { mensal += 100; linhas.push(['Chat com IA (a partir de)', '+ R$ 100,00/mês']); extrasTxt.push('Chat IA (+R$ 100)'); }
    if (prop.correios) { linhas.push(['Cálculo de frete Correios / Melhor Envio', 'Incluso (R$ 0)']); extrasTxt.push('Frete Correios (incluso)'); }
    mensal = Math.round(mensal * 100) / 100;
    const planoLinha = `${p.nome} (${R(p.mensal)}/mês)${extrasTxt.length ? ' + ' + extrasTxt.join(' + ') : ''} = ${R(mensal)}/mês${p.criacao ? ` · Criação ${R(p.criacao)}` : ' · Criação grátis'}`;
    return { p, mensal, criacao: p.criacao, linhas, extrasTxt, planoLinha };
  }
  function gerarLinkAmostra() {
    const v = C.visual, t = C.textos;
    const visualLimpo = {
      nome: v.nome, segmento: v.segmento, sigla: v.sigla,
      cores: v.cores, fontes: v.fontes, cena: v.cena,
      estiloHero: v.estiloHero || 'escuro', fundoHero: v.fundoHero || 'pontos',
      grade: v.grade || 'horizontal', cantos: v.cantos || 'arredondado',
      topoEstilo: v.topoEstilo || 'claro',
      entregaModo: v.entregaModo || 'entregadores', cepOrigem: v.cepOrigem || ''
    };
    if (v.logo && v.logo.length < 4500) visualLimpo.logo = v.logo;
    const cod = C.codificar({ visual: visualLimpo, textos: { selo: t.selo, titulo: t.titulo, sub: t.sub, botao: t.botao } });
    const base = /^https?:\/\/[^/]*studiomagalhaes\.com\.br/i.test(location.origin) ? `${location.origin}${location.pathname}` : `${URL_PUB}${PASTA}/`;
    return `${base}#amostra=${cod}`;
  }
  function montarPlanos() {
    const c = calcProposta(), l = C.dados.loja, v = C.visual;
    const fila = window.Nuvem ? window.Nuvem.fila().length : 0, us = window.Nuvem && window.Nuvem.usuario;
    painelPlanos.innerHTML = `
    <div class="est-topo"><span class="est-marca">SM</span><div><b>Valores e proposta</b><small>Monte os detalhes e feche com ${esc(v.nome)}</small></div>
      <button type="button" class="est-x" data-fechar-planos aria-label="Fechar">${ic('x')}</button></div>
    <div class="est-corpo">
      <section class="est-grupo"><h3><span class="n">1</span>Escolha o plano base</h3>
        <div class="est-plano-lista">${PLANOS_DET.map(pl => `<button type="button" class="est-plano-card" data-plano-id="${pl.id}" aria-pressed="${prop.planoId === pl.id}">
          <span class="est-plano-tag">${pl.tag}</span>
          <div class="est-plano-cab"><b>${pl.nome}</b><span class="est-plano-preco">${R(pl.mensal)}/mês</span></div>
          <small>${pl.resumo}</small></button>`).join('')}</div>
        <ul class="est-inclusos">${c.p.inclusos.map(x => `<li>${ic('check')}<span>${esc(x)}</span></li>`).join('')}</ul>
      </section>
      <section class="est-grupo"><h3><span class="n">2</span>Adicionais opcionais</h3>
        <div class="est-addon-lista">
          <label class="est-addon${prop.pagOnline ? ' ativo' : ''}"><div class="est-addon-txt"><b>Pagamento online no site · + R$ 25/mês</b><small>Cliente paga por Pix ou cartão direto no site (dinheiro cai na conta da loja via Mercado Pago).</small></div><input class="est-addon-check" type="checkbox" data-addon="pagOnline"${prop.pagOnline ? ' checked' : ''}></label>
          <label class="est-addon${prop.dominio ? ' ativo' : ''}"><div class="est-addon-txt"><b>Domínio próprio (.com.br) · + R$ 20/mês</b><small>Sem ele, usa endereço grátis do Studio.</small></div><input class="est-addon-check" type="checkbox" data-addon="dominio"${prop.dominio ? ' checked' : ''}></label>
          <div class="est-addon${prop.funcExtras > 0 ? ' ativo' : ''}"><div class="est-addon-txt"><b>Funcionários extras · + R$ 10/mês cada</b><small>3 já incluídos no plano.</small></div>
            <div class="est-stepper"><button type="button" data-step="funcExtras:-1">−</button><span>${prop.funcExtras}</span><button type="button" data-step="funcExtras:1">+</button></div></div>
          <div class="est-addon${prop.entExtras > 0 ? ' ativo' : ''}"><div class="est-addon-txt"><b>Entregadores extras · + R$ 10/mês cada</b><small>3 já incluídos no plano.</small></div>
            <div class="est-stepper"><button type="button" data-step="entExtras:-1">−</button><span>${prop.entExtras}</span><button type="button" data-step="entExtras:1">+</button></div></div>
          <label class="est-addon${prop.chatIA ? ' ativo' : ''}"><div class="est-addon-txt"><b>Chat com IA · + R$ 100/mês</b><small>Atendimento automático inteligente (a partir de R$ 100 conforme volume).</small></div><input class="est-addon-check" type="checkbox" data-addon="chatIA"${prop.chatIA ? ' checked' : ''}></label>
          <label class="est-addon${prop.correios ? ' ativo' : ''}"><div class="est-addon-txt"><b>Frete Correios / Melhor Envio · Incluso</b><small>Cálculo por CEP (PAC e SEDEX) para vendas online em todo o Brasil.</small></div><input class="est-addon-check" type="checkbox" data-addon="correios"${prop.correios ? ' checked' : ''}></label>
        </div>
      </section>
      <section class="est-grupo"><h3><span class="n">3</span>Resumo dos valores</h3>
        <div class="est-resumo-preco">
          <div class="est-resumo-topo">
            <div><small>Mensalidade total</small><div class="est-resumo-val">${R(c.mensal)}<span style="font-size:.82rem;font-weight:600">/mês</span></div></div>
            <div class="est-resumo-cria"><small>Criação</small><b>${c.criacao ? R(c.criacao) : 'Grátis'}</b></div>
          </div>
          <ul class="est-resumo-linhas">${c.linhas.map(([nm, vl]) => `<li><span>${esc(nm)}</span><span>${esc(vl)}</span></li>`).join('')}</ul>
        </div>
        <p class="est-nota">${c.p.id === 'catalogo' ? 'Permanência mínima de 6 meses. ' : ''}Reajuste anual pelo IPCA após 12 meses. Correção de erros sempre gratuita.</p>
      </section>
      <section class="est-grupo est-fechar"><h3><span class="n">4</span>Fechar e enviar para Clientes fechados</h3>
        <label class="est-campo"><span>Nome do responsável</span><input class="est-entrada" data-pf="responsavel" value="${esc(rascunho.responsavel)}" maxlength="60" placeholder="Nome do dono da loja" autocomplete="off"></label>
        <label class="est-campo"><span>WhatsApp do cliente</span><input class="est-entrada" data-pf="contato" inputmode="tel" value="${esc(rascunho.contato || l.whats)}" maxlength="30" placeholder="(21) 99999-9999"></label>
        <label class="est-campo"><span>Forma de pagamento da assinatura</span><select class="est-entrada" data-pf="formaPag">${['Pix', 'Cartão recorrente (automático)', 'Cartão avulso'].map(fp => `<option${fp === prop.formaPag ? ' selected' : ''}>${fp}</option>`).join('')}</select></label>
        <label class="est-campo"><span>Observações combinadas</span><textarea class="est-entrada" data-pf="obs" maxlength="2500" placeholder="Prazos, domínio escolhido, pedidos especiais do cliente…">${esc(rascunho.obs)}</textarea></label>
        <button type="button" class="est-btn est-btn-p est-cheio" data-fechar-proposta>${ic('check')}Fechar e mandar para Clientes fechados</button>
        <button type="button" class="est-btn est-cheio" style="margin-top:8px" data-proposta-whats>${ic('whats')}Enviar proposta + link da amostra no WhatsApp</button>
        <p class="est-nota" data-nuvem-planos>${us ? `Conectado como ${esc(us.email)}.` : `Para subir automaticamente, entre com o Google. <button type="button" class="est-btn" data-entrar style="margin-top:8px">${ic('cadeado')}Entrar com Google</button>`}
          ${fila ? `<br><b style="color:#f2c46d">${fila} ${fila === 1 ? 'fechamento esperando' : 'fechamentos esperando'} para subir.</b> <button type="button" class="est-btn" data-enviar-fila style="margin-top:8px">Enviar agora</button>` : ''}
          ${window.Nuvem && window.Nuvem.erro ? `<br><b style="color:#f5a596">${esc(window.Nuvem.erro)}</b>` : ''}</p>
        <a class="est-btn est-cheio" style="margin-top:8px" href="https://studiomagalhaes.com.br/negocios/clientes/" target="_blank" rel="noopener">${ic('lista')}Abrir Clientes fechados</a>
      </section>
    </div>
    <div class="est-pe" style="grid-template-columns:1fr"><button type="button" class="est-btn" data-fechar-planos>${ic('check')}Voltar para a vitrine</button></div>`;
  }

  /* ---------- Abrir, fechar, apresentar ---------- */
  function abrir(sim) {
    if (sim) abrirPlanos(false);
    document.body.classList.toggle('est-aberto', sim);
    $('.est-fab', raiz).setAttribute('aria-expanded', String(sim));
    if (sim) {
      carregarFontesPainel();
      montar(); $('.est-dica', raiz).hidden = true; try { localStorage.setItem(CH + ':dica', '1'); } catch { /* */ }
      if (window.Nuvem && navigator.onLine) window.Nuvem.carregar().catch(() => {});
    }
  }
  function abrirPlanos(sim) {
    if (sim) abrir(false);
    document.body.classList.toggle('est-planos-aberto', sim);
    $('.est-fab-plano', raiz).setAttribute('aria-expanded', String(sim));
    if (sim) {
      montarPlanos(); $('.est-dica', raiz).hidden = true; try { localStorage.setItem(CH + ':dica', '1'); } catch { /* */ }
      if (window.Nuvem && navigator.onLine) window.Nuvem.carregar().catch(() => {});
    }
  }
  function apresentar(sim) {
    document.body.classList.toggle('est-apresentando', sim);
    abrir(false); abrirPlanos(false);
    if (sim) { const d = document.documentElement; if (d.requestFullscreen && !document.fullscreenElement) d.requestFullscreen().catch(() => {}); aviso('Modo apresentação. O pincel personaliza e Valores monta a proposta. Pontinho do canto: sair.', 'play'); }
    else if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }
  $('.est-fab', raiz).addEventListener('click', () => abrir(true));
  $('.est-fab-plano', raiz).addEventListener('click', () => abrirPlanos(true));
  $('.est-sair', raiz).addEventListener('click', () => apresentar(false));
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && apresentando()) apresentar(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (document.body.classList.contains('est-planos-aberto')) abrirPlanos(false); else if (document.body.classList.contains('est-aberto')) abrir(false); else if (apresentando()) apresentar(false); } });
  try { if (!localStorage.getItem(CH + ':dica')) { const d = $('.est-dica', raiz); d.hidden = false; setTimeout(() => { d.hidden = true; }, 9000); } } catch { /* */ }
  if (window.Nuvem) window.Nuvem.aoMudar(() => {
    if (document.body.classList.contains('est-aberto')) { const p = $('[data-nuvem]', painel); if (p) { const y = $('.est-corpo', painel).scrollTop; montar(); $('.est-corpo', painel).scrollTop = y; } }
    if (document.body.classList.contains('est-planos-aberto')) { const y = $('.est-corpo', painelPlanos)?.scrollTop || 0; montarPlanos(); const c = $('.est-corpo', painelPlanos); if (c) c.scrollTop = y; }
  });

  /* ---------- Abrir um modelo guardado (link vindo da área de clientes fechados) ---------- */
  if (location.hash.startsWith('#cfg=')) {
    const cfg = C.decodificar(location.hash.slice(5));
    history.replaceState(null, '', location.pathname + location.search);
    if (cfg && C.aplicarConfig(cfg)) setTimeout(() => aviso(`Modelo de ${C.visual.nome} aberto`, 'check'), 400);
    else setTimeout(() => aviso('Não deu para abrir esse modelo aqui', 'info'), 400);
  }

  /* ---------- Mudanças ---------- */
  const V = () => C.visual;
  function mudar(v, t, refazer) {
    if (!C.definirVisual(v, t)) aviso('Sem espaço neste aparelho. Use uma foto menor do logo.', 'info');
    if (refazer) { const y = $('.est-corpo', painel)?.scrollTop; montar(); const c = $('.est-corpo', painel); if (c) c.scrollTop = y; }
    else atualizarPrevia();
  }
  let tDigita;
  painel.addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.v) {
      clearTimeout(tDigita);
      tDigita = setTimeout(() => {
        const patch = { [t.dataset.v]: t.value };
        if (t.dataset.v === 'nome') patch.sigla = sigla(t.value || 'Loja');
        mudar(patch);
        const pv = $('.est-logo .previa', painel); if (pv && !V().logo) pv.textContent = V().sigla;
      }, 120);
    }
    if (t.dataset.t) { clearTimeout(tDigita); tDigita = setTimeout(() => mudar(null, { [t.dataset.t]: t.value }), 150); }
    if (t.dataset.cor) mudar({ cores: { ...V().cores, [t.dataset.cor]: t.value } });
    if (t.matches('[data-whats]')) { C.dados.loja.whats = t.value; C.salvar(); }
    if (t.dataset.f) rascunho[t.dataset.f] = t.value;
  });
  painel.addEventListener('change', async e => {
    const t = e.target;
    if (t.matches('[data-logo]') && t.files[0]) {
      try {
        const logo = await reduzirLogo(t.files[0]);
        const cores = await coresDaImagem(logo);
        mudar({ logo, ...(cores ? { cores: derivadas(cores.p, cores.d) } : {}) }, null, true);
        aviso(cores ? 'Logo colocado e site pintado com as cores dele' : 'Logo colocado', 'foto');
      } catch { aviso('Não deu para abrir essa imagem', 'info'); }
    }
    if (t.dataset.cor) mudar(null, null, true);
    if (t.dataset.f) rascunho[t.dataset.f] = t.value;
  });
  painel.addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b) return;
    const d = b.dataset;
    if (d.fechar !== undefined) abrir(false);
    else if (d.abaEst) { abaPainel = d.abaEst; montar(); }
    else if (d.sanf) { sanfonas[d.sanf] = !sanfonas[d.sanf]; const y = $('.est-corpo', painel)?.scrollTop || 0; montar(); const c = $('.est-corpo', painel); if (c) c.scrollTop = y; }
    else if (d.toggleAberta !== undefined) { const prox = !V().demoFechada; mudar({ demoFechada: prox }, null, true); aviso(prox ? 'Simulando loja fechada' : 'Demonstração aberta novamente', 'relogio'); }
    else if (d.irValores !== undefined) { abrirPlanos(true); }
    else if (d.togglePrevia !== undefined) { previaAberta = !previaAberta; atualizarPrevia(); }
    else if (d.apresentar !== undefined) apresentar(true);
    else if (d.sairApresentar !== undefined) apresentar(false);
    else if (d.cena) { mudar({ cena: d.cena }, null, true); }
    else if (d.entregaModo) { mudar({ entregaModo: d.entregaModo }, null, true); }
    else if (d.estilo) { const [k, val] = d.estilo.split(':'); mudar({ [k]: val }, null, true); }
    else if (d.aleatorio !== undefined) { gerarAleatorio(true); }
    else if (d.toggleFlut !== undefined) { const y = $('.est-corpo', painel)?.scrollTop; flutAtivo = !flutAtivo; salvarFlut(); renderFlut(); montar(); const c = $('.est-corpo', painel); if (c) c.scrollTop = y; aviso(flutAtivo ? 'Botão Aleatório ativado na tela (aparece ao fechar o pincel)' : 'Botão Aleatório escondido da tela', 'brilho'); }
    else if (d.histPasso) { aplicarDoHistorico(histIdx + +d.histPasso); }
    else if (d.histIr !== undefined) { aplicarDoHistorico(+d.histIr); }
    else if (d.paleta) { const [p, dd] = d.paleta.split(','); mudar({ cores: derivadas(p, dd) }, null, true); }
    else if (d.fonte) { const f = FONTES[d.fonte]; mudar({ fontes: { t: f.t, c: f.c } }, null, true); }
    else if (d.coresLogo !== undefined) { const c = await coresDaImagem(V().logo); if (c) { mudar({ cores: derivadas(c.p, c.d) }, null, true); aviso('Cores tiradas do logo', 'paleta'); } else aviso('O logo não tem cores fortes. Escolha uma paleta.', 'info'); }
    else if (d.tirarLogo !== undefined) { mudar({ logo: '' }, null, true); }
    else if (d.guardar !== undefined) {
      const nome = ($('[data-nome-cliente]', painel).value || V().nome).trim();
      if (C.guardarCliente(nome)) { aviso(`Guardado: ${nome}`, 'salvar'); montar(); } else aviso('Sem espaço neste aparelho para guardar. Apague um cliente antigo.', 'info');
    }
    else if (d.abrir) { if (C.abrirCliente(+d.abrir)) { montar(); aviso(`Aberto: ${C.clientes()[+d.abrir].nome}`, 'check'); } }
    else if (d.apagar) { const c = C.clientes()[+d.apagar]; if (c && confirm(`Apagar "${c.nome}" deste aparelho?`)) { C.apagarCliente(+d.apagar); montar(); } }
    else if (d.zerar !== undefined) { if (confirm('Voltar ao modelo original? O nome, as cores e o cardápio voltam ao exemplo. Os clientes guardados continuam.')) { C.limparVisual(); C.restaurar(); montar(); aviso('Modelo original de volta', 'desfazer'); } }
    else if (d.entrar !== undefined) {
      try { await window.Nuvem.entrar(); aviso('Conectado', 'check'); }
      catch (err) { aviso(/sem-servidor/.test(err.message) ? 'Para entrar, abra o modelo pelo site (com internet).' : 'Não deu para entrar agora. Tente de novo.', 'info'); }
    }
    else if (d.enviarFila !== undefined) { try { const n = await window.Nuvem.enviarFila(); aviso(n ? `${n} enviado(s)` : 'Entre com o Google e tenha internet para enviar', n ? 'check' : 'info'); } catch { aviso('Não deu para enviar agora', 'info'); } montar(); }
    else if (d.sairGoogle !== undefined) { try { await window.Nuvem.sair(); } catch { /* */ } montar(); }
    else if (d.fechamento !== undefined) salvarFechamento();
    else if (d.amostraCopiar !== undefined) {
      const url = gerarLinkAmostra();
      try { await navigator.clipboard.writeText(url); aviso('Link da amostra copiado! É só colar no WhatsApp ou e-mail.', 'check'); }
      catch { prompt('Copie o link da amostra:', url); }
    }
    else if (d.amostraWhats !== undefined) {
      const url = gerarLinkAmostra(), v = V();
      const num = String(rascunho.contato || C.dados.loja.whats || '').replace(/\D/g, ''), n = num && num.length <= 11 ? '55' + num : num;
      const msg = `Olá! Preparei uma prévia exclusiva do Catálogo digital para *${v.nome}* (${L.ramo}), feita pelo Studio Magalhães.\n\nVocê pode navegar e testar direto pelo link:\n${url}\n\nMe diga o que achou!`;
      window.open(`https://wa.me/${n}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    }
    else if (d.amostraEmail !== undefined) {
      const url = gerarLinkAmostra(), v = V();
      const assunto = `Prévia exclusiva do Catálogo digital · ${v.nome} (Studio Magalhães)`;
      const corpo = `Olá!\n\nPreparei uma prévia navegável do Catálogo digital personalizada para ${v.nome} (${L.ramo}).\n\nAcesse a amostra por este link:\n${url}\n\nSe quiser ajustar cores, animação ou saber os detalhes do plano, é só responder por aqui!\n\nAbraço,\nStudio Magalhães`;
      window.location.href = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    }
  });

  /* ---------- Eventos do painel dinâmico de valores e fechamento ---------- */
  const refazerPlanos = () => { const y = $('.est-corpo', painelPlanos)?.scrollTop || 0; montarPlanos(); const c = $('.est-corpo', painelPlanos); if (c) c.scrollTop = y; };
  painelPlanos.addEventListener('input', e => {
    const k = e.target.dataset.pf; if (!k) return;
    if (k === 'formaPag') prop.formaPag = e.target.value;
    else rascunho[k] = e.target.value;
  });
  painelPlanos.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.addon) { prop[t.dataset.addon] = t.checked; refazerPlanos(); return; }
    if (t.dataset.pf === 'formaPag') prop.formaPag = t.value;
  });
  painelPlanos.addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b) return;
    const d = b.dataset;
    if (d.fecharPlanos !== undefined) abrirPlanos(false);
    else if (d.planoId) { prop.planoId = d.planoId; refazerPlanos(); }
    else if (d.step) { const [k, delta] = d.step.split(':'); prop[k] = Math.max(0, Math.min(20, (prop[k] || 0) + +delta)); refazerPlanos(); }
    else if (d.entrar !== undefined) {
      try { await window.Nuvem.entrar(); aviso('Conectado', 'check'); refazerPlanos(); }
      catch (err) { aviso(/sem-servidor/.test(err.message) ? 'Para entrar, abra o modelo pelo site (com internet).' : 'Não deu para entrar agora. Tente de novo.', 'info'); }
    }
    else if (d.enviarFila !== undefined) { try { const n = await window.Nuvem.enviarFila(); aviso(n ? `${n} enviado(s)` : 'Entre com o Google e tenha internet para enviar', n ? 'check' : 'info'); } catch { aviso('Não deu para enviar agora', 'info'); } refazerPlanos(); }
    else if (d.propostaWhats !== undefined) {
      const c = calcProposta(), v = V(), url = gerarLinkAmostra();
      const num = String(rascunho.contato || C.dados.loja.whats || '').replace(/\D/g, ''), n = num && num.length <= 11 ? '55' + num : num;
      const linhas = [
        `*Proposta Studio Magalhães · ${v.nome}*`, '',
        `*Plano:* ${c.p.nome}`,
        ...c.linhas.map(([nm, vl]) => `• ${nm}: ${vl}`),
        '', `*Criação:* ${c.criacao ? R(c.criacao) : 'Grátis'}`,
        `*Mensalidade total:* ${R(c.mensal)}/mês`,
        `*Pagamento:* ${prop.formaPag}`,
        '', `Veja sua prévia navegável:\n${url}`
      ];
      window.open(`https://wa.me/${n}?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener');
    }
    else if (d.fecharProposta !== undefined) {
      const c = calcProposta();
      const obsExtra = [`Forma de pagamento: ${prop.formaPag}`, c.extrasTxt.length ? `Adicionais: ${c.extrasTxt.join(', ')}` : '', rascunho.obs.trim()].filter(Boolean).join('\n');
      await salvarFechamento({
        plano: c.planoLinha,
        produto: c.p.id === 'catalogo' ? 'Catálogo digital' : 'Site premium',
        mensalidade: c.mensal,
        criacao: c.criacao,
        adicionais: c.extrasTxt,
        formaPagamento: prop.formaPag,
        obs: obsExtra
      });
      refazerPlanos();
    }
  });

  async function salvarFechamento(override = null) {
    const V = C.visual;
    if (!rascunho.responsavel.trim() && !confirm('Salvar sem o nome do responsável?')) return;
    const doc = {
      loja: V.nome, responsavel: rascunho.responsavel.trim(), contato: (rascunho.contato || C.dados.loja.whats || '').trim(),
      plano: (override && override.plano) || rascunho.plano,
      obs: override ? override.obs : rascunho.obs.trim(),
      produto: (override && override.produto) || 'Catálogo digital',
      modelo: L.id, pasta: PASTA, ramo: L.ramo,
      entregaModo: V.entregaModo || 'entregadores',
      ...(override ? { mensalidade: override.mensalidade, criacao: override.criacao, adicionais: override.adicionais, formaPagamento: override.formaPagamento } : {}),
      // a configuração vai como texto: o Firestore não aceita listas dentro de listas (ex.: horários)
      cena: V.cena, cores: V.cores, logo: V.logo || '', sigla: V.sigla || '', config: JSON.stringify(C.configAtual())
    };
    try {
      const r = await window.Nuvem.salvarFechamento(doc);
      rascunho = { responsavel: '', contato: '', plano: PLANOS[0], obs: '' };
      montar();
      aviso(r === 'enviado' ? `Fechamento de ${V.nome} salvo na sua área` : 'Fechamento guardado neste aparelho. Sobe quando tiver internet e login.', r === 'enviado' ? 'check' : 'info');
    } catch { aviso('Sem espaço neste aparelho. Tente uma foto menor do logo.', 'info'); }
  }
})();
