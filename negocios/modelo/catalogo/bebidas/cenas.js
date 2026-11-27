/* 10 animações 3D exclusivas do ramo: Bebidas e adega */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra;
  const soltosBeb = () => K.soltosPadrao(K.gelo(), K.limao(), K.estrela(), K.gelo());

  window.CENAS = {
    adega() {
      return {
        principal: S(SM(146, 15, 368) +
          C(6, 0, `<g transform="translate(114 38) rotate(-14 44 130)"><path d="M32 6h24v64c0 16 24 28 24 64v124H8V134c0-36 24-48 24-64z" fill="#1e5c2e"/><rect x="12" y="138" width="64" height="62" rx="8" style="fill:var(--d)"/></g>
            <g transform="translate(218 96) rotate(12 38 96)"><rect x="6" y="16" width="76" height="156" rx="16" style="fill:var(--p)"/><circle cx="44" cy="96" r="24" style="fill:var(--d)"/></g>`) +
          C(11, .35, `<g fill="#d8f2ff" stroke="#fff" stroke-width="3"><rect x="108" y="180" width="46" height="46" rx="10" transform="rotate(-12 108 180)"/><rect x="166" y="170" width="52" height="52" rx="10" transform="rotate(14 166 170)"/><rect x="230" y="176" width="46" height="46" rx="10" transform="rotate(-8 230 176)"/></g>`) +
          C(16, .6, `<path d="M84 212h232l-26 138q-4 14-20 14H130q-16 0-20-14z" fill="#dfe6ee"/><rect x="74" y="200" width="252" height="22" rx="11" style="fill:var(--p)"/><path d="M134 268h132v28H134z" style="fill:var(--d)"/>`)),
        soltos: soltosBeb()
      };
    },

    cerveja() {
      return {
        principal: S(SM(130, 15, 368) +
          C(7, 0, `<path d="M274 166h34c22 0 34 16 34 40v48c0 24-12 40-34 40h-34" fill="none" stroke="#e6eef5" stroke-width="20" stroke-linecap="round"/><rect x="106" y="120" width="174" height="236" rx="22" fill="#e6eef5"/><rect x="120" y="138" width="146" height="202" rx="14" fill="#f5b82e"/><g fill="#fff" opacity=".45"><circle cx="152" cy="284" r="6"/><circle cx="188" cy="240" r="8"/><circle cx="222" cy="296" r="5"/></g>`) +
          C(14, .45, `<g fill="#fffdf8"><circle cx="136" cy="118" r="34"/><circle cx="188" cy="102" r="42"/><circle cx="246" cy="118" r="34"/><path d="M112 126h162v22q-14 14-22 26t-18-16-24 22-22-24-28 18-24-20-24-28z"/></g>`)),
        soltos: soltosBeb()
      };
    },

    vinho() {
      return {
        principal: S(SM(146, 15, 368) +
          C(6, 0, `<g transform="translate(86 44)"><path d="M44 10h32v78c0 20 34 34 34 74v140q0 14-14 14H24q-14 0-14-14V162c0-40 34-54 34-74z" fill="#2b121a"/><rect x="40" y="4" width="40" height="24" rx="6" style="fill:var(--d)"/><rect x="18" y="176" width="84" height="86" rx="10" fill="#fffaf3"/><rect x="34" y="206" width="52" height="14" rx="7" style="fill:var(--p)"/></g>`) +
          C(14, .45, `<g transform="translate(206 116)"><path d="M16 14h108l-10 88c-4 32-24 48-44 48s-40-16-44-48z" fill="#e8eff5" opacity=".75"/><path d="M22 68h96l-6 34c-4 28-22 42-42 42s-38-14-42-42z" fill="#8b1e3f"/><rect x="64" y="148" width="12" height="84" fill="#dce6ef"/><ellipse cx="70" cy="236" rx="44" ry="12" fill="#dce6ef"/></g>`)),
        soltos: soltosBeb()
      };
    },

    gin() {
      return {
        principal: S(SM(122, 15, 368) +
          C(6, 0, `<rect x="192" y="246" width="16" height="96" fill="#dce6ef"/><ellipse cx="200" cy="346" rx="58" ry="14" fill="#dce6ef"/><path d="M104 114h192c0 88-38 142-96 142s-96-54-96-142z" fill="#e6f5ff" opacity=".82"/>`) +
          C(12, .35, `<g fill="#fff" opacity=".8"><rect x="144" y="138" width="42" height="42" rx="10" transform="rotate(-14 144 138)"/><rect x="202" y="146" width="42" height="42" rx="10" transform="rotate(14 202 146)"/></g>`) +
          C(16, .65, `<circle cx="272" cy="116" r="34" fill="#8bc34a"/><circle cx="272" cy="116" r="26" fill="#e6f5c9"/><path d="M148 56l36 114" stroke="var(--p)" stroke-width="10" stroke-linecap="round"/>`)),
        soltos: soltosBeb()
      };
    },

    pack() {
      const lata = (x, y) => `<g transform="translate(${x} ${y})"><rect width="74" height="148" rx="16" style="fill:var(--p)"/><rect x="6" y="-8" width="62" height="14" rx="6" fill="#e2e8f0"/><circle cx="37" cy="76" r="22" style="fill:var(--d)"/></g>`;
      return {
        principal: S(SM(164, 16, 368) +
          C(6, 0, lata(84, 134) + lata(163, 122) + lata(242, 134)) +
          C(14, .45, `<rect x="64" y="218" width="272" height="124" rx="18" fill="#182230"/><rect x="86" y="252" width="228" height="48" rx="12" style="fill:var(--d)"/>`)),
        soltos: soltosBeb()
      };
    },

    whisky() {
      return {
        principal: S(SM(138, 15, 368) +
          C(6, 0, `<path d="M106 138h188l-16 196q-4 18-24 18H146q-20 0-24-18z" fill="#e2ecf5" opacity=".75"/>`) +
          C(11, .35, `<path d="M114 212h172l-10 120q-4 16-22 16H146q-18 0-22-16z" fill="#b9641c"/>`) +
          C(16, .6, `<g fill="#d8f2ff" stroke="#fff" stroke-width="3"><rect x="138" y="190" width="54" height="54" rx="12" transform="rotate(-10 138 190)"/><rect x="204" y="198" width="54" height="54" rx="12" transform="rotate(14 204 198)"/></g>`)),
        soltos: soltosBeb()
      };
    },

    espumante() {
      return {
        principal: S(SM(146, 15, 368) +
          C(6, 0, `<g transform="rotate(-16 200 220)"><path d="M174 52h52v82c0 22 36 38 36 82v132H138V216c0-44 36-60 36-82z" fill="#1b4332"/><rect x="172" y="42" width="56" height="54" rx="8" style="fill:var(--d)"/><rect x="150" y="216" width="100" height="72" rx="10" style="fill:var(--d)"/></g>`) +
          C(15, .5, `<g style="fill:var(--d)"><circle cx="122" cy="78" r="10"/><circle cx="152" cy="46" r="14"/><circle cx="96" cy="112" r="8"/><circle cx="188" cy="36" r="8"/></g>`)),
        soltos: soltosBeb()
      };
    },

    cooler() {
      return {
        principal: S(SM(164, 16, 368) +
          C(6, 0, `<rect x="64" y="182" width="272" height="168" rx="22" style="fill:var(--p)"/><rect x="56" y="166" width="288" height="28" rx="12" fill="#fff"/>`) +
          C(11, .35, `<g fill="#d8f2ff"><rect x="92" y="132" width="44" height="44" rx="10" transform="rotate(-12 92 132)"/><rect x="154" y="122" width="48" height="48" rx="10" transform="rotate(10 154 122)"/><rect x="218" y="130" width="46" height="46" rx="10" transform="rotate(-8 218 130)"/></g>
            <rect x="252" y="88" width="48" height="86" rx="12" style="fill:var(--d)"/>`) +
          C(16, .65, `<rect x="140" y="244" width="120" height="42" rx="14" style="fill:var(--d)"/>`)),
        soltos: soltosBeb()
      };
    },

    caipirinha() {
      return {
        principal: S(SM(132, 15, 368) +
          C(6, 0, `<path d="M114 134h172l-18 202q-4 18-24 18h-88q-20 0-24-18z" fill="#e6f5ff" opacity=".82"/><path d="M122 186h156l-12 146q-4 16-22 16h-88q-18 0-22-16z" fill="#d9f2b4"/>`) +
          C(12, .35, `<circle cx="164" cy="242" r="28" fill="#8bc34a"/><circle cx="234" cy="264" r="26" fill="#7cb342"/><rect x="182" y="176" width="44" height="44" rx="10" fill="#fff" opacity=".85" transform="rotate(14 182 176)"/>`) +
          C(16, .65, `<path d="M238 46l18 6-36 142" stroke="var(--p)" stroke-width="12" stroke-linecap="round"/>`)),
        soltos: soltosBeb()
      };
    },

    energetico() {
      return {
        principal: S(SM(122, 15, 368) +
          C(7, 0, `<g transform="rotate(-8 200 200)"><rect x="136" y="68" width="128" height="276" rx="26" fill="#182230"/><rect x="148" y="54" width="104" height="20" rx="8" fill="#cbd5e1"/><polygon points="136,162 264,116 264,234 136,280" style="fill:var(--p)"/></g>`) +
          C(15, .5, `<path d="M214 132l-46 64h30l-12 58 50-68h-30z" style="fill:var(--d)"/>`)),
        soltos: K.soltosPadrao(K.raio(), K.gelo(), K.raio(), K.estrela())
      };
    }
  };

  window.CENAS_NOMES = {
    adega: 'Balde de gelo com bebidas',
    cerveja: 'Chopp trincando com espuma',
    vinho: 'Garrafa de vinho e taça',
    gin: 'Gin tônica com limão',
    pack: 'Pack de latas geladas',
    whisky: 'Whisky on the rocks',
    espumante: 'Espumante e brinde',
    cooler: 'Cooler de churrasco',
    caipirinha: 'Caipirinha e limão',
    energetico: 'Energético gelado'
  };
  window.CENAS_ICONES = {
    adega: 'cat-garrafa', cerveja: 'cat-garrafa', vinho: 'cat-garrafa', gin: 'cat-refri', pack: 'cat-garrafa',
    whisky: 'cat-garrafa', espumante: 'cat-garrafa', cooler: 'cat-combo', caipirinha: 'cat-refri', energetico: 'cat-refri'
  };
})();
