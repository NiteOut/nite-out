var yelpController = require('./yelpController.js');

module.exports = function(app) {

  app.route('/')
    .get(yelpController.fetchBusiness);

};