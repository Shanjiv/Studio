'use strict';

angular.module('core').controller('HeaderCtrl', ['$scope', 'Authentication', 'Menus',
		function($scope, Authentication, Menus) {

				// Get the current user from the authentication service
				$scope.authentication = Authentication;

				// Navigation initialization
				$scope.navbarBrand = 'Studito';
				$scope.isCollapsed = false;
				$scope.topbar = Menus.getMenu('topbar');
				$scope.sidebar = Menus.getMenu('sidebar');

				$scope.toggleCollapsibleMenu = function() {
						$scope.isCollapsed = !$scope.isCollapsed;
				};

				// Collapsing the menu after navigation
				$scope.$on('$stateChangeSuccess', function() {
						$scope.isCollapsed = false;
				});
		}]);