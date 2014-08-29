var mongoose = require('mongoose');

// Zipcode represents the searched zipcode
// Results stores the returned results of the webscrape
var MovieSchema = new mongoose.Schema({
  zipcode: {
    type: String,
    required: true,
    primary: true
  },
  results: Array
});

module.exports = mongoose.model('Movies', MovieSchema);