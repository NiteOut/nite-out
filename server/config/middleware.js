var bodyParser = require('body-parser');

module.exports = function(app, express) {
  var movieRouter = express.Router();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(__dirname + '../../client'));

  app.use('/api/movies', movieRouter);
  
  require('../movies/movieRoutes.js')(movieRouter);
};