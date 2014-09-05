'use strict';

angular.module('nite-out.cart', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.cart', {
      url: '/cart',
      templateUrl: 'app/cart/cart.html',
      controller: 'cartController'
    });
}])

.controller('cartController', ['$scope', '$state', 'Movies', 'Events', function($scope, $state, Movies, Events){
  console.log(Events);
  $scope.stuffInCart = Movies.cart;
  console.log(Movies);



}]);


