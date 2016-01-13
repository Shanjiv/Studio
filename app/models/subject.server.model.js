'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Subject Schema
var SubjectSchema = new Schema({

		degrees: [{ type: Schema.Types.ObjectId, ref: 'Degree'}],

		fullTitle: {
				type: String,
				trim: true,
				required: true
		},

		shortTitle: {
				type: String,
				trim: true
		},

		semester: {
				type: Number,
				trim: true
		},

		description: {
				type: String,
				trim: true
		},

		tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],

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

//SubjectSchema.index({'degrees':1});

module.exports = mongoose.model('Subject', SubjectSchema);