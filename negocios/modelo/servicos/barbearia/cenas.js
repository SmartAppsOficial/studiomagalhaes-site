/* 10 animações 3D exclusivas · Barbearia */
(() => {
  'use strict';
  const K = window.CENA_KIT;
  window.CENAS_NOMES = {
  "barberpole": "Poste barbearia 3D",
  "tesoura": "Tesoura precisão 3D",
  "navalha": "Navalha clássica 3D",
  "maquina": "Máquina de corte 3D",
  "barba": "Barba & bigode 3D",
  "pente": "Pente & escova 3D",
  "oleo": "Óleo de barba 3D",
  "cadeira": "Cadeira retrô 3D",
  "toalha": "Toalha quente 3D",
  "selo": "Brasão barbearia 3D"
};
  window.CENAS = {
    barberpole: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_barberpole" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#3b2414"/><stop offset="100%" stop-color="#160d08"/></radialGradient>
        <linearGradient id="l_barberpole" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_barberpole)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_barberpole)" transform="rotate(-18 116 96)"/>
      <rect x="116" y="66" width="48" height="136" rx="22" fill="#f7f4ee" stroke="#d4a353" stroke-width="4"/><path d="M118 96l44-18M118 126l44-18M118 156l44-18M118 186l44-18" stroke="#c8321e" stroke-width="10"/><path d="M118 111l44-18M118 141l44-18M118 171l44-18" stroke="#1d4ed8" stroke-width="8"/><circle cx="140" cy="62" r="14" fill="#d4a353"/><circle cx="140" cy="204" r="14" fill="#d4a353"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#e85d04'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#e85d04', 10), 18, 72, '4.6s', 1.1)]),
    tesoura: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_tesoura" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#2b1d14"/><stop offset="100%" stop-color="#0f0b09"/></radialGradient>
        <linearGradient id="l_tesoura" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_tesoura)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_tesoura)" transform="rotate(-18 116 96)"/>
      <circle cx="104" cy="176" r="20" stroke="#f2c46d" stroke-width="9"/><circle cx="176" cy="176" r="20" stroke="#f2c46d" stroke-width="9"/><path d="M114 158l54-88M166 158l-54-88" stroke="#e5e7eb" stroke-width="11" stroke-linecap="round"/><circle cx="140" cy="128" r="6" fill="#d4a353"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    navalha: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_navalha" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#422006"/><stop offset="100%" stop-color="#180d06"/></radialGradient>
        <linearGradient id="l_navalha" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_navalha)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_navalha)" transform="rotate(-18 116 96)"/>
      <path d="M84 152l96-56 14 18-88 54z" fill="#e5e7eb" stroke="#94a3b8" stroke-width="3"/><path d="M90 156l94 26c8 2 14-4 12-12l-6-16-94-12z" fill="#8b4513" stroke="#d4a353" stroke-width="3"/><circle cx="96" cy="154" r="6" fill="#f2c46d"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#d97706'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#d97706', 10), 18, 72, '4.6s', 1.1)]),
    maquina: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_maquina" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1f2937"/><stop offset="100%" stop-color="#090d14"/></radialGradient>
        <linearGradient id="l_maquina" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_maquina)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_maquina)" transform="rotate(-18 116 96)"/>
      <rect x="110" y="88" width="60" height="106" rx="18" fill="#1f2937" stroke="#d4a353" stroke-width="4"/><rect x="114" y="68" width="52" height="22" rx="4" fill="#cbd5e1"/><path d="M122 68v12M131 68v12M140 68v12M149 68v12M158 68v12" stroke="#475569" stroke-width="3"/><rect x="128" y="114" width="24" height="36" rx="8" fill="#d4a353"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#94a3b8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#94a3b8', 10), 18, 72, '4.6s', 1.1)]),
    barba: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_barba" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#4a2b17"/><stop offset="100%" stop-color="#1a0f09"/></radialGradient>
        <linearGradient id="l_barba" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_barba)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_barba)" transform="rotate(-18 116 96)"/>
      <path d="M84 120c0 46 24 74 56 74s56-28 56-74c-12 0-20 12-36 12h-40c-16 0-24-12-36-12z" fill="#2c1d15" stroke="#d4a353" stroke-width="4"/><path d="M104 124c14-14 28-8 36 0 8-8 22-14 36 0-12 10-26 10-36 3-10 7-24 7-36-3z" fill="#f2c46d"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#fb923c'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#fb923c', 10), 18, 72, '4.6s', 1.1)]),
    pente: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_pente" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#362112"/><stop offset="100%" stop-color="#130b06"/></radialGradient>
        <linearGradient id="l_pente" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_pente)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_pente)" transform="rotate(-18 116 96)"/>
      <rect x="82" y="114" width="116" height="24" rx="10" fill="#d4a353"/><path d="M94 138v28M106 138v28M118 138v28M130 138v28M142 138v28M154 138v28M166 138v28M178 138v28M188 138v28" stroke="#f2c46d" stroke-width="5" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#fde047'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#fde047', 10), 18, 72, '4.6s', 1.1)]),
    oleo: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_oleo" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#451a03"/><stop offset="100%" stop-color="#140903"/></radialGradient>
        <linearGradient id="l_oleo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_oleo)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_oleo)" transform="rotate(-18 116 96)"/>
      <rect x="108" y="108" width="64" height="84" rx="14" fill="#92400e" stroke="#f2c46d" stroke-width="4"/><rect x="126" y="76" width="28" height="32" rx="6" fill="#1e293b"/><circle cx="140" cy="70" r="10" fill="#f2c46d"/><rect x="118" y="128" width="44" height="36" rx="6" fill="#fef3c7"/>
    </svg>`, [K.f(K.spark('#fbbf24'), 14, 20, '3.6s', 1.2), K.f(K.spark('#f59e0b'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fbbf24', 14), 80, 76, '5s', .9), K.f(K.dot('#f59e0b', 10), 18, 72, '4.6s', 1.1)]),
    cadeira: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_cadeira" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#3b180b"/><stop offset="100%" stop-color="#140906"/></radialGradient>
        <linearGradient id="l_cadeira" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_cadeira)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_cadeira)" transform="rotate(-18 116 96)"/>
      <rect x="100" y="76" width="80" height="68" rx="16" fill="#7c2d12" stroke="#d4a353" stroke-width="4"/><rect x="92" y="140" width="96" height="28" rx="12" fill="#9a3412" stroke="#d4a353" stroke-width="4"/><path d="M140 168v34M106 202h68" stroke="#cbd5e1" stroke-width="10" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#fb923c'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#fb923c', 10), 18, 72, '4.6s', 1.1)]),
    toalha: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_toalha" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0b111b"/></radialGradient>
        <linearGradient id="l_toalha" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_toalha)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_toalha)" transform="rotate(-18 116 96)"/>
      <rect x="92" y="114" width="96" height="58" rx="22" fill="#f8fafc" stroke="#d4a353" stroke-width="4"/><ellipse cx="174" cy="143" rx="14" ry="26" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="3"/><path d="M116 98c0-14 10-14 10-28M140 94c0-14 10-14 10-28M164 98c0-14 10-14 10-28" stroke="#fde68a" stroke-width="5" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#fde68a'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde68a', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    selo: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_selo" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#3b2414"/><stop offset="100%" stop-color="#0f0a07"/></radialGradient>
        <linearGradient id="l_selo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_selo)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_selo)" transform="rotate(-18 116 96)"/>
      <path d="M140 62l64 26v46c0 42-28 68-64 80-36-12-64-38-64-80V88z" fill="#1e1b18" stroke="#f2c46d" stroke-width="5"/><path d="M114 114l52 52M166 114l-52 52" stroke="#f2c46d" stroke-width="8" stroke-linecap="round"/><circle cx="140" cy="100" r="8" fill="#f2c46d"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#fde047'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#fde047', 10), 18, 72, '4.6s', 1.1)])
  };
})();
