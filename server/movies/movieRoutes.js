// Defer to movieController methods for handling API requests.
var movieController = require('./movieController.js');

module.exports = function(app) {

  // Here we define all relevant routes on /api/movies.
  app.route('/')
    .get(movieController.fetchMovies);
    
};