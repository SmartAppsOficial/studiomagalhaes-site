/* Painel do Studio Magalhães dentro das lojas de demonstração.
   - Modo Studio: preparar a loja antes da visita (nome, logo, cores, animação, letras, textos,
     tipo de cardápio, WhatsApp, guardar por cliente) e registrar o fechamento.
   - Modo apresentação: o mesmo botão abre só o que o dono da loja precisa ver e experimentar.
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
  raiz.innerHTML = `<button type="button" class="est-fab" aria-label="Abrir o painel" aria-expanded="false">${ic('pincel')}</button>
    <div class="est-dica" hidden>Toque aqui para colocar o nome, o logo, as cores e a animação do cliente.</div>
    <button type="button" class="est-sair" aria-label="Sair do modo apresentação" title="Sair do modo apresentação"></button>
    <div class="est-flut" data-flut hidden></div>
    <aside class="est-painel" aria-label="Painel"></aside>`;
  document.body.appendChild(raiz);
  const painel = $('.est-painel', raiz);
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
          <span class="est-mini-dot"></span>
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

  function montar() {
    const V = C.visual, T = C.textos, l = C.dados.loja, cliente = apresentando();
    const fonteAtual = Object.entries(FONTES).find(([, f]) => f.t === V.fontes.t)?.[0];
    const clientes = C.clientes();
    let n = 0; const num = () => `<span class="n">${++n}</span>`;
    const secPrevia = () => `<div class="est-previa-wrap${previaAberta ? '' : ' fechada'}" data-previa-wrap>${htmlPreviaViva()}</div>`;
    const secNome = () => `<section class="est-grupo"><h3>${num()}Nome e logo</h3>
        <label class="est-campo"><span>Nome da loja</span><input class="est-entrada" data-v="nome" value="${esc(V.nome)}" maxlength="40" autocomplete="off"></label>
        <label class="est-campo"><span>Frase abaixo do nome</span><input class="est-entrada" data-v="segmento" value="${esc(V.segmento)}" maxlength="40" autocomplete="off"></label>
        <div class="est-logo"><span class="previa">${V.logo ? `<img src="${esc(V.logo)}" alt="">` : esc(V.sigla)}</span>
          <div class="est-linha"><label class="est-btn">${ic('foto')}${V.logo ? 'Trocar logo' : 'Foto do logo'}<input type="file" accept="image/*" data-logo hidden></label>
          ${V.logo ? `<button type="button" class="est-btn" data-cores-logo>${ic('paleta')}Cores do logo</button><button type="button" class="est-btn est-btn-perigo" data-tirar-logo aria-label="Tirar logo">${ic('lixo')}</button>` : ''}</div></div>
        ${cliente ? '' : `<p class="est-nota">Dica: tire uma foto do logo na fachada ou no Instagram da loja. Ao colocar o logo, o site já se pinta com as cores dele.</p>
        <label class="est-campo" style="margin-top:12px"><span>WhatsApp da loja (para o pedido de teste chegar nela)</span><input class="est-entrada" data-whats inputmode="tel" value="${esc(l.whats)}" placeholder="(21) 99999-9999"></label>`}
      </section>`;
    const cenasLista = (L.cenas && L.cenas.length ? L.cenas : Object.keys(window.CENAS_NOMES || {})).filter(id => (window.CENAS_NOMES || {})[id]);
    const thumbCena = id => {
      try { const c = window.CENAS && window.CENAS[id] && window.CENAS[id](); return c && c.principal ? `<span class="est-thumb-cena">${c.principal}</span>` : ic('brilho'); }
      catch { return ic('brilho'); }
    };
    const secCena = () => `<section class="est-grupo"><h3>${num()}Animação 3D do topo (${cenasLista.length} opções)</h3><div class="est-ops">
        <button type="button" class="est-op" data-cena="nenhuma" aria-pressed="${V.cena === 'nenhuma'}"><span class="est-thumb-cena">${ic('olhoFechado')}</span>Sem animação 3D</button>
        ${cenasLista.map(id => `<button type="button" class="est-op" data-cena="${id}" aria-pressed="${V.cena === id}">${thumbCena(id)}${esc(window.CENAS_NOMES[id])}</button>`).join('')}</div>
        <p class="est-nota">Você escolhe uma animação (ou topo limpo sem 3D) com o cliente antes da entrega. Depois de entregue, só o Studio pode trocar.</p></section>`;
    const secEstilo = () => {
      const grp = (tit, attr, atual, ops) => `<div style="margin-bottom:12px"><div style="font-size:.78rem;font-weight:700;color:#b5c3da;margin-bottom:6px">${tit}</div>
        <div class="est-ops">${ops.map(([id, nm, sw]) => `<button type="button" class="est-op" style="min-height:68px;padding:8px 8px" data-estilo="${attr}:${id}" aria-pressed="${atual === id}"><span class="est-swatch ${sw}"></span>${nm}</button>`).join('')}</div></div>`;
      return `<section class="est-grupo"><h3>${num()}Estilo visual (para cada loja ser única)</h3>
        <button type="button" class="est-btn est-btn-p est-cheio" data-aleatorio style="margin-bottom:8px">${ic('brilho')}Gerar estilo aleatório</button>
        <button type="button" class="est-btn est-cheio" data-toggle-flut aria-pressed="${flutAtivo}" style="margin-bottom:12px${flutAtivo ? ';border-color:#4fc3c8;background:#15305a' : ''}">${ic(flutAtivo ? 'check' : 'play')}${flutAtivo ? 'Botão Aleatório visível fora do pincel' : 'Mostrar botão Aleatório fora do pincel'}</button>
        ${histEstilos.length > 1 ? `<div class="est-hist-box"><div class="est-hist-topo"><span>Gerados nesta sessão (${histIdx + 1}/${histEstilos.length})</span>
          <div class="est-hist-nav"><button type="button" data-hist-passo="-1" aria-label="Anterior"${histIdx <= 0 ? ' disabled' : ''}>${ic('esq')}</button>
          <button type="button" data-hist-passo="1" aria-label="Próximo"${histIdx >= histEstilos.length - 1 ? ' disabled' : ''}>${ic('dir')}</button></div></div>
          <div class="est-hist-trilha">${chipsHistorico()}</div></div>` : ''}
        ${grp('Apresentação do topo', 'estiloHero', V.estiloHero || 'escuro', [['escuro', 'Escuro elegante', 'sw-escuro'], ['claro', 'Claro editorial', 'sw-claro'], ['vibrante', 'Cor da marca', 'sw-vibrante'], ['central', 'Centralizado', 'sw-central']])}
        ${grp('Fundo do topo', 'fundoHero', V.fundoHero || 'pontos', [['pontos', 'Pontilhado', 'sw-pontos'], ['grade', 'Grade fina', 'sw-grade'], ['listras', 'Listras sutis', 'sw-listras'], ['liso', 'Brilho limpo', 'sw-liso']])}
        ${grp('Estilo dos cartões', 'grade', V.grade || 'horizontal', [['horizontal', 'Lateral', 'sw-horizontal'], ['vitrine', 'Vitrine grande', 'sw-vitrine'], ['compacto', 'Lista rápida', 'sw-compacto']])}
        ${grp('Cantos e formato', 'cantos', V.cantos || 'arredondado', [['arredondado', 'Moderno', 'sw-arredondado'], ['editorial', 'Reto editorial', 'sw-editorial'], ['pilula', 'Arredondado', 'sw-pilula']])}
        ${grp('Barra do topo', 'topoEstilo', V.topoEstilo || 'claro', [['claro', 'Barra clara', 'sw-topo-claro'], ['escuro', 'Barra escura', 'sw-topo-escuro']])}
        <p class="est-nota">O botão aleatório sorteia cores, animação 3D, fonte, topo, fundo e cartões de uma vez.</p></section>`;
    };
    const secCores = () => `<section class="est-grupo"><h3>${num()}Cores</h3>
        <div class="est-paletas">${PALETAS.map(([p, d]) => `<button type="button" class="est-paleta" data-paleta="${p},${d}" aria-pressed="${V.cores.p.toLowerCase() === p && V.cores.d.toLowerCase() === d}" aria-label="Paleta de cores"><i style="background:${p}"></i><i style="background:${d}"></i></button>`).join('')}</div>
        <div class="est-cores">${[['p', 'Principal'], ['d', 'Destaque'], ['escuro', 'Fundo do topo'], ['fundo', 'Fundo da página']].map(([k, nm]) => `<label class="est-cor"><input type="color" data-cor="${k}" value="${esc(V.cores[k])}"><span>${nm}</span></label>`).join('')}</div></section>`;
    const secLetras = () => `<section class="est-grupo"><h3>${num()}Letras (${Object.keys(FONTES).length} fontes)</h3><div class="est-ops" style="max-height:260px;overflow-y:auto;padding-right:2px">
        ${Object.entries(FONTES).map(([id, f]) => `<button type="button" class="est-op" data-fonte="${id}" aria-pressed="${fonteAtual === id}"><span class="aa" style="font-family:${f.t.replace(/"/g, "'")};font-weight:700">Aa</span>${f.nome}</button>`).join('')}</div></section>`;
    const secTextos = () => `<section class="est-grupo"><h3>${num()}Textos do topo</h3>
        <label class="est-campo"><span>Frase pequena</span><input class="est-entrada" data-t="selo" value="${esc(T.selo)}" maxlength="40"></label>
        <label class="est-campo"><span>Título</span><input class="est-entrada" data-t="titulo" value="${esc(T.titulo)}" maxlength="60"></label>
        <label class="est-campo"><span>Texto</span><textarea class="est-entrada" data-t="sub" maxlength="180">${esc(T.sub)}</textarea></label></section>`;

    if (cliente) {
      painel.innerHTML = `<div class="est-topo"><span class="est-marca">${esc(V.sigla)}</span><div><b>Personalizar o site</b><small>Veja na prévia acima em tempo real</small></div>
          <button type="button" class="est-x" data-fechar aria-label="Fechar">${ic('x')}</button></div>
        ${secPrevia()}
        <div class="est-corpo">${secNome()}${secCena()}${secEstilo()}${secCores()}${secLetras()}${secTextos()}</div>
        <div class="est-pe" style="grid-template-columns:1fr"><button type="button" class="est-btn est-btn-p" data-fechar>${ic('check')}Ver como ficou</button></div>`;
      return;
    }
    const fila = window.Nuvem ? window.Nuvem.fila().length : 0, us = window.Nuvem && window.Nuvem.usuario;
    painel.innerHTML = `
    <div class="est-topo"><span class="est-marca">SM</span><div><b>Preparar para o cliente</b><small>Veja na prévia abaixo sem fechar o pincel</small></div>
      <button type="button" class="est-x" data-fechar aria-label="Fechar">${ic('x')}</button></div>
    ${secPrevia()}
    <div class="est-corpo">
      ${secNome()}${secCena()}${secEstilo()}${secCores()}${secLetras()}${secTextos()}
      <section class="est-grupo"><h3>${num()}Guardar para a visita</h3>
        <div class="est-linha"><input class="est-entrada" style="flex:1;min-width:0" data-nome-cliente value="${esc(C.ajustado() ? V.nome : '')}" placeholder="Nome para lembrar"><button type="button" class="est-btn est-btn-p" data-guardar>${ic('salvar')}Guardar</button></div>
        <ul class="est-salvos">${clientes.length ? clientes.map((c, i) => { const v = (c.ajuste && c.ajuste.visual) || {}, cr = v.cores || L.visual.cores; return `<li><span class="mini"><i style="background:${esc(cr.p)}"></i><i style="background:${esc(cr.d)}"></i></span>
          <div style="min-width:0"><b>${esc(c.nome)}</b><small>${new Date(c.quando).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</small></div>
          <button type="button" class="abrir" data-abrir="${i}">Abrir</button><button type="button" data-apagar="${i}" aria-label="Apagar ${esc(c.nome)}">${ic('lixo')}</button></li>`; }).join('') : '<li class="vazio">Nada guardado ainda.</li>'}</ul>
        <p class="est-nota">Guarda neste aparelho o nome, o logo, as cores, a animação, os textos e o cardápio.</p>
        <div class="est-linha" style="margin-top:12px"><button type="button" class="est-btn est-btn-perigo est-cheio" data-zerar>${ic('desfazer')}Voltar ao modelo original</button></div></section>
      <section class="est-grupo est-fechar"><h3>${num()}Fechou com o cliente?</h3>
        <p class="est-nota" style="margin:0 0 12px">Guarda este modelo, como está agora, na sua área de clientes fechados, com as suas observações.</p>
        <label class="est-campo"><span>Nome do responsável</span><input class="est-entrada" data-f="responsavel" value="${esc(rascunho.responsavel)}" maxlength="60" autocomplete="off"></label>
        <label class="est-campo"><span>WhatsApp do cliente</span><input class="est-entrada" data-f="contato" inputmode="tel" value="${esc(rascunho.contato || l.whats)}" maxlength="30"></label>
        <label class="est-campo"><span>Plano</span><select class="est-entrada" data-f="plano">${PLANOS.map(p => `<option${p === rascunho.plano ? ' selected' : ''}>${esc(p)}</option>`).join('')}</select></label>
        <label class="est-campo"><span>Observações</span><textarea class="est-entrada" data-f="obs" maxlength="3000" placeholder="O que combinou, prazos, pedidos do cliente, forma de pagamento…">${esc(rascunho.obs)}</textarea></label>
        <button type="button" class="est-btn est-btn-p est-cheio" data-fechamento>${ic('check')}Salvar fechamento</button>
        <p class="est-nota" data-nuvem>${us ? `Conectado como ${esc(us.email)}.` : `Para enviar, entre com a sua conta Google. <button type="button" class="est-btn" data-entrar style="margin-top:8px">${ic('cadeado')}Entrar com Google</button>`}
          ${fila ? `<br><b style="color:#f2c46d">${fila} ${fila === 1 ? 'fechamento esperando' : 'fechamentos esperando'} para subir.</b> <button type="button" class="est-btn" data-enviar-fila style="margin-top:8px">Enviar agora</button>` : ''}
          ${window.Nuvem && window.Nuvem.erro ? `<br><b style="color:#f5a596">${esc(window.Nuvem.erro)}</b>` : ''}
          ${us ? `<br><button type="button" class="est-btn" data-sair-google style="margin-top:8px">Trocar de conta</button>` : ''}</p>
        <a class="est-btn est-cheio" style="margin-top:8px" href="https://studiomagalhaes.com.br/negocios/clientes/" target="_blank" rel="noopener">${ic('lista')}Ver clientes fechados</a></section>
      <section class="est-grupo"><div class="est-linha"><a class="est-btn" style="flex:1" href="admin.html">${ic('cadeado')}Área da loja</a><a class="est-btn" style="flex:1" href="../">${ic('lista')}Outros modelos</a></div></section>
    </div>
    <div class="est-pe"><button type="button" class="est-btn" data-fechar>${ic('check')}Pronto</button><button type="button" class="est-btn est-btn-p" data-apresentar>${ic('play')}Apresentar</button></div>`;
  }

  /* ---------- Abrir, fechar, apresentar ---------- */
  function abrir(sim) {
    document.body.classList.toggle('est-aberto', sim);
    $('.est-fab', raiz).setAttribute('aria-expanded', String(sim));
    if (sim) {
      carregarFontesPainel();
      montar(); $('.est-dica', raiz).hidden = true; try { localStorage.setItem(CH + ':dica', '1'); } catch { /* */ }
      if (!apresentando() && window.Nuvem && navigator.onLine) window.Nuvem.carregar().catch(() => {});
    }
  }
  function apresentar(sim) {
    document.body.classList.toggle('est-apresentando', sim);
    abrir(false);
    if (sim) { const d = document.documentElement; if (d.requestFullscreen && !document.fullscreenElement) d.requestFullscreen().catch(() => {}); aviso('Modo apresentação. O pincel mostra só o que a loja pode mudar. Pontinho do canto: sair.', 'play'); }
    else if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }
  $('.est-fab', raiz).addEventListener('click', () => abrir(true));
  $('.est-sair', raiz).addEventListener('click', () => apresentar(false));
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && apresentando()) apresentar(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (document.body.classList.contains('est-aberto')) abrir(false); else if (apresentando()) apresentar(false); } });
  try { if (!localStorage.getItem(CH + ':dica')) { const d = $('.est-dica', raiz); d.hidden = false; setTimeout(() => { d.hidden = true; }, 9000); } } catch { /* */ }
  if (window.Nuvem) window.Nuvem.aoMudar(() => { if (document.body.classList.contains('est-aberto') && !apresentando()) { const p = $('[data-nuvem]', painel); if (p) { const y = $('.est-corpo', painel).scrollTop; montar(); $('.est-corpo', painel).scrollTop = y; } } });

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
    else if (d.togglePrevia !== undefined) { previaAberta = !previaAberta; atualizarPrevia(); }
    else if (d.apresentar !== undefined) apresentar(true);
    else if (d.cena) { mudar({ cena: d.cena }, null, true); }
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
  });

  async function salvarFechamento() {
    const V = C.visual;
    if (!rascunho.responsavel.trim() && !confirm('Salvar sem o nome do responsável?')) return;
    const doc = {
      loja: V.nome, responsavel: rascunho.responsavel.trim(), contato: (rascunho.contato || C.dados.loja.whats || '').trim(),
      plano: rascunho.plano, obs: rascunho.obs.trim(), produto: 'Catálogo digital', modelo: L.id, pasta: PASTA, ramo: L.ramo,
      // a configuração vai como texto: o Firestore não aceita listas dentro de listas (ex.: horários)
      cena: V.cena, partida: V.partida || '', cores: V.cores, logo: V.logo || '', sigla: V.sigla || '', config: JSON.stringify(C.configAtual())
    };
    try {
      const r = await window.Nuvem.salvarFechamento(doc);
      rascunho = { responsavel: '', contato: '', plano: PLANOS[0], obs: '' };
      montar();
      aviso(r === 'enviado' ? `Fechamento de ${V.nome} salvo na sua área` : 'Fechamento guardado neste aparelho. Sobe quando tiver internet e login.', r === 'enviado' ? 'check' : 'info');
    } catch { aviso('Sem espaço neste aparelho. Tente uma foto menor do logo.', 'info'); }
  }
})();
