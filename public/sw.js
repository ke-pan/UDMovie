const staticCacheName = 'static-v4';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        'static/js/bundle.js',
        '/'
      ])
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('static-') &&
            staticCacheName !== cacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch',function(event) {
  const requestUrl = new URL(event.request.url);
  event.respondWith(
    caches.open(staticCacheName).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) return response;

        return fetch(event.request).then(function(res) {
          cache.put(requestUrl, res.clone());
          return res;
        })
      })
    })
  )
});
