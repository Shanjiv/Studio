'use strict';

// Module dependencies
var CoreController = require('../controllers/core.server.controller');

module.exports = function(app) {

		// Index Route
		app.route('/')
				.get(CoreController.index);

};