/* Porta de entrada do app de modelos (versão publicada em studiomagalhaes.com.br).
   Quem abre o endereço vê só "Entrar com Google". A conta é conferida no Firestore:
   só passa quem as regras deixam ler a área privada (a conta do Studio).
   Depois de entrar, este aparelho fica liberado por 60 dias, inclusive sem internet.
   No computador (arquivo, .exe ou localhost) a porta não aparece.
   Observação: o GitHub Pages é público. A porta esconde o site de quem abrir o endereço,
   mas os arquivos em si não são secretos (não há nada sigiloso neles). */
(() => {
  'use strict';
  // "?porta" no endereço força a porta (para testar no computador)
  if (!/(^|\.)studiomagalhaes\.com\.br$/.test(location.hostname) && !/[?&]porta\b/.test(location.search)) return;
  // Links de amostra enviados pelo Studio para clientes (#amostra=... ou ?amostra=...) abrem direto a prévia da loja e a Área da loja para teste
  const temAmostra = location.hash.startsWith('#amostra=') || /[?&]amostra=/.test(location.search);
  if (temAmostra && /\/catalogo\/[^/]+\/(index\.html|admin\.html)?$/.test(location.pathname)) return;
  const CH = 'sm-acesso', VALIDADE = 60 * 24 * 60 * 60 * 1000, VERSAO = '10.12.2';
  try { const a = JSON.parse(localStorage.getItem(CH) || 'null'); if (a && a.email && Date.now() - a.quando < VALIDADE) return; } catch { /* sem armazenamento: pede login */ }

  const html = document.documentElement;
  html.classList.add('sm-trancado');
  const estilo = document.createElement('style');
  estilo.textContent = `html.sm-trancado body > *:not(.sm-porta) { display: none !important; }
    html.sm-trancado, html.sm-trancado body { background: #0c1a36 !important; overflow: hidden !important; }
    .sm-porta { position: fixed; inset: 0; z-index: 99999; display: grid; place-items: center; padding: 20px; font: 400 15px/1.5 system-ui, -apple-system, 'Segoe UI', sans-serif; color: #e7edf7;
      background: radial-gradient(900px 500px at 10% -10%, rgba(79,195,200,.18), transparent), #0c1a36; }
    .sm-porta .c { width: min(360px, 100%); background: #132548; border: 1px solid rgba(255,255,255,.09); border-radius: 22px; padding: 30px 24px; text-align: center; }
    .sm-porta .m { width: 54px; height: 54px; margin: 0 auto 14px; border-radius: 16px; display: grid; place-items: center; background: linear-gradient(145deg, #4fc3c8, #3d7cc0); color: #0c1a36; font: 800 1.1rem/1 system-ui, sans-serif; }
    .sm-porta h1 { margin: 0; font: 800 1.35rem/1.25 system-ui, sans-serif; }
    .sm-porta p { color: #8ea2c4; margin: 6px 0 18px; }
    .sm-porta button { width: 100%; min-height: 48px; border: 0; border-radius: 12px; background: #4fc3c8; color: #0c1a36; font: 700 1rem/1 system-ui, sans-serif; cursor: pointer; }
    .sm-porta button[disabled] { opacity: .6; cursor: wait; }
    .sm-porta .e { color: #f5a596; font-size: .9rem; margin: 12px 0 0; min-height: 1.2em; }`;
  document.head.appendChild(estilo);

  function montar() {
    const p = document.createElement('div'); p.className = 'sm-porta';
    p.innerHTML = `<div class="c"><div class="m">SM</div><h1>Área do Studio</h1><p>Modelos de site do Studio Magalhães. Entre com a conta do Studio para abrir.</p>
      <button type="button">Entrar com Google</button><p class="e" role="status"></p></div>`;
    document.body.appendChild(p);
    const b = p.querySelector('button'), e = p.querySelector('.e');
    b.addEventListener('click', async () => {
      if (!navigator.onLine) { e.textContent = 'Sem internet. Para liberar este aparelho na primeira vez, é preciso estar conectado.'; return; }
      b.disabled = true; e.textContent = '';
      try {
        const base = `https://www.gstatic.com/firebasejs/${VERSAO}/`;
        const [fa, au, fs] = await Promise.all([import(base + 'firebase-app.js'), import(base + 'firebase-auth.js'), import(base + 'firebase-firestore.js')]);
        const ap = fa.getApps().length ? fa.getApp() : fa.initializeApp(window.SM_FIREBASE);
        const a = au.getAuth(ap); a.languageCode = 'pt-BR';
        const prov = new au.GoogleAuthProvider(); prov.setCustomParameters({ prompt: 'select_account' });
        const r = await au.signInWithPopup(a, prov);
        try {
          // só a conta do Studio consegue ler a área privada (regras do Firestore)
          await fs.getDoc(fs.doc(fs.getFirestore(ap), 'config', 'assistente'));
        } catch (err) {
          await au.signOut(a);
          e.textContent = 'Esta conta não tem acesso. Entre com a conta do Studio.'; b.disabled = false; return;
        }
        localStorage.setItem(CH, JSON.stringify({ email: r.user.email, quando: Date.now() }));
        html.classList.remove('sm-trancado'); p.remove(); estilo.remove();
        location.reload();
      } catch (err) {
        b.disabled = false;
        if (!/popup-closed|cancelled-popup/.test(err && err.code || '')) e.textContent = 'Não deu para entrar. Tente de novo.';
      }
    });
  }
  if (document.body) montar(); else document.addEventListener('DOMContentLoaded', montar);
})();
