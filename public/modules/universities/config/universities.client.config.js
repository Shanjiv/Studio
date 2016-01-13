'use strict';

// Configuring the Universities module Menu items
angular.module('universities').run(['Menus',
		function(Menus) {
				// Menus.addMenuItem(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position);
				// Menus.addSubMenuItem(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position);

				// Set topbar menu items
				Menus.addMenuItem('topbar', 'Universitäten', 'universities', 'dropdown', '/universities(/create)?');
				Menus.addSubMenuItem('topbar', 'universities', 'Übersicht', 'universities');
				Menus.addSubMenuItem('topbar', 'universities', 'Neuer Eintrag', 'universities/create');

				// Set sidebar menu items
				// ...

		}
]);
