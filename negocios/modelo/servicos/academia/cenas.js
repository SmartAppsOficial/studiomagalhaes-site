/* 10 animações 3D exclusivas · Academia, estúdio e personal */
(() => {
  'use strict';
  const K = window.CENA_KIT;
  window.CENAS_NOMES = {
  "haltere": "Haltere 3D",
  "kettlebell": "Kettlebell 3D",
  "anilha": "Barra & anilhas 3D",
  "cronometro": "Cronômetro HIIT 3D",
  "raio": "Energia & força 3D",
  "coracao": "Cardio & pulso 3D",
  "trofeu": "Performance 3D",
  "corda": "Treino funcional 3D",
  "garrafa": "Hidratação fit 3D",
  "medalha": "Meta alcançada 3D"
};
  window.CENAS = {
    haltere: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_haltere" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#14532d"/><stop offset="100%" stop-color="#061c0f"/></radialGradient>
        <linearGradient id="l_haltere" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_haltere)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_haltere)" transform="rotate(-18 116 96)"/>
      <rect x="96" y="126" width="88" height="18" rx="6" fill="#cbd5e1"/><rect x="76" y="96" width="24" height="78" rx="8" fill="#22c55e" stroke="#bbf7d0" stroke-width="3"/><rect x="180" y="96" width="24" height="78" rx="8" fill="#22c55e" stroke="#bbf7d0" stroke-width="3"/>
    </svg>`, [K.f(K.spark('#4ade80'), 14, 20, '3.6s', 1.2), K.f(K.spark('#fde047'), 82, 22, '4.2s', 1.4), K.f(K.dot('#4ade80', 14), 80, 76, '5s', .9), K.f(K.dot('#fde047', 10), 18, 72, '4.6s', 1.1)]),
    kettlebell: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_kettlebell" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#15803d"/><stop offset="100%" stop-color="#072412"/></radialGradient>
        <linearGradient id="l_kettlebell" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_kettlebell)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_kettlebell)" transform="rotate(-18 116 96)"/>
      <path d="M114 106V92a26 26 0 0 1 52 0v14" stroke="#86efac" stroke-width="12" stroke-linecap="round"/><circle cx="140" cy="152" r="46" fill="#16a34a" stroke="#bbf7d0" stroke-width="4"/><circle cx="126" cy="136" r="10" fill="rgba(255,255,255,.3)"/>
    </svg>`, [K.f(K.spark('#4ade80'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#4ade80', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    anilha: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_anilha" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#090e14"/></radialGradient>
        <linearGradient id="l_anilha" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_anilha)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_anilha)" transform="rotate(-18 116 96)"/>
      <circle cx="140" cy="136" r="64" fill="#1f2937" stroke="#22c55e" stroke-width="12"/><circle cx="140" cy="136" r="18" fill="#e2e8f0"/><circle cx="140" cy="136" r="42" stroke="rgba(255,255,255,.25)" stroke-width="4" stroke-dasharray="16 12"/>
    </svg>`, [K.f(K.spark('#22c55e'), 14, 20, '3.6s', 1.2), K.f(K.spark('#facc15'), 82, 22, '4.2s', 1.4), K.f(K.dot('#22c55e', 14), 80, 76, '5s', .9), K.f(K.dot('#facc15', 10), 18, 72, '4.6s', 1.1)]),
    cronometro: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_cronometro" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#14532d"/><stop offset="100%" stop-color="#061a0e"/></radialGradient>
        <linearGradient id="l_cronometro" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_cronometro)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_cronometro)" transform="rotate(-18 116 96)"/>
      <circle cx="140" cy="142" r="54" fill="#111827" stroke="#22c55e" stroke-width="7"/><rect x="128" y="68" width="24" height="14" rx="5" fill="#4ade80"/><path d="M140 142v-30M140 142l22 14" stroke="#facc15" stroke-width="7" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#facc15'), 14, 20, '3.6s', 1.2), K.f(K.spark('#4ade80'), 82, 22, '4.2s', 1.4), K.f(K.dot('#facc15', 14), 80, 76, '5s', .9), K.f(K.dot('#4ade80', 10), 18, 72, '4.6s', 1.1)]),
    raio: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_raio" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#15803d"/><stop offset="100%" stop-color="#082413"/></radialGradient>
        <linearGradient id="l_raio" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_raio)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_raio)" transform="rotate(-18 116 96)"/>
      <polygon points="154,62 96,144 138,144 124,208 188,122 144,122" fill="#facc15" stroke="#fef08a" stroke-width="4"/>
    </svg>`, [K.f(K.spark('#fde047'), 14, 20, '3.6s', 1.2), K.f(K.spark('#4ade80'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde047', 14), 80, 76, '5s', .9), K.f(K.dot('#4ade80', 10), 18, 72, '4.6s', 1.1)]),
    coracao: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_coracao" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#14532d"/><stop offset="100%" stop-color="#061c0f"/></radialGradient>
        <linearGradient id="l_coracao" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_coracao)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_coracao)" transform="rotate(-18 116 96)"/>
      <path d="M140 196s-62-38-62-80a34 34 0 0 1 62-18 34 34 0 0 1 62 18c0 42-62 80-62 80z" fill="#22c55e" stroke="#bbf7d0" stroke-width="4"/><path d="M94 132h24l10-22 14 40 10-18h34" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`, [K.f(K.spark('#86efac'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#86efac', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    trofeu: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_trofeu" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#14532d"/><stop offset="100%" stop-color="#071f10"/></radialGradient>
        <linearGradient id="l_trofeu" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_trofeu)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_trofeu)" transform="rotate(-18 116 96)"/>
      <path d="M98 78h84v40a42 42 0 0 1-84 0z" fill="#facc15" stroke="#fef08a" stroke-width="4"/><rect x="130" y="158" width="20" height="28" fill="#eab308"/><rect x="106" y="186" width="68" height="16" rx="6" fill="#ca8a04"/>
    </svg>`, [K.f(K.spark('#fde047'), 14, 20, '3.6s', 1.2), K.f(K.spark('#4ade80'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde047', 14), 80, 76, '5s', .9), K.f(K.dot('#4ade80', 10), 18, 72, '4.6s', 1.1)]),
    corda: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_corda" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#166534"/><stop offset="100%" stop-color="#072212"/></radialGradient>
        <linearGradient id="l_corda" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_corda)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_corda)" transform="rotate(-18 116 96)"/>
      <path d="M88 112c16 68 88 68 104 0" stroke="#4ade80" stroke-width="10" stroke-linecap="round"/><rect x="78" y="88" width="18" height="36" rx="7" fill="#facc15"/><rect x="184" y="88" width="18" height="36" rx="7" fill="#facc15"/>
    </svg>`, [K.f(K.spark('#4ade80'), 14, 20, '3.6s', 1.2), K.f(K.spark('#facc15'), 82, 22, '4.2s', 1.4), K.f(K.dot('#4ade80', 14), 80, 76, '5s', .9), K.f(K.dot('#facc15', 10), 18, 72, '4.6s', 1.1)]),
    garrafa: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_garrafa" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#14532d"/><stop offset="100%" stop-color="#061a0e"/></radialGradient>
        <linearGradient id="l_garrafa" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_garrafa)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_garrafa)" transform="rotate(-18 116 96)"/>
      <rect x="112" y="96" width="56" height="104" rx="16" fill="#22c55e" stroke="#bbf7d0" stroke-width="4"/><rect x="124" y="70" width="32" height="26" rx="6" fill="#1e293b"/><path d="M122 128h36M122 148h28M122 168h36" stroke="#dcfce7" stroke-width="5" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#86efac'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#86efac', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    medalha: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_medalha" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#14532d"/><stop offset="100%" stop-color="#071f10"/></radialGradient>
        <linearGradient id="l_medalha" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_medalha)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_medalha)" transform="rotate(-18 116 96)"/>
      <path d="M116 66l24 44 24-44" stroke="#22c55e" stroke-width="14" stroke-linecap="round"/><circle cx="140" cy="154" r="42" fill="#facc15" stroke="#fef08a" stroke-width="5"/><polygon points="140,128 148,146 168,148 153,161 157,180 140,170 123,180 127,161 112,148 132,146" fill="#ffffff"/>
    </svg>`, [K.f(K.spark('#fde047'), 14, 20, '3.6s', 1.2), K.f(K.spark('#4ade80'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde047', 14), 80, 76, '5s', .9), K.f(K.dot('#4ade80', 10), 18, 72, '4.6s', 1.1)])
  };
})();
