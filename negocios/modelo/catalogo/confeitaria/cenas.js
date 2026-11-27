/* 10 animações 3D exclusivas do ramo: Confeitaria, doces e bolos */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra;
  const macSolto = `<svg viewBox="0 0 60 44"><rect x="4" y="6" width="52" height="14" rx="7" style="fill:var(--p)"/><rect x="6" y="18" width="48" height="8" rx="4" fill="#fff5eb"/><rect x="4" y="24" width="52" height="14" rx="7" style="fill:var(--p)"/></svg>`;
  const brigSolto = `<svg viewBox="0 0 54 54"><circle cx="27" cy="27" r="22" fill="#4b2216"/><circle cx="20" cy="18" r="3" fill="#8f4a32"/><circle cx="34" cy="24" r="3" fill="#8f4a32"/><circle cx="24" cy="34" r="3" fill="#8f4a32"/></svg>`;
  const soltosDoce = () => K.soltosPadrao(macSolto, K.morango(), brigSolto, K.coracao('var(--d)'));

  window.CENAS = {
    bolo() {
      const rosetas = [122, 152, 184, 216, 248, 278].map((x, i) => `<g transform="translate(${x} ${148 + (i % 2) * 3})"><circle r="16" fill="#fff8f0"/><circle cy="-4" r="11" fill="#fffdf9"/></g>`).join('');
      return {
        principal: S(SM(156, 16, 368) +
          C(4, 0, `<path d="M170 318h60l14 42q2 6-6 6h-76q-8 0-6-6z" fill="#d7b67c"/><ellipse cx="200" cy="316" rx="150" ry="22" fill="#e8c88c"/><ellipse cx="200" cy="311" rx="134" ry="15" fill="#fff8ee" opacity=".75"/>`) +
          C(8, .25, `<path d="M96 156h208v144q0 18-104 18t-104-18z" fill="#fff3e8"/><path d="M96 226q104 18 208 0v22q-104 18-208 0z" fill="#6e2e1d"/><path d="M96 268q104 18 208 0v14q-104 18-208 0z" style="fill:var(--p)" opacity=".88"/><ellipse cx="200" cy="156" rx="104" ry="24" fill="#fff3e6"/>`) +
          C(12, .45, `<path d="M94 156c0-16 46-26 106-26s106 10 106 26v16c0 10-12 12-16 2s-10-8-14 14-14 26-20 4-14-6-20 26-16 32-22 2-12-8-18 18-16 20-20-6-14-10-20 20-18 22-22-10-14-12-20 12-20 6-20-26z" fill="#4b1d12"/>${rosetas}`) +
          C(16, .7, `<g transform="translate(154 96)"><path d="M24 8c14 0 22 14 18 30s-14 24-18 24-14-8-18-24 4-30 18-30z" fill="#d92b3a"/><path d="M12 10l12-12 12 10-8 4-4-6-4 6z" fill="#3f8f3c"/></g>
            <g transform="translate(204 102) rotate(12)"><path d="M20 6c12 0 18 12 15 26s-12 20-15 20-12-6-15-20 3-26 15-26z" fill="#e63946"/><path d="M10 8l10-10 10 8-6 3-4-5-4 5z" fill="#4aa146"/></g>`)),
        soltos: soltosDoce()
      };
    },

    doces() {
      return {
        principal: S(SM(154, 16, 366) +
          C(5, .1, `<path d="M118 232h164l-24 114q-4 14-18 14h-80q-14 0-18-14z" style="fill:var(--p)"/><g stroke="#000" stroke-opacity=".14" stroke-width="5"><path d="M148 234l10 124M176 234l4 126M200 234v126M224 234l-4 126M252 234l-10 124"/></g>`) +
          C(10, .35, `<path d="M100 232c0-26 24-44 100-44s100 18 100 44q0 12-14 12H114q-14 0-14-12z" fill="#f7d3e0"/><path d="M122 194c0-24 22-40 78-40s78 16 78 40q0 10-12 10H134q-12 0-12-10z" fill="#fff7fa"/><path d="M148 158c0-22 18-38 52-48 26 10 52 26 52 48q0 10-12 10h-80q-12 0-12-10z" fill="#fde5ee"/><circle cx="200" cy="96" r="22" fill="#d92b3a"/>`) +
          C(16, .6, `<g transform="translate(46 286)"><path d="M8 34h64l-8 30H16z" fill="#fff3e6"/><circle cx="40" cy="24" r="24" fill="#522316"/></g>
            <g transform="translate(274 282)"><path d="M8 34h64l-8 30H16z" fill="#fff3e6"/><circle cx="40" cy="24" r="24" fill="#f7d3e0"/><circle cx="40" cy="14" r="6" style="fill:var(--p)"/></g>`)),
        soltos: soltosDoce()
      };
    },

    andares() {
      return {
        principal: S(SM(156, 16, 368) +
          C(4, 0, `<ellipse cx="200" cy="340" rx="146" ry="20" fill="#e2c286"/>`) +
          C(8, .25, `<path d="M88 228h224v102q0 16-112 16T88 330z" fill="#fff4eb"/><path d="M88 296q112 18 224 0v18q-112 18-224 0z" style="fill:var(--p)"/><ellipse cx="200" cy="228" rx="112" ry="22" fill="#fff8f2"/>`) +
          C(12, .45, `<path d="M126 126h148v96q0 14-74 14t-74-14z" fill="#fce4ec"/><path d="M126 196q74 14 148 0v14q-74 14-148 0z" style="fill:var(--d)"/><ellipse cx="200" cy="126" rx="74" ry="18" fill="#fff5f8"/>`) +
          C(16, .7, `<circle cx="174" cy="110" r="14" style="fill:var(--p)"/><circle cx="200" cy="100" r="16" style="fill:var(--d)"/><circle cx="226" cy="110" r="14" style="fill:var(--p)"/><path d="M200 54l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" style="fill:var(--d)"/>`)),
        soltos: soltosDoce()
      };
    },

    macarons() {
      const mac = (x, y, c1, c2, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-78" y="-34" width="156" height="30" rx="15" fill="${c1}"/><rect x="-72" y="-6" width="144" height="16" rx="8" fill="${c2}"/><rect x="-78" y="8" width="156" height="30" rx="15" fill="${c1}"/></g>`;
      return {
        principal: S(SM(146, 16, 368) +
          C(6, 0, mac(200, 304, '#f29eb6', '#fff6f0', -3)) +
          C(11, .3, mac(206, 224, '#f6cf71', '#fff8eb', 4)) +
          C(16, .6, mac(196, 144, '#9dd6b8', '#fffaf3', -5))),
        soltos: soltosDoce()
      };
    },

    fatia() {
      return {
        principal: S(SM(156, 16, 368) +
          C(5, 0, `<ellipse cx="200" cy="330" rx="146" ry="26" fill="#fff8f0"/>`) +
          C(10, .3, `<polygon points="74,218 278,130 318,220 116,312" fill="#5e2516"/>
            <polygon points="74,218 318,220 318,318 74,318" fill="#f7dec8"/>
            <rect x="74" y="246" width="244" height="18" fill="#5e2516"/>
            <rect x="74" y="282" width="244" height="16" style="fill:var(--p)"/>`) +
          C(15, .6, `<path d="M72 218h248v16c-12 10-20-6-32 16s-22-4-34 12-22-6-34 14-24-8-36 10-22-8-34 12-22-8-34 6-26-4-44-16z" fill="#4b1c10"/>
            <circle cx="246" cy="146" r="22" fill="#e63946"/><path d="M234 134l12-12 12 12" fill="#4aa146"/>`)),
        soltos: soltosDoce()
      };
    },

    torta() {
      return {
        principal: S(SM(156, 16, 368) +
          C(6, 0, `<path d="M74 236h252l-26 94q-6 18-26 18H126q-20 0-26-18z" fill="#d99a4e"/><ellipse cx="200" cy="236" rx="126" ry="28" fill="#e7b269"/>`) +
          C(11, .35, `<ellipse cx="200" cy="230" rx="110" ry="22" fill="#d7e878"/>
            <path d="M98 222c14-48 48-74 102-88 54 14 88 40 102 88-16 14-34 4-52 12s-34-4-50 8-34-12-50-4-36-4-52-16z" fill="#fffdf8"/>
            <path d="M150 170c18-16 50-24 80-16" stroke="#f0c478" stroke-width="8" stroke-linecap="round" opacity=".6" fill="none"/>`) +
          C(16, .65, `<g transform="translate(228 112) rotate(18)"><circle cx="26" cy="26" r="24" fill="#8bc34a"/><circle cx="26" cy="26" r="18" fill="#e6f5c9"/><path d="M26 8v36M8 26h36" stroke="#8bc34a" stroke-width="2.5"/></g>`)),
        soltos: K.soltosPadrao(K.limao(), K.folha('#4aa146'), K.estrela(), K.coracao('var(--d)'))
      };
    },

    brownie() {
      return {
        principal: S(SM(152, 16, 368) +
          C(6, 0, `<rect x="86" y="218" width="228" height="122" rx="16" fill="#4b1f12"/><rect x="86" y="200" width="228" height="36" rx="14" fill="#6b301d"/>`) +
          C(11, .35, `<circle cx="200" cy="176" r="56" fill="#fff7e8"/>`) +
          C(16, .65, `<path d="M150 166c18-26 82-26 100 0 10 14 14 48 6 62-12 6-18-14-28 16s-22-14-30 20-20-16-28 8-18-22-24-44z" fill="#351209"/>
            <circle cx="200" cy="116" r="16" fill="#e63946"/>`)),
        soltos: soltosDoce()
      };
    },

    kit() {
      return {
        principal: S(SM(158, 16, 368) +
          C(5, 0, `<rect x="64" y="168" width="272" height="178" rx="22" fill="#fff7fa"/><rect x="52" y="132" width="296" height="46" rx="14" style="fill:var(--p)"/>
            <rect x="176" y="132" width="48" height="214" style="fill:var(--d)"/>`) +
          C(12, .35, `<path d="M200 132c-54-12-84-52-50-76s68 14 50 76zM200 132c54-12 84-52 50-76s-68 14-50 76z" fill="none" style="stroke:var(--d)" stroke-width="16"/>`) +
          C(16, .65, `<circle cx="118" cy="246" r="22" fill="#522316"/><circle cx="282" cy="246" r="22" style="fill:var(--p)"/>`)),
        soltos: soltosDoce()
      };
    },

    naked() {
      return {
        principal: S(SM(154, 16, 368) +
          C(5, 0, `<ellipse cx="200" cy="336" rx="142" ry="20" fill="#d9b277"/>`) +
          C(9, .25, `<rect x="104" y="276" width="192" height="50" rx="14" fill="#d99a4e"/><rect x="108" y="254" width="184" height="26" rx="12" fill="#fff7ee"/>
            <rect x="104" y="206" width="192" height="50" rx="14" fill="#d99a4e"/><rect x="108" y="184" width="184" height="26" rx="12" fill="#fff7ee"/>
            <rect x="104" y="138" width="192" height="48" rx="14" fill="#d99a4e"/>`) +
          C(15, .6, `<circle cx="144" cy="128" r="20" fill="#e63946"/><circle cx="200" cy="120" r="22" fill="#3a2352"/><circle cx="256" cy="128" r="20" fill="#e63946"/>
            <path d="M168 110c14-14 36-14 48 0" stroke="#4aa146" stroke-width="8" stroke-linecap="round" fill="none"/>`)),
        soltos: soltosDoce()
      };
    },

    donuts() {
      const dn = (x, y, c) => `<g transform="translate(${x} ${y})"><circle r="66" fill="#e5a14d"/><path d="M-60-12a60 60 0 1 1 120 0c-8 14-16-4-26 12s-20-6-34 8-22-10-34 4-22-4-26-24z" fill="${c}"/><circle r="22" fill="#1e130e" opacity=".45"/>
        <rect x="-32" y="-36" width="12" height="5" rx="2.5" fill="#fff" transform="rotate(-20 -32 -36)"/><rect x="18" y="-32" width="12" height="5" rx="2.5" fill="#ffe169" transform="rotate(24 18 -32)"/><rect x="26" y="16" width="12" height="5" rx="2.5" fill="#fff" transform="rotate(-15 26 16)"/></g>`;
      return {
        principal: S(SM(156, 16, 368) +
          C(6, 0, dn(144, 246, '#5a2417')) +
          C(11, .35, dn(258, 246, 'var(--d)')) +
          C(16, .65, dn(200, 146, 'var(--p)'))),
        soltos: soltosDoce()
      };
    }
  };

  window.CENAS_NOMES = {
    bolo: 'Bolo confeitado com morangos',
    doces: 'Cupcake e brigadeiros',
    andares: 'Bolo de 2 andares festa',
    macarons: 'Torre de macarons',
    fatia: 'Fatia suprema de bolo',
    torta: 'Torta de limão com merengue',
    brownie: 'Brownie com sorvete e calda',
    kit: 'Kit festa na caixa com laço',
    naked: 'Naked cake com frutas',
    donuts: 'Donuts gourmet coloridos'
  };
  window.CENAS_ICONES = {
    bolo: 'cat-bolo', doces: 'cat-doce', andares: 'cat-bolo', macarons: 'cat-doce', fatia: 'cat-bolo',
    torta: 'cat-doce', brownie: 'cat-doce', kit: 'cat-presente', naked: 'cat-bolo', donuts: 'cat-doce'
  };
})();
