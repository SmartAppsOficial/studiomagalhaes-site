/* 10 animações 3D exclusivas · Arquitetura, engenharia e reformas */
(() => {
  'use strict';
  const K = window.CENA_KIT;
  window.CENAS_NOMES = {
  "casa": "Casa moderna 3D",
  "planta": "Planta baixa 3D",
  "esquadro": "Esquadro & compasso 3D",
  "predio": "Edifício contemporâneo 3D",
  "cubo": "Maquete 3D",
  "paleta": "Materiais & texturas 3D",
  "capacete": "Obra & engenharia 3D",
  "luminaria": "Iluminação interiores 3D",
  "sofa": "Design de interiores 3D",
  "chave": "Chaves na mão 3D"
};
  window.CENAS = {
    casa: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_casa" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#5c4033"/><stop offset="100%" stop-color="#1c1410"/></radialGradient>
        <linearGradient id="l_casa" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_casa)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_casa)" transform="rotate(-18 116 96)"/>
      <polygon points="140,68 206,122 74,122" fill="#d4a373" stroke="#fef3c7" stroke-width="4"/><rect x="88" y="122" width="104" height="72" rx="6" fill="#f5efe6"/><rect x="124" y="144" width="32" height="50" rx="4" fill="#6b4f3a"/><rect x="98" y="138" width="18" height="22" rx="3" fill="#93c5fd"/>
    </svg>`, [K.f(K.spark('#e9c46a'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#e9c46a', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    planta: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_planta" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a5f"/><stop offset="100%" stop-color="#0a1628"/></radialGradient>
        <linearGradient id="l_planta" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_planta)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_planta)" transform="rotate(-18 116 96)"/>
      <rect x="80" y="80" width="120" height="114" rx="10" fill="#1e3a5f" stroke="#e9c46a" stroke-width="4"/><path d="M96 96h88v82H96zM140 96v50M96 146h54" stroke="#bae6fd" stroke-width="5"/>
    </svg>`, [K.f(K.spark('#7dd3fc'), 14, 20, '3.6s', 1.2), K.f(K.spark('#e9c46a'), 82, 22, '4.2s', 1.4), K.f(K.dot('#7dd3fc', 14), 80, 76, '5s', .9), K.f(K.dot('#e9c46a', 10), 18, 72, '4.6s', 1.1)]),
    esquadro: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_esquadro" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#4a3728"/><stop offset="100%" stop-color="#17110d"/></radialGradient>
        <linearGradient id="l_esquadro" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_esquadro)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_esquadro)" transform="rotate(-18 116 96)"/>
      <polygon points="88,188 88,78 198,188" fill="#e9c46a" stroke="#fef3c7" stroke-width="4"/><polygon points="112,166 112,126 152,166" fill="#2c241e"/>
    </svg>`, [K.f(K.spark('#e9c46a'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#e9c46a', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    predio: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_predio" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#3e322a"/><stop offset="100%" stop-color="#14100d"/></radialGradient>
        <linearGradient id="l_predio" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_predio)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_predio)" transform="rotate(-18 116 96)"/>
      <rect x="96" y="68" width="88" height="128" rx="8" fill="#e5e7eb" stroke="#a88b6d" stroke-width="4"/><rect x="110" y="86" width="22" height="18" rx="3" fill="#38bdf8"/><rect x="148" y="86" width="22" height="18" rx="3" fill="#38bdf8"/><rect x="110" y="116" width="22" height="18" rx="3" fill="#38bdf8"/><rect x="148" y="116" width="22" height="18" rx="3" fill="#38bdf8"/><rect x="126" y="152" width="28" height="44" rx="4" fill="#6b4f3a"/>
    </svg>`, [K.f(K.spark('#7dd3fc'), 14, 20, '3.6s', 1.2), K.f(K.spark('#e9c46a'), 82, 22, '4.2s', 1.4), K.f(K.dot('#7dd3fc', 14), 80, 76, '5s', .9), K.f(K.dot('#e9c46a', 10), 18, 72, '4.6s', 1.1)]),
    cubo: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_cubo" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#4a3728"/><stop offset="100%" stop-color="#17110d"/></radialGradient>
        <linearGradient id="l_cubo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_cubo)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_cubo)" transform="rotate(-18 116 96)"/>
      <polygon points="140,70 198,104 140,138 82,104" fill="#f5efe6"/><polygon points="82,104 140,138 140,202 82,168" fill="#d4a373"/><polygon points="198,104 140,138 140,202 198,168" fill="#8c6849"/>
    </svg>`, [K.f(K.spark('#fef3c7'), 14, 20, '3.6s', 1.2), K.f(K.spark('#d4a373'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fef3c7', 14), 80, 76, '5s', .9), K.f(K.dot('#d4a373', 10), 18, 72, '4.6s', 1.1)]),
    paleta: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_paleta" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#3e322a"/><stop offset="100%" stop-color="#16110e"/></radialGradient>
        <linearGradient id="l_paleta" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_paleta)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_paleta)" transform="rotate(-18 116 96)"/>
      <rect x="82" y="92" width="60" height="90" rx="10" fill="#f5efe6" transform="rotate(-14 112 137)"/><rect x="112" y="88" width="60" height="90" rx="10" fill="#d4a373"/><rect x="142" y="94" width="60" height="90" rx="10" fill="#6b4f3a" transform="rotate(14 172 139)"/>
    </svg>`, [K.f(K.spark('#e9c46a'), 14, 20, '3.6s', 1.2), K.f(K.spark('#f5efe6'), 82, 22, '4.2s', 1.4), K.f(K.dot('#e9c46a', 14), 80, 76, '5s', .9), K.f(K.dot('#f5efe6', 10), 18, 72, '4.6s', 1.1)]),
    capacete: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_capacete" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#5c4033"/><stop offset="100%" stop-color="#1c1410"/></radialGradient>
        <linearGradient id="l_capacete" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_capacete)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_capacete)" transform="rotate(-18 116 96)"/>
      <path d="M80 154a60 60 0 0 1 120 0z" fill="#f59e0b" stroke="#fef3c7" stroke-width="4"/><rect x="70" y="152" width="140" height="16" rx="8" fill="#d97706"/><rect x="130" y="96" width="20" height="46" rx="8" fill="#fef3c7"/>
    </svg>`, [K.f(K.spark('#fde047'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde047', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    luminaria: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_luminaria" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#3b2e26"/><stop offset="100%" stop-color="#140f0c"/></radialGradient>
        <linearGradient id="l_luminaria" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_luminaria)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_luminaria)" transform="rotate(-18 116 96)"/>
      <line x1="140" y1="62" x2="140" y2="106" stroke="#d4a373" stroke-width="5"/><path d="M96 154c4-32 22-48 44-48s40 16 44 48z" fill="#e9c46a" stroke="#fef3c7" stroke-width="4"/><circle cx="140" cy="160" r="14" fill="#fef08a"/>
    </svg>`, [K.f(K.spark('#fef08a'), 14, 20, '3.6s', 1.2), K.f(K.spark('#e9c46a'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fef08a', 14), 80, 76, '5s', .9), K.f(K.dot('#e9c46a', 10), 18, 72, '4.6s', 1.1)]),
    sofa: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_sofa" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#4a3728"/><stop offset="100%" stop-color="#17110d"/></radialGradient>
        <linearGradient id="l_sofa" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_sofa)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_sofa)" transform="rotate(-18 116 96)"/>
      <rect x="82" y="112" width="116" height="42" rx="14" fill="#d4a373" stroke="#fef3c7" stroke-width="3"/><rect x="74" y="138" width="132" height="32" rx="12" fill="#b08968"/><path d="M92 170v18M188 170v18" stroke="#6b4f3a" stroke-width="8" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#f5efe6'), 14, 20, '3.6s', 1.2), K.f(K.spark('#d4a373'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f5efe6', 14), 80, 76, '5s', .9), K.f(K.dot('#d4a373', 10), 18, 72, '4.6s', 1.1)]),
    chave: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_chave" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#4a3728"/><stop offset="100%" stop-color="#16100c"/></radialGradient>
        <linearGradient id="l_chave" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_chave)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_chave)" transform="rotate(-18 116 96)"/>
      <circle cx="110" cy="136" r="28" stroke="#f2c46d" stroke-width="11"/><path d="M138 136h64M176 136v20M194 136v14" stroke="#f2c46d" stroke-width="11" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#fef08a'), 14, 20, '3.6s', 1.2), K.f(K.spark('#f2c46d'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fef08a', 14), 80, 76, '5s', .9), K.f(K.dot('#f2c46d', 10), 18, 72, '4.6s', 1.1)])
  };
})();
