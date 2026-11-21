/*
  Painel de propostas (studiomagalhaes.com.br/negocios/painel/)

  - Entra com o Google (Firebase Authentication).
  - Lê a coleção "propostas" do Firestore, ao vivo. Quem decide quem pode ler são as REGRAS do
    Firestore (só o e-mail do Paulo); esta página só mostra o que o Firebase deixar.
  - Teste sem Firebase: abra com ?demo no localhost (dados de exemplo, nada é salvo).
*/
const FIREBASE_VERSAO = "10.12.2";
const cfg = window.SM_FIREBASE || {};
const local = ["localhost", "127.0.0.1"].includes(location.hostname);
const DEMO = local && new URLSearchParams(location.search).has("demo");
const SCRIPT = cfg.scriptUrl || "";   // Apps Script "SM Propostas": e-mail e Gemini

const STATUS = {
  nova: "Nova",
  conversa: "Em conversa",
  enviada: "Proposta enviada",
  fechada: "Fechada",
  perdida: "Não seguiu"
};
const CORES = ["#1b4a7a", "#3d7cc0", "#127a80", "#0c1a36", "#2f6fb3", "#b07a1c", "#5b4fa8", "#1d7448"];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const semAcento = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const paraData = (t) => (t && typeof t.toDate === "function") ? t.toDate() : (t instanceof Date ? t : (t ? new Date(t) : null));

let fb = null;             // funções do Firebase (ou da demo)
let pedidos = [];          // [{ id, ...dados }]
let filtro = "todas";
let busca = "";
let selecionado = null;
let primeiraCarga = true;
let pararDeOuvir = null;
let mensagens = {};        // propostaId -> [mensagens]
let pararMensagens = null;
const rascunhos = {};      // propostaId -> { assunto, texto }
let desfazer = null;       // texto antes do Gemini, para desfazer

// ---------- Telas ----------
const tela = (nome) => { document.body.dataset.tela = nome; };
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("mostrar");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("mostrar"), 3200);
}

// ---------- Firebase ----------
async function carregarFirebase() {
  const base = "https://www.gstatic.com/firebasejs/" + FIREBASE_VERSAO + "/";
  const [app, auth, fs] = await Promise.all([
    import(base + "firebase-app.js"),
    import(base + "firebase-auth.js"),
    import(base + "firebase-firestore.js")
  ]);
  const aplicativo = app.initializeApp(cfg);
  const a = auth.getAuth(aplicativo);
  a.languageCode = "pt-BR";
  const db = fs.getFirestore(aplicativo);
  const col = fs.collection(db, "propostas");
  return {
    aoMudarUsuario: (fn) => auth.onAuthStateChanged(a, fn),
    entrar: async () => {
      const prov = new auth.GoogleAuthProvider();
      prov.setCustomParameters({ prompt: "select_account" });
      // Só pop-up: o login por redirecionamento falha nos navegadores atuais quando o site
      // (studiomagalhaes.com.br) e o authDomain (firebaseapp.com) são domínios diferentes.
      await auth.signInWithPopup(a, prov);
    },
    sair: () => auth.signOut(a),
    ouvir: (aoMudar, aoErro) => fs.onSnapshot(
      fs.query(col, fs.orderBy("criadoEm", "desc"), fs.limit(1000)),
      (snap) => aoMudar(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })),
        snap.docChanges().filter((c) => c.type === "added").map((c) => c.doc.id)
      ),
      aoErro
    ),
    atualizar: (id, dados) => fs.updateDoc(fs.doc(db, "propostas", id), { ...dados, atualizadoEm: fs.serverTimestamp() }),
    apagar: (id) => fs.deleteDoc(fs.doc(db, "propostas", id)),
    token: () => (a.currentUser ? a.currentUser.getIdToken() : Promise.reject(new Error("sem-login"))),
    ouvirMensagens: (id, fn) => fs.onSnapshot(
      fs.query(fs.collection(db, "propostas", id, "mensagens"), fs.orderBy("criadoEm", "asc")),
      (s) => fn(s.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (e) => console.error(e)
    ),
    lerConfig: async () => { const s = await fs.getDoc(fs.doc(db, "config", "assistente")); return s.exists() ? s.data() : {}; },
    salvarConfig: (d) => fs.setDoc(fs.doc(db, "config", "assistente"), { ...d, atualizadoEm: fs.serverTimestamp() }, { merge: true }),
    registrar: (tipo, texto, propostaId) => fs.addDoc(fs.collection(db, "atividade"), {
      tipo, texto: String(texto).slice(0, 500), propostaId: propostaId || "", criadoEm: fs.serverTimestamp()
    }).catch((e) => console.error(e))
  };
}

