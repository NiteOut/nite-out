angular.module('nite-out', [
  'nite-out.main',
  'nite-out.movies',
  'nite-out.map',
  'nite-out.events',
  'nite-out.eventFactory',
  'nite-out.movieFactory',
  'nite-out.restaurants',
  'nite-out.restaurantFactory',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
});


