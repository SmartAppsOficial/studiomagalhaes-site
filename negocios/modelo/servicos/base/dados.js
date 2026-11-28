/* Site de Serviços · Studio Magalhães
   Dados do negócio (serviços, profissionais, galeria, depoimentos, FAQ, funcionamento) e agendamentos/orçamentos.
   Na demonstração tudo fica no navegador (localStorage). Na versão de produção, conversa com o servidor Cloudflare + D1. */
window.Servicos = (() => {
  'use strict';
  const NEG = window.NEGOCIO;
  const chave = 'sm-servicos:' + NEG.id;
  const copia = o => JSON.parse(JSON.stringify(o));
  const ler = (k, padrao) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : padrao; } catch { return padrao; } };
  const gravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };

  let dados = ler(chave + ':dados', null) || copia(NEG.dados);
  const ouvintes = [];

  const FONTES_SERV = {
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

  let ajusteVisual = ler(chave + ':visual', {});
  const visual = () => {
    const a = ajusteVisual.visual || {};
    return {
      ...NEG.visual, ...a,
      cores: { ...NEG.visual.cores, ...(a.cores || {}) },
      fontes: { ...NEG.visual.fontes, ...(a.fontes || {}) }
    };
  };
  const textos = () => ({ ...NEG.textos, ...(ajusteVisual.textos || {}) });
  function definirVisual(v, t) {
    ajusteVisual = { visual: { ...(ajusteVisual.visual || {}), ...(v || {}) }, textos: { ...(ajusteVisual.textos || {}), ...(t || {}) } };
    const ok = gravar(chave + ':visual', ajusteVisual);
    ouvintes.forEach(f => f('visual'));
    return ok;
  }
  function limparVisual() { ajusteVisual = {}; try { localStorage.removeItem(chave + ':visual'); } catch { /* */ } ouvintes.forEach(f => f('visual')); }

  function expandirAmostra(am) {
    if (!am || typeof am !== 'object') return null;
    if (am.visual || am.textos) return { visual: am.visual || {}, textos: am.textos || {} };
    const v = {};
    if (am.n) v.nome = am.n;
    if (am.s) v.segmento = am.s;
    if (am.sg) v.sigla = am.sg;
    if (Array.isArray(am.c) && am.c.length >= 2) v.cores = { p: am.c[0], d: am.c[1], escuro: am.c[2] || NEG.visual.cores.escuro, fundo: am.c[3] || NEG.visual.cores.fundo };
    if (typeof am.f === 'string' && FONTES_SERV[am.f]) v.fontes = { t: FONTES_SERV[am.f].t, c: FONTES_SERV[am.f].c };
    else if (Array.isArray(am.f) && am.f.length === 2) v.fontes = { t: am.f[0], c: am.f[1] };
    if (am.cn) v.cena = am.cn;
    if (am.eh) v.estiloHero = am.eh;
    if (am.fh) v.fundoHero = am.fh;
    if (am.g) v.grade = am.g;
    if (am.ct) v.cantos = am.ct;
    if (am.tp) v.topoEstilo = am.tp;
    if (am.am) v.atendimentoModo = am.am;
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
  function aplicarAmostra(am, silencioso = false) {
    const exp = expandirAmostra(am);
    if (!exp) return false;
    ajusteVisual = exp;
    dados.negocio.whats = '';
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

  const DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const minutos = h => { const [a, b] = String(h || '0:0').split(':').map(Number); return a * 60 + (b || 0); };
  const hora = h => { const [a, b] = String(h).split(':'); return b && b !== '00' ? `${+a}h${b}` : `${+a}h`; };
  function situacao(agora = new Date()) {
    const l = dados.negocio, v = visual();
    if (l.fechadaAgora || v.demoFechada) return { aberta: false, texto: 'Agenda pausada', detalhe: l.avisoFechada || 'Voltamos em breve.' };
    if (NEG.demo) return { aberta: true, texto: 'Atendendo agora', detalhe: NEG.fluxo === 'orcamento' ? 'orçamentos abertos' : 'agenda aberta' };
    const dia = agora.getDay(), m = agora.getHours() * 60 + agora.getMinutes();
    for (const [de, ate] of l.horario[dia] || []) {
      const a = minutos(de), b = minutos(ate);
      if (b > a ? (m >= a && m < b) : (m >= a || m < b)) return { aberta: true, texto: 'Atendendo agora', detalhe: `até ${hora(ate)}` };
    }
    for (const [de] of l.horario[dia] || []) if (minutos(de) > m) return { aberta: false, texto: 'Fechado agora', detalhe: `abre hoje às ${hora(de)}` };
    for (let i = 1; i <= 7; i++) {
      const d = (dia + i) % 7, f = (l.horario[d] || [])[0];
      if (f) return { aberta: false, texto: 'Fechado agora', detalhe: `abre ${i === 1 ? 'amanhã' : DIAS[d].toLowerCase()} às ${hora(f[0])}` };
    }
    return { aberta: false, texto: 'Fechado', detalhe: '' };
  }

  const servico = id => dados.servicos.find(s => s.id === id);
  const categoria = id => dados.categorias.find(c => c.id === id);
  const duracaoTxt = m => {
    const n = +m || 0;
    if (!n) return '';
    if (n < 60) return `${n} min`;
    const h = Math.floor(n / 60), r = n % 60;
    return r ? `${h}h ${r}min` : `${h}h`;
  };
  const precoTxt = s => {
    if (!s || s.precoTipo === 'orcamento' || !(+s.preco > 0)) return 'Sob orçamento';
    if (s.precoTipo === 'apartir') return `<small>a partir de</small>${dinheiro(s.preco)}`;
    return dinheiro(s.preco);
  };
  const precoPlanoTxt = s => {
    if (!s || s.precoTipo === 'orcamento' || !(+s.preco > 0)) return 'Sob orçamento';
    return (s.precoTipo === 'apartir' ? 'a partir de ' : '') + dinheiro(s.preco);
  };

  function salvar() {
    const ok = gravar(chave + ':dados', dados);
    ouvintes.forEach(f => f('dados'));
    return ok;
  }
  function restaurar() { dados = copia(NEG.dados); localStorage.removeItem(chave + ':dados'); ouvintes.forEach(f => f('dados')); }
  window.addEventListener('storage', e => {
    if (!e.key || !e.key.startsWith(chave)) return;
    if (e.key === chave + ':dados') dados = ler(chave + ':dados', null) || copia(NEG.dados);
    if (e.key === chave + ':visual') { ajusteVisual = ler(chave + ':visual', {}); ouvintes.forEach(f => f('visual')); return; }
    ouvintes.forEach(f => f(e.key.endsWith(':solicitacoes') ? 'solicitacoes' : 'dados'));
  });

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
    ajusteVisual = c.ajuste || {}; dados = c.dados || copia(NEG.dados);
    gravar(chave + ':visual', ajusteVisual); gravar(chave + ':dados', dados);
    ouvintes.forEach(f => f('visual')); ouvintes.forEach(f => f('dados'));
    return true;
  }
  function apagarCliente(i) { const l = clientes(); l.splice(i, 1); gravar(chave + ':clientes', l); }

  const semFotosPesadas = d => {
    const c = copia(d);
    (c.servicos || []).forEach(p => { if (String(p.foto || '').startsWith('data:') && p.foto.length > 150000) p.foto = ''; });
    (c.galeria || []).forEach(g => { if (String(g.foto || '').startsWith('data:') && g.foto.length > 150000) g.foto = ''; });
    return c;
  };
  const configAtual = () => ({ modelo: NEG.id, familia: 'servicos', ajuste: copia(ajusteVisual), dados: semFotosPesadas(dados) });
  function aplicarConfig(cfg) {
    if (!cfg || cfg.modelo !== NEG.id) return false;
    ajusteVisual = cfg.ajuste || {}; dados = cfg.dados || copia(NEG.dados);
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

  const rawAmostraBoot = new URLSearchParams(location.search).get('amostra')
    || (location.hash.startsWith('#amostra=') ? location.hash.slice(9) : '');
  const modoAmostra = !!(rawAmostraBoot || location.hash.startsWith('#amostra') || /[?&]amostra\b/.test(location.search));
  const linkParamAmostra = rawAmostraBoot ? `?amostra=${rawAmostraBoot}` : (modoAmostra ? '?amostra=1' : '');
  if (rawAmostraBoot) {
    const amBoot = decodificar(rawAmostraBoot);
    if (amBoot) aplicarAmostra(amBoot, true);
  }

  const solicitacoes = () => ler(chave + ':solicitacoes', []);
  const salvarSolicitacoes = lista => { const ok = gravar(chave + ':solicitacoes', lista); ouvintes.forEach(f => f('solicitacoes')); return ok; };
  function registrarSolicitacao(p) {
    const lista = solicitacoes();
    p.numero = (lista.reduce((m, x) => Math.max(m, x.numero || 0), 0) || 0) + 1;
    p.quando = p.quando || new Date().toISOString();
    p.status = p.status || 'novo';
    lista.unshift(p);
    salvarSolicitacoes(lista.slice(0, 2000));
    return p;
  }

  return {
    NEGOCIO: NEG, FONTES: FONTES_SERV, modoAmostra, linkParamAmostra,
    get dados() { return dados; }, salvar, restaurar,
    get visual() { return visual(); }, get textos() { return textos(); }, definirVisual, limparVisual, aplicarAmostra, ajustado,
    clientes, guardarCliente, abrirCliente, apagarCliente, configAtual, aplicarConfig, codificar, decodificar,
    situacao, DIAS, hora, servico, categoria, duracaoTxt, precoTxt, precoPlanoTxt,
    solicitacoes, salvarSolicitacoes, registrarSolicitacao,
    dinheiro, esc, novoId, copia,
    aoMudar: f => ouvintes.push(f)
  };
})();

/* Adaptador leve para cenas 3D em SVG dos 10 ramos de serviço (paralaxe 3D + respiração + elementos flutuantes). */
window.CENA_KIT = {
  mk(svg, soltos) {
    let s = String(svg || '').replace('<svg ', '<svg class="cena-lanche" aria-hidden="true" ');
    if (s.includes('</defs>')) {
      s = s.replace('</defs>', '</defs><g class="camada" style="--z:12"><g class="respira" style="--atraso:.15s">')
           .replace(/<\/svg>\s*$/, '</g></g></svg>');
    }
    return { principal: s, soltos: Array.isArray(soltos) ? soltos : [] };
  },
  f(s, x, y, _dur, p) {
    return { x, y, t: 44, p: p || 1.2, s };
  },
  spark(cor = 'var(--d)') {
    return `<svg viewBox="0 0 40 40"><path d="M20 2l4 14 14 4-14 4-4 14-4-14L2 20l14-4z" style="fill:${cor}"/></svg>`;
  },
  dot(cor = 'var(--p)', r = 14) {
    return `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="${Math.max(10, Math.min(20, r + 4))}" style="fill:${cor}" opacity=".9"/></svg>`;
  }
};
