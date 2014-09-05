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

.controller('buyTicketController', ['$scope', 'Main', 'Movies', function($scope, Main, Movies){
  $scope.movie = Movies.selectedMovie;
  $scope.time = Movies.selectedTime;

  $scope.addToCart = Main.addToCart;
}]);