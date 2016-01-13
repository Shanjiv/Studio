//'use strict';
//
//// Module dependencies
//var should = require('should');
//var	request = require('supertest');
//var app = require('../../server');
//var mongoose = require('mongoose');
//var User = mongoose.model('User');
//var University = mongoose.model('University');
//var agent = request.agent(app);
//
//
//// Globals
//var credentials, user, university;
//
//// University Routes Unit Tests
//describe('University CRUD Tests:', function () {
//		// Avoid Mocha Timeouts
//		this.timeout(5000);
//
//		beforeEach(function (done) {
//				// Create user credentials
//				credentials = {
//						username: 'username',
//						password: 'password'
//				};
//
//				// Create a new user
//				user = new User({
//						firstName: 'Prasath',
//						lastName: 'Soosaithasan',
//						displayName: 'Prasath Soosaithasan',
//						email: 'prasath.soosaithasan@zacktech.io',
//						username: credentials.username,
//						password: credentials.password,
//						provider: 'local'
//				});
//
//				// Save a user to the test db and create a new university entry
//				user.save(function () {
//						university = {
//								fullName: 'Universität des Zorns',
//								shortName: 'Zorn University',
//								abbreviation: 'ZU'
//						};
//
//						done();
//				});
//		});
//
//		it('should be able to save the university entry if logged in', function (done) {
//				// Sign in
//				agent.post('/auth/signin')
//						.send(credentials)
//						.expect(200)
//						.end(function (signinErr, signinRes) {
//								// Handle signin error
//								if (signinErr) done(signinErr);
//
//								// Get the user id
//								var userId = user.id;
//
//								// Save a new university entry
//								agent.post('/universities')
//										.send(university)
//										.expect(200)
//										.end(function (universitySaveErr, universitySaveRes) {
//												// Handle save university error
//												if (universitySaveErr) done(universitySaveErr);
//
//												// Get universities list
//												agent.get('/universities')
//														.end(function (universitiesGetErr, universitiesGetRes) {
//																// Handle retrieve universities error
//																if (universitiesGetErr) done(universitiesGetErr);
//
//																// Get universities list
//																var universities = universitiesGetRes.body;
//
//																// Set assertions
//																(universities[0].creator._id).should.equal(userId);
//																(universities[0].fullName).should.match('Universität des Zorns');
//
//																// Call the assertions callback
//																done();
//														});
//										});
//						});
//		});
//
//		it('should not be able to save the university entry if not logged in', function (done) {
//				// Note that we do not start with signing in
//				agent.post('/universities')
//						.send(university)
//						.expect(401)
//						.end(function (universitySaveErr, universitySaveRes) {
//
//								// Call the assertion callback
//								done(universitySaveErr);
//						});
//		});
//
//		it('should not be able to save if no university fullName attribute is provided', function (done) {
//				// Invalidate university fullName field
//				university.fullName = '';
//
//				// Agent signs in
//				agent.post('/auth/signin')
//						.send(credentials)
//						.expect(200)
//						.end(function (signinErr, signinRes) {
//								// Handle signin error
//								if (signinErr) done(signinErr);
//
//								// Get the userId
//								var userId = user.id;
//
//								// Save a new university entry
//								agent.post('/universities')
//										.send(university)
//										.expect(400)
//										.end(function (universitySaveErr, universitySaveRes) {
//												// Set message assertion
//												// The message is set in the university model schema
//												(universitySaveRes.body.message).should.match('fullName cannot be blank');
//
//												// Call the assertion callback
//												done(universitySaveErr);
//										});
//						});
//		});
//
//		it('should be able to update a university entry if signed in', function (done) {
//				agent.post('/auth/signin')
//						.send(credentials)
//						.expect(200)
//						.end(function (signinErr, signinRes) {
//								// Handle signin error
//								if (signinErr) done(signinErr);
//
//								// Get the userId
//								var userId = user.id;
//
//								// Save a new university entry
//								agent.post('/universities')
//										.send(university)
//										.expect(200)
//										.end(function (universitySaveErr, universitySaveRes) {
//												// Handle university save error
//												if (universitySaveErr) done(universitySaveErr);
//
//												// Update university abbreviation
//												university.abbreviation = 'HSG';
//
//												// Update an existing university entry
//												agent.put('/universities/' + universitySaveRes.body._id)
//														.send(university)
//														.expect(200)
//														.end(function (universityUpdateErr, universityUpdateRes) {
//																// Handle university update error
//																if (universityUpdateErr) done(universityUpdateErr);
//
//																// Set assertions
//																(universityUpdateRes.body._id).should.equal(universitySaveRes.body._id);
//																(universityUpdateRes.body.abbreviation).should.match('HSG');
//
//																// Call the assertion callback
//																done();
//														});
//										});
//						});
//		});
//
//		it('should be able to get a list of universities if not signed in', function (done) {
//				// Create new university model instance
//				var universityObj = new University(university);
//
//				// Save the university just to have something to retrieve
//				universityObj.save(function () {
//						// Request universities
//						// This is what we actually want to test
//						request(app).get('/universities')
//								.end(function (req, res) {
//										// Set assertion
//										res.body.should.be.an.Array.with.lengthOf(1);
//
//										// Call the assertion callback
//										done();
//								});
//				});
//		});
//
//		it('should be able to get a single university entry if not signed in', function (done) {
//				// Create new university model instance
//				var universityObj = new University(university);
//
//				// Save the university
//				universityObj.save(function () {
//						request(app).get('/universities/' + universityObj._id)
//								.end(function (req, res) {
//										// Set assertion
//										res.body.should.be.an.Object.with.property('abbreviation', university.abbreviation);
//
//										// Call the assertion callback
//										done();
//								});
//				});
//		});
//
//		it('should be able to delete a university entry if signed in', function (done) {
//				agent.post('/auth/signin')
//						.send(credentials)
//						.expect(200)
//						.end(function (signinErr, signinRes) {
//								// Handle signin error
//								if (signinErr) done(signinErr);
//
//								// Get the userId
//								var userId = user.id;
//
//								// Save a new university instance
//								agent.post('/universities')
//										.send(university)
//										.expect(200)
//										.end(function (universitySaveErr, universitySaveRes) {
//												// Handle university save error
//												if (universitySaveErr) done(universitySaveErr);
//
//												// Delete an existing university entry
//												// This is the actual test we are interested in
//												agent.delete('/universities/' + universitySaveRes.body._id)
//														.send(university)
//														.expect(200)
//														.end(function (universityDeleteErr, universityDeleteRes) {
//																// Handle the university delete error
//																if (universityDeleteErr) done(universityDeleteErr);
//
//																// Set assertions
//																(universityDeleteRes.body._id).should.equal(universitySaveRes.body._id);
//
//																// Call the assertion callback
//																done();
//														});
//										});
//						});
//		});
//
//		it('should not be able to delete a university entry if not signed in', function (done) {
//				// Set university creator
//				university.creator = user;
//
//				// Create new university instance
//				var universityObj = new University(university);
//
//				// Save the university
//				universityObj.save(function () {
//						// Try deleting a university instance
//						request(app).delete('/universities/' + universityObj._id)
//								.expect(401)
//								.end(function (universityDeleteErr, universityDeleteRes) {
//										// Set message assertion
//										(universityDeleteRes.body.message).should.match('User is not logged in.');
//
//										// Handle university delete error
//										done(universityDeleteErr);
//								});
//				});
//		});
//
//
//		afterEach(function(done) {
//				User.remove().exec();
//				University.remove().exec();
//				done();
//		});
//
//});