// ---------- Motor (Apps Script): e-mail e Gemini ----------
const ERROS_MOTOR = {
  "motor-nao-configurado": "O motor de e-mail e Gemini ainda não foi ligado (scriptUrl em firebase-config.js).",
  "gemini-sem-chave": "Falta a chave do Gemini. Abra Configurações e cole a chave.",
  "gemini-chave-invalida": "Essa chave do Gemini não funcionou. Confira e tente de novo.",
  "cliente-sem-email": "Este cliente não deixou e-mail. Use o WhatsApp.",
  "sem-acesso": "Sua conta não tem acesso ao motor.",
  "login-invalido": "Sua sessão expirou. Recarregue a página.",
  "demorou-demais": "O motor demorou demais para responder. Tente de novo em instantes.",
  "sem-conexao": "Sem conexão com o motor. Verifique a internet."
};
function erroMotor(err) {
  const c = String((err && err.message) || err);
  if (/free tier is not available|billing/i.test(c)) return "O Gemini pede faturamento ativo nesse projeto do Google. No AI Studio, clique em \"Configurar faturamento\" ao lado da chave.";
  if (/^gemini-429/.test(c)) return "O Gemini atingiu o limite de uso por agora. Tente de novo em alguns minutos.";
  if (/^gemini-5\d\d/.test(c)) return "O Gemini está sobrecarregado agora (instabilidade do Google). Tente de novo em 1 minuto.";
  const chave = Object.keys(ERROS_MOTOR).find((k) => c.indexOf(k) === 0);
  return chave ? ERROS_MOTOR[chave] : "Não deu certo (" + c.slice(0, 120) + ").";
}
async function chamarScript(acao, dados = {}) {
  if (DEMO) return demoMotor(acao, dados);
  if (!SCRIPT) throw new Error("motor-nao-configurado");
  const idToken = await fb.token();
  const ctrl = new AbortController();
  const limite = setTimeout(() => ctrl.abort(), 170000);
  let r;
  try { r = await fetch(SCRIPT, { method: "POST", body: JSON.stringify({ acao, idToken, ...dados }), signal: ctrl.signal }); }
  catch (e) { throw new Error(e.name === "AbortError" ? "demorou-demais" : "sem-conexao"); }
  finally { clearTimeout(limite); }
  const j = await r.json();
  if (!j.ok) throw new Error(j.erro || "erro");
  return j;
}
async function demoMotor(acao, d) {
  await new Promise((r) => setTimeout(r, 900));
  const p = pedidos.find((x) => x.id === d.propostaId) || {};
  const nome = String(p.nome || "").split(" ")[0];
  if (acao === "estado") return { gemini: true, modelo: "gemini (demo)", enviaComo: "negocios@studiomagalhaes.com.br", avisoPara: "você", gatilho: true };
  if (acao === "config") return { gemini: true, modelo: "gemini (demo)" };
  if (acao === "sincronizar") return { novas: 0, respostas: 0 };
  if (acao === "enviarEmail") { fb.adicionarMensagemDemo(d.propostaId, { de: "eu", texto: d.texto, assunto: d.assunto }); return {}; }
  const TXT = {
    resposta: `Olá, ${nome}! Tudo bem?\n\nObrigado por contar sobre a ${p.empresa}. Pelo que você descreveu, faz sentido começar por um site com ${(p.objetivos || []).slice(0, 2).join(" e ").toLowerCase()}.\n\nPara eu fechar a proposta certinha, me conta duas coisas: você já tem logo e fotos dos produtos? E prefere que o contato chegue pelo WhatsApp ou por um formulário?\n\nPaulo\nStudio Magalhães`,
    proposta: `Olá, ${nome}!\n\nO que entendi do seu negócio\n${p.sobre}\n\nO que vamos fazer\n- Site responsivo com a cara da ${p.empresa}\n- ${(p.objetivos || []).join("\n- ")}\n\nComo vai funcionar\n1. Conversa e coleta de materiais\n2. Primeira versão para você aprovar\n3. Ajustes e publicação\n\nPrazo\n[PRAZO]\n\nInvestimento\n[VALOR]\n\nPróximos passos\nSe fizer sentido, me responde este e-mail que já combinamos o início.\n\nPaulo\nStudio Magalhães`,
    whatsapp: `Oi, ${nome}! Aqui é o Paulo, do Studio Magalhães 😊 Recebi seu pedido para a ${p.empresa}. Posso te fazer duas perguntas rápidas para montar a proposta?`,
    melhorar: String(d.rascunho || "").replace(/\s+/g, " ").trim() + "\n\nQualquer dúvida, estou à disposição.\n\nPaulo\nStudio Magalhães",
    livre: `Pelo perfil (${p.ramo}, prazo "${p.prazo}"), eu começaria com uma versão enxuta e deixaria os extras como segunda etapa. Vale perguntar se ele já tem domínio e fotos.`
  };
  return { texto: TXT[d.tarefa] || TXT.livre };
}

