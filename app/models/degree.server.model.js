'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Degree Schema
var DegreeSchema = new Schema({

		university: {
				type: Schema.Types.ObjectId, ref: 'University',
				required: true
		},

		fullPath: {
				type: String,
				trim: true,
				required: 'Dieses Feld ist zwingend erforderlich.'
		},

		shortPath: {
				type: String,
				trim: true,
				required: 'Dieses Feld ist zwingend erforderlich. Falls die Hochschule keine nennenswerte Abkürzung trägt, bitte die vollständige Studiengangsbezeichnung angeben.'
		},

		level: {
				type: String,
				enum: ['Bachelor', 'Master', 'Diplom', 'Lehramt', 'Staatsexamen'],
				required: true
		},

		description: {
				type: String,
				trim: true
		},

		leads: {
				type: Number,
				trim: true,
				default: 0
		},

		subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],

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

//DegreeSchema.index({'subjects':1});

module.exports = mongoose.model('Degree', DegreeSchema);