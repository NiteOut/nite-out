'use strict';

angular.module('nite-out.mycart', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  // Register our new state within the app.
  $stateProvider
    .state('main.mycart', {
      url: 'mycart',
      templateUrl: 'app/cart/mycart.html',
      controller: 'mycartController'
    });
}])

.controller('mycartController', ['$scope', 'Main', function($scope, Main) {
  $scope.cart = Main.cart;
}]);