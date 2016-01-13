//'use strict';
//
//// Module dependencies
//var should = require('should');
//var	request = require('supertest');
//var app = require('../../server');
//var mongoose = require('mongoose');
//var _ = require('lodash');
//var User = mongoose.model('User');
//var University = mongoose.model('University');
//var Degree = mongoose.model('Degree');
//var agent = request.agent(app);
//
//// Globals
//var credentials, user, university, degree;
//
//// Degree Routes Unit Tests
//describe('Degree CRUD Tests:', function () {
//		// Avoid Mocha Timeouts
//		this.timeout(5000);
//
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
//
//						university = {
//								fullName: 'Universität des Zorns',
//								shortName: 'Zorn University',
//								abbreviation: 'ZU'
//						};
//
//						degree = {
//								fullPath: 'Banking and Finance',
//								shortPath: 'MBF',
//								level: 'Master'
//						};
//
//						// Call the callback
//						done();
//				});
//		});
//
//
//		it('should be able to save a degree entry if logged in', function (done) {
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
//								// Save a new university instance first
//								agent.post('/universities')
//										.send(university)
//										.expect(200)
//										.end(function (universitySaveErr, universitySaveRes) {
//												// Handle university save error
//												if (universitySaveErr) done(universitySaveErr);
//
//												// Set the degree university property of the just created university
//												degree.university = universitySaveRes.body._id;
//
//												// Save the degree instance now referring it to the university which we have just created
//												agent.post('/universities/' + degree.university + '/degrees')
//														.send(degree)
//														.expect(200)
//														.end(function (degreeSaveErr, degreeSaveRes) {
//																// Handle degree save error
//																if (degreeSaveErr) done(degreeSaveErr);
//
//																// Get list of degrees for a particular university
//																agent.get('/universities/' + universitySaveRes.body._id + '/degrees')
//																		.end(function (degreesGetError, degreesGetRes) {
//																				// Handle retrieve degrees error
//																				if (degreesGetError) done(degreesGetError);
//
//																				// Get the degrees list
//																				var degrees = degreesGetRes.body;
//
//																				// Set assertions
//																				(degrees[0].creator._id).should.equal(userId);
//																				(degrees[0].fullPath).should.match('Banking and Finance');
//																				(degrees[0].university._id).should.equal(universitySaveRes.body._id);
//
//																				// Get university object and check whether the degreeId got pushed into the university.degrees array
//																				agent.get('/universities/' + universitySaveRes.body._id)
//																						.expect(200)
//																						.end(function (universityGetErr, universityGetRes) {
//																								// Handle get updated university error
//																								if (universityGetErr) done(universityGetErr);
//
//																								// Get the university object
//																								var university = universityGetRes.body;
//
//																								// Set assertions
//																								(university.degrees[0]).should.equal(degreeSaveRes.body._id);
//
//																								// Call the assertion callback
//																								done();
//																						});
//																		});
//														});
//										});
//						});
//		});
//
//		it('should be able to update a degree entry if signed in', function (done) {
//
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
//												// Provide a university reference for our degree data
//												degree.university = universitySaveRes.body._id;
//
//												// Save the degree instance now referring it to the university which we have just created
//												agent.post('/universities/' + degree.university + '/degrees')
//														.send(degree)
//														.expect(200)
//														.end(function (degreeSaveErr, degreeSaveRes) {
//																// Handle degree save error
//																if (degreeSaveErr) done(degreeSaveErr);
//
//																// Update degree information, i.e. shortPath
//																degree.shortPath = 'BFF';
//
//																// Update the degree instance against the server and make the changes persist
//																agent.put('/universities/' + degree.university + '/degrees/' + degreeSaveRes.body._id)
//																		.send(degree)
//																		.expect(200)
//																		.end(function (degreeUpdateErr, degreeUpdateRes) {
//																				// Handle degree update error
//																				if (degreeUpdateErr) done(degreeUpdateErr);
//
//																				// Set assertions
//																				(degreeUpdateRes.body._id).should.equal(degreeSaveRes.body._id);
//																				(degreeUpdateRes.body.shortPath).should.match('BFF');
//
//																				// Call the assertion callback
//																				done();
//																		});
//														});
//										});
//						});
//		});
//
//		afterEach(function(done) {
//				User.remove().exec();
//				University.remove().exec();
//				Degree.remove().exec();
//				done();
//		});
//
//});