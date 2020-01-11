const cacheName = 'v4';
const cachedAssets = [
'/',
'index.html',
'restaurant.html',
'img/1.jpg',
'img/2.jpg',
'img/3.jpg',
'img/4.jpg',
'img/5.jpg',
'img/6.jpg',
'img/7.jpg',
'img/8.jpg',
'img/9.jpg',
'img/10.jpg',
'css/styles.css',
'ws.js',
'data/restaurants.json',
'sw_register.js',
'js/dbhelper.js',
'js/main.js',
'js/restaurant_info.js',
];

self.addEventListener('install', e => {
  console.log('install');
  e.waitUntil(
    caches.open(cacheName).then(cache => { return cache.addAll(cachedAssets);})
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('avtivate');
  e.waitUntil(
    Promise.all([
      clients.claim(), 
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              return caches.delete(cache);
            }
          })
        )
        }
      )
    ])
  )
});

self.addEventListener('fetch', e => {
  console.log('fetch');
  e.respondWith(
    fetch(e.request)
    .then(res => {
      console.log(res);
    const resClone = res.clone();
    caches.open(cacheName).then(cache => {
      cache.put(e.request,resClone);
    });
    return res;
  })
  .catch(err => caches.match(e.request).then(res => res))
  );
});