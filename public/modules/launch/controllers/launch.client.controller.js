'use strict';

angular.module('launch').controller('LaunchCtrl', ['$scope', '$stateParams', '$location', 'Universities', 'Leads', 'universitiesData', 'Degrees',
		function($scope, $stateParams, $location, Universities, Leads, universitiesData, Degrees) {

				// Initializing the universities data
				$scope.lead = {};
				$scope.selected = {};
				$scope.university = {};
				$scope.universities = universitiesData;

				// ui.select
				$scope.disabled = undefined;
				$scope.searchEnabled = undefined;

				$scope.enable = function() {
						$scope.disabled = false;
				};

				$scope.disable = function() {
						$scope.disabled = true;
				};

				$scope.enableSearch = function() {
						$scope.searchEnabled = true;
				};

				$scope.disableSearch = function() {
						$scope.searchEnabled = false;
				};

				$scope.getDegreeData = function (universityId) {
						$scope.selected.degree = undefined;
						Degrees.query({universityId: universityId}, function (degrees) {
								$scope.degrees = degrees;
						});
				};

				$scope.create = function () {
						var lead = new Leads({
								university: this.selected.university,
								degree: this.selected.degree,
								email: this.selected.email
						});
						lead.$save(function (response) {
								// Redirect
								if (response.verified === true) $location.path('verified');
								if (response.verified === false) $location.path('thankyou');

								$scope.selected.university = '';
								$scope.selected.degree = '';
								$scope.selected.email = '';
						}, function (errorResponse) {
								$scope.error = errorResponse.data.message;
						});
				};

		}]);