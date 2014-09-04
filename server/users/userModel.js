'use strict';

// Defining the user model and attaching several methods
// which handle password checking for existing users and
// hashing when registering new users.
var db = require('../config/db.js');
var bcrypt = require('bcrypt');

var User = db.Model.extend({
  // Define the table to which the model belongs to (for Schema)
  tableName: 'users',

  // Adding timestamps for creation to handle 'Member since'
  hasTimestamps: true,

  // Setup an event listener to immediately hash the user's password
  // when a new account is being created.
  initialize: function(){
    this.on('creating', this.hashPass);
  },

  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },

  // This function handles generating a salt and saving the hashed
  // version of the user's password.
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

// Export the user model for use elsewhere.
module.exports = User;
