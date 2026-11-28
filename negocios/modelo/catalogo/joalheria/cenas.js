/* 10 animações 3D exclusivas do ramo: Joalheria e gemas naturais */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra;
  const brilho = (cor = 'var(--d)') => K.estrela(cor);
  const gemaMini = (cor = 'var(--p)') => `<svg viewBox="0 0 50 50"><polygon points="15,8 35,8 45,20 25,44 5,20" style="fill:${cor}"/><polygon points="15,8 35,8 32,20 18,20" fill="#fff" opacity=".4"/><polygon points="18,20 32,20 25,44" fill="#000" opacity=".16"/></svg>`;
  const soltosJoia = () => K.soltosPadrao(brilho(), gemaMini('var(--p)'), brilho('#fff'), gemaMini('var(--d)'));

  window.CENAS = {
    diamante() {
      return {
        principal: S(SM(132, 14, 368) +
          C(7, 0, `<polygon points="112,96 288,96 346,166 200,336 54,166" fill="#d9f2ff"/>
            <polygon points="112,96 200,96 156,166 54,166" fill="#b7e4fa"/>
            <polygon points="200,96 288,96 346,166 244,166" fill="#eef9ff"/>
            <polygon points="156,166 244,166 200,96" fill="#ffffff"/>`) +
          C(12, .35, `<polygon points="54,166 156,166 200,336" fill="#92d3f5"/>
            <polygon points="156,166 244,166 200,336" style="fill:var(--p)" opacity=".28"/>
            <polygon points="244,166 346,166 200,336" fill="#bfe8fc"/>
            <path d="M54 166h292M112 96l44 70 44 170M288 96l-44 70-44 170" stroke="#fff" stroke-width="3" opacity=".8" fill="none"/>`) +
          C(17, .65, `<path d="M98 76l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" style="fill:var(--d)"/>
            <path d="M312 104l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#fff"/>`)),
        soltos: soltosJoia()
      };
    },

    /* Solitário de luxo: aro com espessura, garras, brilhante lapidado com 14 facetas,
       reflexo que corre no ouro, halo girando e cintilância (estrela de 4 pontas). */
    solitarioLuxo() {
      const e4 = (x, y, r, cor, d = 0, dur = 2.6) => { const q = r * .14;
        return '<path d="M' + x + ' ' + (y - r) + 'Q' + (x + q) + ' ' + (y - q) + ' ' + (x + r) + ' ' + y + 'Q' + (x + q) + ' ' + (y + q) + ' ' + x + ' ' + (y + r) + 'Q' + (x - q) + ' ' + (y + q) + ' ' + (x - r) + ' ' + y + 'Q' + (x - q) + ' ' + (y - q) + ' ' + x + ' ' + (y - r) + 'Z" style="fill:' + cor + '">' +
          '<animate attributeName="opacity" values=".15;1;.15" dur="' + dur + 's" begin="' + d + 's" repeatCount="indefinite"/></path>'; };
      const raios = Array.from({ length: 16 }, (_, i) => '<polygon points="200,200 ' + (200 + 190 * Math.cos((i * 22.5 - 3) * Math.PI / 180)).toFixed(1) + ',' + (200 + 190 * Math.sin((i * 22.5 - 3) * Math.PI / 180)).toFixed(1) + ' ' + (200 + 190 * Math.cos((i * 22.5 + 3) * Math.PI / 180)).toFixed(1) + ',' + (200 + 190 * Math.sin((i * 22.5 + 3) * Math.PI / 180)).toFixed(1) + '"/>').join('');
      const g = 118, cu = 190; // altura da cintura e da ponta (culet) do brilhante
      const pav = [[140, 158, '#dff1fb'], [158, 179, '#a9d5ee'], [179, 200, '#ffffff'], [200, 221, '#bfe3f5'], [221, 242, '#f2faff'], [242, 260, '#9ccfe9']]
        .map(([a, b, c]) => '<polygon points="' + a + ',' + g + ' ' + b + ',' + g + ' 200,' + cu + '" fill="' + c + '"/>').join('');
      const defs = '<radialGradient id="jx-halo" cx=".5" cy=".42" r=".55"><stop offset="0" style="stop-color:var(--d);stop-opacity:.5"/><stop offset="1" style="stop-color:var(--d);stop-opacity:0"/></radialGradient>' +
        '<linearGradient id="jx-ouro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1c9"/><stop offset=".35" stop-color="#e8c27a"/><stop offset=".7" stop-color="#b9893f"/><stop offset="1" stop-color="#7d5722"/></linearGradient>' +
        '<linearGradient id="jx-ouro-fundo" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a7031"/><stop offset="1" stop-color="#5e3f17"/></linearGradient>' +
        '<linearGradient id="jx-reflexo" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="160" y2="160"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>' +
        '<animateTransform attributeName="gradientTransform" type="translate" values="-260 -260;400 400" dur="4.2s" repeatCount="indefinite"/></linearGradient>';
      return {
        principal: S(
          '<circle cx="200" cy="200" r="190" fill="url(#jx-halo)"/>' +
          '<g class="cena-gira" style="fill:var(--d)" opacity=".13">' + raios + '</g>' +
          SM(120, 13, 376) +
          C(4, 0, '<circle cx="194" cy="258" r="104" fill="none" stroke="url(#jx-ouro-fundo)" stroke-width="26"/>') +
          C(8, .2, '<circle cx="200" cy="262" r="104" fill="none" stroke="url(#jx-ouro)" stroke-width="24"/>' +
            '<circle cx="200" cy="262" r="92" fill="none" stroke="#fff3d1" stroke-width="2.5" opacity=".7"/>' +
            '<circle cx="200" cy="262" r="116" fill="none" stroke="#6e4a1b" stroke-width="1.5" opacity=".5"/>' +
            '<circle cx="200" cy="262" r="104" fill="none" stroke="url(#jx-reflexo)" stroke-width="20"/>') +
          C(12, .4, '<path d="M168 150 L186 118 H214 L232 150 Q200 166 168 150Z" fill="url(#jx-ouro)"/>' +
            '<path d="M176 150 Q200 160 224 150" stroke="#7d5722" stroke-width="2" fill="none" opacity=".6"/>' + pav +
            '<polygon points="140,118 172,82 170,118" fill="#e4f4fc"/><polygon points="170,118 172,82 200,100" fill="#ffffff"/>' +
            '<polygon points="200,100 172,82 228,82" fill="#f6fcff"/><polygon points="200,100 228,82 230,118" fill="#cbe8f7"/>' +
            '<polygon points="230,118 228,82 260,118" fill="#eef8fe"/><polygon points="170,118 200,100 230,118" fill="#b5ddf2"/>' +
            '<polygon points="179,118 200,118 200,190" style="fill:var(--d)" opacity=".22"/>' +
            '<path d="M140 118H260M172 82H228M140 118L200 190L260 118M170 118L200 190M230 118L200 190M172 82L170 118L200 100L230 118L228 82" stroke="#fff" stroke-width="1.6" opacity=".85" fill="none"/>' +
            '<path d="M136 118 L146 104 M264 118 L254 104 M150 132 L158 116 M250 132 L242 116" stroke="url(#jx-ouro)" stroke-width="7" stroke-linecap="round"/>') +
          C(18, .7, e4(186, 92, 13, '#fff', 0, 2.2) + e4(248, 104, 9, '#fff', .9, 2.8) + e4(96, 96, 16, 'var(--d)', .4, 3.2) +
            e4(318, 176, 12, 'var(--d)', 1.6, 3) + e4(300, 330, 8, '#fff', 1.1, 2.5) + e4(86, 300, 10, 'var(--d)', 2, 3.4)),
          defs),
        soltos: [
          { x: 6, y: 16, t: 40, p: 1.5, s: '<svg viewBox="0 0 40 40"><path d="M20 1Q23 17 39 20Q23 23 20 39Q17 23 1 20Q17 17 20 1Z" style="fill:var(--d)"/></svg>' },
          { x: 86, y: 10, t: 44, p: -1.3, s: gemaMini('#ffffff') },
          { x: 90, y: 72, t: 36, p: 1.6, s: '<svg viewBox="0 0 40 40"><path d="M20 1Q23 17 39 20Q23 23 20 39Q17 23 1 20Q17 17 20 1Z" fill="#fff"/></svg>' },
          { x: 4, y: 76, t: 38, p: -1.4, s: gemaMini('var(--d)') }
        ]
      };
    },

    anel() {
      return {
        principal: S(SM(136, 15, 368) +
          C(6, 0, `<circle cx="200" cy="236" r="106" fill="none" stroke="url(#jl-ouro)" stroke-width="26"/>
            <circle cx="200" cy="236" r="94" fill="none" stroke="#fff6d6" stroke-width="4" opacity=".6"/>`) +
          C(12, .35, `<polygon points="168,128 232,128 214,154 186,154" fill="url(#jl-ouro)"/>
            <polygon points="158,64 242,64 268,98 200,152 132,98" fill="#e6f7ff"/>
            <polygon points="158,64 242,64 222,98 178,98" fill="#ffffff"/>
            <polygon points="178,98 222,98 200,152" fill="#9bd7f7"/>`) +
          C(17, .65, `<path d="M266 56l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" style="fill:var(--d)"/>`),
          `<linearGradient id="jl-ouro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f9e6a8"/><stop offset=".5" stop-color="#d4af37"/><stop offset="1" stop-color="#9e7818"/></linearGradient>`),
        soltos: soltosJoia()
      };
    },

    aliancas() {
      return {
        principal: S(SM(156, 15, 368) +
          C(7, 0, `<circle cx="154" cy="222" r="92" fill="none" stroke="#d4af37" stroke-width="24"/>
            <circle cx="154" cy="222" r="82" fill="none" stroke="#fff5cc" stroke-width="4" opacity=".65"/>`) +
          C(13, .4, `<circle cx="246" cy="202" r="92" fill="none" stroke="#e5c158" stroke-width="24"/>
            <circle cx="246" cy="202" r="82" fill="none" stroke="#fff8dc" stroke-width="4" opacity=".65"/>
            <polygon points="246,96 260,110 246,124 232,110" fill="#fff"/>`) +
          C(17, .65, `<path d="M200 72l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" style="fill:var(--d)"/>`)),
        soltos: K.soltosPadrao(brilho(), K.coracao('var(--d)'), brilho('#fff'), gemaMini('var(--p)'))
      };
    },

    esmeralda() {
      return {
        principal: S(SM(132, 15, 368) +
          C(7, 0, `<polygon points="134,54 266,54 316,104 316,296 266,346 134,346 84,296 84,104" fill="#0d7a5f"/>
            <polygon points="134,54 266,54 244,98 156,98" fill="#2cc295"/>
            <polygon points="84,104 134,54 156,98 128,128" fill="#52e0b4"/>
            <polygon points="266,346 134,346 156,302 244,302" fill="#064e3b"/>`) +
          C(13, .4, `<rect x="128" y="98" width="144" height="204" rx="12" fill="#10b981"/>
            <rect x="148" y="122" width="104" height="156" rx="8" fill="#34d399" opacity=".65"/>
            <path d="M156 132l84 128" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".28"/>`) +
          C(17, .65, `<path d="M108 64l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" fill="#fff"/>`)),
        soltos: K.soltosPadrao(brilho(), gemaMini('#10b981'), brilho('#fff'), gemaMini('var(--d)'))
      };
    },

    rubi() {
      return {
        principal: S(SM(128, 15, 368) +
          C(7, 0, `<path d="M200 48c58 84 114 146 114 206a114 114 0 0 1-228 0c0-60 56-122 114-206z" fill="#9b111e"/>
            <path d="M200 76c44 68 86 118 86 168a86 86 0 0 1-172 0c0-50 42-100 86-168z" fill="#d91e36"/>`) +
          C(13, .4, `<polygon points="200,114 254,230 200,316 146,230" fill="#ff4d6d" opacity=".65"/>
            <path d="M168 184l24-54" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".55"/>`) +
          C(17, .65, `<path d="M274 96l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" style="fill:var(--d)"/>`)),
        soltos: K.soltosPadrao(brilho(), gemaMini('#d91e36'), brilho('#fff'), K.coracao('#d91e36'))
      };
    },

    colar() {
      return {
        principal: S(SM(138, 15, 368) +
          C(6, 0, `<path d="M84 48c0 128 52 192 116 192s116-64 116-192" fill="none" stroke="#d4af37" stroke-width="9" stroke-dasharray="6 4"/>
            <circle cx="200" cy="240" r="14" fill="none" stroke="#d4af37" stroke-width="6"/>`) +
          C(13, .4, `<polygon points="200,248 258,298 200,356 142,298" style="fill:var(--p)"/>
            <polygon points="200,262 238,298 200,338 162,298" fill="#fff" opacity=".35"/>
            <polygon points="200,248 258,298 200,356 142,298" fill="none" stroke="#e5c158" stroke-width="7"/>`) +
          C(17, .65, `<path d="M254 244l4 11 11 4-11 4-4 11-4-11-11-4 11-4z" fill="#fff"/>`)),
        soltos: soltosJoia()
      };
    },

    safira() {
      return {
        principal: S(SM(138, 15, 368) +
          C(7, 0, `<ellipse cx="200" cy="200" rx="118" ry="146" fill="#1e3a8a"/>
            <ellipse cx="200" cy="200" rx="94" ry="118" fill="#2563eb"/>`) +
          C(13, .4, `<polygon points="200,92 268,200 200,308 132,200" fill="#60a5fa" opacity=".7"/>
            <ellipse cx="200" cy="200" rx="54" ry="72" fill="#93c5fd" opacity=".45"/>
            <path d="M156 148c16-24 44-34 68-28" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".6" fill="none"/>`) +
          C(17, .65, `<path d="M286 92l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" fill="#fff"/>`)),
        soltos: K.soltosPadrao(brilho(), gemaMini('#2563eb'), brilho('#fff'), gemaMini('var(--d)'))
      };
    },

    brincos() {
      const br = x => `<g transform="translate(${x} 76)">
        <circle cx="48" cy="24" r="18" fill="#d4af37"/><circle cx="48" cy="24" r="8" fill="#fff"/>
        <path d="M48 42v42" stroke="#d4af37" stroke-width="7"/>
        <path d="M48 84c34 48 56 84 56 118a56 56 0 0 1-112 0c0-34 22-70 56-118z" style="fill:var(--p)"/>
        <path d="M48 104c22 34 36 60 36 86a36 36 0 0 1-72 0c0-26 14-52 36-86z" fill="#fff" opacity=".28"/>
        <path d="M48 84c34 48 56 84 56 118a56 56 0 0 1-112 0c0-34 22-70 56-118z" fill="none" stroke="#e5c158" stroke-width="7"/>
      </g>`;
      return {
        principal: S(SM(156, 15, 368) + C(8, 0, br(64)) + C(14, .45, br(240))),
        soltos: soltosJoia()
      };
    },

    cristal() {
      return {
        principal: S(SM(158, 16, 368) +
          C(6, 0, `<polygon points="66,336 102,158 148,118 188,162 172,336" fill="#6d28d9"/>
            <polygon points="224,336 238,144 282,110 326,158 312,336" fill="#7c3aed"/>`) +
          C(12, .35, `<polygon points="134,344 156,112 200,54 244,112 266,344" fill="#8b5cf6"/>
            <polygon points="200,54 244,112 222,344 200,344" fill="#c4b5fd" opacity=".55"/>
            <polygon points="156,112 200,54 200,344 134,344" fill="#5b21b6" opacity=".35"/>`) +
          C(17, .65, `<path d="M200 32l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" style="fill:var(--d)"/>`)),
        soltos: K.soltosPadrao(brilho(), gemaMini('#8b5cf6'), brilho('#fff'), gemaMini('var(--d)'))
      };
    },

    estojo() {
      return {
        principal: S(SM(158, 16, 368) +
          C(6, 0, `<rect x="74" y="68" width="252" height="144" rx="28" style="fill:var(--p)"/>
            <rect x="92" y="86" width="216" height="114" rx="18" fill="#fffaf0"/>`) +
          C(11, .35, `<rect x="64" y="200" width="272" height="148" rx="26" style="fill:var(--p)"/>
            <rect x="64" y="200" width="272" height="20" style="fill:var(--d)"/>
            <rect x="172" y="200" width="56" height="28" rx="8" fill="#f7e3a4"/>`) +
          C(16, .65, `<circle cx="200" cy="186" r="46" fill="none" stroke="#d4af37" stroke-width="14"/>
            <polygon points="180,118 220,118 232,134 200,162 168,134" fill="#e6f7ff"/>
            <path d="M200 84l4 11 11 4-11 4-4 11-4-11-11-4 11-4z" style="fill:var(--d)"/>`)),
        soltos: soltosJoia()
      };
    }
  };

  window.CENAS_NOMES = {
    diamante: 'Diamante lapidado 3D',
    anel: 'Anel solitário de luxo',
    aliancas: 'Par de alianças 18k',
    esmeralda: 'Gema esmeralda lapidada',
    solitarioLuxo: 'Solitário de luxo com brilho',
    rubi: 'Gema rubi lapidação gota',
    colar: 'Colar com pingente de gema',
    safira: 'Safira azul lapidada',
    brincos: 'Par de brincos de luxo',
    cristal: 'Cristais de ametista',
    estojo: 'Estojo de veludo aberto'
  };
  window.CENAS_ICONES = {
    diamante: 'cat-joia', solitarioLuxo: 'cat-anel', anel: 'cat-anel', aliancas: 'cat-anel', esmeralda: 'cat-joia', rubi: 'cat-joia',
    colar: 'cat-estrela', safira: 'cat-joia', brincos: 'cat-acessorio', cristal: 'cat-joia', estojo: 'cat-presente'
  };
})();
