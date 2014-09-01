var crypto = require('crypto');
var bcrypt = require('bcrypt');
var db = require('../config/db.js');
var User = require('./userModel.js');
var Users = require('./userCollection.js');

module.exports = {

  loginUser: function(req, res, next) {
    var email = req.query.email;
    var password = req.query.password;

    new User({ email: email })
      .fetch()
      .then(function(user) {
        if (!user) {
          res.send('User not found');
        } else {
          user.comparePassword(password, function(match) {
            if (match) {
              res.send('Logged in');
            } else {
              res.send('Incorrect password');
            }
          });
        }
    });
  },

  signupUser: function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    new User({ email: email })
      .fetch()
      .then(function(user) {
        if (!user) {
          var newUser = new User({
            email: email,
            password: password,
          });
          newUser.save()
            .then(function(newUser) {
              Users.add(newUser);
              res.send('user created!');
            });
        } else {
          res.send('Account already exists');
        }
      });
  },

  editUser: function(req, res, next) {
    console.log('put request on user api');
    res.send('Changes made!');
  },

};
