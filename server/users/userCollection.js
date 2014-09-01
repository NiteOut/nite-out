// Define a collection for bookshelf to handle all events
// regarding to accessing one or more users.  This enables us to
// update or save to the database.
var db = require('../config/db.js');
var User = require('./userModel.js');

// Define the new collection on the database, instantiated with the
// User model
var Users = new db.Collection({
  model: User
});

// Export the collection for use elsewhere
module.exports = Users;