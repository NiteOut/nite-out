// We must define a collection for bookshelf to handle all events
// regarding to accessing one or more users.  This enables us to
// update or save to the database.
var db = require('../config/db.js');
var User = require('./userModel.js');

var Users = new db.Collection({
  model: User
});

module.exports = Users;