// ---------- Demo (só no localhost, com ?demo) ----------
function criarDemo() {
  const agora = Date.now();
  const min = 60000, h = 60 * min, dia = 24 * h;
  let dados = [
    { id: "d1", nome: "Marina Alves", whatsapp: "(21) 98888-1234", email: "marina@exemplo.com", preferencia: "WhatsApp", empresa: "Doce Ateliê", ramo: "Confeitaria", cidade: "Niterói, RJ", criar: "Site", objetivos: ["Mostrar catálogo ou cardápio", "Receber contatos", "Aparecer no Google"], outros: "", sobre: "Faço bolos e doces sob encomenda em casa há 4 anos. Quero um site com o cardápio de bolos, fotos e um botão para pedir pelo WhatsApp.", temSite: false, siteAtual: "", prazo: "Próximas semanas", origem: { utm_source: "google", utm_campaign: "sites-pme", gclid: "abc" }, status: "nova", criadoEm: new Date(agora - 12 * min) },
    { id: "d2", nome: "Roberto Lima", whatsapp: "(11) 97777-4321", email: "", preferencia: "WhatsApp", empresa: "Oficina Lima & Filhos", ramo: "Automotivo (oficina)", cidade: "São Paulo, SP", criar: "Site", objetivos: ["Apresentar a empresa", "Receber contatos", "Outros"], outros: "Mostrar fotos dos carros reformados", sobre: "Oficina mecânica de família. Hoje só temos Instagram e queremos passar mais confiança para quem não conhece.", temSite: true, siteAtual: "@oficinalimaefilhos", prazo: "Sem pressa", origem: {}, status: "conversa", notas: "Liguei dia 20, pediu orçamento com e sem loja.", criadoEm: new Date(agora - 3 * h) },
    { id: "d3", nome: "Dra. Camila Rocha", whatsapp: "(31) 96666-0000", email: "contato@exemplo.com", preferencia: "E-mail", empresa: "Clínica Respirar", ramo: "Saúde (clínica, consultório)", cidade: "Belo Horizonte, MG", criar: "Site e aplicativo", objetivos: ["Agendamento online", "Apresentar a empresa", "Área do cliente ou sistema interno"], outros: "", sobre: "Clínica de fisioterapia respiratória com 3 profissionais. Queremos agenda online e uma área para o paciente ver os exercícios.", temSite: false, siteAtual: "", prazo: "Urgente", origem: { utm_source: "google", gclid: "xyz" }, status: "enviada", criadoEm: new Date(agora - 2 * dia) },
    { id: "d4", nome: "Jorge Souza", whatsapp: "(21) 95555-1111", email: "", preferencia: "WhatsApp", empresa: "Barbearia do Jorge", ramo: "Beleza (salão, barbearia, estética)", cidade: "", criar: "Ainda não sei", objetivos: ["Agendamento online"], outros: "", sobre: "Barbearia com 2 cadeiras, quero que o cliente marque horário sozinho.", temSite: false, siteAtual: "", prazo: "Sem pressa", origem: {}, status: "fechada", criadoEm: new Date(agora - 6 * dia) }
  ];
  dados[1].novaResposta = true;
  dados[1].email = "roberto@exemplo.com";
  let ouvinte = null;
  const avisar = (novos = []) => ouvinte && ouvinte(dados.map((d) => ({ ...d })), novos);
  const msgs = {
    d2: [
      { id: "m1", de: "eu", texto: "Olá, Roberto! Tudo bem?\n\nRecebi o pedido da Oficina Lima & Filhos. Você já tem logo e fotos das reformas?\n\nPaulo\nStudio Magalhães", assunto: "Sua proposta · Oficina Lima & Filhos [SM-D2XXXX]", criadoEm: new Date(agora - 2 * h) },
      { id: "m2", de: "cliente", texto: "Oi Paulo! Tenho o logo sim e umas 30 fotos. Dá pra fazer em duas etapas? Primeiro o site e depois a loja.", assunto: "Re: Sua proposta · Oficina Lima & Filhos [SM-D2XXXX]", criadoEm: new Date(agora - 40 * min) }
    ]
  };
  const ouvintesMsg = {};
  let config = { instrucoes: "Site institucional a partir de R$ [VALOR]. Prazo médio de 15 dias úteis." };
  return {
    token: async () => "demo",
    ouvirMensagens: (id, fn) => { ouvintesMsg[id] = fn; setTimeout(() => fn((msgs[id] || []).slice()), 80); return () => { delete ouvintesMsg[id]; }; },
    adicionarMensagemDemo: (id, m) => {
      (msgs[id] = msgs[id] || []).push({ id: "m" + Date.now(), canal: "email", criadoEm: new Date(), ...m });
      if (ouvintesMsg[id]) ouvintesMsg[id](msgs[id].slice());
      dados = dados.map((d) => (d.id === id && d.status === "nova" ? { ...d, status: "conversa" } : d)); avisar();
    },
    lerConfig: async () => ({ ...config }),
    salvarConfig: async (d) => { config = { ...config, ...d }; },
    registrar: async () => {},
    aoMudarUsuario: (fn) => setTimeout(() => fn({ displayName: "Modo demonstração", email: "demo@localhost", photoURL: "" }), 300),
    entrar: async () => {},
    sair: async () => { location.href = location.pathname; },
    ouvir: (fn) => {
      ouvinte = fn;
      setTimeout(() => avisar(dados.map((d) => d.id)), 200);
      // um pedido novo chega depois de alguns segundos, para ver o aviso
      setTimeout(() => {
        dados = [{ id: "d5", nome: "Patrícia Gomes", whatsapp: "(21) 94444-2222", email: "", preferencia: "WhatsApp", empresa: "Pet Feliz", ramo: "Pet", cidade: "Rio de Janeiro, RJ", criar: "Site", objetivos: ["Vender pela internet", "Aparecer no Google"], outros: "", sobre: "Pet shop de bairro, queremos vender ração e acessórios pela internet com entrega na região.", temSite: false, siteAtual: "", prazo: "Próximas semanas", origem: { utm_source: "google", gclid: "n1" }, status: "nova", criadoEm: new Date() }, ...dados];
        avisar(["d5"]);
      }, 6000);
      return () => { ouvinte = null; };
    },
    atualizar: async (id, mud) => { dados = dados.map((d) => (d.id === id ? { ...d, ...mud } : d)); avisar(); },
    apagar: async (id) => { dados = dados.filter((d) => d.id !== id); avisar(); }
  };
}

// ---------- Ajudantes ----------
function quando(t) {
  const d = paraData(t);
  if (!d) return "";
  const s = (Date.now() - d.getTime()) / 1000;
  if (s < 60) return "agora";
  if (s < 3600) return "há " + Math.floor(s / 60) + " min";
  if (s < 86400) return "há " + Math.floor(s / 3600) + " h";
  if (s < 172800) return "ontem";
  if (s < 604800) return "há " + Math.floor(s / 86400) + " dias";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}
