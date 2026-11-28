// Clientes fechados · Studio Magalhães
// Lista os fechamentos feitos pelo app de modelos (studiomagalhaes.com.br/negocios/modelo/):
// o modelo escolhido pelo cliente e as observações. Só a conta Google do Paulo entra
// (quem garante isso são as regras do Firestore, fora deste repositório).
// A aba "Contratos" (contratos.js) gera os contratos a partir do contrato padrão.
import { iniciarContratos, telaContratos, pararContratos } from "./contratos.js";
const FIREBASE_VERSAO = "10.12.2";
const cfg = window.SM_FIREBASE;
const app = document.getElementById("app");
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ICONES = {
  google: '<g fill="currentColor" stroke="none"><path d="M21.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.3a4.6 4.6 0 0 1-2 3v2.5h3.3c1.9-1.8 2.9-4.4 2.9-7.3z"/><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.3-2.5c-.9.6-2 1-3.3 1-2.6 0-4.7-1.7-5.5-4H3.1v2.6A10 10 0 0 0 12 22z"/><path d="M6.5 14.1a6 6 0 0 1 0-4.2V7.3H3.1a10 10 0 0 0 0 9.4z"/><path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.3l3.4 2.6C7.3 7.7 9.4 6 12 6z"/></g>',
  sair: '<path d="M15 4.5h3.5v15H15M10 8l-4 4 4 4M6 12h10"/>',
  busca: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  abrir: '<path d="M14 4.5h5.5V10M19.5 4.5L11 13M17 14v5.5H4.5V7H10"/>',
  link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
  whats: '<path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z"/>',
  lixo: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
  atualizar: '<path d="M20 11a8 8 0 0 0-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16M20 20v-4h-4"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  editar: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  salvar: '<path d="M5 3.5h11l3.5 3.5v13.5h-15z"/><path d="M8 3.5v5h7v-5M8 20.5v-6h8v6"/>',
  contrato: '<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M10 12h5M10 15.5h5"/>',
  clientes: '<path d="M5 12.5l4.5 4.5L19 7.5"/>'
};
const ic = (n) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICONES[n] || ""}</svg>`;
const STATUS = { fechado: "Fechado", producao: "Em produção", "no-ar": "No ar", cancelado: "Cancelado" };
const data = (t) => { const d = t && t.toDate ? t.toDate() : t ? new Date(t) : null; return d ? d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) : "agora"; };
const codificar = (o) => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const configDe = (f) => { try { return typeof f.config === "string" ? JSON.parse(f.config) : f.config || null; } catch { return null; } };
const linkModelo = (f) => `${location.origin}/negocios/modelo/catalogo/${encodeURIComponent(f.pasta || "lanchonete")}/#cfg=${codificar(configDe(f) || {})}`;
let toastT;
function toast(t) { let e = $(".toast"); if (!e) { e = document.createElement("div"); e.className = "toast"; document.body.appendChild(e); } e.textContent = t; e.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { e.hidden = true; }, 2200); }

// ---------- Firebase ----------
async function carregarFirebase() {
  const base = "https://www.gstatic.com/firebasejs/" + FIREBASE_VERSAO + "/";
  const [fa, au, fs] = await Promise.all([import(base + "firebase-app.js"), import(base + "firebase-auth.js"), import(base + "firebase-firestore.js")]);
  const ap = fa.initializeApp(cfg);
  const a = au.getAuth(ap); a.languageCode = "pt-BR";
  // guarda uma cópia no aparelho: dá para consultar mesmo sem internet
  let db;
  try { db = fs.initializeFirestore(ap, { localCache: fs.persistentLocalCache({ tabManager: fs.persistentMultipleTabManager() }) }); }
  catch { db = fs.getFirestore(ap); }
  return { au, fs, a, db };
}

let fb, lista = [], busca = "", filtro = "todos", aberto = null, pararOuvir = null;

function telaEntrar(erro = "") {
  app.innerHTML = `<div class="entrar"><div class="entrar-cartao"><span class="marca">SM</span><h1>Clientes fechados</h1>
    <p>Os modelos escolhidos pelos clientes, com as suas observações.</p>
    ${erro ? `<p class="erro">${esc(erro)}</p>` : ""}
    <button type="button" class="btn btn-p btn-cheio" data-entrar>${ic("google")}Entrar com Google</button>
    <p style="margin:16px 0 0;font-size:.85rem"><a href="../painel/">Painel de propostas</a></p></div></div>`;
  $("[data-entrar]").addEventListener("click", async () => {
    try { const p = new fb.au.GoogleAuthProvider(); p.setCustomParameters({ prompt: "select_account" }); await fb.au.signInWithPopup(fb.a, p); }
    catch (e) { if (!/popup-closed|cancelled/.test(e.code || "")) telaEntrar("Não deu para entrar. Tente de novo."); }
  });
}

