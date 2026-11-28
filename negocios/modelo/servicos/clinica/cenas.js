/* 10 animações 3D exclusivas · Clínica e saúde */
(() => {
  'use strict';
  const K = window.CENA_KIT;
  window.CENAS_NOMES = {
  "esteto": "Estetoscópio 3D",
  "cruz": "Cruz saúde 3D",
  "dente": "Sorriso & odonto 3D",
  "coracao": "Batimento cardíaco 3D",
  "tele": "Teleconsulta 3D",
  "agenda": "Agenda clínica 3D",
  "folha": "Nutrição & vida 3D",
  "escudo": "Proteção médica 3D",
  "prontuario": "Check-up completo 3D",
  "capsula": "Bem-estar 3D"
};
  window.CENAS = {
    esteto: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_esteto" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#0f766e"/><stop offset="100%" stop-color="#072a2a"/></radialGradient>
        <linearGradient id="l_esteto" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_esteto)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_esteto)" transform="rotate(-18 116 96)"/>
      <path d="M100 78v44a40 40 0 0 0 80 0V78" stroke="#e0f2fe" stroke-width="11" stroke-linecap="round"/><path d="M140 162v22a22 22 0 0 0 44 0v-18" stroke="#38bdf8" stroke-width="10" stroke-linecap="round"/><circle cx="184" cy="156" r="16" fill="#f8fafc" stroke="#0ea5e9" stroke-width="5"/>
    </svg>`, [K.f(K.spark('#5eead4'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#5eead4', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    cruz: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_cruz" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#0e7490"/><stop offset="100%" stop-color="#062632"/></radialGradient>
        <linearGradient id="l_cruz" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_cruz)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_cruz)" transform="rotate(-18 116 96)"/>
      <rect x="118" y="72" width="44" height="128" rx="12" fill="#f8fafc"/><rect x="76" y="114" width="128" height="44" rx="12" fill="#f8fafc"/><circle cx="140" cy="136" r="14" fill="#14b8a6"/>
    </svg>`, [K.f(K.spark('#5eead4'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#5eead4', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    dente: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_dente" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#0369a1"/><stop offset="100%" stop-color="#082338"/></radialGradient>
        <linearGradient id="l_dente" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_dente)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_dente)" transform="rotate(-18 116 96)"/>
      <path d="M104 86c16-12 30 4 36 4s20-16 36-4c18 14 14 48 6 72-8 24-16 42-24 42-8 0-12-22-18-22s-10 22-18 22c-8 0-16-18-24-42-8-24-12-58 6-72z" fill="#ffffff" stroke="#67e8f9" stroke-width="4"/>
    </svg>`, [K.f(K.spark('#ffffff'), 14, 20, '3.6s', 1.2), K.f(K.spark('#67e8f9'), 82, 22, '4.2s', 1.4), K.f(K.dot('#ffffff', 14), 80, 76, '5s', .9), K.f(K.dot('#67e8f9', 10), 18, 72, '4.6s', 1.1)]),
    coracao: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_coracao" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#0f766e"/><stop offset="100%" stop-color="#072426"/></radialGradient>
        <linearGradient id="l_coracao" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_coracao)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_coracao)" transform="rotate(-18 116 96)"/>
      <path d="M140 198s-64-40-64-82a34 34 0 0 1 64-16 34 34 0 0 1 64 16c0 42-64 82-64 82z" fill="#f43f5e" stroke="#fecdd3" stroke-width="4"/><path d="M90 132h28l10-22 14 42 12-20h34" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`, [K.f(K.spark('#fecdd3'), 14, 20, '3.6s', 1.2), K.f(K.spark('#5eead4'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fecdd3', 14), 80, 76, '5s', .9), K.f(K.dot('#5eead4', 10), 18, 72, '4.6s', 1.1)]),
    tele: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_tele" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#0369a1"/><stop offset="100%" stop-color="#082032"/></radialGradient>
        <linearGradient id="l_tele" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_tele)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_tele)" transform="rotate(-18 116 96)"/>
      <rect x="78" y="84" width="124" height="84" rx="14" fill="#e0f2fe" stroke="#38bdf8" stroke-width="5"/><circle cx="140" cy="118" r="16" fill="#0e7490"/><path d="M112 156c6-16 50-16 56 0" fill="#0e7490"/><rect x="116" y="176" width="48" height="10" rx="5" fill="#bae6fd"/>
    </svg>`, [K.f(K.spark('#38bdf8'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#38bdf8', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    agenda: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_agenda" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#115e59"/><stop offset="100%" stop-color="#072222"/></radialGradient>
        <linearGradient id="l_agenda" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_agenda)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_agenda)" transform="rotate(-18 116 96)"/>
      <rect x="84" y="84" width="112" height="110" rx="16" fill="#ffffff" stroke="#2dd4bf" stroke-width="4"/><rect x="84" y="84" width="112" height="32" rx="12" fill="#0d9488"/><path d="M114 146l16 16 36-34" stroke="#0d9488" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`, [K.f(K.spark('#5eead4'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#5eead4', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    folha: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_folha" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#15803d"/><stop offset="100%" stop-color="#072613"/></radialGradient>
        <linearGradient id="l_folha" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_folha)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_folha)" transform="rotate(-18 116 96)"/>
      <path d="M96 176c0-58 46-96 96-96 0 58-38 96-96 96z" fill="#22c55e" stroke="#bbf7d0" stroke-width="4"/><path d="M96 176l74-74" stroke="#dcfce7" stroke-width="6" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#86efac'), 14, 20, '3.6s', 1.2), K.f(K.spark('#5eead4'), 82, 22, '4.2s', 1.4), K.f(K.dot('#86efac', 14), 80, 76, '5s', .9), K.f(K.dot('#5eead4', 10), 18, 72, '4.6s', 1.1)]),
    escudo: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_escudo" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#0369a1"/><stop offset="100%" stop-color="#071e30"/></radialGradient>
        <linearGradient id="l_escudo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_escudo)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_escudo)" transform="rotate(-18 116 96)"/>
      <path d="M140 66l62 24v46c0 40-26 66-62 78-36-12-62-38-62-78V90z" fill="#0ea5e9" stroke="#e0f2fe" stroke-width="4"/><path d="M116 136l16 16 34-34" stroke="#ffffff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`, [K.f(K.spark('#7dd3fc'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#7dd3fc', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    prontuario: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_prontuario" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#0f766e"/><stop offset="100%" stop-color="#062122"/></radialGradient>
        <linearGradient id="l_prontuario" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_prontuario)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_prontuario)" transform="rotate(-18 116 96)"/>
      <rect x="94" y="72" width="92" height="128" rx="14" fill="#f8fafc" stroke="#2dd4bf" stroke-width="4"/><rect x="120" y="62" width="40" height="18" rx="6" fill="#0d9488"/><path d="M112 114h56M112 138h56M112 162h38" stroke="#0f766e" stroke-width="7" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#5eead4'), 14, 20, '3.6s', 1.2), K.f(K.spark('#bae6fd'), 82, 22, '4.2s', 1.4), K.f(K.dot('#5eead4', 14), 80, 76, '5s', .9), K.f(K.dot('#bae6fd', 10), 18, 72, '4.6s', 1.1)]),
    capsula: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_capsula" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#0e7490"/><stop offset="100%" stop-color="#07222b"/></radialGradient>
        <linearGradient id="l_capsula" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_capsula)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_capsula)" transform="rotate(-18 116 96)"/>
      <rect x="86" y="108" width="108" height="54" rx="27" fill="#38bdf8" stroke="#fff" stroke-width="4" transform="rotate(-32 140 135)"/><path d="M140 108h27a27 27 0 0 1 0 54h-27z" fill="#2dd4bf" transform="rotate(-32 140 135)"/>
    </svg>`, [K.f(K.spark('#5eead4'), 14, 20, '3.6s', 1.2), K.f(K.spark('#7dd3fc'), 82, 22, '4.2s', 1.4), K.f(K.dot('#5eead4', 14), 80, 76, '5s', .9), K.f(K.dot('#7dd3fc', 10), 18, 72, '4.6s', 1.1)])
  };
})();
