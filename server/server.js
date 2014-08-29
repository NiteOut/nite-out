//////////////////////////////////////////
// This file serves to start the server
// and connect to the database.  By
// exporting the app allows deferring to
// to middleware for routing.
//////////////////////////////////////////

var express = require('express');
var mongoose = require('mongoose');

var dbURL = process.env.DBURL || 'mongodb://localhost/nite-out';
mongoose.connect(dbURL);

var app = express();

require('./config/middleware.js')(app, express);

module.exports = app;