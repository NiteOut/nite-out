var key = require('../../keys.js').eventApiKey;
var Eventbrite = require('eventbrite')({
  app_key: key
});

module.exports = {

  fetchEvents: function(req, res, next) {
    var params = {
      within: 25,
      keywords: req.query.keyword || 'concert',
      postal_code: req.query.zipcode,
      max: 10
    };

    Eventbrite.event_search(params, function(error, data) {
      if (error) {
        console.log(error);
        res.send('An error occurred');
      } else {
        res.json({results: data.events.slice(1)});
      }
    });
  }
};