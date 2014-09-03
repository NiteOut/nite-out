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

.controller('buyTicketController', ['$scope', '$state', 'Movies', function($scope){
    console.log("Hello world!");
}]);