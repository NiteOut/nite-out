var Yelp = require('yelp');
var keys = require('../../keys.js');

var yelp = Yelp.createClient({
  consumer_key: keys.yelpKey,
  consumer_secret: keys.yelpSecret,
  token: keys.yelpToken,
  token_secret: keys.yelpTokenSecret
});

module.exports = {
  fetchLocation: function(req, res, next) {

  }
};