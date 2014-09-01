var eventController = require('./eventController.js');

module.exports = function(app) {

  app.route('/')
    .get(eventController.fetchEvents);
    
};