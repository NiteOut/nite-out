var gulp = require('gulp');
var concat = require('gulp-concat');
var karma = require('gulp-karma');
var refresh = require('gulp-livereload');
var client = require('tiny-lr');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');

var paths = {
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/style.css'],
  test: ['specs/**/*.js']
};

gulp.task('test', function() {

});

gulp.task('live', function () {
  client.listen(35729, function (err) {
    if(err) {
      console.error(err);
    }
  });
});

gulp.task('lint', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(refresh(client));
});

gulp.task('serve', function() {
  nodemon({script: 'index.js', ignore: 'node_modules/**/*.js'})
      .on('restart', function () {
        refresh(client);
      });
});

gulp.task('html', function () {
  return gulp.src(paths.html)
    .pipe(refresh(client));
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(refresh(client));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['lint']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['lint', 'live', 'serve', 'watch']);

// gulp.task('build', ['lint', 'test', 'concat', 'uglify']);