angular.module('nite-out.eventFactory', [])

.factory('Events', function($http){
  var events = [];

  var getEvents = function(zipcode) {
    return $http({
      method: 'GET',
      url: '/api/events',
      params: {
        zip: zipcode,
      }
    })
    .then(function(resp) {
      resp.data.results.forEach(function(item) {
        events.push(item);
      });
    });
  };

  return {
    events: events,
    getEvents: getEvents
  };
});
