'use strict';

angular.module('nite-out.restaurantFactory', [])

.factory('Restaurants', ['$http', '$q', 'Mapper', function($http, $q, Mapper){
  var restaurants = [];

  // Our query to Opentable API, API is not-official as Opentable does
  // not currently have a public facing API.
  var getRestaurants = function(zipcode) {
    // Restaurants array is overwritten without dropping reference.
    angular.copy([], restaurants);

    return $http({
      // Conducted as a jsonp request in order to circumvent same-origin
      // policy.
      method: 'jsonp',
      url: 'http://opentable.herokuapp.com/api/restaurants?callback=JSON_CALLBACK',
      // Limited to 10 due to timeout when searching for more results
      // TODO: Added pagination
      params: {zip: zipcode, per_page: 10}
    })
    .then(function(res) {
      res.data.restaurants.forEach(function(item, index) {
        var restaurant = {
          id: index + 1,
          name: item.name,
          url: item.reserve_url,
          phone: item.phone,
          address: item.address + ', ' + item.city
        };
        restaurants.push(restaurant);
      });
      var promises = [];
      restaurants.forEach(function(restaurant, index) {
        promises.push(Mapper.getLatLng(restaurant.address)
          .then(function(data) {
            restaurants[index].coords = data;
            return restaurants[index];
          }));
      });

      return $q.all(promises);
    });

  };

  // Return an object filled with our shared methods and data.
  return {
    restaurants: restaurants,
    getRestaurants: getRestaurants,
  };
}]);
