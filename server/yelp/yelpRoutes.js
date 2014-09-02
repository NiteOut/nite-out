// yelpController houses relevant methods for handling requests
var yelpController = require('./yelpController.js');

module.exports = function(app) {

  // Here we define all relevant routes on /api/yelp
  app.route('/')
    .get(yelpController.fetchBusiness);

};