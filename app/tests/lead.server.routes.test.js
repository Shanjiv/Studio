'use strict';

// Module dependencies
var should = require('should');
var	request = require('supertest');
var app = require('../../server');
var mongoose = require('mongoose');
var Lead = mongoose.model('Lead');
var University = mongoose.model('University');
var Degree = mongoose.model('Degree');
var agent = request.agent(app);
var LeadsController = require('../controllers/leads.server.controller');


// Globals
var lead, anotherLead, university, degree;

// Lead Routes Unit Tests
describe('Lead CRUD Tests:', function () {
		// Avoid Mocha Timeouts
		this.timeout(5000);


		beforeEach(function (done) {

				// Create university
				university = new University({
						fullName: 'Universität des Zorns',
						shortName: 'Zorn University',
						abbreviation: 'ZU'
				});
				university.save(function (err, res) {
						var universityObj = res;

						// Create degree
						degree = new Degree({
								fullPath: 'Banking and Finance',
								shortPath: 'MBF',
								level: 'Master',
								university: universityObj._id
						});
						degree.save(function (err, res) {
								var degreeObj = res;

								lead = {
										university: universityObj._id,
										degree: degreeObj._id,
										email: 'prasath@studito.de'
								};

								anotherLead = {
										university: universityObj._id,
										degree: degreeObj._id,
										email: 'prasath@studito.de'
								};

								done();

						});
				});
		});


		it('should be able to save a lead and it case it already exists upsert it generate a new lead verification token', function (done) {


				console.log('Das ist die erste Runde!');
				// Post lead
				request(app).post('/leads')
						.send(lead)
						.expect(200)
						.end(function (leadSaveErr, leadSaveRes) {
								// Handle lead save error
								if (leadSaveErr) done(leadSaveErr);

								var leadObj = leadSaveRes.body;


								console.log('Das ist die zweite Runde!');
								request(app).post('/leads')
										.send(anotherLead)
										.expect(200)
										.end(function (anotherLeadSaveErr, anotherLeadSaveRes) {
												// Handle anotherLead save error
												if (anotherLeadSaveErr) done(anotherLeadSaveErr);

												var anotherLeadObj = anotherLeadSaveRes.body;





												done();
										});
						});
		});


//		it('should be able to save the lead entry', function (done) {
//
//				// Post lead
//				request(app).post('/leads')
//						.send(lead)
//						.expect(200)
//						.end(function (leadSaveErr, leadSaveRes) {
//								// Handle lead save error
//								if (leadSaveErr) done(leadSaveErr);
//
//								var lead = leadSaveRes.body;
//
//								// Get University
//								request(app).get('/universities/' + university._id)
//										.end(function (universityGetErr, universityGetRes) {
//												// Handle university get error
//												if (universityGetErr) done(universityGetErr);
//
//												var universityObj = universityGetRes.body;
//
//												// Get Degree
//												request(app).get('/universities/' + university._id + '/degrees/' + degree._id)
//														.end(function (degreeGetErr, degreeGetRes) {
//																// Handle degree get error
//																if (degreeGetErr) done(degreeGetErr);
//
//																var degreeObj = degreeGetRes.body;
//
//																console.log(degreeObj);
//
//																// Assertions
//																(lead.email).should.match('prasath@studito.de');
//																(degreeObj.leads).should.equal(1);
//																(universityObj.leads).should.equal(1);
//
//																done();
//														});
//										});
//
//
//						});
//
//		});


		afterEach(function(done) {
				Lead.remove().exec();
				Degree.remove().exec();
				University.remove().exec();
				done();
		});

});