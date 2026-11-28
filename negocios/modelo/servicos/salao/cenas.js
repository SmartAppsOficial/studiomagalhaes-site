/* 10 animações 3D exclusivas · Salão de beleza e estética */
(() => {
  'use strict';
  const K = window.CENA_KIT;
  window.CENAS_NOMES = {
  "secador": "Secador profissional 3D",
  "tesoura": "Tesoura dourada 3D",
  "esmalte": "Esmalte de luxo 3D",
  "pincel": "Pincel de make 3D",
  "serum": "Sérum estética 3D",
  "espelho": "Espelho camarim 3D",
  "flor": "Lótus spa 3D",
  "escova": "Escova modeladora 3D",
  "diamante": "Brilho estética 3D",
  "coroa": "Coroa beleza 3D"
};
  window.CENAS = {
    secador: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_secador" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#831843"/><stop offset="100%" stop-color="#2e0818"/></radialGradient>
        <linearGradient id="l_secador" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_secador)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_secador)" transform="rotate(-18 116 96)"/>
      <path d="M90 100h86c22 0 34 14 34 28s-12 28-34 28H90z" fill="#f472b6" stroke="#fbcfe8" stroke-width="4"/><path d="M136 156l-10 46h24l10-46z" fill="#1f2937"/><path d="M74 116h-16M74 128h-22M74 140h-16" stroke="#fde68a" stroke-width="5" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#f9a8d4'), 14, 20, '3.6s', 1.2), K.f(K.spark('#fde68a'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f9a8d4', 14), 80, 76, '5s', .9), K.f(K.dot('#fde68a', 10), 18, 72, '4.6s', 1.1)]),
    tesoura: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_tesoura" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#9d174d"/><stop offset="100%" stop-color="#310919"/></radialGradient>
        <linearGradient id="l_tesoura" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_tesoura)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_tesoura)" transform="rotate(-18 116 96)"/>
      <circle cx="104" cy="178" r="20" stroke="#fde68a" stroke-width="8"/><circle cx="176" cy="178" r="20" stroke="#fde68a" stroke-width="8"/><path d="M114 160l54-88M166 160l-54-88" stroke="#fff1f2" stroke-width="10" stroke-linecap="round"/>
    </svg>`, [K.f(K.spark('#fde68a'), 14, 20, '3.6s', 1.2), K.f(K.spark('#f9a8d4'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde68a', 14), 80, 76, '5s', .9), K.f(K.dot('#f9a8d4', 10), 18, 72, '4.6s', 1.1)]),
    esmalte: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_esmalte" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#881337"/><stop offset="100%" stop-color="#2b0714"/></radialGradient>
        <linearGradient id="l_esmalte" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_esmalte)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_esmalte)" transform="rotate(-18 116 96)"/>
      <rect x="108" y="124" width="64" height="72" rx="14" fill="#e11d48" stroke="#fda4af" stroke-width="4"/><rect x="128" y="72" width="24" height="52" rx="6" fill="#111827" stroke="#fde68a" stroke-width="3"/><rect x="120" y="138" width="12" height="42" rx="6" fill="rgba(255,255,255,.35)"/>
    </svg>`, [K.f(K.spark('#fda4af'), 14, 20, '3.6s', 1.2), K.f(K.spark('#fde68a'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fda4af', 14), 80, 76, '5s', .9), K.f(K.dot('#fde68a', 10), 18, 72, '4.6s', 1.1)]),
    pincel: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_pincel" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#701a75"/><stop offset="100%" stop-color="#250828"/></radialGradient>
        <linearGradient id="l_pincel" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_pincel)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_pincel)" transform="rotate(-18 116 96)"/>
      <path d="M140 68c22 0 34 20 26 42h-52c-8-22 4-42 26-42z" fill="#f9a8d4" stroke="#fff" stroke-width="3"/><rect x="122" y="110" width="36" height="22" rx="4" fill="#fbbf24"/><rect x="130" y="132" width="20" height="70" rx="10" fill="#1e293b"/>
    </svg>`, [K.f(K.spark('#f9a8d4'), 14, 20, '3.6s', 1.2), K.f(K.spark('#fbbf24'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f9a8d4', 14), 80, 76, '5s', .9), K.f(K.dot('#fbbf24', 10), 18, 72, '4.6s', 1.1)]),
    serum: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_serum" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#78350f"/><stop offset="100%" stop-color="#271104"/></radialGradient>
        <linearGradient id="l_serum" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_serum)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_serum)" transform="rotate(-18 116 96)"/>
      <rect x="110" y="114" width="60" height="82" rx="18" fill="#fef3c7" stroke="#f59e0b" stroke-width="4"/><rect x="128" y="84" width="24" height="30" rx="6" fill="#f59e0b"/><path d="M140 62c8 12 10 18 10 22a10 10 0 0 1-20 0c0-4 2-10 10-22z" fill="#fde047"/>
    </svg>`, [K.f(K.spark('#fde68a'), 14, 20, '3.6s', 1.2), K.f(K.spark('#f9a8d4'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde68a', 14), 80, 76, '5s', .9), K.f(K.dot('#f9a8d4', 10), 18, 72, '4.6s', 1.1)]),
    espelho: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_espelho" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#9d174d"/><stop offset="100%" stop-color="#2d0a1a"/></radialGradient>
        <linearGradient id="l_espelho" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_espelho)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_espelho)" transform="rotate(-18 116 96)"/>
      <ellipse cx="140" cy="122" rx="52" ry="62" fill="#e0f2fe" stroke="#fde68a" stroke-width="8"/><path d="M114 96l40 52M130 88l30 38" stroke="rgba(255,255,255,.65)" stroke-width="7" stroke-linecap="round"/><rect x="132" y="184" width="16" height="28" rx="6" fill="#fde68a"/>
    </svg>`, [K.f(K.spark('#ffffff'), 14, 20, '3.6s', 1.2), K.f(K.spark('#fde68a'), 82, 22, '4.2s', 1.4), K.f(K.dot('#ffffff', 14), 80, 76, '5s', .9), K.f(K.dot('#fde68a', 10), 18, 72, '4.6s', 1.1)]),
    flor: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_flor" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#831843"/><stop offset="100%" stop-color="#270716"/></radialGradient>
        <linearGradient id="l_flor" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_flor)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_flor)" transform="rotate(-18 116 96)"/>
      <path d="M140 72c18 28 24 56 0 88-24-32-18-60 0-88z" fill="#f472b6"/><path d="M140 160c-34-10-56-30-56-56 26 4 46 22 56 56zM140 160c34-10 56-30 56-56-26 4-46 22-56 56z" fill="#fbcfe8"/><circle cx="140" cy="166" r="14" fill="#fde047"/>
    </svg>`, [K.f(K.spark('#fbcfe8'), 14, 20, '3.6s', 1.2), K.f(K.spark('#fde047'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fbcfe8', 14), 80, 76, '5s', .9), K.f(K.dot('#fde047', 10), 18, 72, '4.6s', 1.1)]),
    escova: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_escova" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#701a75"/><stop offset="100%" stop-color="#230826"/></radialGradient>
        <linearGradient id="l_escova" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_escova)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_escova)" transform="rotate(-18 116 96)"/>
      <ellipse cx="140" cy="108" rx="34" ry="44" fill="#be185d" stroke="#fbcfe8" stroke-width="4"/><rect x="131" y="150" width="18" height="58" rx="9" fill="#1f2937"/><circle cx="128" cy="96" r="4" fill="#fde68a"/><circle cx="152" cy="96" r="4" fill="#fde68a"/><circle cx="140" cy="112" r="4" fill="#fde68a"/><circle cx="128" cy="126" r="4" fill="#fde68a"/><circle cx="152" cy="126" r="4" fill="#fde68a"/>
    </svg>`, [K.f(K.spark('#f9a8d4'), 14, 20, '3.6s', 1.2), K.f(K.spark('#fde68a'), 82, 22, '4.2s', 1.4), K.f(K.dot('#f9a8d4', 14), 80, 76, '5s', .9), K.f(K.dot('#fde68a', 10), 18, 72, '4.6s', 1.1)]),
    diamante: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_diamante" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#831843"/><stop offset="100%" stop-color="#290918"/></radialGradient>
        <linearGradient id="l_diamante" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_diamante)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_diamante)" transform="rotate(-18 116 96)"/>
      <polygon points="140,66 198,118 140,204 82,118" fill="#fbcfe8" stroke="#fff" stroke-width="4"/><polygon points="140,66 168,118 140,204 112,118" fill="#f472b6" opacity=".65"/><line x1="82" y1="118" x2="198" y2="118" stroke="#fff" stroke-width="3"/>
    </svg>`, [K.f(K.spark('#ffffff'), 14, 20, '3.6s', 1.2), K.f(K.spark('#f9a8d4'), 82, 22, '4.2s', 1.4), K.f(K.dot('#ffffff', 14), 80, 76, '5s', .9), K.f(K.dot('#f9a8d4', 10), 18, 72, '4.6s', 1.1)]),
    coroa: () => K.mk(`<svg viewBox="0 0 280 280" fill="none">
      <defs>
        <radialGradient id="g_coroa" cx="35%" cy="28%" r="72%"><stop offset="0%" stop-color="#9d174d"/><stop offset="100%" stop-color="#2b0918"/></radialGradient>
        <linearGradient id="l_coroa" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".45"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      </defs>
      <ellipse cx="140" cy="242" rx="76" ry="15" fill="rgba(0,0,0,.38)"/>
      <circle cx="140" cy="134" r="96" fill="url(#g_coroa)" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
      <ellipse cx="116" cy="96" rx="54" ry="28" fill="url(#l_coroa)" transform="rotate(-18 116 96)"/>
      <path d="M84 166l14-66 42 32 42-32 14 66z" fill="#fbbf24" stroke="#fef3c7" stroke-width="4"/><rect x="88" y="166" width="104" height="18" rx="7" fill="#f59e0b"/><circle cx="98" cy="96" r="8" fill="#fef08a"/><circle cx="140" cy="84" r="10" fill="#fef08a"/><circle cx="182" cy="96" r="8" fill="#fef08a"/>
    </svg>`, [K.f(K.spark('#fde047'), 14, 20, '3.6s', 1.2), K.f(K.spark('#f9a8d4'), 82, 22, '4.2s', 1.4), K.f(K.dot('#fde047', 14), 80, 76, '5s', .9), K.f(K.dot('#f9a8d4', 10), 18, 72, '4.6s', 1.1)])
  };
})();
