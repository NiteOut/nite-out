'use strict';

angular.module('nite-out.buyEventTicket', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.buyEventTicket', {
      url: '/buyEventTicket',
      templateUrl: 'app/events/buyEventTicket.html',
      controller: 'buyEventTicketController'
    });
}])

// .controller('buyEventTicketController', ['$scope', '$state', 'Movies', function($scope, $state, Movies){
//   $scope.event = Movies.selectedEvent.title;
//   $scope.time = Movies.selectedEvent.date;

//   $scope.addToCart = function(input) {
//     console.log(input)
//   //   Main.cart.push({event: Movies.selectedEvent.title,
//   //                     time: Movies.selectedEvent.date,
//   //                     numTickets: input});
//   //   $state.go('main.cart');
//   // };
// }]);