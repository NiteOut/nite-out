'use strict';

angular.module('nite-out.restaurants', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.restaurants', {
      url: '/restaurants',
      templateUrl: 'app/restaurants/restaurants.html',
      controller: 'RestaurantsController',
      resolve: {
        restaurants: function(Restaurants, Search) {
          return Restaurants.getRestaurants(Search.current)
          .then(function(list) {
            return list;
          });
        }
      },
      data: {
        loading: function() {
          var el = angular.element(document.getElementById('main'));
          el.html(
            '<div class="spinner"><div class="rect1"></div>' +
            '<div class="rect2"></div><div class="rect3"></div>' +
            '<div class="rect4"></div><div class="rect5"></div></div>'
            );
        }
      }
    });
}])

.controller('RestaurantsController', ['$scope', 'restaurants', 'Mapper', function($scope, restaurants, Mapper){
  // Let $scope.map be the initial interface object for the google-map directive
  // Mapper.init is the default object for setup
  // for changing options go to: https://angular-ui.github.io/angular-google-maps/#!/api

  // setting map options through the google-map directive interface
  $scope.map = Mapper.init;
  $scope.restaurants = Mapper.makeMarkerFriendlyVersionsOf(restaurants);

  // Query Yelp API for more information on our restaurant
  // TODO: Find some functionality for me.
  // $scope.getInfo = function() {
  //   console.log(this.restaurant);
  //   var data = {name: this.restaurant.name, location: this.restaurant.city};
  //   Restaurants.getInfo(data);
  // };

  $scope.setCenter = function(restaurant){
    // Async Geocoder API call
    Mapper.setCenter(restaurant.coords);
  };

}]);

