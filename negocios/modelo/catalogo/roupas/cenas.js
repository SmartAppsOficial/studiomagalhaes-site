/* 10 animações 3D exclusivas do ramo: Roupas e moda */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra;
  const soltosModa = () => K.soltosPadrao(K.etiqueta(), K.estrela(), K.coracao('var(--p)'), K.bolinha('var(--d)'));

  window.CENAS = {
    moda() {
      return {
        principal: S(SM(154, 15, 368) +
          C(5, 0, `<g transform="translate(216 146)"><path d="M40 52V28a26 26 0 0 1 52 0v24" stroke="#d9ab5b" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M12 52h108l14 156q2 12-10 12H8q-12 0-10-12z" fill="#fffaf3"/><path d="M12 52h108v34H12z" style="fill:var(--p)"/><circle cx="66" cy="136" r="24" style="fill:var(--d)"/></g>`) +
          C(11, .3, `<g transform="translate(48 34)"><path d="M114 28a14 14 0 1 1 14 14v12" stroke="#d9ab5b" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M114 54l-78 44q-10 6-6 14t14 4h140q10 4 14-4t-6-14z" fill="none" stroke="#d9ab5b" stroke-width="8" stroke-linejoin="round"/><path d="M62 104h104l-14 68 38 142q4 14-12 14H50q-16 0-12-14l38-142z" style="fill:var(--p)"/><path d="M74 172h80v14H74z" style="fill:var(--d)"/></g>`) +
          C(16, .6, `<g transform="translate(264 68) rotate(14)"><path d="M12 24L36 4h32l24 20v62q0 8-8 8H20q-8 0-8-8z" style="fill:var(--d)"/><circle cx="52" cy="24" r="6" fill="#fff"/></g>`)),
        soltos: soltosModa()
      };
    },

    street() {
      return {
        principal: S(SM(154, 15, 368) +
          C(6, 0, `<g transform="translate(52 80)"><path d="M98 18c18 18 52 18 70 0l56 26 32 62-42 26-18-32v168H70V100l-18 32-42-26 32-62z" style="fill:var(--p)"/><rect x="96" y="102" width="74" height="74" rx="16" style="fill:var(--d)"/><path d="M114 140h38M133 121v38" stroke="#1e130e" stroke-width="5" stroke-linecap="round"/></g>`) +
          C(13, .4, `<g transform="translate(206 206)"><path d="M28 56c0-42 30-68 72-68s72 26 72 68z" fill="#1e1c1a"/><path d="M18 56h156c18 0 28 10 24 22-36 10-124 10-180 0-8-4-6-22 0-22z" style="fill:var(--d)"/><circle cx="100" cy="24" r="14" style="fill:var(--p)"/></g>`)),
        soltos: soltosModa()
      };
    },

    jaqueta() {
      return {
        principal: S(SM(156, 15, 368) +
          C(7, 0, `<path d="M138 72l62 34 62-34 66 44 26 118-50 18-16-86v174H112V166l-16 86-50-18 26-118z" fill="#2c5a8a"/>
            <path d="M200 106v234" stroke="#1b3a5c" stroke-width="6"/><rect x="132" y="168" width="44" height="44" rx="8" fill="#1e446b"/><rect x="224" y="168" width="44" height="44" rx="8" fill="#1e446b"/>`) +
          C(15, .5, `<g transform="translate(226 254) rotate(12)"><rect x="4" y="12" width="54" height="36" rx="14" fill="#18181b"/><rect x="70" y="12" width="54" height="36" rx="14" fill="#18181b"/><path d="M58 26h12" stroke="var(--d)" stroke-width="6"/></g>`)),
        soltos: soltosModa()
      };
    },

    alfaiataria() {
      return {
        principal: S(SM(154, 15, 368) +
          C(6, 0, `<path d="M136 68h128l64 46 22 142-48 12-14-92v168H112V176l-14 92-48-12 22-142z" style="fill:var(--p)"/>
            <polygon points="158,68 200,194 242,68" fill="#fffaf3"/>
            <polygon points="158,68 134,136 200,194" fill="#000" opacity=".18"/><polygon points="242,68 266,136 200,194" fill="#000" opacity=".18"/>`) +
          C(14, .45, `<circle cx="200" cy="226" r="10" style="fill:var(--d)"/><circle cx="200" cy="264" r="10" style="fill:var(--d)"/><rect x="230" y="162" width="34" height="10" rx="5" style="fill:var(--d)"/>`)),
        soltos: soltosModa()
      };
    },

    sacolas() {
      return {
        principal: S(SM(164, 16, 368) +
          C(6, 0, `<g transform="translate(46 116)"><path d="M46 48V24a32 32 0 0 1 64 0v24" fill="none" stroke="var(--d)" stroke-width="10"/><rect x="12" y="48" width="132" height="184" rx="14" style="fill:var(--p)"/><circle cx="78" cy="140" r="24" style="fill:var(--d)"/></g>`) +
          C(12, .35, `<g transform="translate(178 76)"><path d="M56 54V26a36 36 0 0 1 72 0v28" fill="none" stroke="var(--p)" stroke-width="11"/><rect x="12" y="54" width="160" height="222" rx="16" fill="#fffaf3"/><rect x="12" y="54" width="160" height="44" rx="10" style="fill:var(--d)"/><rect x="52" y="150" width="80" height="16" rx="8" style="fill:var(--p)"/></g>`)),
        soltos: soltosModa()
      };
    },

    tenis() {
      return {
        principal: S(SM(162, 16, 368) +
          C(6, 0, `<rect x="56" y="220" width="288" height="126" rx="18" style="fill:var(--p)"/><rect x="44" y="202" width="312" height="32" rx="12" style="fill:var(--d)"/>`) +
          C(14, .45, `<g transform="translate(56 88) rotate(-14 144 90)">
            <path d="M24 114c22-46 58-70 96-54l44 26c26 14 78 10 106 32v34H24z" fill="#fffaf3"/>
            <rect x="20" y="146" width="256" height="26" rx="13" fill="#e2e8f0"/>
            <path d="M98 118c34-14 74-10 112 8" stroke="var(--p)" stroke-width="14" stroke-linecap="round" fill="none"/>
            <path d="M126 66l16 14M144 76l16 14M162 86l16 14" stroke="var(--d)" stroke-width="7" stroke-linecap="round"/>
          </g>`)),
        soltos: soltosModa()
      };
    },

    bolsa() {
      return {
        principal: S(SM(154, 16, 368) +
          C(6, 0, `<path d="M128 158v-36a72 72 0 0 1 144 0v36" fill="none" stroke="#d9ab5b" stroke-width="14" stroke-linecap="round"/>`) +
          C(11, .35, `<rect x="64" y="152" width="272" height="196" rx="34" style="fill:var(--p)"/><path d="M64 186q136 52 272 0v-34H64z" fill="#000" opacity=".18"/>`) +
          C(16, .65, `<rect x="174" y="196" width="52" height="44" rx="12" style="fill:var(--d)"/><circle cx="200" cy="218" r="9" fill="#fff"/>`)),
        soltos: soltosModa()
      };
    },

    vitrine() {
      return {
        principal: S(SM(152, 16, 368) +
          C(5, 0, `<rect x="192" y="284" width="16" height="68" fill="#d9ab5b"/><ellipse cx="200" cy="352" rx="64" ry="14" fill="#d9ab5b"/>`) +
          C(10, .3, `<path d="M142 104h116l-18 82 28 104H132l28-104z" fill="#fff5eb"/><circle cx="200" cy="76" r="20" fill="#d9ab5b"/>`) +
          C(15, .6, `<path d="M142 104h116l-18 82 36 108H124l36-108z" style="fill:var(--p)" opacity=".92"/><rect x="158" y="176" width="84" height="16" rx="8" style="fill:var(--d)"/>`)),
        soltos: soltosModa()
      };
    },

    praia() {
      return {
        principal: S(SM(156, 16, 368) +
          C(6, 0, `<ellipse cx="200" cy="186" rx="154" ry="52" fill="#f0d192"/><path d="M126 174c0-54 32-84 74-84s74 30 74 84z" fill="#e5bf74"/><rect x="124" y="156" width="152" height="22" rx="10" style="fill:var(--p)"/>`) +
          C(14, .45, `<g transform="translate(86 244)"><rect x="10" y="14" width="96" height="64" rx="28" fill="#18181b"/><rect x="122" y="14" width="96" height="64" rx="28" fill="#18181b"/><path d="M106 38h16" stroke="var(--d)" stroke-width="10"/><path d="M28 32l24 24M140 32l24 24" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".35"/></g>`)),
        soltos: K.soltosPadrao(K.estrela(), K.coracao('var(--p)'), K.bolinha('var(--d)'), K.etiqueta())
      };
    },

    fitness() {
      return {
        principal: S(SM(154, 16, 368) +
          C(6, 0, `<path d="M134 86h34l12 40h40l12-40h34l22 102H112z" style="fill:var(--p)"/><rect x="112" y="170" width="176" height="24" rx="8" style="fill:var(--d)"/>`) +
          C(12, .35, `<path d="M124 214h152l16 132h-56l-36-78-36 78h-56z" fill="#232730"/><path d="M124 214h152v24H124z" style="fill:var(--p)"/>`) +
          C(16, .65, `<g transform="translate(264 252) rotate(-18)"><rect x="14" y="24" width="64" height="16" rx="8" fill="#cfd8e3"/><rect x="4" y="10" width="18" height="44" rx="6" style="fill:var(--d)"/><rect x="70" y="10" width="18" height="44" rx="6" style="fill:var(--d)"/></g>`)),
        soltos: K.soltosPadrao(K.raio(), K.estrela(), K.coracao('var(--p)'), K.etiqueta())
      };
    }
  };

  window.CENAS_NOMES = {
    moda: 'Boutique e vestido no cabide',
    street: 'Moda casual e streetwear',
    jaqueta: 'Jaqueta jeans e óculos',
    alfaiataria: 'Blazer e alfaiataria',
    sacolas: 'Sacolas de compras boutique',
    tenis: 'Tênis estiloso e caixa',
    bolsa: 'Bolsa de couro premium',
    vitrine: 'Manequim de vitrine',
    praia: 'Moda praia e verão',
    fitness: 'Moda fitness e esportiva'
  };
  window.CENAS_ICONES = {
    moda: 'cat-vestido', street: 'cat-roupa', jaqueta: 'cat-roupa', alfaiataria: 'cat-roupa', sacolas: 'cat-acessorio',
    tenis: 'cat-acessorio', bolsa: 'cat-acessorio', vitrine: 'cat-vestido', praia: 'cat-vestido', fitness: 'cat-roupa'
  };
})();