const dataCompleta = (t) => {
  const d = paraData(t);
  return d ? d.toLocaleString("pt-BR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "";
};
const corDe = (txt) => {
  let h = 0;
  for (const c of String(txt)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return CORES[h % CORES.length];
};
const iniciais = (txt) => String(txt || "?").trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
const veioDeAnuncio = (p) => {
  const o = p.origem || {};
  return !!(o.gclid || /cpc|ppc|paid|ads/i.test(o.utm_medium || "") || /ads/i.test(o.utm_source || ""));
};
function objetivosDe(p) {
  return (p.objetivos || []).map((o) => (o === "Outros" && p.outros ? "Outros: " + p.outros : o));
}
function linkWhats(p) {
  let d = String(p.whatsapp || "").replace(/\D/g, "");
  if (d.length === 10 || d.length === 11) d = "55" + d;
  const primeiro = String(p.nome || "").trim().split(/\s+/)[0] || "";
  const msg = "Olá" + (primeiro ? ", " + primeiro : "") + "! Aqui é o Paulo, do Studio Magalhães. Recebi o seu pedido de proposta para " +
    (p.empresa || "o seu negócio") + " e queria entender melhor o que você precisa. Podemos conversar?";
  return "https://wa.me/" + d + "?text=" + encodeURIComponent(msg);
}
function resumoTexto(p) {
  return [
    "Pedido de proposta — " + (p.empresa || ""),
    "Recebido: " + dataCompleta(p.criadoEm),
    "Nome: " + (p.nome || ""),
    "WhatsApp: " + (p.whatsapp || ""),
    "E-mail: " + (p.email || "—"),
    "Prefere: " + (p.preferencia || ""),
    "Ramo: " + (p.ramo || ""),
    "Cidade: " + (p.cidade || "—"),
    "Quer criar: " + (p.criar || ""),
    "Objetivos: " + objetivosDe(p).join("; "),
    "Já tem site: " + (p.temSite ? "Sim " + (p.siteAtual || "") : "Não"),
    "Prazo: " + (p.prazo || ""),
    "Sobre: " + (p.sobre || "")
  ].join("\n");
}

// ---------- Lista ----------
function filtrados() {
  const q = semAcento(busca);
  return pedidos.filter((p) => {
    if (filtro !== "todas" && (p.status || "nova") !== filtro) return false;
    if (!q) return true;
    return semAcento([p.nome, p.empresa, p.ramo, p.cidade, p.whatsapp, p.email, p.sobre].join(" ")).includes(q);
  });
}

function renderNumeros() {
  const conta = (s) => pedidos.filter((p) => (p.status || "nova") === s).length;
  Object.keys(STATUS).forEach((s) => { const el = $("#n-" + s); if (el) el.textContent = conta(s); });
  $("#n-total").textContent = pedidos.length;
  $("#n-ads").textContent = pedidos.filter(veioDeAnuncio).length;
  const novas = conta("nova");
  document.title = (novas ? "(" + novas + ") " : "") + "Propostas · Studio Magalhães";
  $$(".numero[data-filtro]").forEach((b) => b.classList.toggle("ativo", b.dataset.filtro === filtro));
}

function renderLista(destacar = []) {
  const lista = filtrados();
  const ul = $("#itens");
  ul.innerHTML = lista.map((p) => {
    const st = p.status || "nova";
    return `
      <li>
        <button type="button" class="item${p.id === selecionado ? " selecionado" : ""}${destacar.includes(p.id) ? " entrando" : ""}" data-id="${esc(p.id)}">
          <span class="item-avatar" style="background:${corDe(p.empresa || p.nome)}">${esc(iniciais(p.empresa || p.nome))}</span>
          <span class="item-titulo">${st === "nova" ? '<i class="item-novo" title="Nova"></i>' : ""}<b>${esc(p.empresa || "Sem nome")}</b></span>
          <span class="item-quando">${esc(quando(p.criadoEm))}</span>
          <span class="item-sub">${esc(p.nome || "")}${p.ramo ? " · " + esc(p.ramo) : ""}${p.cidade ? " · " + esc(p.cidade) : ""}</span>
          <span class="item-tags">
            <span class="pilula st-${esc(st)}">${esc(STATUS[st] || st)}</span>
            ${p.criar ? `<span class="etq">${esc(p.criar)}</span>` : ""}
            ${veioDeAnuncio(p) ? '<span class="etq etq-ads">Anúncio</span>' : ""}
            ${p.novaResposta ? '<span class="etq etq-resp">Respondeu</span>' : ""}
          </span>
        </button>
      </li>`;
  }).join("");

  const vazio = $("#vazio");
  vazio.hidden = lista.length > 0;
  if (!lista.length) {
    const temAlgo = pedidos.length > 0;
    $("#vazio-titulo").textContent = temAlgo ? "Nada por aqui" : "Nenhum pedido ainda";
    $("#vazio-txt").textContent = temAlgo ? "Nenhum pedido combina com esse filtro ou busca." : "Quando alguém pedir uma proposta pelo site, ela aparece aqui na hora.";
  }
}

// ---------- Ficha ----------
function renderFicha() {
  const p = pedidos.find((x) => x.id === selecionado);
  const ficha = $("#ficha");
  $("#detalhe-vazio").hidden = !!p;
  ficha.hidden = !p;
  if (!p) { document.body.classList.remove("ficha-aberta"); return; }
  const st = p.status || "nova";
  const o = p.origem || {};
  const origemTxt = Object.keys(o).length
    ? Object.keys(o).map((k) => esc(k.replace("utm_", "")) + ": " + esc(o[k])).join(" · ")
    : "Visita direta (sem campanha)";

  ficha.innerHTML = `
    <div class="ficha-topo">
      <button type="button" class="ficha-voltar" data-acao="voltar">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Pedidos</button>
      <p class="ficha-quando"><span>Recebido ${esc(dataCompleta(p.criadoEm))}</span>${veioDeAnuncio(p) ? '<span class="origem-ads">Veio de anúncio</span>' : ""}</p>
      <h2>${esc(p.empresa || "Sem nome")}</h2>
      <p class="ficha-ramo">${esc(p.ramo || "")}${p.cidade ? " · " + esc(p.cidade) : ""}</p>
      <div class="ficha-contato">
        <a class="btn-acao btn-whats" href="${esc(linkWhats(p))}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z"/></svg>Chamar no WhatsApp</a>
        ${p.email ? `<a class="btn-acao btn-claro" href="mailto:${esc(p.email)}?subject=${encodeURIComponent("Sua proposta: " + (p.empresa || ""))}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>E-mail</a>` : ""}
        <button type="button" class="btn-acao btn-claro" data-acao="copiar">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/></svg>Copiar resumo</button>
      </div>
    </div>

    <div class="ficha-status">
      <span>Status</span>
      <div class="status-opcoes" role="group" aria-label="Status do pedido">
        ${Object.keys(STATUS).map((s) => `<button type="button" class="status-opcao" data-status="${s}" aria-pressed="${s === st}">${STATUS[s]}</button>`).join("")}
      </div>
    </div>

    <div class="ficha-corpo">
      <div class="bloco-info largo">
        <h3>Sobre o negócio</h3>
        <p class="sobre-txt">${esc(p.sobre || "")}</p>
      </div>
      <div class="bloco-info">
        <h3>Objetivos</h3>
        <div class="tags">${objetivosDe(p).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>
      <div class="bloco-info">
        <h3>Projeto</h3>
        <dl class="dados">
          <dt>Quer criar</dt><dd>${esc(p.criar || "—")}</dd>
          <dt>Prazo</dt><dd>${esc(p.prazo || "—")}</dd>
          <dt>Já tem site</dt><dd>${p.temSite ? (p.siteAtual ? linkSite(p.siteAtual) : "Sim") : "Não"}</dd>
        </dl>
      </div>
      <div class="bloco-info">
        <h3>Contato</h3>
        <dl class="dados">
          <dt>Nome</dt><dd>${esc(p.nome || "")}</dd>
          <dt>WhatsApp</dt><dd>${esc(p.whatsapp || "")}</dd>
          <dt>E-mail</dt><dd>${p.email ? `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>` : "—"}</dd>
          <dt>Prefere</dt><dd>${esc(p.preferencia || "—")}</dd>
        </dl>
      </div>
      <div class="bloco-info">
        <h3>Origem da visita</h3>
        <p>${origemTxt}</p>
      </div>
      <div class="bloco-info largo conversa">
        <h3>Conversa por e-mail ${p.email ? `<span class="conv-para">com ${esc(p.email)}</span>` : ""}</h3>
        <div class="mensagens" id="mensagens"></div>

        <div class="compor">
          <div class="ia-barra">
            <span class="ia-selo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>Gemini</span>
            <button type="button" class="ia-btn" data-ia="resposta">Sugerir resposta</button>
            <button type="button" class="ia-btn" data-ia="proposta">Montar proposta</button>
            <button type="button" class="ia-btn" data-ia="whatsapp">Mensagem de WhatsApp</button>
            <button type="button" class="ia-btn" data-ia="melhorar">Melhorar meu texto</button>
          </div>
          <label class="so-leitor" for="compor-assunto">Assunto</label>
          <input id="compor-assunto" class="compor-assunto" maxlength="160" placeholder="Assunto" ${p.email ? "" : "disabled"}>
          <label class="so-leitor" for="compor-texto">Mensagem</label>
          <textarea id="compor-texto" class="compor-texto" maxlength="20000" placeholder="${p.email ? "Escreva sua resposta, ou peça um rascunho ao Gemini…" : "Escreva aqui e mande pelo WhatsApp (este cliente não deixou e-mail)…"}"></textarea>
          <div class="compor-rodape">
            <span class="compor-estado" id="compor-estado"></span>
            <div class="compor-acoes">
              <button type="button" class="btn-acao btn-whats-l" data-acao="whats-texto">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z"/></svg>WhatsApp</button>
              <button type="button" class="btn-acao btn-email" data-acao="enviar-email" ${p.email ? "" : "disabled"}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l16-8-6 16-2.5-6.5z"/></svg>Enviar por e-mail</button>
            </div>
          </div>
        </div>

        <form class="pergunta" data-acao="perguntar">
          <label class="so-leitor" for="pergunta">Pergunte ao assistente</label>
          <input id="pergunta" maxlength="500" placeholder="Pergunte ao Gemini sobre este cliente: “o que devo perguntar antes de passar o preço?”">
          <button type="submit" class="ia-btn">Perguntar</button>
        </form>
        <div class="resposta-ia" id="resposta-ia" hidden></div>
      </div>

      <div class="bloco-info largo notas">
        <h3><label for="notas">Minhas anotações</label></h3>
        <textarea id="notas" maxlength="5000" placeholder="Ex.: liguei dia 22, quer orçamento com e sem loja. Retornar sexta.">${esc(p.notas || "")}</textarea>
        <span class="notas-estado" id="notas-estado">Só você vê. Salva sozinho.</span>
      </div>
    </div>

    <div class="ficha-rodape">
      <span>Pedido ${esc(p.id)}</span>
      <button type="button" class="btn-apagar" data-acao="apagar">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>Apagar pedido</button>
    </div>`;

  const r = rascunhos[p.id] || {};
  $("#compor-assunto").value = r.assunto ?? ("Sua proposta · " + (p.empresa || ""));
  $("#compor-texto").value = r.texto || "";
  renderMensagens();
}

function renderMensagens() {
  const caixa = $("#mensagens");
  if (!caixa) return;
  const lista = mensagens[selecionado] || [];
  if (!lista.length) {
    caixa.innerHTML = `<p class="msg-vazio">Nenhuma mensagem ainda. O que você enviar por aqui sai do seu Gmail, e quando o cliente responder, a resposta aparece aqui sozinha.</p>`;
    return;
  }
  caixa.innerHTML = lista.map((m) => `
    <div class="msg msg-${m.de === "eu" ? "eu" : "cliente"}">
      <div class="msg-bolha">${esc(m.texto || "")}</div>
      <span class="msg-quando">${m.de === "eu" ? "Você" : "Cliente"} · ${esc(dataCompleta(m.criadoEm))}</span>
    </div>`).join("");
  caixa.scrollTop = caixa.scrollHeight;
}

function ouvirMensagensDe(id) {
  if (pararMensagens) { pararMensagens(); pararMensagens = null; }
  if (!id || !fb.ouvirMensagens) return;
  pararMensagens = fb.ouvirMensagens(id, (lista) => {
    const antes = (mensagens[id] || []).length;
    mensagens[id] = lista;
    if (id === selecionado) renderMensagens();
    if (antes && lista.length > antes && lista[lista.length - 1].de === "cliente") toast("Resposta nova do cliente");
  });
}
function linkSite(v) {
  const t = String(v).trim();
  if (/^@/.test(t)) return `<a href="https://instagram.com/${esc(t.slice(1))}" target="_blank" rel="noopener">${esc(t)}</a>`;
  if (/^(https?:\/\/)?[\w-]+(\.[\w-]+)+/i.test(t)) return `<a href="${esc(/^https?:/i.test(t) ? t : "https://" + t)}" target="_blank" rel="noopener nofollow">${esc(t)}</a>`;
  return esc(t);
}
function atualizarStatusNaFicha(p) {
  $$(".status-opcao").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.status === (p.status || "nova"))));
}

