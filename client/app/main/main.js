'use strict';

angular.module('nite-out.main', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    });
}])


.controller('MainController', ['$scope', '$state', function($scope, $state) {
  $scope.input = '';
  $scope.renderPage = function() {
    $state.go('main.movies');
  };
}]);
