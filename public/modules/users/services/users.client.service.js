'use strict';

// Users service used for communicating with the products REST endpoints
angular.module('users').factory('Users', ['$resource',
		function ($resource) {
				return $resource('users/:userId', {}, {
						update: {method: 'PUT'}
				});
		}
]);