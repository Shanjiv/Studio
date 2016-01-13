'use strict';

var LeadsController = require('../controllers/leads.server.controller');
var UsersController = require('../controllers/users.server.controller');

// Be aware these are all middlewares. They are processed in order. So every cal that comes in order before the very
// last one is considered a middleware. So call

module.exports = function (app) {
		// Lead routes
		app.route('/leads')
				.get(LeadsController.list)
				.post(LeadsController.create);

		app.route('/leads/:leadId')
				.get(LeadsController.read)
				.put(UsersController.requiresLogin, UsersController.hasAuthorization(['admin']), LeadsController.update)
				.delete(UsersController.requiresLogin, UsersController.hasAuthorization(['admin']), LeadsController.delete);

		app.route('/verify/:token')
				.get(LeadsController.verifyByToken);

		// Lead middleware
		// We will use Express’s .param() middleware. This creates middleware that will run for a certain route parameter.
		// In our case, we are using :leadId in some of our lead routes.
		app.param('leadId', LeadsController.leadById);
};