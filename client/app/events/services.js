angular.module('nite-out.eventFactory', [])

.factory('Events', function($http){
  var events = [];

  var getEvents = function(zipcode) {
    return $http({
      method: 'GET',
      url: '/api/events',
      params: {
        zipcode: zipcode,
      }
    })
    .then(function(res) {
      res.data.results.forEach(function(item) {
        events.push(item);
      });
    });
  };

  return {
    events: events,
    getEvents: getEvents
  };
  
});
