// Holds all of the helper methods needed to manage calls
// to our movies api.  Keeping our methods seperate allows
// different api to access these methods in the event
// there exists a need for crossover.

// This NPM module has been modified for this application to
// more efficiently handle the needed requests and to fix errors
// that existed in the original source.
var showtimes = require('showtimes');
var Movies = require('./movieModel.js');

module.exports = {

  fetchMovies: function(req, res, next) {
    var zipCode = req.query.zipcode;
    // Check if the zipcode has already been stored and return the
    // stored results.  Doing so allows us to limit the number of
    // scrapes required and drastically decreases both server load
    // and api calls (at most once per zipcode per day).
    Movies.findOne({zipcode: zipCode}, function(error, result) {
      // Handle errors on server, log the error on server and
      // return error code client
      if (error) {
        console.error(error);
        response.writeHead(400);
        res.json({results: [error]});
      } 
      if (result) {
        // Results are returned as {zipcode: #, results: []}.
        // Results are parsed and returned as JSON {results: []} before
        // being sent to client.
        res.json({results: result.results});
      } else {
        // No database entry found, conduct the scrape, store results in
        // the databse and return to the user.  Results can be returned
        // before asynchronous save is completed, resulting in faster
        // response to the client.
        var shows = showtimes(zipCode, {});
        shows.getTheaters(function(error, theatres) {
          if (error) {
            console.error(error);
            res.json({results: [error]});
          }
          Movies.create({zipcode: zipCode, results: theatres});
          res.json({results: theatres});
        });
      }
    });
  }
};
