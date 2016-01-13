'use strict';

// Subjects service used for communicating with the subjects REST endpoints
angular.module('subjects').factory('Subjects', ['$resource',
		function($resource) {
				return $resource('universities/:universityId/subjects/:subjectId', {
						universityId: '@universityId',
						degreeId: '@degreeId',
						subjectId: '@_id'
				}, {
						update: {
								method: 'PUT'
						}
				});
		}
]);