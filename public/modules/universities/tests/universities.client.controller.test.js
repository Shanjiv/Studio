'use strict';

(function() {
		// Universities Controller Spec
		describe('UniversitiesCtrl', function() {
				// Initialize global variables
				var UniversitiesCtrl,
						scope,
						$httpBackend,
						$stateParams,
						$location;

				// The $resource service augments the response object with methods for updating and deleting the resource.
				// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
				// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
				// When the toEqualData matcher compares two objects, it takes only object properties into
				// account and ignores methods.
				beforeEach(function() {
						jasmine.addMatchers({
								toEqualData: function(util, customEqualityTesters) {
										return {
												compare: function(actual, expected) {
														return {
																pass: angular.equals(actual, expected)
														};
												}
										};
								}
						});
				});

				// Then we can start by loading the main application module
				beforeEach(module(ApplicationConfiguration.applicationModuleName));

				// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
				// This allows us to inject a service but then attach it to a variable
				// with the same name as the service.
				beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
						// Set a new global scope
						scope = $rootScope.$new();

						// Point global variables to injected services
						$stateParams = _$stateParams_;
						$httpBackend = _$httpBackend_;
						$location = _$location_;

						// Initialize the Articles controller.
						UniversitiesCtrl = $controller('UniversitiesCtrl', {
								$scope: scope
						});
				}));

				it('$scope.find() should create an array with at least one university object fetched from XHR', inject(function (Universities) {
						// Create sample article using the Universities service
						var sampleUniversity = new Universities({
								fullName: 'Universität des Glücks',
								shortName: 'Glück University',
								abbreviation: 'GU'
						});

						// Create a sample universities array that includes the new university
						var sampleUniversities = [sampleUniversity];

						// Set GET response
						$httpBackend.expectGET('universities').respond(sampleUniversities);

						// Run controller functionality
						scope.find();
						$httpBackend.flush();

						// Test the scope value
						expect(scope.universities).toEqualData(sampleUniversities);
				}));

				it('$scope.findOne() should create an array with one university object fetched from XHR using a universityId URL parameter', inject(function (Universities) {
						// Define a sample university object
						var sampleUniversity = new Universities({
								fullName: 'Universität des Glücks',
								shortName: 'Glück University',
								abbreviation: 'GU'
						});

						// Set the URL parameter
						$stateParams.universityId = '525a8422f6d0f87f0e407a33';

						// Set GET response
						$httpBackend.expectGET(/universities\/([0-9a-fA-F]{24})$/).respond(sampleUniversity);

						// Run controller functionality
						scope.findOne();
						$httpBackend.flush();

						// Test scope value
						expect(scope.university).toEqualData(sampleUniversity);
				}));

				it('$scope.create() with a valid form data should send a POST request with the form input values and then locate the new object URL', inject(function (Universities) {
						// Create a sample university object
						var sampleUniversityPostData = new Universities({
								fullName: 'Universität des Glücks',
								shortName: 'Glück University',
								abbreviation: 'GU'
						});

						// Create a sample university response
						var sampleUniversityResponse = new Universities({
								_id: '525cf20451979dea2c000001',
								fullName: 'Universität des Glücks',
								shortName: 'Glück University',
								abbreviation: 'GU'
						});

						// Fixture mock form input values
						scope.fullName = 'Universität des Glücks';
						scope.shortName = 'Glück University';
						scope.abbreviation = 'GU';

						// Set POST response
						$httpBackend.expectPOST('universities', sampleUniversityPostData).respond(sampleUniversityResponse);

						// Run controller functionality
						scope.create();
						$httpBackend.flush();

						// Test form inputs are reset
						expect(scope.fullName).toEqual('');
						expect(scope.shortName).toEqual('');
						expect(scope.abbreviation).toEqual('');

						// Test URL redirection after the university was created
						expect($location.path()).toBe('/universities/' + sampleUniversityResponse._id);
				}));


				it('$scope.update() should update valid university data', inject(function (Universities) {
						// Define a sample university put data
						var sampleUniversityPutData = new Universities({
								_id: '525cf20451979dea2c000001',
								fullName: 'Universität DDDdes Glücks',
								shortName: 'Glück University',
								abbreviation: 'GU'
						});

						// Mock article in scope
						scope.university = sampleUniversityPutData;

						// Set PUT response
						$httpBackend.expectPUT(/universities\/([0-9a-fA-F]{24})$/).respond();

						// Run controller functionality
						scope.update();
						$httpBackend.flush();

						// Test URL location to new object
						expect($location.path()).toBe('/universities/' + sampleUniversityPutData._id);
				}));


				it('$scope.remove() should send a DELETE request with a valid universityId and remove the university from the scope', inject(function (Universities) {
						// Create a new university object
						var sampleUniversity = new Universities({
								_id: '525a8422f6d0f87f0e407a33',
								fullName: 'Universität des Glücks',
								shortName: 'Glück University',
								abbreviation: 'GU'
						});

						// Create new universities array and include the university
						scope.universities = [sampleUniversity];

						// Set expected DELETE response
						$httpBackend.expectDELETE(/universities\/([0-9a-fA-F]{24})$/).respond(204);

						// Run controller functionality
						scope.remove(sampleUniversity);
						$httpBackend.flush();

						// Test array after successful delete
						expect(scope.universities.length).toBe(0);
				}));
		});
}());