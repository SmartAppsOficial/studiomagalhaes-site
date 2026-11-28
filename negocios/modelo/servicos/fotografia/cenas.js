/* 10 animações 3D exclusivas · Fotografia e eventos */
(() => {
  'use strict';
  const K = window.CENA_KIT;
  window.CENAS_NOMES = {
  "camera": "Câmera mirrorless 3D",
  "lente": "Lente prime 3D",
  "flash": "Flash estúdio 3D",
  "polaroid": "Álbum & polaroid 3D",
  "claquete": "Filmagem & vídeo 3D",
  "aliancas": "Casamentos & eventos 3D",
  "tripe": "Estúdio completo 3D",
  "drone": "Foto aérea 3D",
  "quadro": "Ensaio editorial 3D",
  "estrela": "Luz dourada 3D"
};
  window.CENAS = {
    camera: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_camera" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#4c1d95"/><stop offset="100%" stop-color="#15082e"/></radialGradient>
        <linearGradient id="l_camera" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_camera)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_camera)" transform="rotate(-18 116 96)"/>
      <rect x="76" y="96" width="128" height="88" rx="18" fill="#1f2937" stroke="#f472b6" stroke-width="4"/><rect x="114" y="78" width="52" height="20" rx="8" fill="#334155"/><circle cx="140" cy="140" r="30" fill="#0f172a" stroke="#e2e8f0" stroke-width="6"/><circle cx="140" cy="140" r="14" fill="#38bdf8"/><circle cx="182" cy="114" r="6" fill="#f43f5e"/>
    </svg>`, [K.f(K.spark('#f9a8d4'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f9a8d4', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    lente: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_lente" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#3b0764"/><stop offset="100%" stop-color="#120321"/></radialGradient>
        <linearGradient id="l_lente" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_lente)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_lente)" transform="rotate(-18 116 96)"/>
      <circle cx="140" cy="136" r="62" fill="#111827" stroke="#cbd5e1" stroke-width="10"/><circle cx="140" cy="136" r="40" fill="#312e81" stroke="#c084fc" stroke-width="5"/><circle cx="140" cy="136" r="18" fill="#0f172a"/><circle cx="128" cy="122" r="7" fill="rgba(255,255,255,.7)"/>
    </svg>`, [K.f(K.spark('#e879f9'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#e879f9', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    flash: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_flash" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#4c1d95"/><stop offset="100%" stop-color="#16092e"/></radialGradient>
        <linearGradient id="l_flash" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_flash)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_flash)" transform="rotate(-18 116 96)"/>
      <rect x="96" y="78" width="88" height="58" rx="12" fill="#f8fafc" stroke="#f59e0b" stroke-width="4"/><polygon points="146,88 128,110 142,110 134,128 156,104 142,104" fill="#f59e0b"/><rect x="132" y="136" width="16" height="62" rx="6" fill="#334155"/>
    </svg>`, [K.f(K.spark('#fde047'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde047', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    polaroid: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_polaroid" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#701a75"/><stop offset="100%" stop-color="#210724"/></radialGradient>
        <linearGradient id="l_polaroid" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_polaroid)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_polaroid)" transform="rotate(-18 116 96)"/>
      <rect x="86" y="74" width="108" height="128" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="4" transform="rotate(-6 140 138)"/><rect x="98" y="88" width="84" height="78" rx="4" fill="#f472b6" transform="rotate(-6 140 138)"/><circle cx="154" cy="112" r="12" fill="#fef08a"/>
    </svg>`, [K.f(K.spark('#f9a8d4'), 14, 20, '3.6s', 1.2), K.f(K.spark('#fde047'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f9a8d4', 14), 80, 76, '5s', .9), K.f(K.dot('#fde047', 10), 18, 72, '4.6s', 1.1)]),
    claquete: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_claquete" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#312e81"/><stop offset="100%" stop-color="#0f0e2e"/></radialGradient>
        <linearGradient id="l_claquete" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_claquete)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_claquete)" transform="rotate(-18 116 96)"/>
      <rect x="82" y="110" width="116" height="82" rx="10" fill="#1e293b" stroke="#f8fafc" stroke-width="4"/><rect x="82" y="84" width="116" height="26" rx="6" fill="#f8fafc" transform="rotate(-8 140 97)"/><path d="M104 82l14 26M136 78l14 26M168 74l14 26" stroke="#111827" stroke-width="8"/>
    </svg>`, [K.f(K.spark('#f8fafc'), 14, 20, '3.6s', 1.2), K.f(K.spark('#c084fc'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f8fafc', 14), 80, 76, '5s', .9), K.f(K.dot('#c084fc', 10), 18, 72, '4.6s', 1.1)]),
    aliancas: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_aliancas" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#581c87"/><stop offset="100%" stop-color="#1a0729"/></radialGradient>
        <linearGradient id="l_aliancas" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_aliancas)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_aliancas)" transform="rotate(-18 116 96)"/>
      <circle cx="118" cy="140" r="36" stroke="#fbbf24" stroke-width="11"/><circle cx="162" cy="140" r="36" stroke="#fde68a" stroke-width="11"/><polygon points="118,90 130,104 118,114 106,104" fill="#ffffff"/>
    </svg>`, [K.f(K.spark('#fde047'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde047', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    tripe: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_tripe" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#3b0764"/><stop offset="100%" stop-color="#140424"/></radialGradient>
        <linearGradient id="l_tripe" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_tripe)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_tripe)" transform="rotate(-18 116 96)"/>
      <rect x="108" y="82" width="64" height="44" rx="10" fill="#e2e8f0" stroke="#c084fc" stroke-width="4"/><path d="M140 126l-44 74M140 126v74M140 126l44 74" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#c084fc'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#c084fc', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    drone: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_drone" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#08122e"/></radialGradient>
        <linearGradient id="l_drone" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_drone)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_drone)" transform="rotate(-18 116 96)"/>
      <rect x="116" y="116" width="48" height="36" rx="12" fill="#f8fafc" stroke="#38bdf8" stroke-width="4"/><path d="M84 96l34 24M196 96l-34 24M84 172l34-24M196 172l-34-24" stroke="#cbd5e1" stroke-width="7" stroke-linecap="round"/><circle cx="84" cy="96" r="14" stroke="#38bdf8" stroke-width="5"/><circle cx="196" cy="96" r="14" stroke="#38bdf8" stroke-width="5"/><circle cx="84" cy="172" r="14" stroke="#38bdf8" stroke-width="5"/><circle cx="196" cy="172" r="14" stroke="#38bdf8" stroke-width="5"/>
    </svg>`, [K.f(K.spark('#38bdf8'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#38bdf8', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    quadro: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_quadro" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#4c1d95"/><stop offset="100%" stop-color="#15082e"/></radialGradient>
        <linearGradient id="l_quadro" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_quadro)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_quadro)" transform="rotate(-18 116 96)"/>
      <rect x="86" y="80" width="108" height="114" rx="8" fill="#1e1b4b" stroke="#f2c46d" stroke-width="9"/><circle cx="140" cy="122" r="18" fill="#f9a8d4"/><path d="M108 176c8-24 56-24 64 0" fill="#c084fc"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#f9a8d4'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#f9a8d4', 10), 18, 72, '4.6s', 1.1)]),
    estrela: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_estrela" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#581c87"/><stop offset="100%" stop-color="#1c082e"/></radialGradient>
        <linearGradient id="l_estrela" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_estrela)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_estrela)" transform="rotate(-18 116 96)"/>
      <polygon points="140,64 162,116 218,122 174,158 188,212 140,182 92,212 106,158 62,122 118,116" fill="#fbbf24" stroke="#fef08a" stroke-width="4"/>
    </svg>`, [K.f(K.spark('#fef08a'), 14, 20, '3.6s', 1.2), K.f(K.spark('#f472b6'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fef08a', 14), 80, 76, '5s', .9), K.f(K.dot('#f472b6', 10), 18, 72, '4.6s', 1.1)])
  };
})();
