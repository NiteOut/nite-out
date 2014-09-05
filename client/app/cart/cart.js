'use strict';

angular.module('nite-out.cart', ['ui.router'])

// .config(['$stateProvider', function($stateProvider) {
//   $stateProvider
//     .state('cart', {
//       url: '/cart',
//       templateUrl: 'app/cart/cart.html',
//       controller: 'cartController'
//     });
// }])

.controller('cartController', ['$scope', '$state', 'Main', function($scope, $state, Main){
  $scope.stuffInCart = Main.cart;

}]);
