//////////////////////////////////////////
// All middleware installation and router
// injection happens here
//////////////////////////////////////////
var bodyParser = require('body-parser');

module.exports = function(app, express) {

  // Inject all middleware dependencies that will be used
  // in all routes
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(__dirname + '/../../client'));

  // Each independent api will have its own router
  // allowing us to easily manipulate the routes
  // in the api without cluttering our middleware file
  var movieRouter = express.Router();
  var yelpRouter = express.Router();
  var userRouter = express.Router();
  var eventRouter = express.Router();

  // Define which routers are assigned to each route.
  // Wildcard is defined last in order to route to index
  app.use('/api/movies', movieRouter);
  app.use('/api/yelp', yelpRouter);
  app.use('/users', userRouter);
  app.use('/api/events', eventRouter);

  app.get('/*', function(req, res) {
    res.redirect('/');
  });

  // We pass into the instantiation of each routes file
  // the individual router that handles its routing.
  require('../movies/movieRoutes.js')(movieRouter);
  require('../yelp/yelpRoutes.js')(yelpRouter);
  require('../users/userRoutes.js')(userRouter);
  require('../events/eventRoutes.js')(eventRouter);
};
