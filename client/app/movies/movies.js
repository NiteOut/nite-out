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

.controller('MoviesController', ['$scope', '$state', 'Movies', 'Mapper', function($scope, $state, Movies, Mapper){
  $scope.map = Mapper.init;
  $scope.theaters = Movies.theaters;
  $scope.fetched = Movies.fetched;

  $scope.toShowtimes = function(selected) {
    Movies.selected = selected;
    $state.go('main.showtimes');
  };

  Movies.getTheaters(94102);
}]);
  
