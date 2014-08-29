angular.module('nite-out.movies', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider
    .state('main.movies', {
      url: '/movies',
      templateUrl: 'app/movies/movies.html',
      controller: 'MoviesController'
    });
})


.controller('MoviesController', function($scope, Movies){
  Movies.getTheaters(94518);

  $scope.theaters = Movies.theaters;
});

