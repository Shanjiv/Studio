'use strict';

// Database environment variables
var dbUser = process.env.DB_USER;
var dbSecret = process.env.DB_SECRET;
var dbPort = process.env.DB_PORT;
var dbName = process.env.DB_NAME;

module.exports = {
		includeTests: false,
		db: {
				user: dbUser,
				secret: dbSecret,
				port: dbPort,
				name: dbName,
				uri: 'mongodb://' + dbUser + ':' + dbSecret + '@proximus.modulusmongo.net:' + dbPort + '/' + dbName
		},
		facebook: {
				clientID: process.env.FACEBOOK_ID || 'APP_ID',
				clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
				callbackURL: '/auth/facebook/callback'
		},
		twitter: {
				clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
				clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
				callbackURL: '/auth/twitter/callback'
		},
		google: {
				clientID: process.env.GOOGLE_ID || 'APP_ID',
				clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
				callbackURL: '/auth/google/callback'
		},
		linkedin: {
				clientID: process.env.LINKEDIN_ID || 'APP_ID',
				clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
				callbackURL: '/auth/linkedin/callback'
		},
		github: {
				clientID: process.env.GITHUB_ID || 'APP_ID',
				clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
				callbackURL: '/auth/github/callback'
		},
		mailer: {
				from: process.env.MAILER_FROM || 'MAILER_FROM',
				options: {
						service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
						auth: {
								user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
								pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
						}
				}
		}
};