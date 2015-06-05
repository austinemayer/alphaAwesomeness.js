'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  gulp.src('./assets/scss/**/*.scss')
      .pipe(sourcemaps.init())
      //.pipe(uglify())
      .pipe(sass({
        includePaths: ['bower_components/foundation/scss']
      }).on('error', sass.logError))
      .pipe(sourcemaps.write('./public/maps'))
      .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass']);
