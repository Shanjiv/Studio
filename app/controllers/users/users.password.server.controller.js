'use strict';

// Module dependencies
var _ = require('lodash');
var	errorHandler = require('../errors.server.controller');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var config = require('../../../config/config');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');

var smtpTransport = nodemailer.createTransport(config.mailer.options);

// Forgot for reset password (forgot POST)
exports.forgot = function(req, res, next) {
		async.waterfall([
				// 01 Generate random token
				function(done) {
						crypto.randomBytes(20, function(err, buffer) {
								var token = buffer.toString('hex');
								done(err, token);
						});
				},
				// 02 Lookup user by username
				function(token, done) {
						if (req.body.username) {
								User.findOne({
										username: req.body.username
								}, '-salt -password', function(err, user) {
										if (!user) {
												return res.status(400).send({
														message: 'No account with that username has been found.'
												});
										} else if (user.provider !== 'local') {
												return res.status(400).send({
														message: 'It seems like you signed up using your ' + user.provider + ' account.'
												});
										} else {
												user.resetPasswordToken = token;
												user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

												user.save(function(err) {
														done(err, token, user);
												});
										}
								});
						} else {
								return res.status(400).send({
										message: 'Username field must not be blank.'
								});
						}
				},
				// 03 Render E-Mail template to be sent when you request a password reset
				function(token, user, done) {
						res.render('templates/reset-password-email', {
								name: user.displayName,
								appName: config.app.title,
								url: 'http://' + req.headers.host + '/auth/reset/' + token
						}, function(err, emailHTML) {
								done(err, emailHTML, user);
						});
				},
				// 04 If valid email, send reset email using service
				function(emailHTML, user, done) {
						var mailOptions = {
								to: user.email,
								from: config.mailer.from,
								subject: 'Password Reset',
								html: emailHTML
						};
						smtpTransport.sendMail(mailOptions, function(err) {
								if (!err) {
										res.send({
												message: 'An email has been sent to ' + user.email + ' with further instructions.'
										});
								} else {
										return res.status(400).send({
												message: 'Failure sending email.'
										});
								}

								done(err);
						});
				}
		], function(err) {
				if (err) return next(err);
		});
};

// Validate Reset Token and redirect to reset password page if successful
exports.validateResetToken = function(req, res) {
		User.findOne({
				resetPasswordToken: req.params.token,
				resetPasswordExpires: {
						$gt: Date.now()
				}
		}, function(err, user) {
				if (!user) {
						return res.redirect('/#!/password/reset/invalid');
				}

				res.redirect('/#!/password/reset/' + req.params.token);
		});
};

// Reset password POST from email token
exports.reset = function(req, res, next) {
		// Init Variables
		var passwordDetails = req.body;

		async.waterfall([

				// 01 Find user with the allocated password token in case it is not expired
				// If the new password field and the verify password field are identical save it to the user
				function(done) {
						User.findOne({
								resetPasswordToken: req.params.token,
								resetPasswordExpires: {
										$gt: Date.now()
								}
						}, function(err, user) {
								if (!err && user) {
										if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
												user.password = passwordDetails.newPassword;
												user.resetPasswordToken = undefined;
												user.resetPasswordExpires = undefined;

												user.save(function(err) {
														if (err) {
																return res.status(400).send({
																		message: errorHandler.getErrorMessage(err)
																});
														} else {
																req.login(user, function(err) {
																		if (err) {
																				res.status(400).send(err);
																		} else {
																				// Return authenticated user
																				res.json(user);

																				done(err, user);
																		}
																});
														}
												});
										} else {
												return res.status(400).send({
														message: 'Passwords do not match.'
												});
										}
								} else {
										return res.status(400).send({
												message: 'Password reset token is invalid or has expired.'
										});
								}
						});
				},
				// 02 Render the confirmation email for successfully resetting the password
				function(user, done) {
						res.render('templates/reset-password-confirm-email', {
								name: user.displayName,
								appName: config.app.title
						}, function(err, emailHTML) {
								done(err, emailHTML, user);
						});
				},
				// 03 If valid email, send reset email using service
				function(emailHTML, user, done) {
						var mailOptions = {
								to: user.email,
								from: config.mailer.from,
								subject: 'Your password has been changed',
								html: emailHTML
						};

						smtpTransport.sendMail(mailOptions, function(err) {
								done(err, 'done');
						});
				}
		], function(err) {
				if (err) return next(err);
		});
};

// Change Password (as opposed to forgot password)
exports.changePassword = function(req, res) {
		// Init Variables
		var passwordDetails = req.body;

		if (req.user) {
				if (passwordDetails.newPassword) {
						User.findById(req.user.id, function(err, user) {
								if (!err && user) {
										if (user.authenticate(passwordDetails.currentPassword)) {
												if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
														user.password = passwordDetails.newPassword;

														user.save(function(err) {
																if (err) {
																		return res.status(400).send({
																				message: errorHandler.getErrorMessage(err)
																		});
																} else {
																		req.login(user, function(err) {
																				if (err) {
																						res.status(400).send(err);
																				} else {
																						res.send({
																								message: 'Password changed successfully.'
																						});
																				}
																		});
																}
														});
												} else {
														res.status(400).send({
																message: 'Passwords do not match.'
														});
												}
										} else {
												res.status(400).send({
														message: 'Current password is incorrect.'
												});
										}
								} else {
										res.status(400).send({
												message: 'User is not found.'
										});
								}
						});
				} else {
						res.status(400).send({
								message: 'Please provide a new password.'
						});
				}
		} else {
				res.status(400).send({
						message: 'User is not signed in.'
				});
		}
};