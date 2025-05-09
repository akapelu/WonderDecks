const CACHE_NAME = 'wonder-decks-cache-v1';
 const urlsToCache = [
   '/WonderDecks/', 
   '/WonderDecks/index.html',
   '/WonderDecks/styles.css',
   '/WonderDecks/script.js',
   '/WonderDecks/manifest.json',
   '/WonderDecks/images/icono-192x192.png',
   '/WonderDecks/images/icono-512x512.png'
 ];
 
 
 self.addEventListener('install', event => {
   console.log('Service Worker: Installing...');
   event.waitUntil(
     caches.open(CACHE_NAME).then(cache => {
       console.log('Service Worker: Caching files');
       return cache.addAll(urlsToCache);
     })
   );
 });
 
 
 self.addEventListener('activate', event => {
   console.log('Service Worker: Activating...');
   event.waitUntil(
     caches.keys().then(cacheNames => {
       return Promise.all(
         cacheNames.map(cacheName => {
           if (cacheName !== CACHE_NAME) {
             console.log('Service Worker: Deleting old cache:', cacheName);
             return caches.delete(cacheName);
           }
         })
       );
     })
   );
   return self.clients.claim();
 });
 
 
 self.addEventListener('fetch', event => {
   event.respondWith(
     caches.match(event.request).then(response => {
       return response || fetch(event.request);
     })
   );
 });
