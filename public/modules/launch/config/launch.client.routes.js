'use strict';

angular.module('launch').config(['$stateProvider',
		function($stateProvider) {

				// Launch state routing
				$stateProvider

						// Parent state
						.state('launch', {
								// Does not need a url, since it is the parent state and cannot exist by its own.
								views: {
										// Use the unnamed ui-view
										'': {
												templateUrl: 'modules/launch/views/launch.client.view.html',
												controller: 'LaunchCtrl',
												resolve: {
														universitiesData: ['Universities', function (Universities) {
																var UniversitiesData = Universities.query();
																return UniversitiesData.$promise;
														}]
												}
										}
								}
						})

						// Child state 1
						// Initial launch state: The user inputs data and hits the pre-launch signup button.
						.state('launch.input', {
								url: '/',
								views: {
										'hello': {
												templateUrl: 'modules/launch/views/hello/hello.client.view.html'
										},
										'explain': {
												templateUrl: 'modules/launch/views/explain/explain.client.view.html'
										},
										'unique': {
												templateUrl: 'modules/launch/views/unique/unique.client.view.html'
										},
										'review': {
												templateUrl: 'modules/launch/views/review/review.client.view.html'
										},
										'campaign': {
												templateUrl: 'modules/launch/views/campaign/campaign.client.view.html'
										},
										'media': {
												templateUrl: 'modules/launch/views/media/media.client.view.html'
										},
										'goodbye': {
												templateUrl: 'modules/launch/views/goodbye/goodbye.client.view.html'
										}
								}
						})

						// Child state 2
						// Alternative launch state: Success. The data has been transmitted successfully.
						.state('launch.success', {
								url: '/thankyou',
								views: {
										'hello': {
												templateUrl: 'modules/launch/views/hello/success.client.view.html'
										},
										'explain': {
												templateUrl: 'modules/launch/views/explain/explain.client.view.html'
										},
										'unique': {
												templateUrl: 'modules/launch/views/unique/unique.client.view.html'
										},
										'goodbye': {
												templateUrl: 'modules/launch/views/goodbye/goodbye.client.view.html'
										}
								}
						})

						// Child state 3
						// Alternative launch state: Failure. The data could not be transmitted.
						.state('launch.failure', {
								url: '/ooopps',
								views: {
										'hello': {
												templateUrl: 'modules/launch/views/hello/failure.client.view.html'
										},
										'explain': {
												templateUrl: 'modules/launch/views/explain/explain.client.view.html'
										},
										'unique': {
												templateUrl: 'modules/launch/views/unique/unique.client.view.html'
										},
										'goodbye': {
												templateUrl: 'modules/launch/views/goodbye/goodbye.client.view.html'
										}
								}
						})

						// Child state 4
						// Alternative launch state: Verified.
						.state('launch.verified', {
								url: '/verified',
								views: {
										'hello': {
												templateUrl: 'modules/launch/views/hello/verified.client.view.html'
										},
										'explain': {
												templateUrl: 'modules/launch/views/explain/explain.client.view.html'
										},
										'unique': {
												templateUrl: 'modules/launch/views/unique/unique.client.view.html'
										},
										'goodbye': {
												templateUrl: 'modules/launch/views/goodbye/goodbye.client.view.html'
										}
								}
						})

						// Child state 5
						// Alternative launch state: Expired.
						.state('launch.expired', {
								url: '/expired',
								views: {
										'hello': {
												templateUrl: 'modules/launch/views/hello/expired.client.view.html'
										},
										'explain': {
												templateUrl: 'modules/launch/views/explain/explain.client.view.html'
										},
										'unique': {
												templateUrl: 'modules/launch/views/unique/unique.client.view.html'
										},
										'goodbye': {
												templateUrl: 'modules/launch/views/goodbye/goodbye.client.view.html'
										}
								}
						})

				;
		}
]);