'use strict';

// Module dependencies
var passport = require('passport');

module.exports = function(app) {
		// User Routes
		var UsersController = require('../../app/controllers/users.server.controller');

		// Setting up the users profile api
		app.route('/users/me').get(UsersController.me);
		app.route('/users').put(UsersController.update);
		app.route('/users/accounts').delete(UsersController.removeOAuthProvider);

		// Setting up the users password api
		app.route('/users/password').post(UsersController.changePassword);
		app.route('/auth/forgot').post(UsersController.forgot);
		app.route('/auth/reset/:token').get(UsersController.validateResetToken);
		app.route('/auth/reset/:token').post(UsersController.reset);

		// Setting up the users authentication api
		app.route('/auth/signup').post(UsersController.signup);
		app.route('/auth/signin').post(UsersController.signin);
		app.route('/auth/signout').get(UsersController.signout);

		// Setting the facebook oauth routes
		app.route('/auth/facebook').get(passport.authenticate('facebook', {
				scope: ['email']
		}));
		app.route('/auth/facebook/callback').get(UsersController.oauthCallback('facebook'));

		// Setting the twitter oauth routes
		app.route('/auth/twitter').get(passport.authenticate('twitter'));
		app.route('/auth/twitter/callback').get(UsersController.oauthCallback('twitter'));

		// Setting the google oauth routes
		app.route('/auth/google').get(passport.authenticate('google', {
				scope: [
						'https://www.googleapis.com/auth/userinfo.profile',
						'https://www.googleapis.com/auth/userinfo.email'
				]
		}));
		app.route('/auth/google/callback').get(UsersController.oauthCallback('google'));

		// Setting the linkedin oauth routes
		app.route('/auth/linkedin').get(passport.authenticate('linkedin'));
		app.route('/auth/linkedin/callback').get(UsersController.oauthCallback('linkedin'));

		// Setting the github oauth routes
		app.route('/auth/github').get(passport.authenticate('github'));
		app.route('/auth/github/callback').get(UsersController.oauthCallback('github'));

		// Finish by binding the user middleware
		app.param('userId', UsersController.userById);
};