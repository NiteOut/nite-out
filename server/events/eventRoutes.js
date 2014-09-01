// Defer to eventController methods for actual event handling.
var eventController = require('./eventController.js');

module.exports = function(app) {

  // Here we define all relevant routes on /api/events.
  app.route('/')
    .get(eventController.fetchEvents);
    
};