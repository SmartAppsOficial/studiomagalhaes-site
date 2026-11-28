/* 10 animações 3D exclusivas · Autoescola e cursos */
(() => {
  'use strict';
  const K = window.CENA_KIT;
  window.CENAS_NOMES = {
  "volante": "Volante 3D",
  "carro": "Carro escola 3D",
  "moto": "Moto categoria A 3D",
  "semaforo": "Semáforo 3D",
  "placa": "Placa trânsito 3D",
  "cnh": "Habilitação CNH 3D",
  "cone": "Baliza & cones 3D",
  "capacete": "Capacete seguro 3D",
  "estrada": "Rota livre 3D",
  "trofeu": "Aprovação Detran 3D"
};
  window.CENAS = {
    volante: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_volante" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a5f"/><stop offset="100%" stop-color="#0a1628"/></radialGradient>
        <linearGradient id="l_volante" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_volante)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_volante)" transform="rotate(-18 116 96)"/>
      <circle cx="140" cy="136" r="62" stroke="#f59e0b" stroke-width="14"/><circle cx="140" cy="136" r="18" fill="#1e293b" stroke="#facc15" stroke-width="4"/><path d="M84 128h38M158 128h38M140 154v44" stroke="#f59e0b" stroke-width="11" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#facc15'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#facc15', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    carro: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_carro" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a5f"/><stop offset="100%" stop-color="#091526"/></radialGradient>
        <linearGradient id="l_carro" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_carro)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_carro)" transform="rotate(-18 116 96)"/>
      <path d="M72 150l18-32c6-10 16-16 28-16h44c12 0 22 6 28 16l18 32v22H72z" fill="#f59e0b" stroke="#fef3c7" stroke-width="4"/><rect x="122" y="84" width="36" height="16" rx="4" fill="#ffffff"/><circle cx="104" cy="174" r="17" fill="#111827" stroke="#e2e8f0" stroke-width="5"/><circle cx="176" cy="174" r="17" fill="#111827" stroke="#e2e8f0" stroke-width="5"/>
    </svg>`, [K.f(K.spark('#fde047'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde047', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    moto: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_moto" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0a101d"/></radialGradient>
        <linearGradient id="l_moto" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_moto)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_moto)" transform="rotate(-18 116 96)"/>
      <circle cx="96" cy="164" r="24" stroke="#e2e8f0" stroke-width="8"/><circle cx="184" cy="164" r="24" stroke="#e2e8f0" stroke-width="8"/><path d="M96 164l28-36h40l20 36M148 104h22l14 60" stroke="#f59e0b" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`, [K.f(K.spark('#f59e0b'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f59e0b', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    semaforo: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_semaforo" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a5f"/><stop offset="100%" stop-color="#0a1426"/></radialGradient>
        <linearGradient id="l_semaforo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_semaforo)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_semaforo)" transform="rotate(-18 116 96)"/>
      <rect x="112" y="68" width="56" height="136" rx="18" fill="#1e293b" stroke="#cbd5e1" stroke-width="4"/><circle cx="140" cy="98" r="14" fill="#ef4444"/><circle cx="140" cy="136" r="14" fill="#facc15"/><circle cx="140" cy="174" r="14" fill="#22c55e"/>
    </svg>`, [K.f(K.spark('#22c55e'), 14, 20, '3.6s', 1.2), K.f(K.spark('#facc15'), 82, 22, '4.2s', 1.4), K.f(K.dot('#22c55e', 14), 80, 76, '5s', .9), K.f(K.dot('#facc15', 10), 18, 72, '4.6s', 1.1)]),
    placa: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_placa" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a5f"/><stop offset="100%" stop-color="#0a1526"/></radialGradient>
        <linearGradient id="l_placa" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_placa)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_placa)" transform="rotate(-18 116 96)"/>
      <rect x="96" y="92" width="88" height="88" rx="10" fill="#facc15" stroke="#111827" stroke-width="5" transform="rotate(45 140 136)"/><path d="M140 162v-44M124 134l16-16 16 16" stroke="#111827" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`, [K.f(K.spark('#facc15'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#facc15', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    cnh: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_cnh" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#166534"/><stop offset="100%" stop-color="#082213"/></radialGradient>
        <linearGradient id="l_cnh" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_cnh)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_cnh)" transform="rotate(-18 116 96)"/>
      <rect x="74" y="92" width="132" height="88" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/><rect x="88" y="110" width="34" height="44" rx="6" fill="#22c55e"/><path d="M134 118h56M134 136h44M134 154h36" stroke="#14532d" stroke-width="6" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#86efac'), 14, 20, '3.6s', 1.2), K.f(K.spark('#facc15'), 82, 22, '4.2s', 1.4), K.f(K.dot('#86efac', 14), 80, 76, '5s', .9), K.f(K.dot('#facc15', 10), 18, 72, '4.6s', 1.1)]),
    cone: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_cone" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a5f"/><stop offset="100%" stop-color="#0a1526"/></radialGradient>
        <linearGradient id="l_cone" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_cone)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_cone)" transform="rotate(-18 116 96)"/>
      <polygon points="140,72 178,186 102,186" fill="#f97316" stroke="#fed7aa" stroke-width="4"/><rect x="116" y="122" width="48" height="16" fill="#ffffff"/><rect x="88" y="184" width="104" height="14" rx="6" fill="#ea580c"/>
    </svg>`, [K.f(K.spark('#fb923c'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fb923c', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    capacete: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_capacete" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0a0f1c"/></radialGradient>
        <linearGradient id="l_capacete" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_capacete)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_capacete)" transform="rotate(-18 116 96)"/>
      <path d="M84 146a56 56 0 1 1 112 0v22c0 12-10 20-22 20h-68c-12 0-22-8-22-20z" fill="#f59e0b" stroke="#fef3c7" stroke-width="4"/><path d="M136 124h58v28h-58a14 14 0 0 1 0-28z" fill="#0f172a"/>
    </svg>`, [K.f(K.spark('#facc15'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#facc15', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    estrada: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_estrada" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a5f"/><stop offset="100%" stop-color="#0a1424"/></radialGradient>
        <linearGradient id="l_estrada" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_estrada)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_estrada)" transform="rotate(-18 116 96)"/>
      <polygon points="118,74 162,74 198,196 82,196" fill="#334155" stroke="#e2e8f0" stroke-width="4"/><path d="M140 88v22M140 126v24M140 166v24" stroke="#facc15" stroke-width="7" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#facc15'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#facc15', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    trofeu: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_trofeu" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a5f"/><stop offset="100%" stop-color="#0a1526"/></radialGradient>
        <linearGradient id="l_trofeu" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_trofeu)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_trofeu)" transform="rotate(-18 116 96)"/>
      <path d="M98 78h84v40a42 42 0 0 1-84 0z" fill="#f59e0b" stroke="#fef08a" stroke-width="4"/><path d="M124 114l12 12 22-24" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/><rect x="130" y="158" width="20" height="28" fill="#d97706"/><rect x="106" y="186" width="68" height="16" rx="6" fill="#b45309"/>
    </svg>`, [K.f(K.spark('#fde047'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde047', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)])
  };
})();
