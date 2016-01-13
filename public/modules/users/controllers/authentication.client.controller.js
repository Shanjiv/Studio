'use strict';

angular.module('users').controller('AuthenticationCtrl', ['$scope', '$http', '$location', 'Authentication',
		function($scope, $http, $location, Authentication) {
				$scope.authentication = Authentication;

				// If user is signed in then redirect back home
				if ($scope.authentication.user) $location.path('/tiger');

				$scope.signup = function() {
						$http.post('/auth/signup', $scope.credentials).success(function(response) {
								// If successful we assign the response to the GLOBAL user model
								$scope.authentication.user = response;

								// And redirect to the platform page
								$location.path('/');
						}).error(function(response) {
								$scope.error = response.message;
						});
				};

				$scope.signin = function() {
						$http.post('/auth/signin', $scope.credentials).success(function(response) {
								// If successful we assign the response to the GLOBAL user model
								$scope.authentication.user = response;

								// And redirect to the platform page
								$location.path('/tiger');
						}).error(function(response) {
								$scope.error = response.message;
						});
				};
		}
]);