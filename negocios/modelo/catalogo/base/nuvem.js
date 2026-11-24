/* Fechamentos de clientes: guarda o modelo escolhido + observações na conta do Studio.
   Sem internet ou sem login, o fechamento fica na fila deste aparelho e sobe depois.
   Consulta: studiomagalhaes.com.br/negocios/clientes/ (só com a conta Google do Paulo). */
window.Nuvem = (() => {
  'use strict';
  const VERSAO = '10.12.2';
  const FILA = 'sm-fechamentos:fila';
  const ler = (k, p) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : p; } catch { return p; } };
  const gravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
  let fb = null, usuario = null, ultimoErro = '';
  const ouvintes = [];
  const avisar = () => ouvintes.forEach(f => f({ usuario, fila: fila().length, erro: ultimoErro }));

  async function carregar() {
    if (fb) return fb;
    if (!window.SM_FIREBASE) throw new Error('sem-config');
    if (!/^https?:$/.test(location.protocol)) throw new Error('sem-servidor');
    const base = `https://www.gstatic.com/firebasejs/${VERSAO}/`;
    const [app, auth, fs] = await Promise.all([import(base + 'firebase-app.js'), import(base + 'firebase-auth.js'), import(base + 'firebase-firestore.js')]);
    const ap = app.getApps().length ? app.getApp() : app.initializeApp(window.SM_FIREBASE);
    const a = auth.getAuth(ap); a.languageCode = 'pt-BR';
    const db = fs.getFirestore(ap);
    auth.onAuthStateChanged(a, u => { usuario = u ? { email: u.email, nome: u.displayName } : null; avisar(); if (u) enviarFila(); });
    fb = { auth, fs, a, db };
    return fb;
  }
  async function entrar() {
    const { auth, a } = await carregar();
    const prov = new auth.GoogleAuthProvider(); prov.setCustomParameters({ prompt: 'select_account' });
    await auth.signInWithPopup(a, prov);
  }
  const fila = () => ler(FILA, []);
  /** Guarda o fechamento: entra na fila e tenta subir já. Devolve 'enviado' ou 'na-fila'. */
  async function salvarFechamento(doc) {
    const l = fila(); l.push({ ...doc, criadoLocal: new Date().toISOString(), uid: Math.random().toString(36).slice(2) });
    if (!gravar(FILA, l)) throw new Error('sem-espaco');
    avisar();
    try { const n = await enviarFila(); return n ? 'enviado' : 'na-fila'; } catch { return 'na-fila'; }
  }
  let enviando = false;
  async function enviarFila() {
    if (enviando) return 0;
    const l = fila(); if (!l.length || !navigator.onLine) return 0;
    enviando = true;
    try {
      const { fs, db, a } = await carregar();
      if (!a.currentUser) return 0;
      let n = 0;
      for (const item of l) {
        const { uid, ...doc } = item;
        try {
          await fs.setDoc(fs.doc(db, 'fechamentos', uid), { ...doc, status: doc.status || 'fechado', criadoEm: fs.serverTimestamp(), autor: a.currentUser.email });
          gravar(FILA, fila().filter(x => x.uid !== uid)); n++; ultimoErro = '';
        } catch (e) {
          ultimoErro = e.code === 'permission-denied' ? 'Esta conta Google não tem acesso. Entre com a conta do Studio.' : 'Não deu para enviar agora (' + (e.code || 'erro') + ').';
          throw e;
        }
      }
      return n;
    } finally { enviando = false; avisar(); }
  }
  window.addEventListener('online', () => { if (usuario) enviarFila().catch(() => {}); });

  return { carregar, entrar, salvarFechamento, enviarFila, fila, get usuario() { return usuario; }, get erro() { return ultimoErro; }, sair: async () => { const { auth, a } = await carregar(); await auth.signOut(a); }, aoMudar: f => ouvintes.push(f) };
})();
