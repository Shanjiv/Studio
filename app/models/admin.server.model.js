'use strict';

// Module dependencies
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

require('../models/user.server.model');
var UserSchema = mongoose.model('User').schema;

var AdminSchema = UserSchema.extend({
		responsibility: [{ type: Schema.Types.ObjectId, ref: 'University' }]
});

module.exports = mongoose.model('Admin', AdminSchema);