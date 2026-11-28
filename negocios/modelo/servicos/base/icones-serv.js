/* Ícones extras para o Catálogo de Serviços (mescla com window.ICONES). */
(() => {
  'use strict';
  const I = window.ICONES || (window.ICONES = {});
  Object.assign(I, {
    'sv-tesoura': '<circle cx="6" cy="6" r="2.6"/><circle cx="6" cy="18" r="2.6"/><path d="M20 4L8.2 15.8M14.5 14.5L20 20M8.2 8.2L12 12"/>',
    'sv-barba': '<path d="M5 10c0 5.5 3 9 7 9s7-3.5 7-9c0-2-1.2-3.5-2.5-3.5-1.2 0-2 1.5-4.5 1.5S8.7 6.5 7.5 6.5C6.2 6.5 5 8 5 10z"/><path d="M9.5 13.5c1.5.8 3.5.8 5 0"/>',
    'sv-brilho': '<path d="M12 3l2 5.5L19.5 10 14 12l-2 5.5L10 12 4.5 10 10 8.5z"/><path d="M18.5 16l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
    'sv-saude': '<path d="M12 4v16M4 12h16"/><rect x="3" y="3" width="18" height="18" rx="4"/>',
    'sv-coracao': '<path d="M12 20s-7.5-4.6-8.5-9.5A4.8 4.8 0 0 1 12 6.6a4.8 4.8 0 0 1 8.5 3.9C19.5 15.4 12 20 12 20z"/>',
    'sv-chave': '<path d="M14.7 6.3a4.5 4.5 0 0 0-6.2 6.2L4 17l3 3 4.5-4.5a4.5 4.5 0 0 0 6.2-6.2l-2.5 2.5-2-2z"/>',
    'sv-carro': '<path d="M5 13l1.6-4.5A2 2 0 0 1 8.5 7h7a2 2 0 0 1 1.9 1.5L19 13"/><rect x="3" y="13" width="18" height="5" rx="1.5"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/>',
    'sv-haltere': '<path d="M6.5 7v10M17.5 7v10M4 9v6M20 9v6M6.5 12h11"/>',
    'sv-balanca': '<path d="M12 3v18M6 21h12M4 7h16"/><path d="M6 7l-2.5 6a3 3 0 0 0 5 0zM18 7l-2.5 6a3 3 0 0 0 5 0z"/>',
    'sv-maleta': '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
    'sv-planta': '<path d="M3 20h18M5 20V8l7-4 7 4v12"/><path d="M9 20v-6h6v6M9 10h6"/>',
    'sv-regua': '<path d="M4 20L20 4l-3-3-16 16zM8 16l-1.5-1.5M11 13l-1.5-1.5M14 10l-1.5-1.5M17 7l-1.5-1.5"/>',
    'sv-chip': '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>',
    'sv-volante': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.2"/><path d="M3.5 10h6.3M14.2 10h6.3M12 14.2V21"/>',
    'sv-capelo': '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.8 2.7 3 6 3s6-1.2 6-3v-5M22 9v6"/>',
    'sv-camera': '<path d="M4 8h3l1.5-2.5h7L17 8h3a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 20 20H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 8z"/><circle cx="12" cy="14" r="3.5"/>',
    'sv-agenda': '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17M8.5 14h2M13.5 14h2M8.5 17h2"/>',
    'sv-video': '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/>',
    'sv-escudo': '<path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    'sv-estrela': '<path d="M12 3l2.6 5.4 6 .8-4.3 4.2 1 6L12 16.5 6.7 19.4l1-6-4.3-4.2 6-.8z"/>'
  });
  window.ICONES_SERVICO = [
    'sv-tesoura', 'sv-barba', 'sv-brilho', 'sv-saude', 'sv-coracao',
    'sv-chave', 'sv-carro', 'sv-haltere', 'sv-balanca', 'sv-maleta',
    'sv-planta', 'sv-regua', 'sv-chip', 'sv-volante', 'sv-capelo',
    'sv-camera', 'sv-agenda', 'sv-video', 'sv-escudo', 'sv-estrela'
  ];
})();
