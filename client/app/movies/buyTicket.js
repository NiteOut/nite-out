'use strict';

angular.module('nite-out.buyTicket', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.buyTicket', {
      url: '/buyTicket',
      templateUrl: 'app/movies/buyTicket.html',
      controller: 'buyTicketController'
    });
}])

.controller('buyTicketController', ['$scope', '$state', 'Movies', function($scope, $state, Movies){
  $scope.movie = Movies.selectedMovie;
  $scope.time = Movies.selectedTime;

  Movies.cart.push({event: Movies.selectedMovie.name,
                    time: Movies.selectedTime});

  $scope.toCart = function() {
    $state.go('main.cart');
  };
}]);