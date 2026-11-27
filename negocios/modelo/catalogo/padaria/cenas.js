/* 10 animações 3D exclusivas do ramo: Padaria */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra, VP = K.vapor;
  const trigoSolto = `<svg viewBox="0 0 50 50"><path d="M25 6c5 6 7 14 0 22-7-8-5-16 0-22zM25 28v16M13 18c6 3 10 8 12 14M37 18c-6 3-10 8-12 14" stroke="var(--d)" stroke-width="3.5" stroke-linecap="round" fill="none"/></svg>`;
  const croisSolto = `<svg viewBox="0 0 60 40"><path d="M6 30c8-18 20-24 24-24s16 6 24 24c-8 6-16 4-24 0-8 4-16 6-24 0z" fill="#f2b857"/></svg>`;
  const soltosPao = () => K.soltosPadrao(trigoSolto, croisSolto, K.grao(), K.estrela());

  window.CENAS = {
    pao() {
      return {
        principal: S(SM(164, 16, 364) +
          C(4, 0, `<rect x="46" y="294" width="308" height="44" rx="22" fill="#9c6131"/>`) +
          C(8, .2, `<g transform="translate(232 104)"><path d="M88 60h18a22 22 0 0 1 0 44H86" stroke="#fff8ee" stroke-width="11" fill="none"/><path d="M8 46h86v58q0 34-34 34H42q-34 0-34-34z" fill="#fff8ee"/><path d="M12 72h78v28H12z" style="fill:var(--p)" opacity=".9"/><ellipse cx="51" cy="46" rx="43" ry="11" fill="#5b2e14"/></g>`) +
          C(12, .45, `<ellipse cx="164" cy="242" rx="112" ry="74" fill="#d98932"/><g stroke="#fff3db" stroke-width="6" stroke-linecap="round" opacity=".82"><path d="M108 192l26 32M152 184l26 36M196 192l24 32"/></g>`) +
          C(16, .65, `<g transform="translate(174 238)"><path d="M12 64c12-38 48-56 84-56s72 18 84 56c-14 14-34 10-46 2-12 10-26 12-38 12s-26-2-38-12c-12 8-32 12-46-2z" fill="#f2b857"/><path d="M56 16c-6 18-6 42 4 58M136 16c6 18 6 42-4 58M96 8v68" stroke="#9e5516" stroke-width="4" stroke-linecap="round" opacity=".48" fill="none"/></g>`)),
        soltos: soltosPao()
      };
    },

    frances() {
      const pf = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="62" ry="34" fill="#e59d3d"/><path d="M-36-4c22-12 50-12 72 0" stroke="#fff3db" stroke-width="6" stroke-linecap="round" fill="none"/></g>`;
      return {
        principal: S(SM(160, 16, 366) +
          C(6, 0, pf(134, 174, -22) + pf(262, 172, 20) + pf(200, 146, 0)) +
          C(12, .35, `<path d="M52 204h296l-30 132q-6 20-28 20H110q-22 0-28-20z" fill="#b97837"/><rect x="42" y="192" width="316" height="24" rx="12" fill="#d99a52"/>
            <path d="M74 248h252M82 290h236" stroke="#8b5520" stroke-width="6" opacity=".45"/>`) +
          C(16, .65, VP([152, 200, 248], 84))),
        soltos: soltosPao()
      };
    },

    cesta() {
      return {
        principal: S(SM(162, 16, 368) +
          C(5, 0, `<path d="M96 204c0-94 46-138 104-138s104 44 104 138" fill="none" stroke="#a6682c" stroke-width="16" stroke-linecap="round"/>`) +
          C(9, .25, `<ellipse cx="144" cy="190" rx="48" ry="32" fill="#e59d3d"/><rect x="200" y="142" width="54" height="68" rx="14" fill="#e63946"/><circle cx="272" cy="186" r="24" fill="#f6c94e"/>`) +
          C(14, .5, `<path d="M56 206h288l-28 134q-6 18-26 18H110q-20 0-26-18z" fill="#c48543"/><rect x="46" y="194" width="308" height="24" rx="12" style="fill:var(--p)"/>
            <rect x="176" y="194" width="48" height="164" style="fill:var(--d)"/>`)),
        soltos: K.soltosPadrao(trigoSolto, K.coracao('var(--p)'), croisSolto, K.estrela())
      };
    },

    paoqueijo() {
      const pq = (x, y, r = 34) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#f0b954"/><circle cx="-8" cy="-8" r="${r * .45}" fill="#ffe19c" opacity=".6"/><path d="M-12 6c8-8 18-6 24 0" stroke="#b97822" stroke-width="3" fill="none" opacity=".5"/></g>`;
      return {
        principal: S(SM(154, 16, 366) +
          C(6, 0, pq(140, 174, 36) + pq(258, 176, 36) + pq(200, 146, 38) + pq(174, 198, 34) + pq(228, 198, 34)) +
          C(12, .35, `<path d="M72 206h256l-26 132q-6 18-26 18H124q-20 0-26-18z" fill="#fff7ee"/><path d="M84 246h232l-10 46H94z" style="fill:var(--p)"/>`) +
          C(16, .65, VP([152, 200, 248], 84))),
        soltos: soltosPao()
      };
    },

    croissant() {
      return {
        principal: S(SM(158, 16, 364) +
          C(8, .2, `<path d="M44 274c24-112 88-156 156-156s132 44 156 156c-28 28-64 20-86 4-22 20-48 24-70 24s-48-4-70-24c-22 16-58 24-86-4z" fill="#eab04d"/>`) +
          C(14, .5, `<path d="M126 134c-14 40-14 96 8 134M274 134c14 40 14 96-8 134M200 118v162" stroke="#a65b17" stroke-width="8" stroke-linecap="round" opacity=".55" fill="none"/>
            <path d="M138 164c34-20 90-20 124 0" stroke="#fff2d6" stroke-width="8" stroke-linecap="round" opacity=".38" fill="none"/>` + VP([152, 200, 248], 86))),
        soltos: soltosPao()
      };
    },

    bolocaseiro() {
      return {
        principal: S(SM(156, 16, 368) +
          C(5, 0, `<ellipse cx="200" cy="332" rx="146" ry="22" fill="#e8dfd2"/>`) +
          C(10, .3, `<path d="M78 214c0-56 54-92 122-92s122 36 122 92v84q0 22-122 22T78 298z" fill="#e5a648"/>
            <ellipse cx="200" cy="182" rx="44" ry="20" fill="#7c471b" opacity=".5"/>`) +
          C(15, .6, `<path d="M104 166c24-30 168-30 192 0 6 12-10 20-18 6s-18 28-28 6-20 26-32 4-22 26-34 4-22 28-34 4-22 22-30 4-22-12-16-28z" fill="#fff7ea"/>
            <path d="M150 156c24-12 76-12 100 0" stroke="var(--d)" stroke-width="6" stroke-linecap="round" fill="none"/>`)),
        soltos: soltosPao()
      };
    },

    frios() {
      return {
        principal: S(SM(164, 16, 368) +
          C(5, 0, `<rect x="44" y="136" width="312" height="202" rx="34" fill="#9c6131"/><rect x="60" y="150" width="280" height="174" rx="24" fill="#b9783e"/>`) +
          C(10, .35, `<path d="M88 266l74-96 74 96z" fill="#f7c948"/><circle cx="150" cy="232" r="10" fill="#d99a1e"/><circle cx="182" cy="244" r="8" fill="#d99a1e"/>`) +
          C(15, .6, `<g fill="#f28c99"><ellipse cx="264" cy="206" rx="44" ry="24"/><ellipse cx="274" cy="236" rx="44" ry="24" fill="#e57383"/><ellipse cx="256" cy="264" rx="44" ry="24"/></g>
            <circle cx="116" cy="286" r="14" fill="#5e3a73"/><circle cx="138" cy="296" r="14" fill="#5e3a73"/><circle cx="128" cy="272" r="14" fill="#7c4d96"/>`)),
        soltos: soltosPao()
      };
    },

    salgados() {
      const cox = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0-54c24 34 44 64 44 86a44 44 0 0 1-88 0c0-22 20-52 44-86z" fill="#df9132"/><path d="M-12-10c-8 18-8 38 0 50" stroke="#ffe19c" stroke-width="6" stroke-linecap="round" opacity=".5" fill="none"/></g>`;
      return {
        principal: S(SM(158, 16, 368) +
          C(5, 0, `<ellipse cx="200" cy="330" rx="152" ry="24" fill="#fff8f0"/>`) +
          C(10, .3, cox(134, 232, -16) + cox(266, 232, 16)) +
          C(16, .6, cox(200, 198, 0) + VP([152, 200, 248], 84))),
        soltos: soltosPao()
      };
    },

    baguete() {
      return {
        principal: S(SM(164, 16, 366) +
          C(8, .2, `<g transform="rotate(-24 200 216)"><rect x="28" y="168" width="344" height="86" rx="43" fill="#df9132"/>
            <g stroke="#fff3db" stroke-width="8" stroke-linecap="round" opacity=".82"><path d="M88 186l34 46M156 184l34 48M224 184l34 48M292 186l28 44"/></g></g>`) +
          C(15, .6, `<g transform="translate(248 252) rotate(14)"><path d="M0 44c14-14 26-34 38-52M18 52c14-14 26-34 38-52" stroke="var(--d)" stroke-width="6" stroke-linecap="round"/></g>`)),
        soltos: soltosPao()
      };
    },

    chapa() {
      return {
        principal: S(SM(156, 16, 366) +
          C(6, 0, `<g transform="translate(220 116)"><path d="M74 44h18a20 20 0 0 1 0 40H74" stroke="#fff8ee" stroke-width="11" fill="none"/><path d="M8 34h72v54q0 28-28 28H36q-28 0-28-28z" fill="#fff8ee"/><path d="M12 58h64v24H12z" style="fill:var(--p)"/><ellipse cx="44" cy="34" rx="36" ry="10" fill="#5b2e14"/></g>`) +
          C(12, .35, `<rect x="58" y="218" width="218" height="118" rx="40" fill="#e59d3d"/><rect x="76" y="236" width="182" height="82" rx="28" fill="#fff4d6"/>
            <path d="M106 254c38 14 84 14 122 0M112 288c34-10 74-10 108 0" stroke="#f6c94e" stroke-width="14" stroke-linecap="round" fill="none"/>`) +
          C(16, .65, VP([132, 174, 260], 98))),
        soltos: soltosPao()
      };
    }
  };

  window.CENAS_NOMES = {
    pao: 'Pão artesanal e café',
    frances: 'Cesta de pães franceses',
    cesta: 'Cesta de café da manhã',
    paoqueijo: 'Cestinha de pão de queijo',
    croissant: 'Croissant folhado dourado',
    bolocaseiro: 'Bolo caseiro de furo',
    frios: 'Tábua de frios e queijos',
    salgados: 'Salgados quentinhos',
    baguete: 'Baguete rústica e trigo',
    chapa: 'Pão na chapa com café'
  };
  window.CENAS_ICONES = {
    pao: 'cat-pao', frances: 'cat-pao', cesta: 'cat-presente', paoqueijo: 'cat-pao', croissant: 'cat-pao',
    bolocaseiro: 'cat-bolo', frios: 'cat-pao', salgados: 'cat-combo', baguete: 'cat-pao', chapa: 'cat-cafe'
  };
})();
