'use strict';

angular.module('nite-out.events', ['ui.router'])

// Configure out state using ui.router
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.events', {
      url: '/events',
      templateUrl: 'app/events/events.html',
      resolve: {
        events: function(Events, Search) {
          return Events.getEvents(Search.current, Search.type);
        }
      },
      data: {
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

.controller('EventsController', ['$scope', 'events', 'Mapper', function($scope, events, Mapper) {
  $scope.events = events;
  
  // Fetch our events to update $scope.events
  

  // let $scope.map be the initial interface object for the google-map directive
  // Mapper.init is the default object for setup
  // for changing options go to: https://angular-ui.github.io/angular-google-maps/#!/api
  $scope.map = Mapper.init;

  // setting map options through the google-map directive interface
  $scope.setCenter = function(event){
    // async Geocoder API call
    Mapper.setCenter(event.address);
  };

}]);

