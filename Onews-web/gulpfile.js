var gulp = require('gulp'),
    connect = require('gulp-connect'),
    pug = require('gulp-pug');

var paths = {
    scripts: 'src/js/**/*.*',
    styles: 'src/less/**/*.*',
    images: 'src/img/**/*.*',
    templates: 'src/templates/**/*.html',
    index: 'src/index.pug',
    bower_fonts: 'src/components/**/*.{ttf,woff,eof,svg}',
};


gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8888
    });
});

gulp.task('views', function buildHTML() {
  return gulp.src('src/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['views', 'webserver']);