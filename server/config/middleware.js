var bodyParser = require('body-parser');

module.exports = function(app, express) {
  var movieRouter = express.Router();
  var yelpRouter = express.Router();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/movies', movieRouter);
  app.use('/api/yelp', yelpRouter);

  require('../movies/movieRoutes.js')(movieRouter);
  require('../yelp/yelpRoutes.js')(yelpRouter);
};
