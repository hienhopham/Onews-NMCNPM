var gulp = require('gulp'),
  connect = require('gulp-connect'),
  usemin = require('gulp-usemin'),
  pug = require('gulp-pug'),
  less = require('gulp-less'),
  minifyCss = require('gulp-minify-css'),
  minifyJs = require('gulp-uglify'),
  minifyHTML = require('gulp-htmlmin'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  watch = require('gulp-watch');

var util = require('gulp-util'),
    print = require('gulp-print');

var src = {
  scripts: ['src/frontend/**/*.module.js', 'src/frontend/**/*.config.js', 'src/frontend/**/*.js'],
  styles: 'src/frontend/**/**/*.less',
  images: 'src/assets/images/*.*',
  templates: 'src/frontend/**/**/*.pug',
  index: 'src/index.pug',
  bower_fonts: 'src/components/**/*.{ttf,woff,eof,svg}'
};
var destination = {
  root: 'dist',
  frontend: 'dist/frontend',
  images: 'dist/images',
  lib: 'dist/lib'
};

gulp.task('webserver', function() {
  connect.server({
    root: destination.root,
    livereload: true,
    port: 8585
  });
});

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
  return gulp.src(src.index)
    .pipe(pug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(usemin({
        js: [minifyJs(), 'concat'],
        css: [minifyCss({keepSpecialComments: 0}), 'concat'],
    }))
    .pipe(gulp.dest(destination.root));
});

gulp.task('livereload', function() {
  gulp.src(['dist/**/*.*'])
    .pipe(watch(['dist/**/*.*']))
    .pipe(connect.reload());
});

gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
  return gulp.src(src.bower_fonts)
    .pipe(rename({
        dirname: '/fonts'
    }))
    .pipe(gulp.dest(destination.lib));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates']);

gulp.task('custom-templates', function buildHTML() {
  return gulp.src(src.templates)
    .pipe(pug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(gulp.dest(destination.frontend));
});

gulp.task('custom-less', function buildLess() {
  return gulp.src(src.styles)
    .pipe(less())
    .pipe(minifyCss())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(destination.frontend));
});

gulp.task('custom-images', function() {
  return gulp.src(src.images)
    .pipe(gulp.dest(destination.images));
});

gulp.task('custom-js', function() {
  return gulp.src(src.scripts)
    .pipe(minifyJs())
    .on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })
    .pipe(concat('onews.min.js'))
    .pipe(gulp.dest(destination.frontend));
});

gulp.task('watch', function(event) {
    gulp.watch([src.images], {cwd: './'}, ['custom-images']); 
    gulp.watch([src.styles], {cwd: './'}, ['custom-less']);
    gulp.watch([src.scripts], {cwd: './'}, ['custom-js']);
    gulp.watch([src.templates], {cwd: './'}, ['custom-templates']);
    gulp.watch([src.index], ['usemin']);
});

gulp.task('build', ['build-assets', 'build-custom', 'usemin']);
gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);