// ---------- Eventos ----------
function abrir(id) {
  const mudou = selecionado !== id;
  selecionado = id;
  desfazer = null;
  if (mudou) ouvirMensagensDe(id);
  const p = pedidos.find((x) => x.id === id);
  if (p && p.novaResposta) { p.novaResposta = false; fb.atualizar(id, { novaResposta: false }).catch((e) => console.error(e)); }
  if (history.replaceState) history.replaceState(null, "", location.pathname + location.search + "#" + id);
  renderLista();
  renderFicha();
  document.body.classList.add("ficha-aberta");
  if (window.matchMedia("(min-width: 901px)").matches) {
    const f = $("#detalhe");
    if (f.getBoundingClientRect().top < 0) window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    $("#detalhe").scrollTop = 0;
  }
}

$("#itens").addEventListener("click", (e) => {
  const b = e.target.closest(".item");
  if (b) abrir(b.dataset.id);
});
$$(".filtro").forEach((b) => b.addEventListener("click", () => mudarFiltro(b.dataset.filtro)));
$$(".numero[data-filtro]").forEach((b) => b.addEventListener("click", () => mudarFiltro(filtro === b.dataset.filtro ? "todas" : b.dataset.filtro)));
function mudarFiltro(f) {
  filtro = f;
  $$(".filtro").forEach((x) => { const a = x.dataset.filtro === f; x.classList.toggle("ativo", a); x.setAttribute("aria-selected", String(a)); });
  renderNumeros();
  renderLista();
}
$("#busca").addEventListener("input", (e) => { busca = e.target.value; renderLista(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.body.classList.contains("ficha-aberta")) document.body.classList.remove("ficha-aberta");
});

