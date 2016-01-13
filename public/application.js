'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
		function($locationProvider) {
				$locationProvider.hashPrefix('!');

				// Initialize wow.js
				new WOW().init();
		}
]);

// MomentJS
// Question is whether I have to do that once or always and forever.
angular.module(ApplicationConfiguration.applicationModuleName).run(['amMoment', function(amMoment) {
		amMoment.changeLocale('de');
}]);

angular.module(ApplicationConfiguration.applicationModuleName).constant('angularMomentConfig', {
		timezone: 'Europe/Berlin' // optional
});

//Then define the init function for starting up the application
angular.element(document).ready(function() {
		//Fixing facebook bug with redirect
		if (window.location.hash === '#_=_') window.location.hash = '#!';

		//Then init the app
		angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});