'use strict';

// Add this to be able to inject lodash into your Angular controllers
angular.module('core')
		.factory('_', ['$window',
				function($window) {
						// place lodash include before angular
						return $window._;
				}
		]);

// .controller('MainCtrl', ['$scope', '_',