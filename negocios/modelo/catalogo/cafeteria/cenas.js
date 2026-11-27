/* 10 animações 3D exclusivas do ramo: Cafeteria */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra, VP = K.vapor;
  const soltosCafe = () => K.soltosPadrao(K.grao(), K.folha('#4aa146'), K.grao(), K.estrela());

  window.CENAS = {
    cafe() {
      return {
        principal: S(SM(146, 15, 364) +
          C(4, 0, `<ellipse cx="200" cy="322" rx="146" ry="28" fill="#e9dfd3"/><ellipse cx="200" cy="316" rx="126" ry="20" fill="#fffaf3"/>`) +
          C(9, .25, `<path d="M286 196h26c26 0 42 18 42 42s-16 42-42 42h-32" stroke="#fff8ef" stroke-width="18" stroke-linecap="round" fill="none"/><path d="M100 164h200v80c0 54-44 82-100 82s-100-28-100-82z" fill="#fffaf3"/><path d="M102 214h196v32H102z" style="fill:var(--p)" opacity=".92"/><circle cx="200" cy="230" r="14" style="fill:var(--d)"/>`) +
          C(13, .5, `<ellipse cx="200" cy="164" rx="100" ry="26" fill="#f7efe4"/><ellipse cx="200" cy="164" rx="88" ry="20" fill="#8b5228"/><path d="M200 176s-26-10-26-18a11 11 0 0 1 20-5l6 5 6-5a11 11 0 0 1 20 5c0 8-26 18-26 18z" fill="#fff7ec" opacity=".92"/>`) +
          C(17, .7, VP([156, 200, 244], 122))),
        soltos: soltosCafe()
      };
    },

    iced() {
      return {
        principal: S(SM(122, 15, 368) +
          C(5, 0, `<path d="M236 28l18 6-26 122" stroke="var(--d)" stroke-width="12" stroke-linecap="round" fill="none"/>`) +
          C(9, .25, `<path d="M116 140h168l-20 202q-4 18-24 18h-80q-20 0-24-18z" fill="#d9b084"/><path d="M120 148h160l-8 84c-36 16-108 16-144 0z" fill="#6d3a1d"/>
            <path d="M126 246c36 18 112 18 148 0l-10 92q-4 18-24 18h-80q-20 0-24-18z" fill="#fff4e4"/>`) +
          C(15, .55, `<g fill="#d8f2ff" stroke="#fff" stroke-width="3"><rect x="142" y="156" width="40" height="40" rx="10" transform="rotate(-12 142 156)"/><rect x="202" y="162" width="44" height="44" rx="10" transform="rotate(14 202 162)"/></g>
            <path d="M114 140c0-32 38-52 86-52s86 20 86 52z" fill="#ffffff" opacity=".45"/>`)),
        soltos: K.soltosPadrao(K.gelo(), K.grao(), K.gelo(), K.estrela())
      };
    },

    prensa() {
      return {
        principal: S(SM(128, 15, 368) +
          C(6, 0, `<path d="M264 156h30c20 0 32 14 32 38v76c0 24-12 38-32 38h-30" fill="none" stroke="#2c2420" stroke-width="18" stroke-linecap="round"/>
            <rect x="122" y="120" width="144" height="228" rx="22" fill="#e6eef5" opacity=".88"/><rect x="132" y="198" width="124" height="140" rx="14" fill="#4f2510"/>`) +
          C(12, .35, `<rect x="196" y="48" width="12" height="156" rx="6" fill="#c7d0d9"/><circle cx="202" cy="46" r="16" style="fill:var(--d)"/>
            <rect x="114" y="106" width="160" height="28" rx="14" style="fill:var(--p)"/><rect x="114" y="330" width="160" height="26" rx="13" style="fill:var(--p)"/>`) +
          C(16, .65, `<rect x="132" y="194" width="124" height="12" rx="6" style="fill:var(--d)"/>`)),
        soltos: soltosCafe()
      };
    },

    v60() {
      return {
        principal: S(SM(132, 15, 368) +
          C(6, 0, `<path d="M118 228h164l24 108q4 22-22 22H116q-26 0-22-22z" fill="#e8eff5"/><path d="M104 282h192l10 54q4 22-22 22H116q-26 0-22-22z" fill="#522310"/>`) +
          C(11, .35, `<polygon points="104,122 296,122 224,228 176,228" fill="#fffaf3"/><path d="M134 122h132l-48 76h-36z" fill="#f2e6d8"/><rect x="114" y="220" width="172" height="14" rx="7" style="fill:var(--p)"/>`) +
          C(16, .65, `<path d="M200 62v68" stroke="#6b341c" stroke-width="9" stroke-linecap="round"/><circle cx="200" cy="256" r="6" fill="#522310"/>` + VP([152, 248], 106))),
        soltos: soltosCafe()
      };
    },

    espresso() {
      return {
        principal: S(SM(142, 15, 366) +
          C(5, 0, `<ellipse cx="200" cy="322" rx="132" ry="22" fill="#e5d9cb"/>`) +
          C(10, .3, `<path d="M262 204h22c20 0 32 14 32 32s-12 32-32 32h-22" stroke="#fffaf3" stroke-width="15" fill="none"/><path d="M126 178h148v74c0 42-34 66-74 66s-74-24-74-66z" style="fill:var(--p)"/><ellipse cx="200" cy="178" rx="74" ry="18" fill="#3a180a"/><ellipse cx="200" cy="178" rx="64" ry="13" fill="#c7833d"/>`) +
          C(16, .6, `<g transform="translate(86 286) rotate(-20)"><ellipse rx="24" ry="16" fill="#4f2510"/></g><g transform="translate(304 282) rotate(22)"><ellipse rx="24" ry="16" fill="#5e2d14"/></g>` + VP([168, 200, 232], 140))),
        soltos: soltosCafe()
      };
    },

    brunch() {
      return {
        principal: S(SM(156, 16, 366) +
          C(5, 0, `<ellipse cx="200" cy="332" rx="152" ry="24" fill="#fff8f0"/>`) +
          C(9, .25, `<ellipse cx="200" cy="306" rx="116" ry="28" fill="#d98932"/><ellipse cx="200" cy="272" rx="116" ry="28" fill="#e59d42"/><ellipse cx="200" cy="238" rx="116" ry="28" fill="#f0b356"/>`) +
          C(14, .55, `<path d="M116 232c24-16 144-16 168 0-12 22-24 54-36 32s-26 38-40 12-26 34-40 8-26 24-38 2z" style="fill:var(--d)"/>
            <rect x="176" y="196" width="48" height="30" rx="8" fill="#fff2b2"/><circle cx="242" cy="196" r="18" fill="#e63946"/><circle cx="158" cy="202" r="14" fill="#3a2352"/>`)),
        soltos: K.soltosPadrao(K.morango(), K.grao(), K.estrela(), K.coracao('var(--p)'))
      };
    },

    croissantcafe() {
      return {
        principal: S(SM(164, 16, 366) +
          C(6, 0, `<g transform="translate(208 92)"><path d="M12 44h112l-14 176q-2 16-18 16H44q-16 0-18-16z" fill="#fff8f0"/><path d="M16 98h104l-6 78H22z" style="fill:var(--p)"/><rect x="4" y="28" width="128" height="22" rx="11" fill="#e9e1d6"/><circle cx="68" cy="136" r="18" style="fill:var(--d)"/></g>`) +
          C(13, .45, `<g transform="translate(40 218)"><path d="M12 92c18-56 66-82 114-82s96 26 114 82c-20 20-48 14-64 4-16 14-34 16-50 16s-34-2-50-16c-16 10-44 16-64-4z" fill="#eab04d"/><path d="M74 22c-10 26-10 62 6 84M178 22c10 26 10 62-6 84M126 12v96" stroke="#a65b17" stroke-width="5" stroke-linecap="round" opacity=".5" fill="none"/></g>`)),
        soltos: soltosCafe()
      };
    },

    matcha() {
      return {
        principal: S(SM(122, 15, 368) +
          C(5, 0, `<path d="M236 28l18 6-26 122" stroke="#2d6a4f" stroke-width="12" stroke-linecap="round" fill="none"/>`) +
          C(9, .25, `<path d="M116 140h168l-20 202q-4 18-24 18h-80q-20 0-24-18z" fill="#fff8ee"/><path d="M118 146h164l-10 108c-36 18-108 18-144 0z" fill="#69b55c"/>`) +
          C(15, .55, `<g fill="#d8f2ff" stroke="#fff" stroke-width="3"><rect x="142" y="156" width="40" height="40" rx="10" transform="rotate(-10 142 156)"/><rect x="204" y="160" width="42" height="42" rx="10" transform="rotate(14 204 160)"/></g>`)),
        soltos: K.soltosPadrao(K.folha('#52b788'), K.gelo(), K.folha('#74c69d'), K.estrela())
      };
    },

    cha() {
      return {
        principal: S(SM(156, 16, 366) +
          C(6, 0, `<path d="M104 204c-40 0-58-24-58-50M296 204h22c24 0 38 16 38 40s-14 40-38 40h-22" fill="none" style="stroke:var(--p)" stroke-width="18" stroke-linecap="round"/>
            <ellipse cx="200" cy="244" rx="104" ry="88" style="fill:var(--p)"/><ellipse cx="200" cy="158" rx="64" ry="18" style="fill:var(--d)"/><circle cx="200" cy="134" r="16" style="fill:var(--d)"/>`) +
          C(14, .45, `<path d="M148 242c18-16 34-16 52 0s34 16 52 0" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".35" fill="none"/>` + VP([166, 200, 234], 106))),
        soltos: K.soltosPadrao(K.folha('#52b788'), K.limao(), K.estrela(), K.coracao('var(--d)'))
      };
    },

    cookie() {
      const ck = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#d99648"/><g fill="#421c0c"><circle cx="-24" cy="-18" r="10"/><circle cx="22" cy="-22" r="9"/><circle cx="-12" cy="20" r="11"/><circle cx="26" cy="16" r="10"/><circle cx="4" cy="-2" r="8"/></g></g>`;
      return {
        principal: S(SM(154, 16, 366) +
          C(6, 0, ck(146, 252, 74)) +
          C(11, .35, ck(250, 246, 70)) +
          C(16, .65, ck(198, 164, 78))),
        soltos: soltosCafe()
      };
    }
  };

  window.CENAS_NOMES = {
    cafe: 'Cappuccino com latte art',
    iced: 'Iced Coffee gelado',
    prensa: 'Prensa francesa artesanal',
    v60: 'Café coado V60',
    espresso: 'Espresso duplo e grãos',
    brunch: 'Brunch de panquecas',
    croissantcafe: 'Croissant + latte',
    matcha: 'Matcha latte gelado',
    cha: 'Bule de chá artesanal',
    cookie: 'Cookies quentinhos'
  };
  window.CENAS_ICONES = {
    cafe: 'cat-cafe', iced: 'cat-refri', prensa: 'cat-cafe', v60: 'cat-cafe', espresso: 'cat-cafe',
    brunch: 'cat-pao', croissantcafe: 'cat-cafe', matcha: 'cat-refri', cha: 'cat-cafe', cookie: 'cat-doce'
  };
})();
