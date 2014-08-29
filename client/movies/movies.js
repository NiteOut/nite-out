angular.module('nite-out.movies', [])

.controller('MoviesController', function($scope, Movies){
  Movies.getTheaters(94518);
  $scope.theaters = Movies.theaters;


//parse out the show times from the 
})