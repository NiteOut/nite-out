// Defer to eventController methods for actual event handling.
// Here we define all relevant routes on /api/events.
var eventController = require('./eventController.js');

module.exports = function(app) {

  app.route('/')
    .get(eventController.fetchEvents);
    
};