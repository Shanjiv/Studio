'use strict';

// Module dependencies
var UsersController = require('../controllers/users.server.controller');
var DegreesController = require('../controllers/degrees.server.controller');

module.exports = function(app) {

		var degreeRouter = require('express').Router({mergeParams: true});

		// Degree Routes
		degreeRouter.route('/')
				.get(DegreesController.list)
				.post(UsersController.requiresLogin, DegreesController.create);

		degreeRouter.route('/:degreeId')
				.get(DegreesController.read)
				.put(UsersController.requiresLogin, DegreesController.hasAuthorization, DegreesController.update)
				.delete(UsersController.requiresLogin, DegreesController.hasAuthorization, DegreesController.delete);

		// Finish by binding the degree middleware
		degreeRouter.param('degreeId', DegreesController.degreeById);

		app.use('/universities/:universityId/degrees', degreeRouter);
};