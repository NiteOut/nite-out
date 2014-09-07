'use strict';

angular.module('nite-out.checkout', ['ui.router'])

.controller('CheckoutController',['Main', '$scope', function(Main, $scope) {
  $scope.cart = Main.cart;


}])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.checkout', {
      url: '/checkout',
      templateUrl: 'app/checkout/checkout.html',
      controller: 'CheckoutController'
    })
    .state('main.shopping', {
      url: '/shopping',
      templateUrl: 'app/checkout/shopping.html',
      controller: 'CheckoutController'
    });
}]);