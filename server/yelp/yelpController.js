// Yelp API is used in fetching secondary data upon user request.
var Yelp = require('yelp');
var keys = require('../../keys.js');

var yelp = Yelp.createClient({
  consumer_key: keys.yelpKey,
  consumer_secret: keys.yelpSecret,
  token: keys.yelpToken,
  token_secret: keys.yelpTokenSecret
});

module.exports = {
  fetchBusiness: function(req, res, next) {
    // Introduce proper formatting before making the API call.
    // Space characters need to be represented as hyphens in order
    // to be recognized by the API.
    var name = req.query.name.replace(' ', '-');
    var location = req.query.location.replace(' ', '-');

    // Conduct API call and pass the data on to the user.
    yelp.business(name + '-' + location, function(error, data) {
      // Log the error on the server, and let the client know there was
      // an error handling the request.
      if(error) {
        console.log(error);
        res.writeHead(500);
        res.send('There was an error processing your request');
      } else {
        // Return the business information resulting from the Yelp query
        res.json(data);
      }
    });
  }
};