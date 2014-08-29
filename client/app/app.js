angular.module('nite-out', [
  // 'nite-out.movies',
  // 'nite-out.map',
  'nite-out.main',
  'nite-out.test',
  // 'nite-out.login',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
});


