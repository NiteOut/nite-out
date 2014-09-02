'use strict';

angular.module('nite-out.restaurants', ['ui.router'])

// Configure out state using ui.router
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.restaurants', {
      url: '/restaurants',
      templateUrl: 'app/restaurants/restaurants.html',
      controller: 'RestaurantsController'
    });
}])

.controller('RestaurantsController', ['$scope', 'Restaurants', function($scope, Restaurants){
  $scope.restaurants = Restaurants.restaurants;

  // Query Yelp API for more information on our restaurant
  $scope.getInfo = function() {
    console.log(this.restaurant);
    var data = {name: this.restaurant.name, location: this.restaurant.city};
    Restaurants.getInfo(data);
  };

  // Populate our restaurants array from Opentable
  Restaurants.getRestaurants(94102);
}]);

