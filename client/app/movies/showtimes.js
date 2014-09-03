'use strict';

angular.module('nite-out.showtimes', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.showtimes', {
      url: '/showtimes',
      templateUrl: 'app/movies/showtimes.html',
      controller: 'showtimesController'
    });
}])

.controller('showtimesController', ['$scope', '$state', 'Movies', function($scope, $state, Movies){
  $scope.moviesStuff = Movies.selected.movies; 

  $scope.buyTicket = function(movie, showtime) {
    Movies.selectedMovie = movie;
    Movies.selectedTime = showtime;
    $state.go('main.buyTicket');
  };

}]);


