// Contratos · gerador de contratos da área "Clientes fechados".
// Contrato padrão (contrato-padrao.js) + cláusulas ligáveis/editáveis + cláusulas novas,
// assistente Gemini (pelo Apps Script "SM Propostas", mesma chave do painel) e impressão em PDF.
// Os contratos ficam na coleção "contratos" do Firestore; os dados do Studio (contratado)
// ficam em config/contrato. Só a conta do Paulo lê e grava (regras do Firestore).
import { CLAUSULAS, CAMPOS_PADRAO, totalMensal } from "./contrato-padrao.js";

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const STATUS = { rascunho: "Rascunho", enviado: "Enviado ao cliente", assinado: "Assinado" };
const PLANOS = {
  catalogo: [["49,90", "Catálogo digital · R$ 49,90/mês"]],
  premium: [["79,90", "Site premium · R$ 79,90/mês (sem atualizações)"], ["199,90", "Site premium · R$ 199,90/mês (2 atualizações)"]]
};
const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const porExtenso = (d = new Date()) => `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
const ord = (n) => n + "ª";

let ctx;            // { fb, app, toast, ic, lista (fechamentos) }
let contratos = [], meusDados = {}, pararOuvir = null;
let atual = null;   // contrato aberto no editor

export function iniciarContratos(c) { ctx = c; }

// ---------- Dados e montagem do texto ----------
function clausulasAtivas(c) {
  const d = c.dados, out = [];
  for (const cl of CLAUSULAS) {
    const cfg = (c.clausulas || {})[cl.id] || {};
    const cabe = !cl.quando || cl.quando(d);
    if (!cabe || cfg.desligada) continue;
    out.push({ id: cl.id, titulo: cfg.titulo || cl.titulo, texto: cfg.texto ?? cl.texto(d), editada: cfg.texto != null });
  }
  for (const ex of c.extras || []) if (!ex.desligada) out.push({ id: ex.id, titulo: ex.titulo, texto: ex.texto, extra: true });
  // cláusulas extras entram antes do foro (que é sempre a última)
  const foro = out.findIndex((x) => x.id === "foro");
  if (foro >= 0) out.push(out.splice(foro, 1)[0]);
  return out;
}
function qualificacao(c) {
  const d = c.dados, m = meusDados;
  // Qualificação do MEI (formato do CLAUDE.md): "que atua sob a marca", nunca "nome fantasia".
  const contratada = `${m.razao || "[RAZÃO SOCIAL DO MEI]"}, inscrita no CNPJ sob o nº ${m.cnpj || "[CNPJ]"}, que atua sob a marca ${m.marca || "Studio Magalhães"}, com sede em ${m.endereco || "[ENDEREÇO]"}, representada por ${m.representante || "[NOME DO REPRESENTANTE]"}, inscrito no CPF sob o nº ${m.cpf || "[CPF]"}, e-mail ${m.email || "[E-MAIL]"}, doravante chamada STUDIO MAGALHÃES ou CONTRATADA`;
  const doc = String(d.clienteDoc || "").replace(/\D/g, "");
  const pj = doc.length > 11;
  const contratante = `${d.clienteNome || "[NOME OU RAZÃO SOCIAL DO CLIENTE]"}, inscrito(a) no ${pj ? "CNPJ" : "CPF"} sob o nº ${d.clienteDoc || "[CPF/CNPJ]"}, com endereço em ${d.clienteEndereco || "[ENDEREÇO]"}${pj ? `, neste ato representada por ${d.clienteRepresentante || "[NOME DO REPRESENTANTE]"}` : ""}, telefone ${d.clienteTelefone || "[TELEFONE]"}, e-mail ${d.clienteEmail || "[E-MAIL]"}, doravante chamado(a) CONTRATANTE`;
  return { contratada, contratante };
}
export function textoContrato(c) {
  const q = qualificacao(c), cls = clausulasAtivas(c);
  const linhas = ["CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE CRIAÇÃO, HOSPEDAGEM E MANUTENÇÃO DE SITE", "",
    `De um lado, ${q.contratada}; e, de outro, ${q.contratante}, têm entre si justo e acordado o presente contrato, que se regerá pelas cláusulas a seguir.`, ""];
  cls.forEach((cl, i) => { linhas.push(`CLÁUSULA ${ord(i + 1)} – ${cl.titulo.toUpperCase()}`, cl.texto, ""); });
  linhas.push(`E, por estarem de acordo, as partes assinam este contrato${c.dados.testemunhas ? ", junto com as testemunhas abaixo" : ""}.`, "",
    `${meusDados.cidade || "Niterói/RJ"}, ${c.dados.dataAssinatura || porExtenso()}.`);
  return linhas.join("\n");
}
function htmlContrato(c) {
  const q = qualificacao(c), cls = clausulasAtivas(c);
  const marca = (t) => esc(t).replace(/\[[^\]]+\]/g, (m) => `<mark>${m}</mark>`);
  const par = (t) => t.split("\n").map((l) => `<p>${marca(l)}</p>`).join("");
  const assin = (rot, nome) => `<div class="assin"><span></span><b>${esc(rot)}</b><small>${marca(nome)}</small></div>`;
  return `<article class="contrato-doc">
    <h1>Contrato de prestação de serviços de criação, hospedagem e manutenção de site</h1>
    <p>De um lado, ${marca(q.contratada)}; e, de outro, ${marca(q.contratante)}, têm entre si justo e acordado o presente contrato, que se regerá pelas cláusulas a seguir.</p>
    ${cls.map((cl, i) => `<section><h2>Cláusula ${ord(i + 1)} – ${esc(cl.titulo)}</h2>${par(cl.texto)}</section>`).join("")}
    <p>E, por estarem de acordo, as partes assinam este contrato${c.dados.testemunhas ? ", junto com as testemunhas abaixo" : ""}.</p>
    <p class="local">${esc(meusDados.cidade || "Niterói/RJ")}, ${esc(c.dados.dataAssinatura || porExtenso())}.</p>
    <div class="assinaturas">${assin("CONTRATADA", meusDados.razao || "[CONTRATADA]")}${assin("CONTRATANTE", c.dados.clienteNome || "[CONTRATANTE]")}
      ${c.dados.testemunhas ? assin("Testemunha 1", "Nome e CPF") + assin("Testemunha 2", "Nome e CPF") : ""}</div>
  </article>`;
}

// ---------- Firestore ----------
function ouvir() {
  if (pararOuvir) return;
  const { fs, db } = ctx.fb;
  pararOuvir = fs.onSnapshot(fs.query(fs.collection(db, "contratos"), fs.orderBy("atualizadoEm", "desc"), fs.limit(300)), (s) => {
    contratos = s.docs.map((d) => { const x = d.data(); return { id: d.id, ...x, dados: JSON.parse(x.dados || "{}"), clausulas: JSON.parse(x.clausulas || "{}"), extras: JSON.parse(x.extras || "[]") }; });
    if ($("[data-lista-contratos]")) renderLista();
  }, (e) => console.error(e));
  fs.getDoc(fs.doc(db, "config", "contrato")).then((s) => { meusDados = s.exists() ? s.data() : {}; }).catch(() => {});
}
export function pararContratos() { if (pararOuvir) { pararOuvir(); pararOuvir = null; } }
async function salvar(c, msg = "Contrato salvo") {
  const { fs, db } = ctx.fb;
  const doc = { titulo: c.titulo || c.dados.loja || c.dados.clienteNome || "Contrato", cliente: c.dados.clienteNome || "", loja: c.dados.loja || "",
    produto: c.dados.produto, status: c.status || "rascunho", fechamentoId: c.fechamentoId || "",
    dados: JSON.stringify(c.dados), clausulas: JSON.stringify(c.clausulas || {}), extras: JSON.stringify(c.extras || []), atualizadoEm: fs.serverTimestamp() };
  try {
    if (c.id) await fs.setDoc(fs.doc(db, "contratos", c.id), doc, { merge: true });
    else { const r = await fs.addDoc(fs.collection(db, "contratos"), { ...doc, criadoEm: fs.serverTimestamp() }); c.id = r.id; }
    ctx.toast(msg);
  } catch (e) { ctx.toast(navigator.onLine ? "Não deu para salvar" : "Sem internet: salva quando voltar"); }
}

// ---------- Lista ----------
export function telaContratos(alvo) {
  ouvir();
  alvo.innerHTML = `<div class="ferr"><button type="button" class="btn btn-p" data-novo-contrato>${ctx.ic("mais")}Novo contrato</button>
      <button type="button" class="btn" data-meus-dados>${ctx.ic("editar")}Meus dados (contratado)</button></div>
    <p class="resumo">Contrato padrão do Studio, com cláusulas que você liga, edita ou cria, e o Gemini para ajudar. Não substitui a revisão de um advogado.</p>
    <div class="grade" data-lista-contratos></div>`;
  alvo.addEventListener("click", (e) => {
    if (e.target.closest("[data-novo-contrato]")) novoContrato();
    if (e.target.closest("[data-meus-dados]")) editarMeusDados();
    const c = e.target.closest("[data-contrato]"); if (c) abrirEditor(contratos.find((x) => x.id === c.dataset.contrato));
  });
  renderLista();
}
function renderLista() {
  const g = $("[data-lista-contratos]"); if (!g) return;
  g.innerHTML = contratos.length ? contratos.map((c) => `<button type="button" class="cartao cartao-contrato" data-contrato="${esc(c.id)}">
      <span class="corpo" style="padding-top:16px"><b>${esc(c.titulo)}</b><small>${esc(c.cliente || "Sem contratante")} · ${c.produto === "premium" ? "Site premium" : "Catálogo digital"}</small>
      <small>${c.atualizadoEm && c.atualizadoEm.toDate ? c.atualizadoEm.toDate().toLocaleDateString("pt-BR") : ""}</small>
      <span class="selo" data-s="${c.status === "assinado" ? "no-ar" : c.status === "enviado" ? "producao" : "fechado"}">${esc(STATUS[c.status] || "Rascunho")}</span></span></button>`).join("")
    : `<p class="vazio">Nenhum contrato ainda. Toque em “Novo contrato”.</p>`;
}
function novoContrato() {
  const fech = ctx.lista();
  const j = janela("Novo contrato", `<p class="resumo" style="margin:0 0 12px">Comece de um cliente fechado (puxa nome, WhatsApp, plano e negócio) ou em branco.</p>
    <div class="opcoes-contrato">${fech.slice(0, 40).map((f) => `<button type="button" class="btn" data-de="${esc(f.id)}">${esc(f.loja || "Sem nome")}<small>${esc(f.plano || "")}</small></button>`).join("")}
    <button type="button" class="btn btn-p" data-de="">Em branco</button></div>`);
  j.el.addEventListener("click", (e) => {
    const b = e.target.closest("[data-de]"); if (!b) return;
    const f = fech.find((x) => x.id === b.dataset.de);
    const premium = f && /premium/i.test((f.produto || "") + " " + (f.plano || ""));
    const dados = { ...CAMPOS_PADRAO, produto: premium ? "premium" : "catalogo" };
    if (premium) { dados.valorMensal = /199/.test(f.plano) ? "199,90" : "79,90"; dados.atualizacoesMes = /199/.test(f.plano) ? "2" : "0"; dados.permanencia = "0"; }
    if (f) {
      // o painel "$ Valores" do app de modelos grava adicionais, criação, pagamento e modo de entrega
      const ad = (Array.isArray(f.adicionais) ? f.adicionais : []).join(" ");
      const qtd = (rx) => { const m = ad.match(rx); return m ? m[1] : "0"; };
      Object.assign(dados, {
        loja: f.loja || "", clienteNome: f.responsavel || "", clienteTelefone: f.contato || "",
        entregaModo: f.entregaModo || dados.entregaModo,
        formaPagamento: f.formaPagamento || dados.formaPagamento,
        pagamentoOnline: /pagamento online/i.test(ad), dominioProprio: /domínio/i.test(ad), chatIA: /chat/i.test(ad),
        funcExtras: qtd(/\+(\d+) func/i), entExtras: qtd(/\+(\d+) entreg/i)
      });
      if (premium && f.criacao) dados.valorCriacao = Number(f.criacao).toFixed(2).replace(".", ",");
    }
    j.fechar();
    abrirEditor({ titulo: f ? f.loja : "", status: "rascunho", fechamentoId: f ? f.id : "", dados, clausulas: {}, extras: [] });
  });
}
function editarMeusDados() {
  const m = meusDados;
  const j = janela("Meus dados (contratado)", `<p class="resumo" style="margin:0 0 12px">Aparecem em todos os contratos. Ficam guardados só na sua conta, não no código do site.</p>
    <div class="form-grade">${[["razao", "Razão social do MEI (como está no CNPJ)"], ["cnpj", "CNPJ"], ["marca", "Marca (ex.: Studio Magalhães)"], ["endereco", "Endereço da sede"], ["representante", "Representante (seu nome completo)"], ["cpf", "CPF do representante"], ["email", "E-mail"], ["cidade", "Cidade da assinatura (ex.: Niterói/RJ)"], ["foro", "Comarca do foro (ex.: Niterói/RJ)"]]
      .map(([k, n]) => `<label class="campo"><span>${n}</span><input class="entrada" data-m="${k}" value="${esc(m[k] || "")}"></label>`).join("")}</div>
    <button type="button" class="btn btn-p btn-cheio" data-salvar-m style="margin-top:12px">Salvar</button>`);
  j.el.addEventListener("click", async (e) => {
    if (!e.target.closest("[data-salvar-m]")) return;
    $$("[data-m]", j.el).forEach((i) => { meusDados[i.dataset.m] = i.value.trim(); });
    try { await ctx.fb.fs.setDoc(ctx.fb.fs.doc(ctx.fb.db, "config", "contrato"), meusDados, { merge: true }); ctx.toast("Seus dados foram salvos"); j.fechar(); }
    catch { ctx.toast("Não deu para salvar agora"); }
  });
}

// ---------- Editor ----------
function campo(k, nome, extra = "") { return `<label class="campo"><span>${nome}</span><input class="entrada" data-d="${k}" value="${esc(atual.dados[k] ?? "")}" ${extra}></label>`; }
function chave(k, nome) { return `<label class="chave-c"><input type="checkbox" data-d="${k}"${atual.dados[k] ? " checked" : ""}><span>${nome}</span></label>`; }
function abrirEditor(c) {
  atual = JSON.parse(JSON.stringify({ ...c, dados: { ...CAMPOS_PADRAO, ...c.dados } }));
  atual.dados.cidadeForo = atual.dados.cidadeForo || meusDados.foro || "Niterói/RJ";
  const el = document.createElement("div"); el.className = "editor-contrato";
  document.body.appendChild(el); document.body.classList.add("com-editor");
  el.innerHTML = `<header class="ed-topo"><button type="button" class="btn btn-ic" data-fechar-ed aria-label="Voltar">${ctx.ic("x")}</button>
      <input class="entrada ed-titulo" data-titulo value="${esc(atual.titulo || "")}" placeholder="Nome do contrato (ex.: Burguer da Praça)">
      <select class="entrada ed-status" data-status>${Object.entries(STATUS).map(([v, n]) => `<option value="${v}"${atual.status === v ? " selected" : ""}>${n}</option>`).join("")}</select>
      <div class="ed-acoes"><button type="button" class="btn" data-copiar>${ctx.ic("link")}Copiar texto</button><button type="button" class="btn" data-imprimir>${ctx.ic("abrir")}PDF / imprimir</button>
      <button type="button" class="btn btn-p" data-salvar>${ctx.ic("salvar")}Salvar</button></div></header>
    <div class="ed-abas"><button type="button" data-ver="form" aria-pressed="true">Preencher</button><button type="button" data-ver="previa" aria-pressed="false">Ver contrato</button></div>
    <div class="ed-corpo"><div class="ed-form" data-form></div><div class="ed-previa" data-previa></div></div>`;
  renderForm(el); renderPrevia(el);
  el.addEventListener("input", (e) => {
    const t = e.target;
    if (t.dataset.d) {
      atual.dados[t.dataset.d] = t.type === "checkbox" ? t.checked : t.value;
      if (t.type === "checkbox" || t.tagName === "SELECT") renderForm(el);
      renderPrevia(el);
      const tot = $("[data-total] b", el); if (tot) tot.textContent = "R$ " + totalMensal(atual.dados).toFixed(2).replace(".", ",");
    }
    if (t.dataset.titulo !== undefined) atual.titulo = t.value;
    if (t.dataset.status !== undefined) atual.status = t.value;
    if (t.dataset.edTexto) { (atual.clausulas[t.dataset.edTexto] ||= {}).texto = t.value; renderPrevia(el); }
    if (t.dataset.exTitulo) { atual.extras.find((x) => x.id === t.dataset.exTitulo).titulo = t.value; renderPrevia(el); }
    if (t.dataset.exTexto) { atual.extras.find((x) => x.id === t.dataset.exTexto).texto = t.value; renderPrevia(el); }
  });
  el.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.liga) { (atual.clausulas[t.dataset.liga] ||= {}).desligada = !t.checked; renderPrevia(el); }
    if (t.dataset.plano) { const [val, , atu] = t.value.split("|"); atual.dados.valorMensal = val; atual.dados.atualizacoesMes = atu; renderForm(el); renderPrevia(el); }
    if (t.dataset.produto) { atual.dados.produto = t.value; if (t.value === "premium") { atual.dados.permanencia = "0"; atual.dados.valorMensal = "79,90"; } else { atual.dados.permanencia = "6"; atual.dados.valorMensal = "49,90"; atual.dados.atualizacoesMes = "0"; } renderForm(el); renderPrevia(el); }
  });
  el.addEventListener("click", async (e) => {
    const b = e.target.closest("button"); if (!b) return; const d = b.dataset;
    if (d.fecharEd !== undefined) { if (confirm("Fechar o contrato? O que não foi salvo se perde.")) fecharEditor(el); }
    if (d.salvar !== undefined) await salvar(atual);
    if (d.ver) { $$("[data-ver]", el).forEach((x) => x.setAttribute("aria-pressed", String(x === b))); el.dataset.ver = d.ver; }
    if (d.copiar !== undefined) { try { await navigator.clipboard.writeText(textoContrato(atual)); ctx.toast("Texto do contrato copiado"); } catch { ctx.toast("Não deu para copiar"); } }
    if (d.imprimir !== undefined) imprimir();
    if (d.editarCl) { const box = $(`[data-caixa="${d.editarCl}"]`, el); box.hidden = !box.hidden; }
    if (d.padraoCl) { delete (atual.clausulas[d.padraoCl] || {}).texto; renderForm(el); renderPrevia(el); }
    if (d.novaCl !== undefined) { atual.extras.push({ id: "x" + Date.now(), titulo: "Nova cláusula", texto: "" }); renderForm(el); renderPrevia(el); $("[data-extras]", el).lastElementChild?.scrollIntoView({ behavior: "smooth", block: "center" }); }
    if (d.tirarEx) { atual.extras = atual.extras.filter((x) => x.id !== d.tirarEx); renderForm(el); renderPrevia(el); }
    if (d.gemini) await gemini(el, d.gemini);
    if (d.inserir !== undefined) { const r = el._sugestao; if (r) { atual.extras.push({ id: "x" + Date.now(), titulo: r.titulo || "Cláusula nova", texto: r.texto }); renderForm(el); renderPrevia(el); ctx.toast("Cláusula colocada no contrato (antes do foro)"); } }
    if (d.excluir !== undefined && atual.id && confirm("Excluir este contrato? Não dá para desfazer.")) {
      try { await ctx.fb.fs.deleteDoc(ctx.fb.fs.doc(ctx.fb.db, "contratos", atual.id)); fecharEditor(el); ctx.toast("Contrato excluído"); } catch { ctx.toast("Não deu para excluir"); }
    }
  });
}
function fecharEditor(el) { el.remove(); document.body.classList.remove("com-editor", "imprimindo"); atual = null; }
function renderForm(el) {
  const d = atual.dados, premium = d.produto === "premium";
  const lista = CLAUSULAS.filter((cl) => !cl.quando || cl.quando(d));
  const y = $("[data-form]", el).scrollTop;
  $("[data-form]", el).innerHTML = `
    <section class="ed-sec"><h3>1. Contratante (o cliente)</h3><div class="form-grade">
      ${campo("clienteNome", "Nome ou razão social")}${campo("clienteDoc", "CPF ou CNPJ", 'inputmode="numeric"')}
      ${campo("clienteEndereco", "Endereço completo")}${String(d.clienteDoc || "").replace(/\D/g, "").length > 11 ? campo("clienteRepresentante", "Representante (quem assina pela empresa)") : ""}
      ${campo("clienteTelefone", "Telefone / WhatsApp", 'inputmode="tel"')}${campo("clienteEmail", "E-mail", 'type="email"')}</div></section>
    <section class="ed-sec"><h3>2. Serviço e valores</h3><div class="form-grade">
      <label class="campo"><span>Produto</span><select class="entrada" data-produto><option value="catalogo"${!premium ? " selected" : ""}>Catálogo digital</option><option value="premium"${premium ? " selected" : ""}>Site premium</option></select></label>
      <label class="campo"><span>Plano</span><select class="entrada" data-plano>${PLANOS[d.produto].map(([val, n]) => { const atu = val === "199,90" ? "2" : "0"; return `<option value="${val}|x|${atu}"${d.valorMensal === val ? " selected" : ""}>${n}</option>`; }).join("")}</select></label>
      ${campo("loja", "Nome do negócio / site")}${campo("siteEndereco", d.dominioProprio ? "Endereço do site" : "Endereço do site (ex.: loja.sitesm.com.br)")}
      ${premium ? campo("valorCriacao", "Valor da criação (R$)") : ""}${campo("valorMensal", "Mensalidade (R$)")}
      ${campo("diaVencimento", "Dia do vencimento", 'inputmode="numeric"')}${campo("formaPagamento", "Forma de pagamento")}
      ${campo("prazoEntrega", "Prazo de entrega (dias úteis)", 'inputmode="numeric"')}${campo("inicio", "Início previsto (opcional)")}
      ${premium ? "" : campo("produtosIniciais", "Produtos cadastrados pelo Studio", 'inputmode="numeric"')}
      ${campo("atualizacoesMes", "Atualizações incluídas por mês", 'inputmode="numeric"')}${campo("valorAvulsa", "Atualização avulsa (R$)")}
      ${campo("permanencia", "Permanência mínima (meses, 0 = sem)", 'inputmode="numeric"')}${(parseInt(d.permanencia, 10) || 0) > 0 ? campo("multaPermanencia", "Multa se sair antes (% das mensalidades que faltam)", 'inputmode="numeric"') : ""}
      ${campo("carencia", "Carência antes de suspender (dias)", 'inputmode="numeric"')}${campo("avisoPrevio", "Aviso prévio para encerrar (dias)", 'inputmode="numeric"')}
      ${campo("cidadeForo", "Foro (comarca)")}${campo("dataAssinatura", "Data da assinatura (vazio = hoje)")}
      ${premium ? "" : `<label class="campo"><span>Entrega da loja</span><select class="entrada" data-d="entregaModo">${[["entregadores", "Entregadores (por bairro)"], ["correios", "Correios (por CEP)"], ["ambos", "Entregadores e Correios"], ["nenhuma", "Sem entrega (só retirada)"]].map(([v, n]) => `<option value="${v}"${d.entregaModo === v ? " selected" : ""}>${n}</option>`).join("")}</select></label>
      ${campo("funcExtras", "Funcionários além dos 3 incluídos", 'inputmode="numeric"')}${d.entregaModo === "entregadores" || d.entregaModo === "ambos" ? campo("entExtras", "Entregadores além dos 3 incluídos", 'inputmode="numeric"') : ""}`}</div>
      <div class="chaves-c">${premium ? "" : chave("pagamentoOnline", "Pagamento online")}${chave("dominioProprio", "Domínio próprio")}${chave("chatIA", "Chat com IA")}${chave("testeGratis", "Teste grátis")}${chave("notaFiscal", "Nota fiscal")}${chave("testemunhas", "Linhas para 2 testemunhas")}</div>
      ${d.pagamentoOnline && !premium ? `<div class="form-grade">${campo("provedorPagamento", "Plataforma de pagamento")}${campo("valorPagOnline", "Pagamento online por mês (R$)")}</div>` : ""}
      ${d.dominioProprio ? `<div class="form-grade">${campo("dominio", "Domínio (ex.: minhaloja.com.br)")}${campo("valorDominio", "Valor a mais por mês (R$)")}</div>` : ""}
      ${d.chatIA ? `<div class="form-grade">${campo("valorChat", "Chat: valor por mês (R$)")}${campo("limiteChat", "Chat: conversas por mês (opcional)")}</div>` : ""}
      ${d.testeGratis ? `<div class="form-grade">${campo("diasTeste", "Dias de teste")}</div>` : ""}
      <p class="total-mensal" data-total>Mensalidade total com adicionais: <b>R$ ${totalMensal(d).toFixed(2).replace(".", ",")}</b></p></section>
    <section class="ed-sec"><h3>3. Cláusulas</h3><p class="resumo">Desligue o que não servir ou edite o texto só deste contrato.</p>
      <div class="lista-cl">${lista.map((cl) => { const cfg = atual.clausulas[cl.id] || {}; return `<div class="cl">
        <div class="cl-linha"><label class="chave-c"><input type="checkbox" data-liga="${cl.id}"${cfg.desligada ? "" : " checked"}><span>${esc(cl.titulo)}${cfg.texto != null ? ' <em>(editada)</em>' : ""}</span></label>
          <button type="button" class="btn btn-peq" data-editar-cl="${cl.id}">Editar</button></div>
        <div class="cl-caixa" data-caixa="${cl.id}" hidden><textarea class="entrada" data-ed-texto="${cl.id}">${esc(cfg.texto ?? cl.texto(d))}</textarea>
          ${cfg.texto != null ? `<button type="button" class="btn btn-peq" data-padrao-cl="${cl.id}">Voltar ao texto padrão</button>` : ""}</div></div>`; }).join("")}</div>
      <h4>Cláusulas a mais</h4><div data-extras>${(atual.extras || []).map((x) => `<div class="cl cl-extra">
        <input class="entrada" data-ex-titulo="${x.id}" value="${esc(x.titulo)}" placeholder="Título"><textarea class="entrada" data-ex-texto="${x.id}" placeholder="Texto da cláusula">${esc(x.texto)}</textarea>
        <button type="button" class="btn btn-peq btn-perigo" data-tirar-ex="${x.id}">${ctx.ic("lixo")}Tirar</button></div>`).join("") || '<p class="resumo">Nenhuma.</p>'}</div>
      <button type="button" class="btn" data-nova-cl>${ctx.ic("mais")}Escrever cláusula</button></section>
    <section class="ed-sec ed-gemini"><h3>4. Assistente (Gemini)</h3>
      <p class="resumo">Peça uma cláusula nova ou tire dúvidas: ele diz se a lei permite e o que pode dar problema.</p>
      <textarea class="entrada" data-pedido placeholder="Ex.: quero cobrar uma taxa se o cliente pedir mudança urgente no mesmo dia. Pode?"></textarea>
      <div class="ed-linha"><button type="button" class="btn btn-p" data-gemini="clausula">Escrever a cláusula</button><button type="button" class="btn" data-gemini="livre">Perguntar</button>
        <button type="button" class="btn" data-gemini="revisar">Revisar o contrato inteiro</button></div>
      <div class="resposta" data-resposta hidden></div></section>
    ${atual.id ? `<p style="margin:10px 0 40px"><button type="button" class="btn btn-perigo" data-excluir>${ctx.ic("lixo")}Excluir contrato</button></p>` : '<div style="height:40px"></div>'}`;
  $("[data-form]", el).scrollTop = y;
}
function renderPrevia(el) { $("[data-previa]", el).innerHTML = htmlContrato(atual); }
async function gemini(el, tarefa) {
  const pedido = $("[data-pedido]", el).value.trim();
  if (tarefa !== "revisar" && !pedido) { ctx.toast("Escreva o que você quer"); return; }
  const box = $("[data-resposta]", el); box.hidden = false; box.innerHTML = `<p class="pensando">O Gemini está pensando…</p>`;
  const SCRIPT = (window.SM_FIREBASE || {}).scriptUrl;
  try {
    const idToken = await ctx.fb.a.currentUser.getIdToken();
    const d = atual.dados;
    const dados = `Produto: ${d.produto === "premium" ? "Site premium" : "Catálogo digital"} · Mensalidade R$ ${d.valorMensal} · Permanência ${d.permanencia} meses · Cliente ${/\d{14}/.test(String(d.clienteDoc).replace(/\D/g, "")) ? "empresa (CNPJ)" : "pessoa física ou MEI (verificar)"}`;
    const r = await fetch(SCRIPT, { method: "POST", body: JSON.stringify({ acao: "contrato", idToken, tarefa, pedido, contrato: textoContrato(atual), dados }) });
    const j = await r.json(); if (!j.ok) throw new Error(j.erro || "erro");
    const t = String(j.texto || "");
    if (tarefa === "clausula") {
      const pega = (rot, prox) => { const m = t.match(new RegExp(rot + ":\\s*([\\s\\S]*?)" + (prox ? "\\n\\s*" + prox + ":" : "$"))); return m ? m[1].trim() : ""; };
      const sug = { titulo: pega("TÍTULO", "TEXTO"), texto: pega("TEXTO", "ANÁLISE"), analise: pega("ANÁLISE") };
      if (!sug.texto) sug.texto = t;
      el._sugestao = sug;
      box.innerHTML = `<h4>${esc(sug.titulo || "Cláusula sugerida")}</h4><pre>${esc(sug.texto)}</pre>${sug.analise ? `<div class="analise"><b>O que a lei diz</b><p>${esc(sug.analise)}</p></div>` : ""}
        <button type="button" class="btn btn-p" data-inserir>${ctx.ic("mais")}Colocar no contrato</button>`;
    } else box.innerHTML = `<pre>${esc(t)}</pre>`;
  } catch (e) {
    const c = String(e.message || e);
    box.innerHTML = `<p class="erro">${/429/.test(c) ? "O Gemini atingiu o limite de uso por agora. Tente em alguns minutos." : /sem-chave/.test(c) ? "Falta a chave do Gemini (configure no painel de propostas)." : navigator.onLine ? "Não deu para falar com o Gemini agora. Tente de novo." : "Sem internet."}</p>`;
  }
}
function imprimir() {
  const w = window.open("", "_blank");
  if (!w) { ctx.toast("Libere as janelas pop-up para gerar o PDF"); return; }
  w.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${esc(atual.titulo || "Contrato")}</title>
    <style>@page{size:A4;margin:22mm 20mm}body{font:11.5pt/1.55 Georgia,'Times New Roman',serif;color:#111;margin:0}
    h1{font:700 14pt/1.3 Arial,sans-serif;text-align:center;text-transform:uppercase;margin:0 0 18px}
    h2{font:700 10.5pt/1.3 Arial,sans-serif;text-transform:uppercase;margin:16px 0 6px}
    p{margin:0 0 6px;text-align:justify}.local{margin-top:18px}mark{background:#fff3a8}
    .assinaturas{display:grid;grid-template-columns:1fr 1fr;gap:42px 30px;margin-top:46px;page-break-inside:avoid}
    .assin span{display:block;border-top:1px solid #111;margin-bottom:4px}.assin b{display:block;font:700 9.5pt Arial,sans-serif}.assin small{font:9pt Arial,sans-serif;color:#333}</style></head>
    <body>${htmlContrato(atual)}<script>window.onload=()=>{window.print()}<\/script></body></html>`);
  w.document.close();
}

// janela simples (mesmo visual da área)
function janela(titulo, corpo) {
  const el = document.createElement("div");
  el.innerHTML = `<div class="fundo" data-f></div><aside class="folha" role="dialog" aria-modal="true" aria-label="${esc(titulo)}">
    <div class="folha-topo"><div><b>${esc(titulo)}</b></div><button type="button" class="btn btn-ic" data-f aria-label="Fechar">${ctx.ic("x")}</button></div>
    <div class="folha-corpo">${corpo}</div></aside>`;
  document.body.appendChild(el);
  const fechar = () => el.remove();
  el.addEventListener("click", (e) => { if (e.target.closest("[data-f]")) fechar(); });
  return { el, fechar };
}
