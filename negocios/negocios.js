/*
  Studio Magalhães para negócios: comportamento da página.

  Para onde vão os pedidos: cada pedido vira um documento na coleção "propostas" do
  Firestore (Firebase), e o Paulo vê todos no painel (negocios/painel/), entrando com o Google.
  O projeto do Firebase fica em negocios/firebase-config.js.

  CONFIGURAÇÃO (é só mexer aqui)
  - googleAds: preencha quando criar a conversão no Google Ads (Metas > Conversões > Site).
    id: "AW-123456789" e conversao: "AW-123456789/AbCdEfGh". Vazio = nada é carregado.
*/
(function () {
  "use strict";

  const CONFIG = {
    email: "negocios@studiomagalhaes.com.br",
    firebase: window.SM_FIREBASE || {},
    googleAds: { id: "", conversao: "" }
  };

  const doc = document.documentElement;
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  // ---------- Google Ads (só se configurado) ----------
  function gtag() { (window.dataLayer = window.dataLayer || []).push(arguments); }
  if (CONFIG.googleAds.id) {
    window.gtag = gtag;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(CONFIG.googleAds.id);
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", CONFIG.googleAds.id);
  }

  // ---------- Origem da visita (para saber o que veio do anúncio) ----------
  const ORIGEM_CHAVES = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
  const origem = (function () {
    const p = new URLSearchParams(location.search);
    const daUrl = {};
    ORIGEM_CHAVES.forEach((k) => { if (p.get(k)) daUrl[k] = p.get(k).slice(0, 120); });
    try {
      if (Object.keys(daUrl).length) sessionStorage.setItem("sm-origem", JSON.stringify(daUrl));
      else return JSON.parse(sessionStorage.getItem("sm-origem") || "{}");
    } catch (e) { /* armazenamento bloqueado: segue só com a URL */ }
    return daUrl;
  })();

  // ---------- Topo ----------
  const topo = $("#topo");
  const aoRolar = () => topo.classList.toggle("rolou", window.scrollY > 8);
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });

  const ano = $("#ano");
  if (ano) ano.textContent = new Date().getFullYear();

  // ---------- Revelar ao rolar ----------
  const revelar = $$(".revelar");
  if ("IntersectionObserver" in window && !reduzir) {
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        const irmaos = Array.from(e.target.parentElement.children).filter((c) => c.classList.contains("revelar"));
        const i = Math.max(0, irmaos.indexOf(e.target));
        e.target.style.transitionDelay = Math.min(i * 70, 420) + "ms";
        e.target.classList.add("visivel");
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revelar.forEach((el) => io.observe(el));
  } else {
    revelar.forEach((el) => el.classList.add("visivel"));
  }

  // ---------- Vitrine: um site sendo montado para negócios diferentes ----------
  const TEMAS = [
    { tema: "padaria", dominio: "padariatrigobom.com.br", nome: "Trigo Bom", tag: "Padaria artesanal", titulo: "Pão quentinho toda manhã", botao: "Ver cardápio", aviso: "“Vocês fazem encomenda para festa?”", legenda: "Cardápio + encomendas" },
    { tema: "clinica", dominio: "sorrisoleve.com.br", nome: "Sorriso Leve", tag: "Clínica odontológica", titulo: "Seu sorriso em boas mãos", botao: "Agendar consulta", aviso: "“Tem horário na quinta à tarde?”", legenda: "Agendamento online" },
    { tema: "oficina", dominio: "pistacerta.com.br", nome: "Pista Certa", tag: "Mecânica e revisão", titulo: "Revisão completa, sem surpresa", botao: "Pedir orçamento", aviso: "“Quanto fica a revisão do meu carro?”", legenda: "Orçamento pelo WhatsApp" }
  ];
  const navegador = $(".navegador");
  if (navegador) {
    const aviso = $(".aviso-flutuante");
    const pontos = $$(".vitrine-pontos i");
    const campos = {
      dominio: $(".v-dominio"), nome: $(".v-nome"), tag: $(".v-tag"), titulo: $(".v-titulo"),
      botao: $(".v-botao"), aviso: $(".v-aviso"), legenda: $(".v-legenda")
    };
    let atual = 0;
    let visivel = true;
    let timer = null;

    const aplicar = (t) => {
      navegador.dataset.tema = t.tema;
      Object.keys(campos).forEach((k) => { if (campos[k]) campos[k].textContent = t[k]; });
      pontos.forEach((p, i) => p.classList.toggle("ativo", i === atual));
    };
    const proximo = () => {
      if (!visivel || document.hidden) return;
      atual = (atual + 1) % TEMAS.length;
      if (reduzir) { aplicar(TEMAS[atual]); return; }
      navegador.classList.add("montando");
      aviso.classList.add("saindo");
      setTimeout(() => aplicar(TEMAS[atual]), 460);
      setTimeout(() => navegador.classList.remove("montando"), 620);
      setTimeout(() => aviso.classList.remove("saindo"), 1300);
    };
    timer = setInterval(proximo, reduzir ? 6000 : 4300);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { visivel = e.isIntersecting; }).observe(navegador);
    }
    window.addEventListener("pagehide", () => clearInterval(timer));
  }

  // ---------- Barra fixa no celular ----------
  const barra = $("#barra-celular");
  const hero = $(".hero");
  const secProposta = $("#proposta");
  if (barra && "IntersectionObserver" in window) {
    let heroVisivel = true, propostaVisivel = false;
    const atualizar = () => barra.classList.toggle("mostrar", !heroVisivel && !propostaVisivel);
    new IntersectionObserver(([e]) => { heroVisivel = e.isIntersecting; atualizar(); }, { threshold: 0.05 }).observe(hero);
    new IntersectionObserver(([e]) => { propostaVisivel = e.isIntersecting; atualizar(); }, { threshold: 0 }).observe(secProposta);
  }

  // ---------- Exemplos: sites de marcas fictícias em miniatura ----------
  const AMOSTRAS = {
    "brasa-e-sal": { nome: "Brasa & Sal", dominio: "brasaesal.com.br", desc: "Restaurante: cardápio com abas, reserva de mesa e visual de alta gastronomia." },
    "clinica-alvorada": { nome: "Clínica Alvorada", dominio: "clinicaalvorada.com.br", desc: "Clínica: agendamento online com horários livres, tratamentos e equipe." },
    "traco-norte": { nome: "Traço Norte", dominio: "traconorte.arq.br", desc: "Arquitetura: portfólio editorial, prévia dos projetos ao passar o mouse e briefing." },
    "patas-e-cia": { nome: "Patas & Cia", dominio: "patasecia.com.br", desc: "Pet shop: loja com categorias, carrinho e banho & tosa com hora marcada." },
    "pulso-academia": { nome: "Pulso", dominio: "pulsoacademia.com.br", desc: "Academia: grade de aulas por dia, planos e aula experimental." }
  };
  const tela = $("#amostra-tela");
  if (tela) {
    const janela = $("#amostra-janela");
    const frame = $("#amostra-frame");
    const desc = $("#amostra-desc");
    const endereco = $("#amostra-endereco");
    const abas = $$(".amostra-aba");
    const modos = $$(".modo");
    const TAM = { pc: { w: 1280, h: 800 }, cel: { w: 390, h: 760 } };
    let atualA = "brasa-e-sal";
    let modo = window.matchMedia("(max-width: 640px)").matches ? "cel" : "pc";
    let carregou = false;

    const ajustar = () => {
      const t = TAM[modo];
      const largura = janela.clientWidth || 1;
      const escala = Math.min(1, largura / t.w);
      frame.style.width = t.w + "px";
      frame.style.height = t.h + "px";
      frame.style.transform = "scale(" + escala + ")";
      janela.style.height = Math.round(t.h * escala) + "px";
    };
    const carregar = () => {
      const a = AMOSTRAS[atualA];
      janela.classList.add("carregando");
      frame.title = "Exemplo de site: " + a.nome;
      frame.src = "amostras/" + atualA + ".html";
      endereco.textContent = a.dominio;
      desc.textContent = a.desc;
      carregou = true;
    };
    frame.addEventListener("load", () => janela.classList.remove("carregando"));
    const aplicarModo = () => {
      tela.dataset.modo = modo;
      modos.forEach((m) => { const on = m.dataset.modo === modo; m.classList.toggle("ativo", on); m.setAttribute("aria-pressed", String(on)); });
      requestAnimationFrame(ajustar);
      setTimeout(ajustar, 520);   // depois da transição da moldura
    };
    abas.forEach((b) => b.addEventListener("click", () => {
      if (b.dataset.amostra === atualA) return;
      atualA = b.dataset.amostra;
      abas.forEach((x) => { const on = x === b; x.classList.toggle("ativa", on); x.setAttribute("aria-selected", String(on)); });
      carregar();
    }));
    modos.forEach((m) => m.addEventListener("click", () => { modo = m.dataset.modo; aplicarModo(); }));
    if ("ResizeObserver" in window) new ResizeObserver(ajustar).observe(janela);
    window.addEventListener("resize", ajustar);
    aplicarModo();
    // só carrega o exemplo quando a seção estiver chegando na tela
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !carregou) { carregar(); io.disconnect(); } }, { rootMargin: "400px 0px" });
      io.observe(tela);
    } else carregar();
  }

  // ---------- Formulário ----------
  const form = $("#form-proposta");
  if (!form) return;

  const etapas = $$(".etapa", form);
  const indicadores = $$(".progresso li", form);
  const barraProg = $(".progresso-barra i", form);
  const objetivos = $$('input[name="objetivos"]', form);
  const outrosCheck = $("#obj-outros");
  const campoOutros = $("#campo-outros");
  const outrosTxt = $("#outros-txt");
  const campoSite = $("#campo-site");
  const sobre = $("#sobre");
  const contador = $("#contador");
  const whatsapp = $("#whatsapp");
  const aceite = $("#aceite");
  const linkDados = $(".link-dados");
  const dadosInfo = $("#dados-info");
  const btnEnviar = $(".btn-enviar", form);
  const falha = $("#falha");
  const sucesso = $("#sucesso");
  let etapaAtual = 1;

  const valor = (nome) => {
    const el = form.elements[nome];
    if (!el) return "";
    if (el instanceof RadioNodeList) return el.value || "";
    return (el.value || "").trim();
  };
  const objetivosMarcados = () => objetivos.filter((o) => o.checked).map((o) => o.value);

  // Resumo ao lado
  const r = {
    empresa: $("#r-empresa"), criar: $("#r-criar"), objetivos: $("#r-objetivos"),
    ramo: $("#r-ramo"), contato: $("#r-contato")
  };
  function atualizarResumo() {
    r.empresa.textContent = valor("empresa") || "Seu negócio";
    r.criar.textContent = valor("criar") || "—";
    r.ramo.textContent = valor("ramo") || "—";
    const nome = valor("nome");
    r.contato.textContent = nome ? nome + " · " + (valor("preferencia") || "WhatsApp") : "—";

    const lista = objetivosMarcados().map((v) => (v === "Outros" && outrosTxt.value.trim()) ? outrosTxt.value.trim() : v);
    const atuais = Array.from(r.objetivos.children).map((li) => li.textContent);
    if (lista.join("|") === atuais.join("|")) return;
    r.objetivos.innerHTML = "";
    if (!lista.length) {
      const li = document.createElement("li");
      li.className = "vazio"; li.textContent = "Escolha ao lado";
      r.objetivos.appendChild(li);
      return;
    }
    lista.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t.length > 42 ? t.slice(0, 40) + "…" : t;
      r.objetivos.appendChild(li);
    });
  }
  form.addEventListener("input", atualizarResumo);
  form.addEventListener("change", atualizarResumo);

  // "Outros" abre o campo de texto
  outrosCheck.addEventListener("change", () => {
    campoOutros.hidden = !outrosCheck.checked;
    if (outrosCheck.checked) outrosTxt.focus();
    else limparErro(campoOutros);
  });
  objetivos.forEach((o) => o.addEventListener("change", () => { $("#erro-obj").textContent = ""; }));

  // "Já tem site?" abre o endereço
  $$('input[name="temSite"]', form).forEach((rd) => rd.addEventListener("change", () => {
    campoSite.hidden = valor("temSite") !== "Sim";
  }));

  // Contador de caracteres
  sobre.addEventListener("input", () => { contador.textContent = sobre.value.length; });

  // Máscara do WhatsApp: (21) 99999-9999
  whatsapp.addEventListener("input", () => {
    const d = whatsapp.value.replace(/\D/g, "").slice(0, 11);
    let f = d;
    if (d.length > 2) f = "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length > 7) f = "(" + d.slice(0, 2) + ") " + d.slice(2, d.length === 11 ? 7 : 6) + "-" + d.slice(d.length === 11 ? 7 : 6);
    whatsapp.value = f;
  });

  // Como usamos seus dados
  linkDados.addEventListener("click", (e) => {
    e.preventDefault();
    const abrir = dadosInfo.hidden;
    dadosInfo.hidden = !abrir;
    linkDados.setAttribute("aria-expanded", String(abrir));
  });

  // Validação
  function marcarErro(campo, msg) {
    campo.classList.add("invalido"); campo.classList.remove("valido");
    const e = $(".erro", campo); if (e) e.textContent = msg;
    const inp = $("input, textarea", campo); if (inp) inp.setAttribute("aria-invalid", "true");
  }
  function limparErro(campo, ok) {
    campo.classList.remove("invalido"); campo.classList.toggle("valido", !!ok);
    const e = $(".erro", campo); if (e) e.textContent = "";
    const inp = $("input, textarea", campo); if (inp) inp.removeAttribute("aria-invalid");
  }
  const REGRAS = {
    outros: (v) => v.length >= 3 || "Conte rapidinho qual é o outro objetivo.",
    empresa: (v) => v.length >= 2 || "Qual é o nome do seu negócio?",
    ramo: (v) => v.length >= 2 || "Qual é o ramo do negócio?",
    sobre: (v) => v.length >= 15 || "Conte um pouco mais (pelo menos uma frase) para a proposta sair certinha.",
    nome: (v) => v.length >= 2 || "Como podemos te chamar?",
    whatsapp: (v) => { const d = v.replace(/\D/g, ""); return (d.length === 10 || d.length === 11) || "Coloque o WhatsApp com DDD, por exemplo (21) 99999-9999."; },
    email: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "Esse e-mail parece incompleto."
  };
  function validarCampo(input) {
    const regra = REGRAS[input.name];
    if (!regra) return true;
    const campo = input.closest(".campo");
    const res = regra(input.value.trim());
    if (res === true) { limparErro(campo, input.value.trim() !== ""); return true; }
    marcarErro(campo, res);
    return false;
  }
  form.addEventListener("blur", (e) => {
    const el = e.target;
    if (el.matches("input, textarea") && el.closest(".campo") && el.value.trim()) validarCampo(el);
  }, true);
  form.addEventListener("input", (e) => {
    const campo = e.target.closest(".campo");
    if (campo && campo.classList.contains("invalido")) validarCampo(e.target);
  });
  aceite.addEventListener("change", () => {
    aceite.closest(".aceite").classList.remove("invalido");
    $(".erro-aceite").textContent = "";
  });

  function validarEtapa(n) {
    let primeiroErro = null;
    const anotar = (el) => { if (!primeiroErro) primeiroErro = el; };
    if (n === 1) {
      if (!objetivosMarcados().length) {
        $("#erro-obj").textContent = "Marque pelo menos um objetivo (pode ser mais de um).";
        anotar(objetivos[0]);
      }
      if (outrosCheck.checked && !validarCampo(outrosTxt)) anotar(outrosTxt);
    }
    if (n === 2) {
      ["empresa", "ramo", "sobre"].forEach((k) => { if (!validarCampo(form.elements[k])) anotar(form.elements[k]); });
    }
    if (n === 3) {
      ["nome", "whatsapp", "email"].forEach((k) => { if (!validarCampo(form.elements[k])) anotar(form.elements[k]); });
      if (!aceite.checked) {
        aceite.closest(".aceite").classList.add("invalido");
        $(".erro-aceite").textContent = "Para enviar, marque que concorda com o uso dos dados.";
        anotar(aceite);
      }
    }
    if (primeiroErro) {
      primeiroErro.focus({ preventScroll: true });
      const alvo = primeiroErro.closest(".campo, .grupo-obj, .aceite") || primeiroErro;
      alvo.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "center" });
      return false;
    }
    return true;
  }

  function irPara(n) {
    etapaAtual = n;
    etapas.forEach((et) => {
      const ativa = Number(et.dataset.etapa) === n;
      et.hidden = !ativa;
      et.classList.toggle("ativa", ativa);
    });
    indicadores.forEach((li, i) => {
      li.classList.toggle("ativo", i + 1 === n);
      li.classList.toggle("feito", i + 1 < n);
      if (i + 1 === n) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
    });
    barraProg.style.width = (n / 3) * 100 + "%";
    const topoForm = form.getBoundingClientRect().top;
    if (topoForm < 70) form.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "start" });
    const primeiro = $(".etapa.ativa input:not([type=radio]):not([type=checkbox]), .etapa.ativa textarea", form);
    if (primeiro && n > 1) setTimeout(() => primeiro.focus({ preventScroll: true }), 350);
  }

  form.addEventListener("click", (e) => {
    if (e.target.closest("[data-avancar]")) {
      if (validarEtapa(etapaAtual)) irPara(etapaAtual + 1);
    } else if (e.target.closest("[data-voltar]")) {
      irPara(etapaAtual - 1);
    }
  });
  // Enter num campo de texto avança em vez de enviar antes da hora
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.matches("input") && etapaAtual < 3) {
      e.preventDefault();
      if (validarEtapa(etapaAtual)) irPara(etapaAtual + 1);
    }
  });

  // Envio
  function montarDados() {
    const objs = objetivosMarcados().map((v) => (v === "Outros" ? "Outros: " + valor("outros") : v));
    const origemTxt = Object.keys(origem).map((k) => k + "=" + origem[k]).join(" · ") || "direto";
    return {
      "Nome": valor("nome"),
      "WhatsApp": valor("whatsapp"),
      "E-mail": valor("email") || "(não informado)",
      "Prefere receber por": valor("preferencia"),
      "Negócio": valor("empresa"),
      "Ramo": valor("ramo"),
      "Cidade": valor("cidade") || "(não informada)",
      "Quer criar": valor("criar"),
      "Objetivos": objs.join("; "),
      "Sobre o negócio": valor("sobre"),
      "Já tem site": valor("temSite") === "Sim" ? "Sim: " + (valor("siteAtual") || "(sem endereço)") : "Não",
      "Prazo": valor("prazo"),
      "Origem da visita": origemTxt
    };
  }
  // O mesmo pedido no formato do Firestore. As regras do Firestore conferem cada campo; elas ficam
  // fora deste repositório (têm o e-mail de quem entra no painel). Mudou um campo aqui? Mude lá também.
  function documentoFirestore() {
    const s = (v, max) => ({ stringValue: String(v || "").slice(0, max) });
    const origemCampos = {};
    Object.keys(origem).forEach((k) => { origemCampos[k] = s(origem[k], 120); });
    return {
      nome: s(valor("nome"), 80),
      whatsapp: s(valor("whatsapp"), 20),
      email: s(valor("email"), 120),
      preferencia: s(valor("preferencia"), 20),
      empresa: s(valor("empresa"), 100),
      ramo: s(valor("ramo"), 80),
      cidade: s(valor("cidade"), 80),
      criar: s(valor("criar"), 30),
      objetivos: { arrayValue: { values: objetivosMarcados().map((v) => s(v, 60)) } },
      outros: s(outrosCheck.checked ? valor("outros") : "", 200),
      sobre: s(valor("sobre"), 1500),
      temSite: { booleanValue: valor("temSite") === "Sim" },
      siteAtual: s(valor("temSite") === "Sim" ? valor("siteAtual") : "", 200),
      prazo: s(valor("prazo"), 30),
      origem: { mapValue: { fields: origemCampos } },
      status: s("nova", 10),
      criadoEm: { timestampValue: new Date().toISOString() }
    };
  }
  function linkEmail(dados) {
    const corpo = Object.keys(dados).map((k) => k + ": " + dados[k]).join("\n");
    return "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent("Pedido de proposta: " + dados["Negócio"]) +
      "&body=" + encodeURIComponent(corpo);
  }
  function mostrarSucesso() {
    $$(".etapa, .progresso, .progresso-barra", form).forEach((el) => { el.hidden = true; });
    $("#sucesso-nome").textContent = valor("nome").split(" ")[0] || "obrigado";
    $("#sucesso-canal").textContent = valor("preferencia");
    sucesso.hidden = false;
    form.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "start" });
    setTimeout(() => sucesso.focus({ preventScroll: true }), 400);
    if (CONFIG.googleAds.conversao) gtag("event", "conversion", { send_to: CONFIG.googleAds.conversao });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (etapaAtual < 3) { if (validarEtapa(etapaAtual)) irPara(etapaAtual + 1); return; }
    if (!validarEtapa(3)) return;
    falha.hidden = true;

    // Robô preencheu o campo escondido: finge que deu certo e não manda nada
    if (form.elements._honey.value) { mostrarSucesso(); return; }

    const dados = montarDados();
    btnEnviar.classList.add("enviando");
    $(".enviar-txt", btnEnviar).textContent = "Enviando…";
    try {
      const fb = CONFIG.firebase;
      if (!fb.projectId || !fb.apiKey) throw new Error("Firebase não configurado");
      const url = "https://firestore.googleapis.com/v1/projects/" + encodeURIComponent(fb.projectId) +
        "/databases/(default)/documents/propostas?key=" + encodeURIComponent(fb.apiKey);
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: documentoFirestore() })
      });
      if (!resp.ok) throw new Error("Firestore respondeu " + resp.status);
      // Avisa o motor (Apps Script) para mandar o e-mail de aviso na hora.
      // Se falhar, ele mesmo encontra o pedido na verificação de 5 em 5 minutos.
      try {
        const salvo = await resp.json();
        const id = String((salvo && salvo.name) || "").split("/").pop();
        if (fb.scriptUrl && id) {
          fetch(fb.scriptUrl, { method: "POST", mode: "no-cors", keepalive: true, body: JSON.stringify({ acao: "novaProposta", id }) }).catch(() => {});
        }
      } catch (e) { /* o aviso não pode atrapalhar o envio */ }
      mostrarSucesso();
    } catch (err) {
      falha.innerHTML = "";
      falha.append("Não conseguimos enviar agora. Seus dados continuam aqui: tente de novo em instantes ou ");
      const a = document.createElement("a");
      a.href = linkEmail(dados);
      a.textContent = "mande por e-mail com um clique";
      falha.append(a, ".");
      falha.hidden = false;
    } finally {
      btnEnviar.classList.remove("enviando");
      $(".enviar-txt", btnEnviar).textContent = "Solicitar proposta";
    }
  });

  atualizarResumo();
})();
