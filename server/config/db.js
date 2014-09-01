var knex = require('knex')({
    client: 'mysql',
    connection: {
      host     : '127.0.0.1',
      user     : 'root',
      password : '',
      database : 'nite-out',
      charset  : 'utf8'
    }
  });
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('email', 100).unique().notNullable();
      user.string('password', 100);
      user.string('first_name', 100);
      user.string('last_name', 100);
      user.timestamps();
    }).then(function() {
      console.log('users created');
    });
  }
});

module.exports = db;