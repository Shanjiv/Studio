'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
		function() {
				var _this = this;

				_this._data = {
						// Calling req.login via PassportJS puts user data into the session on the server side.
						// Now on the angular client side we get the user data from the session in a service by the following:
						user: window.user
				};

				return _this._data;
		}
]);