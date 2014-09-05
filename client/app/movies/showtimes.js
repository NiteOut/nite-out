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

.controller('showtimesController', ['$scope', '$state', 'Movies', 'Main', function($scope, $state, Movies, Main){
  
  $scope.movies = Movies.selected.movies; 

  $scope.buyTickets = Main.addToCart;

}]);


