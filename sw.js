const cacheName = 'dove-sono-v1';
const filesToCache = [
  './',
  './index.html'
];

// Installazione
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(cacheName).then((cache) => {
    return cache.addAll(filesToCache);
  }));
});

// Recupero (Fetch)
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((response) => {
    return response || fetch(e.request);
  }));
});