let tela = location.hash === "#contratos" ? "contratos" : "clientes";
function telaLista(usuario) {
  app.innerHTML = `<header class="topo"><div class="topo-in"><span class="marca">SM</span><div><b>Clientes fechados</b><small>${esc(usuario.email)}</small></div>
      <div class="acoes"><a class="btn btn-ic" href="../painel/" title="Painel de propostas" aria-label="Painel de propostas">${ic("link")}</a>
      <button type="button" class="btn btn-ic" data-sair title="Sair" aria-label="Sair">${ic("sair")}</button></div></div>
      <nav class="caixa abas-area" role="tablist">
        <button type="button" role="tab" data-tela="clientes" aria-selected="${tela === "clientes"}">${ic("clientes")}Clientes</button>
        <button type="button" role="tab" data-tela="contratos" aria-selected="${tela === "contratos"}">${ic("contrato")}Contratos</button></nav></header>
    <main class="caixa" data-conteudo></main>`;
  $("[data-sair]").addEventListener("click", () => fb.au.signOut(fb.a));
  $(".abas-area").addEventListener("click", (e) => { const b = e.target.closest("[data-tela]"); if (!b) return; tela = b.dataset.tela; history.replaceState(null, "", tela === "contratos" ? "#contratos" : location.pathname); telaLista(usuario); });
  if (tela === "contratos") { telaContratos($("[data-conteudo]")); return; }
  $("[data-conteudo]").innerHTML = `
      <div class="ferr"><label class="busca">${ic("busca")}<input type="search" data-busca placeholder="Buscar loja, responsável ou observação" value="${esc(busca)}"></label>
        <div class="filtros" data-filtros>${[["todos", "Todos"], ...Object.entries(STATUS)].map(([v, n]) => `<button type="button" data-v="${v}" aria-pressed="${filtro === v}">${n}</button>`).join("")}</div></div>
      <p class="resumo" data-resumo></p>
      <div class="grade" data-grade></div>`;
  $("[data-busca]").addEventListener("input", (e) => { busca = e.target.value; renderGrade(); });
  $("[data-filtros]").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (!b) return; filtro = b.dataset.v; [...e.currentTarget.children].forEach((x) => x.setAttribute("aria-pressed", String(x === b))); renderGrade(); });
  $("[data-grade]").addEventListener("click", (e) => { const c = e.target.closest("[data-id]"); if (c) abrirDetalhe(c.dataset.id); });
  renderGrade();
}

function logoDe(f) {
  return f.logo ? `<img src="${esc(f.logo)}" alt="">` : esc(f.sigla || (f.loja || "?").slice(0, 2).toUpperCase());
}
function renderGrade() {
  const g = $("[data-grade]"); if (!g) return;
  const b = busca.trim().toLowerCase();
  const vis = lista.filter((f) => (filtro === "todos" || (f.status || "fechado") === filtro) && (!b || [f.loja, f.responsavel, f.obs, f.contato, f.plano].join(" ").toLowerCase().includes(b)));
  $("[data-resumo]").textContent = lista.length ? `${vis.length} de ${lista.length} ${lista.length === 1 ? "cliente" : "clientes"}` : "";
  g.innerHTML = vis.length ? vis.map((f) => { const c = f.cores || {}; return `<button type="button" class="cartao" data-id="${esc(f.id)}" style="--c1:${esc(c.p || "#3d7cc0")};--c2:${esc(c.d || "#4fc3c8")}">
      <span class="faixa"><span class="logo">${logoDe(f)}</span></span>
      <span class="corpo"><b>${esc(f.loja || "Sem nome")}</b><small>${esc(f.plano || "")}</small><small>${esc(f.responsavel || "")}${f.responsavel ? " · " : ""}${data(f.criadoEm)}</small>
      <span class="selo" data-s="${esc(f.status || "fechado")}">${esc(STATUS[f.status || "fechado"] || f.status)}</span></span></button>`; }).join("")
    : `<p class="vazio">${lista.length ? "Nenhum cliente com esse filtro." : "Nenhum fechamento ainda.<br>No app de modelos, abra o pincel e use “Fechou com o cliente?”."}</p>`;
}

