/* 10 animações 3D exclusivas · Oficina mecânica e estética automotiva */
(() => {
  'use strict';
  const K = window.CENA_KIT;
  window.CENAS_NOMES = {
  "chave": "Chave mecânica 3D",
  "engrenagem": "Engrenagens 3D",
  "carro": "Carro esportivo 3D",
  "roda": "Roda de liga 3D",
  "pistao": "Motor & pistão 3D",
  "polimento": "Polimento espelhado 3D",
  "scanner": "Diagnóstico OBD 3D",
  "oleo": "Troca de óleo 3D",
  "bateria": "Elétrica & bateria 3D",
  "velocimetro": "Velocímetro turbo 3D"
};
  window.CENAS = {
    chave: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_chave" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#7c2d12"/><stop offset="100%" stop-color="#170a05"/></radialGradient>
        <linearGradient id="l_chave" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_chave)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_chave)" transform="rotate(-18 116 96)"/>
      <path d="M174 82a30 30 0 0 0-38 38l-52 52a14 14 0 0 0 20 20l52-52a30 30 0 0 0 38-38l-18 18-16-16z" fill="#e2e8f0" stroke="#f97316" stroke-width="4"/>
    </svg>`, [K.f(K.spark('#fb923c'), 14, 20, '3.6s', 1.2), K.f(K.spark('#facc15'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fb923c', 14), 80, 76, '5s', .9), K.f(K.dot('#facc15', 10), 18, 72, '4.6s', 1.1)]),
    engrenagem: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_engrenagem" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#090d14"/></radialGradient>
        <linearGradient id="l_engrenagem" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_engrenagem)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_engrenagem)" transform="rotate(-18 116 96)"/>
      <circle cx="140" cy="136" r="46" stroke="#f97316" stroke-width="18" stroke-dasharray="18 12"/><circle cx="140" cy="136" r="24" fill="#1e293b" stroke="#e2e8f0" stroke-width="6"/>
    </svg>`, [K.f(K.spark('#f97316'), 14, 20, '3.6s', 1.2), K.f(K.spark('#94a3b8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f97316', 14), 80, 76, '5s', .9), K.f(K.dot('#94a3b8', 10), 18, 72, '4.6s', 1.1)]),
    carro: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_carro" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#7f1d1d"/><stop offset="100%" stop-color="#1c0707"/></radialGradient>
        <linearGradient id="l_carro" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_carro)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_carro)" transform="rotate(-18 116 96)"/>
      <path d="M68 150l20-34c6-10 16-16 28-16h48c12 0 22 6 28 16l20 34v22H68z" fill="#ef4444" stroke="#fca5a5" stroke-width="4"/><circle cx="104" cy="174" r="18" fill="#111827" stroke="#e2e8f0" stroke-width="5"/><circle cx="176" cy="174" r="18" fill="#111827" stroke="#e2e8f0" stroke-width="5"/>
    </svg>`, [K.f(K.spark('#fca5a5'), 14, 20, '3.6s', 1.2), K.f(K.spark('#facc15'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fca5a5', 14), 80, 76, '5s', .9), K.f(K.dot('#facc15', 10), 18, 72, '4.6s', 1.1)]),
    roda: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_roda" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#334155"/><stop offset="100%" stop-color="#0b0f17"/></radialGradient>
        <linearGradient id="l_roda" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_roda)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_roda)" transform="rotate(-18 116 96)"/>
      <circle cx="140" cy="136" r="64" fill="#111827" stroke="#64748b" stroke-width="14"/><circle cx="140" cy="136" r="36" fill="#cbd5e1"/><path d="M140 100v72M104 136h72M115 111l50 50M165 111l-50 50" stroke="#1e293b" stroke-width="6"/><circle cx="140" cy="136" r="10" fill="#ef4444"/>
    </svg>`, [K.f(K.spark('#ef4444'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#ef4444', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    pistao: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_pistao" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0a0e16"/></radialGradient>
        <linearGradient id="l_pistao" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_pistao)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_pistao)" transform="rotate(-18 116 96)"/>
      <rect x="104" y="76" width="72" height="52" rx="10" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/><line x1="108" y1="94" x2="172" y2="94" stroke="#f97316" stroke-width="5"/><rect x="130" y="128" width="20" height="56" rx="6" fill="#cbd5e1"/><circle cx="140" cy="190" r="16" fill="#f97316"/>
    </svg>`, [K.f(K.spark('#f97316'), 14, 20, '3.6s', 1.2), K.f(K.spark('#e2e8f0'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f97316', 14), 80, 76, '5s', .9), K.f(K.dot('#e2e8f0', 10), 18, 72, '4.6s', 1.1)]),
    polimento: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_polimento" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#0c4a6e"/><stop offset="100%" stop-color="#061926"/></radialGradient>
        <linearGradient id="l_polimento" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_polimento)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_polimento)" transform="rotate(-18 116 96)"/>
      <ellipse cx="140" cy="138" rx="66" ry="42" fill="#0ea5e9" stroke="#bae6fd" stroke-width="4"/><path d="M100 120l30 34M132 108l34 46" stroke="rgba(255,255,255,.7)" stroke-width="10" stroke-linecap="round"/><path d="M174 84l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" fill="#fef08a"/>
    </svg>`, [K.f(K.spark('#ffffff'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#ffffff', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    scanner: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_scanner" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1f2937"/><stop offset="100%" stop-color="#090d14"/></radialGradient>
        <linearGradient id="l_scanner" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_scanner)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_scanner)" transform="rotate(-18 116 96)"/>
      <rect x="92" y="74" width="96" height="128" rx="16" fill="#1e293b" stroke="#f97316" stroke-width="4"/><rect x="106" y="92" width="68" height="54" rx="8" fill="#0f172a"/><path d="M114 124h14l8-18 10 28 8-14h12" stroke="#22c55e" stroke-width="5" stroke-linecap="round"/><circle cx="140" cy="174" r="12" fill="#f97316"/>
    </svg>`, [K.f(K.spark('#22c55e'), 14, 20, '3.6s', 1.2), K.f(K.spark('#f97316'), 82, 22, '4.2s', 1.4), K.f(K.dot('#22c55e', 14), 80, 76, '5s', .9), K.f(K.dot('#f97316', 10), 18, 72, '4.6s', 1.1)]),
    oleo: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_oleo" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#78350f"/><stop offset="100%" stop-color="#1c0c04"/></radialGradient>
        <linearGradient id="l_oleo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_oleo)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_oleo)" transform="rotate(-18 116 96)"/>
      <path d="M140 68c32 46 48 72 48 94a48 48 0 0 1-96 0c0-22 16-48 48-94z" fill="#f59e0b" stroke="#fde68a" stroke-width="4"/><path d="M120 156a20 20 0 0 0 18 20" stroke="#fef3c7" stroke-width="6" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#fde047'), 14, 20, '3.6s', 1.2), K.f(K.spark('#f59e0b'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde047', 14), 80, 76, '5s', .9), K.f(K.dot('#f59e0b', 10), 18, 72, '4.6s', 1.1)]),
    bateria: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_bateria" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#090d14"/></radialGradient>
        <linearGradient id="l_bateria" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_bateria)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_bateria)" transform="rotate(-18 116 96)"/>
      <rect x="82" y="100" width="116" height="86" rx="12" fill="#1e293b" stroke="#e2e8f0" stroke-width="4"/><rect x="100" y="84" width="22" height="16" rx="4" fill="#ef4444"/><rect x="158" y="84" width="22" height="16" rx="4" fill="#38bdf8"/><path d="M146 114l-20 30h18l-8 28 24-34h-18z" fill="#facc15"/>
    </svg>`, [K.f(K.spark('#facc15'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ef4444'), 82, 22, '4.2s', 1.4), K.f(K.dot('#facc15', 14), 80, 76, '5s', .9), K.f(K.dot('#ef4444', 10), 18, 72, '4.6s', 1.1)]),
    velocimetro: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_velocimetro" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#334155"/><stop offset="100%" stop-color="#0b0f17"/></radialGradient>
        <linearGradient id="l_velocimetro" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_velocimetro)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_velocimetro)" transform="rotate(-18 116 96)"/>
      <path d="M80 166a64 64 0 1 1 120 0" stroke="#e2e8f0" stroke-width="14" stroke-linecap="round"/><path d="M140 158l36-44" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/><circle cx="140" cy="158" r="12" fill="#f97316"/>
    </svg>`, [K.f(K.spark('#ef4444'), 14, 20, '3.6s', 1.2), K.f(K.spark('#facc15'), 82, 22, '4.2s', 1.4), K.f(K.dot('#ef4444', 14), 80, 76, '5s', .9), K.f(K.dot('#facc15', 10), 18, 72, '4.6s', 1.1)])
  };
})();
