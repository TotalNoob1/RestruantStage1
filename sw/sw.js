const urlForRestaurant = [
  '/',
  '/css/styles.css',
  '/js/main.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',// TODO: Find a better way to cache these imgs
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/restaurant.html',
  '/js/dbhelper.js',
  '/js/restaurant_info.js'

];
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('restaurantData-v2').then(function (cache) {
      return cache.addAll(urlForRestaurant);
      console.log('Cache')
    })
  );
})
self.addEventListener('fetch',function (event) {
  event.respondWith(
     caches.match(event.request).then(function (response) {
      if(response){
        return response;
      }
      console.log(fetchRequest);
      const fetchRequest = event.request.clone();
      console.log(fetchRequest);

      return fetch(fetchRequest).then(
        function (response) {
          if(!response || response.status !== 200 ||response.type !== 'basic'){
            return response;
          }
          const cacheResponse = response.clone();

          cache.open('restaurantData-v2').then(function (cache) {
            cache.put(event.request, cacheResponse);

          })
          return response;

        }
      );
    })
  );
});
self.addEventListener("activate", function (event) {
  let latestCaches = [ 'restaurantData-v2'];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if(latestCaches.indexOf(cacheName) === -1){
            return caches.delete(cacheName)
          }
        })
      );
    })
  );
});
