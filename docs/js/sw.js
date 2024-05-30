const APP_NAME = "Fire QR Reader";
const VERSION = "202405310714JST";
const CACHE_NAME = APP_NAME + "_" + VERSION;
const assets = [
    "/",
    "/fire-qr-reader/index.html",
    "/fire-qr-reader/img/favicon.png",
    "/fire-qr-reader/css/app.css",
    "/fire-qr-reader/js/app.js",
    "/fire-qr-reader/js/i18n.js",
    "/fire-qr-reader/js/jsQR.js",
];

/**
 * Handling service worker install events
 */
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assets);
        })
    );
});

/**
 * What happens when you access the server from a service worker
 */
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            // If the file is cached, it will be referenced locally without any communication.
            return response ? response : fetch(e.request);
        })
    );
});

/**
 * What happens when a service worker starts
 */
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});