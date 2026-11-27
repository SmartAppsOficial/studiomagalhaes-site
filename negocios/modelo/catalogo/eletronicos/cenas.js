/* 10 animações 3D exclusivas do ramo: Celulares e eletrônicos */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra;
  const wifiSolto = `<svg viewBox="0 0 50 50"><path d="M10 30a18 18 0 0 1 30 0M16 36a10 10 0 0 1 18 0" stroke="var(--p)" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="25" cy="40" r="3.5" style="fill:var(--d)"/></svg>`;
  const soltosTech = () => K.soltosPadrao(K.raio(), wifiSolto, K.estrela(), K.bolinha('var(--p)'));

  window.CENAS = {
    tech() {
      return {
        principal: S(SM(146, 15, 370) +
          C(6, 0, `<g transform="translate(106 36) rotate(-5 94 160)"><rect x="6" y="6" width="184" height="318" rx="34" fill="#2c3545"/><rect x="14" y="14" width="168" height="302" rx="28" fill="#182a4a"/><rect x="66" y="24" width="64" height="14" rx="7" fill="#0d1321"/><circle cx="98" cy="138" r="44" style="fill:var(--p)"/><path d="M104 114l-24 28h18l-6 26 26-30H98z" style="fill:var(--d)"/></g>`) +
          C(13, .4, `<g transform="translate(262 198) rotate(12)"><rect x="4" y="4" width="84" height="96" rx="26" fill="#f7f9fc"/><path d="M4 42h84" stroke="#d0d7e2" stroke-width="3"/><circle cx="46" cy="56" r="5" style="fill:var(--p)"/></g>`) +
          C(17, .65, `<g transform="translate(46 218) rotate(-14)"><rect x="8" y="8" width="66" height="66" rx="18" style="fill:var(--d)"/><path d="M45 20L27 44h14l-4 20 18-24H41z" fill="#111827"/></g>`)),
        soltos: soltosTech()
      };
    },

    audio() {
      return {
        principal: S(SM(140, 14, 364) +
          C(7, 0, `<path d="M84 224v-28a116 116 0 0 1 232 0v28" fill="none" stroke="#2c3545" stroke-width="26" stroke-linecap="round"/><path d="M114 114a96 96 0 0 1 172 0" fill="none" style="stroke:var(--p)" stroke-width="12" stroke-linecap="round"/>`) +
          C(12, .35, `<rect x="54" y="196" width="54" height="114" rx="26" style="fill:var(--p)"/><rect x="88" y="206" width="24" height="94" rx="12" fill="#182030"/><rect x="292" y="196" width="54" height="114" rx="26" style="fill:var(--p)"/><rect x="288" y="206" width="24" height="94" rx="12" fill="#182030"/>`) +
          C(16, .65, `<g fill="none" style="stroke:var(--d)" stroke-width="8" stroke-linecap="round"><path d="M164 252v-36M188 266v-64M212 258v-48M236 244v-20"/></g>`)),
        soltos: soltosTech()
      };
    },

    watch() {
      return {
        principal: S(SM(118, 14, 368) +
          C(6, 0, `<rect x="148" y="34" width="104" height="332" rx="28" style="fill:var(--p)"/>`) +
          C(12, .35, `<rect x="108" y="106" width="184" height="188" rx="44" fill="#2c3545"/><rect x="122" y="120" width="156" height="160" rx="34" fill="#0d1726"/>
            <circle cx="200" cy="200" r="54" fill="none" style="stroke:var(--d)" stroke-width="14" stroke-dasharray="240 120" stroke-linecap="round"/>
            <path d="M200 172v30l24 14" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`)),
        soltos: soltosTech()
      };
    },

    caixa() {
      return {
        principal: S(SM(156, 16, 368) +
          C(6, 0, `<rect x="52" y="144" width="296" height="156" rx="78" fill="#1e293b"/><rect x="74" y="158" width="252" height="128" rx="64" style="fill:var(--p)"/>`) +
          C(13, .4, `<circle cx="136" cy="222" r="44" fill="#0f172a"/><circle cx="136" cy="222" r="22" style="fill:var(--d)"/>
            <circle cx="264" cy="222" r="44" fill="#0f172a"/><circle cx="264" cy="222" r="22" style="fill:var(--d)"/>`) +
          C(17, .65, `<path d="M126 112c38-26 110-26 148 0M152 90c26-18 70-18 96 0" fill="none" style="stroke:var(--d)" stroke-width="7" stroke-linecap="round"/>`)),
        soltos: soltosTech()
      };
    },

    turbo() {
      return {
        principal: S(SM(146, 15, 368) +
          C(6, 0, `<path d="M200 264c0 62 96 62 96-14V112" fill="none" stroke="#e2e8f0" stroke-width="16" stroke-linecap="round"/>
            <rect x="280" y="72" width="32" height="46" rx="8" style="fill:var(--d)"/>`) +
          C(12, .35, `<rect x="112" y="136" width="156" height="148" rx="28" fill="#f8fafc"/><rect x="134" y="96" width="24" height="46" rx="6" fill="#94a3b8"/><rect x="222" y="96" width="24" height="46" rx="6" fill="#94a3b8"/>
            <circle cx="190" cy="210" r="38" style="fill:var(--p)"/><path d="M196 188l-22 26h16l-6 22 24-28h-16z" style="fill:var(--d)"/>`)),
        soltos: soltosTech()
      };
    },

    notebook() {
      return {
        principal: S(SM(168, 16, 366) +
          C(6, 0, `<rect x="66" y="88" width="268" height="190" rx="18" fill="#1e293b"/><rect x="80" y="102" width="240" height="162" rx="10" style="fill:var(--p)"/>
            <rect x="106" y="130" width="108" height="18" rx="9" style="fill:var(--d)"/><rect x="106" y="162" width="180" height="14" rx="7" fill="#fff" opacity=".35"/><rect x="106" y="188" width="140" height="14" rx="7" fill="#fff" opacity=".25"/>`) +
          C(13, .4, `<path d="M36 278h328l-24 44q-6 12-22 12H82q-16 0-22-12z" fill="#cbd5e1"/><rect x="164" y="294" width="72" height="16" rx="8" fill="#94a3b8"/>`)),
        soltos: soltosTech()
      };
    },

    gamer() {
      return {
        principal: S(SM(160, 16, 366) +
          C(8, .2, `<path d="M104 144h192c34 0 58 28 62 72l8 68c4 32-24 54-52 38l-46-32H132l-46 32c-28 16-56-6-52-38l8-68c4-44 28-72 62-72z" fill="#1e293b"/>`) +
          C(14, .5, `<path d="M114 196v48M90 220h48" stroke="#fff" stroke-width="14" stroke-linecap="round"/>
            <circle cx="272" cy="200" r="12" style="fill:var(--p)"/><circle cx="298" cy="220" r="12" style="fill:var(--d)"/><circle cx="272" cy="240" r="12" fill="#22c55e"/><circle cx="246" cy="220" r="12" fill="#f43f5e"/>`)),
        soltos: soltosTech()
      };
    },

    powerbank() {
      return {
        principal: S(SM(132, 15, 368) +
          C(7, 0, `<rect x="114" y="64" width="172" height="284" rx="30" fill="#1e293b"/><rect x="128" y="78" width="144" height="256" rx="22" style="fill:var(--p)"/>`) +
          C(14, .45, `<circle cx="200" cy="184" r="46" fill="#0f172a"/><path d="M206 156l-26 32h18l-8 28 28-34h-18z" style="fill:var(--d)"/>
            <g fill="#fff"><circle cx="164" cy="288" r="7"/><circle cx="188" cy="288" r="7"/><circle cx="212" cy="288" r="7"/><circle cx="236" cy="288" r="7" opacity=".35"/></g>`)),
        soltos: soltosTech()
      };
    },

    capinha() {
      return {
        principal: S(SM(134, 15, 368) +
          C(7, 0, `<rect x="114" y="48" width="172" height="304" rx="34" style="fill:var(--p)"/>`) +
          C(13, .4, `<rect x="132" y="66" width="74" height="74" rx="20" fill="#0f172a"/><circle cx="152" cy="86" r="14" fill="#334155"/><circle cx="184" cy="102" r="14" fill="#334155"/><circle cx="152" cy="120" r="14" fill="#334155"/>
            <circle cx="200" cy="218" r="44" fill="none" stroke="#fff" stroke-width="14" opacity=".88"/><rect x="193" y="274" width="14" height="34" rx="7" fill="#fff" opacity=".88"/>`)),
        soltos: soltosTech()
      };
    },

    assistencia() {
      return {
        principal: S(SM(154, 16, 368) +
          C(6, 0, `<rect x="110" y="54" width="180" height="292" rx="32" fill="#1e293b"/><rect x="124" y="70" width="152" height="260" rx="24" fill="#0f172a"/>`) +
          C(14, .45, `<circle cx="200" cy="200" r="56" style="fill:var(--p)"/><circle cx="200" cy="200" r="24" fill="#0f172a"/>
            <path d="M200 126v24M200 250v24M126 200h24M250 200h24" stroke="var(--d)" stroke-width="18" stroke-linecap="round"/>`)),
        soltos: soltosTech()
      };
    }
  };

  window.CENAS_NOMES = {
    tech: 'Smartphone e fone TWS',
    audio: 'Headphone e ondas sonoras',
    watch: 'Smartwatch moderno',
    caixa: 'Caixa de som Bluetooth',
    turbo: 'Carregador turbo + cabo',
    notebook: 'Notebook e setup tech',
    gamer: 'Controle gamer neon',
    powerbank: 'Power bank portátil',
    capinha: 'Capinha MagSafe',
    assistencia: 'Assistência técnica 3D'
  };
  window.CENAS_ICONES = {
    tech: 'cat-celular', audio: 'cat-celular', watch: 'cat-celular', caixa: 'cat-celular', turbo: 'cat-celular',
    notebook: 'cat-celular', gamer: 'cat-celular', powerbank: 'cat-celular', capinha: 'cat-celular', assistencia: 'cat-celular'
  };
})();
