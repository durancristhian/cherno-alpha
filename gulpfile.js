var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	clean = require('gulp-clean'),
	minifycss = require('gulp-minify-css'),
	notify = require('gulp-notify'),
	rename = require('gulp-rename'),
	stylus = require('gulp-stylus'),
	watch = require('gulp-watch');

gulp.task('styles', ["clean"], function() {
	return gulp.src(['./app/css/styles.styl'])
		.pipe(stylus())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('./app/public/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./app/public/css'));
});

gulp.task('clean', function() {
	return gulp.src(['./app/public/css/*.*'], {read: false})
		.pipe(clean());
});

gulp.task('watch', function() {

	// Watch .styl files
	gulp.watch('./app/css/*.styl', ['styles']);
});

gulp.task('default', ["watch"]);