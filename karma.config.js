'use strict';

// Module dependencies
var assets = require('./config/assets.json');
var _ = require('lodash');

// Karma configuration
module.exports = function(config) {
		config.set({
				// Frameworks to use
				frameworks: ['jasmine'],

				// List of files / patterns to load in the browser
				files: _.union(
						assets.lib.js.head['public/dist/head.lib.min.js'],
						assets.lib.js.header['public/dist/header.lib.min.js'],
						assets.lib.js.footer['public/dist/footer.lib.min.js'],
						assets.app.js.head['public/dist/head.app.min.js'],
						assets.app.js.header['public/dist/header.app.min.js'],
						assets.app.js.footer['public/dist/footer.app.min.js'],
						assets.app.js.tests
				),

				// Test results reporter to use
				// Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
				reporters: ['progress'],

				// Web server port
				port: 9876,

				// Enable / disable colors in the output (reporters and logs)
				colors: true,

				// Level of logging
				// Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
				logLevel: config.LOG_INFO,

				// Enable / disable watching file and executing tests whenever any file changes
				autoWatch: true,

				// Start these browsers, currently available:
				// - Chrome
				// - ChromeCanary
				// - Firefox
				// - Opera
				// - Safari (only Mac)
				// - PhantomJS
				// - IE (only Windows)
				browsers: ['PhantomJS'],

				// If browser does not capture in given timeout [ms], kill it
				captureTimeout: 60000,

				// Continuous Integration mode
				// If true, it capture browsers, run tests and exit
				singleRun: true
		});
};