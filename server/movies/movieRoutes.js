var movieController = require('./movieController.js');

module.exports = function(app) {

  app.route('/')
    .get(movieController.fetchMovies);
    
};