'use strict';

// Module dependencies
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var Degree = mongoose.model('Degree');
var Subject = mongoose.model('Subject');
var University = mongoose.model('University');
var _ = require('lodash');

// Create a degree
exports.create = function(req, res) {
		req.body.creator = req.user._id;
		req.body.updater = req.user._id;

		// Create a new degree instance
		var degree = new Degree(req.body);

		degree.save(function(err, degree) {
				if (err) {
//						console.log(err);
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(degree);

						// Now populate the degrees array of the parent
						University.findOneAndUpdate({ _id: degree.university}, { $push: {degrees: degree._id } }, function (err, university) {
								if (err)
									console.log(err);
						});
				}
		});
};

// Show the current degree
exports.read = function(req, res) {
		res.json(req.degree);
};

// Update a degree
exports.update = function(req, res) {

		var degree = _.extend(req.degree, req.body);
		degree.updater = req.user._id;
		degree.updated = Date.now();

		degree.save(function(err) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						// 1. Respond with the degree object
						res.json(degree);

						// 2. Update all affected [subject.degrees] arrays
						Subject.update({_id: {$in: req.body.subjects}}, {$addToSet: {degrees: degree._id}}, {multi: true})
								.exec(function(err, subjects) {
										if (err) {
												return res.status(400).send({
														message: errorHandler.getErrorMessage(err)
												});
										}
								});

						Subject.update({_id: {$nin: req.body.subjects}}, {$pull: {degrees: degree._id}}, {multi: true})
								.exec(function(err, subjects) {
										if (err) {
												return res.status(400).send({
														message: errorHandler.getErrorMessage(err)
												});
										}
								});
				}
		});
};

// Delete an degree
exports.delete = function(req, res) {
		var degree = req.degree;

		degree.remove(function(err) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(degree);
						// Now also remove the degreeId from the parent's degrees array
						University.findOneAndUpdate({ _id: degree.university}, { $pull: {degrees: degree._id } }, function (err, university) {
								if (err)
										console.log(err);
						});
				}
		});
};

// List of Degrees
exports.list = function(req, res) {
		Degree.find({university: req.params.universityId})
				.sort('-leads')
				.populate('updater', 'username displayName')
				.populate('creator', 'username displayName')
				.populate('university', 'fullName shortName abbreviation')
				.exec(function(err, degrees) {
						if (err) {
								return res.status(400).send({
										message: errorHandler.getErrorMessage(err)
								});
						} else {
								res.json(degrees);
						}
		});
};

// Degree middleware
exports.degreeById = function(req, res, next, id) {
		Degree
				.findById(id)
				.populate('updater', 'username displayName')
				.populate('creator', 'username displayName')
				.populate('university', 'fullName shortName abbreviation')
				.populate('subject', 'fullTitle level')
				.exec(function(err, degree) {
						if (err) return next(err);
						if (!degree) return next(new Error('Failed to load degree ' + id + '.'));

						// We are adding degree to our req params
						req.degree = degree;
						next();
				});
};

// Degree authorization middleware
// hasAuthorization in this context means that you can only alter/delete/update those degrees that you have created yourself.
// On the contrary you could apply UsersController.hasAuthorization which checks whether the user possesses a particular role
exports.hasAuthorization = function(req, res, next) {
		if (req.degree.creator.id !== req.user.id) {
				return res.status(403).send({
						message: 'User is not authorized.'
				});
		}
		next();
};