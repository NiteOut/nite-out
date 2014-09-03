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

.controller('MoviesController', ['$scope', '$state', 'Movies', function($scope, $state, Movies){
  $scope.theaters = Movies.theaters;
  $scope.toShowtimes = function(selected) {
    Movies.selected = selected;
    $state.go('main.showtimes');
  };

  Movies.getTheaters(94102);
}]);
  
