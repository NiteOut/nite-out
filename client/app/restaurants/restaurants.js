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

  Restaurants.getRestaurants(92870);
});

