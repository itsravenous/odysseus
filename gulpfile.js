var gulp = require('gulp'),
    hb = require('gulp-hb'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    bower = require('gulp-bower'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

gulp.task('default', ['js', 'templates', 'sass', 'bower', 'watch', 'connect']);

gulp.task('js', function(){
	browserify('src/app.js')
		.transform(babelify)
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./dist/'))
		.pipe(connect.reload());
});
 
gulp.task('templates', function () {
    return gulp
        .src('./src/**/*.html')
        .pipe(hb({
            helpers: './src/hbs/helpers/*.js',
            partials: './src/hbs/partials/**/*.hbs'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
  gulp.src('./src/sass/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('bower', function() {
  return bower('./bower_components')
    .pipe(gulp.dest('dist/'))
});

gulp.task('connect', function() {
  connect.server({root: 'dist'});
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.{html,hbs}', ['templates']);
  gulp.watch('./src/**/*.js', ['js']);
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});