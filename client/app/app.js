// This is the primary module set to ng-app in the index.html
angular.module('nite-out', [
  'nite-out.main',
  'nite-out.movies',
  'nite-out.movieFactory',
  'nite-out.test',
  'ui.router'
])

// The only routing handled here is the 'otherwise' routing
// All routing should be handled in their own respective modules
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
});


