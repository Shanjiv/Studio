'use strict';

// Module dependencies
var UsersController = require('../controllers/users.server.controller');
var UniversitiesController = require('../controllers/universities.server.controller');

module.exports = function(app) {

		var universityRouter = require('express').Router();

		// University Routes
		universityRouter.route('/')
				.get(UniversitiesController.list)
				.post(UsersController.requiresLogin, UniversitiesController.create);

		universityRouter.route('/:universityId')
				.get(UniversitiesController.read)
				.put(UsersController.requiresLogin, UniversitiesController.hasAuthorization, UniversitiesController.update)
				.delete(UsersController.requiresLogin, UniversitiesController.hasAuthorization, UniversitiesController.delete);

		// Finish by binding the university middleware
		universityRouter.param('universityId', UniversitiesController.universityById);

		app.use('/universities/', universityRouter);

};