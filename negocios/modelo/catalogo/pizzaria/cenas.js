/* 10 animações 3D exclusivas do ramo: Pizzaria */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra, VP = K.vapor;
  const pepSolto = `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="22" fill="#a3241a"/><circle cx="18" cy="18" r="4" fill="#7e1810"/><circle cx="31" cy="28" r="3" fill="#7e1810"/></svg>`;
  const queijoSolto = `<svg viewBox="0 0 60 50"><path d="M4 44L30 4l26 40z" fill="#f6c94e"/><circle cx="26" cy="30" r="5" fill="#e9b33a"/><circle cx="38" cy="38" r="3.5" fill="#e9b33a"/></svg>`;
  const soltosPizza = () => K.soltosPadrao(pepSolto, K.folha('#3f8a33'), K.tomate(), queijoSolto);

  window.CENAS = {
    pizza() {
      const r = (n, a, b) => { const out = []; let s = n * 9301 + 49297; for (let i = 0; i < n; i++) { s = (s * 9301 + 49297) % 233280; out.push(a + (s / 233280) * (b - a)); } return out; };
      const pep = [[200, 92], [268, 128], [132, 132], [300, 210], [96, 214], [200, 196], [256, 286], [146, 290], [206, 322], [318, 156], [82, 158], [240, 236]]
        .map(([x, y], i) => `<g transform="translate(${x} ${y}) rotate(${i * 37})"><circle r="21" fill="#a3241a"/><circle r="21" fill="url(#pz-pep)"/><circle cx="-6" cy="-5" r="3" fill="#7e1810"/><circle cx="7" cy="4" r="2.4" fill="#7e1810"/></g>`).join('');
      const folhas = [[168, 160, 20], [244, 172, -40], [180, 252, 110], [290, 258, 60], [116, 250, -70], [222, 120, 150]]
        .map(([x, y, a]) => `<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0c6-9 18-12 26-6-4 10-16 14-26 6z" fill="#3f8a33"/>`).join('');
      const queijo = r(14, 0, 1).map((v, i) => { const a = i / 14 * Math.PI * 2, d = 40 + v * 80; return `<ellipse cx="${200 + Math.cos(a) * d}" cy="${200 + Math.sin(a) * d}" rx="${14 + v * 12}" ry="${9 + v * 8}" fill="#fff2c4" opacity=".55"/>`; }).join('');
      const pts = 36, ondas = r(pts, -9, 9);
      const queijoBorda = Array.from({ length: pts }, (_, i) => {
        const a = i / pts * Math.PI * 2, raio = 150 + ondas[i] + Math.sin(i * 2.3) * 4;
        return [200 + Math.cos(a) * raio, 200 + Math.sin(a) * raio];
      }).map((p, i, arr) => {
        const n = arr[(i + 1) % arr.length], mx = (p[0] + n[0]) / 2, my = (p[1] + n[1]) / 2;
        return (i === 0 ? `M${mx.toFixed(1)} ${my.toFixed(1)}` : '') + ` Q${n[0].toFixed(1)} ${n[1].toFixed(1)} ${((n[0] + arr[(i + 2) % arr.length][0]) / 2).toFixed(1)} ${((n[1] + arr[(i + 2) % arr.length][1]) / 2).toFixed(1)}`;
      }).join('') + 'Z';
      const principal = `<svg viewBox="0 0 400 400" class="cena-pizza" aria-hidden="true">
        <defs><radialGradient id="pz-massa" cx="50%" cy="45%" r="55%"><stop offset="78%" stop-color="#f3bd6a"/><stop offset="92%" stop-color="#d98b3c"/><stop offset="100%" stop-color="#b8682a"/></radialGradient>
        <radialGradient id="pz-queijo" cx="45%" cy="40%" r="60%"><stop offset="0%" stop-color="#ffe9a3"/><stop offset="100%" stop-color="#f4c95a"/></radialGradient>
        <radialGradient id="pz-pep" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="#e0503a" stop-opacity=".9"/><stop offset="100%" stop-color="#a3241a" stop-opacity="0"/></radialGradient></defs>
        <g class="cena-gira"><circle cx="200" cy="200" r="190" fill="url(#pz-massa)"/><circle cx="200" cy="200" r="166" fill="#c8321e"/><path d="${queijoBorda}" fill="url(#pz-queijo)"/>${queijo}
        <g stroke="#b26a2b" stroke-opacity=".28" stroke-width="3"><path d="M200 12v376M12 200h376M67 67l266 266M333 67L67 333"/></g>${pep}${folhas}</g></svg>`;
      return { principal, soltos: soltosPizza() };
    },

    fatia() {
      return {
        principal: S(SM(138, 15, 368) +
          C(5, 0, `<path d="M128 310c12 18 28 34 46 42 18-16 32-10 42 8 18-18 32-38 42-56z" fill="#f7cf54" opacity=".92"/>
            <path d="M150 300l-12 46M196 312l-6 48M236 296l10 44" stroke="#f7cf54" stroke-width="10" stroke-linecap="round"/>`) +
          C(10, .3, `<g transform="rotate(-12 200 200)">
            <path d="M84 96c72-36 160-36 232 0l-18 34c-60-26-136-26-196 0z" fill="#d98b3c"/>
            <path d="M102 126c60-24 136-24 196 0l-98 206z" fill="#c8321e"/>
            <path d="M114 136c52-20 120-20 172 0l-86 184z" fill="#f7cf54"/>
            <circle cx="170" cy="176" r="22" fill="#a3241a"/><circle cx="232" cy="186" r="20" fill="#a3241a"/><circle cx="198" cy="240" r="19" fill="#a3241a"/>
            <path d="M152 214c10-12 24-12 30-2-8 10-20 12-30 2z" fill="#3f8a33"/>
          </g>`) +
          C(16, .6, VP([152, 200, 248], 84)),
          `<linearGradient id="pf-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3bd6a"/><stop offset="1" stop-color="#b8682a"/></linearGradient>`),
        soltos: soltosPizza()
      };
    },

    forno() {
      return {
        principal: S(SM(164, 16, 368) +
          C(4, 0, `<rect x="44" y="274" width="312" height="80" rx="18" fill="#7c4728"/>
            <path d="M62 274c0-112 62-182 138-182s138 70 138 182z" fill="#b44c2e"/>
            <path d="M84 274c0-94 52-154 116-154s116 60 116 154z" fill="#d16741" opacity=".45"/>
            <path d="M112 274c0-66 40-108 88-108s88 42 88 108z" fill="#23120c"/>`) +
          C(9, .3, `<path d="M132 274c8-36 30-56 42-68-4 22 14 26 24 6 14 14 28 32 34 62z" fill="#f97316"/>
            <path d="M154 274c6-22 20-34 28-44 6 14 22 20 26 44z" style="fill:var(--d)"/>`) +
          C(15, .55, `<rect x="192" y="294" width="166" height="14" rx="7" fill="#d8a25e"/>
            <ellipse cx="166" cy="296" rx="72" ry="26" fill="#c78b46"/>
            <ellipse cx="166" cy="290" rx="58" ry="18" fill="#f6c94e"/>
            <circle cx="148" cy="288" r="8" fill="#a3241a"/><circle cx="176" cy="284" r="8" fill="#a3241a"/><circle cx="192" cy="294" r="7" fill="#3f8a33"/>`) +
          C(18, .75, VP([160, 200, 240], 84))),
        soltos: soltosPizza()
      };
    },

    caixa() {
      return {
        principal: S(SM(164, 16, 368) +
          C(5, 0, `<polygon points="56,222 200,152 344,222 200,308" fill="#e9d2b0"/>
            <polygon points="56,222 200,308 200,352 56,266" fill="#c8a87b"/>
            <polygon points="344,222 200,308 200,352 344,266" fill="#b18d5c"/>`) +
          C(10, .3, `<ellipse cx="200" cy="230" rx="108" ry="52" fill="#e4a24d"/>
            <ellipse cx="200" cy="226" rx="92" ry="42" fill="#c8321e"/>
            <ellipse cx="200" cy="224" rx="84" ry="36" fill="#f7cf54"/>
            <circle cx="168" cy="220" r="11" fill="#a3241a"/><circle cx="222" cy="214" r="11" fill="#a3241a"/><circle cx="200" cy="238" r="10" fill="#a3241a"/>
            <circle cx="242" cy="232" r="9" fill="#3f8a33"/><circle cx="154" cy="236" r="8" fill="#3f8a33"/>`) +
          C(16, .6, `<g transform="translate(0 -46) rotate(-8 200 120)">
            <polygon points="56,162 200,88 344,162 200,234" fill="#f6e6cd"/>
            <polygon points="94,162 200,108 306,162 200,214" style="fill:var(--p)"/>
            <circle cx="200" cy="162" r="26" style="fill:var(--d)"/>
          </g>`)),
        soltos: soltosPizza()
      };
    },

    meio() {
      return {
        principal: S(SM(164, 16, 368) +
          C(6, 0, `<circle cx="200" cy="200" r="166" fill="#e4a24d"/><circle cx="200" cy="200" r="144" fill="#c8321e"/>`) +
          C(11, .3, `<path d="M200 62A138 138 0 0 0 200 338Z" fill="#f7cf54"/>
            <circle cx="136" cy="146" r="18" fill="#a3241a"/><circle cx="116" cy="212" r="18" fill="#a3241a"/><circle cx="154" cy="270" r="18" fill="#a3241a"/><circle cx="168" cy="196" r="15" fill="#a3241a"/>`) +
          C(15, .55, `<path d="M200 62A138 138 0 0 1 200 338Z" fill="#fff4d2"/>
            <circle cx="256" cy="146" r="16" fill="#46962e"/><circle cx="282" cy="206" r="14" fill="#e63946"/><circle cx="246" cy="264" r="18" fill="#f2b84b"/><circle cx="236" cy="196" r="14" fill="#3b2f2f"/>
            <path d="M200 36v328" stroke="#fff" stroke-width="6" stroke-dasharray="12 10"/>
            <rect x="148" y="182" width="104" height="36" rx="18" style="fill:var(--p)"/><circle cx="182" cy="200" r="7" style="fill:var(--d)"/><circle cx="218" cy="200" r="7" style="fill:var(--d)"/>`)),
        soltos: soltosPizza()
      };
    },

    doce() {
      return {
        principal: S(SM(162, 16, 368) +
          C(6, 0, `<circle cx="200" cy="200" r="164" fill="#e5a654"/><circle cx="200" cy="200" r="142" fill="#522114"/>
            <path d="M98 158c44-20 156-20 204 0M90 210c54 18 166 18 220 0M114 260c40-14 132-14 172 0" stroke="#7c3621" stroke-width="8" stroke-linecap="round" fill="none" opacity=".6"/>`) +
          C(12, .35, [[146, 140], [250, 144], [134, 232], [254, 240], [200, 196], [198, 286]].map(([x, y], i) =>
            `<g transform="translate(${x} ${y}) rotate(${i * 35 - 20})"><path d="M0-18c12 0 18 12 14 26S4 24 0 24s-10-4-14-16 2-26 14-26z" fill="#e63946"/><path d="M-8-14l8-8 8 8" fill="#4aa146"/></g>`).join('')) +
          C(16, .6, `<g fill="#fff5eb">${[[176, 124], [224, 174], [166, 250], [234, 270], [116, 186], [282, 192]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8"/>`).join('')}</g>`)),
        soltos: K.soltosPadrao(K.morango(), K.coracao('var(--p)'), K.bolinha('#522114'), K.estrela())
      };
    },

    calzone() {
      return {
        principal: S(SM(162, 16, 368) +
          C(5, 0, `<rect x="44" y="294" width="312" height="40" rx="20" fill="#8b5528"/>`) +
          C(11, .35, `<path d="M62 286c0-118 68-174 138-174s138 56 138 174q0 18-24 18H86q-24 0-24-18z" fill="#e8a246"/>
            <path d="M62 284c14-16 28 16 42 0s28 16 42 0 28 16 42 0 28 16 42 0 28 16 42 0 28 16 42 0 24 12 24 0" fill="none" stroke="#b96d1e" stroke-width="10" stroke-linecap="round"/>
            <path d="M126 176l30 34M186 164l26 38M244 176l24 34" stroke="#9e5516" stroke-width="6" stroke-linecap="round" opacity=".55"/>`) +
          C(16, .65, `<path d="M254 226c26-10 56 2 66 26-26 14-56 10-72-6z" fill="#f7cf54"/>
            <circle cx="294" cy="242" r="10" fill="#c8321e"/>` + VP([152, 200, 248], 102))),
        soltos: soltosPizza()
      };
    },

    combo() {
      return {
        principal: S(SM(164, 16, 368) +
          C(5, 0, `<g transform="translate(248 56)">
            <path d="M36 0h28v44c0 14 26 24 26 56v178q0 18-18 18H28q-18 0-18-18V100c0-32 26-42 26-56z" fill="#3a1b14"/>
            <rect x="10" y="138" width="80" height="72" style="fill:var(--p)"/>
            <rect x="30" y="-6" width="40" height="16" rx="5" style="fill:var(--d)"/>
            <circle cx="50" cy="174" r="16" style="fill:var(--d)"/>
          </g>`) +
          C(11, .35, `<circle cx="164" cy="238" r="126" fill="#e5a34d"/><circle cx="164" cy="238" r="108" fill="#c8321e"/><circle cx="164" cy="238" r="96" fill="#f7cf54"/>
            <circle cx="128" cy="204" r="16" fill="#a3241a"/><circle cx="198" cy="206" r="16" fill="#a3241a"/><circle cx="164" cy="264" r="16" fill="#a3241a"/><circle cx="122" cy="266" r="14" fill="#3f8a33"/>`) +
          C(16, .65, `<rect x="44" y="68" width="128" height="44" rx="22" style="fill:var(--d)"/>
            <circle cx="72" cy="90" r="10" style="fill:var(--p)"/><rect x="92" y="83" width="60" height="14" rx="7" fill="#1e130e"/>`)),
        soltos: K.soltosPadrao(pepSolto, K.gelo(), K.folha('#3f8a33'), K.estrela())
      };
    },

    queijos() {
      return {
        principal: S(SM(164, 16, 368) +
          C(6, 0, `<circle cx="200" cy="200" r="164" fill="#e5a34d"/><circle cx="200" cy="200" r="142" fill="#fff0b8"/>`) +
          C(11, .35, `<ellipse cx="144" cy="156" rx="48" ry="34" fill="#f7c948"/><ellipse cx="250" cy="166" rx="44" ry="32" fill="#ffe694"/>
            <ellipse cx="166" cy="256" rx="52" ry="36" fill="#f5b832"/><ellipse cx="246" cy="250" rx="42" ry="30" fill="#fff7d9"/>
            <g fill="#4c7a6b" opacity=".75"><circle cx="236" cy="244" r="5"/><circle cx="256" cy="254" r="4"/><circle cx="244" cy="262" r="4.5"/><circle cx="152" cy="154" r="4"/></g>`) +
          C(16, .6, `<g transform="translate(230 62) rotate(14)"><path d="M6 68L54 6l54 62z" fill="#f7c948"/><circle cx="48" cy="48" r="8" fill="#d99a1e"/><circle cx="74" cy="54" r="6" fill="#d99a1e"/></g>`)),
        soltos: K.soltosPadrao(queijoSolto, K.folha('#3f8a33'), queijoSolto, K.estrela())
      };
    },

    esfiha() {
      const esf = (x, y, r, cor) => `<g transform="translate(${x} ${y}) rotate(${r})"><circle r="54" fill="#e4a24d"/><circle r="38" fill="${cor}"/><circle cx="-10" cy="-6" r="5" fill="#fff" opacity=".3"/></g>`;
      return {
        principal: S(SM(164, 16, 368) +
          C(5, 0, `<rect x="44" y="294" width="312" height="38" rx="19" fill="#8b5528"/>`) +
          C(10, .3, esf(130, 152, -10, '#7c341d') + esf(270, 156, 12, '#f7cf54')) +
          C(15, .6, esf(200, 232, 4, '#b83222') + `<path d="M188 228c8-10 20-10 26-2-6 8-18 10-26 2z" fill="#3f8a33"/>` + VP([146, 200, 254], 88))),
        soltos: K.soltosPadrao(K.limao(), K.folha('#3f8a33'), K.tomate(), K.estrela())
      };
    }
  };

  window.CENAS_NOMES = {
    pizza: 'Pizza girando',
    fatia: 'Fatia puxando queijo',
    forno: 'Forno a lenha 3D',
    caixa: 'Caixa de pizza abrindo',
    meio: 'Pizza meio a meio',
    doce: 'Pizza doce com morangos',
    calzone: 'Calzone dourado',
    combo: 'Combo pizza e refri',
    queijos: 'Pizza quatro queijos',
    esfiha: 'Esfihas abertas na tábua'
  };
  window.CENAS_ICONES = {
    pizza: 'cat-pizza', fatia: 'cat-pizza', forno: 'cat-pizza', caixa: 'cat-pizza', meio: 'cat-pizza',
    doce: 'cat-doce', calzone: 'cat-pao', combo: 'cat-combo', queijos: 'cat-pizza', esfiha: 'cat-pao'
  };
})();
