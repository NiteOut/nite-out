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

.controller('buyTicketController', ['$scope', 'Movies', function($scope, Movies){
  $scope.movie = Movies.selectedMovie;
  $scope.time = Movies.selectedTime;
}]);