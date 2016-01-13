'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

				// Redirect to home view when route not found
				$urlRouterProvider.otherwise('/');

				// Platform state routing
				$stateProvider

						// Parent state: platform
						.state('platform', {
								// Does not need a url, since it is the grandparent state and cannot exist without its grandchildren.
								views: {
										// Overwrite the unnamed ui-view in the parent's parent, i.e. the grandparent, with the @ symbol
										'': {
												templateUrl: 'modules/core/views/platform.client.view.html'
										}
								}
						})

						// Child state: home
						.state('platform.home', {
								url: '/tiger',
								views: {
										'header' : {
												templateUrl: 'modules/core/views/platform/header.client.view.html'
										},
										'sidebar' : {
												templateUrl: 'modules/core/views/platform/sidebar.client.view.html',
												controller: 'SidebarCtrl'
										},
										'content' : {
												templateUrl: 'modules/core/views/platform/content.client.view.html',
												controller: 'HomeCtrl'
										},
										'footer' : {
												templateUrl: 'modules/core/views/platform/footer.client.view.html',
												controller: 'FooterCtrl'
										}
								}
						});
		}
]);