//'use strict';
//
//// Module dependencies
//var should = require('should');
//var	request = require('supertest');
//var app = require('../../server');
//var mongoose = require('mongoose');
//var _ = require('lodash');
//var University = mongoose.model('University');
//var User = mongoose.model('User');
//var Degree = mongoose.model('Degree');
//var Subject = mongoose.model('Subject');
//var Tag = mongoose.model('Tag');
//var agent = request.agent(app);
//
//// Globals
//var credentials, user, university, anotherUniversity, degree, anotherDegree, subject, anotherSubject, tag, anotherTag;
//
//// Subject Routes Unit Tests
//describe('Subject CRUD Tests:', function () {
//		// Avoid Mocha Timeouts
//		this.timeout(15000);
//
//
//		beforeEach(function (done) {
//				// Create user credentials
//				credentials = {
//						username: 'username',
//						password: 'password'
//				};
//
//				// Create user
//				user = new User({
//						firstName: 'Prasath',
//						lastName: 'Soosaithasan',
//						displayName: 'Prasath Soosaithasan',
//						email: 'prasath.soosaithasan@zacktech.io',
//						username: credentials.username,
//						password: credentials.password,
//						provider: 'local'
//				});
//				user.save(function () {
//
//						// Create university
//						university = new University({
//								fullName: 'Universität des Zorns',
//								shortName: 'Zorn University',
//								abbreviation: 'ZU'
//						});
//						university.save(function (err, res) {
//								university = res;
//
//								// Create anotherUniversity
//								anotherUniversity = new University({
//										fullName: 'Universität des Glücks',
//										shortName: 'Glück University',
//										abbreviation: 'GU'
//								});
//								anotherUniversity.save(function (err, res) {
//										anotherUniversity = res;
//
//										// Create tag
//										tag = new Tag({
//												content: 'leicht',
//												category: 'Schwierigkeitsstufe'
//										});
//										tag.save(function (err, res) {
//												tag = res;
//
//												// Create anotherTag
//												anotherTag = new Tag({
//														content: 'schwierig',
//														category: 'Schwierigkeitsstufe'
//												});
//												anotherTag.save(function (err, res) {
//														anotherTag = res;
//
//														// ==================================================
//														// Degrees and Subjects still need to be created
//														degree = {
//																fullPath: 'Banking and Finance',
//																shortPath: 'MBF',
//																level: 'Master'
//														};
//
//														anotherDegree = {
//																fullPath: 'Strategy and International Management',
//																shortPath: 'SIM',
//																level: 'Master'
//														};
//
//														subject = {
//																fullTitle: 'Quantitative Methoden',
//																shortTitle: 'QM',
//																semester: 1,
//																description: 'The hardest course in the MBF programme.',
//																tags: []
//														};
//
//														anotherSubject = {
//																fullTitle: 'Financial Markets',
//																shortTitle: 'FM',
//																semester: 1,
//																description: 'It is also quite difficult.',
//																tags: []
//														};
//
//														// Call the callback
//														done();
//												});
//										});
//								});
//						});
//				});
//		});
//
//		it('should be able to create the subject entry if logged in', function (done) {
//				// Sign in
//				agent.post('/auth/signin')
//						.send(credentials)
//						.expect(200)
//						.end(function (signinErr, signinRes) {
//								// Handle sign in error
//								if (signinErr) done(signinErr);
//
//								// Get the user id
//								var userId = user.id;
//
//								// Create degree under university
//								degree.university = university._id;
//
//								agent.post('/universities/' + university._id + '/degrees')
//										.send(degree)
//										.expect(200)
//										.end(function (degreeSaveErr, degreeSaveRes) {
//												// Handle create degree error
//												if (degreeSaveErr) done(degreeSaveErr);
//
//												var degree = degreeSaveRes.body;
//
//												// Create subject under degree
//												subject.degrees = [degree._id];
//												subject.tags.push(tag._id, anotherTag._id);
//
//												agent.post('/universities/' + university._id + '/subjects')
//														.send(subject)
//														.expect(200)
//														.end(function (subjectSaveErr, subjectSaveRes) {
//																// Handle subject save error
//																if (subjectSaveErr) done(subjectSaveErr);
//
//																var subject = subjectSaveRes.body;
//
//																// Assertions
//																(subject.degrees[0]).should.equal(degree._id);
//																(subject.creator).should.equal(userId);
//																(subject.shortTitle).should.match('QM');
//
//																done();
//														});
//										});
//						});
//		});
//
//		it('should be able to update a subject including new elements in subject.degrees', function (done) {
//				// Sign in
//				agent.post('/auth/signin')
//						.send(credentials)
//						.expect(200)
//						.end(function (signinErr, signinRes) {
//								// Handle sign in error
//								if (signinErr) done(signinErr);
//
//								var userId = user._id;
//
//								// Create degree under university
//								degree.university = university._id;
//
//								agent.post('/universities/' + university._id + '/degrees')
//										.send(degree)
//										.expect(200)
//										.end(function (degreeSaveErr, degreeSaveRes) {
//												// Handle degree save error
//												if(degreeSaveErr) done(degreeSaveErr);
//
//												degree = degreeSaveRes.body;
//
//												// Create anotherDegree under university
//												anotherDegree.university = university._id;
//
//												agent.post('/universities/' + university._id + '/degrees')
//														.send(anotherDegree)
//														.expect(200)
//														.end(function (anotherdegreeSaveErr, anotherdegreeSaveRes) {
//																// Handle anotherDegree save error
//																if (anotherdegreeSaveErr) done(anotherdegreeSaveErr);
//
//																anotherDegree = anotherdegreeSaveRes.body;
//
//																// Create subject under degree
//																subject.degrees = [degree._id];
//
//																agent.post('/universities/' + university._id + '/subjects')
//																		.send(subject)
//																		.expect(200)
//																		.end(function (subjectSaveErr, subjectSaveRes) {
//																				// Handle save subject error
//																				if(subjectSaveErr) done(subjectSaveErr);
//
//																				subject = subjectSaveRes.body;
//
//																				// Let's update subject
//																				// 1) Change subject.fullTitle
//																				subject.fullTitle = 'Quantitative Methods';
//
//																				// 2) Change subject.degrees
//																				subject.degrees.push(anotherDegree._id);
//
//																				agent.put('/universities/' + university._id + '/subjects/' + subject._id)
//																						.send(subject)
//																						.expect(200)
//																						.end(function (subjectUpdateErr, subjectUpdateRes) {
//																								// Handle subject update error
//																								if(subjectUpdateErr) done(subjectUpdateErr);
//
//																								subject = subjectUpdateRes.body;
//
//																								// So we want to check whether anotherDegree's subjects array is also updated
//																								// Let's see. Retrieve it first.
//																								agent.get('/universities/' + university._id + '/degrees/' + anotherDegree._id)
//																										.end(function (anotherdegreeGetErr, anotherdegreeGetRes) {
//																												// Handle get anotherDegree error
//																												if (anotherdegreeGetErr) done(anotherdegreeGetErr);
//
//																												var anotherDegreeObj = anotherdegreeGetRes.body;
//
//																												// Assertions
//																												(subject).should.have.property('degrees').with.lengthOf(2);
//																												(anotherDegreeObj).should.have.property('subjects').with.lengthOf(1);
//
//																												done();
//																										});
//																						});
//																		});
//														});
//										});
//						});
//		});
//
//		it('should be able to update a subject removing elements from subject.degrees that no longer apply', function (done) {
//				// Sign in
//				agent.post('/auth/signin')
//						.send(credentials)
//						.expect(200)
//						.end(function (signinErr, signinRes) {
//								// Handle sign in error
//								if (signinErr) done(signinErr);
//
//								var userId = user._id;
//
//								// Create degree under university
//								degree.university = university._id;
//
//								agent.post('/universities/' + university._id + '/degrees')
//										.send(degree)
//										.expect(200)
//										.end(function (degreeSaveErr, degreeSaveRes) {
//												// Handle degree save error
//												if(degreeSaveErr) done(degreeSaveErr);
//
//												degree = degreeSaveRes.body;
//
//												// Create anotherDegree under university
//												anotherDegree.university = university._id;
//
//												agent.post('/universities/' + university._id + '/degrees')
//														.send(anotherDegree)
//														.expect(200)
//														.end(function (anotherdegreeSaveErr, anotherdegreeSaveRes) {
//																// Handle anotherDegree save error
//																if (anotherdegreeSaveErr) done(anotherdegreeSaveErr);
//
//																anotherDegree = anotherdegreeSaveRes.body;
//
//																// Create subject under degree
//																subject.degrees = [degree._id];
//
//																agent.post('/universities/' + university._id + '/subjects')
//																		.send(subject)
//																		.expect(200)
//																		.end(function (subjectSaveErr, subjectSaveRes) {
//																				// Handle save subject error
//																				if(subjectSaveErr) done(subjectSaveErr);
//
//																				subject = subjectSaveRes.body;
//
//																				// Let's update subject
//																				// 1) Change subject.fullTitle
//																				subject.fullTitle = 'Quantitative Methods';
//
//																				// 2) Remove the subject from degree but add it to anotherDegree
//																				// So when we re-retrieve subject from the database it should have an empty subjects array.
//																				subject.degrees.push(anotherDegree._id);
//																				subject.degrees.splice(0, 1);
//
//																				agent.put('/universities/' + university._id + '/subjects/' + subject._id)
//																						.send(subject)
//																						.expect(200)
//																						.end(function (subjectUpdateErr, subjectUpdateRes) {
//																								// Handle subject update error
//																								if(subjectUpdateErr) done(subjectUpdateErr);
//
//																								subject = subjectUpdateRes.body;
//
//																								agent.get('/universities/' + university._id + '/degrees/' + anotherDegree._id)
//																										.end(function (anotherdegreeGetErr, anotherdegreeGetRes) {
//																												// Handle get anotherDegree error
//																												if (anotherdegreeGetErr) done (anotherdegreeGetErr);
//
//																												var anotherDegreeObj = anotherdegreeGetRes.body;
//
//																												agent.get('/universities/' + university._id + '/degrees/' + degree._id)
//																														.end(function (degreeGetErr, degreeGetRes) {
//																																// Handle get degree error
//																																if (degreeGetErr) done(degreeGetErr);
//
//																																var degreeObj = degreeGetRes.body;
//
//																																// Assertions
//																																(subject).should.have.property('degrees').with.lengthOf(1);
//																																(anotherDegreeObj).should.have.property('subjects').with.lengthOf(1);
//																																(degreeObj).should.have.property('subjects').with.lengthOf(0);
//
//																																done();
//																														});
//																										})
//																						});
//																		});
//														});
//										});
//						});
//		});
//
//		it('should be able to delete the subject instance and update all related degree instances.', function (done) {
//				// Sign in
//				agent.post('/auth/signin')
//						.send(credentials)
//						.expect(200)
//						.end(function (signinErr, signinRes) {
//								// Handle sign in error
//								if (signinErr) done(signinErr);
//
//								var userId = user._id;
//								// Create degree under university
//								degree.university = university._id;
//
//								agent.post('/universities/' + university._id + '/degrees')
//										.send(degree)
//										.expect(200)
//										.end(function (degreeSaveErr, degreeSaveRes) {
//												// Handle degree save error
//												if(degreeSaveErr) done(degreeSaveErr);
//
//												degree = degreeSaveRes.body;
//
//												// Create anotherDegree under university
//												anotherDegree.university = university._id;
//
//												agent.post('/universities/' + university._id + '/degrees')
//														.send(anotherDegree)
//														.expect(200)
//														.end(function (anotherdegreeSaveErr, anotherdegreeSaveRes) {
//																// Handle anotherDegree save error
//																if (anotherdegreeSaveErr) done(anotherdegreeSaveErr);
//
//																anotherDegree = anotherdegreeSaveRes.body;
//
//																// Create subject under degree
//																subject.degrees = [degree._id];
//
//																agent.post('/universities/' + university._id + '/subjects')
//																		.send(subject)
//																		.expect(200)
//																		.end(function (subjectSaveErr, subjectSaveRes) {
//																				// Handle save subject error
//																				if(subjectSaveErr) done(subjectSaveErr);
//
//																				subject = subjectSaveRes.body;
//
//																				// Update subject
//																				// Change subject.degrees
//																				subject.degrees.push(anotherDegree._id);
//
//																				agent.put('/universities/' + university._id + '/subjects/' + subject._id)
//																						.send(subject)
//																						.expect(200)
//																						.end(function (subjectUpdateErr, subjectUpdateRes) {
//																								// Handle subject update error
//																								if(subjectUpdateErr) done(subjectUpdateErr);
//
//																								subject = subjectUpdateRes.body;
//
//																								// Now we have a subject and two degrees that contain the subjectId in their degree.subjects array
//																								// We are ready to delete the subject and see what happens
//																								agent.delete('/universities/' + university._id + '/subjects/' + subject._id)
//																										.send(subject)
//																										.expect(200)
//																										.end(function (subjectDeleteErr, subjectDeleteRes) {
//																												// Handle subject delete error
//																												if (subjectDeleteErr) done(subjectDeleteErr);
//
//																												// Assertions
//																												(degree.subjects).should.not.equal([subject._id]);
//																												(degree.subjects).should.be.empty;
//																												(anotherDegree.subjects).should.be.empty;
//
//																												done();
//																										});
//																						});
//																		});
//														});
//										});
//						});
//		});
//
//		// Gotcha1: If you create a degree make sure you pass along a university id. (solved)
//		// Gotcha2: Population kicks in only if you call the get methods. The post response do not contain populated information.
//		// Gotcha3: If you create a subject make sure you pass along a degree id.
//
//		afterEach(function(done) {
//				User.remove().exec();
//				University.remove().exec();
//				Degree.remove().exec();
//				Subject.remove().exec();
//				Tag.remove().exec();
//				done();
//		});
//
//});
