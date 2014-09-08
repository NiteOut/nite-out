'use strict';

angular.module('nite-out.checkout', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  // Register our states for both the checkout area as well as the keep
  // shopping screen that is presented to a user after adding an item to
  // their cart.
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
}])

.controller('CheckoutController',['Main', '$scope', 'Events', '$state', function(Main, $scope, Event, $state) {
  $scope.cart = Main.cart;
  $scope.eventGo = function(choice) {
    Events.choice = choice;
    $state.go('main.events');
  }
}]);
