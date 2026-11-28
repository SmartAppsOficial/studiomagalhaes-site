// Clientes fechados: guarda a "casca" do app para abrir rápido e sem internet.
// Os dados vêm do Firestore, que mantém a própria cópia no aparelho.
// Rede primeiro (para sempre pegar a versão nova); sem rede, usa o que está guardado.
const VERSAO = 'sm-clientes-2';
const CASCA = ['./', 'index.html', 'clientes.css', 'clientes.js', 'contratos.js', 'contrato-padrao.js', '../firebase-config.js', 'manifest.webmanifest',
  'icones/icone-192.png', 'icones/icone-512.png', 'icones/apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSAO).then(c => c.addAll(CASCA)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x.startsWith('sm-clientes-') && x !== VERSAO).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const copia = r.clone(); caches.open(VERSAO).then(c => c.put(e.request, copia)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./'))));
});
