/* 10 animações 3D exclusivas · Assistência técnica e manutenção */
(() => {
  'use strict';
  const K = window.CENA_KIT;
  window.CENAS_NOMES = {
  "celular": "Smartphone técnico 3D",
  "notebook": "Notebook & chip 3D",
  "arcond": "Ar-condicionado split 3D",
  "placa": "Placa eletrônica 3D",
  "ferramentas": "Kit precisão 3D",
  "floco": "Climatização gelada 3D",
  "raio": "Reparo elétrico 3D",
  "bateria": "Troca de bateria 3D",
  "tela": "Tela nova 3D",
  "escudo": "Garantia técnica 3D"
};
  window.CENAS = {
    celular: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_celular" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1d4ed8"/><stop offset="100%" stop-color="#08142e"/></radialGradient>
        <linearGradient id="l_celular" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_celular)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_celular)" transform="rotate(-18 116 96)"/>
      <rect x="104" y="68" width="72" height="136" rx="16" fill="#0f172a" stroke="#38bdf8" stroke-width="5"/><rect x="114" y="86" width="52" height="96" rx="8" fill="#1d4ed8"/><path d="M126 134l10 10 20-22" stroke="#4ade80" stroke-width="7" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#38bdf8'), 14, 20, '3.6s', 1.2), K.f(K.spark('#4ade80'), 82, 22, '4.2s', 1.4), K.f(K.dot('#38bdf8', 14), 80, 76, '5s', .9), K.f(K.dot('#4ade80', 10), 18, 72, '4.6s', 1.1)]),
    notebook: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_notebook" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#071129"/></radialGradient>
        <linearGradient id="l_notebook" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_notebook)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_notebook)" transform="rotate(-18 116 96)"/>
      <rect x="84" y="84" width="112" height="76" rx="10" fill="#1e293b" stroke="#60a5fa" stroke-width="4"/><rect x="94" y="94" width="92" height="56" rx="5" fill="#0ea5e9"/><rect x="68" y="164" width="144" height="16" rx="8" fill="#cbd5e1"/>
    </svg>`, [K.f(K.spark('#38bdf8'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#38bdf8', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    arcond: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_arcond" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#0369a1"/><stop offset="100%" stop-color="#071d30"/></radialGradient>
        <linearGradient id="l_arcond" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_arcond)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_arcond)" transform="rotate(-18 116 96)"/>
      <rect x="74" y="92" width="132" height="52" rx="14" fill="#f8fafc" stroke="#38bdf8" stroke-width="4"/><line x1="92" y1="132" x2="188" y2="132" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/><path d="M104 156c-6 14 6 18 0 32M140 156c-6 14 6 18 0 32M176 156c-6 14 6 18 0 32" stroke="#7dd3fc" stroke-width="6" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#7dd3fc'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#7dd3fc', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    placa: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_placa" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#050a14"/></radialGradient>
        <linearGradient id="l_placa" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_placa)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_placa)" transform="rotate(-18 116 96)"/>
      <rect x="96" y="92" width="88" height="88" rx="14" fill="#15803d" stroke="#86efac" stroke-width="4"/><rect x="116" y="112" width="48" height="48" rx="8" fill="#0f172a" stroke="#facc15" stroke-width="3"/><path d="M114 72v20M140 72v20M166 72v20M114 180v20M140 180v20M166 180v20" stroke="#facc15" stroke-width="6" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#4ade80'), 14, 20, '3.6s', 1.2), K.f(K.spark('#facc15'), 82, 22, '4.2s', 1.4), K.f(K.dot('#4ade80', 14), 80, 76, '5s', .9), K.f(K.dot('#facc15', 10), 18, 72, '4.6s', 1.1)]),
    ferramentas: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_ferramentas" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#09142e"/></radialGradient>
        <linearGradient id="l_ferramentas" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_ferramentas)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_ferramentas)" transform="rotate(-18 116 96)"/>
      <path d="M96 184l88-88" stroke="#38bdf8" stroke-width="14" stroke-linecap="round"/><path d="M184 184l-88-88" stroke="#facc15" stroke-width="14" stroke-linecap="round"/><circle cx="140" cy="140" r="14" fill="#f8fafc"/>
    </svg>`, [K.f(K.spark('#38bdf8'), 14, 20, '3.6s', 1.2), K.f(K.spark('#facc15'), 82, 22, '4.2s', 1.4), K.f(K.dot('#38bdf8', 14), 80, 76, '5s', .9), K.f(K.dot('#facc15', 10), 18, 72, '4.6s', 1.1)]),
    floco: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_floco" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#0284c7"/><stop offset="100%" stop-color="#072236"/></radialGradient>
        <linearGradient id="l_floco" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_floco)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_floco)" transform="rotate(-18 116 96)"/>
      <path d="M140 72v128M76 136h128M94 90l92 92M186 90l-92 92" stroke="#bae6fd" stroke-width="9" stroke-linecap="round"/><circle cx="140" cy="136" r="18" fill="#38bdf8" stroke="#fff" stroke-width="4"/>
    </svg>`, [K.f(K.spark('#ffffff'), 14, 20, '3.6s', 1.2), K.f(K.spark('#7dd3fc'), 82, 22, '4.2s', 1.4), K.f(K.dot('#ffffff', 14), 80, 76, '5s', .9), K.f(K.dot('#7dd3fc', 10), 18, 72, '4.6s', 1.1)]),
    raio: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_raio" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1d4ed8"/><stop offset="100%" stop-color="#081533"/></radialGradient>
        <linearGradient id="l_raio" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_raio)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_raio)" transform="rotate(-18 116 96)"/>
      <polygon points="154,66 96,144 138,144 124,206 186,124 144,124" fill="#facc15" stroke="#fef08a" stroke-width="4"/>
    </svg>`, [K.f(K.spark('#facc15'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#facc15', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    bateria: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_bateria" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#080e18"/></radialGradient>
        <linearGradient id="l_bateria" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_bateria)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_bateria)" transform="rotate(-18 116 96)"/>
      <rect x="96" y="88" width="88" height="114" rx="14" fill="#0f172a" stroke="#4ade80" stroke-width="5"/><rect x="122" y="72" width="36" height="16" rx="5" fill="#4ade80"/><rect x="110" y="108" width="60" height="78" rx="8" fill="#22c55e"/>
    </svg>`, [K.f(K.spark('#4ade80'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#4ade80', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    tela: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_tela" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1d4ed8"/><stop offset="100%" stop-color="#081633"/></radialGradient>
        <linearGradient id="l_tela" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_tela)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_tela)" transform="rotate(-18 116 96)"/>
      <rect x="96" y="74" width="88" height="124" rx="14" fill="#38bdf8" stroke="#fff" stroke-width="5"/><path d="M112 104l44 54M132 94l34 42" stroke="rgba(255,255,255,.55)" stroke-width="10" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#ffffff'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#ffffff', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    escudo: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_escudo" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#07132e"/></radialGradient>
        <linearGradient id="l_escudo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_escudo)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_escudo)" transform="rotate(-18 116 96)"/>
      <path d="M140 66l62 24v46c0 40-26 66-62 78-36-12-62-38-62-78V90z" fill="#2563eb" stroke="#93c5fd" stroke-width="5"/><path d="M116 136l16 16 34-34" stroke="#4ade80" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`, [K.f(K.spark('#4ade80'), 14, 20, '3.6s', 1.2), K.f(K.spark('#93c5fd'), 82, 22, '4.2s', 1.4), K.f(K.dot('#4ade80', 14), 80, 76, '5s', .9), K.f(K.dot('#93c5fd', 10), 18, 72, '4.6s', 1.1)])
  };
})();