let notasTimer = null;
$("#ficha").addEventListener("click", async (e) => {
  const p = pedidos.find((x) => x.id === selecionado);
  if (!p) return;
  const st = e.target.closest(".status-opcao");
  if (st) {
    const novo = st.dataset.status;
    if (novo === (p.status || "nova")) return;
    p.status = novo;
    atualizarStatusNaFicha(p);
    renderNumeros(); renderLista();
    try {
      await fb.atualizar(p.id, { status: novo });
      toast("Status: " + STATUS[novo]);
      fb.registrar("status", p.empresa + ": " + STATUS[novo], p.id);
    }
    catch (err) { toast("Não deu para salvar o status. Tente de novo."); console.error(err); }
    return;
  }
  const ia = e.target.closest("[data-ia]");
  if (ia) { pedirGemini(p, ia.dataset.ia, ia); return; }
  if (e.target.closest("[data-acao='desfazer']")) {
    if (desfazer !== null) { $("#compor-texto").value = desfazer; guardarRascunho(); desfazer = null; $("#compor-estado").textContent = ""; }
    return;
  }
  const acao = e.target.closest("button[data-acao]")?.dataset.acao;
  if (acao === "whats-texto") {
    const t = $("#compor-texto").value.trim();
    if (!t) { toast("Escreva a mensagem primeiro"); return; }
    const base = linkWhats(p).split("?")[0];
    window.open(base + "?text=" + encodeURIComponent(t), "_blank", "noopener");
    fb.registrar("whatsapp", "WhatsApp aberto para " + p.empresa + ": " + t.slice(0, 140), p.id);
    return;
  }
  if (acao === "enviar-email") { enviarEmail(p); return; }
  if (acao === "voltar") document.body.classList.remove("ficha-aberta");
  if (acao === "copiar") {
    try { await navigator.clipboard.writeText(resumoTexto(p)); toast("Resumo copiado"); }
    catch { toast("Não deu para copiar"); }
  }
  if (acao === "apagar") {
    if (!confirm("Apagar o pedido de " + (p.empresa || p.nome) + "? Isso não tem volta.")) return;
    try {
      await fb.apagar(p.id);
      selecionado = null;
      document.body.classList.remove("ficha-aberta");
      renderFicha();
      toast("Pedido apagado");
    } catch (err) { toast("Não deu para apagar. Tente de novo."); console.error(err); }
  }
});
function guardarRascunho() {
  if (!selecionado || !$("#compor-texto")) return;
  rascunhos[selecionado] = { assunto: $("#compor-assunto").value, texto: $("#compor-texto").value };
}

async function pedirGemini(p, tarefa, botao, pedido) {
  const area = $("#compor-texto");
  const rascunho = area.value.trim();
  if (tarefa === "melhorar" && !rascunho) { toast("Escreva um rascunho para o Gemini melhorar"); return; }
  const botoes = $$(".ia-btn", $("#ficha"));
  botoes.forEach((b) => { b.disabled = true; });
  botao.classList.add("pensando");
  const estado = $("#compor-estado");
  if (tarefa !== "livre") estado.textContent = "O Gemini está escrevendo…";
  try {
    const r = await chamarScript("gemini", { propostaId: p.id, tarefa, rascunho, pedido });
    if (selecionado !== p.id) return;
    if (tarefa === "livre") {
      const caixa = $("#resposta-ia");
      caixa.textContent = r.texto;
      caixa.hidden = false;
    } else {
      desfazer = area.value;
      area.value = r.texto;
      guardarRascunho();
      estado.innerHTML = 'Rascunho do Gemini: revise antes de enviar. <button type="button" class="link" data-acao="desfazer">Desfazer</button>';
      area.focus();
      area.setSelectionRange(0, 0);
      area.scrollTop = 0;
    }
  } catch (err) {
    console.error(err);
    estado.textContent = "";
    toast(erroMotor(err));
  } finally {
    botoes.forEach((b) => { b.disabled = false; });
    botao.classList.remove("pensando");
  }
}

