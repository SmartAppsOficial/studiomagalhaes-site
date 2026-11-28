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
    rubi: 'Gema rubi lapidação gota',
    colar: 'Colar com pingente de gema',
    safira: 'Safira azul lapidada',
    brincos: 'Par de brincos de luxo',
    cristal: 'Cristais de ametista',
    estojo: 'Estojo de veludo aberto'
  };
  window.CENAS_ICONES = {
    diamante: 'cat-joia', anel: 'cat-anel', aliancas: 'cat-anel', esmeralda: 'cat-joia', rubi: 'cat-joia',
    colar: 'cat-estrela', safira: 'cat-joia', brincos: 'cat-acessorio', cristal: 'cat-joia', estojo: 'cat-presente'
  };
})();
