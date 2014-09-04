'use strict';

angular.module('nite-out.eventFactory', [])

.factory('Events', ['$http', function($http){
  // Our factory holds all shared data returned from the server query
  var events = [];

  var getEvents = function(zipcode, category) {
    // Events array is spliced in order to clear it of previous events.
    events.splice(0);

    // Conduct our api call handled by the server.
    // TODO: Handle the entire api call on the client-side.
    return $http({
      method: 'GET',
      url: '/api/events',
      params: {
        zipcode: zipcode,
        category: category
      }
    })
    .then(function(res) {
      // Push to events array to maintain reference instead of using =.
      res.data.results.forEach(function(item, index) {
        var event = {
          id: index + 1,
          title: item.event.title,
          venue: item.event.venue.name,
          address: item.event.venue.address + ', ' + item.event.venue.city,
          url: item.event.url,
          date: item.event.start_date,
          latitude: item.event.venue.latitude,
          longitude: item.event.venue.longitude,
        };
        events.push(event);
        
      });
    });
  };

  // Return an object filled with our shared methods and data.
  return {
    events: events,
    getEvents: getEvents
  };

}]);
