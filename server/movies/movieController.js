var showtimes = require('showtimes');
var Movies = require('./movieModel.js');

module.exports = {

  fetchMovies: function(req, res, next) {
    var zipCode = req.query.zipcode;

    // Check if the zipcode has already been stored and return the stored results
    // Doing so allows us to limit the number of scrapes required and drastically
    // decreases both server load and api calls (at most onece per zipcode per day).
    Movies.findOne({zipcode: zipCode}, function(error, result) {
      // Handle errors on server and return error code client
      if (error) {
        console.error(error, 'Error fetching movies from database');
        res.json({results: [error]});
      } 
      if (result) {
        console.log('Successful zipcode fetch from database');
        res.json({results: result.results});
      } else {
        // Not found, conduct the scrape, store results and return.  Results can
        // be returned before asynchronous save is completed resulting in faster
        // response to the client.
        var shows = showtimes(zipCode, {});
        shows.getTheaters(function(err, theatres) {
          Movies.create({zipcode: zipCode, results: theatres});
          res.json({results: theatres});
        });
      }
    });
  }
};
