'use strict';

// Module dependencies
var UsersController = require('../controllers/users.server.controller');
var TagsController = require('../controllers/tags.server.controller');

module.exports = function(app) {

		var tagRouter = require('express').Router({mergeParams: true});

		// Subject Routes
		tagRouter.route('/')
				.get(TagsController.list)
				.post(UsersController.requiresLogin, TagsController.create);

		tagRouter.route('/:tagId')
				.get(TagsController.read)
				.put(UsersController.requiresLogin, TagsController.hasAuthorization, TagsController.update)
				.delete(UsersController.requiresLogin, TagsController.hasAuthorization, TagsController.delete);

		// Finish by binding the subject middleware
		tagRouter.param('tagId', TagsController.tagById);

		app.use('/tags', tagRouter);
};
