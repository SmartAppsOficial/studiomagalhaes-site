/* 10 animações 3D exclusivas do ramo: Pet shop */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra;
  const soltosPet = () => K.soltosPadrao(K.patinha(), K.coracao('var(--p)'), K.estrela(), K.patinha('var(--p)'));

  window.CENAS = {
    pet() {
      const racao = [[142, 294], [164, 290], [186, 294], [208, 290], [226, 296], [176, 282], [202, 280]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#7a4420"/>`).join('');
      return {
        principal: S(SM(160, 16, 368) +
          C(5, 0, `<g transform="translate(152 56)"><path d="M16 24h164l-14 252q-2 16-18 16H48q-16 0-18-16z" style="fill:var(--p)"/><path d="M10 10h176l-8 24H18z" style="fill:var(--d)"/><rect x="34" y="88" width="128" height="106" rx="22" fill="#fffaf2"/>
            <g style="fill:var(--p)" transform="translate(98 142)"><circle cx="-18" cy="-16" r="8"/><circle cx="18" cy="-16" r="8"/><circle cx="-28" cy="2" r="7"/><circle cx="28" cy="2" r="7"/><path d="M0-2c-14 0-22 10-22 20 0 8 6 12 12 12 5 0 7-2 10-2s5 2 10 2c6 0 12-4 12-12 0-10-8-20-22-20z"/></g></g>`) +
          C(11, .35, `${racao}<path d="M84 294h184l16 58q4 14-12 14H80q-16 0-12-14z" style="fill:var(--d)"/><circle cx="176" cy="330" r="14" fill="#fff" opacity=".88"/>`) +
          C(16, .6, `<g transform="translate(46 154) rotate(-22)"><rect x="20" y="18" width="66" height="22" rx="11" fill="#fff6e6"/><circle cx="20" cy="18" r="13" fill="#fff6e6"/><circle cx="20" cy="38" r="13" fill="#fff6e6"/><circle cx="86" cy="18" r="13" fill="#fff6e6"/><circle cx="86" cy="38" r="13" fill="#fff6e6"/></g>`)),
        soltos: soltosPet()
      };
    },

    banho() {
      return {
        principal: S(SM(154, 15, 364) +
          C(6, 0, `<path d="M62 216h276l-24 106q-8 26-34 26H120q-26 0-34-26z" fill="#fff"/><rect x="48" y="198" width="304" height="28" rx="14" style="fill:var(--p)"/>`) +
          C(11, .35, `<g fill="#e8f7ff"><circle cx="112" cy="186" r="38"/><circle cx="164" cy="166" r="46"/><circle cx="228" cy="162" r="48"/><circle cx="282" cy="184" r="36"/></g>
            <g style="fill:var(--d)" transform="translate(200 170)"><circle cx="-18" cy="-16" r="8"/><circle cx="18" cy="-16" r="8"/><circle cx="-28" cy="2" r="7"/><circle cx="28" cy="2" r="7"/><path d="M0-2c-14 0-22 10-22 20 0 8 6 12 12 12 5 0 7-2 10-2s5 2 10 2c6 0 12-4 12-12 0-10-8-20-22-20z"/></g>`) +
          C(16, .65, `<g fill="none" stroke="#bfe8ff" stroke-width="5"><circle cx="124" cy="96" r="22"/><circle cx="268" cy="84" r="28"/><circle cx="206" cy="64" r="16"/></g>`)),
        soltos: soltosPet()
      };
    },

    coleira() {
      return {
        principal: S(SM(154, 15, 366) +
          C(7, 0, `<ellipse cx="200" cy="196" rx="136" ry="72" fill="none" style="stroke:var(--p)" stroke-width="34"/>
            <rect x="178" y="110" width="44" height="32" rx="8" fill="#d9ab5b"/>`) +
          C(15, .5, `<circle cx="200" cy="300" r="46" style="fill:var(--d)"/><circle cx="200" cy="300" r="36" fill="#fff8e8"/>
            <g style="fill:var(--p)" transform="translate(200 302) scale(.65)"><circle cx="-18" cy="-16" r="8"/><circle cx="18" cy="-16" r="8"/><circle cx="-28" cy="2" r="7"/><circle cx="28" cy="2" r="7"/><path d="M0-2c-14 0-22 10-22 20 0 8 6 12 12 12 5 0 7-2 10-2s5 2 10 2c6 0 12-4 12-12 0-10-8-20-22-20z"/></g>`)),
        soltos: soltosPet()
      };
    },

    casinha() {
      return {
        principal: S(SM(164, 16, 368) +
          C(6, 0, `<rect x="86" y="176" width="228" height="176" rx="16" fill="#e9c89b"/><path d="M44 192L200 66l156 126" fill="none" style="stroke:var(--p)" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>`) +
          C(12, .35, `<path d="M144 352V244a56 56 0 0 1 112 0v108z" fill="#3a2416"/>`) +
          C(16, .65, `<rect x="150" y="128" width="100" height="34" rx="17" style="fill:var(--d)"/><circle cx="200" cy="145" r="8" fill="#fff"/>`)),
        soltos: soltosPet()
      };
    },

    gato() {
      return {
        principal: S(SM(154, 16, 368) +
          C(5, 0, `<rect x="64" y="314" width="272" height="36" rx="18" fill="#b98a5b"/><rect x="176" y="136" width="48" height="184" rx="12" fill="#e5c597"/>`) +
          C(11, .35, `<rect x="84" y="114" width="232" height="34" rx="17" style="fill:var(--p)"/>
            <g transform="translate(200 100)"><circle r="38" style="fill:var(--d)"/><polygon points="-34,-18 -26,-56 -4,-28" style="fill:var(--d)"/><polygon points="34,-18 26,-56 4,-28" style="fill:var(--d)"/><circle cx="-12" cy="-4" r="5" fill="#1e130e"/><circle cx="12" cy="-4" r="5" fill="#1e130e"/></g>`) +
          C(16, .65, `<path d="M276 148v64" stroke="#fff" stroke-width="4"/><circle cx="276" cy="224" r="18" style="fill:var(--d)"/>`)),
        soltos: soltosPet()
      };
    },

    cama() {
      return {
        principal: S(SM(164, 16, 366) +
          C(7, 0, `<ellipse cx="200" cy="264" rx="154" ry="86" style="fill:var(--p)"/><ellipse cx="200" cy="248" rx="124" ry="62" fill="#fff8f0"/>`) +
          C(14, .45, `<ellipse cx="200" cy="252" rx="94" ry="44" style="fill:var(--d)" opacity=".85"/>
            <g transform="translate(152 152) rotate(-14)"><rect x="16" y="16" width="64" height="20" rx="10" fill="#fff"/><circle cx="16" cy="16" r="12" fill="#fff"/><circle cx="16" cy="36" r="12" fill="#fff"/><circle cx="80" cy="16" r="12" fill="#fff"/><circle cx="80" cy="36" r="12" fill="#fff"/></g>`)),
        soltos: soltosPet()
      };
    },

    brinquedo() {
      return {
        principal: S(SM(154, 16, 368) +
          C(6, 0, `<path d="M62 274c54-46 116 32 178-16s72 20 98-10" fill="none" style="stroke:var(--d)" stroke-width="24" stroke-linecap="round"/>`) +
          C(12, .4, `<circle cx="200" cy="174" r="88" style="fill:var(--p)"/><path d="M126 132c46 28 102 28 148 0M126 216c46-28 102-28 148 0" fill="none" stroke="#fff" stroke-width="10" opacity=".85"/>`)),
        soltos: soltosPet()
      };
    },

    higiene() {
      return {
        principal: S(SM(154, 16, 368) +
          C(6, 0, `<rect x="96" y="114" width="124" height="234" rx="34" style="fill:var(--p)"/><rect x="130" y="72" width="56" height="46" rx="12" style="fill:var(--d)"/><rect x="118" y="176" width="80" height="84" rx="16" fill="#fffaf3"/>`) +
          C(14, .45, `<g transform="translate(232 146) rotate(12)"><rect x="26" y="116" width="28" height="96" rx="14" style="fill:var(--d)"/><ellipse cx="40" cy="70" rx="44" ry="62" fill="#fff"/><ellipse cx="40" cy="70" rx="32" ry="48" style="fill:var(--p)" opacity=".35"/></g>`)),
        soltos: soltosPet()
      };
    },

    petisco() {
      return {
        principal: S(SM(156, 16, 368) +
          C(6, 0, `<rect x="96" y="120" width="208" height="228" rx="34" fill="#fff8ee" opacity=".85"/><rect x="114" y="92" width="172" height="36" rx="14" style="fill:var(--p)"/>`) +
          C(12, .35, `<g transform="translate(132 184) rotate(-14)"><rect x="14" y="14" width="60" height="20" rx="10" fill="#c9813c"/><circle cx="14" cy="14" r="12" fill="#c9813c"/><circle cx="14" cy="34" r="12" fill="#c9813c"/><circle cx="74" cy="14" r="12" fill="#c9813c"/><circle cx="74" cy="34" r="12" fill="#c9813c"/></g>
            <g transform="translate(184 252) rotate(16)"><rect x="14" y="14" width="60" height="20" rx="10" fill="#b36d2c"/><circle cx="14" cy="14" r="12" fill="#b36d2c"/><circle cx="14" cy="34" r="12" fill="#b36d2c"/><circle cx="74" cy="14" r="12" fill="#b36d2c"/><circle cx="74" cy="34" r="12" fill="#b36d2c"/></g>`)),
        soltos: soltosPet()
      };
    },

    transporte() {
      return {
        principal: S(SM(164, 16, 368) +
          C(6, 0, `<path d="M144 122V94q0-14 14-14h84q14 0 14 14v28" fill="none" style="stroke:var(--d)" stroke-width="14"/>
            <rect x="52" y="122" width="296" height="224" rx="36" style="fill:var(--p)"/><rect x="52" y="218" width="296" height="22" style="fill:var(--d)"/>`) +
          C(13, .45, `<rect x="120" y="150" width="160" height="168" rx="22" fill="#182226"/>
            <g stroke="#cfd8e3" stroke-width="6"><path d="M158 154v160M200 154v160M242 154v160M124 202h152M124 256h152"/></g>`)),
        soltos: soltosPet()
      };
    }
  };

  window.CENAS_NOMES = {
    pet: 'Saco de ração e tigela',
    banho: 'Banho e tosa com bolhas',
    coleira: 'Coleira e plaquinha',
    casinha: 'Casinha de cachorro',
    gato: 'Arranhador e gatinho',
    cama: 'Cama nuvem macia',
    brinquedo: 'Bola e corda pet',
    higiene: 'Kit shampoo e escova',
    petisco: 'Pote de petiscos naturais',
    transporte: 'Caixa de transporte / Táxi Dog'
  };
  window.CENAS_ICONES = {
    pet: 'cat-pet', banho: 'cat-pet', coleira: 'cat-pet', casinha: 'cat-pet', gato: 'cat-pet',
    cama: 'cat-pet', brinquedo: 'cat-pet', higiene: 'cat-pet', petisco: 'cat-pet', transporte: 'cat-pet'
  };
})();
