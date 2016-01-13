'use strict';

// Module dependencies
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var University = mongoose.model('University');
var _ = require('lodash');

// Create a university
exports.create = function(req, res) {
		req.body.creator = req.user._id;
		req.body.updater = req.user._id;

		// Create a new university instance
		var university = new University(req.body);

		university.save(function(err) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(university);
				}
		});
};

// Show the current university
exports.read = function(req, res) {
		res.json(req.university);
};

// Update a university
exports.update = function(req, res) {
		var university = req.university;

		university = _.extend(university, req.body);

		university.updater = req.user._id;
		university.updated = Date.now();

		university.save(function(err) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(university);
				}
		});
};

// Delete an university
exports.delete = function(req, res) {
		var university = req.university;

		university.remove(function(err) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(university);
				}
		});
};

// List of Universities
exports.list = function(req, res) {
		University.find().sort('-leads')
				.populate('updater', 'username displayName')
				.populate('creator', 'username displayName')
				.exec(function(err, universities) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(universities);
				}
		});
};

// University middleware
exports.universityById = function(req, res, next, id) {
		University.
				findById(id)
				.populate('updater', 'username displayName')
				.populate('creator', 'username displayName')
				.exec(function(err, university) {
						if (err) return next(err);
						if (!university) return next(new Error('Failed to load university ' + id + '.'));
						req.university = university;
						next();
				});
};

// University authorization middleware
// hasAuthorization in this context means that you can only alter/delete/update those universities that you have created yourself.
// On the contrary you could apply UsersController.hasAuthorization which checks whether the user possesses a particular role
exports.hasAuthorization = function(req, res, next) {
		if (req.university.creator.id !== req.user.id) {
				return res.status(403).send({
						message: 'User is not authorized.'
				});
		}
		next();
};