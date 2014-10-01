var gulp   = require('gulp');
var gutil  = require('gulp-util');
var bower  = require('bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var sass   = require('gulp-sass');
var minCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh     = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  scripts: [
    'www/js/app.js',
    'www/js/**/*js'
  ],
  source: 'www/js/**/*',
  build: './www/build/'
};

gulp.task('concat', function(){
  return gulp.src(paths.scripts)
    .pipe(concat('niteout.js'))
    .pipe(gulp.dest(paths.build))
    .pipe(notify({message: 'Build Done'}));
});

gulp.task('uglify',function(){
  return gulp.src(paths.build + 'niteout.js')
    .pipe(uglify())
    .pipe(concat('niteout.min.js'))
    .pipe(gulp.dest(paths.build))
    .pipe(notify({message: 'Build Done'}));
});

gulp.task('build', ['concat']);

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.source, ['build']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
