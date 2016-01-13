'use strict';

angular.module('degrees').controller('DegreesCtrl', ['$scope', '_', '$stateParams', '$location', 'Authentication', 'Degrees',
		function($scope, _, $stateParams, $location, Authentication, Degrees) {

				$scope.authentication = Authentication;

				$scope.subject = {};
				$scope.degree = {};

				// ui.multiselect
				$scope.selected = {};

				// CRUD Operations
				$scope.create = function () {
						var degree = new Degrees({
								fullPath: this.degree.fullPath,
								shortPath: this.degree.shortPath,
								level: this.degree.level,
								description: this.degree.description,
								university: $stateParams.universityId,
								// This is specifically for ngResource to know where to $save the degree instance
								universityId: $stateParams.universityId
						});
						degree.$save(function (response) {
								// Redirect the user after saving
								$location.path('universities/' + response.university + '/degrees/' + response._id);

								// Empty the scope variables
								$scope.degree.fullPath = '';
								$scope.degree.shortPath = '';
								$scope.degree.level = '';
								$scope.degree.description = '';
						}, function (errorResponse) {
								$scope.error = errorResponse.data.message;
						});
				};

				$scope.remove = function (degree) {
						if (degree) {
								degree.$remove();

								for (var i in $scope.degrees) {
										if ($scope.degrees[i] === degree) {
												$scope.degrees.splice(i, 1);
										}
								}
						} else {

								// This is specifically for ngResource to know where to $remove the degree instance
								$scope.degree.universityId = $scope.degree.university._id;

								$scope.degree.$remove(function () {
										$location.path('universities/' + $scope.degree.university._id);
								}, function (errorResponse) {
										$scope.error = errorResponse.data.message;
								});
						}
				};

				$scope.update = function () {
						var degree = $scope.degree;

						// This is specifically for ngResource to know where to $update the degree instance
						degree.universityId = degree.university._id;

						degree.$update(function () {
								$location.path('universities/' + degree.university._id + '/degrees/' + degree._id);

						}, function (errorResponse) {
								$scope.error = errorResponse.data.message;
						});
				};

				$scope.find = function () {
						$scope.degrees = Degrees.query({
								universityId: $stateParams.universityId
						});
				};

				$scope.findOne = function () {
						$scope.degree = Degrees.get({
								universityId: $stateParams.universityId,
								degreeId: $stateParams.degreeId
						});
				};
		}]);