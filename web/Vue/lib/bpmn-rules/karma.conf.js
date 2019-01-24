// Karma configuration
// Generated on Sun Jan 06 2019 15:01:34 GMT+0800 (GMT+08:00)

path = require('path')


var browsers =
  (process.env.TEST_BROWSERS || 'ChromeHeadless')
    .replace(/^\s+|\s+$/, '')
    .split(/\s*,\s*/g)
    .map(function(browser) {
      if (browser === 'ChromeHeadless') {
        process.env.CHROME_BIN = require('puppeteer').executablePath();

        // workaround https://github.com/GoogleChrome/puppeteer/issues/290
        if (process.platform === 'linux') {
          return 'ChromeHeadless_Linux';
        }
      }

      return browser;
    });

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
		'browserify',
		'mocha',
		'chai'
	],


    // list of files / patterns to load in the browser
    files: [
		"test/*.js"
    ],


    // list of files / patterns to exclude
    exclude: [
		path.join(__dirname, 'node_modules')
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		 "test/*.js": ["webpack"]
    },

	customLaunchers: {
      ChromeHeadless_Linux: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ],
        debug: true
      }
    },

    browsers: browsers,

    browserNoActivityTimeout: 30000,

    webpack: {

	  mode: "development",

	  // webpack config
	  module: {

	       rules: [
		      { 
				 test: /\.js$/, 
				 use: 'babel-loader',
				 exclude: [/node_modules/, __dirname + "/lib"],
			  },
			  { 
				 test: /\.css$/, 
				 use: [

					 { loader: 'style-loader' },
					 
					 {
						loader: 'css-loader',
						options: {
						  modules: true
						}
					 },

					 { loader: 'sass-loader' }

				 ],
			  },
			  { 
				 test: /\.ts$/, 
				 use: 'ts-loader'
			  },
			  {   
				 test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
				 loader: "file-loader" 
			  },
			  { 
			     test: /\.(bpmn|svg)$/, 
				 use: 'raw-loader'
			  }
		   ]

       }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


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
