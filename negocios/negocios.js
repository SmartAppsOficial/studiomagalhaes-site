/*
  Studio Magalhães para negócios: comportamento da página.
  Visual: títulos que entram palavra por palavra, cena 3D no topo (segue o mouse no computador),
  site que se monta sozinho em "Como funciona" e exemplos com recursos e cores para testar.

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
    googleAds: { id: "AW-18540873272", conversao: "AW-18540873272/w_nMCPPk7bwdELiM_YhF" }
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

  const ano = $("#ano");
  if (ano) ano.textContent = new Date().getFullYear();

  // ?movimento na URL liga as animações mesmo com "reduzir movimento" (útil para conferir).
  const forcar = new URLSearchParams(location.search).has("movimento");
  if (forcar) doc.classList.add("forcar");
  const calmo = reduzir && !forcar;
  const mouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const io = (cb, opcoes) => ("IntersectionObserver" in window ? new IntersectionObserver(cb, opcoes) : null);

  // ---------- Títulos palavra por palavra + blocos que sobem ----------
  $$(".palavras").forEach((h) => {
    const quebrar = (n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.append(p); return; }
          const w = document.createElement("span"); w.className = "w";
          const s = document.createElement("span"); s.textContent = p;
          w.append(s); frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== "BR") Array.from(n.childNodes).forEach(quebrar);
    };
    Array.from(h.childNodes).forEach(quebrar);
    $$(".w>span", h).forEach((s, i) => { s.style.transitionDelay = i * 70 + "ms"; });
  });
  const entrar = io((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); entrar.unobserve(e.target); } }), { threshold: 0.2 });
  $$(".palavras, .sobe").forEach((el) => (entrar ? entrar.observe(el) : el.classList.add("on")));

  // ---------- Abertura: cena 3D com sites de verdade ----------
  // No computador as telas seguem o mouse; no celular balançam devagar sozinhas.
  const VITRINE = [
    ["brasa-e-sal", "brasaesal.com.br", "Reservas", "“Vocês fazem encomenda?”"],
    ["clinica-alvorada", "clinicaalvorada.com.br", "Agenda online", "“Tem horário na quinta?”"],
    ["patas-e-cia", "patasecia.com.br", "Loja virtual", "“Entregam no meu bairro?”"]
  ];
  const cena = $("#cena");
  const vTela = $("#v-tela"), vCel = $("#v-cel");
  let heroVisivel = true;
  function escalaVitrine() {
    $$("iframe", vTela).forEach((f) => { f.style.transform = "scale(" + vTela.clientWidth / 1280 + ")"; });
    $$("iframe", vCel).forEach((f) => { f.style.transform = "scale(" + vCel.clientWidth / 390 + ")"; });
  }
  function quadro(caixa, amostra, w, h) {
    const f = document.createElement("iframe");
    f.src = "amostras/" + amostra + ".html"; f.width = w; f.height = h; f.tabIndex = -1; f.style.opacity = 0;
    f.onload = () => { f.style.opacity = 1; $$("iframe", caixa).filter((x) => x !== f).forEach((x) => setTimeout(() => x.remove(), 500)); };
    caixa.appendChild(f);
    escalaVitrine();
  }
  if (cena) {
    const grupo = $(".grupo", cena);
    let n = 0;
    const mostrar = () => {
      const v = VITRINE[n];
      quadro(vTela, v[0], 1280, 800);
      quadro(vCel, v[0], 390, 844);
      $("#v-end").textContent = v[1]; $("#v-leg").textContent = v[2]; $("#v-aviso").textContent = v[3];
      $$(".vit-legenda em i").forEach((i, k) => i.classList.toggle("on", k === n));
    };
    mostrar();
    setInterval(() => { if (!heroVisivel || document.hidden) return; n = (n + 1) % VITRINE.length; mostrar(); }, 5000);
    const obsHero = io(([e]) => { heroVisivel = e.isIntersecting; }, { threshold: 0 });
    if (obsHero) obsHero.observe(cena);

    if (mouse) {
      // Segue o mouse na tela inteira, com suavidade. Vale mesmo com "reduzir movimento":
      // só mexe quando a pessoa mexe o mouse (o Windows com animações desligadas avisa isso ao site).
      let alvoX = 0, alvoY = 0, x = 0, y = 0, rodando = false;
      const passo = () => {
        x += (alvoX - x) * 0.08; y += (alvoY - y) * 0.08;
        grupo.style.setProperty("--ry", (-14 + x * 30).toFixed(2) + "deg");
        grupo.style.setProperty("--rx", (6 - y * 18).toFixed(2) + "deg");
        grupo.style.setProperty("--tx", (x * 14).toFixed(1) + "px");
        grupo.style.setProperty("--ty", (y * 10).toFixed(1) + "px");
        if (Math.abs(alvoX - x) > 0.001 || Math.abs(alvoY - y) > 0.001) requestAnimationFrame(passo); else rodando = false;
      };
      cena.classList.add("segue");
      window.addEventListener("pointermove", (e) => {
        if (!heroVisivel) return;
        const r = cena.getBoundingClientRect();
        alvoX = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
        alvoY = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
        if (!rodando) { rodando = true; requestAnimationFrame(passo); }
      }, { passive: true });
    } else if (!calmo) {
      let t = 0;
      setInterval(() => { if (!heroVisivel) return; t += 0.05; grupo.style.setProperty("--ry", (-14 + Math.sin(t) * 6) + "deg"); }, 60);
    }
  }

  // ---------- Faixa escura: luz que segue o mouse ----------
  const escura = $("#escura");
  if (escura && mouse) escura.addEventListener("pointermove", (e) => {
    const r = escura.getBoundingClientRect();
    escura.style.setProperty("--mx", (e.clientX - r.left) + "px");
    escura.style.setProperty("--my", (e.clientY - r.top) + "px");
  });

  // ---------- Blocos: inclinação 3D + reflexo ----------
  if (mouse) $$(".bloco").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      b.style.setProperty("--by", ((x - 0.5) * 10) + "deg"); b.style.setProperty("--bx", ((0.5 - y) * 10) + "deg");
      b.style.setProperty("--gx", x * 100 + "%"); b.style.setProperty("--gy", y * 100 + "%");
    });
    b.addEventListener("pointerleave", () => { b.style.setProperty("--by", "0deg"); b.style.setProperty("--bx", "0deg"); });
  });

  // ---------- Como funciona: o site se monta sozinho quando a seção aparece ----------
  const mont = $("#como"), site = $("#site3d");
  if (mont && site) {
    const passos = $$("#etapas li"), barraP = $(".barra-prog"), rever = $("#rever"), finalBox = $("#final-site");
    let pAtual = 0, anim = 0, finalPronto = false;
    const escalaFinal = () => { const f = $("iframe", finalBox); if (f) f.style.transform = "scale(" + finalBox.clientWidth / 1280 + ")"; };
    const carregarFinal = () => {
      if (finalPronto) return; finalPronto = true;
      const f = document.createElement("iframe");
      f.src = "amostras/brasa-e-sal.html"; f.width = 1280; f.height = 840; f.tabIndex = -1;
      finalBox.append(f); escalaFinal();
    };
    const montar = (p) => {
      pAtual = p;
      const e = 1 - Math.min(1, Math.max(0, (p - 0.45) / 0.35));   // 1 = desmontado, 0 = montado
      site.style.setProperty("--e", e.toFixed(3));
      site.classList.toggle("cor", p > 0.4);
      site.classList.toggle("pronto", p > 0.86);
      barraP.style.setProperty("--p", p);
      const etapa = p < 0.2 ? 0 : p < 0.45 ? 1 : p < 0.8 ? 2 : 3;
      passos.forEach((li, i) => li.classList.toggle("on", i === etapa));
      rever.classList.toggle("mostra", p >= 1);
    };
    const tocar = (alvo, dur = 7000) => {
      cancelAnimationFrame(anim);
      const de = pAtual, t0 = performance.now(), d = Math.max(400, Math.abs(alvo - de) * dur);
      const passo = (t) => {
        const k = Math.min(1, (t - t0) / d), s = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        montar(de + (alvo - de) * s);
        if (k < 1) anim = requestAnimationFrame(passo);
      };
      anim = requestAnimationFrame(passo);
    };
    montar(0);
    const perto = io((es, o) => es.forEach((e) => { if (e.isIntersecting) { carregarFinal(); o.disconnect(); } }), { rootMargin: "400px 0px" });
    if (perto) perto.observe(mont); else carregarFinal();

    // Só começa quando a parte inteira (título, etapas e o site) está na tela, abaixo do topo fixo.
    // Se ela for maior que a tela, começa quando ocupar a tela toda.
    const fixo = $(".fixo", mont);
    let comecou = false;
    const conferir = () => {
      if (comecou) return;
      const r = fixo.getBoundingClientRect();
      const topoFixo = ($("#topo") || {}).offsetHeight || 0;
      const alturaUtil = window.innerHeight - topoFixo;
      const inteira = r.height <= alturaUtil
        ? r.top >= topoFixo - 2 && r.bottom <= window.innerHeight + 2
        : r.top <= topoFixo + 24 && r.bottom >= window.innerHeight - 24;
      if (!inteira) return;
      comecou = true;
      window.removeEventListener("scroll", aoRolarMont);
      window.removeEventListener("resize", aoRolarMont);
      carregarFinal();
      setTimeout(() => tocar(1), 250);
    };
    const aoRolarMont = () => conferir();
    window.addEventListener("scroll", aoRolarMont, { passive: true });
    window.addEventListener("resize", aoRolarMont);
    aoRolarMont();
    const ALVOS = [0.1, 0.32, 0.62, 1];
    passos.forEach((li, i) => li.addEventListener("click", () => { comecou = true; tocar(ALVOS[i], 2600); }));
    rever.addEventListener("click", () => { montar(0); tocar(1); });
    window.addEventListener("resize", escalaFinal);
  }

  // ---------- Exemplos: recursos, cores e celular/computador ----------
  // Para cada exemplo: a variável de cor principal do site, 4 cores para testar e atalhos para as partes.
  const EXEMPLOS = {
    "brasa-e-sal": { nome: "Brasa & Sal", cor: "--brasa", cores: ["#e2592a", "#c9a35c", "#3f8f5a", "#7a3fd0"], recursos: [["Cardápio", "#cardapio"], ["Reserva de mesa", "#reserva"], ["A casa", "#casa"]] },
    "clinica-alvorada": { nome: "Clínica Alvorada", cor: "--teal", cores: ["#0f766e", "#2563eb", "#be185d", "#7c3aed"], recursos: [["Agendar horário", "#agenda"], ["Tratamentos", "#tratamentos"], ["Equipe", "#equipe"]] },
    "patas-e-cia": { nome: "Patas & Cia", cor: "--roxo", cores: ["#6c3ce1", "#0e9f6e", "#e0453a", "#1d4ed8"], recursos: [["Produtos e carrinho", "#produtos"], ["Banho com hora marcada", "#banho"]] },
    "pulso-academia": { nome: "Pulso Academia", cor: "--lima", cores: ["#c6ff00", "#ff4d2e", "#38bdf8", "#f5c400"], recursos: [["Grade de aulas", "#aulas"], ["Planos", "#planos"], ["Aula grátis", "#experimental"]] },
    "traco-norte": { nome: "Traço Norte", cor: "--acento", cores: ["#d94f2b", "#1f6feb", "#2f855a", "#141414"], recursos: [["Projetos", "#projetos"], ["Processo", "#processo"], ["Contato", "#contato"]] }
  };
  const palco = $("#palco");
  if (palco) {
    const janela = $("#p-jan"), pf = $("#p-frame"), moldura = $("#moldura");
    const caixaCores = $("#cores"), caixaRecursos = $("#recursos");
    let atual = "brasa-e-sal", corAtual = 0, carregou = false;
    const TAM = { pc: [1280, 800], cel: [390, 760] };
    const ajustar = () => {
      const [w, h] = TAM[palco.dataset.modo];
      pf.width = w; pf.height = h;
      const s = Math.min(1, (janela.clientWidth || 1) / w);
      pf.style.transform = "scale(" + s + ")";
      janela.style.height = Math.round(h * s) + "px";
    };
    const docExemplo = () => { try { return pf.contentDocument; } catch (e) { return null; } };
    const aplicarCor = () => { const d = docExemplo(); if (d && d.documentElement) d.documentElement.style.setProperty(EXEMPLOS[atual].cor, EXEMPLOS[atual].cores[corAtual]); };
    const montarControles = () => {
      const ex = EXEMPLOS[atual];
      caixaCores.innerHTML = "<span>Cor da marca</span>";
      ex.cores.forEach((c, i) => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "cor-b" + (i === corAtual ? " on" : ""); b.style.setProperty("--c", c);
        b.dataset.i = i; b.setAttribute("aria-label", "Cor " + (i + 1)); b.setAttribute("aria-pressed", String(i === corAtual));
        caixaCores.append(b);
      });
      caixaRecursos.innerHTML = "<span>Experimente:</span>";
      ex.recursos.forEach(([rotulo, alvo]) => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "rec"; b.dataset.h = alvo; b.textContent = rotulo;
        caixaRecursos.append(b);
      });
    };
    const carregar = () => {
      carregou = true;
      pf.title = "Exemplo de site: " + EXEMPLOS[atual].nome;
      pf.src = "amostras/" + atual + ".html";
    };
    caixaCores.addEventListener("click", (e) => {
      const b = e.target.closest(".cor-b"); if (!b) return;
      corAtual = Number(b.dataset.i);
      $$(".cor-b", caixaCores).forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", String(x === b)); });
      aplicarCor();
    });
    caixaRecursos.addEventListener("click", (e) => {
      const b = e.target.closest(".rec"); if (!b) return;
      const d = docExemplo(); const alvo = d && d.querySelector(b.dataset.h);
      if (alvo) { const w = d.defaultView; w.scrollTo({ top: alvo.getBoundingClientRect().top + w.scrollY - 60, behavior: calmo ? "auto" : "smooth" }); }
    });
    pf.addEventListener("load", () => { moldura.classList.remove("vira"); aplicarCor(); });
    $("#abas").addEventListener("click", (e) => {
      const b = e.target.closest(".aba"); if (!b || b.classList.contains("on")) return;
      $$(".aba").forEach((x) => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-selected", String(on)); });
      atual = b.dataset.a; corAtual = 0; montarControles();
      if (!calmo) moldura.classList.add("vira");
      setTimeout(() => { carregar(); $("#p-end").textContent = b.dataset.d; }, calmo ? 0 : 300);
      setTimeout(() => moldura.classList.remove("vira"), 1500);
    });
    const definirModo = (m) => {
      palco.dataset.modo = m;
      $$(".modo").forEach((x) => { const on = x.dataset.m === m; x.classList.toggle("on", on); x.setAttribute("aria-pressed", String(on)); });
      requestAnimationFrame(ajustar); setTimeout(ajustar, 520);   // depois da transição da moldura
    };
    $("#modos").addEventListener("click", (e) => { const b = e.target.closest(".modo"); if (b) definirModo(b.dataset.m); });
    definirModo(window.matchMedia("(max-width: 640px)").matches ? "cel" : "pc");
    montarControles();
    if ("ResizeObserver" in window) new ResizeObserver(ajustar).observe(janela);
    // só carrega o exemplo quando a seção estiver chegando na tela
    const obsEx = io(([e], o) => { if (e.isIntersecting && !carregou) { carregar(); o.disconnect(); } }, { rootMargin: "400px 0px" });
    if (obsEx) obsEx.observe(palco); else carregar();
  }
  window.addEventListener("resize", escalaVitrine);
  window.addEventListener("load", escalaVitrine);

  // ---------- Barra fixa no celular ----------
  const barra = $("#barra-celular");
  const hero = $(".hero");
  const secProposta = $("#proposta");
  if (barra && "IntersectionObserver" in window) {
    let heroNaTela = true, propostaNaTela = false;
    const atualizar = () => barra.classList.toggle("mostrar", !heroNaTela && !propostaNaTela);
    new IntersectionObserver(([e]) => { heroNaTela = e.isIntersecting; atualizar(); }, { threshold: 0.05 }).observe(hero);
    new IntersectionObserver(([e]) => { propostaNaTela = e.isIntersecting; atualizar(); }, { threshold: 0 }).observe(secProposta);
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

})();
