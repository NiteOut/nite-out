'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var refresh = require('gulp-livereload');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/style.css'],
  test: ['specs/**/*.js']
};

gulp.task('concat', function() {
  gulp.src([
    './client/bower_components/angular/angular.js',
    './client/bower_components/angular-ui-router/release/angular-ui-router.js',
    './client/bower_components/lodash/dist/lodash.underscore.js',
    './client/bower_components/angular-google-maps/dist/angular-google-maps.js',
    './client/app/**/*.js'
    ])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./client/build/'));
});

gulp.task('compress', function() {
  gulp.src('client/build/build.js')
    .pipe(uglify())
    .pipe(gulp.dest('client/dist'));
});

gulp.task('serve', function() {
  nodemon({script: 'index.js', ignore: 'node_modules/**/*.js'})
    .on('restart', function () {
      refresh();
    });
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(refresh());
});

gulp.task('html', function () {
  return gulp.src(paths.html)
    .pipe(refresh());
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(refresh());
});

gulp.task('watch', function() {

  gulp.watch(paths.scripts, ['lint']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['build', 'serve', 'watch']);
gulp.task('build', ['lint', 'concat', 'compress']);
