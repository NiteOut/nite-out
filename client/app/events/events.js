'use strict';

angular.module('nite-out.events', ['ui.router'])

// Configure out state
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.events', {
      url: '/events',
      templateUrl: 'app/events/events.html',
      resolve: {
        // The resolve handler is used to ensure that our Events are all returned
        // from asynchronous call, before our user sees any data.
        events: function(Events, Search) {
          return Events.getEvents(Search.current, Search.type);
        }
      },
      data: {
        // loading method handles rendering of our loading animation
        loading: function() {
          var el = angular.element(document.getElementById('main'));
          el.html(
            '<div class="spinner"><div class="rect1"></div>' +
            '<div class="rect2"></div><div class="rect3"></div>' +
            '<div class="rect4"></div><div class="rect5"></div></div>'
            );
        }
      },
      controller: 'EventsController'
    });
}])

.controller('EventsController', ['$scope', '$state', 'events', 'Mapper', 'Main', function($scope, $state, events, Mapper, Main) {
  // Fetch our events to update $scope.events
  // Object decorator preps events to initialize google-map markers directive
  $scope.events = Mapper.makeMarkerFriendlyVersionsOf(events);

  // let $scope.map be the initial interface object for the google-map directive
  // Mapper.init is the default object for setup
  // for changing options go to: https://angular-ui.github.io/angular-google-maps/#!/api
  $scope.map = Mapper.init;

  $scope.select = function(event){
    // doesn't do anything but center map around selection
    Mapper.select(event);
    // a boolean for modalSelection directive to show/hide
    event.selected = true;
  };

  $scope.bookIt = Main.addToCart;
}]);

