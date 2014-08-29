var showtimes = require('showtimes');

module.exports = {
  fetchMovies: function(req, res, next) {
    var zipCode = req.param.zipCode;
    var shows = showtimes(zipCode, {});

    shows.getTheaters(function(error, theatres) {
      res.json({results: theatres});
    });
  }
};