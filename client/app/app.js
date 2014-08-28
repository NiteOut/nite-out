angular.module('nite-out', [
  // 'nite-out.movies',
  // 'nite-out.map',
  'nite-out.main',
  // 'nite-out.login',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    });
  $urlRouterProvider.otherwise('/main');
});


