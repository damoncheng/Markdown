// Karma configuration
// Generated on Sun Jan 13 2019 21:59:03 GMT+0800 (GMT+08:00)

const webpackConfig = require('./webpack.config.js');
path = require('path');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
	    'browserify',
	    //'jasmine',
		'mocha',
		'chai'
	],


    // list of files / patterns to load in the browser
    files: [
		'test/spec/**/*Spec.js'
    ],


    // list of files / patterns to exclude
    exclude: [
		path.join(__dirname, 'node_modules')
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'test/spec/**/*Spec.js': [ 'webpack' ]
    },

	webpack: {

	  mode: "development",

	  // webpack module config
	  module: webpackConfig.module

    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'html'],
	htmlReporter: { 
            outputFile: 'test-units.html', 
            // Optional 
            pageTitle: 'Unit Tests', 
            subPageTitle: 'A sample project description', 
            groupSuites: true, 
            useCompactStyle: true, 
            useLegacyStyle: true 
        },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
