self.addEventListener('install', function (event) {
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
  event.waitUntil(
    caches.open('restaurantData-v1').then(function (cache) {
      return cache.addAll(urlForRestaurant);
    })
  );
})
self.addEventListener('fetch',function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if(response){
        return response;
      }
      return fetch(event.request);
    })
  );
});
