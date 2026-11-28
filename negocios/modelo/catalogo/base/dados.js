/* Catálogo digital · Studio Magalhães
   Dados da loja (catálogo, funcionamento) e pedidos.
   Nesta versão de demonstração tudo fica no navegador (localStorage).
   Na versão das lojas de verdade, estas mesmas funções conversam com o servidor. */
window.Catalogo = (() => {
  'use strict';
  const LOJA = window.LOJA;
  const chave = 'sm-catalogo:' + LOJA.id;
  const copia = o => JSON.parse(JSON.stringify(o));
  const ler = (k, padrao) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : padrao; } catch { return padrao; } };
  const gravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };

  let dados = ler(chave + ':dados', null) || copia(LOJA.dados);
  const ouvintes = [];

  const FONTES_CAT = {
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

  /* ---------- Visual (nome, cores, logo, fonte, textos, animação) ----------
     Na demonstração, o Studio ajusta o visual pelo painel antes de visitar a loja.
     O que não foi mudado vem do modelo (LOJA.visual e LOJA.textos). */
  let ajusteVisual = ler(chave + ':visual', {});
  const visual = () => {
    const a = ajusteVisual.visual || {};
    return { ...LOJA.visual, ...a, cores: { ...LOJA.visual.cores, ...(a.cores || {}) }, fontes: { ...LOJA.visual.fontes, ...(a.fontes || {}) } };
  };
  const textos = () => ({ ...LOJA.textos, ...(ajusteVisual.textos || {}) });
  function definirVisual(v, t) {
    ajusteVisual = { visual: { ...(ajusteVisual.visual || {}), ...(v || {}) }, textos: { ...(ajusteVisual.textos || {}), ...(t || {}) } };
    const ok = gravar(chave + ':visual', ajusteVisual);
    ouvintes.forEach(f => f('visual'));
    return ok;
  }
  function limparVisual() { ajusteVisual = {}; try { localStorage.removeItem(chave + ':visual'); } catch { /* */ } ouvintes.forEach(f => f('visual')); }
  /** Expande formato compacto (v2) ou legado de amostra para { visual, textos }. */
  function expandirAmostra(am) {
    if (!am || typeof am !== 'object') return null;
    if (am.visual || am.textos) return { visual: am.visual || {}, textos: am.textos || {} };
    const v = {};
    if (am.n) v.nome = am.n;
    if (am.s) v.segmento = am.s;
    if (am.sg) v.sigla = am.sg;
    if (Array.isArray(am.c) && am.c.length >= 2) v.cores = { p: am.c[0], d: am.c[1], escuro: am.c[2] || LOJA.visual.cores.escuro, fundo: am.c[3] || LOJA.visual.cores.fundo };
    if (typeof am.f === 'string' && FONTES_CAT[am.f]) v.fontes = { t: FONTES_CAT[am.f].t, c: FONTES_CAT[am.f].c };
    else if (Array.isArray(am.f) && am.f.length === 2) v.fontes = { t: am.f[0], c: am.f[1] };
    if (am.cn) v.cena = am.cn;
    if (am.eh) v.estiloHero = am.eh;
    if (am.fh) v.fundoHero = am.fh;
    if (am.g) v.grade = am.g;
    if (am.ct) v.cantos = am.ct;
    if (am.tp) v.topoEstilo = am.tp;
    if (am.em) v.entregaModo = am.em;
    if (am.cp) v.cepOrigem = am.cp;
    if (am.po) v.pagOnline = am.po;
    if (am.df) v.demoFechada = true;
    if (am.lg) v.logo = am.lg;
    const t = {};
    if (am.tx && typeof am.tx === 'object') {
      if (am.tx.s) t.selo = am.tx.s;
      if (am.tx.t) t.titulo = am.tx.t;
      if (am.tx.b) t.sub = am.tx.b;
      if (am.tx.bt) t.botao = am.tx.bt;
    }
    return { visual: v, textos: t };
  }
  /** Aplica uma prévia de amostra recebida por link (?amostra=... ou #amostra=...) só na memória, sem mexer nos dados salvos nem permitir envio real ao WhatsApp. */
  function aplicarAmostra(am, silencioso = false) {
    const exp = expandirAmostra(am);
    if (!exp) return false;
    ajusteVisual = exp;
    dados.loja.whats = '';
    if (!silencioso) {
      ouvintes.forEach(f => f('visual'));
      ouvintes.forEach(f => f('dados'));
    }
    return true;
  }
  const ajustado = () => !!(ajusteVisual.visual && ajusteVisual.visual.nome);

  const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const dinheiro = v => moeda.format(Math.round((+v || 0) * 100) / 100);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const novoId = p => p + '-' + Math.random().toString(36).slice(2, 8);

  /* ---------- Funcionamento ---------- */
  const DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const minutos = h => { const [a, b] = String(h || '0:0').split(':').map(Number); return a * 60 + (b || 0); };
  const hora = h => { const [a, b] = String(h).split(':'); return b && b !== '00' ? `${+a}h${b}` : `${+a}h`; };
  /** Diz se a loja está aberta agora e quando abre ou fecha. */
  function situacao(agora = new Date()) {
    const l = dados.loja;
    const v = visual();
    if (l.fechadaAgora || v.demoFechada) return { aberta: false, texto: 'Fechado agora', detalhe: l.avisoFechada || 'Voltamos em breve.' };
    if (LOJA.demo) return { aberta: true, texto: 'Aberto agora', detalhe: 'pronto para pedidos' };
    const dia = agora.getDay(), m = agora.getHours() * 60 + agora.getMinutes();
    for (const [de, ate] of l.horario[dia] || []) {
      const a = minutos(de), b = minutos(ate);
      if (b > a ? (m >= a && m < b) : (m >= a || m < b)) return { aberta: true, texto: 'Aberto agora', detalhe: `até ${hora(ate)}` };
    }
    // ainda hoje, mais tarde?
    for (const [de] of l.horario[dia] || []) if (minutos(de) > m) return { aberta: false, texto: 'Fechado agora', detalhe: `abre hoje às ${hora(de)}` };
    for (let i = 1; i <= 7; i++) {
      const d = (dia + i) % 7, f = (l.horario[d] || [])[0];
      if (f) return { aberta: false, texto: 'Fechado agora', detalhe: `abre ${i === 1 ? 'amanhã' : DIAS[d].toLowerCase()} às ${hora(f[0])}` };
    }
    return { aberta: false, texto: 'Fechado', detalhe: '' };
  }

  /* ---------- Catálogo ---------- */
  const produto = id => dados.produtos.find(p => p.id === id);
  const grupo = id => dados.grupos.find(g => g.id === id);
  const categoria = id => dados.categorias.find(c => c.id === id);

  /** Preço de um item do carrinho: base + opções; no meio a meio vale o sabor mais caro. */
  function precoItem(item) {
    const p = produto(item.produto); if (!p) return 0;
    let base = p.preco;
    if (item.meio) { const outro = produto(item.meio); if (outro) base = Math.max(base, outro.preco); }
    let extra = 0;
    for (const [gid, escolhas] of Object.entries(item.escolhas || {})) {
      const g = grupo(gid); if (!g) continue;
      for (const i of escolhas) extra += +(g.itens[i]?.preco || 0);
    }
    return base + extra;
  }
  const dataBR = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '')); return m ? `${m[3]}/${m[2]}/${m[1]}` : String(s || ''); };
  /** Linhas de detalhe de um item (para o carrinho e para a mensagem). */
  function detalhes(item) {
    const p = produto(item.produto), out = [];
    if (!p) return out;
    for (const gid of p.grupos || []) {
      const g = grupo(gid); if (!g) continue;
      if (g.tipo === 'meio') { if (item.meio) out.push(`${g.nome}: ${produto(item.meio)?.nome || ''}`); continue; }
      if (g.tipo === 'texto' || g.tipo === 'data') {
        const val = String((item.campos || {})[gid] || '').trim();
        if (val) out.push(`${g.nome}: ${g.tipo === 'data' ? dataBR(val) : val}`);
        continue;
      }
      const esc = (item.escolhas || {})[gid] || [];
      if (esc.length) out.push(`${g.nome}: ${esc.map(i => g.itens[i]?.nome).filter(Boolean).join(', ')}`);
    }
    if (item.obs) out.push(`Obs.: ${item.obs}`);
    return out;
  }
  const precoMinimo = p => {
    let v = p.preco;
    for (const gid of p.grupos || []) { const g = grupo(gid); if (g && g.tipo === 'um' && g.obrig) v += Math.min(...g.itens.map(i => +i.preco || 0)); }
    return v;
  };

  /* ---------- Salvar ---------- */
  function salvar() {
    const ok = gravar(chave + ':dados', dados);
    ouvintes.forEach(f => f('dados'));
    return ok;
  }
  function restaurar() { dados = copia(LOJA.dados); localStorage.removeItem(chave + ':dados'); ouvintes.forEach(f => f('dados')); }
  window.addEventListener('storage', e => {
    if (!e.key || !e.key.startsWith(chave)) return;
    if (e.key === chave + ':dados') dados = ler(chave + ':dados', null) || copia(LOJA.dados);
    if (e.key === chave + ':visual') { ajusteVisual = ler(chave + ':visual', {}); ouvintes.forEach(f => f('visual')); return; }
    ouvintes.forEach(f => f(e.key.endsWith(':pedidos') ? 'pedidos' : 'dados'));
  });

  /** Ponto de partida (ex.: pizzaria ou hamburgueria): volta o cardápio do modelo e tira as categorias que não servem. */
  function aplicarPartida(id) {
    const p = (LOJA.partidas || {})[id]; if (!p) return;
    const whats = dados.loja.whats;
    dados = copia(LOJA.dados);
    dados.loja.whats = whats;
    const tirar = new Set(p.tirar || []);
    dados.categorias = dados.categorias.filter(c => !tirar.has(c.id));
    dados.produtos = dados.produtos.filter(x => !tirar.has(x.cat));
    // tira dos produtos as opções que só serviam para o que saiu (ex.: meio a meio)
    gravar(chave + ':dados', dados);
    definirVisual({ cena: p.cena, partida: id, ...(p.segmento ? { segmento: p.segmento } : {}) }, p.textos || {});
    ouvintes.forEach(f => f('dados'));
  }

  /* ---------- Visuais guardados por cliente (para chegar com o site pronto) ---------- */
  const clientes = () => ler(chave + ':clientes', []);
  function guardarCliente(nome) {
    const lista = clientes();
    const item = { nome, quando: new Date().toISOString(), ajuste: copia(ajusteVisual), dados: copia(dados) };
    const i = lista.findIndex(c => c.nome.toLowerCase() === nome.toLowerCase());
    if (i >= 0) lista[i] = item; else lista.unshift(item);
    return gravar(chave + ':clientes', lista.slice(0, 40));
  }
  function abrirCliente(i) {
    const c = clientes()[i]; if (!c) return false;
    ajusteVisual = c.ajuste || {}; dados = c.dados || copia(LOJA.dados);
    gravar(chave + ':visual', ajusteVisual); gravar(chave + ':dados', dados);
    ouvintes.forEach(f => f('visual')); ouvintes.forEach(f => f('dados'));
    return true;
  }
  function apagarCliente(i) { const l = clientes(); l.splice(i, 1); gravar(chave + ':clientes', l); }

  /* ---------- Configuração completa (para guardar no fechamento e reabrir depois) ---------- */
  const semFotosPesadas = d => { const c = copia(d); c.produtos.forEach(p => { if (String(p.foto || '').startsWith('data:') && p.foto.length > 150000) p.foto = ''; }); return c; };
  const configAtual = () => ({ modelo: LOJA.id, ajuste: copia(ajusteVisual), dados: semFotosPesadas(dados) });
  function aplicarConfig(cfg) {
    if (!cfg || cfg.modelo !== LOJA.id) return false;
    ajusteVisual = cfg.ajuste || {}; dados = cfg.dados || copia(LOJA.dados);
    gravar(chave + ':visual', ajusteVisual); gravar(chave + ':dados', dados);
    ouvintes.forEach(f => f('visual')); ouvintes.forEach(f => f('dados'));
    return true;
  }
  const codificar = o => 'v2-' + btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/=+$/, '').replace(/\+/g, '-1').replace(/\//g, '-2');
  const decodificar = t => {
    try {
      const limpo = String(t || '').trim().split(/[\s&#]/)[0];
      let s = limpo.startsWith('v2-')
        ? limpo.slice(3).replace(/-1/g, '+').replace(/-2/g, '/')
        : limpo.replace(/-/g, '+').replace(/[_.]/g, '/');
      while (s.length % 4) s += '=';
      return JSON.parse(decodeURIComponent(escape(atob(s))));
    } catch { return null; }
  };

  /* Aplica a amostra imediatamente no boot (antes de vitrine.js e admin.js), evitando qualquer flash do modelo padrão */
  const rawAmostraBoot = new URLSearchParams(location.search).get('amostra')
    || (location.hash.startsWith('#amostra=') ? location.hash.slice(9) : '');
  const modoAmostra = !!(rawAmostraBoot || location.hash.startsWith('#amostra') || /[?&]amostra\b/.test(location.search));
  const linkParamAmostra = rawAmostraBoot ? `?amostra=${rawAmostraBoot}` : (modoAmostra ? '?amostra=1' : '');
  if (rawAmostraBoot) {
    const amBoot = decodificar(rawAmostraBoot);
    if (amBoot) aplicarAmostra(amBoot, true);
  }

  /* ---------- Pedidos ---------- */
  const pedidos = () => ler(chave + ':pedidos', []);
  const salvarPedidos = lista => { const ok = gravar(chave + ':pedidos', lista); ouvintes.forEach(f => f('pedidos')); return ok; };
  function registrarPedido(p) {
    const lista = pedidos();
    p.numero = (lista.reduce((m, x) => Math.max(m, x.numero || 0), 0) || 0) + 1;
    p.quando = p.quando || new Date().toISOString();
    p.status = p.status || 'novo';
    lista.unshift(p);
    salvarPedidos(lista.slice(0, 2000));
    return p;
  }

  return {
    LOJA, FONTES: FONTES_CAT, modoAmostra, linkParamAmostra, get dados() { return dados }, salvar, restaurar,
    get visual() { return visual(); }, get textos() { return textos(); }, definirVisual, limparVisual, aplicarAmostra, ajustado, aplicarPartida,
    clientes, guardarCliente, abrirCliente, apagarCliente, configAtual, aplicarConfig, codificar, decodificar,
    situacao, DIAS, hora, produto, grupo, categoria, precoItem, detalhes, precoMinimo,
    pedidos, salvarPedidos, registrarPedido,
    dinheiro, esc, novoId, copia,
    aoMudar: f => ouvintes.push(f)
  };
})();
