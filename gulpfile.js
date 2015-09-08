
var gulp = require('gulp');
var sass = require('gulp-less');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');


gulp.task('less', function(){
    return gulp.src('public/assets/less/style.less')
    	.pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer('last 3 versions'))
        //.pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
	gulp.watch('public/assets/less/*.less', ['less']);
});

gulp.task('default', ['watch']);
