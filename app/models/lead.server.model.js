'use strict';

// Module dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var uniquenessValidator = require('mongoose-unique-validator');

// Email validation function
var validateEmail = function(email) {
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return re.test(email);
};

// Lead Schema
var LeadSchema = new Schema({

		university: {
				type: Schema.ObjectId,
				ref: 'University',
				required: 'Es wäre wichtig für uns zu wissen wo du studierst. Nur so können wir gezielt Tutoren an deiner Hochschule ansprechen.'
		},

		degree: {
				type: Schema.ObjectId,
				ref: 'Degree',
				required: 'Wenn wir wissen was du studierst können wir dir helfen die richtigen Leute zu finden.'
		},

		email: {
				type: String,
				trim: true,
				unique: 'Du hast dich bereits angemeldet. Schau doch mal bei www.twitter.com/GoStudito oder www.facebook.com/GoStudito für Status Updates.',
				validate: [validateEmail, 'Komm schon, gib eine gültige E-Mail Adresse ein. Kein Spam. Versprochen.'],
				required: 'Wir benötigen deine E-Mail damit wir dich einladen können wenn es soweit ist.'
		},

		verified: {
				type: Boolean,
				default: false
		},

		created: {
				type: Date,
				default: Date.now
		}
});

// Apply the uniquenessValidator plugin to this Schema.
LeadSchema.plugin(uniquenessValidator);

mongoose.model('Lead', LeadSchema);

// ====================================================================================================================
var uuid = require('node-uuid');

var LeadVerificationSchema = new Schema({
		_leadId: {
				type: Schema.ObjectId,
				required: true,
				ref: 'Lead'
		},
		token: {
				type: String,
				required: true
		},
		created: {
				type: Date,
				required: true,
				default: Date.now
		}
});

// updating indexes once created is tricky
// db.runCommand( {"collMod" : "leadverifications" , "index" : { "keyPattern" : {created : 1} , "expireAfterSeconds" : 3600 } } )
// Modulus doesn't allow this valid operation. Email has been sent for clarification. For now you have to update it manually.
// Those values you put in here currently only affect the collections when they are first initialized.
LeadVerificationSchema.index({ created: 1 }, { expireAfterSeconds: 60*60*24*5 });

LeadVerificationSchema.methods.createVerificationToken = function (done) {
		var verificationToken = this;
		var token = uuid.v4();
		verificationToken.set('token', token);
		verificationToken.save(function (err) {
				if (err) return done(err);

				// console.log('Verification token', verificationToken);
				return done(null, token);
		});
};

mongoose.model('LeadVerification', LeadVerificationSchema);