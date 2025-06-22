const CACHE_NAME = 'iot-training-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/modules/module1.html',
    '/labs/lab1.html',
    '/assets/css/main.css',
    '/assets/css/module.css',
    '/assets/css/lab.css',
    '/assets/js/main.js',
    '/assets/js/module.js',
    '/assets/js/lab.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});