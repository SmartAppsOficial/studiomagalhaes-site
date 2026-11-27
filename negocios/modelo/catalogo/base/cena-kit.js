/* Auxiliares compartilhados para as cenas 3D em SVG de cada ramo.
   Mantém cada arquivo cenas.js leve e com movimento 3D (camadas que seguem o mouse/dedo). */
window.CenaKit = (() => {
  'use strict';
  const camada = (z, atraso, conteudo) => `<g class="camada" style="--z:${z}"><g class="respira" style="--atraso:${atraso}s">${conteudo}</g></g>`;
  const svg3d = (corpo, defs = '') => `<svg viewBox="0 0 400 400" class="cena-lanche" aria-hidden="true">${defs ? `<defs>${defs}</defs>` : ''}${corpo}</svg>`;
  const sombra = (rx = 152, ry = 15, cy = 368) => `<ellipse cx="200" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity=".28"/>`;
  const vapor = (xs = [156, 200, 244], y = 112) => `<path d="${xs.map((x, i) => `M${x} ${y + (i % 2 ? -10 : 0)}c-10-18 12-30 2-48`).join('')}" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".34" fill="none"/>`;
  const estrela = (cor = 'var(--d)') => `<svg viewBox="0 0 40 40"><path d="M20 2l4 14 14 4-14 4-4 14-4-14L2 20l14-4z" style="fill:${cor}"/></svg>`;
  const coracao = (cor = 'var(--p)') => `<svg viewBox="0 0 50 50"><path d="M25 42S7 31 7 18a9.5 9.5 0 0 1 18-4 9.5 9.5 0 0 1 18 4c0 13-18 24-18 24z" style="fill:${cor}"/></svg>`;
  const folha = (cor = '#4aa146') => `<svg viewBox="0 0 60 40"><path d="M2 20C14 2 40 0 58 14 46 34 20 38 2 20z" fill="${cor}"/><path d="M6 20q24-4 48-8" stroke="#2c6524" stroke-width="2" fill="none"/></svg>`;
  const gelo = () => `<svg viewBox="0 0 50 50"><rect x="6" y="6" width="38" height="38" rx="9" fill="#d8f2ff" opacity=".92"/><path d="M14 14h12" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`;
  const morango = () => `<svg viewBox="0 0 50 56"><path d="M25 12c12 0 19 12 16 26S29 52 25 52 12 50 9 38s4-26 16-26z" fill="#e63946"/><path d="M14 14l11-11 11 11-7 3-4-5-4 5z" fill="#4aa146"/><circle cx="20" cy="28" r="1.5" fill="#ffd28a"/><circle cx="30" cy="32" r="1.5" fill="#ffd28a"/><circle cx="24" cy="42" r="1.4" fill="#ffd28a"/></svg>`;
  const tomate = () => `<svg viewBox="0 0 50 50"><circle cx="25" cy="26" r="19" fill="#e63946"/><circle cx="19" cy="20" r="4" fill="#ff9ca4" opacity=".6"/><path d="M20 9l5-5 5 5" stroke="#4aa146" stroke-width="3" fill="none"/></svg>`;
  const limao = () => `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="#8bc34a"/><circle cx="25" cy="25" r="15" fill="#dcedc8"/><path d="M25 10v30M10 25h30" stroke="#8bc34a" stroke-width="2"/></svg>`;
  const grao = () => `<svg viewBox="0 0 40 50"><ellipse cx="20" cy="25" rx="14" ry="20" transform="rotate(-18 20 25)" fill="#5b2e14"/><path d="M16 9c4 12 4 20 8 32" stroke="#2c1306" stroke-width="3" stroke-linecap="round" fill="none"/></svg>`;
  const patinha = (cor = 'var(--d)') => `<svg viewBox="0 0 50 50"><g style="fill:${cor}"><circle cx="16" cy="16" r="5"/><circle cx="34" cy="16" r="5"/><circle cx="10" cy="26" r="4.5"/><circle cx="40" cy="26" r="4.5"/><path d="M25 23c-8 0-13 6-13 12 0 5 4 7 7 7 3 0 4-1 6-1s3 1 6 1c3 0 7-2 7-7 0-6-5-12-13-12z"/></g></svg>`;
  const raio = (cor = 'var(--d)') => `<svg viewBox="0 0 50 50"><path d="M28 6L12 28h12l-4 16 18-22H26z" style="fill:${cor}"/></svg>`;
  const etiqueta = (cor = 'var(--d)') => `<svg viewBox="0 0 50 50"><path d="M8 22L24 6h18v18L26 40z" style="fill:${cor}"/><circle cx="34" cy="14" r="3" fill="#fff"/></svg>`;
  const bolinha = (cor = 'var(--p)') => `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="18" style="fill:${cor}"/></svg>`;
  const soltosPadrao = (a, b, c, d) => [
    { x: 6, y: 18, t: 46, p: 1.5, s: a },
    { x: 86, y: 12, t: 46, p: -1.3, s: b },
    { x: 88, y: 74, t: 44, p: 1.6, s: c },
    { x: 4, y: 76, t: 42, p: -1.4, s: d || estrela() }
  ];
  return { camada, svg3d, sombra, vapor, estrela, coracao, folha, gelo, morango, tomate, limao, grao, patinha, raio, etiqueta, bolinha, soltosPadrao };
})();
