const CACHE_NAME = 'nueva-esencia-shell-v1';
const SHELL_FILES = [
  './',
  './index.html',
  './style.css?v=20261109-pwa',
  './app.js?v=20261109-promptfix',
  './config.js',
  './songs.json',
  './manifest.webmanifest',
  './logo-disc.png',
  './icons/favicon-48.png',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('nueva-esencia-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith(fetch(request).then(response => {
    if (!response.ok) return response;
    return caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone())).then(() => response).catch(() => response);
  }).catch(async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') return caches.match('./index.html');
    return Response.error();
  }));
});
