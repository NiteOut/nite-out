// Holds all of the helper methods needed to manage calls
// to our events api.  Keeping our methods seperate allows
// different api to access these methods in the event
// there exists a need for crossover.
var key = require('../../keys.js').eventApiKey;
var Eventbrite = require('eventbrite')({
  app_key: key
});

module.exports = {

  // By default we set our search distance to 25 miles from 
  // the requested search area, and limit our results to 10
  // in order to reduce query time.
  fetchEvents: function(req, res, next) {
    var params = {
      within: 25,
      // Default to a concert event if no keyword is provided
      keywords: req.query.keyword || 'concert',
      postal_code: req.query.zipcode,
      max: 10
    };

    // Call to the Eventbrite API with our requested parameters
    // if an error is returned we log the error on the server
    // for debugging, and send an error response to the user
    Eventbrite.event_search(params, function(error, data) {
      if (error) {
        console.log(error);
        res.send('An error occurred', error);
      } else {
        // Eventbrite API returns a summary in the first position
        // of its results, we strip it out before returning that
        // data to the user.  Query results are always returned
        // to client application as JSON {results: []}.
        res.json({results: data.events.slice(1)});
      }
    });
  }

};