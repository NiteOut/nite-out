'use strict';

angular.module('nite-out', [
  'nite-out.main',
  'nite-out.mainServices',
  'nite-out.checkout',
  'nite-out.auth',
  'nite-out.authServices',
  'nite-out.movies',
  'nite-out.movieFactory',
  'nite-out.showtimes',
  'nite-out.cart',
  'nite-out.mycart',
  'nite-out.map',
  'nite-out.mapFactory',
  'nite-out.events',
  'nite-out.eventFactory',
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

.directive('loggedin', ['Main', function(Main) {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'app/auth/loggedin.tpl.html',
    link: function(scope) {
      scope.user = Main.user;
    }
  };
}])

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
})

.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '=',
      action: '&',
    },
    replace: true, // Replace with the template below
    link: function(scope) {
      scope.userInfo = {};
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    templateUrl: function(tElement, tAttrs) {
      return tAttrs.templateUrl;
    }
  };
})

// * displays event details in a modal
// * add directive within the scope of each event
// * current purpose is to display details per google map marker click event
//
// <modal-selection
//    show="some boolean bound to an event object to toggle modal visibility."

//    template-url="app/map/selection.tpl.html"
//    >
// </modal-selection>
//
// template expects:
//    event.title
//    event.date
//    event.venue
//    event.address
//
.directive('modalSelection', function(){
  return {
    restrict: 'EA',
    scope: {
      show: '=',
      event: '='
    },
    replace: true,
    link: function(scope) {
      scope.hideModal = function(){
        scope.show = false;
      };
    },
    templateUrl: function(tElement, tAttrs) {
      return tAttrs.templateUrl;
    }
  };
});

