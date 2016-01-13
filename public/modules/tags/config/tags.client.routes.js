'use strict';

// Setting up route
angular.module('tags').config(['$stateProvider',
		function($stateProvider) {

				// Universities states routing
				$stateProvider

						// Child state: List all university entries
						.state('platform.tags', {
								url: '/tags',
								views: {
										'content': {
												templateUrl: 'modules/tags/views/crud-tag.client.view.html'
										},
										'header' : {
												templateUrl: 'modules/core/views/platform/header.client.view.html'
										},
										'sidebar' : {
												templateUrl: 'modules/core/views/platform/sidebar.client.view.html',
												controller: 'SidebarCtrl'
										},
										'footer' : {
												templateUrl: 'modules/core/views/platform/footer.client.view.html',
												controller: 'FooterCtrl'
										}
								}
						});
		}
]);