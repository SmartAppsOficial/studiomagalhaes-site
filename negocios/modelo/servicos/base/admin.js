/* Site de Serviços · Área do negócio: Agenda/Solicitações, Serviços, Categorias,
   Galeria & Depoimentos, Funcionamento (atendimento, pagamento online MP/InfinitePay, cupons, QR Code),
   Equipe/Profissionais, Visual e Manual. 100% dinâmica conforme o modo de atendimento. */
(() => {
  'use strict';
  const C = window.Servicos, N = C.NEGOCIO, I = window.ICONES;
  const HASH_AMOSTRA = C.linkParamAmostra || '';
  const V = C.visual;
  const MODO_AT = () => C.visual.atendimentoModo || N.visual.atendimentoModo || 'local';
  const usaLocal = () => MODO_AT() === 'local' || MODO_AT() === 'hibrido' || MODO_AT() === 'local_domicilio';
  const usaDomicilio = () => MODO_AT() === 'domicilio' || MODO_AT() === 'local_domicilio';
  const usaOnline = () => MODO_AT() === 'online' || MODO_AT() === 'hibrido';
  const ehOrcamento = N.fluxo === 'orcamento';
  const siglaHTML = () => V.logo ? `<img src="${esc(V.logo)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">` : esc(V.sigla);
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = C.esc, R = C.dinheiro, D = () => C.dados;
  const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || ''}</svg>`;
  const num = v => { const n = parseFloat(String(v).replace(/\s|R\$/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.')); return isNaN(n) ? 0 : Math.round(n * 100) / 100; };
  const preco = v => (+v || 0).toFixed(2).replace('.', ',');
  const raiz = document.documentElement.style;
  raiz.setProperty('--p', V.cores.p); raiz.setProperty('--escuro', V.cores.escuro);
  document.title = `Área do negócio · ${V.nome}`;
  const SES = 'sm-servicos:' + N.id + ':sessao';
  const el = $('#admin');

  let salvoT;
  function salvo(msg = 'Alterações salvas', icone = 'check') {
    let s = $('.salvo'); if (!s) { s = document.createElement('div'); s.className = 'salvo'; s.setAttribute('role', 'status'); document.body.appendChild(s); }
    s.innerHTML = ic(icone) + esc(msg); s.hidden = false;
    clearTimeout(salvoT); salvoT = setTimeout(() => { s.hidden = true; }, 2400);
  }
  function salvar(msg) { if (C.salvar()) salvo(msg); else salvo('Sem espaço neste navegador. Use fotos menores.', 'info'); }
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
  function reduzirFoto(arquivo) {
    return new Promise((ok, erro) => {
      const img = new Image(), url = URL.createObjectURL(arquivo);
      img.onload = () => { const max = 900, s = Math.min(1, max / Math.max(img.width, img.height));
        const c = Object.assign(document.createElement('canvas'), { width: Math.round(img.width * s), height: Math.round(img.height * s) });
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); ok(c.toDataURL('image/jpeg', .82)); };
      img.onerror = () => { URL.revokeObjectURL(url); erro(new Error('foto')); };
      img.src = url;
    });
  }

  /* ---------- Equipe e permissões ---------- */
  const PERMISSOES = [
    ['agenda', ehOrcamento ? 'Ver orçamentos' : 'Ver agenda', 'Lista de solicitações que chegam pelo site.'],
    ['situacao', 'Confirmar ou cancelar', 'Mudar status e avisar clientes no WhatsApp.'],
    ['valores', 'Ver totais e planilha', 'Resumo do dia/mês e exportação CSV.'],
    ['servicos', 'Editar serviços e galeria', 'Alterar nomes, valores, duração, fotos e depoimentos.'],
    ['criar', 'Criar e excluir serviços', ''],
    ['funcionamento', 'Funcionamento', 'Horários, atendimento, cupons e pagamento.']
  ];
  const LIMITE_EQUIPE = +N.limiteEquipe || 3;
  const equipe = () => (D().equipe ||= []);
  const cupons = () => (D().cupons ||= []);
  const profissionais = () => (D().profissionais ||= []);
  const galeria = () => (D().galeria ||= []);
  const depoimentos = () => (D().depoimentos ||= []);
  const lerSessao = () => { try { return JSON.parse(sessionStorage.getItem(SES) || 'null'); } catch { return null; } };
  let sessao = lerSessao();
  const quem = () => !sessao ? null : sessao.quem === 'dono' ? { dono: true, nome: 'Dono' } : equipe().find(f => f.id === sessao.quem && f.ativo !== false) || null;
  const entrou = () => !!quem();
  const pode = p => { const q = quem(); return !!q && (q.dono || !!(q.permissoes || {})[p]); };

  let escolhido = 'dono';
  function telaEntrar(erro = '') {
    const ativos = equipe().filter(f => f.ativo !== false);
    if (escolhido !== 'dono' && !ativos.some(f => f.id === escolhido)) escolhido = 'dono';
    const ehDono = escolhido === 'dono';
    el.innerHTML = `<div class="entrar"><form class="entrar-cartao" data-entrar>
      <div class="sigla">${siglaHTML()}</div><h1>${esc(V.nome)}</h1><p>Área do negócio</p>
      ${ativos.length ? `<div class="quem" role="group" aria-label="Quem vai entrar">
        <button type="button" data-quem="dono" aria-pressed="${ehDono}">${ic('cadeado')}Dono</button>
        ${ativos.map(f => `<button type="button" data-quem="${esc(f.id)}" aria-pressed="${escolhido === f.id}">${ic('grupo')}${esc(f.nome)}</button>`).join('')}</div>` : ''}
      <label class="campo" style="text-align:left"><span>${ehDono ? 'Senha do dono' : 'PIN de ' + esc(ativos.find(f => f.id === escolhido).nome)}</span>
        <input class="entrada" type="password" name="senha" ${ehDono ? 'autocomplete="current-password"' : 'inputmode="numeric" autocomplete="off"'} required autofocus></label>
      ${erro ? `<p style="color:#a3271a;margin:0 0 10px">${esc(erro)}</p>` : ''}
      <button class="btn btn-p" style="width:100%">${ic('cadeado')}Entrar</button>
      ${HASH_AMOSTRA && N.demo ? `<button type="button" class="btn" style="width:100%;margin-top:8px" data-entrar-rapido>${ic('olho')}Entrar direto como Dono (teste)</button>` : ''}
      ${N.demo ? `<div class="dica-demo">Demonstração: senha do dono <b>${esc(N.senhaDemo || '1234')}</b>${ativos.length ? ' · PIN dos funcionários de exemplo <b>1111</b>' : ''}</div>` : ''}
      <p style="margin:16px 0 0;font-size:.85rem"><a href="index.html${esc(HASH_AMOSTRA)}">Voltar para o site</a></p>
    </form></div>`;
    const f = $('[data-entrar]');
    f.addEventListener('click', e => {
      const b = e.target.closest('[data-quem]'); if (b) { escolhido = b.dataset.quem; telaEntrar(); return; }
      if (e.target.closest('[data-entrar-rapido]')) { sessao = { quem: 'dono' }; try { sessionStorage.setItem(SES, JSON.stringify(sessao)); } catch { /* */ } aba = abasPermitidas()[0][0]; montar(); }
    });
    f.addEventListener('submit', e => {
      e.preventDefault();
      const v = e.target.senha.value, func = equipe().find(x => x.id === escolhido);
      const ok = escolhido === 'dono' ? v === (N.senhaDemo || '1234') : func && func.ativo !== false && v === func.pin;
      if (!ok) { telaEntrar(escolhido === 'dono' ? 'Senha incorreta.' : 'PIN incorreto.'); return; }
      sessao = { quem: escolhido }; try { sessionStorage.setItem(SES, JSON.stringify(sessao)); } catch { /* */ }
      aba = abasPermitidas()[0][0]; montar();
    });
  }

  /* ---------- Navegação ---------- */
  const NAV = [
    ['agenda', 'sv-agenda', ehOrcamento ? 'Orçamentos' : 'Agenda', () => pode('agenda')],
    ['servicos', 'lista', 'Serviços', () => pode('servicos') || pode('criar')],
    ['categorias', 'tag', 'Categorias', () => pode('servicos')],
    ['portfolio', 'foto', 'Galeria & Aval.', () => pode('servicos')],
    ['negocio', 'loja', 'Funcionamento', () => pode('funcionamento')],
    ['equipe', 'grupo', 'Equipe', () => !!quem()?.dono],
    ['visual', 'paleta', 'Visual', () => !!quem()?.dono],
    ['manual', 'livro', 'Manual', () => true]
  ];
  const abasPermitidas = () => NAV.filter(n => n[3]());
  let aba = NAV.some(n => n[0] === location.hash.slice(1)) ? location.hash.slice(1) : 'agenda';
  function montar() {
    const q = quem();
    if (!abasPermitidas().some(n => n[0] === aba)) aba = abasPermitidas()[0][0];
    el.innerHTML = `<div class="app">
      <aside class="lado"><div class="lado-marca"><span class="sigla">${siglaHTML()}</span><div><b>${esc(V.nome)}</b><small>${q.dono ? 'Dono' : esc(q.nome) + ' · equipe'}</small></div></div>
        ${abasPermitidas().map(([id, icn, n]) => `<button type="button" class="nav-item" data-aba="${id}">${ic(icn)}<span class="txt">${n}</span>${id === 'agenda' ? '<span class="num" data-novos hidden></span>' : ''}</button>`).join('')}
        <div class="lado-pe"><a class="nav-item" href="index.html${esc(HASH_AMOSTRA)}" target="_blank" rel="noopener">${ic('olho')}<span class="txt">Ver meu site</span></a>
          <button type="button" class="nav-item" data-sair>${ic('sair')}<span class="txt">Sair</span></button>
          <small>Site de Serviços · Studio Magalhães</small></div></aside>
      <main class="principal" data-principal></main></div>`;
    $('.lado').addEventListener('click', e => {
      const b = e.target.closest('[data-aba]'); if (b) { aba = b.dataset.aba; if (!HASH_AMOSTRA) history.replaceState(null, '', '#' + aba); render(); window.scrollTo(0, 0); }
      if (e.target.closest('[data-sair]')) { sessao = null; try { sessionStorage.removeItem(SES); } catch { /* */ } telaEntrar(); }
    });
    render();
  }
  function render() {
    if (!entrou()) { telaEntrar(); return; }
    $$('[data-aba]').forEach(b => b.setAttribute('aria-current', String(b.dataset.aba === aba)));
    const novos = C.solicitacoes().filter(p => p.status === 'novo').length, n = $('[data-novos]');
    if (n) { n.hidden = !novos; n.textContent = novos; }
    ({ agenda, servicosTela, categorias, portfolio, negocioTela, equipeTela, visual, manual })[aba === 'servicos' ? 'servicosTela' : aba === 'negocio' ? 'negocioTela' : aba === 'equipe' ? 'equipeTela' : aba]();
  }
  const P = () => $('[data-principal]');
  const cab = (t, sub, acoes = '') => `<div class="cab"><div><h1>${t}</h1>${sub ? `<p>${sub}</p>` : ''}</div><div style="display:flex;gap:8px;flex-wrap:wrap">${acoes}</div></div>`;

  /* ---------- Agenda / Solicitações ---------- */
  let periodo = 'hoje', filtroStatus = 'todos', filtroProf = '';
  const STATUS = { novo: 'Novo', confirmado: 'Confirmado', concluido: 'Concluído', cancelado: 'Cancelado' };
  const inicioDe = qual => { const d = new Date(); d.setHours(0, 0, 0, 0); if (qual === '7') d.setDate(d.getDate() - 6); if (qual === 'mes') d.setDate(1); return d; };
  const noPeriodo = (p, qual) => qual === 'tudo' || new Date(p.quando) >= inicioDe(qual);
  const quando = iso => {
    const d = new Date(iso), hoje = inicioDe('hoje'), ontem = new Date(hoje); ontem.setDate(ontem.getDate() - 1);
    const h = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return d >= hoje ? `hoje, ${h}` : d >= ontem ? `ontem, ${h}` : `${d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}, ${h}`;
  };
  const dataBR = iso => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || '')); return m ? `${m[3]}/${m[2]}/${m[1]}` : (iso || ''); };
  const whatsLimpo = s => { const d = String(s || '').replace(/\D/g, ''); return d.length >= 10 ? (d.length <= 11 ? '55' + d : d) : ''; };

  function agenda() {
    const todos = C.solicitacoes(), validos = todos.filter(p => p.status !== 'cancelado');
    const soma = l => l.reduce((s, p) => s + (+p.total || 0), 0);
    const hoje = validos.filter(p => noPeriodo(p, 'hoje')), mes = validos.filter(p => noPeriodo(p, 'mes'));
    const profs = profissionais().filter(p => p.ativo !== false);
    const lista = todos.filter(p => noPeriodo(p, periodo) && (filtroStatus === 'todos' || p.status === filtroStatus) && (!filtroProf || p.profissional === filtroProf));
    const tit = ehOrcamento ? 'Orçamentos e solicitações' : 'Agenda e solicitações';
    P().innerHTML = cab(tit, 'Cada solicitação enviada pelo site aparece aqui.',
      (pode('valores') ? `<button type="button" class="btn btn-peq" data-csv>${ic('baixar')}Planilha CSV</button>` : '') +
      (N.demo && quem().dono ? `<button type="button" class="btn btn-peq" data-exemplos>${ic('brilho')}Criar exemplos</button>` : '')) +
    (pode('valores') ? `<div class="aviso-pedidos">${ic('info')}<div><b>Resumo operacional:</b> ${C.visual.pagOnline ? `pagamentos online via <b>${C.visual.pagOnline === 'infinitepay' ? 'InfinitePay' : 'Mercado Pago'}</b> aparecem marcados com selo verde.` : 'estes números mostram as <b>solicitações recebidas</b> pelo site (o pagamento é combinado direto com o cliente).'} Cancelados não entram na soma.</div></div>
    <div class="numeros">
      <div class="numero"><small>Hoje</small><b>${hoje.length}</b><span>${ehOrcamento ? 'orçamentos' : 'agendamentos'}</span></div>
      <div class="numero"><small>Estimado hoje</small><b>${R(soma(hoje))}</b><span>serviços com preço</span></div>
      <div class="numero"><small>No mês</small><b>${mes.length}</b><span>desde o dia 1º</span></div>
      <div class="numero"><small>Estimado no mês</small><b>${R(soma(mes))}</b><span>sem cancelados</span></div>
    </div>` : '') + `
    <div class="barra-ferr">
      <div class="filtros" data-periodo>${[['hoje', 'Hoje'], ['7', '7 dias'], ['mes', 'Este mês'], ['tudo', 'Tudo']].map(([v, n]) => `<button type="button" data-v="${v}" aria-pressed="${periodo === v}">${n}</button>`).join('')}</div>
      <div class="filtros" data-filtro>${[['todos', 'Todos'], ...Object.entries(STATUS)].map(([v, n]) => `<button type="button" data-v="${v}" aria-pressed="${filtroStatus === v}">${n}${v === 'novo' ? ` (${todos.filter(p => p.status === 'novo').length})` : ''}</button>`).join('')}</div>
      ${profs.length ? `<select class="entrada" style="max-width:200px" data-filtro-prof><option value="">Todos os profissionais</option>${profs.map(pr => `<option value="${esc(pr.nome)}"${filtroProf === pr.nome ? ' selected' : ''}>${esc(pr.nome)}</option>`).join('')}</select>` : ''}
    </div>
    <div class="pedidos">${lista.length ? lista.map(p => `<article class="pedido" data-status="${esc(p.status === 'concluido' ? 'entregue' : p.status)}">
      <div class="pedido-cab"><div><b>#${p.numero} · ${esc(p.nome)}</b> · <small>${quando(p.quando)}</small><br>
        <small>${p.whats ? `${esc(p.whats)} · ` : ''}${p.tipoAtendimento === 'online' ? 'Online' : p.tipoAtendimento === 'domicilio' ? `A domicílio${p.bairro ? ' · ' + esc(p.bairro) : ''}` : 'Presencial'}${p.profissional ? ` · ${esc(p.profissional)}` : ''}${p.dataDesejada ? ` · <b>${dataBR(p.dataDesejada)}${p.horaDesejada ? ' às ' + esc(p.horaDesejada) : ''}</b>` : ''}</small></div>
        <div style="text-align:right"><div class="pedido-acoes">
          <select class="status-sel" data-status-sol="${p.numero}"${pode('situacao') ? '' : ' disabled'}>${Object.entries(STATUS).map(([v, n]) => `<option value="${v}"${p.status === v ? ' selected' : ''}>${n}</option>`).join('')}</select>
          ${p.status !== 'cancelado' && p.whats ? `<button type="button" class="btn btn-peq" data-confirmar-whats="${p.numero}">${ic('whats')}${ehOrcamento ? 'Responder' : 'Confirmar'}</button>` : ''}
          ${!ehOrcamento && p.status === 'confirmado' && p.whats ? `<button type="button" class="btn btn-peq" data-lembrete-whats="${p.numero}">${ic('relogio')}Lembrete</button>` : ''}
          ${pode('situacao') && p.status !== 'cancelado' ? `<button type="button" class="btn btn-peq btn-perigo" data-cancelar-sol="${p.numero}">${ic('x')}Cancelar</button>` : ''}</div>
          ${p.por ? `<small>${esc(STATUS[p.status])} por ${esc(p.por)}${p.motivoCancelamento ? ` · ${esc(p.motivoCancelamento)}` : ''}</small>` : ''}</div></div>
      <ul>${(p.servicos || []).length ? p.servicos.map(s => `<li>${esc(s.nome)}${s.preco ? ` · ${R(s.preco)}` : ' · Sob orçamento'}${s.duracao ? `<small>Duração: ${esc(C.duracaoTxt(s.duracao))}</small>` : ''}</li>`).join('') : '<li>Solicitação geral</li>'}</ul>
      ${(p.camposExtra || []).length ? `<div class="pedido-pe" style="border-top:0;padding-top:0">${p.camposExtra.map(([k, v]) => `<span><b>${esc(k)}:</b> ${esc(v)}</span>`).join('')}</div>` : ''}
      <div class="pedido-pe"><span>${p.total > 0 ? `Estimado: <b>${R(p.total)}</b>` : '<b>Sob orçamento</b>'}${p.desconto ? ` (cupom ${esc(p.cupom)} -${R(p.desconto)})` : ''}</span>
        ${p.pagoOnline ? `<span style="background:#e6f6ea;color:#165b29;padding:2px 8px;border-radius:99px;font-weight:700;font-size:.78rem">✓ Pago online · ${esc(p.pagoOnline)}</span>` : ''}
        <span>${esc(p.pagamento || 'A combinar')}</span>${p.endereco ? `<span>${esc(p.endereco)}</span>` : ''}${p.obs ? `<span>Obs.: ${esc(p.obs)}</span>` : ''}</div>
    </article>`).join('') : `<p class="vazio">Nenhuma solicitação neste período.</p>`}</div>
    ${N.demo && todos.length && quem().dono ? `<p style="margin-top:20px"><button type="button" class="btn btn-peq btn-perigo" data-apagar-sols>${ic('lixo')}Apagar exemplos</button></p>` : ''}`;
  }

  function criarExemplos() {
    const servs = (D().servicos || []).filter(s => !s.pausado), profs = profissionais(), pags = D().negocio.pagamentos || ['Pix'];
    const nomes = ['Ana Paula', 'Bruno Silva', 'Camila Rocha', 'Diego Costa', 'Fernanda Lima', 'Gabriel Dias', 'Helena Souza', 'Lucas Mendes'];
    const m = MODO_AT();
    const lista = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(); d.setDate(d.getDate() - Math.floor(i / 2));
      const s = servs[i % servs.length];
      const tp = m === 'online' ? 'online' : m === 'domicilio' ? 'domicilio' : m === 'hibrido' ? (i % 2 ? 'online' : 'local') : 'local';
      const diaFut = new Date(); diaFut.setDate(diaFut.getDate() + (i % 4));
      const isoDia = `${diaFut.getFullYear()}-${String(diaFut.getMonth() + 1).padStart(2, '0')}-${String(diaFut.getDate()).padStart(2, '0')}`;
      const val = s.precoTipo === 'orcamento' ? 0 : (+s.preco || 0);
      lista.push({
        quando: d.toISOString(),
        servicos: [{ id: s.id, nome: s.nome, preco: val, precoTipo: s.precoTipo || 'fixo', duracao: +s.duracao || 0 }],
        subtotal: val, desconto: 0, cupom: '', total: val, temOrcamento: !val,
        tipoAtendimento: tp, profissional: profs.length ? profs[i % profs.length].nome : '',
        dataDesejada: !ehOrcamento ? isoDia : '', horaDesejada: !ehOrcamento ? ['09:00', '10:30', '14:00', '16:00', '18:00'][i % 5] : '',
        bairro: tp === 'domicilio' ? ((D().negocio.bairros || [])[0] || 'Centro') : '',
        endereco: tp === 'domicilio' ? 'Rua Exemplo, ' + (120 + i * 11) : '',
        camposExtra: [], nome: nomes[i % nomes.length] + ' (exemplo)', whats: '(21) 99999-10' + String(10 + i).slice(-2),
        pagamento: pags[i % pags.length], pagoOnline: '', obs: '',
        status: i < 3 ? 'novo' : i < 6 ? 'confirmado' : i === 7 ? 'cancelado' : 'concluido'
      });
    }
    lista.reverse().forEach(x => C.registrarSolicitacao(x));
    salvo('Solicitações de exemplo criadas');
  }

  function baixarCSV() {
    const linhas = [['Número', 'Data', 'Cliente', 'WhatsApp', 'Atendimento', 'Profissional', 'Dia/Hora', 'Serviços', 'Estimado', 'Pagamento', 'Status']];
    C.solicitacoes().filter(p => noPeriodo(p, periodo)).forEach(p => {
      const d = new Date(p.quando);
      linhas.push([p.numero, d.toLocaleDateString('pt-BR'), p.nome, p.whats || '', p.tipoAtendimento, p.profissional || '', `${dataBR(p.dataDesejada)} ${p.horaDesejada || ''}`.trim(),
        (p.servicos || []).map(s => s.nome).join(' + '), preco(p.total), p.pagamento || '', STATUS[p.status] || p.status]);
    });
    const csv = '\uFEFF' + linhas.map(l => l.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(';')).join('\r\n');
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })), download: `agenda-${V.nome.toLowerCase().replace(/\W+/g, '-')}.csv` });
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  /* ---------- Serviços ---------- */
  let busca = '', filtroCat = '';
  function servicosTela() {
    const ds = D(), b = busca.trim().toLowerCase();
    const cats = ds.categorias.filter(c => !filtroCat || c.id === filtroCat);
    const html = cats.map(c => {
      const ps = ds.servicos.filter(s => s.cat === c.id && (!b || (s.nome + ' ' + s.desc).toLowerCase().includes(b)));
      if (!ps.length) return b ? '' : `<div class="grupo-cat">${esc(c.nome)}</div><p class="vazio" style="padding:12px">Nenhum serviço nesta categoria.</p>`;
      return `<div class="grupo-cat">${esc(c.nome)} · ${ps.length}</div><div class="linhas">${ps.map(s => `
        <div class="linha-prod${s.pausado ? ' apagado' : ''}">
          ${s.foto ? `<img src="${esc(s.foto)}" alt="">` : `<span class="sem-foto">${ic('imagem')}</span>`}
          <div style="min-width:0"><b>${esc(s.nome)}</b><small>${esc(C.precoPlanoTxt(s))}${s.duracao ? ` · ${esc(C.duracaoTxt(s.duracao))}` : ''}${s.pausado ? ' · escondido' : ''}</small></div>
          <div class="acoes">
            ${pode('servicos') ? `<button type="button" class="tog tog-destaque" data-tog="destaque" data-id="${s.id}" aria-pressed="${!!s.destaque}">${ic('estrela')}Destaque</button>
            <button type="button" class="btn btn-ic" data-mover="-1" data-id="${s.id}" aria-label="Subir">${ic('cima')}</button>
            <button type="button" class="btn btn-ic" data-mover="1" data-id="${s.id}" aria-label="Descer">${ic('baixo')}</button>
            <button type="button" class="btn btn-peq" data-editar="${s.id}">${ic('editar')}Editar</button>` : ''}
          </div></div>`).join('')}</div>`;
    }).join('');
    P().innerHTML = cab('Serviços', `${ds.servicos.length} serviços cadastrados.`, pode('criar') ? `<button type="button" class="btn btn-p" data-novo>${ic('mais')}Novo serviço</button>` : '') +
      `<div class="barra-ferr"><input class="entrada" style="max-width:320px" type="search" data-busca placeholder="Buscar serviço" value="${esc(busca)}">
        <select class="entrada" style="max-width:220px" data-filtro-cat><option value="">Todas as categorias</option>${ds.categorias.map(c => `<option value="${c.id}"${filtroCat === c.id ? ' selected' : ''}>${esc(c.nome)}</option>`).join('')}</select></div>
      ${html || '<p class="vazio">Nenhum serviço encontrado.</p>'}`;
  }
  function editarServico(id) {
    const ds = D(), novo = !id;
    const s = novo ? { id: C.novoId('s'), nome: '', desc: '', preco: 0, precoTipo: ehOrcamento ? 'orcamento' : 'fixo', duracao: 45, cat: filtroCat || ds.categorias[0]?.id, foto: '', destaque: false, pausado: false } : C.copia(C.servico(id));
    const j = janela(novo ? 'Novo serviço' : 'Editar serviço', `
      <div class="foto-edit">${s.foto ? `<img class="previa" src="${esc(s.foto)}" alt="" data-previa>` : `<span class="previa" data-previa>${ic('imagem')}</span>`}
        <div><label class="btn btn-peq">${ic('foto')}Escolher foto<input type="file" accept="image/*" data-foto hidden></label>
        ${s.foto ? `<button type="button" class="btn btn-peq btn-perigo" data-tirar-foto>Tirar foto</button>` : ''}</div></div>
      <label class="campo"><span>Nome do serviço</span><input class="entrada" data-c="nome" value="${esc(s.nome)}" maxlength="64" required></label>
      <label class="campo"><span>Descrição</span><textarea class="entrada" data-c="desc" maxlength="180">${esc(s.desc)}</textarea></label>
      <div class="lado2">
        <label class="campo"><span>Tipo de preço</span><select class="entrada" data-c="precoTipo">
          <option value="fixo"${s.precoTipo === 'fixo' ? ' selected' : ''}>Preço fixo</option>
          <option value="apartir"${s.precoTipo === 'apartir' ? ' selected' : ''}>A partir de</option>
          <option value="orcamento"${s.precoTipo === 'orcamento' ? ' selected' : ''}>Sob orçamento</option>
        </select></label>
        <label class="campo"><span>Valor (R$)</span><input class="entrada" data-c="preco" inputmode="decimal" value="${preco(s.preco)}"></label>
      </div>
      <div class="lado2">
        <label class="campo"><span>Duração (minutos, 0 = sem)</span><input class="entrada" type="number" min="0" data-c="duracao" value="${+s.duracao || 0}"></label>
        <label class="campo"><span>Categoria</span><select class="entrada" data-c="cat">${ds.categorias.map(c => `<option value="${c.id}"${c.id === s.cat ? ' selected' : ''}>${esc(c.nome)}</option>`).join('')}</select></label>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:18px;margin-top:6px">
        <label class="chave"><input type="checkbox" data-c="destaque"${s.destaque ? ' checked' : ''}><span class="trilho"></span><span>Destaque</span></label>
        <label class="chave"><input type="checkbox" data-c="visivel"${!s.pausado ? ' checked' : ''}><span class="trilho"></span><span>Aparece no site</span></label></div>`,
      `<div style="display:flex;gap:8px">${novo || !pode('criar') ? '' : `<button type="button" class="btn btn-perigo" data-excluir>${ic('lixo')}Excluir</button>`}</div>
       <div style="display:flex;gap:8px"><button type="button" class="btn" data-fechar>Cancelar</button><button type="button" class="btn btn-p" data-salvar>${ic('check')}Salvar</button></div>`);
    const w = j.el;
    $('[data-foto]', w).addEventListener('change', async e => {
      const f = e.target.files[0]; if (!f) return;
      try { s.foto = await reduzirFoto(f); $('[data-previa]', w).outerHTML = `<img class="previa" src="${s.foto}" alt="" data-previa>`; } catch { salvo('Não deu para abrir essa foto', 'info'); }
    });
    w.addEventListener('click', e => {
      if (e.target.closest('[data-tirar-foto]')) { s.foto = ''; $('[data-previa]', w).outerHTML = `<span class="previa" data-previa>${ic('imagem')}</span>`; e.target.closest('[data-tirar-foto]').remove(); }
      if (e.target.closest('[data-salvar]')) {
        const v = k => $(`[data-c="${k}"]`, w);
        s.nome = v('nome').value.trim(); s.desc = v('desc').value.trim(); s.precoTipo = v('precoTipo').value; s.preco = num(v('preco').value); s.duracao = +v('duracao').value || 0; s.cat = v('cat').value;
        s.destaque = v('destaque').checked; s.pausado = !v('visivel').checked;
        if (!s.nome) { v('nome').focus(); salvo('Dê um nome ao serviço', 'info'); return; }
        const l = D().servicos, i = l.findIndex(x => x.id === s.id);
        if (i >= 0) l[i] = s; else l.push(s);
        salvar(novo ? 'Serviço criado' : 'Serviço salvo'); j.fechar(); servicosTela();
      }
      if (e.target.closest('[data-excluir]') && confirm(`Excluir "${s.nome}"?`)) { D().servicos = D().servicos.filter(x => x.id !== s.id); salvar('Serviço excluído'); j.fechar(); servicosTela(); }
    });
  }

  /* ---------- Categorias ---------- */
  function categorias() {
    const ds = D();
    P().innerHTML = cab('Categorias', 'Grupos de serviços exibidos no site.') +
      `<div class="cartao"><div class="linhas">${ds.categorias.map((c, i) => { const n = ds.servicos.filter(s => s.cat === c.id).length; return `
        <div class="linha-prod" style="grid-template-columns:auto 1fr auto"><button type="button" class="btn btn-ic icone-cat" data-icone-cat="${c.id}" title="Escolher ícone">${c.icone ? ic(c.icone) : ic('mais')}</button>
          <input class="entrada" data-cat-nome="${c.id}" value="${esc(c.nome)}" maxlength="40">
          <div class="acoes"><small style="margin-right:6px">${n} ${n === 1 ? 'serviço' : 'serviços'}</small>
            <button type="button" class="btn btn-ic" data-mover-cat="-1" data-i="${i}"${i === 0 ? ' disabled' : ''}>${ic('cima')}</button>
            <button type="button" class="btn btn-ic" data-mover-cat="1" data-i="${i}"${i === ds.categorias.length - 1 ? ' disabled' : ''}>${ic('baixo')}</button>
            <button type="button" class="btn btn-ic btn-perigo" data-apagar-cat="${c.id}"${n ? ' disabled' : ''}>${ic('lixo')}</button></div></div>`; }).join('')}</div>
        <form data-nova-cat style="display:flex;gap:8px;margin-top:14px"><input class="entrada" name="nome" placeholder="Nova categoria" maxlength="40" required><button class="btn btn-p">${ic('mais')}Adicionar</button></form></div>`;
  }

  /* ---------- Galeria e Depoimentos ---------- */
  function portfolio() {
    P().innerHTML = cab('Galeria e avaliações', 'Fotos dos seus trabalhos/espaço e depoimentos de clientes.') + `
    <div class="cartao"><h2>Portfólio / Galeria (${galeria().length})</h2><p class="sub">Mostre fotos reais do seu trabalho, espaço ou antes e depois.</p>
      <div class="linhas">${galeria().map((g, i) => `<div class="linha-prod">
        ${g.foto ? `<img src="${esc(g.foto)}" alt="">` : `<span class="sem-foto">${ic('imagem')}</span>`}
        <input class="entrada" data-gal-leg="${i}" value="${esc(g.legenda || '')}" maxlength="70" placeholder="Legenda da foto">
        <button type="button" class="btn btn-ic btn-perigo" data-tirar-gal="${i}" aria-label="Remover">${ic('lixo')}</button></div>`).join('') || '<p class="sub">Nenhuma foto ainda.</p>'}</div>
      <label class="btn btn-peq" style="margin-top:12px">${ic('foto')}Adicionar foto<input type="file" accept="image/*" data-nova-gal hidden></label></div>
    <div class="cartao"><h2>Depoimentos (${depoimentos().length})</h2><p class="sub">Avaliações reais que geram confiança para novos clientes.</p>
      ${depoimentos().map((d, i) => `<div class="cartao" style="padding:12px;margin-bottom:10px" data-dep="${i}">
        <div class="lado2"><input class="entrada" data-dep-c="autor" value="${esc(d.autor)}" maxlength="40" placeholder="Nome do cliente">
          <input class="entrada" data-dep-c="detalhe" value="${esc(d.detalhe || '')}" maxlength="40" placeholder="Ex.: Cliente há 2 anos"></div>
        <textarea class="entrada" style="margin-top:8px" data-dep-c="texto" maxlength="220" placeholder="Depoimento">${esc(d.texto)}</textarea>
        <div style="display:flex;justify-content:flex-end;margin-top:8px"><button type="button" class="btn btn-peq btn-perigo" data-tirar-dep="${i}">${ic('lixo')}Remover</button></div></div>`).join('')}
      <button type="button" class="btn btn-peq" data-mais-dep>${ic('mais')}Novo depoimento</button></div>`;
  }

  /* ---------- Funcionamento ---------- */
  function negocioTela() {
    const l = D().negocio, m = MODO_AT(), soOnline = m === 'online';
    const basePags = soOnline ? ['Pix', 'Cartão de crédito (link)', 'Transferência'] : ['Pix', 'Cartão de crédito', 'Cartão de débito', 'Dinheiro'];
    const todosPags = [...new Set([...basePags, ...(l.pagamentos || [])])];
    const qrBase = new URL('index.html', location.href).href.replace(/index\.html$/, '');
    const svg = window.QRCodeSVG ? window.QRCodeSVG(qrBase, '#1d1a17') : '';
    P().innerHTML = cab('Funcionamento', 'Horários, atendimento, pagamento, cupons e contato.') + `
    <div class="cartao"><h2>Agenda aberta ou pausada</h2><p class="sub">Use em férias, feriados ou quando a agenda estiver lotada.</p>
      <label class="chave"><input type="checkbox" data-l="fechadaAgora"${l.fechadaAgora ? ' checked' : ''}><span class="trilho"></span><span><b>Pausar agendamentos agora</b></span></label>
      <label class="campo" style="margin-top:12px"><span>Aviso quando pausada</span><input class="entrada" data-l="avisoFechada" value="${esc(l.avisoFechada || '')}" maxlength="120"></label></div>
    <div class="cartao"><h2>Horário de atendimento</h2>
      <div class="dias">${C.DIAS.map((d, i) => { const h = (l.horario[i] || [])[0]; return `<div class="dia"><b>${d}</b>
        <label class="chave"><input type="checkbox" data-dia="${i}"${h ? ' checked' : ''}><span class="trilho"></span></label>
        <input class="entrada" type="time" data-de="${i}" value="${h ? h[0] : '09:00'}"${h ? '' : ' disabled'}>
        <input class="entrada" type="time" data-ate="${i}" value="${h ? h[1] : '19:00'}"${h ? '' : ' disabled'}></div>`; }).join('')}</div></div>
    ${usaDomicilio() ? `<div class="cartao"><h2>Bairros atendidos (a domicílio / visita)</h2>
      <label class="campo"><span>Separe por vírgula</span><input class="entrada" data-bairros-txt value="${esc((l.bairros || []).join(', '))}" placeholder="Icaraí, Centro, Ingá, São Francisco"></label></div>` : ''}
    <div class="cartao"><h2>Formas de pagamento</h2>${C.visual.pagOnline
      ? `<p class="sub"><b>Pagamento online ativo (${C.visual.pagOnline === 'infinitepay' ? 'InfinitePay' : 'Mercado Pago'}):</b> receba sinal ou consulta por Pix/cartão direto na sua conta.</p>
        ${C.visual.pagOnline === 'infinitepay'
          ? `<label class="campo" style="max-width:340px"><span>Sua InfiniteTag (handle sem o $)</span><input class="entrada" data-l="infiniteTag" value="${esc(l.infiniteTag || '')}" maxlength="40" placeholder="Ex.: meunegocio"></label>`
          : `<button type="button" class="btn btn-p btn-peq" data-conectar-mp>${ic('cadeado')}Conectar conta Mercado Pago</button>`}`
      : `<p class="sub">Informam o cliente como pagar. Quer receber sinal/consulta online via <b>Mercado Pago</b> ou <b>InfinitePay</b>? Fale com o Studio Magalhães (+ R$ 25/mês).</p>
      <div class="checks">${todosPags.map(pg => `<label><input type="checkbox" data-pag="${esc(pg)}"${(l.pagamentos || []).includes(pg) ? ' checked' : ''}>${esc(pg)}</label>`).join('')}</div>`}</div>
    <div class="cartao"><h2>Cupons de 1ª visita / promoções</h2><p class="sub">Marque <b>1 uso</b> para limitar cada cupom a 1 utilização por cliente.</p>
      ${cupons().map((cp, i) => `<div class="cupom-row" data-cp="${i}">
        <input class="entrada" data-cp-c="codigo" value="${esc(cp.codigo)}" maxlength="24" placeholder="Ex.: BEMVINDO10">
        <select class="entrada" data-cp-c="tipo"><option value="pct"${cp.tipo !== 'valor' ? ' selected' : ''}>% off</option><option value="valor"${cp.tipo === 'valor' ? ' selected' : ''}>R$ off</option></select>
        <input class="entrada" data-cp-c="valor" inputmode="decimal" value="${cp.tipo === 'valor' ? preco(cp.valor) : (+cp.valor || 0)}">
        <input class="entrada" data-cp-c="minimo" inputmode="decimal" value="${preco(cp.minimo || 0)}" title="Valor mínimo">
        <label class="chave"><input type="checkbox" data-cp-c="usoUnico"${cp.usoUnico !== false ? ' checked' : ''}><span class="trilho"></span><span style="font-size:.78rem">1 uso</span></label>
        <label class="chave"><input type="checkbox" data-cp-c="ativo"${cp.ativo !== false ? ' checked' : ''}><span class="trilho"></span><span style="font-size:.78rem">Ativo</span></label>
        <button type="button" class="btn btn-ic btn-perigo" data-tirar-cp="${i}">${ic('x')}</button></div>`).join('') || '<p class="sub">Nenhum cupom criado.</p>'}
      <button type="button" class="btn btn-peq" data-mais-cp>${ic('mais')}Novo cupom</button></div>
    <div class="cartao"><h2>${soOnline ? 'Contato (atendimento online)' : 'Contato e endereço'}</h2>
      <label class="campo"><span>WhatsApp que recebe os agendamentos/orçamentos</span><input class="entrada" data-l="whats" inputmode="tel" value="${esc(l.whats)}"></label>
      <div class="lado2">${soOnline ? '' : `<label class="campo"><span>Endereço</span><input class="entrada" data-l="endereco" value="${esc(l.endereco)}"></label>`}
        <label class="campo"><span>Cidade / Estado</span><input class="entrada" data-l="cidade" value="${esc(l.cidade)}"></label></div></div>
    ${svg ? `<div class="cartao"><h2>QR Code do negócio (recepção, cartão e divulgação)</h2>
      <div class="qr-caixa"><div class="qr-previa">${svg}</div><div><p class="sub">Coloque na recepção, no cartão de visita ou no balcão para o cliente agendar em segundos.</p>
        <button type="button" class="btn btn-peq" data-qr-copiar="${esc(qrBase)}">${ic('copiar2')}Copiar link do site</button></div></div></div>` : ''}
    ${N.demo ? `<div class="cartao"><h2>Demonstração</h2><button type="button" class="btn btn-perigo" data-restaurar>${ic('desfazer')}Restaurar demonstração</button></div>` : ''}`;
  }

  /* ---------- Equipe & Profissionais ---------- */
  const MODELOS_FUNC = {
    recepcao: { nome: 'Recepção', p: ['agenda', 'situacao'] },
    profissional: { nome: 'Profissional', p: ['agenda', 'situacao'] },
    gerente: { nome: 'Gerente', p: ['agenda', 'situacao', 'valores', 'servicos', 'criar', 'funcionamento'] }
  };
  function equipeTela() {
    const eq = equipe(), profs = profissionais(), noLim = eq.length >= LIMITE_EQUIPE;
    P().innerHTML = cab('Equipe e profissionais', `Acessos à Área do negócio (${eq.length}/${LIMITE_EQUIPE}) e profissionais exibidos no site.`,
      `<button type="button" class="btn btn-p" data-novo-func${noLim ? ' disabled' : ''}>${ic('mais')}Novo acesso</button>`) + `
    <div class="cartao"><h2>Profissionais exibidos no site (${profs.length})</h2><p class="sub">Aparecem na seção de equipe e na escolha de profissional ao agendar.</p>
      ${profs.map((pr, i) => `<div class="cartao" style="padding:12px;margin-bottom:10px" data-pr="${i}">
        <div class="lado2"><input class="entrada" data-pr-c="nome" value="${esc(pr.nome)}" maxlength="40" placeholder="Nome completo">
          <input class="entrada" data-pr-c="cargo" value="${esc(pr.cargo || '')}" maxlength="40" placeholder="Especialidade / Cargo"></div>
        <div class="lado2" style="margin-top:8px"><input class="entrada" data-pr-c="registro" value="${esc(pr.registro || '')}" maxlength="30" placeholder="Registro (CRO, OAB, CREA — opcional)">
          <input class="entrada" data-pr-c="bio" value="${esc(pr.bio || '')}" maxlength="120" placeholder="Resumo curto"></div>
        <div style="display:flex;justify-content:flex-end;margin-top:8px"><button type="button" class="btn btn-peq btn-perigo" data-tirar-pr="${i}">${ic('lixo')}Remover</button></div></div>`).join('') || '<p class="sub">Nenhum profissional listado.</p>'}
      <button type="button" class="btn btn-peq" data-mais-pr>${ic('mais')}Adicionar profissional</button></div>
    <div class="cartao"><h2>Acessos com PIN (${eq.length}/${LIMITE_EQUIPE})</h2><p class="sub">Seu plano inclui dono + até ${LIMITE_EQUIPE} acessos (extras: + R$ 10/mês cada).</p>
      ${eq.map(f => `<div class="cartao" style="padding:12px;margin-bottom:10px" data-func="${esc(f.id)}">
        <div class="lado2"><label class="campo"><span>Nome</span><input class="entrada" data-func-campo="nome" value="${esc(f.nome)}" maxlength="40"></label>
          <label class="campo"><span>PIN (4 a 6 números)</span><input class="entrada" data-func-campo="pin" inputmode="numeric" value="${esc(f.pin)}" maxlength="6"></label></div>
        <div class="checks">${PERMISSOES.map(([id, n]) => `<label><input type="checkbox" data-perm="${id}"${(f.permissoes || {})[id] ? ' checked' : ''}>${n}</label>`).join('')}</div>
        <div style="display:flex;justify-content:flex-end;margin-top:8px"><button type="button" class="btn btn-peq btn-perigo" data-apagar-func>${ic('lixo')}Remover acesso</button></div></div>`).join('') || '<p class="sub">Nenhum acesso extra cadastrado.</p>'}</div>`;
  }

  function visual() {
    const T = C.textos, f = n => n.split(',')[0].replace(/'/g, '');
    P().innerHTML = cab('Visual do site', 'Cores, logo, fontes e textos da apresentação.') + `
    <div class="cartao travado"><div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
      <span class="sigla" style="margin:0;width:64px;height:64px;font-size:1.7rem">${siglaHTML()}</span>
      <div><b style="font:800 1.4rem/1.1 ${V.fontes.t.replace(/"/g, "'")}">${esc(V.nome)}</b><div style="color:var(--suave)">${esc(V.segmento)}</div></div></div>
      <h2 style="margin-top:20px">Cores</h2><div class="cores" style="margin-top:8px">${[['Principal', V.cores.p], ['Destaque', V.cores.d], ['Escura', V.cores.escuro], ['Fundo', V.cores.fundo]].map(([n, c]) => `<span class="cor"><i style="background:${c}"></i>${n}</span>`).join('')}</div>
      <h2 style="margin-top:20px">Fontes</h2><p style="font:700 1.5rem/1.2 ${V.fontes.t.replace(/"/g, "'")};margin:6px 0 0">${esc(f(V.fontes.t))}</p>
      <h2 style="margin-top:20px">Textos do topo</h2><p style="margin:6px 0 0"><b>${esc(T.titulo)}</b><br><span style="color:var(--suave)">${esc(T.sub)}</span></p></div>
    <div class="nota-studio">${ic('info')}<div>O visual é configurado pelo <b>Studio Magalhães</b>. Mudanças de visual são feitas como atualização avulsa; <b>correção de erros é sempre gratuita</b>.</div></div>`;
  }

  function manual() {
    const sec = (t, html, destaque) => `<details${destaque ? ' open class="destaque-manual"' : ''}><summary>${t}</summary><div class="texto">${html}</div></details>`;
    P().innerHTML = cab('Manual do negócio', 'Passo a passo rápido para usar sua Área do negócio.') + `<div class="manual">
      ${sec('Como funcionam a Agenda e os Orçamentos', `<p>Cada cliente que preenche o agendamento ou orçamento no site entra na aba <b>${ehOrcamento ? 'Orçamentos' : 'Agenda'}</b> como <b>Novo</b>.</p>
        <ul><li>Use <b>Confirmar / Responder</b> para abrir o WhatsApp do cliente já com a mensagem pronta.</li>
        ${!ehOrcamento ? '<li>Depois de confirmado, o botão <b>Lembrete</b> envia uma mensagem pronta lembrando dia e horário.</li>' : ''}
        <li>Exporte tudo para planilha CSV com 1 toque.</li></ul>`, true)}
      ${sec('Serviços, preços e duração', `<p>Em <b>Serviços</b>, você pode cadastrar cada serviço com <b>preço fixo</b>, <b>a partir de</b> ou <b>sob orçamento</b>, além da duração estimada em minutos.</p>`)}
      ${sec('Galeria e depoimentos', `<p>Em <b>Galeria & Aval.</b>, suba fotos reais dos seus trabalhos ou espaço e adicione avaliações de clientes satisfeitos.</p>`)}
      ${sec('Pagamento online (Mercado Pago e InfinitePay)', `<p>Se ativar o módulo de pagamento online (+ R$ 25/mês), o cliente paga sinal ou atendimento direto no site por Pix ou cartão e o dinheiro cai na sua própria conta (Mercado Pago OAuth ou InfinitePay com Pix taxa zero).</p>`)}
      ${sec('Cupons e QR Code', `<p>Em <b>Funcionamento</b>, crie cupons de 1ª visita com trava de <b>1 uso por cliente</b> e baixe o QR Code do seu site para recepção e cartões.</p>`)}
    </div>`;
  }

  /* ---------- Eventos ---------- */
  el.addEventListener('click', e => {
    const t = e.target, b = t.closest('button'); if (!b || !el.contains(b)) return;
    const ds = D(), d = b.dataset;
    if (d.confirmarWhats) {
      const l = C.solicitacoes(), p = l.find(x => x.numero === +d.confirmarWhats); if (!p) return;
      p.status = 'confirmado'; p.por = quem().nome; C.salvarSolicitacoes(l); render();
      const numCli = whatsLimpo(p.whats);
      const msg = ehOrcamento
        ? `Olá, ${p.nome}! Aqui é da *${V.nome}*. Recebemos seu pedido de orçamento nº ${p.numero} e já vamos te passar os detalhes!`
        : `Olá, ${p.nome}! Aqui é da *${V.nome}*. Seu horário${p.dataDesejada ? ` para ${dataBR(p.dataDesejada)}` : ''}${p.horaDesejada ? ` às ${p.horaDesejada}` : ''} está *confirmado*! Te esperamos.`;
      if (numCli) window.open(`https://wa.me/${numCli}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      return;
    }
    if (d.lembreteWhats) {
      const p = C.solicitacoes().find(x => x.numero === +d.lembreteWhats); if (!p) return;
      const numCli = whatsLimpo(p.whats);
      const msg = `Olá, ${p.nome}! Passando para lembrar do seu agendamento na *${V.nome}*${p.dataDesejada ? ` no dia ${dataBR(p.dataDesejada)}` : ''}${p.horaDesejada ? ` às ${p.horaDesejada}` : ''}. Qualquer imprevisto, nos avise por aqui!`;
      if (numCli) window.open(`https://wa.me/${numCli}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      return;
    }
    if (d.cancelarSol && pode('situacao')) {
      const l = C.solicitacoes(), p = l.find(x => x.numero === +d.cancelarSol); if (!p) return;
      const mot = prompt('Motivo do cancelamento (opcional):', 'Horário indisponível');
      if (mot === null) return;
      p.status = 'cancelado'; p.por = quem().nome; p.motivoCancelamento = mot.trim(); C.salvarSolicitacoes(l); salvo('Solicitação cancelada'); render();
      const numCli = whatsLimpo(p.whats);
      if (numCli && confirm('Abrir WhatsApp para avisar o cliente?')) {
        window.open(`https://wa.me/${numCli}?text=${encodeURIComponent(`Olá, ${p.nome}! Aqui é da ${V.nome}. Precisamos cancelar/reagendar sua solicitação nº ${p.numero}${mot ? ` (${mot})` : ''}. Podemos escolher outro horário?`)}`, '_blank', 'noopener');
      }
      return;
    }
    if (b.closest('[data-periodo]') && d.v) { periodo = d.v; agenda(); return; }
    if (b.closest('[data-filtro]') && d.v) { filtroStatus = d.v; agenda(); return; }
    if (d.exemplos !== undefined) { criarExemplos(); render(); return; }
    if (d.csv !== undefined) { baixarCSV(); return; }
    if (d.apagarSols !== undefined && confirm('Apagar todas as solicitações de exemplo?')) { C.salvarSolicitacoes([]); render(); return; }
    if (d.tog) { const s = C.servico(d.id); s[d.tog] = !s[d.tog]; salvar(); servicosTela(); return; }
    if (d.mover) { const l = ds.servicos, i = l.findIndex(x => x.id === d.id), j = i + +d.mover; if (j >= 0 && j < l.length) { [l[i], l[j]] = [l[j], l[i]]; salvar('Ordem salva'); servicosTela(); } return; }
    if (d.editar) { editarServico(d.editar); return; }
    if (d.novo !== undefined) { editarServico(null); return; }
    if (d.moverCat) { const i = +d.i, j = i + +d.moverCat, l = ds.categorias; [l[i], l[j]] = [l[j], l[i]]; salvar('Ordem salva'); categorias(); return; }
    if (d.iconeCat) {
      const c = C.categoria(d.iconeCat);
      const j = janela(`Ícone de "${c.nome}"`, `<div class="grade-icones">${(window.ICONES_SERVICO || []).map(n => `<button type="button" class="btn" data-escolher-icone="${n}" aria-pressed="${c.icone === n}">${ic(n)}</button>`).join('')}</div>`);
      j.el.addEventListener('click', ev => { const x = ev.target.closest('[data-escolher-icone]'); if (!x) return; c.icone = x.dataset.escolherIcone; salvar('Ícone salvo'); j.fechar(); categorias(); });
      return;
    }
    if (d.apagarCat) { const c = C.categoria(d.apagarCat); if (confirm(`Excluir "${c.nome}"?`)) { ds.categorias = ds.categorias.filter(x => x.id !== c.id); salvar('Categoria excluída'); categorias(); } return; }
    if (d.tirarGal !== undefined) { galeria().splice(+d.tirarGal, 1); salvar('Foto removida'); portfolio(); return; }
    if (d.maisDep !== undefined) { depoimentos().push({ autor: 'Novo cliente', detalhe: '', texto: 'Ótimo atendimento e resultado impecável!' }); salvar('Depoimento adicionado'); portfolio(); return; }
    if (d.tirarDep !== undefined) { depoimentos().splice(+d.tirarDep, 1); salvar('Depoimento removido'); portfolio(); return; }
    if (d.maisCp !== undefined) { cupons().push({ codigo: 'BEMVINDO10', tipo: 'pct', valor: 10, minimo: 0, usoUnico: true, ativo: true }); salvar('Cupom criado'); negocioTela(); return; }
    if (d.tirarCp !== undefined) { cupons().splice(+d.tirarCp, 1); salvar('Cupom excluído'); negocioTela(); return; }
    if (d.conectarMp !== undefined) { salvo('Na versão publicada, abre o login OAuth seguro do Mercado Pago.', 'info'); return; }
    if (d.qrCopiar) { navigator.clipboard?.writeText(d.qrCopiar).then(() => salvo('Link copiado')).catch(() => {}); return; }
    if (d.restaurar !== undefined && confirm('Restaurar a demonstração original?')) { C.restaurar(); salvo('Restaurado'); negocioTela(); return; }
    if (d.maisPr !== undefined) { profissionais().push({ nome: 'Novo profissional', cargo: 'Especialista', registro: '', bio: '', ativo: true }); salvar('Profissional adicionado'); equipeTela(); return; }
    if (d.tirarPr !== undefined) { profissionais().splice(+d.tirarPr, 1); salvar('Profissional removido'); equipeTela(); return; }
    if (d.novoFunc !== undefined && quem().dono && equipe().length < LIMITE_EQUIPE) {
      equipe().push({ id: C.novoId('f'), nome: 'Recepção', pin: String(1000 + Math.floor(Math.random() * 9000)), ativo: true, permissoes: { agenda: true, situacao: true } }); salvar('Acesso criado'); equipeTela(); return;
    }
    if (d.apagarFunc !== undefined && quem().dono) { const id = b.closest('[data-func]').dataset.func; ds.equipe = equipe().filter(x => x.id !== id); salvar('Acesso removido'); equipeTela(); }
  });
  el.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.matches('[data-nova-cat]')) { D().categorias.push({ id: C.novoId('c'), nome: e.target.nome.value.trim(), icone: 'sv-estrela' }); salvar('Categoria criada'); categorias(); }
  });
  el.addEventListener('input', e => {
    const t = e.target, ds = D(), d = t.dataset;
    if (t.matches('[data-busca]')) { busca = t.value; servicosTela(); $('[data-busca]')?.focus(); return; }
    if (d.catNome) { C.categoria(d.catNome).nome = t.value; salvarDepois(); return; }
    if (d.galLeg !== undefined) { galeria()[+d.galLeg].legenda = t.value; salvarDepois(); return; }
    if (d.depC) { depoimentos()[+t.closest('[data-dep]').dataset.dep][d.depC] = t.value; salvarDepois(); return; }
    if (d.prC) { profissionais()[+t.closest('[data-pr]').dataset.pr][d.prC] = t.value; salvarDepois(); return; }
    if (d.funcCampo && quem().dono) { const f = equipe().find(x => x.id === t.closest('[data-func]').dataset.func); f[d.funcCampo] = d.funcCampo === 'pin' ? t.value.replace(/\D/g, '').slice(0, 6) : t.value; salvarDepois(); return; }
    if (d.cpC && t.type !== 'checkbox' && t.tagName !== 'SELECT') { const cp = cupons()[+t.closest('[data-cp]').dataset.cp]; cp[d.cpC] = d.cpC === 'codigo' ? t.value.toUpperCase().replace(/\s+/g, '') : num(t.value); salvarDepois(); return; }
    if (t.matches('[data-bairros-txt]')) { ds.negocio.bairros = t.value.split(',').map(x => x.trim()).filter(Boolean); salvarDepois(); return; }
    if (d.l && t.type !== 'checkbox') { ds.negocio[d.l] = t.value; salvarDepois(); return; }
    if (d.de || d.ate) { const i = d.de || d.ate, h = ds.negocio.horario[i]; if (h && h[0]) { h[0][d.de ? 0 : 1] = t.value; salvarDepois(); } }
  });
  el.addEventListener('change', async e => {
    const t = e.target, ds = D(), d = t.dataset;
    if (t.matches('[data-filtro-cat]')) { filtroCat = t.value; servicosTela(); return; }
    if (t.matches('[data-filtro-prof]')) { filtroProf = t.value; agenda(); return; }
    if (t.matches('[data-nova-gal]') && t.files[0]) { try { const foto = await reduzirFoto(t.files[0]); galeria().push({ foto, legenda: '' }); salvar('Foto adicionada'); portfolio(); } catch { salvo('Erro ao abrir foto', 'info'); } return; }
    if (d.statusSol) { const l = C.solicitacoes(), p = l.find(x => x.numero === +d.statusSol); if (p) { p.status = t.value; p.por = quem().nome; C.salvarSolicitacoes(l); salvo('Status atualizado'); render(); } return; }
    if (d.cpC && (t.type === 'checkbox' || t.tagName === 'SELECT')) { const cp = cupons()[+t.closest('[data-cp]').dataset.cp]; cp[d.cpC] = t.type === 'checkbox' ? t.checked : t.value; salvar(); if (t.tagName === 'SELECT') negocioTela(); return; }
    if (d.perm && quem().dono) { const f = equipe().find(x => x.id === t.closest('[data-func]').dataset.func); (f.permissoes ||= {})[d.perm] = t.checked; salvar(); return; }
    if (d.l && t.type === 'checkbox') { ds.negocio[d.l] = t.checked; salvar(); return; }
    if (d.dia) { const i = d.dia; ds.negocio.horario[i] = t.checked ? [[$(`[data-de="${i}"]`).value, $(`[data-ate="${i}"]`).value]] : []; salvar(); negocioTela(); return; }
    if (d.pag) { const l = (ds.negocio.pagamentos ||= []); if (t.checked) { if (!l.includes(d.pag)) l.push(d.pag); } else ds.negocio.pagamentos = l.filter(x => x !== d.pag); salvar(); }
  });
  C.aoMudar(tipo => {
    if (tipo === 'visual') { const nv = C.visual; raiz.setProperty('--p', nv.cores.p); raiz.setProperty('--escuro', nv.cores.escuro); if (entrou() && $('[data-principal]')) render(); return; }
    if (entrou() && $('[data-principal]') && tipo === 'solicitacoes' && aba === 'agenda') render();
  });

  if (entrou()) montar(); else telaEntrar();
})();
