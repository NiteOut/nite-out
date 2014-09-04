'use strict';

angular.module('nite-out.movies', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.movies', {
      url: '/movies',
      templateUrl: 'app/movies/movies.html',
      controller: 'MoviesController',
      resolve: {
        theaters: function(Movies, Search) {
          return Movies.getTheaters(Search.current)
          .then(function(list) {
            return list;
          });
        }
      }
    });
}])

.controller('MoviesController', ['$scope', '$state', 'theaters', 'Movies', 'Mapper', function($scope, $state, theaters, Movies, Mapper){
  $scope.map = Mapper.init;
  $scope.theaters = theaters;

  $scope.toShowtimes = function(selected) {
    Movies.selected = selected;
    $state.go('main.showtimes');
  };

}]);
  
