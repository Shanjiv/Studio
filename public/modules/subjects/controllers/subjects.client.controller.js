'use strict';

angular.module('subjects').controller('SubjectsCtrl', ['$scope', '$log', '$stateParams', '$location', 'Authentication', 'Subjects',
		function($scope, $log, $stateParams, $location, Authentication, Subjects) {

				// So we have access to the log throughout the scope
				$scope.$log = $log;

				// Initialization
				$scope.authentication = Authentication;
				$scope.subject = {};
				$scope.selected = {};

				// queryParams = $location.search();
				// stateParams = $stateParams
				$scope.queryParams = $location.search();

				// CRUD Operations
				$scope.create = function () {
						var subject = new Subjects({
								fullTitle: this.subject.fullTitle,
								shortTitle: this.subject.shortTitle,
								semester: this.subject.semester,
								description: this.subject.description,
								// This means that we provide the first degreeId that has this subject in its curriculum.
								// Further degrees now can be adjusted and this subject can be added to other degrees as well.
								degrees: [this.queryParams.degree],
								// Provide the bits required by the $resource understand where to go
								universityId: $stateParams.universityId
						});
						subject.$save(function (response) {
								$location.path('universities/' + $stateParams.universityId + '/subjects/' + response._id);

								console.log(response);
								// Empty the scope
								$scope.subject.fullTitle = '';
								$scope.subject.shortTitle = '';
								$scope.subject.semester = '';
								$scope.subject.description = '';
						}, function (errorResponse) {
								$scope.error = errorResponse.data.message;
						});
				};

				$scope.remove = function (subject) {
						if (subject) {
								subject.$remove();

								for (var i in $scope.subjects) {
										if ($scope.subjects[i] === subject) {
												$scope.subjects.splice(i, 1);
										}
								}
						} else {

								// This is specifically for ngResource to know where to $remove the degree instance
								$scope.subject.universityId = $scope.subject.degrees[0].university;

								$scope.subject.$remove(function () {
										$location.path('universities/' + $stateParams.universityId);
								});
						}
				};

				$scope.update = function () {
						var subject = $scope.subject;

						// This is specifically for ngResource to know where to $remove the degree instance
						subject.universityId = $scope.subject.degrees[0].university;

						subject.$update(function () {
								$location.path('universities/' + $stateParams.universityId + '/subjects/' + subject._id);
						}, function (errorResponse) {
								$scope.error = errorResponse.data.message;
						});
				};

				$scope.find = function () {
						$scope.subjects = Subjects.query({
								// The parameter :universityId and :subjectId in the URL specified in the Subject factory
								// will be replaced with below values. They will be available in express via:
								// req.params.universityId
								universityId: $stateParams.universityId,

								// Since we are not providing :subjectId it is querying /universities/:universityId/subjects
								// We however do not wish to obtain all subjects belonging to that universityId but rather apply
								// a filter and obtain those belonging to a particular degree.
								degreeId: $stateParams.degreeId
								// degreeId will be available on express via:
								// req.query.degreeId
						});
				};

				$scope.findOne = function () {
						$scope.subject = Subjects.get({
								universityId: $stateParams.universityId,
								subjectId: $stateParams.subjectId
						});
				};

		}]);