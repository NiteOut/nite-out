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
  // Populate our restaurants array from Opentable
  Restaurants.getRestaurants(94102);

  // Query Yelp API for more information on our restaurant
  $scope.getInfo = function() {
    console.log(this.restaurant);
    var data = {name: this.restaurant.name, location: this.restaurant.city};
    Restaurants.getInfo(data);
  };


  $scope.places = [];

  // let $scope.map be the initial interface object for the google-map directive
  // Mapper.init is the default object for setup
  // for changing options go to: https://angular-ui.github.io/angular-google-maps/#!/api
  $scope.map = Mapper.init;

  // setting map options through the google-map directive interface
  $scope.setCenter = function(restaurant){
    // async Geocoder API call
    var address = restaurant.address +', ' + restaurant.city;
    Mapper.setCenter(address);
  };

  $scope.select = function(place){
    $scope.setCenter(place.vicinity);
    window.scrollTo(0,0);
    console.log('you selected', place.name);
  };

  // takes args: ('type of establishment', optional radius in meters, optional callback())
  $scope.renderListOfPlaces = function(){
    $scope.places = Mapper.getLocations();
  };

  window.doStuff = function(){
    $scope.$apply(function(){
      $scope.places = Mapper.getLocations();
    });
    $scope.renderListOfPlaces();
  };

}]);

