'use strict';

// Configuring the Universities module Menu items
angular.module('tags').run(['Menus',
		function(Menus) {
				// Menus.addMenuItem(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position);
				// Menus.addSubMenuItem(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position);

				// Set topbar menu items
				Menus.addMenuItem('topbar', 'Tags', 'tags', 'item', 'platform.tags');

				// Set sidebar menu items
				// ...

		}
]);
