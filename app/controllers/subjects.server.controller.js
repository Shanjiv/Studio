'use strict';

// Module dependencies
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var Subject = mongoose.model('Subject');
var Degree = mongoose.model('Degree');
var University = mongoose.model('University');
var _ = require('lodash');

// Create a subject
exports.create = function(req, res) {
		req.body.creator = req.user._id;
		req.body.updater = req.user._id;

		// Create a new subject instance
		var subject = new Subject(req.body);

		subject.save(function(err, subject) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(subject);

						// Now populate the subjects array of the parent: degree
						// Subject's degrees array is made to contain several degreeIds. But for now we only push the one degreeId into it from which the 'Create Subject' Call was initiated.
						// In the 'Update Degree' we have to allow the possibility to add an existing subjectId to the subjects array later on.
						Degree.findOneAndUpdate({ _id: subject.degrees[0]}, { $push: {subjects: subject._id } }, function (err, degree) {
								if (err)
										console.log(err);
						});
				}
		});
};

// Show the current subject
exports.read = function(req, res) {
		res.json(req.subject);
};

// Update a subject
exports.update = function(req, res) {

		var subject = _.extend(req.subject, req.body);
		subject.updater = req.user._id;
		subject.updated = Date.now();

		subject.save(function(err) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						// 1. Respond with the subject object
						res.json(subject);

//						// 2. Update all affected [degree.subjects] arrays
						// Currently deactivated as update is not incorporated in our Angular views yet.
//						Degree.update({_id: {$in: req.body.degrees}}, {$addToSet: {subjects: subject._id}}, {multi: true})
//								.exec(function(err, degrees) {
//										if (err) {
//												return res.status(400).send({
//														message: errorHandler.getErrorMessage(err)
//												});
//										}
//								});
//
//						Degree.update({_id: {$nin: req.body.degrees}}, {$pull: {subjects: subject._id}}, {multi: true})
//								.exec(function(err, degrees) {
//										if (err) {
//												return res.status(400).send({
//														message: errorHandler.getErrorMessage(err)
//												});
//										}
//								});
				}
		});
};

// Delete an subject
exports.delete = function(req, res) {
		var subject = req.subject;

		subject.remove(function(err) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(subject);
						// Now also remove the subjectId from the parents' subjects arrays
						Degree.update( { _id: subject.degrees[0].university } , { $pull: {subjects: subject._id} }, { multi: true })
								.exec(function(err, degrees) {
										if (err) {
												return res.status(400).send({
														message: errorHandler.getErrorMessage(err)
												});
										}
								});

				}
		});
};

// List of Subjects
exports.list = function(req, res) {
		Subject.find({degrees: {$in: [req.query.degreeId]}})
				.sort('-created')
				.populate('updater', 'username displayName')
				.populate('creator', 'username displayName')
				.populate('degrees', 'fullPath shortPath university')
				.exec(function(err, subjects) {
						if (err) {
								return res.status(400).send({
										message: errorHandler.getErrorMessage(err)
								});
						} else {
								res.json(subjects);
						}
		});
};

// Subject middleware
exports.subjectById = function(req, res, next, id) {
		Subject
				.findById(id)
				.populate('updater', 'username displayName')
				.populate('creator', 'username displayName')
				.populate('degrees', 'fullPath shortPath university')
				.exec(function(err, subject) {
						if (err) return next(err);
						if (!subject) return next(new Error('Failed to load subject ' + id + '.'));

						// We are adding subject to our req params
						req.subject = subject;
						next();
				});
};

// Subject authorization middleware
// hasAuthorization in this context means that you can only alter/delete/update those subjects that you have created yourself.
// On the contrary you could apply UsersController.hasAuthorization which checks whether the user possesses a particular role
exports.hasAuthorization = function(req, res, next) {
		if (req.subject.creator.id !== req.user.id) {
				return res.status(403).send({
						message: 'User is not authorized.'
				});
		}
		next();
};