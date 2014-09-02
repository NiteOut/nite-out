'use strict';

angular.module('nite-out', [
  'nite-out.main',
  'nite-out.movies',
  'nite-out.movieFactory',
<<<<<<< HEAD
  'nite-out.map',
  'nite-out.mapFactory',
  'nite-out.events',
  'nite-out.eventFactory',
  'nite-out.restaurants',
  'nite-out.restaurantFactory',
=======
  //'nite-out.showtimes',
  

  'nite-out.test',
>>>>>>> minor changes, trying to figure out why the ui-router is not working
  'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
}]);


