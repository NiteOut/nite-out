'use strict';

angular.module('nite-out', [
  'nite-out.main',
  'nite-out.movies',
  'nite-out.movieFactory',
  'nite-out.showtimes',
  'nite-out.map',
  'nite-out.mapFactory',
  'nite-out.events',
  'nite-out.eventFactory',
  'nite-out.restaurants',
  'nite-out.restaurantFactory',
  

  'nite-out.test',
  'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
}]);


