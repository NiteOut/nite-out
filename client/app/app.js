angular.module('nite-out', [
  'nite-out.main',
  'nite-out.movies',
  // 'nite-out.map',
  // 'nite-out.login',
  'nite-out.movieFactory',

  'nite-out.test',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
});


