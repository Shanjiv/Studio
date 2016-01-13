'use strict';

// Module dependencies
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var morgan = require('morgan');
var logger = require('./logger');
var bodyParser = require('body-parser');
var session = require('express-session');
var compress = require('compression');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var passport = require('passport');
var mongoStore = require('connect-mongo')({
		session: session
});
var flash = require('connect-flash');
var consolidate = require('consolidate');
var path = require('path');

var config = require('./config');

module.exports = function (db) {

		// Initialize Express app
		var app = express();

		//==============================
		/* Crawl all mongoose model files */
		//==============================
		config.getAssetsByGlobPatterns('app/models/**/*.js').forEach(function (modelPath) {
				require(path.resolve(modelPath));
		});

		// Local variables
		app.locals.title = config.app.locals.title;
		app.locals.description = config.app.locals.description;
		app.locals.keywords = config.app.locals.keywords;

		// app.locals.cache = 'memory'; // Fixing a consolidate.js bug
		app.locals.jsHeadFiles = config.getJsHeadFiles();
		app.locals.jsHeaderFiles = config.getJsHeaderFiles();
		app.locals.jsFooterFiles = config.getJsFooterFiles();
		app.locals.cssHeadFiles = config.getCssHeadFiles();
		app.locals.cssHeaderFiles = config.getCssHeaderFiles();
		app.locals.cssFooterFiles = config.getCssFooterFiles();

		// Passing the request url to environment locals
		app.use(function(req, res, next) {
				res.locals.url = req.protocol + '://' + req.headers.host + req.url;
				next();
		});

		// Should be placed before express.static
		app.use(compress({
				filter: function(req, res) {
						return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
				},
				level: 9
		}));

		// Showing stack errors
		app.set('showStackError', true);

		// Set swig as the template engine
		app.engine('server.view.html', consolidate[config.templateEngine]);

		// Set views path and view engine
		app.set('view engine', 'server.view.html');
		app.set('views', './app/views');

		// Enable logger (morgan)
		app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));

		// Environment dependent middleware
		if (process.env.NODE_ENV === 'development') {
				// Disable views cache
				app.set('view cache', false);
		} else if (process.env.NODE_ENV === 'production') {
				app.locals.cache = 'memory';
		}

		// Request body parsing middleware should be above methodOverride
		app.use(bodyParser.urlencoded({
				extended: true
		}));
		app.use(bodyParser.json());
		app.use(methodOverride());

		// CookieParser should be above session
		app.use(cookieParser());

		// Express MongoDB session storage
		app.use(session({
				saveUninitialized: true,
				resave: true,
				secret: config.sessionSecret,
				store: new mongoStore({
						db: db.connection.db,
						collection: config.sessionCollection
//						clear_interval: 3600,
//						auto_reconnect: true
				}),
				cookie: config.sessionCookie,
				name: config.sessionName
		}));

		// use passport session
		app.use(passport.initialize());
		app.use(passport.session());

		// connect flash for flash messages
		app.use(flash());

		// Use helmet to secure Express headers
		app.use(helmet.xframe());
		app.use(helmet.xssFilter());
		app.use(helmet.nosniff());
		app.use(helmet.ienoopen());
		app.disable('x-powered-by');

		// Set static folder path
		app.use(express.static(path.resolve('./public')));

		// =============================
		/* Routes Handling */
		//==============================
		// Crawl all route files
		config.getAssetsByGlobPatterns('app/routes/**/*.js').forEach(function (routePath) {
				require(path.resolve(routePath))(app);
		});

		// =============================
		/* Error Handling */
		//==============================

		// Error 500 - Something blew up
		app.use(function (err, req, res, next) {
				// If the error object doesn't exist
				if (!err) {
						return next();
				}

				// Otherwise log the error ...
				console.error(err.stack);

				// ... and render the error page
				res.status(500).render('500', {
						error: err.stack
				});
		});

		// Error 404 - Page not found
		// At this point we are assuming error 404 since no middleware responded
		app.use(function (req, res) {
				res.status(404).render('404', {
						url: req.originalUrl,
						error: 'Not Found!'
				});
		});

		// Return the Express server instance
		return app;
};