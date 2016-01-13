'use strict';

// Setting up route
angular.module('universities').config(['$stateProvider',
		function($stateProvider) {

				// Universities states routing
				$stateProvider

						// Child state: List all university entries
						.state('platform.listUniversities', {
								url: '/universities',
								views: {
										'content': {
												templateUrl: 'modules/universities/views/list-universities.client.view.html',
												controller: 'ListUniversitiesCtrl as vm',
												resolve: {
														universitiesData: ['Universities', function (Universities) {
																var UniversitiesData = Universities.query();
																return UniversitiesData.$promise;
														}]
												}
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

						// Child state: Create a new university entry
						.state('platform.createUniversity', {
								url: '/universities/create',
								views: {
										'content': {
												templateUrl: 'modules/universities/views/create-university.client.view.html'
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

						// Child state: View a particular university entry
						.state('platform.viewUniversity', {
								url: '/universities/:universityId',
								views: {
										'content': {
												templateUrl: 'modules/universities/views/view-university.client.view.html',
												controller: 'ViewUniversityCtrl as vm',
												resolve: {
														universityData: ['Universities', '$stateParams', function (Universities, $stateParams) {
																var UniversityData = Universities.get({
																		universityId: $stateParams.universityId
																});
																return UniversityData.$promise;
														}],
														degreesData: ['Degrees', '$stateParams', function (Degrees, $stateParams) {
																var DegreesData = Degrees.query({
																		universityId: $stateParams.universityId
																});
																return DegreesData.$promise;
														}]
												}
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

						// Child state: Edit a particular university entry
						.state('platform.editUniversity', {
								url: '/universities/:universityId/edit',
								views: {
										'content': {
												templateUrl: 'modules/universities/views/edit-university.client.view.html'
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
						});

		}
]);