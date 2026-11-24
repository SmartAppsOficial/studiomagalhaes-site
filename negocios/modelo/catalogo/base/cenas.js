/* Cenas animadas da apresentação de cada ramo (SVG desenhado aqui, sem imagens).
   Cada cena devolve { principal, soltos }: a peça grande e os elementos que flutuam
   e seguem o mouse ou o dedo. */
window.CENAS = {
  pizza() {
    const r = (n, a, b) => { const out = []; let s = n * 9301 + 49297; for (let i = 0; i < n; i++) { s = (s * 9301 + 49297) % 233280; out.push(a + (s / 233280) * (b - a)); } return out; };
    // pepperonis em posições fixas (parecem aleatórias)
    const pep = [[200, 92], [268, 128], [132, 132], [300, 210], [96, 214], [200, 196], [256, 286], [146, 290], [206, 322], [318, 156], [82, 158], [240, 236]]
      .map(([x, y], i) => `<g transform="translate(${x} ${y}) rotate(${i * 37})"><circle r="21" fill="#a3241a"/><circle r="21" fill="url(#pz-pep)"/>
        <circle cx="-6" cy="-5" r="3" fill="#7e1810"/><circle cx="7" cy="4" r="2.4" fill="#7e1810"/><circle cx="-2" cy="8" r="1.8" fill="#7e1810"/></g>`).join('');
    const folhas = [[168, 160, 20], [244, 172, -40], [180, 252, 110], [290, 258, 60], [116, 250, -70], [222, 120, 150]]
      .map(([x, y, a]) => `<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0c6-9 18-12 26-6-4 10-16 14-26 6z" fill="#3f8a33"/><path transform="translate(${x} ${y}) rotate(${a})" d="M2 0q11-3 22-5" stroke="#2c6524" stroke-width="1.2" fill="none"/>`).join('');
    const queijo = r(14, 0, 1).map((v, i) => { const a = i / 14 * Math.PI * 2, d = 40 + v * 80; return `<ellipse cx="${200 + Math.cos(a) * d}" cy="${200 + Math.sin(a) * d}" rx="${14 + v * 12}" ry="${9 + v * 8}" fill="#fff2c4" opacity=".55"/>`; }).join('');
    // borda do queijo: círculo com ondas suaves (derretido)
    const pts = 36, ondas = r(pts, -9, 9);
    const queijoBorda = Array.from({ length: pts }, (_, i) => {
      const a = i / pts * Math.PI * 2, raio = 150 + ondas[i] + Math.sin(i * 2.3) * 4;
      return [200 + Math.cos(a) * raio, 200 + Math.sin(a) * raio];
    }).map((p, i, arr) => {
      const n = arr[(i + 1) % arr.length], mx = (p[0] + n[0]) / 2, my = (p[1] + n[1]) / 2;
      return (i === 0 ? `M${mx.toFixed(1)} ${my.toFixed(1)}` : '') + ` Q${n[0].toFixed(1)} ${n[1].toFixed(1)} ${((n[0] + arr[(i + 2) % arr.length][0]) / 2).toFixed(1)} ${((n[1] + arr[(i + 2) % arr.length][1]) / 2).toFixed(1)}`;
    }).join('') + 'Z';
    const principal = `<svg viewBox="0 0 400 400" class="cena-pizza" aria-hidden="true">
      <defs>
        <radialGradient id="pz-massa" cx="50%" cy="45%" r="55%"><stop offset="78%" stop-color="#f3bd6a"/><stop offset="92%" stop-color="#d98b3c"/><stop offset="100%" stop-color="#b8682a"/></radialGradient>
        <radialGradient id="pz-queijo" cx="45%" cy="40%" r="60%"><stop offset="0%" stop-color="#ffe9a3"/><stop offset="100%" stop-color="#f4c95a"/></radialGradient>
        <radialGradient id="pz-pep" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="#e0503a" stop-opacity=".9"/><stop offset="100%" stop-color="#a3241a" stop-opacity="0"/></radialGradient>
      </defs>
      <g class="cena-gira">
        <circle cx="200" cy="200" r="190" fill="url(#pz-massa)"/>
        ${r(18, 0, 1).map((v, i) => { const a = i / 18 * Math.PI * 2; return `<ellipse cx="${200 + Math.cos(a) * 178}" cy="${200 + Math.sin(a) * 178}" rx="7" ry="4" transform="rotate(${a * 57.3} ${200 + Math.cos(a) * 178} ${200 + Math.sin(a) * 178})" fill="#b5652a" opacity="${.25 + v * .3}"/>`; }).join('')}
        <circle cx="200" cy="200" r="166" fill="#c8321e"/>
        <path d="${queijoBorda}" fill="url(#pz-queijo)"/>
        ${queijo}
        <g stroke="#b26a2b" stroke-opacity=".28" stroke-width="3"><path d="M200 12v376M12 200h376M67 67l266 266M333 67L67 333"/></g>
        ${pep}${folhas}
      </g>
    </svg>`;
    const soltos = [
      { x: 6, y: 18, t: 54, p: 1.4, s: `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="22" fill="#a3241a"/><circle cx="18" cy="18" r="4" fill="#7e1810"/><circle cx="31" cy="28" r="3" fill="#7e1810"/><circle cx="21" cy="34" r="2.4" fill="#7e1810"/></svg>` },
      { x: 84, y: 8, t: 62, p: -1.1, s: `<svg viewBox="0 0 60 40"><path d="M2 20C14 2 40 0 58 14 46 34 20 38 2 20z" fill="#3f8a33"/><path d="M6 20q24-4 48-8" stroke="#2c6524" stroke-width="2" fill="none"/></svg>` },
      { x: 90, y: 70, t: 58, p: 1.8, s: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="27" fill="#e4432c"/><circle cx="30" cy="30" r="21" fill="#f06a4f"/><g fill="#ffd9c2"><ellipse cx="22" cy="24" rx="3" ry="5"/><ellipse cx="38" cy="24" rx="3" ry="5"/><ellipse cx="22" cy="38" rx="3" ry="5"/><ellipse cx="38" cy="38" rx="3" ry="5"/></g></svg>` },
      { x: 2, y: 78, t: 64, p: -1.6, s: `<svg viewBox="0 0 60 50"><path d="M4 44L30 4l26 40z" fill="#f6c94e"/><circle cx="26" cy="30" r="5" fill="#e9b33a"/><circle cx="38" cy="38" r="3.5" fill="#e9b33a"/><circle cx="30" cy="18" r="2.5" fill="#e9b33a"/></svg>` },
      { x: 46, y: 2, t: 46, p: .9, s: `<svg viewBox="0 0 50 50"><path d="M25 6c6 0 9 4 14 6s7 8 5 14-1 10-6 13-9 5-14 5-10-2-14-6-5-9-4-14 3-9 7-12 7-6 12-6z" fill="none" stroke="#4a9a3b" stroke-width="6" stroke-linejoin="round"/></svg>` },
      { x: 70, y: 90, t: 44, p: 1.2, s: `<svg viewBox="0 0 60 40"><path d="M2 20C14 2 40 0 58 14 46 34 20 38 2 20z" fill="#4c9a3d"/></svg>` }
    ];
    return { principal, soltos };
  },

  /* Hambúrguer em camadas, copo de refrigerante e caixa de batata.
     O copo e a caixa usam as cores da loja (--p e --d). Cada camada se mexe numa
     profundidade diferente com o mouse ou o dedo, o que dá a sensação de 3D. */
  lanche() {
    const gergelim = [[150, 150, -20], [178, 136, 10], [206, 132, -8], [234, 140, 25], [258, 156, -30], [128, 172, 15], [164, 170, -5], [196, 160, 30], [226, 166, -15], [252, 182, 10], [186, 190, -25], [146, 196, 20], [214, 192, 5]]
      .map(([x, y, a]) => `<ellipse cx="${x}" cy="${y}" rx="5.5" ry="3" transform="rotate(${a} ${x} ${y})" fill="#fff4dc"/>`).join('');
    const batatas = [[58, 196, -14], [74, 182, -6], [90, 176, 2], [106, 180, 8], [122, 190, 14], [66, 214, -10], [98, 200, 4], [130, 208, 18], [82, 206, -2], [114, 202, 10]]
      .map(([x, y, a]) => `<g transform="rotate(${a} ${x} ${y + 60})"><rect x="${x - 7}" y="${y}" width="14" height="110" rx="3" fill="#f7c948"/><rect x="${x - 7}" y="${y}" width="5" height="110" rx="2" fill="#e9aa2c" opacity=".7"/></g>`).join('');
    const camada = (d, atraso, conteudo) => `<g class="camada" style="--z:${d}"><g class="respira" style="--atraso:${atraso}s">${conteudo}</g></g>`;
    const principal = `<svg viewBox="0 0 400 400" class="cena-lanche" aria-hidden="true">
      <defs>
        <linearGradient id="ln-pao" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6b45a"/><stop offset="1" stop-color="#d4822f"/></linearGradient>
        <linearGradient id="ln-carne" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6d3a1d"/><stop offset="1" stop-color="#43200d"/></linearGradient>
        <linearGradient id="ln-brilho" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="200" cy="372" rx="170" ry="16" fill="#000" opacity=".28"/>
      ${camada(3, 0, `<g transform="translate(22 -14)">
        <path d="M300 24l12 4-12 92" stroke="#fff" stroke-width="11" stroke-linecap="round" fill="none"/>
        <path d="M300 24l12 4-12 92" stroke="var(--d)" stroke-width="11" stroke-dasharray="9 13" stroke-linecap="round" fill="none"/>
        <path d="M258 118h116l-16 226q-2 12-14 12h-56q-12 0-14-12z" fill="#fbf8f3"/>
        <path d="M262 168h108l-6 96H268z" style="fill:var(--p)"/>
        <circle cx="316" cy="216" r="19" style="fill:var(--d)"/><path d="M307 216h18M316 207v18" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <path d="M358 118l-16 226q-2 12-14 12h-8l16-238z" fill="#000" opacity=".08"/>
        <rect x="250" y="102" width="132" height="24" rx="11" fill="#e9e3da"/>
        <path d="M282 132l-8 206" stroke="url(#ln-brilho)" stroke-width="14" opacity=".8"/></g>`)}
      ${camada(5, .2, `<path d="M84 306h232v18q0 26-26 26H110q-26 0-26-26z" fill="url(#ln-pao)"/><path d="M84 306h232v8H84z" fill="#b86a24" opacity=".35"/>`)}
      ${camada(7, .35, `<path d="M76 268q0-14 14-14h220q14 0 14 14v20q0 18-18 18H94q-18 0-18-18z" fill="url(#ln-carne)"/>
        <g fill="#2e1406" opacity=".55"><circle cx="110" cy="276" r="3"/><circle cx="150" cy="288" r="2.5"/><circle cx="196" cy="272" r="3"/><circle cx="240" cy="290" r="2.5"/><circle cx="282" cy="276" r="3"/></g>`)}
      ${camada(8, .45, `<path d="M70 252h260l-12 14-10 22-12-20-16 26-14-28-18 20-14-22-18 30-14-30-16 22-14-24-16 26-12-26-16 20-12-22-12 14z" fill="#f8c22c"/>`)}
      ${camada(9, .55, `<rect x="88" y="234" width="224" height="22" rx="11" fill="#e2452c"/><rect x="96" y="238" width="80" height="6" rx="3" fill="#ff7a5c" opacity=".6"/>`)}
      ${camada(10, .65, `<path d="M66 240c8-18 22 2 34-10s22 12 34-2 22 10 34-4 22 12 34-2 22 10 34-4 22 12 34-2 22 10 34 0l2 20H64z" fill="#6cc43f"/><path d="M70 244c14 8 30-6 44 2s30-6 44 2 30-6 44 2 30-6 44 2 30-6 44 2 24-4 34 0" stroke="#3f8a28" stroke-width="3" fill="none"/>`)}
      ${camada(13, .8, `<path d="M74 232c0-70 56-112 126-112s126 42 126 112q0 8-8 8H82q-8 0-8-8z" fill="url(#ln-pao)"/>
        <path d="M110 160c18-22 50-34 84-34" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".28" fill="none"/>${gergelim}`)}
      ${camada(17, .3, `${batatas}
        <path d="M34 262h132l-14 112q-2 10-12 10H60q-10 0-12-10z" style="fill:var(--p)"/>
        <path d="M34 262h132c-10 18-26 26-66 26s-56-8-66-26z" fill="#000" opacity=".15"/>
        <circle cx="100" cy="330" r="18" style="fill:var(--d)"/><path d="M92 330h16M100 322v16" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/>`)}
    </svg>`;
    const soltos = [
      { x: 4, y: 14, t: 34, p: 1.5, s: `<svg viewBox="0 0 20 60"><rect x="3" y="2" width="14" height="56" rx="3" fill="#f7c948"/><rect x="3" y="2" width="5" height="56" rx="2" fill="#e9aa2c"/></svg>` },
      { x: 88, y: 6, t: 40, p: -1.2, s: `<svg viewBox="0 0 50 50"><rect x="6" y="6" width="38" height="38" rx="9" fill="#d8f1fb" opacity=".95"/><path d="M14 14h12" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>` },
      { x: 92, y: 72, t: 52, p: 1.7, s: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="27" fill="#e4432c"/><circle cx="30" cy="30" r="21" fill="#f06a4f"/><g fill="#ffd9c2"><ellipse cx="22" cy="24" rx="3" ry="5"/><ellipse cx="38" cy="24" rx="3" ry="5"/><ellipse cx="22" cy="38" rx="3" ry="5"/><ellipse cx="38" cy="38" rx="3" ry="5"/></g></svg>` },
      { x: 0, y: 70, t: 56, p: -1.4, s: `<svg viewBox="0 0 60 40"><path d="M2 20C14 2 40 0 58 14 46 34 20 38 2 20z" fill="#62b23a"/><path d="M6 20q24-4 48-8" stroke="#3f8a28" stroke-width="2" fill="none"/></svg>` },
      { x: 50, y: 0, t: 20, p: 1, s: `<svg viewBox="0 0 20 12"><ellipse cx="10" cy="6" rx="9" ry="5" fill="#fff4dc"/></svg>` },
      { x: 66, y: 92, t: 44, p: 1.1, s: `<svg viewBox="0 0 50 50"><path d="M4 8h42v26l-6 10-6-10-6 12-6-12-6 10-6-10-6 8z" fill="#f8c22c"/></svg>` }
    ];
    return { principal, soltos };
  }
};
/* Nomes das animações para o painel do Studio. */
window.CENAS_NOMES = { pizza: 'Pizza girando', lanche: 'Hambúrguer, refri e batata' };
