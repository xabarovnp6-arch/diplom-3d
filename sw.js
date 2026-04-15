var CACHE = 'v1';
var FILES = ['./', './index.html', './interior_clean.html', './camera_editor_v4.html', './icon-192.png'];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(FILES); }));
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(resp) {
        return caches.open(CACHE).then(function(c) { c.put(e.request, resp.clone()); return resp; });
      });
    }).catch(function() { return caches.match('./index.html'); })
  );
});
