angular.module('nite-out.main', ['ui.router'])


.config(function($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    });
})


.controller('MainController', function($scope, $state) {
  $scope.input = '';
  $scope.renderPage = function() {
    $state.go('main.movies');
  };
});
