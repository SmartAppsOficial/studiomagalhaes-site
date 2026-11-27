/* 10 animações 3D exclusivas do ramo: Açaí e sorvetes */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra;
  const bananaSolta = `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="21" fill="#ffe799"/><circle cx="25" cy="25" r="16" fill="#fff4c7"/><circle cx="21" cy="23" r="1.8" fill="#c9a55c"/><circle cx="29" cy="23" r="1.8" fill="#c9a55c"/></svg>`;
  const bagaSolta = `<svg viewBox="0 0 50 50"><circle cx="18" cy="28" r="12" fill="#3a0d52"/><circle cx="32" cy="24" r="11" fill="#521773"/><circle cx="24" cy="14" r="10" fill="#6b238c"/></svg>`;
  const soltosAcai = () => K.soltosPadrao(bagaSolta, K.morango(), bananaSolta, K.estrela());

  window.CENAS = {
    acai() {
      const granola = [[142, 140], [166, 134], [228, 136], [248, 144], [198, 130]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="5.5" transform="rotate(${i * 29 - 20} ${x} ${y})" fill="${i % 2 ? '#d99a4e' : '#b87630'}"/>`).join('');
      return {
        principal: S(SM(116, 15, 370) +
          C(4, 0, `<g transform="rotate(18 248 92)"><rect x="242" y="24" width="16" height="148" rx="8" style="fill:var(--d)"/><ellipse cx="250" cy="26" rx="16" ry="10" style="fill:var(--d)"/></g>`) +
          C(8, .25, `<path d="M108 158h184l-24 188q-3 18-22 18h-92q-19 0-22-18z" fill="#471261"/><path d="M115 210c28 16 58-10 85 4s54-12 85 2l-4 32c-30-10-56 12-84 0s-54 12-86-4z" fill="#fff7e6" opacity=".92"/><path d="M122 276c26 14 54-8 78 4s50-10 78 2l-4 24c-26-8-50 10-76 0s-48 8-80-4z" style="fill:var(--p)" opacity=".7"/><rect x="102" y="146" width="196" height="22" rx="11" fill="#ffffff" opacity=".24"/>`) +
          C(12, .45, `<path d="M110 156c0-42 38-70 90-70s90 28 90 70q0 10-12 10H122q-12 0-12-10z" fill="#5e1b7d"/>${granola}
            <circle cx="144" cy="122" r="16" fill="#ffe799"/><circle cx="248" cy="122" r="15" fill="#ffe799"/>`) +
          C(16, .7, `<g transform="translate(174 58)"><path d="M26 10c14 0 22 14 18 30s-14 24-18 24-14-8-18-24 4-30 18-30z" fill="#e63946"/><path d="M14 12l12-12 12 12-8 3-4-5-4 5z" fill="#4aa146"/></g>`)),
        soltos: soltosAcai()
      };
    },

    sorvete() {
      return {
        principal: S(SM(92, 12, 374) +
          C(5, 0, `<g transform="rotate(24 252 106)"><rect x="236" y="42" width="32" height="128" rx="6" fill="#d99a4e"/></g>`) +
          C(8, .25, `<path d="M132 214h136l-58 148q-10 18-20 0z" fill="#eab368"/><g stroke="#b6782f" stroke-opacity=".42" stroke-width="3"><path d="M148 232l72 72M164 214l78 78M252 232l-72 72M236 214l-78 78"/></g>`) +
          C(12, .45, `<circle cx="156" cy="184" r="50" style="fill:var(--p)"/><circle cx="244" cy="184" r="50" style="fill:var(--d)"/>`) +
          C(16, .65, `<circle cx="200" cy="134" r="54" fill="#fff5e6"/><path d="M150 124c10-28 42-44 74-36 16 4 28 16 32 32-12 6-18-4-26 10s-16 14-24 0-16 16-24 2-18 6-32-8z" fill="#5a2417"/><circle cx="200" cy="76" r="18" fill="#e63946"/>`)),
        soltos: soltosAcai()
      };
    },

    tigela() {
      return {
        principal: S(SM(160, 16, 366) +
          C(6, 0, `<path d="M56 200h288c-12 96-62 146-144 146S68 296 56 200z" fill="#fff8f0"/><path d="M68 242h264l-10 34H78z" style="fill:var(--p)"/>`) +
          C(11, .35, `<ellipse cx="200" cy="198" rx="136" ry="38" fill="#4f146b"/><ellipse cx="200" cy="192" rx="122" ry="30" fill="#68208a"/>`) +
          C(16, .65, `<circle cx="132" cy="182" r="20" fill="#ffe799"/><circle cx="164" cy="176" r="20" fill="#ffe799"/>
            <circle cx="222" cy="176" r="22" fill="#e63946"/><circle cx="264" cy="186" r="20" fill="#8bc34a"/>
            <path d="M124 206c28-10 124-10 152 0" stroke="#fff7e2" stroke-width="10" stroke-linecap="round" fill="none"/>`)),
        soltos: soltosAcai()
      };
    },

    barca() {
      return {
        principal: S(SM(168, 16, 366) +
          C(6, 0, `<path d="M28 214h344l-42 98q-12 24-40 24H110q-28 0-40-24z" fill="#fffaf4"/><path d="M36 214h328l-14 26H50z" style="fill:var(--p)"/>`) +
          C(11, .35, `<ellipse cx="200" cy="204" rx="146" ry="34" fill="#521670"/>`) +
          C(16, .65, `<circle cx="104" cy="192" r="22" fill="#e63946"/><circle cx="152" cy="188" r="22" fill="#ffe799"/>
            <circle cx="200" cy="182" r="26" fill="#fff5e6"/><circle cx="248" cy="188" r="22" fill="#d99a4e"/><circle cx="294" cy="194" r="20" fill="#8bc34a"/>`)),
        soltos: soltosAcai()
      };
    },

    sundae() {
      return {
        principal: S(SM(118, 14, 368) +
          C(5, 0, `<path d="M148 344h104l-14-18h-76zM186 286h28v44h-28z" fill="#dce8f2"/><path d="M104 166h192l-30 112q-8 22-32 22h-68q-24 0-32-22z" fill="#e8f3fc"/>`) +
          C(10, .35, `<circle cx="164" cy="156" r="44" fill="#fff6e8"/><circle cx="236" cy="156" r="44" style="fill:var(--d)"/><circle cx="200" cy="112" r="48" style="fill:var(--p)"/>`) +
          C(16, .65, `<path d="M158 106c14-26 70-26 84 0-14 14-20-6-32 16s-22-12-30 14-16-14-22-30z" fill="#522114"/><circle cx="200" cy="64" r="16" fill="#e63946"/>`)),
        soltos: soltosAcai()
      };
    },

    picole() {
      return {
        principal: S(SM(122, 14, 370) +
          C(6, 0, `<g transform="rotate(-14 200 200)"><rect x="184" y="256" width="32" height="106" rx="16" fill="#e5b16c"/><rect x="124" y="64" width="152" height="206" rx="76" style="fill:var(--p)"/></g>`) +
          C(13, .4, `<g transform="rotate(-14 200 200)"><path d="M124 138c0-42 34-74 76-74s76 32 76 74v26c-16 14-24-8-38 14s-26-8-38 12-26-10-38 8-26-6-38-18z" fill="#4b1d12"/>
            <rect x="152" y="106" width="14" height="5" rx="2.5" fill="#fff" transform="rotate(-24 152 106)"/><rect x="214" y="96" width="14" height="5" rx="2.5" style="fill:var(--d)" transform="rotate(20 214 96)"/></g>`)),
        soltos: soltosAcai()
      };
    },

    shake() {
      return {
        principal: S(SM(122, 14, 368) +
          C(5, 0, `<path d="M236 28l18 6-24 114" stroke="var(--d)" stroke-width="12" stroke-linecap="round" fill="none"/>`) +
          C(9, .25, `<path d="M114 150h172l-22 192q-4 18-24 18h-80q-20 0-24-18z" style="fill:var(--p)"/><path d="M120 206c28 16 54-12 80 4s54-12 80 2l-4 36c-28-10-52 12-76 0s-50 10-82-4z" fill="#fff7ee" opacity=".88"/>`) +
          C(15, .6, `<path d="M114 150c0-44 38-74 86-74s86 30 86 74z" fill="#fff8f2"/><circle cx="200" cy="68" r="20" fill="#e63946"/>`)),
        soltos: soltosAcai()
      };
    },

    casadinho() {
      return {
        principal: S(SM(128, 15, 368) +
          C(7, 0, `<path d="M108 148h184l-24 196q-4 18-22 18h-92q-18 0-22-18z" fill="#4c1469"/>
            <path d="M200 148h92l-24 196q-4 18-22 18h-46z" fill="#f7ebd2"/>
            <rect x="102" y="136" width="196" height="22" rx="11" fill="#ffffff" opacity=".28"/>`) +
          C(13, .4, `<path d="M112 146c0-40 38-64 88-64v64z" fill="#68208a"/><path d="M200 82c50 0 88 24 88 64h-88z" fill="#fff6e0"/>`) +
          C(17, .65, `<circle cx="164" cy="96" r="18" fill="#e63946"/><circle cx="236" cy="96" r="18" fill="#ffe799"/>`)),
        soltos: soltosAcai()
      };
    },

    gelato() {
      return {
        principal: S(SM(146, 16, 368) +
          C(6, 0, `<path d="M84 188h232l-26 154q-4 18-24 18H134q-20 0-24-18z" style="fill:var(--p)"/><rect x="74" y="176" width="252" height="22" rx="11" style="fill:var(--d)"/>
            <rect x="116" y="246" width="168" height="58" rx="14" fill="#fff8f0"/>`) +
          C(13, .4, `<circle cx="148" cy="162" r="46" fill="#fff5e6"/><circle cx="252" cy="162" r="46" fill="#f29eb6"/><circle cx="200" cy="126" r="52" fill="#8fd694"/>`) +
          C(17, .65, `<path d="M214 78c18-16 40-10 46 8-18 12-38 8-46-8z" fill="#46962e"/>`)),
        soltos: soltosAcai()
      };
    },

    split() {
      return {
        principal: S(SM(164, 16, 366) +
          C(5, 0, `<ellipse cx="200" cy="316" rx="164" ry="30" fill="#fff8f0"/>`) +
          C(9, .25, `<path d="M44 268c54 46 258 46 312 0-34-18-72-24-156-24s-122 6-156 24z" fill="#ffe066"/>`) +
          C(14, .5, `<circle cx="122" cy="212" r="48" fill="#fff5e6"/><circle cx="200" cy="196" r="52" fill="#f29eb6"/><circle cx="278" cy="212" r="48" fill="#6b3220"/>`) +
          C(17, .7, `<circle cx="122" cy="156" r="14" fill="#e63946"/><circle cx="200" cy="138" r="16" fill="#e63946"/><circle cx="278" cy="156" r="14" fill="#e63946"/>`)),
        soltos: soltosAcai()
      };
    }
  };

  window.CENAS_NOMES = {
    acai: 'Copo de açaí montado',
    sorvete: 'Casquinha de sorvete',
    tigela: 'Tigela de açaí com frutas',
    barca: 'Barca de açaí completa',
    sundae: 'Taça sundae com calda',
    picole: 'Picolé artesanal recheado',
    shake: 'Milkshake com chantilly',
    casadinho: 'Açaí + cupuaçu casadinho',
    gelato: 'Pote de gelato artesanal',
    split: 'Banana split clássica'
  };
  window.CENAS_ICONES = {
    acai: 'cat-sorvete', sorvete: 'cat-sorvete', tigela: 'cat-sorvete', barca: 'cat-sorvete', sundae: 'cat-doce',
    picole: 'cat-sorvete', shake: 'cat-refri', casadinho: 'cat-sorvete', gelato: 'cat-sorvete', split: 'cat-doce'
  };
})();
