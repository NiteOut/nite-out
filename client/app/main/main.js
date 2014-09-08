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

  // Define new options for dropdown menu in search here.
  $scope.options = [
    {
      name: 'Movies',
      value: 'movies'
    },
    {
      name: 'Concerts',
      value: 'music'
    },
    {
      name: 'Restaurants',
      value: 'restaurants',
    },
    {
      name: 'Sports',
      value: 'sports'
    }];
  
  $scope.conductSearch = function(search, choice) {

    // Handle redirecting based on appropriate search
    Search.current = search;
    Search.type = choice.value;
    $scope.input = '';
    // All events are handled in one page, type is only utilized in order to
    // conduct the proper query to the api
    if (choice.value === 'music' || choice.value === 'sports') {
      // When calling a new view, we pass in an empty set of state params
      // reload: true allows us to reload the view and conduct a new query,
      // without interrupting the users view.
      $state.go('main.events', {}, {reload:true});
    } else {
      $state.go('main.' + choice.value, {}, {reload:true});
    }
  };
}]);
