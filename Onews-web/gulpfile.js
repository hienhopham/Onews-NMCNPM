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
  watch = require('gulp-watch'),
  cssbeautify = require('gulp-cssbeautify'),
  util = require('gulp-util'),
  print = require('gulp-print');

// backend
var nodemon = require('gulp-nodemon');
  notify = require('gulp-notify');
  livereload = require('gulp-livereload');

var src = {
  scripts: ['src/frontend/**/*.module.js', 'src/frontend/**/*.config.js', 'src/frontend/**/*.js'],
  styles: ['src/common.less', 'src/frontend/**/**/*.less'],
  images: 'src/assets/images/*.*',
  templates: 'src/frontend/**/**/*.pug',
  index: 'src/index.pug',
  bower_fonts: 'src/components/**/*.{ttf,woff,eof,svg}',
  scripts_assets: 'src/assets/js/*.js',
  scripts_core: ['src/assets/core/*.module.js', 'src/assets/core/*.js']
};
var src_admin = {
  scripts: ['src/admin/**/*.module.js', 'src/admin/**/*.config.js', 'src/admin/**/*.js'],
  styles: 'src/admin/**/**/*.less',
  // images: 'src/assets/images/*.*',
  templates: 'src/admin/**/**/*.pug'
};

var destination = {
  root: 'dist',
  admin:'dist/admin',
  frontend: 'dist/frontend',
  images: 'dist/images',
  lib: 'dist/lib',
  scripts_assets: 'dist/assets/js',
  scripts_core: 'dist/assets/core'
};

var src_backend = 'src/backend/**/*.js',
  dest_backend = 'dist/backend';

gulp.task('server', ['custom-js-backend'], function() {
  livereload.listen();
  nodemon({
    script: 'dist/backend/server.js',
    ext: 'js'
  }).on('restart', function(){
    gulp.src('backend/server.js')
      .pipe(livereload())
      .pipe(notify('Reloading page, please wait...'));
  })
});

gulp.task('custom-js-backend', function() {
  return gulp.src(src_backend)
    .pipe(minifyJs())
    .on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(dest_backend));
});

gulp.task('backend', ['custom-js-backend', 'server']);

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

gulp.task('script-assets', function() {
  return gulp.src(src.scripts_assets)
    .pipe(minifyJs())
    .on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })
    .pipe(concat('onews-assets.min.js'))
    .pipe(gulp.dest(destination.scripts_assets));
});

gulp.task('script-core', function() {
  return gulp.src(src.scripts_core)
    .pipe(minifyJs())
    .on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })
    .pipe(concat('onews-core.min.js'))
    .pipe(gulp.dest(destination.scripts_core));
});

gulp.task('custom-admin-js', function() {
  return gulp.src(src_admin.scripts)
    .pipe(minifyJs())
    .on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })
    .pipe(concat('onews-admin.min.js'))
    .pipe(gulp.dest(destination.admin));
});

gulp.task('custom-admin-less', function() {
  return gulp.src(src_admin.styles)
  .pipe(less())
  .pipe(concat('onews-admin.min.css'))
  .pipe(gulp.dest(destination.admin));
});

gulp.task('custom-admin-templates', function buildHTML() {
  return gulp.src(src_admin.templates)
    .pipe(pug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(gulp.dest(destination.admin));
});

gulp.task('build-custom-admin', ['custom-admin-js', 'custom-admin-less', 'custom-admin-templates']);

gulp.task('watch', function(event) {
    gulp.watch([src.images], {cwd: './'}, ['custom-images']);
    gulp.watch([src.styles], {cwd: './'}, ['custom-less']);
    gulp.watch([src.scripts], {cwd: './'}, ['custom-js']);
    gulp.watch([src.templates], {cwd: './'}, ['custom-templates']);
    gulp.watch([src.index], ['usemin']);
    gulp.watch([src.scripts_assets], ['script-assets']);
    gulp.watch([src.scripts_core], ['script-core']);

    gulp.watch([src_admin.styles], {cwd: './'}, ['custom-admin-less']);
    gulp.watch([src_admin.scripts], {cwd: './'}, ['custom-admin-js']);
    gulp.watch([src_admin.templates], {cwd: './'}, ['custom-admin-templates']);

    gulp.watch([src_backend], {cwd: './'}, ['custom-js-backend']);
});

gulp.task('build', ['build-assets', 'build-custom', 'usemin', 'script-assets', 'script-core']);
gulp.task('default', ['build', 'build-custom-admin', 'livereload', 'watch', 'backend']);