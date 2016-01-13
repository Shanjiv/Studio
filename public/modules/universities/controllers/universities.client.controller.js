'use strict';

angular.module('universities').controller('UniversitiesCtrl', ['$scope', '$stateParams', '$location', 'Authentication', 'Universities',
		function($scope, $stateParams, $location, Authentication, Universities) {

				$scope.authentication = Authentication;
				$scope.university = {};
				$scope.selected = {};

				// CRUD Operations
				$scope.create = function () {
						var university = new Universities({
								fullName: this.university.fullName,
								shortName: this.university.shortName,
								abbreviation: this.university.abbreviation
								// Creator and updater are parsed on the server side controller from the req.body.
								// Within the create call we do not allow to create degrees simultaneously
						});
						university.$save(function (response) {
								$location.path('universities/' + response._id);

								$scope.university.fullName = '';
								$scope.university.shortName = '';
								$scope.university.abbreviation = '';
						}, function (errorResponse) {
								$scope.error = errorResponse.data.message;
						});
				};

				$scope.remove = function (university) {
						if (university) {
								university.$remove();

								for (var i in $scope.universities) {
										if ($scope.universities[i] === university) {
												$scope.universities.splice(i, 1);
										}
								}
						} else {
								$scope.university.$remove(function () {
										$location.path('universities');
								});
						}
				};

				$scope.update = function () {
						var university = $scope.university;

						university.$update(function () {
								$location.path('universities/' + university._id);
						}, function (errorResponse) {
								$scope.error = errorResponse.data.message;
						});
				};

				$scope.find = function () {
						$scope.universities = Universities.query();
				};

				$scope.findOne = function () {
						$scope.university = Universities.get({
								universityId: $stateParams.universityId
						});
				};

		}]);