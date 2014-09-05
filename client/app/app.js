'use strict';

angular.module('nite-out', [
  'nite-out.main',
  'nite-out.mainServices',
  'nite-out.auth',
  'nite-out.authServices',
  'nite-out.movies',
  'nite-out.movieFactory',
  'nite-out.showtimes',
  'nite-out.buyTicket',
  'nite-out.cart',
  'nite-out.map',
  'nite-out.mapFactory',
  'nite-out.events',
  'nite-out.eventFactory',
  'nite-out.buyEventTicket',
  'nite-out.restaurants',
  'nite-out.restaurantFactory',
  'ui.router'
])

.config(['$urlRouterProvider', function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
}])

.run(['$rootScope', function($rootScope) {
  $rootScope.$on('$stateChangeStart', function(ev, toState) {
    if (toState.data) {
      check(toState);
    }
  });

  var check = function(toState) {
    if (checkLoading(toState)) {
      executeLoading(toState);
    }
  };

  var executeLoading = function(toState) {
    toState.data.loading();
  };

  var checkLoading = function(toState) {
    if (toState.data) {
      return (toState.data.loading !== undefined || toState.data.loading !== null) && typeof toState.data.loading === "function";
    }
    return false;
  };
}])

// if logged in, then use this directive
.directive('loggedin', function() {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'app/auth/loggedin.tpl.html'
  };
})

.directive('needlogin', function() {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'app/auth/needlogin.tpl.html'
  };
})

.directive('cart', function() { 
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'app/cart/cart.html'
  };
});