async function enviarEmail(p) {
  const texto = $("#compor-texto").value.trim();
  const assunto = $("#compor-assunto").value.trim();
  if (!p.email) { toast(ERROS_MOTOR["cliente-sem-email"]); return; }
  if (texto.length < 2) { toast("Escreva a mensagem primeiro"); return; }
  if (!confirm("Enviar este e-mail para " + p.email + "?")) return;
  const botao = $("[data-acao='enviar-email']");
  botao.disabled = true;
  $("#compor-estado").textContent = "Enviando pelo seu Gmail…";
  try {
    await chamarScript("enviarEmail", { propostaId: p.id, assunto, texto });
    delete rascunhos[p.id];
    if (selecionado === p.id) {
      $("#compor-texto").value = "";
      $("#compor-estado").textContent = "Enviado. A resposta do cliente vai aparecer aqui.";
    }
    desfazer = null;
    toast("E-mail enviado para " + p.email);
  } catch (err) {
    console.error(err);
    $("#compor-estado").textContent = "";
    toast(erroMotor(err));
  } finally {
    if (botao.isConnected) botao.disabled = false;
  }
}

$("#ficha").addEventListener("submit", (e) => {
  e.preventDefault();
  const p = pedidos.find((x) => x.id === selecionado);
  const q = $("#pergunta").value.trim();
  if (!p || !q) return;
  pedirGemini(p, "livre", e.target.querySelector("button"), q);
});

$("#ficha").addEventListener("input", (e) => {
  if (e.target.id === "compor-texto" || e.target.id === "compor-assunto") { guardarRascunho(); return; }
  if (e.target.id !== "notas") return;
  const id = selecionado;
  const texto = e.target.value;
  $("#notas-estado").textContent = "Digitando…";
  clearTimeout(notasTimer);
  notasTimer = setTimeout(async () => {
    $("#notas-estado").textContent = "Salvando…";
    try {
      await fb.atualizar(id, { notas: texto });
      const est = $("#notas-estado");
      if (est && selecionado === id) est.textContent = "Salvo às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    } catch (err) {
      $("#notas-estado").textContent = "Não salvou. Verifique a internet.";
      console.error(err);
    }
  }, 900);
});

