'use strict';

angular.module('nite-out.restaurantFactory', [])

.factory('Restaurants', function($http){
  var restaurants = [];

  var getRestaurants = function(zipcode) {
    restaurants.splice(0);
    return $http({
      method: 'jsonp',
      url: 'http://opentable.herokuapp.com/api/restaurants?callback=JSON_CALLBACK',
      params: {zip: zipcode},
    })
    .success(function(response) {
      response.restaurants.forEach(function(item) {
        restaurants.push(item);
      });
    });
  };

  var getInfo = function(data) {
    return $http({
      method: 'GET',
      url: '/api/yelp',
      params: data,
    })
    .success(function(response) {
      console.log(response.url);
    });
  };

  return {
    restaurants: restaurants,
    getRestaurants: getRestaurants,
    getInfo: getInfo
  };
});
