/* 10 animações 3D exclusivas · Escritório (advocacia e contabilidade) */
(() => {
  'use strict';
  const K = window.CENA_KIT;
  window.CENAS_NOMES = {
  "balanca": "Balança da justiça 3D",
  "martelo": "Martelo jurídico 3D",
  "documento": "Contrato assinado 3D",
  "grafico": "Crescimento contábil 3D",
  "maleta": "Maleta executiva 3D",
  "escudo": "Blindagem jurídica 3D",
  "caneta": "Caneta tinteiro 3D",
  "coluna": "Coluna clássica 3D",
  "relogio": "Consultoria executiva 3D",
  "selo": "Selo de excelência 3D"
};
  window.CENAS = {
    balanca: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_balanca" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0a101d"/></radialGradient>
        <linearGradient id="l_balanca" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_balanca)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_balanca)" transform="rotate(-18 116 96)"/>
      <path d="M140 72v124M104 196h72M82 100h116" stroke="#f2c46d" stroke-width="8" stroke-linecap="round"/><path d="M88 100l-20 44a24 24 0 0 0 40 0zM192 100l-20 44a24 24 0 0 0 40 0z" fill="#d4a353" stroke="#fef08a" stroke-width="3"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#93c5fd'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#93c5fd', 10), 18, 72, '4.6s', 1.1)]),
    martelo: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_martelo" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0a0f1c"/></radialGradient>
        <linearGradient id="l_martelo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_martelo)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_martelo)" transform="rotate(-18 116 96)"/>
      <rect x="92" y="82" width="74" height="36" rx="10" fill="#b45309" stroke="#f2c46d" stroke-width="4" transform="rotate(-30 129 100)"/><path d="M138 118l56 56" stroke="#d4a353" stroke-width="14" stroke-linecap="round"/><rect x="86" y="182" width="74" height="16" rx="6" fill="#f2c46d"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    documento: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_documento" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e3a5f"/><stop offset="100%" stop-color="#0a1424"/></radialGradient>
        <linearGradient id="l_documento" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_documento)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_documento)" transform="rotate(-18 116 96)"/>
      <rect x="92" y="68" width="96" height="132" rx="12" fill="#f8fafc" stroke="#d4a353" stroke-width="4"/><path d="M110 102h60M110 124h60M110 146h42" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/><circle cx="164" cy="172" r="18" fill="#d4a353"/><path d="M156 172l6 6 12-12" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#bae6fd'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#bae6fd', 10), 18, 72, '4.6s', 1.1)]),
    grafico: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_grafico" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#09101d"/></radialGradient>
        <linearGradient id="l_grafico" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_grafico)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_grafico)" transform="rotate(-18 116 96)"/>
      <rect x="88" y="146" width="24" height="44" rx="6" fill="#38bdf8"/><rect x="128" y="118" width="24" height="72" rx="6" fill="#60a5fa"/><rect x="168" y="84" width="24" height="106" rx="6" fill="#f2c46d"/><path d="M88 124l42-26 48-26" stroke="#fef08a" stroke-width="6" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    maleta: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_maleta" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#090e18"/></radialGradient>
        <linearGradient id="l_maleta" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_maleta)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_maleta)" transform="rotate(-18 116 96)"/>
      <rect x="78" y="102" width="124" height="84" rx="14" fill="#334155" stroke="#f2c46d" stroke-width="4"/><path d="M116 102V86a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v16" stroke="#f2c46d" stroke-width="8"/><rect x="128" y="132" width="24" height="18" rx="4" fill="#f2c46d"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#cbd5e1'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#cbd5e1', 10), 18, 72, '4.6s', 1.1)]),
    escudo: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_escudo" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#172554"/><stop offset="100%" stop-color="#080e24"/></radialGradient>
        <linearGradient id="l_escudo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_escudo)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_escudo)" transform="rotate(-18 116 96)"/>
      <path d="M140 66l62 24v46c0 40-26 66-62 78-36-12-62-38-62-78V90z" fill="#1e3a8a" stroke="#f2c46d" stroke-width="5"/><path d="M116 136l16 16 34-34" stroke="#f2c46d" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#60a5fa'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#60a5fa', 10), 18, 72, '4.6s', 1.1)]),
    caneta: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_caneta" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0a101d"/></radialGradient>
        <linearGradient id="l_caneta" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_caneta)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_caneta)" transform="rotate(-18 116 96)"/>
      <path d="M188 78l14 14-74 74-30 10 10-30z" fill="#f2c46d" stroke="#fef08a" stroke-width="3"/><path d="M104 172c24 22 52 8 82 14" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#38bdf8'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#38bdf8', 10), 18, 72, '4.6s', 1.1)]),
    coluna: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_coluna" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0a0f1c"/></radialGradient>
        <linearGradient id="l_coluna" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_coluna)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_coluna)" transform="rotate(-18 116 96)"/>
      <rect x="92" y="76" width="96" height="18" rx="6" fill="#f2c46d"/><rect x="104" y="94" width="72" height="84" fill="#e2e8f0"/><path d="M120 94v84M140 94v84M160 94v84" stroke="#94a3b8" stroke-width="5"/><rect x="88" y="178" width="104" height="18" rx="6" fill="#f2c46d"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    relogio: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_relogio" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#090e18"/></radialGradient>
        <linearGradient id="l_relogio" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_relogio)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_relogio)" transform="rotate(-18 116 96)"/>
      <circle cx="140" cy="136" r="56" fill="#0f172a" stroke="#f2c46d" stroke-width="7"/><path d="M140 136V102M140 136l24 14" stroke="#f8fafc" stroke-width="7" stroke-linecap="round"/><circle cx="140" cy="136" r="7" fill="#f2c46d"/>
    </svg>`, [K.f(K.spark('#f2c46d'), 14, 20, '3.6s', 1.2), K.f(K.spark('#ffffff'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f2c46d', 14), 80, 76, '5s', .9), K.f(K.dot('#ffffff', 10), 18, 72, '4.6s', 1.1)]),
    selo: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_selo" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0a101d"/></radialGradient>
        <linearGradient id="l_selo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_selo)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_selo)" transform="rotate(-18 116 96)"/>
      <circle cx="140" cy="126" r="46" fill="#f2c46d" stroke="#fef08a" stroke-width="5"/><path d="M118 168l-12 36 34-14 34 14-12-36" fill="#1d4ed8"/><path d="M122 126l12 12 26-26" stroke="#1e293b" stroke-width="8" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#fef08a'), 14, 20, '3.6s', 1.2), K.f(K.spark('#60a5fa'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fef08a', 14), 80, 76, '5s', .9), K.f(K.dot('#60a5fa', 10), 18, 72, '4.6s', 1.1)])
  };
})();
