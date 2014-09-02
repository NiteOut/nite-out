'use strict';

angular.module('nite-out.events', ['ui.router'])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.events', {
      url: '/events',
      templateUrl: 'app/events/events.html',
      controller: 'EventsController'
    });
}])

.controller('EventsController', ['$scope', 'Events', function($scope, Events){
  $scope.events = Events.events;
  Events.getEvents(94102);
}]);

