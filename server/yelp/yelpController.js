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
    var name = req.query.name;
    var location = req.query.location;

    yelp.business(name + '-' + location, function(error, data) {
      res.json(data);
    });
  }
};