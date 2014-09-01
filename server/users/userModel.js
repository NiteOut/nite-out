var db = require('../config/db.js');
var bcrypt = require('bcrypt');

var User = db.Model.extend({
  tableName: 'users',

  hasTimestamps: true,

  initialize: function(){
    this.on('creating', this.hashPass);
  },

  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },

  hashPass: function(){
    var db = this;
    var password = this.get('password');
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          db.set('password', hash).save();
        });
    });
  }
  
});

module.exports = User;
