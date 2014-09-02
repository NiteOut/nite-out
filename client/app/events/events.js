'use strict';

angular.module('nite-out.events', ['ui.router'])

// Configure out state using ui.router, in order to allow the
// user to use the back-button and not lose searched data.
// Events is rendered as a sub-view of main to maintain the illusion
// of having multiple pages.
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.events', {
      url: '/events',
      templateUrl: 'app/events/events.html',
      controller: 'EventsController'
    });
}])

.controller('EventsController', ['$scope', 'Events', function($scope, Events){
  // Define our events scope variable, which will determine which events
  //are shown to the user.  Events is passed by refernce so that any
  // dynamic changes are updated immediately.
  $scope.events = Events.events;
  
  // Fetch our events to update $scope.events
  Events.getEvents(94102);
}]);

