/* Catálogo digital · área da loja: pedidos, produtos, categorias, opções,
   funcionamento, visual (só leitura) e manual.
   Demonstração: senha e dados ficam no navegador. Na versão das lojas de verdade,
   o login e os dados ficam no servidor. */
(() => {
  'use strict';
  const C = window.Catalogo, L = C.LOJA, V = C.visual, I = window.ICONES;
  const siglaHTML = () => V.logo ? `<img src="${esc(V.logo)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">` : esc(V.sigla);
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = C.esc, R = C.dinheiro, D = () => C.dados;
  const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || ''}</svg>`;
  const num = v => { const n = parseFloat(String(v).replace(/\s|R\$/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.')); return isNaN(n) ? 0 : Math.round(n * 100) / 100; };
  const preco = v => (+v || 0).toFixed(2).replace('.', ',');
  const raiz = document.documentElement.style;
  raiz.setProperty('--p', V.cores.p); raiz.setProperty('--escuro', V.cores.escuro);
  document.title = `Área da loja · ${V.nome}`;
  const SES = 'sm-catalogo:' + L.id + ':sessao';
  const el = $('#admin');

  /* ---------- Avisos e janelas ---------- */
  let salvoT;
  function salvo(msg = 'Alterações salvas', icone = 'check') {
    let s = $('.salvo'); if (!s) { s = document.createElement('div'); s.className = 'salvo'; s.setAttribute('role', 'status'); document.body.appendChild(s); }
    s.innerHTML = ic(icone) + esc(msg); s.hidden = false;
    clearTimeout(salvoT); salvoT = setTimeout(() => { s.hidden = true; }, 2200);
  }
  function salvar(msg) {
    if (C.salvar()) salvo(msg);
    else salvo('Sem espaço neste navegador. Use fotos menores.', 'info');
  }
  let salvarT;
  const salvarDepois = () => { clearTimeout(salvarT); salvarT = setTimeout(() => salvar(), 500); };
  function janela(titulo, corpo, pe) {
    const f = document.createElement('div'); f.className = 'janela-fundo';
    f.innerHTML = `<div class="janela" role="dialog" aria-modal="true" aria-label="${esc(titulo)}"><div class="janela-cab"><h2>${esc(titulo)}</h2>
      <button type="button" class="btn btn-ic" data-fechar aria-label="Fechar">${ic('x')}</button></div><div class="janela-corpo">${corpo}</div>${pe ? `<div class="janela-pe">${pe}</div>` : ''}</div>`;
    document.body.appendChild(f);
    const fechar = () => { f.remove(); document.removeEventListener('keydown', tecla); };
    const tecla = e => { if (e.key === 'Escape') fechar(); };
    document.addEventListener('keydown', tecla);
    f.addEventListener('click', e => { if (e.target === f || e.target.closest('[data-fechar]')) fechar(); });
    return { el: f, fechar };
  }

  /* ---------- Equipe: o dono e os funcionários ----------
     O dono entra com a senha dele e vê tudo. Cada funcionário entra com o próprio nome e PIN,
     e só vê e muda o que o dono liberou (aba Equipe). Na versão de verdade, quem confere
     senha e permissões é o servidor; aqui, na demonstração, é o navegador. */
  const PERMISSOES = [
    ['pedidos', 'Ver os pedidos', 'Lista de pedidos que chegam pelo site.'],
    ['situacao', 'Mudar a situação dos pedidos', 'Confirmar, marcar como entregue ou cancelar.'],
    ['valores', 'Ver os totais do dia e do mês', 'Soma dos pedidos, produtos mais pedidos e planilha.'],
    ['esgotado', 'Marcar produto esgotado ou disponível', 'O botão rápido da lista de produtos.'],
    ['produtos', 'Editar produtos', 'Nome, descrição, preço, foto, destaque e ordem.'],
    ['criar', 'Criar e excluir produtos', ''],
    ['cardapio', 'Categorias e opções', 'Tamanhos, adicionais, bordas e categorias.'],
    ['funcionamento', 'Funcionamento da loja', 'Abrir e fechar a loja, horário, entrega e pagamento.']
  ];
  const equipe = () => (D().equipe ||= []);
  const lerSessao = () => { try { return JSON.parse(sessionStorage.getItem(SES) || 'null'); } catch { return null; } };
  let sessao = lerSessao();
  const quem = () => !sessao ? null : sessao.quem === 'dono' ? { dono: true, nome: 'Dono' } : equipe().find(f => f.id === sessao.quem && f.ativo !== false) || null;
  const entrou = () => !!quem();
  const pode = p => { const q = quem(); return !!q && (q.dono || !!(q.permissoes || {})[p]); };

  /* ---------- Entrar ---------- */
  let escolhido = 'dono';
  function telaEntrar(erro = '') {
    const ativos = equipe().filter(f => f.ativo !== false);
    if (escolhido !== 'dono' && !ativos.some(f => f.id === escolhido)) escolhido = 'dono';
    const ehDono = escolhido === 'dono';
    el.innerHTML = `<div class="entrar"><form class="entrar-cartao" data-entrar>
      <div class="sigla">${siglaHTML()}</div><h1>${esc(V.nome)}</h1><p>Área da loja</p>
      ${ativos.length ? `<div class="quem" role="group" aria-label="Quem vai entrar">
        <button type="button" data-quem="dono" aria-pressed="${ehDono}">${ic('cadeado')}Dono</button>
        ${ativos.map(f => `<button type="button" data-quem="${esc(f.id)}" aria-pressed="${escolhido === f.id}">${ic('grupo')}${esc(f.nome)}</button>`).join('')}</div>` : ''}
      <label class="campo" style="text-align:left"><span>${ehDono ? 'Senha do dono' : 'PIN de ' + esc(ativos.find(f => f.id === escolhido).nome)}</span>
        <input class="entrada" type="password" name="senha" ${ehDono ? 'autocomplete="current-password"' : 'inputmode="numeric" autocomplete="off"'} required autofocus></label>
      ${erro ? `<p style="color:#a3271a;margin:0 0 10px">${esc(erro)}</p>` : ''}
      <button class="btn btn-p" style="width:100%">${ic('cadeado')}Entrar</button>
      ${L.demo ? `<div class="dica-demo">Demonstração: senha do dono <b>${esc(L.senhaDemo)}</b>${ativos.length ? ' · PIN dos funcionários de exemplo <b>1111</b>' : ''}</div>` : ''}
      <p style="margin:16px 0 0;font-size:.85rem"><a href="index.html">Voltar para a loja</a></p>
    </form></div>`;
    const f = $('[data-entrar]');
    f.addEventListener('click', e => { const b = e.target.closest('[data-quem]'); if (b) { escolhido = b.dataset.quem; telaEntrar(); } });
    f.addEventListener('submit', e => {
      e.preventDefault();
      const v = e.target.senha.value, func = equipe().find(x => x.id === escolhido);
      const ok = escolhido === 'dono' ? v === L.senhaDemo : func && func.ativo !== false && v === func.pin;
      if (!ok) { telaEntrar(escolhido === 'dono' ? 'Senha incorreta.' : 'PIN incorreto.'); return; }
      sessao = { quem: escolhido }; try { sessionStorage.setItem(SES, JSON.stringify(sessao)); } catch { /* */ }
      aba = abasPermitidas()[0][0]; montar();
    });
  }

  /* ---------- Estrutura ---------- */
  const NAV = [['pedidos', 'lista', 'Pedidos', () => pode('pedidos')], ['produtos', 'sacola', 'Produtos', () => pode('esgotado') || pode('produtos') || pode('criar')],
    ['categorias', 'tag', 'Categorias', () => pode('cardapio')], ['opcoes', 'ajustes', 'Opções', () => pode('cardapio')],
    ['loja', 'loja', 'Funcionamento', () => pode('funcionamento')], ['equipe', 'grupo', 'Equipe', () => !!quem()?.dono],
    ['visual', 'paleta', 'Visual', () => !!quem()?.dono], ['manual', 'livro', 'Manual', () => true]];
  const abasPermitidas = () => NAV.filter(n => n[3]());
  let aba = NAV.some(n => n[0] === location.hash.slice(1)) ? location.hash.slice(1) : 'pedidos';
  function montar() {
    const q = quem();
    if (!abasPermitidas().some(n => n[0] === aba)) aba = abasPermitidas()[0][0];
    el.innerHTML = `<div class="app">
      <aside class="lado"><div class="lado-marca"><span class="sigla">${siglaHTML()}</span><div><b>${esc(V.nome)}</b><small>${q.dono ? 'Dono' : esc(q.nome) + ' · funcionário'}</small></div></div>
        ${abasPermitidas().map(([id, icn, n]) => `<button type="button" class="nav-item" data-aba="${id}">${ic(icn)}<span class="txt">${n}</span>${id === 'pedidos' ? '<span class="num" data-novos hidden></span>' : ''}</button>`).join('')}
        <div class="lado-pe"><a class="nav-item" href="index.html" target="_blank" rel="noopener">${ic('olho')}<span class="txt">Ver minha loja</span></a>
          <button type="button" class="nav-item" data-sair>${ic('sair')}<span class="txt">Sair</span></button>
          <small>Catálogo digital · Studio Magalhães</small></div></aside>
      <main class="principal" data-principal></main></div>`;
    $('.lado').addEventListener('click', e => {
      const b = e.target.closest('[data-aba]'); if (b) { aba = b.dataset.aba; history.replaceState(null, '', '#' + aba); render(); window.scrollTo(0, 0); }
      if (e.target.closest('[data-sair]')) { sessao = null; try { sessionStorage.removeItem(SES); } catch { /* */ } telaEntrar(); }
    });
    render();
  }
  function render() {
    if (!entrou()) { telaEntrar(); return; }
    $$('[data-aba]').forEach(b => b.setAttribute('aria-current', String(b.dataset.aba === aba)));
    const novos = C.pedidos().filter(p => p.status === 'novo').length, n = $('[data-novos]');
    if (n) { n.hidden = !novos; n.textContent = novos; }
    ({ pedidos, produtos, categorias, opcoes, loja, equipeTela, visual, manual })[aba === 'equipe' ? 'equipeTela' : aba]();
  }
  const P = () => $('[data-principal]');
  const cab = (t, sub, acoes = '') => `<div class="cab"><div><h1>${t}</h1>${sub ? `<p>${sub}</p>` : ''}</div><div style="display:flex;gap:8px;flex-wrap:wrap">${acoes}</div></div>`;

  /* ============================================================
     Pedidos
     ============================================================ */
  let periodo = 'hoje', filtroStatus = 'todos';
  const STATUS = { novo: 'Novo', confirmado: 'Confirmado', entregue: 'Entregue', cancelado: 'Cancelado' };
  const inicioDe = qual => { const d = new Date(); d.setHours(0, 0, 0, 0); if (qual === '7') d.setDate(d.getDate() - 6); if (qual === 'mes') d.setDate(1); return d; };
  const noPeriodo = (p, qual) => qual === 'tudo' || new Date(p.quando) >= inicioDe(qual);
  const quando = iso => {
    const d = new Date(iso), hoje = inicioDe('hoje'), ontem = new Date(hoje); ontem.setDate(ontem.getDate() - 1);
    const h = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return d >= hoje ? `hoje, ${h}` : d >= ontem ? `ontem, ${h}` : `${d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}, ${h}`;
  };
  function pedidos() {
    const todos = C.pedidos(), validos = todos.filter(p => p.status !== 'cancelado');
    const soma = l => l.reduce((s, p) => s + (+p.total || 0), 0);
    const hoje = validos.filter(p => noPeriodo(p, 'hoje')), mes = validos.filter(p => noPeriodo(p, 'mes'));
    const contagem = {}; mes.forEach(p => p.itens.forEach(i => { contagem[i.nome] = (contagem[i.nome] || 0) + i.qtd; }));
    const top = Object.entries(contagem).sort((a, b) => b[1] - a[1]).slice(0, 5), maior = top[0]?.[1] || 1;
    const lista = todos.filter(p => noPeriodo(p, periodo) && (filtroStatus === 'todos' || p.status === filtroStatus));
    P().innerHTML = cab('Pedidos', 'Cada pedido enviado pelo WhatsApp aparece aqui.',
      (pode('valores') ? `<button type="button" class="btn btn-peq" data-csv>${ic('baixar')}Baixar planilha</button>` : '') + (L.demo && quem().dono ? `<button type="button" class="btn btn-peq" data-exemplos>${ic('brilho')}Criar pedidos de exemplo</button>` : '')) +
    (pode('valores') ? `<div class="aviso-pedidos">${ic('info')}<div><b>Importante:</b> estes números somam os <b>pedidos que os clientes enviaram</b> pelo WhatsApp. <b>Não é o dinheiro que entrou no caixa</b>: o pagamento é combinado direto com o cliente, e um pedido pode ser alterado ou desistido na conversa. Pedidos marcados como cancelados não entram na soma.</div></div>
    <div class="numeros">
      <div class="numero"><small>Pedidos hoje</small><b>${hoje.length}</b><span>sem os cancelados</span></div>
      <div class="numero"><small>Valor dos pedidos hoje</small><b>${R(soma(hoje))}</b><span>pedido, não recebido</span></div>
      <div class="numero"><small>Pedidos no mês</small><b>${mes.length}</b><span>desde o dia 1º</span></div>
      <div class="numero"><small>Valor dos pedidos no mês</small><b>${R(soma(mes))}</b><span>pedido, não recebido</span></div>
    </div>
    ${top.length ? `<div class="cartao" style="margin-top:14px"><h2>Mais pedidos no mês</h2><p class="sub">Quantidade de cada item nos pedidos do mês.</p>
      <ul class="mais-pedidos">${top.map(([n, q]) => `<li><span>${esc(n)}</span><b>${q}</b><span class="barra-v"><i style="width:${Math.round(q / maior * 100)}%"></i></span></li>`).join('')}</ul></div>` : ''}` : '') + `
    <div class="barra-ferr">
      <div class="filtros" data-periodo>${[['hoje', 'Hoje'], ['7', '7 dias'], ['mes', 'Este mês'], ['tudo', 'Tudo']].map(([v, n]) => `<button type="button" data-v="${v}" aria-pressed="${periodo === v}">${n}</button>`).join('')}</div>
      <div class="filtros" data-filtro>${[['todos', 'Todos'], ...Object.entries(STATUS)].map(([v, n]) => `<button type="button" data-v="${v}" aria-pressed="${filtroStatus === v}">${n}${v === 'novo' ? ` (${todos.filter(p => p.status === 'novo').length})` : ''}</button>`).join('')}</div>
    </div>
    <div class="pedidos">${lista.length ? lista.map(p => `<article class="pedido" data-status="${esc(p.status)}">
      <div class="pedido-cab"><div><b>Pedido nº ${p.numero}</b> · <small>${quando(p.quando)}</small><br><small>${esc(p.nome)} · ${p.tipo === 'entrega' ? `Entrega · ${esc(p.bairro)}` : 'Retirada no local'}</small></div>
        <div style="text-align:right"><select class="status-sel" data-status-ped="${p.numero}" aria-label="Situação do pedido ${p.numero}"${pode('situacao') ? '' : ' disabled title="Peça ao dono para liberar"'}>${Object.entries(STATUS).map(([v, n]) => `<option value="${v}"${p.status === v ? ' selected' : ''}>${n}</option>`).join('')}</select>
          ${p.por ? `<br><small>${esc(STATUS[p.status])} por ${esc(p.por)}</small>` : ''}</div></div>
      <ul>${p.itens.map(i => `<li>${i.qtd}x ${esc(i.nome)} · ${R(i.total)}${i.detalhes.length ? `<small>${i.detalhes.map(esc).join(' · ')}</small>` : ''}</li>`).join('')}</ul>
      <div class="pedido-pe"><span>Total do pedido: <b>${R(p.total)}</b>${p.taxa ? ` (entrega ${R(p.taxa)})` : ''}</span><span>${esc(p.pagamento)}${p.troco ? ` · troco para R$ ${esc(p.troco)}` : ''}</span>
        ${p.endereco ? `<span>${esc(p.endereco)}</span>` : ''}${p.obs ? `<span>Obs.: ${esc(p.obs)}</span>` : ''}</div></article>`).join('')
      : `<p class="vazio">Nenhum pedido ${periodo === 'hoje' ? 'hoje' : 'neste período'}${filtroStatus !== 'todos' ? ' com essa situação' : ''}.</p>`}</div>
    ${L.demo && todos.length && quem().dono ? `<p style="margin-top:20px"><button type="button" class="btn btn-peq btn-perigo" data-apagar-pedidos>${ic('lixo')}Apagar todos os pedidos (demonstração)</button></p>` : ''}`;
  }
  function exemplos() {
    const prods = D().produtos.filter(p => !p.pausado), bairros = D().loja.entrega.bairros, pags = D().loja.pagamentos;
    const nomes = ['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa', 'Fábio', 'Gabi', 'Hugo', 'Iara', 'João', 'Lia', 'Marcos'];
    const lista = [];
    for (let i = 0; i < 26; i++) {
      const d = new Date(); d.setDate(d.getDate() - Math.floor(Math.random() * 20)); d.setHours(11 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60));
      if (i < 4) { const h = new Date(); d.setTime(h.getTime() - (i + 1) * 47 * 60000); }
      const itens = Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => { const p = prods[Math.floor(Math.random() * prods.length)], q = 1 + Math.floor(Math.random() * 2); return { nome: p.nome, qtd: q, detalhes: [], total: Math.round(C.precoMinimo(p) * q * 100) / 100, produto: p.id }; });
      const entrega = Math.random() < .7, b = bairros[Math.floor(Math.random() * bairros.length)];
      const sub = itens.reduce((s, x) => s + x.total, 0), taxa = entrega && b ? +b.taxa : 0;
      lista.push({ quando: d.toISOString(), itens, subtotal: sub, taxa, total: Math.round((sub + taxa) * 100) / 100, tipo: entrega ? 'entrega' : 'retirada', bairro: entrega && b ? b.nome : '',
        endereco: entrega ? 'Rua de exemplo, ' + (10 + i * 7) : '', nome: nomes[i % nomes.length] + ' (exemplo)', pagamento: pags[i % pags.length], troco: '', obs: '',
        status: i < 3 ? 'novo' : i < 5 ? 'confirmado' : Math.random() < .1 ? 'cancelado' : 'entregue' });
    }
    lista.sort((a, b) => new Date(a.quando) - new Date(b.quando)).forEach(p => C.registrarPedido(p));
    salvo('Pedidos de exemplo criados');
  }
  function baixarCSV() {
    const linhas = [['Número', 'Data', 'Hora', 'Cliente', 'Tipo', 'Bairro', 'Endereço', 'Pagamento', 'Situação', 'Itens', 'Subtotal', 'Entrega', 'Total do pedido']];
    C.pedidos().filter(p => noPeriodo(p, periodo)).forEach(p => { const d = new Date(p.quando);
      linhas.push([p.numero, d.toLocaleDateString('pt-BR'), d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), p.nome, p.tipo, p.bairro, p.endereco, p.pagamento, STATUS[p.status],
        p.itens.map(i => `${i.qtd}x ${i.nome}`).join(' + '), preco(p.subtotal), preco(p.taxa), preco(p.total)]); });
    const csv = '﻿' + linhas.map(l => l.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(';')).join('\r\n');
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })), download: `pedidos-${V.nome.toLowerCase().replace(/\W+/g, '-')}.csv` });
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  /* ============================================================
     Produtos
     ============================================================ */
  let busca = '', filtroCat = '';
  function produtos() {
    const ds = D(), b = busca.trim().toLowerCase();
    const cats = ds.categorias.filter(c => !filtroCat || c.id === filtroCat);
    const html = cats.map(c => {
      const ps = ds.produtos.filter(p => p.cat === c.id && (!b || (p.nome + ' ' + p.desc).toLowerCase().includes(b)));
      if (!ps.length) return b ? '' : `<div class="grupo-cat">${esc(c.nome)}</div><p class="vazio" style="padding:12px">Nenhum produto nesta categoria.</p>`;
      return `<div class="grupo-cat">${esc(c.nome)} · ${ps.length}</div><div class="linhas">${ps.map(p => `
        <div class="linha-prod${p.pausado ? ' apagado' : ''}">
          ${p.foto ? `<img src="${esc(p.foto)}" alt="">` : `<span class="sem-foto">${ic('imagem')}</span>`}
          <div style="min-width:0"><b>${esc(p.nome)}</b><small>${R(p.preco)}${p.pausado ? ' · escondido do site' : ''}</small></div>
          <div class="acoes">
            ${pode('esgotado') || pode('produtos') ? `<button type="button" class="tog tog-esgotado" data-tog="esgotado" data-id="${p.id}" aria-pressed="${!!p.esgotado}">${p.esgotado ? 'Esgotado' : 'Disponível'}</button>` : ''}
            ${pode('produtos') ? `<button type="button" class="tog tog-destaque" data-tog="destaque" data-id="${p.id}" aria-pressed="${!!p.destaque}">${ic('estrela')}Destaque</button>
            <button type="button" class="tog" data-tog="pausado" data-id="${p.id}" aria-pressed="${!!p.pausado}" title="${p.pausado ? 'Mostrar no site' : 'Esconder do site'}">${ic(p.pausado ? 'olhoFechado' : 'olho')}${p.pausado ? 'Escondido' : 'No site'}</button>
            <button type="button" class="btn btn-ic" data-mover="-1" data-id="${p.id}" aria-label="Subir">${ic('cima')}</button>
            <button type="button" class="btn btn-ic" data-mover="1" data-id="${p.id}" aria-label="Descer">${ic('baixo')}</button>
            <button type="button" class="btn btn-peq" data-editar="${p.id}">${ic('editar')}Editar</button>` : ''}
          </div></div>`).join('')}</div>`;
    }).join('');
    P().innerHTML = cab('Produtos', `${ds.produtos.length} produtos no cardápio.`, pode('criar') ? `<button type="button" class="btn btn-p" data-novo>${ic('mais')}Novo produto</button>` : '') +
      `<div class="barra-ferr"><input class="entrada" style="max-width:320px" type="search" data-busca placeholder="Buscar produto" value="${esc(busca)}">
        <select class="entrada" style="max-width:220px" data-filtro-cat><option value="">Todas as categorias</option>${ds.categorias.map(c => `<option value="${c.id}"${filtroCat === c.id ? ' selected' : ''}>${esc(c.nome)}</option>`).join('')}</select></div>
      ${html || '<p class="vazio">Nenhum produto encontrado.</p>'}`;
  }
  function moverProduto(id, passo) {
    const l = D().produtos, i = l.findIndex(p => p.id === id), cat = l[i].cat;
    let j = i + passo; while (j >= 0 && j < l.length && l[j].cat !== cat) j += passo;
    if (j < 0 || j >= l.length) return;
    [l[i], l[j]] = [l[j], l[i]]; salvar('Ordem salva'); produtos();
  }
  function reduzirFoto(arquivo) {
    return new Promise((ok, erro) => {
      const img = new Image(), url = URL.createObjectURL(arquivo);
      img.onload = () => { const max = 900, s = Math.min(1, max / Math.max(img.width, img.height));
        const c = Object.assign(document.createElement('canvas'), { width: Math.round(img.width * s), height: Math.round(img.height * s) });
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); ok(c.toDataURL('image/jpeg', .8)); };
      img.onerror = () => { URL.revokeObjectURL(url); erro(new Error('foto')); };
      img.src = url;
    });
  }
  function editarProduto(id) {
    const ds = D(), novo = !id;
    const p = novo ? { id: C.novoId('p'), nome: '', desc: '', preco: 0, cat: filtroCat || ds.categorias[0]?.id, foto: '', grupos: [], destaque: false, esgotado: false, pausado: false } : C.copia(C.produto(id));
    const j = janela(novo ? 'Novo produto' : 'Editar produto', `
      <div class="foto-edit">${p.foto ? `<img class="previa" src="${esc(p.foto)}" alt="" data-previa>` : `<span class="previa" data-previa>${ic('imagem')}</span>`}
        <div><label class="btn btn-peq">${ic('foto')}Escolher foto<input type="file" accept="image/*" data-foto hidden></label>
        ${p.foto ? `<button type="button" class="btn btn-peq btn-perigo" data-tirar-foto>Tirar foto</button>` : ''}
        <p style="color:var(--suave);font-size:.82rem;margin:8px 0 0">Foto quadrada fica melhor. A foto é diminuída automaticamente.</p></div></div>
      <label class="campo"><span>Nome</span><input class="entrada" data-c="nome" value="${esc(p.nome)}" maxlength="60" required></label>
      <label class="campo"><span>Descrição</span><textarea class="entrada" data-c="desc" maxlength="160">${esc(p.desc)}</textarea></label>
      <div class="lado2"><label class="campo"><span>Preço (R$)</span><input class="entrada" data-c="preco" inputmode="decimal" value="${preco(p.preco)}"></label>
        <label class="campo"><span>Categoria</span><select class="entrada" data-c="cat">${ds.categorias.map(c => `<option value="${c.id}"${c.id === p.cat ? ' selected' : ''}>${esc(c.nome)}</option>`).join('')}</select></label></div>
      <div class="campo"><span>Opções que o cliente escolhe</span><div class="checks">${ds.grupos.map(g => `<label><input type="checkbox" data-g="${g.id}"${(p.grupos || []).includes(g.id) ? ' checked' : ''}>${esc(g.nome)}
        <small>${g.tipo === 'meio' ? 'meio a meio' : g.itens.map(i => i.nome).slice(0, 3).join(', ') + (g.itens.length > 3 ? '…' : '')}</small></label>`).join('')}</div></div>
      <div style="display:flex;flex-wrap:wrap;gap:18px;margin-top:6px">
        <label class="chave"><input type="checkbox" data-c="destaque"${p.destaque ? ' checked' : ''}><span class="trilho"></span><span>Destaque</span></label>
        <label class="chave"><input type="checkbox" data-c="esgotado"${p.esgotado ? ' checked' : ''}><span class="trilho"></span><span>Esgotado</span></label>
        <label class="chave"><input type="checkbox" data-c="visivel"${!p.pausado ? ' checked' : ''}><span class="trilho"></span><span>Aparece no site</span></label></div>`,
      `<div style="display:flex;gap:8px">${novo || !pode('criar') ? '' : `<button type="button" class="btn btn-perigo" data-excluir>${ic('lixo')}Excluir</button><button type="button" class="btn" data-duplicar>${ic('copiar2')}Duplicar</button>`}</div>
       <div style="display:flex;gap:8px"><button type="button" class="btn" data-fechar>Cancelar</button><button type="button" class="btn btn-p" data-salvar>${ic('check')}Salvar</button></div>`);
    const w = j.el;
    $('[data-foto]', w).addEventListener('change', async e => {
      const f = e.target.files[0]; if (!f) return;
      try { p.foto = await reduzirFoto(f); const pv = $('[data-previa]', w); pv.outerHTML = `<img class="previa" src="${p.foto}" alt="" data-previa>`; }
      catch { salvo('Não deu para abrir essa foto', 'info'); }
    });
    w.addEventListener('click', e => {
      if (e.target.closest('[data-tirar-foto]')) { p.foto = ''; $('[data-previa]', w).outerHTML = `<span class="previa" data-previa>${ic('imagem')}</span>`; e.target.closest('[data-tirar-foto]').remove(); }
      if (e.target.closest('[data-salvar]')) {
        const v = k => $(`[data-c="${k}"]`, w);
        p.nome = v('nome').value.trim(); p.desc = v('desc').value.trim(); p.preco = num(v('preco').value); p.cat = v('cat').value;
        p.destaque = v('destaque').checked; p.esgotado = v('esgotado').checked; p.pausado = !v('visivel').checked;
        p.grupos = $$('[data-g]', w).filter(c => c.checked).map(c => c.dataset.g);
        if (!p.nome) { v('nome').focus(); salvo('Dê um nome ao produto', 'info'); return; }
        const l = D().produtos, i = l.findIndex(x => x.id === p.id);
        if (i >= 0) l[i] = p; else l.push(p);
        salvar(novo ? 'Produto criado' : 'Produto salvo'); j.fechar(); produtos();
      }
      if (e.target.closest('[data-excluir]') && confirm(`Excluir "${p.nome}" do cardápio?`)) { D().produtos = D().produtos.filter(x => x.id !== p.id); salvar('Produto excluído'); j.fechar(); produtos(); }
      if (e.target.closest('[data-duplicar]')) { const l = D().produtos, i = l.findIndex(x => x.id === p.id); const c = { ...C.copia(l[i]), id: C.novoId('p'), nome: l[i].nome + ' (cópia)' }; l.splice(i + 1, 0, c); salvar('Produto duplicado'); j.fechar(); produtos(); editarProduto(c.id); }
    });
    if (novo) setTimeout(() => $('[data-c="nome"]', w).focus(), 50);
  }

  /* ============================================================
     Categorias
     ============================================================ */
  function categorias() {
    const ds = D();
    P().innerHTML = cab('Categorias', 'Os grupos do cardápio. A ordem aqui é a ordem no site.') +
      `<div class="cartao"><div class="linhas">${ds.categorias.map((c, i) => { const n = ds.produtos.filter(p => p.cat === c.id).length; return `
        <div class="linha-prod" style="grid-template-columns:auto 1fr auto"><button type="button" class="btn btn-ic icone-cat" data-icone-cat="${c.id}" aria-label="Escolher ícone de ${esc(c.nome)}" title="Escolher ícone">${c.icone ? ic(c.icone) : ic('mais')}</button>
          <input class="entrada" data-cat-nome="${c.id}" value="${esc(c.nome)}" maxlength="40" aria-label="Nome da categoria">
          <div class="acoes"><small style="margin-right:6px">${n} ${n === 1 ? 'produto' : 'produtos'}</small>
            <button type="button" class="btn btn-ic" data-mover-cat="-1" data-i="${i}" aria-label="Subir"${i === 0 ? ' disabled' : ''}>${ic('cima')}</button>
            <button type="button" class="btn btn-ic" data-mover-cat="1" data-i="${i}" aria-label="Descer"${i === ds.categorias.length - 1 ? ' disabled' : ''}>${ic('baixo')}</button>
            <button type="button" class="btn btn-ic btn-perigo" data-apagar-cat="${c.id}" aria-label="Excluir categoria"${n ? ` disabled title="Mova ou exclua os produtos antes"` : ''}>${ic('lixo')}</button></div></div>`; }).join('')}</div>
        <form data-nova-cat style="display:flex;gap:8px;margin-top:14px"><input class="entrada" name="nome" placeholder="Nova categoria" maxlength="40" required><button class="btn btn-p">${ic('mais')}Adicionar</button></form></div>`;
  }

  /* ============================================================
     Opções (tamanhos, adicionais, bordas...)
     ============================================================ */
  const TIPOS = { um: 'O cliente escolhe 1', varios: 'O cliente escolhe vários', meio: 'Meio a meio (segundo sabor)' };
  function opcoes() {
    const ds = D();
    P().innerHTML = cab('Opções dos produtos', 'Tamanhos, adicionais, bordas, sabores… Depois, marque em cada produto quais opções ele tem.', `<button type="button" class="btn btn-p" data-novo-grupo>${ic('mais')}Nova opção</button>`) +
      ds.grupos.map(g => { const usados = ds.produtos.filter(p => (p.grupos || []).includes(g.id)).length; return `<div class="cartao" data-grupo="${g.id}">
        <div class="lado2"><label class="campo"><span>Nome (aparece para o cliente)</span><input class="entrada" data-gc="nome" value="${esc(g.nome)}" maxlength="40"></label>
          <label class="campo"><span>Tipo</span><select class="entrada" data-gc="tipo">${Object.entries(TIPOS).map(([v, n]) => `<option value="${v}"${g.tipo === v ? ' selected' : ''}>${n}</option>`).join('')}</select></label></div>
        ${g.tipo === 'meio' ? `<p class="sub" style="color:var(--suave)">O cliente escolhe um segundo sabor da mesma categoria. Vale o preço do sabor mais caro.</p>` : `
        <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center">
          <label class="chave"><input type="checkbox" data-gc="obrig"${g.obrig ? ' checked' : ''}><span class="trilho"></span><span>Obrigatório</span></label>
          ${g.tipo === 'varios' ? `<label class="campo" style="margin:0;display:flex;align-items:center;gap:8px"><span>Máximo</span><input class="entrada" style="width:80px" type="number" min="0" data-gc="max" value="${g.max || ''}" placeholder="sem"></label>` : ''}</div>
        <div class="itens-op">${g.itens.map((it, i) => `<div class="item-op"><input class="entrada" data-it="nome" data-i="${i}" value="${esc(it.nome)}" maxlength="40" aria-label="Nome da opção">
          <input class="entrada" data-it="preco" data-i="${i}" inputmode="decimal" value="${preco(it.preco)}" aria-label="Preço a mais" title="Quanto soma ao preço (0 = grátis)">
          <button type="button" class="btn btn-ic btn-perigo" data-tirar-item="${i}" aria-label="Tirar opção">${ic('x')}</button></div>`).join('')}</div>
        <button type="button" class="btn btn-peq" data-mais-item>${ic('mais')}Adicionar escolha</button>`}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;color:var(--suave);font-size:.85rem"><span>Usada em ${usados} ${usados === 1 ? 'produto' : 'produtos'} · o valor ao lado soma ao preço</span>
          <button type="button" class="btn btn-peq btn-perigo" data-apagar-grupo>${ic('lixo')}Excluir</button></div></div>`; }).join('');
  }

  /* ============================================================
     Funcionamento da loja
     ============================================================ */
  const PAGS = ['Pix', 'Cartão de crédito na entrega', 'Cartão de débito na entrega', 'Dinheiro', 'Vale-refeição'];
  function loja() {
    const l = D().loja;
    const todosPags = [...new Set([...PAGS, ...l.pagamentos])];
    P().innerHTML = cab('Funcionamento', 'Horário, entrega, pagamento e contato. Tudo salva sozinho.') + `
    <div class="cartao"><h2>Loja aberta ou fechada</h2><p class="sub">Use para feriados, férias ou imprevistos. O site avisa e não deixa enviar pedido.</p>
      <label class="chave"><input type="checkbox" data-l="fechadaAgora"${l.fechadaAgora ? ' checked' : ''}><span class="trilho"></span><span><b>Fechar a loja agora</b></span></label>
      <label class="campo" style="margin-top:12px"><span>Mensagem quando estiver fechada</span><input class="entrada" data-l="avisoFechada" value="${esc(l.avisoFechada)}" maxlength="120"></label></div>
    <div class="cartao"><h2>Horário de funcionamento</h2><p class="sub">O site mostra "Aberto agora" ou "Fechado" sozinho.</p>
      <div class="dias">${C.DIAS.map((d, i) => { const h = (l.horario[i] || [])[0]; return `<div class="dia"><b>${d}</b>
        <label class="chave"><input type="checkbox" data-dia="${i}"${h ? ' checked' : ''}><span class="trilho"></span></label>
        <input class="entrada" type="time" data-de="${i}" value="${h ? h[0] : '18:00'}"${h ? '' : ' disabled'} aria-label="${d}: abre">
        <input class="entrada" type="time" data-ate="${i}" value="${h ? h[1] : '23:00'}"${h ? '' : ' disabled'} aria-label="${d}: fecha"></div>`; }).join('')}</div></div>
    <div class="cartao"><h2>Entrega e retirada</h2>
      <div style="display:flex;flex-wrap:wrap;gap:18px;margin-bottom:12px">
        <label class="chave"><input type="checkbox" data-l="entrega.ativa"${l.entrega.ativa ? ' checked' : ''}><span class="trilho"></span><span>Faço entrega</span></label>
        <label class="chave"><input type="checkbox" data-l="retirada"${l.retirada ? ' checked' : ''}><span class="trilho"></span><span>Cliente pode retirar no local</span></label></div>
      <div class="lado2"><label class="campo"><span>Tempo de entrega</span><input class="entrada" data-l="entrega.tempo" value="${esc(l.entrega.tempo)}" maxlength="30"></label>
        <label class="campo"><span>Tempo para retirar</span><input class="entrada" data-l="tempoRetirada" value="${esc(l.tempoRetirada || '')}" maxlength="30"></label></div>
      <label class="campo" style="max-width:240px"><span>Pedido mínimo (R$, 0 = sem mínimo)</span><input class="entrada" data-l="pedidoMinimo" data-numero inputmode="decimal" value="${preco(l.pedidoMinimo)}"></label>
      <div class="campo"><span>Bairros atendidos e taxa de entrega</span>
        ${l.entrega.bairros.map((b, i) => `<div class="bairro"><input class="entrada" data-bairro="nome" data-i="${i}" value="${esc(b.nome)}" aria-label="Bairro"><input class="entrada" data-bairro="taxa" data-i="${i}" inputmode="decimal" value="${preco(b.taxa)}" aria-label="Taxa"><button type="button" class="btn btn-ic btn-perigo" data-tirar-bairro="${i}" aria-label="Tirar bairro">${ic('x')}</button></div>`).join('')}
        <button type="button" class="btn btn-peq" data-mais-bairro style="justify-self:start">${ic('mais')}Adicionar bairro</button></div></div>
    <div class="cartao"><h2>Formas de pagamento</h2><p class="sub">Só informam o cliente. O pagamento é combinado com ele, fora do site.</p>
      <div class="checks">${todosPags.map(pg => `<label><input type="checkbox" data-pag="${esc(pg)}"${l.pagamentos.includes(pg) ? ' checked' : ''}>${esc(pg)}</label>`).join('')}</div>
      <form data-novo-pag style="display:flex;gap:8px;margin-top:10px"><input class="entrada" name="pag" placeholder="Outra forma de pagamento" maxlength="40" required><button class="btn">${ic('mais')}Adicionar</button></form></div>
    <div class="cartao"><h2>Contato e endereço</h2>
      <label class="campo"><span>WhatsApp que recebe os pedidos (com DDD)</span><input class="entrada" data-l="whats" inputmode="tel" value="${esc(l.whats)}" placeholder="(21) 99999-9999"></label>
      <div class="lado2"><label class="campo"><span>Endereço</span><input class="entrada" data-l="endereco" value="${esc(l.endereco)}"></label>
        <label class="campo"><span>Cidade</span><input class="entrada" data-l="cidade" value="${esc(l.cidade)}"></label></div></div>
    ${L.demo ? `<div class="cartao"><h2>Demonstração</h2><p class="sub">Volta o cardápio, as opções e o funcionamento ao modelo original. Os pedidos não mudam.</p>
      <button type="button" class="btn btn-perigo" data-restaurar>${ic('desfazer')}Restaurar a demonstração</button></div>` : ''}`;
  }
  const caminho = (obj, k, v) => { const p = k.split('.'); const ult = p.pop(); const alvo = p.reduce((o, x) => o[x], obj); if (v === undefined) return alvo[ult]; alvo[ult] = v; };

  /* ============================================================
     Equipe (só o dono vê)
     ============================================================ */
  const MODELOS_FUNC = {
    atendente: { nome: 'Atendente', p: ['pedidos', 'situacao', 'esgotado'] },
    cozinha: { nome: 'Cozinha', p: ['pedidos', 'esgotado'] },
    gerente: { nome: 'Gerente', p: ['pedidos', 'situacao', 'valores', 'esgotado', 'produtos', 'criar', 'cardapio', 'funcionamento'] }
  };
  function equipeTela() {
    const eq = equipe();
    P().innerHTML = cab('Equipe', 'Quem entra na área da loja e o que cada pessoa vê e muda.', `<button type="button" class="btn btn-p" data-novo-func>${ic('mais')}Adicionar funcionário</button>`) + `
    <div class="cartao"><h2>Dono</h2><p class="sub">Você vê e muda tudo, inclusive a equipe. ${L.demo ? 'Na loja de verdade, a sua senha é trocada aqui.' : ''}</p></div>
    ${eq.map(f => `<div class="cartao" data-func="${esc(f.id)}">
      <div class="lado2"><label class="campo"><span>Nome</span><input class="entrada" data-func-campo="nome" value="${esc(f.nome)}" maxlength="40"></label>
        <label class="campo"><span>PIN para entrar (4 a 6 números)</span><input class="entrada" data-func-campo="pin" inputmode="numeric" value="${esc(f.pin)}" maxlength="6"></label></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:10px">
        <label class="chave"><input type="checkbox" data-func-ativo${f.ativo !== false ? ' checked' : ''}><span class="trilho"></span><span>Pode entrar</span></label>
        <span style="margin-left:auto;color:var(--suave);font-size:.85rem">Atalhos:</span>
        ${Object.entries(MODELOS_FUNC).map(([id, m]) => `<button type="button" class="btn btn-peq" data-modelo-func="${id}">${m.nome}</button>`).join('')}</div>
      <div class="checks">${PERMISSOES.map(([id, n, dica]) => `<label><input type="checkbox" data-perm="${id}"${(f.permissoes || {})[id] ? ' checked' : ''}>${n}${dica ? `<small>${dica}</small>` : ''}</label>`).join('')}</div>
      <div style="display:flex;justify-content:flex-end;margin-top:12px"><button type="button" class="btn btn-peq btn-perigo" data-apagar-func>${ic('lixo')}Tirar da equipe</button></div></div>`).join('')}
    ${eq.length ? '' : '<p class="vazio">Nenhum funcionário ainda. Toque em “Adicionar funcionário”.</p>'}
    <div class="nota-studio">${ic('info')}<div>Dê a cada pessoa só o que ela precisa. Exemplos: <b>atendente</b> vê os pedidos e muda a situação; <b>cozinha</b> vê os pedidos e marca o que acabou.
      Cada mudança de situação de pedido mostra quem fez.</div></div>`;
  }

  /* ============================================================
     Visual (definido pelo Studio)
     ============================================================ */
  function visual() {
    const T = C.textos, f = n => n.split(',')[0].replace(/'/g, '');
    P().innerHTML = cab('Visual da loja', 'Cores, logo, fontes e textos da apresentação.') + `
    <div class="cartao travado"><div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
      <span class="sigla" style="margin:0;width:64px;height:64px;font-size:1.7rem">${siglaHTML()}</span>
      <div><b style="font:800 1.4rem/1.1 ${V.fontes.t.replace(/"/g, "'")}">${esc(V.nome)}</b><div style="color:var(--suave)">${esc(V.segmento)}</div></div></div>
      <h2 style="margin-top:20px">Cores</h2><div class="cores" style="margin-top:8px">${[['Principal', V.cores.p], ['Destaque', V.cores.d], ['Escura', V.cores.escuro], ['Fundo', V.cores.fundo]].map(([n, c]) => `<span class="cor"><i style="background:${c}"></i>${n}</span>`).join('')}</div>
      <h2 style="margin-top:20px">Fontes</h2><p style="font:700 1.5rem/1.2 ${V.fontes.t.replace(/"/g, "'")};margin:6px 0 0">${esc(f(V.fontes.t))}</p><p style="font:400 1rem/1.4 ${V.fontes.c.replace(/"/g, "'")};margin:2px 0 0">${esc(f(V.fontes.c))}, para os textos</p>
      <h2 style="margin-top:20px">Textos da apresentação</h2><p style="margin:6px 0 0"><b>${esc(T.titulo)}</b><br><span style="color:var(--suave)">${esc(T.sub)}</span></p></div>
    <div class="nota-studio">${ic('info')}<div>O visual da loja é feito pelo <b>Studio Magalhães</b>. Para mudar cores, logo, fontes, nome ou os textos da apresentação, peça uma <b>atualização avulsa</b> ao Studio.<br>
      Se algo no site não funcionar como deveria, avise: <b>correção de erros é sempre gratuita</b>.</div></div>`;
  }

  /* ============================================================
     Manual
     ============================================================ */
  function manual() {
    const sec = (t, html, destaque) => `<details${destaque ? ' open class="destaque-manual"' : ''}><summary>${t}</summary><div class="texto">${html}</div></details>`;
    P().innerHTML = cab('Manual da loja', 'Tudo o que dá para fazer nesta área, passo a passo.') + `<div class="manual">
      ${sec('Os números de "Pedidos" não são o dinheiro que entrou', `<p>A tela de Pedidos soma os <b>pedidos que os clientes enviaram</b> pelo WhatsApp. <b>Não é o valor recebido.</b></p>
        <ul><li>O pagamento (Pix, cartão ou dinheiro) é combinado direto com o cliente, na conversa ou na entrega. O site não recebe dinheiro.</li>
        <li>O cliente pode mudar ou desistir do pedido na conversa. Quando isso acontecer, mude a situação do pedido para <b>Cancelado</b>: ele sai da soma.</li>
        <li>Para saber quanto entrou de verdade, confira o seu banco, a maquininha e o caixa.</li></ul>`, true)}
      ${sec('Como chega um pedido', `<p>O cliente monta o pedido no site e toca em "Enviar pedido". O WhatsApp abre com a mensagem pronta, com número, itens, total, endereço e pagamento. O cliente só confere e envia para o número da loja.</p>
        <p>O pedido também aparece aqui em Pedidos, com a situação <b>Novo</b>. Depois de responder o cliente, mude para <b>Confirmado</b> e, quando sair, para <b>Entregue</b>.</p>`)}
      ${sec('Cadastrar, editar e esconder produtos', `<ul><li><b>Novo produto:</b> em Produtos, toque em "Novo produto", preencha nome, descrição, preço e categoria, e escolha uma foto.</li>
        <li><b>Esgotado:</b> o produto continua no site, mas apagado e sem botão de pedir. Use quando acabar no dia.</li>
        <li><b>Escondido:</b> o produto some do site, mas fica guardado aqui. Use para produtos de temporada.</li>
        <li><b>Destaque:</b> aparece em "Mais pedidos", no topo do cardápio.</li>
        <li><b>Ordem:</b> use as setas para subir ou descer o produto dentro da categoria.</li></ul>`)}
      ${sec('Fotos que vendem', `<ul><li>Foto de cima ou levemente de lado, com luz do dia, perto de uma janela.</li><li>Prato limpo, fundo simples, sem dedos ou embalagens aparecendo.</li>
        <li>Quadrada fica melhor no site. A foto é diminuída sozinha, não precisa editar.</li></ul>`)}
      ${sec('Opções: tamanhos, adicionais, bordas e meio a meio', `<p>Em Opções ficam as escolhas que o cliente faz. Cada opção pode ser:</p>
        <ul><li><b>Escolhe 1:</b> como tamanho ou ponto da carne. Marque "Obrigatório" quando o cliente precisar escolher.</li>
        <li><b>Escolhe vários:</b> como adicionais e "retirar ingredientes". Dá para limitar o máximo.</li>
        <li><b>Meio a meio:</b> o cliente escolhe um segundo sabor da mesma categoria, e vale o preço do mais caro.</li></ul>
        <p>O valor ao lado de cada escolha <b>soma</b> ao preço do produto (0 = grátis). Depois, em cada produto, marque quais opções ele tem.</p>`)}
      ${sec('Horário, feriados e loja fechada', `<p>Em Funcionamento, ajuste o horário de cada dia. Para feriados ou imprevistos, ligue "Fechar a loja agora" e escreva o aviso. O site para de aceitar pedidos até você desligar.</p>`)}
      ${sec('Entrega, taxa por bairro e pedido mínimo', `<p>Cadastre os bairros que você atende e a taxa de cada um. O cliente escolhe o bairro e o site soma a taxa sozinho. Com pedido mínimo, o site só deixa enviar quando o valor for atingido.</p>`)}
      ${sec('Equipe: dono e funcionários', `<p>O pedido pode chegar no WhatsApp de quem estiver no balcão, e não no do dono. Por isso cada pessoa da equipe pode ter o próprio acesso.</p>
        <ul><li><b>Dono:</b> entra com a senha dele e vê tudo, inclusive a aba <b>Equipe</b>.</li>
        <li><b>Funcionário:</b> entra tocando no próprio nome e digitando o PIN. Só vê e muda o que o dono liberou.</li>
        <li>Na aba Equipe, o dono adiciona as pessoas, escolhe o PIN e marca o que cada uma pode fazer. Os atalhos "Atendente", "Cozinha" e "Gerente" já marcam o mais comum.</li>
        <li>Para alguém parar de entrar (por exemplo, quem saiu da loja), desligue "Pode entrar" ou tire a pessoa da equipe.</li>
        <li>Cada mudança de situação de pedido mostra quem fez ("Confirmado por Ana").</li></ul>`)}
      ${sec('O que é com o Studio Magalhães', `<ul><li><b>Visual:</b> cores, logo, fontes, nome e textos da apresentação são mudados pelo Studio, como atualização avulsa.</li>
        <li><b>Erros:</b> se algo não funcionar, avise o Studio. Correção de erros é sempre gratuita.</li>
        <li>O Studio fornece o site. Entregadores, pagamentos e atendimento são da loja.</li></ul>`)}
      ${L.demo ? sec('Sobre esta demonstração', `<p>Esta é uma loja de demonstração. Nome, produtos e preços são exemplos, e tudo fica salvo só neste navegador. Na loja de verdade, os dados ficam guardados com segurança no servidor e a senha é só sua.</p>`) : ''}
    </div>`;
  }

  /* ---------- Eventos da área ---------- */
  el.addEventListener('click', e => {
    const t = e.target, b = t.closest('button'); if (!b || !el.contains(b)) return;
    const ds = D(), d = b.dataset;
    // equipe (só o dono)
    const fEl = b.closest('[data-func]'), func = fEl ? equipe().find(x => x.id === fEl.dataset.func) : null;
    if (d.novoFunc !== undefined && quem().dono) { equipe().push({ id: C.novoId('f'), nome: 'Novo funcionário', pin: String(1000 + Math.floor(Math.random() * 9000)), ativo: true, permissoes: { pedidos: true, situacao: true } }); salvar('Funcionário adicionado'); equipeTela(); P().lastElementChild?.previousElementSibling?.scrollIntoView({ behavior: 'smooth' }); return; }
    if (func && d.modeloFunc && quem().dono) { func.permissoes = Object.fromEntries(MODELOS_FUNC[d.modeloFunc].p.map(p => [p, true])); salvar(`Permissões de ${MODELOS_FUNC[d.modeloFunc].nome.toLowerCase()}`); equipeTela(); return; }
    if (func && d.apagarFunc !== undefined && quem().dono) { if (confirm(`Tirar ${func.nome} da equipe? Ele não vai mais conseguir entrar.`)) { ds.equipe = equipe().filter(x => x !== func); salvar('Funcionário removido'); equipeTela(); } return; }
    // pedidos
    if (b.closest('[data-periodo]') && d.v) { periodo = d.v; pedidos(); return; }
    if (b.closest('[data-filtro]') && d.v) { filtroStatus = d.v; pedidos(); return; }
    if (d.exemplos !== undefined) { exemplos(); render(); return; }
    if (d.csv !== undefined) { baixarCSV(); return; }
    if (d.apagarPedidos !== undefined) { if (confirm('Apagar todos os pedidos desta demonstração?')) { C.salvarPedidos([]); render(); } return; }
    // produtos
    if (d.tog) { if (!(pode('produtos') || (d.tog === 'esgotado' && pode('esgotado')))) return; const p = C.produto(d.id); p[d.tog] = !p[d.tog]; salvar(); produtos(); return; }
    if (d.mover) { if (pode('produtos')) moverProduto(d.id, +d.mover); return; }
    if (d.editar) { if (pode('produtos')) editarProduto(d.editar); return; }
    if (d.novo !== undefined) { if (pode('criar')) editarProduto(null); return; }
    // categorias
    if (d.moverCat) { const i = +d.i, j = i + +d.moverCat, l = ds.categorias; [l[i], l[j]] = [l[j], l[i]]; salvar('Ordem salva'); categorias(); return; }
    if (d.iconeCat) {
      const c = C.categoria(d.iconeCat);
      const j = janela(`Ícone de "${c.nome}"`, `<div class="grade-icones">${(window.ICONES_CATEGORIA || []).map(n => `<button type="button" class="btn" data-escolher-icone="${n}" aria-pressed="${c.icone === n}">${ic(n)}</button>`).join('')}
        <button type="button" class="btn" data-escolher-icone="" aria-pressed="${!c.icone}" title="Sem ícone">${ic('x')}</button></div>`);
      j.el.addEventListener('click', e => { const x = e.target.closest('[data-escolher-icone]'); if (!x) return; c.icone = x.dataset.escolherIcone; salvar('Ícone salvo'); j.fechar(); categorias(); });
      return;
    }
    if (d.apagarCat) { const c = C.categoria(d.apagarCat); if (confirm(`Excluir a categoria "${c.nome}"?`)) { ds.categorias = ds.categorias.filter(x => x.id !== c.id); salvar('Categoria excluída'); categorias(); } return; }
    // opções
    const g = b.closest('[data-grupo]') ? C.grupo(b.closest('[data-grupo]').dataset.grupo) : null;
    if (d.novoGrupo !== undefined) { ds.grupos.push({ id: C.novoId('g'), nome: 'Nova opção', tipo: 'um', obrig: false, itens: [{ nome: 'Escolha 1', preco: 0 }] }); salvar('Opção criada'); opcoes(); P().lastElementChild?.scrollIntoView({ behavior: 'smooth' }); return; }
    if (g && d.maisItem !== undefined) { g.itens.push({ nome: '', preco: 0 }); salvar(); opcoes(); return; }
    if (g && d.tirarItem) { g.itens.splice(+d.tirarItem, 1); salvar(); opcoes(); return; }
    if (g && d.apagarGrupo !== undefined) { if (confirm(`Excluir a opção "${g.nome}"? Ela sai de todos os produtos.`)) { ds.grupos = ds.grupos.filter(x => x !== g); ds.produtos.forEach(p => { p.grupos = (p.grupos || []).filter(x => x !== g.id); }); salvar('Opção excluída'); opcoes(); } return; }
    // loja
    if (d.maisBairro !== undefined) { ds.loja.entrega.bairros.push({ nome: '', taxa: 0 }); salvar(); loja(); return; }
    if (d.tirarBairro) { ds.loja.entrega.bairros.splice(+d.tirarBairro, 1); salvar(); loja(); return; }
    if (d.restaurar !== undefined) { if (confirm('Voltar a demonstração ao original?')) { C.restaurar(); salvo('Demonstração restaurada'); loja(); } }
  });
  el.addEventListener('submit', e => {
    e.preventDefault(); const f = e.target, ds = D();
    if (f.matches('[data-nova-cat]')) { ds.categorias.push({ id: C.novoId('c'), nome: f.nome.value.trim() }); salvar('Categoria criada'); categorias(); }
    if (f.matches('[data-novo-pag]')) { ds.loja.pagamentos.push(f.pag.value.trim()); salvar(); loja(); }
  });
  el.addEventListener('input', e => {
    const t = e.target, ds = D(), d = t.dataset;
    if (t.matches('[data-busca]')) { busca = t.value; const pos = t.selectionStart; produtos(); const n = $('[data-busca]'); n.focus(); n.setSelectionRange(pos, pos); return; }
    if (d.catNome) { C.categoria(d.catNome).nome = t.value; salvarDepois(); return; }
    if (d.funcCampo && quem().dono) {
      const f = equipe().find(x => x.id === t.closest('[data-func]').dataset.func);
      if (d.funcCampo === 'pin') { t.value = t.value.replace(/\D/g, '').slice(0, 6); if (t.value.length < 4) return; }
      f[d.funcCampo] = t.value.trim() || f[d.funcCampo]; salvarDepois(); return;
    }
    const g = t.closest('[data-grupo]') ? C.grupo(t.closest('[data-grupo]').dataset.grupo) : null;
    if (g && d.gc === 'nome') { g.nome = t.value; salvarDepois(); return; }
    if (g && d.gc === 'max') { g.max = +t.value || 0; salvarDepois(); return; }
    if (g && d.it) { const it = g.itens[+d.i]; it[d.it] = d.it === 'preco' ? num(t.value) : t.value; salvarDepois(); return; }
    if (d.l && t.type !== 'checkbox') { caminho(ds.loja, d.l, d.numero !== undefined ? num(t.value) : t.value); salvarDepois(); return; }
    if (d.bairro) { const b = ds.loja.entrega.bairros[+d.i]; b[d.bairro] = d.bairro === 'taxa' ? num(t.value) : t.value; salvarDepois(); return; }
    if (d.de || d.ate) { const i = d.de || d.ate, h = ds.loja.horario[i]; if (h && h[0]) { h[0][d.de ? 0 : 1] = t.value; salvarDepois(); } }
  });
  el.addEventListener('change', e => {
    const t = e.target, ds = D(), d = t.dataset;
    if (t.matches('[data-filtro-cat]')) { filtroCat = t.value; produtos(); return; }
    const fEl = t.closest('[data-func]');
    if (fEl && quem().dono) {
      const f = equipe().find(x => x.id === fEl.dataset.func);
      if (d.perm) { (f.permissoes ||= {})[d.perm] = t.checked; salvar(); return; }
      if (t.matches('[data-func-ativo]')) { f.ativo = t.checked; salvar(t.checked ? `${f.nome} pode entrar` : `${f.nome} não entra mais`); return; }
    }
    if (d.statusPed) { if (!pode('situacao')) return; const l = C.pedidos(), p = l.find(x => x.numero === +d.statusPed); if (p) { p.status = t.value; p.por = quem().nome; C.salvarPedidos(l); salvo('Situação atualizada'); render(); } return; }
    const g = t.closest('[data-grupo]') ? C.grupo(t.closest('[data-grupo]').dataset.grupo) : null;
    if (g && d.gc === 'tipo') { g.tipo = t.value; if (g.tipo === 'meio') { g.itens = []; g.obrig = false; } else if (!g.itens.length) g.itens = [{ nome: 'Escolha 1', preco: 0 }]; salvar(); opcoes(); return; }
    if (g && d.gc === 'obrig') { g.obrig = t.checked; salvar(); return; }
    if (d.l && t.type === 'checkbox') { caminho(ds.loja, d.l, t.checked); salvar(); return; }
    if (d.dia) { const i = d.dia; ds.loja.horario[i] = t.checked ? [[$(`[data-de="${i}"]`).value, $(`[data-ate="${i}"]`).value]] : []; salvar(); loja(); return; }
    if (d.pag) { const l = ds.loja.pagamentos; if (t.checked) { if (!l.includes(d.pag)) l.push(d.pag); } else ds.loja.pagamentos = l.filter(x => x !== d.pag); salvar(); }
  });
  C.aoMudar(tipo => { if (entrou() && $('[data-principal]') && tipo === 'pedidos' && aba === 'pedidos') render(); else if (entrou() && $('[data-novos]')) { const n = C.pedidos().filter(p => p.status === 'novo').length, b = $('[data-novos]'); b.hidden = !n; b.textContent = n; } });

  if (entrou()) montar(); else telaEntrar();
})();
