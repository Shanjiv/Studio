'use strict';

angular.module('launch').factory('Leads', ['$resource',
		function ($resource) {
				return $resource('leads/:leadId', {
						leadId: '@_id'
				}, {
						update: {
								method: 'PUT'
						}
				});
		}
]);