function abrirDetalhe(id) {
  const f = lista.find((x) => x.id === id); if (!f) return;
  aberto = id;
  const c = f.cores || {}, wa = String(f.contato || "").replace(/\D/g, ""), num = wa && wa.length <= 11 ? "55" + wa : wa;
  const el = document.createElement("div");
  el.innerHTML = `<div class="fundo" data-fechar></div><aside class="folha" role="dialog" aria-modal="true" aria-label="${esc(f.loja)}">
    <div class="folha-topo"><span class="logo" style="background:${esc(c.p || "#3d7cc0")}">${logoDe(f)}</span><div><b>${esc(f.loja)}</b><small>${esc(f.produto || "")} · ${data(f.criadoEm)}</small></div>
      <button type="button" class="btn btn-ic" data-fechar aria-label="Fechar">${ic("x")}</button></div>
    <div class="folha-corpo">
      <div class="dados">
        <div class="dado"><span>Responsável</span><b>${esc(f.responsavel || "—")}</b></div>
        <div class="dado"><span>WhatsApp</span><b>${wa ? `<a href="https://wa.me/${num}" target="_blank" rel="noopener">${esc(f.contato)}</a>` : "—"}</b></div>
        <div class="dado largo"><span>Plano</span><b>${esc(f.plano || "—")}</b></div>
        <div class="dado"><span>Modelo</span><b>${esc(f.ramo || f.pasta || "—")}</b></div>
        <div class="dado"><span>Cores</span><div class="cores">${["p", "d", "escuro", "fundo"].map((k) => c[k] ? `<i style="background:${esc(c[k])}" title="${esc(c[k])}"></i>` : "").join("")}</div></div>
      </div>
      <label class="campo"><span>Situação</span><select class="entrada" data-status>${Object.entries(STATUS).map(([v, n]) => `<option value="${v}"${(f.status || "fechado") === v ? " selected" : ""}>${n}</option>`).join("")}</select></label>
      <label class="campo"><span>Observações</span><textarea class="entrada" data-obs maxlength="5000">${esc(f.obs || "")}</textarea><span class="salvo" data-salvo></span></label>
      <div class="botoes">
        ${configDe(f) ? `<a class="btn btn-p btn-cheio" href="${esc(linkModelo(f))}" target="_blank" rel="noopener">${ic("abrir")}Abrir o modelo do cliente</a>
        <div class="linha"><button type="button" class="btn" data-copiar>${ic("link")}Copiar link</button><button type="button" class="btn btn-perigo" data-apagar>${ic("lixo")}Apagar</button></div>`
        : `<button type="button" class="btn btn-perigo" data-apagar>${ic("lixo")}Apagar</button>`}
      </div>
    </div></aside>`;
  document.body.appendChild(el);
  const fechar = () => { el.remove(); aberto = null; document.removeEventListener("keydown", tecla); };
  const tecla = (e) => { if (e.key === "Escape") fechar(); };
  document.addEventListener("keydown", tecla);
  let t;
  const salvarObs = async (txt) => {
    $("[data-salvo]", el).textContent = "Salvando…";
    try { await fb.fs.updateDoc(fb.fs.doc(fb.db, "fechamentos", id), { obs: txt, atualizadoEm: fb.fs.serverTimestamp() }); $("[data-salvo]", el).textContent = "Salvo"; }
    catch { $("[data-salvo]", el).textContent = navigator.onLine ? "Não deu para salvar" : "Sem internet: salva quando voltar"; }
  };
  $("[data-obs]", el).addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => salvarObs(e.target.value), 700); });
  $("[data-status]", el).addEventListener("change", async (e) => {
    try { await fb.fs.updateDoc(fb.fs.doc(fb.db, "fechamentos", id), { status: e.target.value, atualizadoEm: fb.fs.serverTimestamp() }); toast("Situação atualizada"); } catch { toast("Não deu para salvar agora"); }
  });
  el.addEventListener("click", async (e) => {
    if (e.target.closest("[data-fechar]")) fechar();
    if (e.target.closest("[data-copiar]")) { try { await navigator.clipboard.writeText(linkModelo(f)); toast("Link copiado"); } catch { toast("Não deu para copiar"); } }
    if (e.target.closest("[data-apagar]") && confirm(`Apagar o fechamento de "${f.loja}"? Não dá para desfazer.`)) {
      try { await fb.fs.deleteDoc(fb.fs.doc(fb.db, "fechamentos", id)); fechar(); toast("Apagado"); } catch { toast("Não deu para apagar"); }
    }
  });
}

// ---------- Início ----------
(async () => {
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
  try { fb = await carregarFirebase(); }
  catch { app.innerHTML = `<div class="entrar"><div class="entrar-cartao"><span class="marca">SM</span><h1>Sem conexão</h1><p>Abra com internet pelo menos uma vez para entrar.</p><button class="btn btn-p btn-cheio" onclick="location.reload()">${ic("atualizar")}Tentar de novo</button></div></div>`; return; }
  iniciarContratos({ fb, toast, ic, lista: () => lista });
  fb.au.onAuthStateChanged(fb.a, (u) => {
    if (pararOuvir) { pararOuvir(); pararOuvir = null; }
    if (!u) { lista = []; pararContratos(); telaEntrar(); return; }
    telaLista(u);
    pararOuvir = fb.fs.onSnapshot(fb.fs.query(fb.fs.collection(fb.db, "fechamentos"), fb.fs.orderBy("criadoEm", "desc"), fb.fs.limit(500)),
      (s) => { lista = s.docs.map((d) => ({ id: d.id, ...d.data() })); renderGrade(); },
      (e) => { if (e.code === "permission-denied") { fb.au.signOut(fb.a); telaEntrar("Esta conta não tem acesso. Entre com a conta do Studio."); } });
  });
})();
