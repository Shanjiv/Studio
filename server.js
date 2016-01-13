'use strict';

// Module dependencies
var init = require('./config/init')();
var config = require('./config/config');
var mongoose = require('mongoose');
var	chalk = require('chalk');

// Bootstrap db connection
var db = mongoose.connect(config.db.uri, function(err) {
		if (err) {
				console.error(chalk.red('Could not connect to MongoDB!'));
				console.log(chalk.red(err));
		}
});

// Initialize the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('Magic happening on port ' + config.port);