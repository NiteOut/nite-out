'use strict';

angular.module('nite-out.movies', ['ui.router'])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.movies', {
      url: '/movies',
      templateUrl: 'app/movies/movies.html',
      controller: 'MoviesController'
    });
}])

.controller('MoviesController', ['$scope', 'Movies', function($scope, Movies){
  $scope.theaters = Movies.theaters;

  Movies.getTheaters(94102);
}]);

