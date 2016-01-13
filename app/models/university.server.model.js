'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

// University Schema
var UniversitySchema = new Schema({

		fullName: {
				type: String,
				trim: true,
				required: 'fullName cannot be blank',
				unique: 'Eintrag für diese Bildungseinrichtung existiert bereits.'
		},

		shortName: {
				type: String,
				trim: true,
				required: 'shortName ist zwingend erforderlich',
				unique: 'Eintrag für diese Bildungseinrichtung existiert bereits.'
		},

		abbreviation: {
				type: String,
				trim: true,
				required: 'Abkürzung ist zwingend erforderlich.'
//				unique: 'Diese Abkürzung wird bereits verwendet.'
		},

		leads: {
				type: Number,
				trim: true,
				default: 0
		},

		degrees: [{ type: Schema.Types.ObjectId, ref: 'Degree' }],

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

module.exports = mongoose.model('University', UniversitySchema);