'use strict';

// Universities service used for communicating with the universities REST endpoints
angular.module('universities').factory('Universities', ['$resource',
		function($resource) {
				return $resource('universities/:universityId', {
						universityId: '@_id'
				}, {
						update: {
								method: 'PUT',
								isArray: false
						}
				});
		}
]);

// ====================================================================================================================
// Loading data from a json file using the $http service
// Great to use in the templating and boilerplate stage
//angular.module('universities').service('Universities', ['$http', function ($http) {
//		var model = this;
//		var universities;
//
//		function extract(result) {
//				return result.data;
//		}
//
//		function cacheUniversities(result) {
//				universities = extract(result);
//				return universities;
//		}
//
//		model.getUniversities = function () {
//				return $http.get('modules/universities/services/universities.json').then(cacheUniversities);
//		};
//
//}]);