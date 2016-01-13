'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Payment Schema
var PaymentSchema = new Schema({

		method: {
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

module.exports = mongoose.model('Payment', PaymentSchema);