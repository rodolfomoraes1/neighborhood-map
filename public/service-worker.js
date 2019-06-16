var cacheVersion = 'mws-cache-version-1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheVersion).then(function(cache) {
    return cache.addAll([
      './public/index.html',
      './public/manifest.json',
      './public/service-worker',
      '.src/App.css',
      '.src/App.js',
      '.src/App.test.js',
      '.src/index.css',
      '.src/index.js',
      '.src/InfoWindow.js',
      '.src/List.js',
      '.src/Map.js',
      '.src/registerServiceWorker.js',
      '.src/Responsive.css'
    ]).catch();
  }));
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheList) {
      return Promise.all(
        cacheList.filter(function(newCache) {
          return newCache.startsWith('mws-cache-version-') &&
                 newCache != cacheVersion;
        }).map(function(newCache) {
          return caches.delete(newCache);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith (    
    caches.match(event.request).then(
      function(response) {
        if (response !== undefined) {
          return response;
        } else {        
          return fetch(event.request).then(
              function (response) {
                let responseClone = response.clone();
                caches.open(cacheVersion).then(
                  function (cache) {
                    cache.put(event.request, responseClone);
                  }
                );
                return response;
              }
          );
        }
      }
    ) 
  );
});