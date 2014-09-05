'use strict';

angular.module('nite-out.cart', [])

.controller('cartController', ['$scope', '$state', 'Main', function($scope, $state, Main){
  $scope.cart = Main.cart;
}]);
