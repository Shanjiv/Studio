//'use strict';
//
//// Module dependencies
//var should = require('should');
//var	request = require('supertest');
//var app = require('../../server');
//var mongoose = require('mongoose');
//var User = mongoose.model('User');
//var Tag = mongoose.model('Tag');
//var agent = request.agent(app);
//
//
//// Globals
//var credentials, user, tag;
//
//// University Routes Unit Tests
//describe('Tag CRUD Tests:', function () {
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
//						tag = {
//								content: 'TU9',
//								category: 'UniversityGroup'
//						};
//
//						done();
//				});
//		});
//
//		it('should be able to save the tag entry if logged in', function (done) {
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
//								// Save a new tag
//								agent.post('/tags')
//										.send(tag)
//										.expect(200)
//										.end(function (tagSaveErr, tagSaveRes) {
//												// Handle tag save error
//												if (tagSaveErr) done(tagSaveErr);
//
//												// Get back a list of all tags
//												agent.get('/tags')
//														.end(function (getTagsErr, getTagsRes) {
//																// Handle get tags error
//																if (getTagsErr) done(getTagsErr);
//
//																// Assign
//																var tags = getTagsRes.body;
//
//																// Assert
//																(tags[0].content).should.match('TU9');
//																(tags[0].creator._id).should.equal(userId);
//
//																// Done
//																done();
//														});
//										});
//						});
//		});
//
//		it('should not be able to save the tag entry if not logged in', function (done) {
//				// Note that we do not start with signing in
//				agent.post('/tags')
//						.send(tag)
//						.expect(401)
//						.end(function (tagSaveErr, tagSaveRes) {
//
//								// Call the assertion callback
//								done(tagSaveErr);
//						});
//		});
//
//
//		it('should not be able to save if no tag content attribute is provided', function (done) {
//				// Invalidate tag content field
//				tag.content = '';
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
//								// Save a new tag entry
//								agent.post('/tags')
//										.send(tag)
//										.expect(400)
//										.end(function (tagSaveErr, tagSaveRes) {
//												// Set message assertion
//												// The message is set in the tag model schema
//												console.log(tagSaveRes.body);
//												(tagSaveRes.body.message).should.match('Please fill in a tag.');
//
//												// Call the assertion callback
//												done(tagSaveErr);
//										});
//						});
//		});
//
//		it('should be able to get a list of tags if not signed in', function (done) {
//				// Create new tag model instance
//				var tagObj = new Tag(tag);
//
//				// Save the tag just to have something to retrieve
//				tagObj.save(function () {
//						// Request tags
//						// This is what we actually want to test
//						request(app).get('/tags')
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
//		it('should be able to get a single tag entry if not signed in', function (done) {
//				// Create new tag model instance
//				var tagObj = new Tag(tag);
//
//				// Save the tag
//				tagObj.save(function () {
//						request(app).get('/tags/' + tagObj._id)
//								.end(function (req, res) {
//										// Set assertion
//										res.body.should.be.an.Object.with.property('category', tag.category);
//
//										// Call the assertion callback
//										done();
//								});
//				});
//		});
//
//		it('should be able to delete a tag entry if signed in', function (done) {
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
//								// Save a new tag instance
//								agent.post('/tags')
//										.send(tag)
//										.expect(200)
//										.end(function (tagSaveErr, tagSaveRes) {
//												// Handle tag save error
//												if (tagSaveErr) done(tagSaveErr);
//
//												// Delete an existing tag entry
//												// This is the actual test we are interested in
//												agent.delete('/tags/' + tagSaveRes.body._id)
//														.send(tag)
//														.expect(200)
//														.end(function (tagDeleteErr, tagDeleteRes) {
//																// Handle the tag delete error
//																if (tagDeleteErr) done(tagDeleteErr);
//
//																// Set assertions
//																(tagDeleteRes.body._id).should.equal(tagSaveRes.body._id);
//
//																// Call the assertion callback
//																done();
//														});
//										});
//						});
//		});
//
//		it('should not be able to delete a tag entry if not signed in', function (done) {
//				// Set tag creator
//				tag.creator = user;
//
//				// Create new tag instance
//				var tagObj = new Tag(tag);
//
//				// Save the tag
//				tagObj.save(function () {
//						// Try deleting a tag instance
//						request(app).delete('/tags/' + tagObj._id)
//								.expect(401)
//								.end(function (tagDeleteErr, tagDeleteRes) {
//										// Set message assertion
//										(tagDeleteRes.body.message).should.match('User is not logged in.');
//
//										// Handle tag delete error
//										done(tagDeleteErr);
//								});
//				});
//		});
//
//		afterEach(function(done) {
//				User.remove().exec();
//				Tag.remove().exec();
//				done();
//		});
//
//});