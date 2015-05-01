/* jshint node: true */
'use strict';
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var noop = function() {};
var stylish = require('gulp-jscs-stylish');
var jsonlint = require('gulp-jsonlint');
var csslint = require('gulp-csslint');
var sloc = require('gulp-sloc');

var options = {
  param: { // Project settings
    src: '.',
    debug: false
  }
};

var lintSources = ['*.js', options.param.src + '/js/*.js'];

gulp.task('jsonlint', function() {
  return gulp.src([
      options.param.src + '/manifest.webapp',
      options.param.src + '/*.json'
    ])
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});

gulp.task('csslint', function() {
  return gulp.src(options.param.src + '/css/*.css')
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter());
});

gulp.task('sloc', function() {
  gulp.src([
      options.param.src + '/*.html',
      options.param.src + '/js/*.js',
      options.param.src + '/css/*.css'
    ])
    .pipe(sloc());
});

/**
 * Runs JSLint and JSCS on all javascript files found in the app dir.
 */
gulp.task('lint', ['jsonlint', 'csslint', 'sloc'],
  function() {
    console.info(lintSources);
    return gulp.src(lintSources)
      .pipe(jshint('.jshintrc'))
      .pipe(jscs('.jscsrc'))
      .on('error', noop) // don't stop on error
      .pipe(stylish.combineWithHintResults())
      .pipe(jshint.reporter('default'));
  });

