'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
		function($stateProvider) {
				// Users state routing
				$stateProvider

				// Child state profile
				.state('platform.profile', {
						url: '/settings/profile',
						views: {
								'content': {
										templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
								},
								'header' : {
										templateUrl: 'modules/core/views/platform/header.client.view.html',
										controller: 'HeaderCtrl'
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
				})

				// Child state password
				.state('platform.password', {
						url: '/settings/password',
						views: {
								'content': {
										templateUrl: 'modules/users/views/settings/change-password.client.view.html'
								},
								'header' : {
										templateUrl: 'modules/core/views/platform/header.client.view.html',
										controller: 'HeaderCtrl'
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
				})

				// Child state account
				.state('platform.accounts', {
						url: '/settings/accounts',
						views: {
								'content': {
										templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
								},
								'header' : {
										templateUrl: 'modules/core/views/platform/header.client.view.html',
										controller: 'HeaderCtrl'
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
				})

				// Child state signup
				.state('platform.signup', {
						url: '/signup',
						views: {
								'content': {
										templateUrl: 'modules/users/views/authentication/signup.client.view.html'
								},
								'header' : {
										templateUrl: 'modules/core/views/platform/header.client.view.html',
										controller: 'HeaderCtrl'
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
				})

				// Child state signin
				.state('platform.signin', {
						url: '/signin',
						views: {
								'content': {
										templateUrl: 'modules/users/views/authentication/signin.client.view.html'
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
				})

				// Child state forgot
				.state('platform.forgot', {
						url: '/password/forgot',
						views: {
								'content': {
										templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
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
				})

				// Child state reset-invalid
				.state('platform.reset-invalid', {
						url: '/password/reset/invalid',
						views: {
								'content': {
										templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
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
				})

				// Child state reset-success
				.state('platform.reset-success', {
						url: '/password/reset/success',
						views: {
								'content': {
										templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
								},
								'header' : {
										templateUrl: 'modules/core/views/platform/header.client.view.html'							},
								'sidebar' : {
										templateUrl: 'modules/core/views/platform/sidebar.client.view.html',
										controller: 'SidebarCtrl'
								},
								'footer' : {
										templateUrl: 'modules/core/views/platform/footer.client.view.html',
										controller: 'FooterCtrl'
								}
						}
				})

				// Child state reset
				.state('platform.reset', {
						url: '/password/reset/:token',
						views: {
								'content': {
										templateUrl: 'modules/users/views/password/reset-password.client.view.html'
								},
								'header' : {
										templateUrl: 'modules/core/views/platform/header.client.view.html'								},
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