// Planilha (CSV que abre no Excel e no Google Planilhas)
$("#btn-csv").addEventListener("click", () => {
  const cols = [
    ["Recebido em", (p) => dataCompleta(p.criadoEm)], ["Status", (p) => STATUS[p.status || "nova"]],
    ["Negócio", (p) => p.empresa], ["Ramo", (p) => p.ramo], ["Cidade", (p) => p.cidade],
    ["Nome", (p) => p.nome], ["WhatsApp", (p) => p.whatsapp], ["E-mail", (p) => p.email], ["Prefere", (p) => p.preferencia],
    ["Quer criar", (p) => p.criar], ["Objetivos", (p) => objetivosDe(p).join("; ")], ["Já tem site", (p) => (p.temSite ? "Sim " + (p.siteAtual || "") : "Não")],
    ["Prazo", (p) => p.prazo], ["Sobre", (p) => p.sobre], ["Anúncio", (p) => (veioDeAnuncio(p) ? "Sim" : "Não")],
    ["Origem", (p) => Object.entries(p.origem || {}).map(([k, v]) => k + "=" + v).join(" ")], ["Anotações", (p) => p.notas]
  ];
  const cel = (v) => {
    let s = String(v ?? "").replace(/\r?\n/g, " ");
    if (/^[=+\-@]/.test(s)) s = "'" + s;   // evita fórmula ao abrir na planilha
    return '"' + s.replace(/"/g, '""') + '"';
  };
  const linhas = [cols.map((c) => cel(c[0])).join(";")].concat(filtrados().map((p) => cols.map((c) => cel(c[1](p))).join(";")));
  const blob = new Blob(["﻿" + linhas.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "propostas-" + new Date().toISOString().slice(0, 10) + ".csv";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
});

// ---------- Configurações: Gemini, instruções, e-mails ----------
const dlg = $("#config");
function mostrarEstadoMotor(s) {
  const g = $("#cfg-gemini-estado");
  g.textContent = s.gemini ? "Ligado · " + (s.modelo || "") : "Falta a chave";
  g.className = "config-estado " + (s.gemini ? "ok" : "falta");
  const e = $("#cfg-email-estado");
  e.textContent = s.gatilho ? "Ligado" : "Gatilho desligado";
  e.className = "config-estado " + (s.gatilho ? "ok" : "falta");
  $("#cfg-email-lista").innerHTML =
    `<li>Aviso de proposta nova vai para <b>${esc(s.avisoPara || "")}</b></li>` +
    `<li>Suas respostas saem como <b>${esc(s.enviaComo || "")}</b></li>` +
    `<li>Respostas dos clientes entram no painel a cada 5 minutos</li>`;
}
async function abrirConfig() {
  if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  $("#cfg-chave").value = "";
  $("#cfg-gemini-estado").textContent = "Verificando…";
  $("#cfg-gemini-estado").className = "config-estado";
  try { $("#cfg-instrucoes").value = (await fb.lerConfig()).instrucoes || ""; } catch (e) { console.error(e); }
  try { mostrarEstadoMotor(await chamarScript("estado")); }
  catch (err) {
    $("#cfg-gemini-estado").textContent = erroMotor(err);
    $("#cfg-gemini-estado").className = "config-estado falta";
    $("#cfg-email-lista").innerHTML = "";
  }
}
$("#btn-config").addEventListener("click", abrirConfig);
dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
$("#cfg-salvar-chave").addEventListener("click", async (e) => {
  const chave = $("#cfg-chave").value.trim();
  if (chave.length < 20) { toast("Cole a chave do Gemini"); return; }
  e.target.disabled = true; e.target.textContent = "Testando…";
  try {
    mostrarEstadoMotor(await chamarScript("config", { geminiKey: chave }));
    $("#cfg-chave").value = "";
    toast("Chave do Gemini salva e testada");
  } catch (err) { toast(erroMotor(err)); }
  finally { e.target.disabled = false; e.target.textContent = "Salvar chave"; }
});
$("#cfg-salvar-instr").addEventListener("click", async () => {
  try {
    await fb.salvarConfig({ instrucoes: $("#cfg-instrucoes").value.slice(0, 6000) });
    $("#cfg-instr-estado").textContent = "Salvo às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  } catch (err) { console.error(err); toast("Não deu para salvar as instruções"); }
});
$("#cfg-sincronizar").addEventListener("click", async (e) => {
  e.target.disabled = true;
  $("#cfg-sync-estado").textContent = "Buscando no Gmail…";
  try {
    const r = await chamarScript("sincronizar");
    $("#cfg-sync-estado").textContent = r.ocupado ? "Já estava buscando. Tente em 1 minuto." : (r.respostas || 0) + " resposta(s) nova(s)";
  } catch (err) { $("#cfg-sync-estado").textContent = ""; toast(erroMotor(err)); }
  finally { e.target.disabled = false; }
});

// ---------- Entrar / sair ----------
$("#btn-entrar").addEventListener("click", async () => {
  const b = $("#btn-entrar");
  b.disabled = true; $("#btn-entrar-txt").textContent = "Abrindo o Google…";
  $("#entrar-erro").hidden = true; $("#negado").hidden = true;
  try { await fb.entrar(); }
  catch (err) {
    if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
      $("#entrar-erro").textContent = err.code === "auth/unauthorized-domain"
        ? "Este endereço ainda não foi autorizado no Firebase (Authentication > Configurações > Domínios autorizados)."
        : err.code === "auth/popup-blocked"
          ? "O navegador bloqueou a janela do Google. Permita pop-ups para este site e clique de novo."
          : "Não foi possível entrar agora (" + (err.code || "erro") + "). Tente de novo.";
      $("#entrar-erro").hidden = false;
    }
    console.error(err);
  } finally {
    b.disabled = false; $("#btn-entrar-txt").textContent = "Entrar com Google";
  }
});
$("#btn-sair").addEventListener("click", () => fb.sair());

function mostrarUsuario(u) {
  $("#usuario-nome").textContent = u.displayName || "Você";
  $("#usuario-email").textContent = u.email || "";
  $("#usuario-inicial").textContent = iniciais(u.displayName || u.email || "?");
  const foto = $("#usuario-foto");
  if (u.photoURL) { foto.src = u.photoURL; foto.hidden = false; } else foto.hidden = true;
}

function aoEntrar(u) {
  mostrarUsuario(u);
  primeiraCarga = true;
  if (pararDeOuvir) pararDeOuvir();
  pararDeOuvir = fb.ouvir((lista, adicionados) => {
    pedidos = lista;
    const novos = primeiraCarga ? [] : adicionados;
    if (novos.length) {
      const p = pedidos.find((x) => x.id === novos[0]);
      toast(novos.length > 1 ? novos.length + " pedidos novos chegaram" : "Pedido novo: " + (p?.empresa || p?.nome || ""));
    }
    renderNumeros();
    renderLista(novos);
    const sel = pedidos.find((x) => x.id === selecionado);
    if (!sel) { if (selecionado) { selecionado = null; renderFicha(); } }
    else if (document.activeElement && document.activeElement.closest && document.activeElement.closest("#ficha") && /INPUT|TEXTAREA/.test(document.activeElement.tagName)) atualizarStatusNaFicha(sel);
    else if (!primeiraCarga) {
      // atualiza a ficha aberta sem perder a rolagem
      const det = $("#detalhe"), y = det.scrollTop;
      renderFicha(); det.scrollTop = y;
    }
    if (primeiraCarga) {
      primeiraCarga = false;
      tela("painel");
      const doLink = location.hash.slice(1);
      if (doLink && pedidos.some((x) => x.id === doLink)) abrir(doLink);
      else if (window.matchMedia("(min-width: 901px)").matches && pedidos[0]) abrir(pedidos[0].id);
    }
  }, (err) => {
    console.error(err);
    if (err.code === "permission-denied") {
      $("#negado-email").textContent = u.email || "usada";
      $("#negado").hidden = false;
      fb.sair();
    } else {
      $("#entrar-erro").textContent = "Não foi possível carregar os pedidos (" + (err.code || "erro") + ").";
      $("#entrar-erro").hidden = false;
      tela("entrar");
    }
  });
}

// ---------- Início ----------
(async function iniciar() {
  if (!DEMO && !(cfg.projectId && cfg.apiKey)) {
    tela("entrar");
    $("#entrar-erro").textContent = "O painel ainda não está ligado ao Firebase. Preencha negocios/firebase-config.js.";
    $("#entrar-erro").hidden = false;
    $("#btn-entrar").disabled = true;
    return;
  }
  try {
    fb = DEMO ? criarDemo() : await carregarFirebase();
  } catch (err) {
    console.error(err);
    tela("entrar");
    $("#entrar-erro").textContent = "Não foi possível carregar o Firebase. Verifique a internet e recarregue.";
    $("#entrar-erro").hidden = false;
    return;
  }
  fb.aoMudarUsuario((u) => {
    if (u) aoEntrar(u);
    else {
      if (pararDeOuvir) { pararDeOuvir(); pararDeOuvir = null; }
      pedidos = []; selecionado = null;
      tela("entrar");
    }
  });
  // mantém o "há X min" atualizado
  setInterval(() => { if (document.body.dataset.tela === "painel") renderLista(); }, 60000);
})();
