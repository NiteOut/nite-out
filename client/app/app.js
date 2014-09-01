angular.module('nite-out', [
  'nite-out.main',
  'nite-out.movies',
  'nite-out.movieFactory',
  'nite-out.restaurant',
  'nite-out.restaurantFactory',
  'nite-out.events',
  'nite-out.eventFactory',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
});


