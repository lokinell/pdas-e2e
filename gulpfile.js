/*jshint node: true, camelcase: false*/
/*global require: true*/

'use strict';

var gulp = require('gulp'),
    argv = require('yargs').argv,
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    handleErrors = require('./gulp-handle-errors'),
    protractor = require('gulp-protractor').protractor;

/* to run individual suites pass `gulp itest --suite suiteName` */
gulp.task('protractor', function () {
    var configObj = {
        configFile: './protractor.conf.js'
    };
    if (argv.suite) {
        configObj['args'] = ['--suite', argv.suite];
    }
    return gulp.src([])
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(protractor(configObj))
        .on('error', function () {
            gutil.log('E2E Tests failed');
            process.exit(1);
        });
});

gulp.task('itest', ['protractor']);