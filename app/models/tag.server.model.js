'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Tag Schema
var TagSchema = new Schema({

		content: {
				type: String,
				trim: true,
				unique: 'Tag already exists.',
				required: 'Please fill in a tag.'
		},

		category: {
				type: String,
				trim: true
		},

		created: {
				type: Date,
				default: Date.now
		},
		creator: {type: Schema.Types.ObjectId, ref: 'User'},

		updated: {
				type: Date,
				default: Date.now
		},
		updater: {type: Schema.Types.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Tag', TagSchema);