angular.module('nite-out.restaurants', ['ui.router'])
.config(function($stateProvider) {
  $stateProvider
    .state('main.restaurants', {
      url: '/restaurants',
      templateUrl: 'app/restaurants/restaurants.html',
      controller: 'RestaurantsController'
    });
})

.controller('RestaurantsController', function($scope, Restaurants){
  $scope.restaurants = Restaurants.restaurants;

  $scope.getInfo = function() {
    console.log(this.restaurant);
    var data = {name: this.restaurant.name, location: this.restaurant.city};
    Restaurants.getInfo(data);
  };

  Restaurants.getRestaurants(94102);
});

