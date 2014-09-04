'use strict';

angular.module('nite-out.restaurantFactory', [])

.factory('Restaurants', ['$http', 'Mapper', function($http, Mapper){
  var restaurants = [];
  var fetched = false;

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
      params: {zip: zipcode, per_page: 5}
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
      restaurants.forEach(function(restaurant, index) {
        Mapper.getLatLng(restaurant.address)
          .then(function(data) {
            restaurants[index].coords = data;
          });
      });
      return restaurants;
    });

  };

  // Conduct our api call to the server.
  // TODO: Handle the entire api call on the client-side.
  var getInfo = function(data) {
    return $http({
      method: 'GET',
      url: '/api/yelp',
      params: data,
    })
    .success(function(res) {
      // TODO: Handle error responses more gracefully and only display
      // meaningful responses.
      console.log(res);
    });
  };

  // Return an object filled with our shared methods and data.
  return {
    fetched: fetched,
    restaurants: restaurants,
    getRestaurants: getRestaurants,
    getInfo: getInfo,
  };
}]);
