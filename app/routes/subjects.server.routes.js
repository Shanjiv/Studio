'use strict';

// Module dependencies
var UsersController = require('../controllers/users.server.controller');
var SubjectsController = require('../controllers/subjects.server.controller');

module.exports = function(app) {

		var subjectRouter = require('express').Router({mergeParams: true});

		// Subject Routes
		subjectRouter.route('/')
				.get(SubjectsController.list)
				.post(UsersController.requiresLogin, SubjectsController.create);

		subjectRouter.route('/:subjectId')
				.get(SubjectsController.read)
				.put(UsersController.requiresLogin, SubjectsController.hasAuthorization, SubjectsController.update)
				.delete(UsersController.requiresLogin, SubjectsController.hasAuthorization, SubjectsController.delete);

		// Finish by binding the subject middleware
		subjectRouter.param('subjectId', SubjectsController.subjectById);

		app.use('/universities/:universityId/subjects', subjectRouter);
};