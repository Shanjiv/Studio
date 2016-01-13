'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Communication Schema
var CommunicationSchema = new Schema({

		participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]

});

module.exports = mongoose.model('Communication', CommunicationSchema);