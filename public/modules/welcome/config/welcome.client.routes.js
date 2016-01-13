'use strict';

angular.module('welcome').config(['$stateProvider',
		function($stateProvider) {
				// Launch state routing
				$stateProvider
						// Root route
						.state('welcome', {
								url: '/',
								views: {
										'header': {
												templateUrl: 'modules/core/views/platform/header.client.view.html',
												controller: 'HeaderCtrl'
										},
										'welcome': {
												templateUrl: 'modules/welcome/views/welcome.client.view.html'
										}
								}
						});
		}
]);