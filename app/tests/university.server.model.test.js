//'use strict';
//
//// Module dependencies
//var should = require('should'),
//		mongoose = require('mongoose'),
//		User = mongoose.model('User'),
//		University = mongoose.model('University');
//
//// Globals
//var user, university;
//
//// University Model Unit Tests
//describe('University Model Unit Tests:', function() {
//		// Avoid Mocha Timeouts
//		this.timeout(5000);
//
//		// Before each section
//		beforeEach(function(done) {
//				user = new User({
//						firstName: 'Prasath',
//						lastName: 'Soosaithasan',
//						displayName: 'Prasath Soosaithasan',
//						email: 'prasath.soosaithasan@zacktech.io',
//						username: 'psquad',
//						password: 'esel1234'
//				});
//
//				user.save(function() {
//						university = new University({
//								fullName: 'Universität des Zorns',
//								shortName: 'Zorn University',
//								abbreviation: 'ZU',
//								creator: user
//						});
//
//						done();
//				});
//		});
//
//		// Main unit testing section
//		describe('Method Save', function () {
//				it('should be able to save without problems', function (done) {
//						return university.save(function (err) {
//								should.not.exist(err);
//								done();
//						});
//				});
//
//				it('should be able to show an error when trying to save a university instance without specifying the shortName', function (done) {
//						university.shortName = '';
//
//						return university.save(function (err) {
//								should.exist(err);
//								done();
//						});
//				});
//		});
//
//		// After each section
//		afterEach(function (done) {
//				University.remove().exec();
//				User.remove().exec();
//				done();
//		});
//});