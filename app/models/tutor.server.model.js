'use strict';

// Module dependencies
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

require('../models/user.server.model');
var UserSchema = mongoose.model('User').schema;

var TutorSchema = UserSchema.extend({
		rating : Number
});

module.exports = mongoose.model('Tutor', TutorSchema);

//https://github.com/briankircho/mongoose-schema-extend
//var User = mongoose.model('User', UserSchema),
//		Tutor = mongoose.model('Tutor', TutorSchema);
//
//var accord = new User({
//		make : 'Honda',
//		year : 1999
//});
//var muni = new Tutor({
//		make : 'Neoplan',
//		route : 33
//});
//
//accord.save(function(err) {
//		muni.save(function(err) {
//				// users are saved with the _type key set to 'User' and 'Tutor'
//		});
//});