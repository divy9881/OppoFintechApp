var cacheName = 'oppo-fintech-app';
var filesToCache = [
  '/views/form.html',
  '/views/submitMessage.html',
  '/styles/form.css',
  '/styles/submitMessage.css',
  '/scripts/fetchFields.js',
  '/vendors/bootstrap-theme.min.css',
  '/vendors/bootstrap.min.css',
  '/vendors/bootstrap.min.js',
  '/vendors/jquery.min.js',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});