var showtimes = require('showtimes');

module.exports = {

  fetchMovies: function(req, res, next) {
    var zipCode = req.query.zipcode;

    var shows = showtimes(zipCode, {});

    shows.getTheaters(function(err, theatres) {
      res.json({results: theatres});
    });
  }

};
