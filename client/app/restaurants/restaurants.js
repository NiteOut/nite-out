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

.controller('RestaurantsController', ['$scope', 'Restaurants', 'Mapper', function($scope, Restaurants, Mapper){
  $scope.restaurants = Restaurants.restaurants;
  $scope.resolved = false;
  // Populate our restaurants array from Opentable
  Restaurants.getRestaurants(94102).then(function(){
    $scope.resolved = !$scope.resolved;
  });

  // Query Yelp API for more information on our restaurant
  $scope.getInfo = function() {
    console.log(this.restaurant);
    var data = {name: this.restaurant.name, location: this.restaurant.city};
    Restaurants.getInfo(data);
  };

  // let $scope.map be the initial interface object for the google-map directive
  // Mapper.init is the default object for setup
  // for changing options go to: https://angular-ui.github.io/angular-google-maps/#!/api
  $scope.map = Mapper.init;

  // setting map options through the google-map directive interface
  $scope.setCenter = function(restaurant){
    // async Geocoder API call
    Mapper.setCenter(restaurant.address);
  };

}]);

