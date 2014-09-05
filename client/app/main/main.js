'use strict';

angular.module('nite-out.main', [
  'ui.router'
  ])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    });
}])

.controller('MainController', ['$scope', '$state', 'Search', function($scope, $state, Search) {
  $scope.input = '';
  $scope.conductSearch = function(search, choice) {

    // handles redirecting based on appropriate search
    Search.current = search;
    Search.type = choice;
    $scope.input = '';
    if (choice === 'music' || choice === 'sports') {
      $state.go('main.events');
    } else {
      $state.go('main.' + choice, {}, {reload:true});
    }
  };
}]);

