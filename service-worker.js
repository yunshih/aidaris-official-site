const CACHE_VERSION = 'v1';
const CACHE_NAME = `aidaris-${CACHE_VERSION}`;

const PRECACHE_ASSETS = [
  '/style.css',
  '/script.js',
  '/assets/fonts/Aka-AcidGR-SuperG.woff',
  '/assets/css/text-to-speech.css',
  '/assets/js/text-to-speech.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    // Network-first for HTML: serve fresh page, fall back to cache
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return res;
        })
        .catch(() =>
          caches.match(event.request).then(cached => cached || caches.match('/'))
        )
    );
  } else {
    // Cache-first for static assets: serve from cache, update in background
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetchPromise = fetch(event.request).then(res => {
          if (res.ok) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, res.clone()));
          }
          return res;
        });
        return cached || fetchPromise;
      })
    );
  }
});
