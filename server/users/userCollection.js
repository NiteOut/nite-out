var db = require('../config/db.js');
var User = require('./userModel.js');

var Users = new db.Collection({
  model: User
});

module.exports = Users;