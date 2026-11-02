/* Monta o topo, o rodapé e as partes do site que vêm dos dados (assets/js/dados.js e projetos/<id>/dados.js) */
(function () {
  "use strict";

  const dados = window.SM_DADOS;
  const corpo = document.body;
  const raiz = corpo.dataset.raiz || "";
  const pagina = corpo.dataset.pagina;
  const STATUS = { lancado: "Lançado", desenvolvimento: "Em desenvolvimento" };
  const TIPOS = [["jogo", "Jogos"], ["app", "Apps"]];

  // Ícones das plataformas (Android e Steam: Simple Icons, CC0; Navegador: globo)
  const PLATAFORMAS = {
    android: {
      nome: "Android",
      svg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z"/></svg>'
    },
    steam: {
      nome: "Steam",
      svg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/></svg>'
    },
    web: {
      nome: "Navegador",
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>'
    }
  };

  // ---------- Ajudantes ----------

  function esc(texto) {
    return String(texto == null ? "" : texto).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
  }
  function absoluto(p) { return /^(https?:|mailto:|data:)/.test(p); }
  // Caminho de um arquivo do site (a partir da raiz)
  function caminho(p) { return !p ? "" : absoluto(p) ? p : raiz + p; }
  // Caminho de um arquivo de projeto (a partir da pasta projetos/<id>/)
  function arquivo(proj, p) { return !p ? "" : absoluto(p) ? p : `${raiz}projetos/${proj.id}/${p}`; }

  let projetos = [];
  function acharProjeto(id) { return projetos.find((p) => p.id === id) || null; }
  function linkProjeto(p) { return `${raiz}projetos/${p.id}/index.html`; }
  function linkApoio(p) { return `${raiz}apoiar/index.html${p ? "?projeto=" + p.id : ""}`; }
  // Lançados primeiro, mantendo a ordem de dados.js
  function porTipo(tipo) {
    const lista = projetos.filter((p) => p.tipo === tipo);
    return lista.filter((p) => p.status === "lancado").concat(lista.filter((p) => p.status !== "lancado"));
  }

  function carregarProjetos() {
    return Promise.all(dados.projetos.map((id) => new Promise((pronto) => {
      const s = document.createElement("script");
      s.src = `${raiz}projetos/${id}/dados.js`;
      s.onload = pronto;
      s.onerror = () => { console.warn(`Não consegui carregar projetos/${id}/dados.js`); pronto(); };
      document.head.appendChild(s);
    }))).then(() => {
      projetos = dados.projetos.map((id) => window.SM_PROJETOS[id]).filter(Boolean);
    });
  }

  function selo(p) {
    return `<span class="selo selo-${p.status}">${STATUS[p.status] || ""}</span>`;
  }
  function plataformas(p) {
    const lista = (p.plataformas || []).filter((id) => PLATAFORMAS[id]);
    if (!lista.length) return "";
    return `<ul class="plataformas" aria-label="Plataformas">${lista.map((id) =>
      `<li>${PLATAFORMAS[id].svg}<span>${PLATAFORMAS[id].nome}</span></li>`).join("")}</ul>`;
  }
  function icone(p, classe = "") {
    if (p.icone) {
      return `<img class="icone ${classe}${p.pixelArt ? " pixel" : ""}" src="${esc(arquivo(p, p.icone))}" alt="" width="52" height="52" loading="lazy">`;
    }
    const sigla = p.sigla || p.nome.charAt(0);
    return `<span class="icone icone-letra ${classe}" style="background:${esc(p.cor)}" aria-hidden="true">${esc(sigla)}</span>`;
  }
  function capa(p) {
    if (p.capa) {
      const foco = p.capaFoco ? ` style="object-position:${esc(p.capaFoco)} center"` : "";
      return `<img src="${esc(arquivo(p, p.capa))}" alt=""${p.pixelArt ? ' class="pixel"' : ""}${foco} loading="lazy">`;
    }
    return `<div class="capa-vazia" style="--cor:${esc(p.cor)}"><span>${esc(p.nome)}</span></div>`;
  }

  // ---------- Topo e rodapé ----------

  function montarTopo() {
    const lugar = document.getElementById("topo");
    if (!lugar) return;
    const apoioAtual = pagina === "apoiar" ? ' aria-current="page"' : "";
    lugar.outerHTML = `
      <header class="topo">
        <div class="envoltorio">
          <div class="topo-interno vidro">
            <a class="marca" href="${raiz}index.html">
              <img src="${raiz}assets/img/estudio/logo-sm-branco.png" alt="" width="36" height="30">
              <span>${esc(dados.estudio.nome)}</span>
            </a>
            <button class="menu-botao" type="button" aria-expanded="false" aria-controls="menu">
              <span class="so-leitor">Abrir menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
            <nav id="menu" class="menu" aria-label="Principal">
              <a href="${raiz}index.html#jogos">Jogos</a>
              <a href="${raiz}index.html#apps">Apps</a>
              <a href="${raiz}index.html#sobre">Sobre</a>
              <a href="${raiz}index.html#contato">Contato</a>
              <a class="botao botao-pequeno" href="${raiz}apoiar/index.html"${apoioAtual}>Apoiar</a>
            </nav>
          </div>
        </div>
      </header>`;

    const botao = document.querySelector(".menu-botao");
    const menu = document.getElementById("menu");
    botao.addEventListener("click", () => {
      const aberto = menu.classList.toggle("aberto");
      botao.setAttribute("aria-expanded", String(aberto));
    });
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        menu.classList.remove("aberto");
        botao.setAttribute("aria-expanded", "false");
      }
    });
  }

  function montarRodape() {
    const lugar = document.getElementById("rodape");
    if (!lugar) return;
    const email = dados.estudio.email;
    lugar.outerHTML = `
      <footer class="rodape">
        <div class="envoltorio">
          <div class="rodape-interno vidro">
            <span>© ${new Date().getFullYear()} ${esc(dados.estudio.nome)}</span>
            <nav aria-label="Rodapé">
              <a href="${raiz}index.html#jogos">Jogos</a>
              <a href="${raiz}index.html#apps">Apps</a>
              <a href="${raiz}apoiar/index.html">Apoiar</a>
              <a href="mailto:${esc(email)}">${esc(email)}</a>
            </nav>
          </div>
        </div>
      </footer>`;
  }

  // ---------- Início ----------

  function cartao(p) {
    return `
      <a class="cartao vidro" href="${linkProjeto(p)}">
        <div class="cartao-capa">${capa(p)}</div>
        ${selo(p)}
        <div class="cartao-corpo">
          <div class="cartao-cabeca">
            ${icone(p)}
            <h3>${esc(p.nome)}</h3>
          </div>
          ${plataformas(p)}
          <p>${esc(p.resumo)}</p>
          <span class="cartao-link">Ver projeto <span aria-hidden="true">→</span></span>
        </div>
      </a>`;
  }

  function paginaInicio() {
    for (const [tipo] of TIPOS) {
      const lugar = document.getElementById(`grade-${tipo}`);
      if (lugar) lugar.innerHTML = porTipo(tipo).map(cartao).join("");
    }
    const botaoEmail = document.getElementById("email-contato");
    const textoEmail = document.getElementById("email-texto");
    if (botaoEmail) botaoEmail.href = `mailto:${dados.estudio.email}`;
    if (textoEmail) {
      textoEmail.href = `mailto:${dados.estudio.email}`;
      textoEmail.textContent = dados.estudio.email;
    }
    // Volta para a âncora (#jogos, #apps) depois que os cartões entram na página
    if (location.hash) {
      const alvo = document.getElementById(location.hash.slice(1));
      if (alvo) alvo.scrollIntoView();
    }
  }

  // ---------- Página do projeto ----------

  function paginaProjeto() {
    const main = document.getElementById("conteudo");
    const p = acharProjeto(corpo.dataset.projeto);
    if (!p) {
      main.innerHTML = `<div class="envoltorio"><p class="aviso-js">Projeto não encontrado.</p></div>`;
      return;
    }
    document.title = `${p.nome} · ${dados.estudio.nome}`;
    const voltar = p.tipo === "app" ? "apps" : "jogos";

    const lojas = p.lojas.length
      ? p.lojas.map((l) => `<a class="botao" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.rotulo)}</a>`).join("")
      : `<span class="botao" aria-disabled="true">${p.status === "lancado" ? "Link da loja em breve" : "Ainda não está nas lojas"}</span>`;

    const descricao = p.descricao.length
      ? p.descricao.map((t) => `<p>${esc(t)}</p>`).join("")
      : `<p class="em-breve">Mais detalhes em breve.</p>`;

    const nomesPlataformas = (p.plataformas || []).filter((id) => PLATAFORMAS[id]).map((id) => PLATAFORMAS[id].nome).join(", ");
    const ficha = [
      ["Tipo", p.tipo === "app" ? "App" : "Jogo"],
      ["Status", STATUS[p.status]],
      ["Plataformas", nomesPlataformas || "A definir"],
      p.preco ? ["Preço", p.preco] : null,
      p.contato ? ["Contato", `<a href="mailto:${esc(p.contato)}">${esc(p.contato)}</a>`, true] : null,
      p.redes.length ? ["Redes", p.redes.map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.rotulo)}</a>`).join(" · "), true] : null
    ].filter(Boolean).map(([rotulo, valor, html]) =>
      `<div><dt>${rotulo}</dt><dd>${html ? valor : esc(valor)}</dd></div>`).join("");

    const videos = p.videos.length ? `
      <section class="bloco" aria-labelledby="titulo-videos">
        <h2 id="titulo-videos">Vídeos</h2>
        <div class="videos">
          ${p.videos.map((v) => `
            <button class="video video-${esc(v.formato)}" type="button" data-youtube="${esc(v.youtube)}" data-titulo="${esc(v.titulo)}">
              <img src="https://i.ytimg.com/vi/${esc(v.youtube)}/hqdefault.jpg" alt="" loading="lazy">
              <span class="play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>
              <span class="video-titulo">${esc(v.titulo)}</span>
              <span class="so-leitor">Assistir ao vídeo</span>
            </button>`).join("")}
        </div>
      </section>` : "";

    const imagens = p.imagens.length
      ? `<div class="galeria${p.pixelArt ? " pixel-art" : ""}">
          ${p.imagens.map((img, i) => `
            <button type="button" data-indice="${i}" aria-label="Ampliar: ${esc(img.alt)}">
              <img src="${esc(arquivo(p, img.src))}" alt="${esc(img.alt)}"${p.pixelArt ? ' class="pixel"' : ""} loading="lazy">
            </button>`).join("")}
        </div>`
      : `<div class="vazio vidro"><strong>Imagens em breve</strong><span>Este projeto ainda vai ganhar imagens e vídeos.</span></div>`;

    main.innerHTML = `
      <div class="envoltorio">
        <a class="voltar" href="${raiz}index.html#${voltar}"><span aria-hidden="true">←</span> Todos os ${voltar}</a>

        <section class="projeto-cabeca vidro">
          <div class="projeto-capa">${capa(p)}</div>
          <div class="projeto-info">
            <div class="projeto-titulo">
              ${icone(p, "icone-grande")}
              <div>
                ${selo(p)}
                <h1>${esc(p.nome)}</h1>
                ${p.subtitulo ? `<p class="subtitulo-nome">${esc(p.subtitulo)}</p>` : ""}
              </div>
            </div>
            ${plataformas(p)}
            <p class="resumo">${esc(p.resumo)}</p>
            <div class="acoes">
              ${lojas}
              <a class="botao botao-vidro" href="${linkApoio(p)}">Apoiar este projeto</a>
            </div>
          </div>
        </section>

        <div class="projeto-corpo">
          <section class="painel vidro texto-projeto" aria-labelledby="titulo-sobre">
            <h2 id="titulo-sobre">Sobre o projeto</h2>
            ${descricao}
          </section>
          <aside class="painel vidro" aria-label="Ficha do projeto">
            <dl class="ficha">${ficha}</dl>
          </aside>
        </div>

        ${videos}

        <section class="bloco" aria-labelledby="titulo-imagens">
          <h2 id="titulo-imagens">Imagens</h2>
          ${imagens}
        </section>

        <section class="caixa-apoio vidro" aria-labelledby="titulo-apoio">
          <div>
            <h2 id="titulo-apoio">Apoie este projeto</h2>
            <p>Gostou do ${esc(p.nome)}? Você pode ajudar a continuar o desenvolvimento deste projeto com uma contribuição voluntária.</p>
            <small>O apoio vai para quem faz o projeto. Não é compra e não dá itens nem vantagens ${p.status === "lancado" ? "dentro do app ou do jogo" : "no projeto"}.</small>
          </div>
          <a class="botao" href="${linkApoio(p)}">Apoiar este projeto</a>
        </section>
      </div>`;

    if (p.imagens.length) ligarVisor(p);
    ligarVideos(main);
  }

  function ligarVisor(p) {
    const visor = document.createElement("dialog");
    visor.className = "visor";
    visor.setAttribute("aria-label", "Imagem ampliada");
    visor.innerHTML = `
      <figure><img alt=""${p.pixelArt ? ' class="pixel"' : ""}><figcaption></figcaption></figure>
      <button class="visor-botao visor-fechar" type="button" aria-label="Fechar">×</button>
      <button class="visor-botao visor-anterior" type="button" aria-label="Imagem anterior">‹</button>
      <button class="visor-botao visor-proximo" type="button" aria-label="Próxima imagem">›</button>`;
    document.body.appendChild(visor);

    const img = visor.querySelector("img");
    const legenda = visor.querySelector("figcaption");
    let atual = 0;

    function mostrar(i) {
      atual = (i + p.imagens.length) % p.imagens.length;
      const item = p.imagens[atual];
      img.src = arquivo(p, item.src);
      img.alt = item.alt;
      legenda.textContent = `${item.alt} (${atual + 1} de ${p.imagens.length})`;
    }
    function fechar() { if (visor.open) visor.close(); }

    document.querySelector(".galeria").addEventListener("click", (e) => {
      const botao = e.target.closest("button[data-indice]");
      if (!botao) return;
      mostrar(Number(botao.dataset.indice));
      visor.showModal();
    });
    visor.querySelector(".visor-fechar").addEventListener("click", fechar);
    visor.querySelector(".visor-anterior").addEventListener("click", () => mostrar(atual - 1));
    visor.querySelector(".visor-proximo").addEventListener("click", () => mostrar(atual + 1));
    visor.addEventListener("click", (e) => { if (e.target === visor) fechar(); });
    visor.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") mostrar(atual - 1);
      if (e.key === "ArrowRight") mostrar(atual + 1);
    });
  }

  // O YouTube só carrega quando a pessoa clica, para a página abrir rápido.
  function ligarVideos(area) {
    area.addEventListener("click", (e) => {
      const botao = e.target.closest("button.video");
      if (!botao) return;
      const caixa = document.createElement("div");
      caixa.className = botao.className;
      const quadro = document.createElement("iframe");
      quadro.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(botao.dataset.youtube)}?autoplay=1&rel=0&playsinline=1`;
      quadro.title = botao.dataset.titulo;
      quadro.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      quadro.allowFullscreen = true;
      caixa.appendChild(quadro);
      botao.replaceWith(caixa);
    });
  }

  // ---------- Página de apoio ----------

  function paginaApoio() {
    const main = document.getElementById("conteudo");
    const p = acharProjeto(new URLSearchParams(location.search).get("projeto"));
    const geral = dados.estudio.apoio;
    // Cada projeto usa só o próprio QR (o dinheiro pode ir para contas diferentes).
    const apoio = p ? (p.apoio || {}) : geral;
    const qr = p ? arquivo(p, apoio.qr) : caminho(apoio.qr);
    const recebedor = apoio.recebedor || geral.recebedor || dados.estudio.nome;
    const temDados = Boolean(apoio.qr || apoio.copiaECola || apoio.chavePix);
    const nomeAlvo = p ? p.nome : dados.estudio.nome;
    const logoEstudio = `${raiz}assets/img/estudio/logo-quadrado.png`;

    const alvo = p
      ? `${icone(p)}<div><p class="rotulo">Você está apoiando</p><h2>${esc(p.nome)}</h2></div>`
      : `<img class="icone" src="${logoEstudio}" alt="" width="52" height="52"><div><p class="rotulo">Você está apoiando</p><h2>O estúdio (todos os projetos)</h2></div>`;

    const qrHtml = apoio.qr
      ? `<div class="qr"><img src="${esc(qr)}" alt="QR Code Pix para apoiar ${esc(nomeAlvo)}"></div>`
      : `<div class="qr qr-vazio"><span>QR Code em breve</span></div>`;

    function campoCopiar(rotulo, valor, idCampo) {
      if (!valor) return "";
      return `
        <div class="copiar">
          <label for="${idCampo}" class="rotulo">${rotulo}</label>
          <div class="copiar-linha">
            <input id="${idCampo}" type="text" value="${esc(valor)}" readonly>
            <button class="botao botao-pequeno" type="button" data-copiar="${idCampo}">Copiar</button>
          </div>
        </div>`;
    }

    const instrucoes = temDados ? `
      <ol class="passos">
        <li>Abra o app do seu banco e escolha pagar com Pix.</li>
        <li>Leia o QR Code com a câmera ou use o código "copia e cola".</li>
        <li>Digite o valor que quiser e confira se o recebedor é <strong>${esc(recebedor)}</strong> antes de confirmar.</li>
      </ol>
      ${campoCopiar("Pix copia e cola", apoio.copiaECola, "campo-copia-e-cola")}
      ${campoCopiar("Chave Pix", apoio.chavePix, "campo-chave")}`
      : `<p class="em-breve">Os dados para apoiar ${esc(nomeAlvo)} vão aparecer aqui em breve.</p>`;

    const opcoes = `<a href="${linkApoio(null)}"${p ? "" : ' aria-current="true"'}><img class="icone" src="${logoEstudio}" alt="" width="38" height="38" loading="lazy"><span>O estúdio (geral)</span></a>` +
      TIPOS.map(([tipo, titulo]) => `<p class="grupo">${titulo}</p>` + porTipo(tipo).map((q) =>
        `<a href="${linkApoio(q)}"${p && p.id === q.id ? ' aria-current="true"' : ""}>${icone(q)}<span>${esc(q.nome)}</span></a>`
      ).join("")).join("");

    main.innerHTML = `
      <div class="envoltorio">
        <section class="apoio-cabeca vidro">
          <p class="rotulo">Apoio</p>
          <h1>Apoie o ${esc(dados.estudio.nome)}</h1>
          <p>Somos um estúdio independente. Seu apoio ajuda a manter os projetos em desenvolvimento e a lançar coisas novas. Escolha o projeto que você quer apoiar e contribua com o valor que quiser.</p>
        </section>

        <div class="apoio-grade">
          <section class="apoio-cartao vidro" aria-live="polite">
            <div class="apoio-projeto">${alvo}</div>
            <div class="apoio-conteudo">
              ${qrHtml}
              <div class="copiar">${instrucoes}</div>
            </div>
          </section>

          <nav class="lista-projetos vidro" aria-label="Escolha o que apoiar">
            <h2>Escolha o que apoiar</h2>
            ${opcoes}
          </nav>
        </div>

        <p class="aviso vidro">O apoio é uma contribuição voluntária para ajudar no desenvolvimento dos projetos do ${esc(dados.estudio.nome)}. Não é compra, investimento nem aposta: não tem retorno em dinheiro e não dá itens nem vantagens dentro dos jogos e apps.</p>
      </div>`;

    main.addEventListener("click", (e) => {
      const botao = e.target.closest("button[data-copiar]");
      if (!botao) return;
      copiar(document.getElementById(botao.dataset.copiar)).then(() => {
        botao.textContent = "Copiado!";
        setTimeout(() => { botao.textContent = "Copiar"; }, 2000);
      });
    });
  }

  function copiar(campo) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(campo.value);
    }
    campo.select();
    document.execCommand("copy");
    return Promise.resolve();
  }

  // ---------- Início de tudo ----------

  montarTopo();
  montarRodape();
  carregarProjetos().then(() => {
    if (pagina === "inicio") paginaInicio();
    if (pagina === "projeto") paginaProjeto();
    if (pagina === "apoiar") paginaApoio();
  });
})();
