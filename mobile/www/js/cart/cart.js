angular.module('niteout.cart', [])
.directive('shoppingCart', [function () {
  return {
    restrict: 'E',
    templateUrl: 'js/cart/cart.html',
    scope: {
      items: '='
    },
    link: function (scope, element, attrs) {
      
    }
  };
}]);
