/* 10 animações 3D exclusivas do ramo: Cosméticos e perfumaria */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra;
  const soltosBel = () => K.soltosPadrao(K.estrela(), K.coracao('var(--p)'), K.estrela('var(--p)'), K.bolinha('var(--d)'));

  window.CENAS = {
    beleza() {
      return {
        principal: S(SM(154, 15, 368) +
          C(6, 0, `<g transform="translate(80 62)"><rect x="66" y="14" width="60" height="44" rx="10" fill="#dfb162"/><rect x="78" y="58" width="36" height="18" fill="#d6b47c"/><rect x="18" y="76" width="156" height="214" rx="32" fill="#fce4ec"/><rect x="30" y="92" width="132" height="182" rx="22" style="fill:var(--p)" opacity=".28"/><rect x="44" y="138" width="104" height="84" rx="14" fill="#fff"/></g>`) +
          C(14, .45, `<g transform="translate(248 148) rotate(8)"><rect x="18" y="106" width="58" height="106" rx="10" fill="#231920"/><rect x="24" y="62" width="46" height="48" fill="#dfb162"/><path d="M28 62V16c0-10 38-20 38 6v40z" style="fill:var(--p)"/></g>`)),
        soltos: soltosBel()
      };
    },

    perfume() {
      return {
        principal: S(SM(154, 15, 368) +
          C(6, 0, `<rect x="68" y="160" width="264" height="190" rx="22" fill="#fff6f9"/><rect x="56" y="128" width="288" height="46" rx="14" style="fill:var(--p)"/><rect x="176" y="128" width="48" height="222" style="fill:var(--d)"/>`) +
          C(14, .45, `<path d="M200 128c-48-10-76-46-46-68s62 12 46 68zM200 128c48-10 76-46 46-68s-62 12-46 68z" fill="none" style="stroke:var(--d)" stroke-width="14"/>`)),
        soltos: soltosBel()
      };
    },

    paleta() {
      return {
        principal: S(SM(164, 16, 368) +
          C(6, 0, `<rect x="62" y="138" width="276" height="196" rx="24" fill="#231920"/>`) +
          C(12, .35, `<circle cx="118" cy="196" r="28" fill="#f2b8a2"/><circle cx="198" cy="196" r="28" style="fill:var(--p)"/><circle cx="278" cy="196" r="28" fill="#d99a6c"/>
            <circle cx="118" cy="274" r="28" style="fill:var(--d)"/><circle cx="198" cy="274" r="28" fill="#a84364"/><circle cx="278" cy="274" r="28" fill="#6b3424"/>`) +
          C(16, .65, `<g transform="translate(242 52) rotate(32)"><rect x="24" y="46" width="16" height="156" rx="8" fill="#dfb162"/><path d="M14 48c0-28 36-28 36 0z" style="fill:var(--p)"/></g>`)),
        soltos: soltosBel()
      };
    },

    serum() {
      return {
        principal: S(SM(132, 15, 368) +
          C(6, 0, `<rect x="174" y="54" width="52" height="58" rx="22" fill="#231920"/><rect x="164" y="106" width="72" height="28" rx="8" fill="#dfb162"/>
            <rect x="122" y="134" width="156" height="218" rx="36" fill="#fce4ec"/><rect x="136" y="156" width="128" height="182" rx="26" style="fill:var(--p)" opacity=".28"/>
            <rect x="148" y="206" width="104" height="82" rx="14" fill="#fff"/>`) +
          C(15, .5, `<path d="M294 94c14 26 24 44 24 58a24 24 0 0 1-48 0c0-14 10-32 24-58z" style="fill:var(--d)"/>`)),
        soltos: soltosBel()
      };
    },

    base() {
      return {
        principal: S(SM(154, 15, 368) +
          C(6, 0, `<rect x="92" y="114" width="128" height="236" rx="24" fill="#e6b89c"/><rect x="126" y="64" width="60" height="54" rx="12" fill="#231920"/><rect x="112" y="182" width="88" height="96" rx="12" fill="#fff"/>`) +
          C(14, .45, `<path d="M286 184c34 48 48 86 48 114a48 48 0 0 1-96 0c0-28 14-66 48-114z" style="fill:var(--p)"/>`)),
        soltos: soltosBel()
      };
    },

    esmaltes() {
      const esm = (x, y, c, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="26" y="0" width="28" height="72" rx="8" fill="#231920"/><rect x="6" y="68" width="68" height="104" rx="18" fill="${c}"/><rect x="18" y="96" width="44" height="44" rx="8" fill="#fff" opacity=".88"/></g>`;
      return {
        principal: S(SM(156, 16, 368) +
          C(6, 0, esm(76, 156, '#e63946', -12) + esm(246, 156, 'var(--d)', 12)) +
          C(13, .45, esm(160, 126, 'var(--p)', 0))),
        soltos: soltosBel()
      };
    },

    creme() {
      return {
        principal: S(SM(156, 16, 368) +
          C(6, 0, `<rect x="74" y="176" width="252" height="172" rx="44" fill="#fff6f9"/><rect x="64" y="138" width="272" height="46" rx="18" style="fill:var(--p)"/><rect x="114" y="224" width="172" height="72" rx="18" style="fill:var(--d)" opacity=".35"/>`) +
          C(14, .45, `<g transform="translate(200 102)"><circle r="18" style="fill:var(--d)"/><circle cx="0" cy="-26" r="16" style="fill:var(--p)"/><circle cx="24" cy="-8" r="16" style="fill:var(--p)"/><circle cx="-24" cy="-8" r="16" style="fill:var(--p)"/><circle cx="16" cy="20" r="16" style="fill:var(--p)"/><circle cx="-16" cy="20" r="16" style="fill:var(--p)"/></g>`)),
        soltos: soltosBel()
      };
    },

    cabelo() {
      return {
        principal: S(SM(156, 16, 368) +
          C(6, 0, `<rect x="86" y="106" width="106" height="244" rx="30" style="fill:var(--p)"/><rect x="116" y="66" width="46" height="44" rx="10" style="fill:var(--d)"/><rect x="104" y="172" width="70" height="92" rx="14" fill="#fff"/>`) +
          C(12, .4, `<rect x="208" y="142" width="106" height="208" rx="30" style="fill:var(--d)"/><rect x="238" y="102" width="46" height="44" rx="10" fill="#231920"/><rect x="226" y="198" width="70" height="82" rx="14" fill="#fff"/>`)),
        soltos: soltosBel()
      };
    },

    espelho() {
      return {
        principal: S(SM(156, 16, 368) +
          C(6, 0, `<rect x="74" y="76" width="252" height="266" rx="34" fill="#231920"/><rect x="104" y="106" width="192" height="206" rx="22" fill="#e6f2ff"/>
            <path d="M134 266l96-116M178 278l76-92" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".55"/>`) +
          C(14, .45, `<g style="fill:var(--d)"><circle cx="90" cy="116" r="10"/><circle cx="90" cy="176" r="10"/><circle cx="90" cy="236" r="10"/><circle cx="90" cy="296" r="10"/>
            <circle cx="310" cy="116" r="10"/><circle cx="310" cy="176" r="10"/><circle cx="310" cy="236" r="10"/><circle cx="310" cy="296" r="10"/>
            <circle cx="150" cy="90" r="10"/><circle cx="200" cy="90" r="10"/><circle cx="250" cy="90" r="10"/></g>`)),
        soltos: soltosBel()
      };
    },

    necessaire() {
      return {
        principal: S(SM(164, 16, 368) +
          C(6, 0, `<rect x="114" y="88" width="44" height="106" rx="12" style="fill:var(--d)"/><rect x="176" y="74" width="46" height="120" rx="14" fill="#231920"/><circle cx="264" cy="128" r="32" fill="#fce4ec"/>`) +
          C(13, .4, `<path d="M56 176h288l-16 154q-4 22-26 22H98q-22 0-26-22z" style="fill:var(--p)"/><rect x="56" y="168" width="288" height="22" rx="11" style="fill:var(--d)"/><circle cx="200" cy="256" r="24" fill="#fff" opacity=".88"/>`)),
        soltos: soltosBel()
      };
    }
  };

  window.CENAS_NOMES = {
    beleza: 'Perfume lapidado e batom',
    perfume: 'Kit presente com laço',
    paleta: 'Paleta de sombras e pincel',
    serum: 'Sérum skincare conta-gotas',
    base: 'Base e esponja de maquiagem',
    esmaltes: 'Esmaltes coloridos',
    creme: 'Creme hidratante e flor',
    cabelo: 'Linha de tratamento capilar',
    espelho: 'Espelho de camarim',
    necessaire: 'Nécessaire de beleza'
  };
  window.CENAS_ICONES = {
    beleza: 'cat-cosmetico', perfume: 'cat-presente', paleta: 'cat-cosmetico', serum: 'cat-cosmetico', base: 'cat-cosmetico',
    esmaltes: 'cat-cosmetico', creme: 'cat-cosmetico', cabelo: 'cat-cosmetico', espelho: 'cat-cosmetico', necessaire: 'cat-acessorio'
  };
})();
