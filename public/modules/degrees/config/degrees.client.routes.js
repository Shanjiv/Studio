'use strict';

// Setting up route
angular.module('degrees').config(['$stateProvider',
		function($stateProvider) {

				// Degree states routing
				$stateProvider

						// Child state: Create a new degree entry for an existing university entry
						.state('platform.createDegree', {
								url: '/universities/:universityId/degrees/create',
								views: {
										'content': {
												templateUrl: 'modules/degrees/views/create-degree.client.view.html'
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

						// Child state: View a particular degree entry
						.state('platform.viewDegree', {
								url: '/universities/:universityId/degrees/:degreeId',
								views: {
										'content': {
												templateUrl: 'modules/degrees/views/view-degree.client.view.html',
												controller: 'ViewDegreeCtrl as vm',
												resolve: {
														degreeData: ['$stateParams', 'Degrees', function ($stateParams, Degrees) {
																var DegreeData = Degrees.get({
																		universityId: $stateParams.universityId,
																		degreeId: $stateParams.degreeId
																});
																return DegreeData.$promise;
														}],
														subjectsData: ['$stateParams', 'Subjects', function ($stateParams, Subjects) {
																var SubjectsData = Subjects.query({
																		universityId: $stateParams.universityId,
																		degreeId: $stateParams.degreeId
																});
																return SubjectsData.$promise;
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

						// Child state: Edit a particular degree entry
						.state('platform.editDegree', {
								url: '/universities/:universityId/degrees/:degreeId/edit',
								views: {
										'content': {
												templateUrl: 'modules/degrees/views/edit-degree.client.view.html'
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