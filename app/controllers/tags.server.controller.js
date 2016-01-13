'use strict';

// Module dependencies
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var Tag = mongoose.model('Tag');
var _ = require('lodash');

// Create a tag
exports.create = function(req, res) {
		req.body.creator = req.user._id;
		req.body.updater = req.user._id;

		// Create a new tag instance
		var tag = new Tag(req.body);

		tag.save(function(err) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(tag);
				}
		});
};

// Show the current tag
exports.read = function(req, res) {
		res.json(req.tag);
};

// Update a tag
exports.update = function(req, res) {
		var tag = req.tag;

		tag = _.extend(tag, req.body);

		tag.updater = req.user._id;
		tag.updated = Date.now();

		tag.save(function(err) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(tag);
				}
		});
};

// Delete a tag
exports.delete = function(req, res) {
		var tag = req.tag;

		tag.remove(function(err) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(tag);
				}
		});
};

// List of Tags
exports.list = function(req, res) {
		Tag.find().sort('-created')
				.populate('updater', 'username displayName')
				.populate('creator', 'username displayName')
				.exec(function(err, tags) {
						if (err) {
								return res.status(400).send({
										message: errorHandler.getErrorMessage(err)
								});
						} else {
								res.json(tags);
						}
				});
};

// Tag middleware
exports.tagById = function(req, res, next, id) {
		Tag.
				findById(id)
				.populate('updater', 'username displayName')
				.populate('creator', 'username displayName')
				.exec(function(err, tag) {
						if (err) return next(err);
						if (!tag) return next(new Error('Failed to load tag ' + id + '.'));
						req.tag = tag;
						next();
				});
};

// Tag authorization middleware
exports.hasAuthorization = function(req, res, next) {
		if (req.tag.creator.id !== req.user.id) {
				return res.status(403).send({
						message: 'User is not authorized.'
				});
		}
		next();
};