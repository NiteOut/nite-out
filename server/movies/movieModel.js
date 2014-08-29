var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  zipcode: {
    type: String,
    required: true,
    primary: true
  },
  results: Array
});

module.exports = mongoose.model('Movies', MovieSchema);