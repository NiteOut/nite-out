angular.module('niteout.movies', ['ngResource', 'niteout.location-services'])
.config( function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('theater-detail', {
      url: '/theater/:contactId',
      templateUrl: 'templates/contact-detail.html',
      controller: 'ContactDetailCtrl'
    });
    $urlRouterProvider.otherwise('/login');
    // $httpProvider.interceptors.push('AttatchTokens');
})
.factory('Fandango', ['$resource', function ($resource) {
  return $resource('http://localhost:8070/api/fandango', {}, {
    query: { method: 'GET' }
  });
}])
.factory('Movies', ['$resource', function ($resource) {
  return $resource('http://localhost:8070/api/movies', {}, {
    query: { method: 'GET' }
  });
}]);