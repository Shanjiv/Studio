'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Transaction Schema
var TransactionSchema = new Schema({

		amount: {
				type: Number,
				trim: true
		},

		currency: {
				type: String,
				enum: ['EUR', 'USD', 'CHF']
		},

		status: {
				type: String,
				enum: ['success', 'failure', 'pending']
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

module.exports = mongoose.model('Transaction', TransactionSchema);