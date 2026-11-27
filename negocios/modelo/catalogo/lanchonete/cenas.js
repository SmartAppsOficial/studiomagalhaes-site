/* 10 animações 3D exclusivas do ramo: Hamburgueria e lanchonete */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra, VP = K.vapor;
  const fritaSolta = `<svg viewBox="0 0 20 60"><rect x="3" y="2" width="14" height="56" rx="3" fill="#f7c948"/><rect x="3" y="2" width="5" height="56" rx="2" fill="#e9aa2c"/></svg>`;
  const queijoSolto = `<svg viewBox="0 0 50 50"><path d="M4 8h42v26l-6 10-6-10-6 12-6-12-6 10-6-10-6 8z" fill="#f8c22c"/></svg>`;
  const soltosLanche = () => K.soltosPadrao(fritaSolta, K.gelo(), K.tomate(), queijoSolto);

  window.CENAS = {
    lanche() {
      const gergelim = [[150, 150, -20], [178, 136, 10], [206, 132, -8], [234, 140, 25], [258, 156, -30], [164, 170, -5], [226, 166, -15]]
        .map(([x, y, a]) => `<ellipse cx="${x}" cy="${y}" rx="5.5" ry="3" transform="rotate(${a} ${x} ${y})" fill="#fff4dc"/>`).join('');
      const batatas = [[58, 196, -14], [74, 182, -6], [90, 176, 2], [106, 180, 8], [122, 190, 14], [82, 206, -2], [114, 202, 10]]
        .map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y + 60})"><rect x="${x - 7}" y="${y}" width="14" height="110" rx="3" fill="#f7c948"/><rect x="${x - 7}" y="${y}" width="5" height="110" rx="2" fill="#e9aa2c" opacity=".7"/></g>`).join('');
      return {
        principal: S(SM(170, 16, 372) +
          C(3, 0, `<g transform="translate(22 -14)"><path d="M300 24l12 4-12 92" stroke="#fff" stroke-width="11" stroke-linecap="round" fill="none"/><path d="M300 24l12 4-12 92" stroke="var(--d)" stroke-width="11" stroke-dasharray="9 13" stroke-linecap="round" fill="none"/><path d="M258 118h116l-16 226q-2 12-14 12h-56q-12 0-14-12z" fill="#fbf8f3"/><path d="M262 168h108l-6 96H268z" style="fill:var(--p)"/><circle cx="316" cy="216" r="19" style="fill:var(--d)"/><rect x="250" y="102" width="132" height="24" rx="11" fill="#e9e3da"/></g>`) +
          C(6, .2, `<path d="M84 306h232v18q0 26-26 26H110q-26 0-26-26z" fill="url(#ln-pao)"/><path d="M76 268q0-14 14-14h220q14 0 14 14v20q0 18-18 18H94q-18 0-18-18z" fill="url(#ln-carne)"/>`) +
          C(9, .45, `<path d="M70 252h260l-12 14-10 22-12-20-16 26-14-28-18 20-14-22-18 30-14-30-16 22-14-24-16 26-12-26-16 20-12-22-12 14z" fill="#f8c22c"/><rect x="88" y="234" width="224" height="22" rx="11" fill="#e2452c"/><path d="M66 240c8-18 22 2 34-10s22 12 34-2 22 10 34-4 22 12 34-2 22 10 34-4 22 12 34-2 22 10 34 0l2 20H64z" fill="#6cc43f"/>`) +
          C(13, .7, `<path d="M74 232c0-70 56-112 126-112s126 42 126 112q0 8-8 8H82q-8 0-8-8z" fill="url(#ln-pao)"/>${gergelim}`) +
          C(17, .3, `${batatas}<path d="M34 262h132l-14 112q-2 10-12 10H60q-10 0-12-10z" style="fill:var(--p)"/><circle cx="100" cy="330" r="18" style="fill:var(--d)"/>`),
          `<linearGradient id="ln-pao" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6b45a"/><stop offset="1" stop-color="#d4822f"/></linearGradient><linearGradient id="ln-carne" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6d3a1d"/><stop offset="1" stop-color="#43200d"/></linearGradient>`),
        soltos: soltosLanche()
      };
    },

    smash() {
      return {
        principal: S(SM(156, 16, 368) +
          C(5, 0, `<rect x="82" y="302" width="236" height="44" rx="22" fill="#e59c44"/>`) +
          C(8, .2, `<rect x="64" y="266" width="272" height="36" rx="14" fill="#4f2510"/><path d="M60 256h280l-22 36-34-26-34 34-34-28-34 34-34-26-34 30z" fill="#f8c22c"/>`) +
          C(11, .4, `<rect x="68" y="216" width="264" height="36" rx="14" fill="#5e2d14"/><path d="M64 206h272l-26 34-34-22-36 32-36-24-36 30-34-22z" fill="#ffad26"/>
            <rect x="92" y="188" width="216" height="18" rx="9" fill="#9c2c1a"/>`) +
          C(15, .65, `<path d="M78 190c0-66 54-106 122-106s122 40 122 106z" fill="#f4b258"/><path d="M114 126c22-20 52-28 84-26" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".28" fill="none"/>`)),
        soltos: soltosLanche()
      };
    },

    batata() {
      const fries = [[116, 108, -14], [142, 86, -8], [168, 76, -3], [194, 72, 2], [220, 78, 7], [246, 88, 12], [272, 106, 18], [154, 114, -5], [208, 108, 5], [234, 116, 10]]
        .map(([x, y, a]) => `<g transform="rotate(${a} ${x} 240)"><rect x="${x - 10}" y="${y}" width="20" height="148" rx="5" fill="#f7c948"/><rect x="${x - 10}" y="${y}" width="7" height="148" rx="3" fill="#e59e24" opacity=".65"/></g>`).join('');
      return {
        principal: S(SM(146, 16, 368) +
          C(7, 0, fries) +
          C(13, .35, `<path d="M96 198h208l-22 152q-4 16-22 16H140q-18 0-22-16z" style="fill:var(--p)"/>
            <path d="M96 198h208c-18 26-44 38-104 38s-86-12-104-38z" fill="#000" opacity=".16"/>
            <circle cx="200" cy="290" r="28" style="fill:var(--d)"/>`) +
          C(17, .65, `<g transform="translate(254 294)"><ellipse cx="46" cy="46" rx="44" ry="18" fill="#fff"/><path d="M12 42c10-22 58-22 68 0z" fill="#d92b2b"/></g>`)),
        soltos: K.soltosPadrao(fritaSolta, queijoSolto, fritaSolta, K.estrela())
      };
    },

    hotdog() {
      return {
        principal: S(SM(164, 16, 368) +
          C(6, 0, `<g transform="rotate(-14 200 220)"><rect x="44" y="168" width="312" height="106" rx="52" fill="#e8a146"/></g>`) +
          C(11, .35, `<g transform="rotate(-14 200 220)"><rect x="26" y="182" width="348" height="58" rx="29" fill="#c7432a"/><rect x="52" y="190" width="296" height="12" rx="6" fill="#e56c52" opacity=".45"/></g>`) +
          C(16, .65, `<g transform="rotate(-14 200 220)">
            <path d="M58 212c16-20 32 20 48 0s32 20 48 0 32 20 48 0 32 20 48 0 32 20 48 0" stroke="#f8c22c" stroke-width="11" stroke-linecap="round" fill="none"/>
            <path d="M74 224c16-14 32 14 48 0s32 14 48 0 32 14 48 0 32 14 48 0" stroke="#fff6e0" stroke-width="6" stroke-linecap="round" fill="none" opacity=".85"/>
          </g>`)),
        soltos: soltosLanche()
      };
    },

    frango() {
      return {
        principal: S(SM(154, 16, 368) +
          C(6, 0, `<g fill="#c97724">
            <ellipse cx="144" cy="148" rx="46" ry="38" transform="rotate(-20 144 148)"/>
            <ellipse cx="204" cy="128" rx="50" ry="40"/>
            <ellipse cx="260" cy="152" rx="44" ry="36" transform="rotate(18 260 152)"/>
          </g>
          <g fill="#e69a3a"><circle cx="136" cy="140" r="14"/><circle cx="204" cy="122" r="16"/><circle cx="256" cy="146" r="14"/></g>`) +
          C(12, .35, `<path d="M92 174h216l-24 174q-4 18-24 18H140q-20 0-24-18z" fill="#fff9f0"/>
            <path d="M100 174h200l-16 112H116z" style="fill:var(--p)"/>
            <rect x="84" y="162" width="232" height="22" rx="11" style="fill:var(--d)"/>
            <circle cx="200" cy="236" r="30" style="fill:var(--d)"/>`) +
          C(16, .65, VP([152, 200, 248], 84))),
        soltos: soltosLanche()
      };
    },

    familia() {
      const mini = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="10" y="72" width="100" height="20" rx="10" fill="#e59c44"/><rect x="6" y="54" width="108" height="20" rx="9" fill="#562811"/><path d="M4 52h112l-14 14-18-10-18 14-18-12-18 14-16-14z" fill="#f8c22c"/><path d="M8 50c0-34 26-50 52-50s52 16 52 50z" fill="#f4b258"/></g>`;
      return {
        principal: S(SM(168, 16, 368) +
          C(5, 0, `<rect x="44" y="308" width="312" height="36" rx="18" style="fill:var(--p)"/>`) +
          C(9, .25, mini(46, 206, 1.05) + mini(230, 206, 1.05)) +
          C(14, .5, mini(122, 166, 1.3)) +
          C(17, .7, `<rect x="128" y="64" width="144" height="44" rx="22" style="fill:var(--d)"/><circle cx="158" cy="86" r="10" style="fill:var(--p)"/><circle cx="200" cy="86" r="10" style="fill:var(--p)"/><circle cx="242" cy="86" r="10" style="fill:var(--p)"/>`)),
        soltos: soltosLanche()
      };
    },

    shake() {
      return {
        principal: S(SM(154, 16, 368) +
          C(5, 0, `<g transform="translate(206 44)"><path d="M60 0l12 4-16 112" stroke="var(--d)" stroke-width="11" stroke-linecap="round" fill="none"/>
            <path d="M18 124h108l-18 190q-2 14-16 14H52q-14 0-16-14z" fill="#6b341e"/>
            <path d="M22 148c18 14 36-8 54 6s34-8 48 2l-4 34c-18-8-34 8-52 0s-32 8-48-4z" fill="#3f1a0c"/>
            <path d="M20 124c0-34 24-54 52-54s52 20 52 54z" fill="#fff7ee"/>
            <circle cx="72" cy="64" r="14" fill="#e63946"/></g>`) +
          C(12, .4, `<g transform="translate(46 178)">
            <rect x="12" y="120" width="184" height="30" rx="15" fill="#e59c44"/><rect x="6" y="92" width="196" height="30" rx="12" fill="#562811"/>
            <path d="M4 88h200l-18 22-26-14-26 22-26-16-26 22-26-16-26 18z" fill="#f8c22c"/>
            <path d="M10 86c0-54 44-82 94-82s94 28 94 82z" fill="#f4b258"/>
          </g>`)),
        soltos: K.soltosPadrao(fritaSolta, K.morango(), K.gelo(), K.estrela())
      };
    },

    onion() {
      const ring = (x, y, rx, ry) => `<g transform="translate(${x} ${y})"><ellipse rx="${rx}" ry="${ry}" fill="#d68324"/><ellipse rx="${rx - 18}" ry="${ry - 12}" fill="#1e130e" opacity=".45"/><ellipse rx="${rx - 6}" ry="${ry - 4}" fill="none" stroke="#f6c45a" stroke-width="5" opacity=".7"/></g>`;
      return {
        principal: S(SM(156, 16, 368) +
          C(6, 0, ring(194, 286, 114, 44)) +
          C(10, .25, ring(206, 232, 102, 40)) +
          C(14, .5, ring(190, 178, 90, 36)) +
          C(17, .7, `<g transform="translate(252 284)"><ellipse cx="44" cy="44" rx="44" ry="20" fill="#fff"/><path d="M10 40c10-20 58-20 68 0z" style="fill:var(--p)"/></g>`)),
        soltos: soltosLanche()
      };
    },

    chapa() {
      return {
        principal: S(SM(164, 16, 368) +
          C(5, 0, `<rect x="44" y="294" width="312" height="36" rx="18" fill="#2c2623"/><rect x="64" y="286" width="272" height="14" rx="7" fill="#443c38"/>`) +
          C(10, .3, `<path d="M74 282h252l-18 18H92z" fill="#e59c44"/><rect x="86" y="246" width="228" height="32" rx="14" fill="#5e2d14"/>
            <path d="M80 236h240l-20 26-26-16-28 24-28-18-28 24-26-16-26 20z" fill="#f8c22c"/><rect x="92" y="218" width="216" height="18" rx="9" fill="#6cc43f"/>`) +
          C(15, .6, `<path d="M78 218l24-86q6-20 28-20h140q22 0 28 20l24 86z" fill="#f4b258"/>
            <path d="M126 140l18 52M194 134l12 58M264 140l-14 52" stroke="#9e5516" stroke-width="6" stroke-linecap="round" opacity=".45"/>` + VP([154, 200, 246], 94))),
        soltos: soltosLanche()
      };
    },

    xtudo() {
      return {
        principal: S(SM(162, 16, 368) +
          C(4, 0, `<rect x="86" y="318" width="228" height="34" rx="17" fill="#e59c44"/>`) +
          C(7, .2, `<rect x="74" y="286" width="252" height="32" rx="14" fill="#562811"/><path d="M70 274h260l-22 24-30-16-30 22-30-16-30 22-30-16-28 20z" fill="#f8c22c"/>`) +
          C(10, .4, `<rect x="76" y="240" width="248" height="32" rx="14" fill="#6d3518"/><rect x="88" y="222" width="224" height="18" rx="9" fill="#a83222"/>
            <ellipse cx="200" cy="212" rx="88" ry="18" fill="#fffdf7"/><circle cx="200" cy="208" r="16" fill="#f5b82e"/>`) +
          C(14, .6, `<rect x="88" y="186" width="224" height="18" rx="9" fill="#e2452c"/><path d="M68 188c14-14 28 8 42-4s28 10 42-4 28 10 42-4 28 10 42-4 28 10 42-4 28 8 42 0v16H68z" fill="#6cc43f"/>`) +
          C(18, .8, `<path d="M80 176c0-58 54-92 120-92s120 34 120 92z" fill="#f4b258"/><rect x="194" y="34" width="12" height="58" rx="6" fill="#d8a25e"/><circle cx="200" cy="36" r="14" style="fill:var(--p)"/>`)),
        soltos: soltosLanche()
      };
    }
  };

  window.CENAS_NOMES = {
    lanche: 'Hambúrguer, refri e batata',
    smash: 'Smash duplo derretendo',
    batata: 'Balde de batata frita',
    hotdog: 'Hot dog prensado completo',
    frango: 'Balde de frango crocante',
    familia: 'Combo família de burgers',
    shake: 'Burger + milkshake',
    onion: 'Torre de anéis de cebola',
    chapa: 'Sanduíche na chapa',
    xtudo: 'X-Tudo gigante em camadas'
  };
  window.CENAS_ICONES = {
    lanche: 'cat-burger', smash: 'cat-burger', batata: 'cat-fritas', hotdog: 'cat-hotdog', frango: 'cat-frango',
    familia: 'cat-combo', shake: 'cat-refri', onion: 'cat-fritas', chapa: 'cat-burger', xtudo: 'cat-burger'
  };
})();
