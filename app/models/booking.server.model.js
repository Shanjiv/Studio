'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Booking Schema
var BookingSchema = new Schema({

		tutor: { type: Schema.Types.ObjectId, ref: 'User' },

		student: { type: Schema.Types.ObjectId, ref: 'User' },

		transaction: { type: Schema.Types.ObjectId, ref: 'Transaction' },

		rating: {
				type: Number,
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

// Method to recalculate tutors rating

module.exports = mongoose.model('Booking', BookingSchema);