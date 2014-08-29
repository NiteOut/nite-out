//////////////////////////////////////////
// This file serves to start the server.
// By exporting the app module we can
// pass it to the middleware for routing
//////////////////////////////////////////

var express = require('express');

var app = express();

require('./config/middleware.js')(app, express);

module.exports = app;