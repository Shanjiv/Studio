'use strict';

// Setting up route
angular.module('subjects').config(['$stateProvider',
		function($stateProvider) {

				// Subject states routing
				$stateProvider

						// Child state: Create a new subject entry offered at an existing university entry
						.state('platform.createSubject', {
								url: '/universities/:universityId/subjects/create',
								views: {
										'content': {
												templateUrl: 'modules/subjects/views/create-subject.client.view.html'
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

						// Child state: View a particular subject entry
						.state('platform.viewSubject', {
								url: '/universities/:universityId/subjects/:subjectId',
								views: {
										'content': {
												templateUrl: 'modules/subjects/views/view-subject.client.view.html',
												controller: 'ViewSubjectCtrl as vm',
												resolve: {
														subjectData: ['$stateParams', 'Subjects', function ($stateParams, Subjects) {
																var SubjectData = Subjects.get({
																		universityId: $stateParams.universityId,
																		subjectId: $stateParams.subjectId
																});
																return SubjectData.$promise;
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

						// Child state: Edit a particular subject entry
						.state('platform.editSubject', {
								url: '/universities/:universityId/subjects/:subjectId/edit',
								views: {
										'content': {
												templateUrl: 'modules/subjects/views/edit-subject.client.view.html'
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