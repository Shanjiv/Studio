'use strict';

// Module dependencies
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var Lead = mongoose.model('Lead');
var LeadVerification = mongoose.model('LeadVerification');
var University = mongoose.model('University');
var Degree = mongoose.model('Degree');
var	_ = require('lodash');
var key = '90ee3e3a-901f-430c-8ff5-482f49f66557';
var postmark = require('postmark')(key);
var swig = require('swig');

// Create a lead
exports.create = function(req, res) {
		var lead = new Lead(req.body);

		Lead.findOne({email: lead.email}, function (error, response) {

				if (response === null || response.verified === false) {
						if (response !== null) response.remove();

						lead.save(function (err, lead) {
								if (err) {
										return res.status(400).send({
												message: errorHandler.getErrorMessage(err)
										});
								} else {
										res.json(lead);

										// Create Lead verification token
										var verificationToken = new LeadVerification({_leadId: lead._id});
										verificationToken.createVerificationToken(function (err, token) {
												if (err) return console.log('Could not create verification token', err);

												var message = {
														university: lead.university.shortName,
														email: lead.email,
														verifyURL: req.protocol + '://' + req.get('host') + '/verify/' + token
												};
												exports.sendVerificationEmail(message, function (error, success) {
														if (error) {
																// not much point in attempting to send again, so we give up
																// will need to give the user a mechanism to resend verification
																console.error('Unable to send via postmark: ' + error.message);
																return;
														}
														console.log('Send to Postmark for delivery.');
												});
										});
								}
						});
				} else {
						res.json(response);
				}
		});
};

// Show current lead
exports.read = function(req, res) {
		res.json(req.lead);
};

// Update a lead
exports.update = function(req, res) {
		var lead = _.extend(req.lead, req.body);

		lead.save(function(err) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(lead);
				}
		});
};

// Delete a lead
exports.delete = function(req, res) {
		var lead = req.lead;

		lead.remove(function(err) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(lead);

						if (lead.verified === true) {
								// Decrease the university lead by 1
								University.findOneAndUpdate({_id: lead.university._id}, {$inc: {leads: -1}})
										.exec(function (err, university) {
												if (err) {
														return res.status(400).send({
																message: 'University lead could not be decreased by 1.'
														});
												}
										});

								// Increase the degree lead by 1
								Degree.findOneAndUpdate({_id: lead.degree._id}, {$inc: {leads: -1}})
										.exec(function(err, degree) {
												if (err) {
														return res.status(400).send({
																message: 'Degree lead could not be decreased by 1.'
														});
												}
										});
						}
				}
		});
};

// List of all leads
exports.list = function(req, res) {
		Lead.find().sort('-created').exec(function(err, leads) {
				if (err) {
						return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.json(leads);
				}
		});
};

// Verify a lead email, i.e. set verified to true
exports.verifyEmail = function (token, done) {
		LeadVerification.findOne({token: token}, function (err, verifydoc) {

				if (err) return done(err);
				if (!verifydoc) return done(new Error('This token expired already.'));

				Lead.findOne({_id: verifydoc._leadId}, function (err, lead) {
						if (err) return done(err);
						if (!lead || lead.verified === true) return done(null, null);

						lead.verified = true;
						lead.save(function (err, lead) {
								if (err) return done(err);

								done(null, lead);
						});
				});
		});
};

// Send verification email function using Postmark
exports.sendVerificationEmail = function (options, done) {

		var deliver = function (textBody, htmlBody) {
				postmark.send({
						'From': 'hello@studito.de',
						'To': options.email,
						'Subject': 'Bestätigung deiner E-Mail Adresse',
						'TextBody': textBody,
						'HtmlBody': htmlBody
				}, done);
		};

		var textTemplate = swig.compileFile('app/views/templates/verify-lead-email-text.server.view.html');
		var htmlTemplate = swig.compileFile('app/views/templates/verify-lead-email-html.server.view.html');

		var textBody = textTemplate(options);
		var htmlBody = htmlTemplate(options);

		deliver(textBody, htmlBody);
};


// Lead middleware
exports.leadById = function(req, res, next, id) {
		Lead
				.findById(id)
				.populate('university', 'shortName')
				.populate('degree', 'fullPath')
				.exec(function(err, lead) {
						if (err) return next(err);
						if (!lead) return next(new Error('Failed to load lead ' + id));
						req.lead = lead;
						next();
				});
};

exports.verifyByToken = function (req, res, next) {
		var token = req.params.token;
		exports.verifyEmail(token, function (err, lead) {

				// if (err) return res.redirect('/token/expired');
				// Basically you have to build some error handling for expired tokens.

				if (err) return res.redirect('/#!/expired');

				if (!lead) return res.redirect('/#!/verified');

				res.redirect('/#!/verified');

				// Increase the university lead by 1
				University.findOneAndUpdate({_id: lead.university}, {$inc: {leads: 1}})
						.exec(function(err, university) {
								if (err) {
										return res.status(400).send({
												message: 'University lead could not be incremented by 1.'
										});
								}
						});

				// Increase the degree lead by 1
				Degree.findOneAndUpdate({_id: lead.degree}, {$inc: {leads: 1}})
						.exec(function(err, degree) {
								if (err) {
										return res.status(400).send({
												message: 'Degree lead could not be incremented by 1.'
										});
								}
						});
		});
};

