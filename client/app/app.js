'use strict';

angular.module('nite-out', [
  'nite-out.main',
  'nite-out.movies',
  'nite-out.movieFactory',
  'nite-out.showtimes',
  'nite-out.buyTicket',
  'nite-out.map',
  'nite-out.mapFactory',
  'nite-out.events',
  'nite-out.eventFactory',
  'nite-out.restaurants',
  'nite-out.restaurantFactory',
  'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
}])



// if logged in, then use this directive
.directive('signedin', function() {
  return {
    restrict: 'EA',
    replace: true,
    // need to replace template URL
    templateUrl: 'app/auth/loggedin.html',
    // template: '<div>hello</div>',
    link: function(scope, element, attr) {
      console.log('working');
    }
  }
});




