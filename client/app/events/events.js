angular.module('nite-out.events', ['ui.router'])
.config(function($stateProvider) {
  $stateProvider
    .state('main.events', {
      url: '/events',
      templateUrl: 'app/events/events.html',
      controller: 'EventsController'
    });
})

.controller('EventsController', function($scope, Events){
  $scope.events = Events.events;
  Events.getEvents(94102);
});

