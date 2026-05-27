const CACHE_NAME = 'orariodocenti-v1';
const ASSETS = [
  './index.html'
];

// Installazione: memorizza solo i file statici
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// Fetch: serve i file dalla cache, ma ignora le chiamate all'API di Google
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Se la richiesta è verso l'API, vai sempre online (non usare la cache)
  if (url.origin === 'https://script.google.com') {
    event.respondWith(fetch(event.request));
  } else {
    // Per tutto il resto, prova la cache
    event.respondWith(
      caches.match(event.request).then((response) => response || fetch(event.request))
    );
  }
});