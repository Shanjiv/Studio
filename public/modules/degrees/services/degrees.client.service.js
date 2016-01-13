'use strict';

// Degrees service used for communicating with the degrees REST endpoints
angular.module('degrees').factory('Degrees', ['$resource',
		function($resource) {
				return $resource('universities/:universityId/degrees/:degreeId', {
						universityId: '@universityId',
						degreeId: '@_id'
				}, {
						update: {
								method: 'PUT'
						}
				});
		}
]);

//------ Backup
//'use strict';
//
//// Degrees service used for communicating with the degrees REST endpoints
//angular.module('degrees').factory('Degrees', ['$resource',
//		function($resource) {
//				return $resource('universities/:universityId/degrees/:degreeId', {
//						universityId: '@universityId',
//						degreeId: '@_id'
//				}, {
//						update: {
//								method: 'PUT',
//								isArray: false
//						}
//				});
//		}
//]);