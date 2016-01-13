'use strict';

var assets = require('./config/assets.json');

module.exports = function(grunt) {

		// Unified Watch Object
		var watchFiles = {
				serverViews: ['app/views/**/*.*'],
				serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
				clientViews: ['public/modules/**/views/**/*.html'],
				clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
				clientCSS: ['public/modules/**/*.css'],
				mochaTests: ['app/tests/**/*.js']
		};

		grunt.initConfig({

				pkg: grunt.file.readJSON('package.json'),

				// Uglification
				//=======================================
				uglify: {
						build: {
								options: {
										mangle: true,
										compress: false
								},
								files: [
										assets.lib.js.head,
										assets.lib.js.header,
										assets.lib.js.footer,
										assets.app.js.head,
										assets.app.js.header,
										assets.app.js.footer
								]
						}
				},

				// Cssification
				//=======================================
				sass: {
						build: {
								options: {
										sourcemap: 'none',
										noCache: true,
										compass: true
								},
								files: {
										'public/modules/core/stylesheets/core.css' : 'public/modules/core/stylesheets/core.scss'
								}

						}
				},

				// Minify distribution stylesheets
				//=======================================
				cssmin: {
						build: {
								options:{
										root: 'public'

								},
								files: [
										assets.lib.css.head,
										assets.app.css.head
								]
						}
				},

				// Open in browser
				//=======================================
				open: {
						all: {
								// Gets the port from the connect configuration
								path: 'http://localhost:3000'
						}
				},

				// watch stylesheets and js files and process the allocated tasks
				//=======================================
				watch: {
						serverViews: {
								files: watchFiles.serverViews,
								options: {
										livereload: true
								}
						},
						serverJS: {
								files: watchFiles.serverJS,
								tasks: ['jshint'],
								options: {
										livereload: true
								}
						},
						clientViews: {
								files: watchFiles.clientViews,
								options: {
										livereload: true
								}
						},
						clientJS: {
								files: watchFiles.clientJS,
								tasks: ['jshint'],
								options: {
										livereload: true
								}
						},
						clientCSS: {
								files: watchFiles.clientCSS,
								tasks: ['csslint'],
								options: {
										livereload: true
								}
						}
				},

				// watch our node server for changes
				//=======================================
				nodemon: {
						dev: {
								script: 'server.js',
								options: {
								}
						}
				},

				// run watch and nodemon at the same time
				//=======================================
				concurrent: {
						options: {
								logConcurrentOutput: true
						},
						tasks: ['nodemon', 'watch']
				},

				// clean build file, i.e. delete it, prior re-rendering the files
				//=======================================
				clean: {
						build: 	'./public/dist'
				},

				// Setting environment variables
				//=======================================
				env: {
						production: {
								NODE_ENV: 'production'
						},
						development: {
								NODE_ENV: 'development'
						},
						test: {
								NODE_ENV: 'test'
						},
						secure: {
								NODE_ENV: 'secure'
						}
				},

				// JSHint
				//=======================================
				jshint: {
						all: {
								src: watchFiles.clientJS.concat(watchFiles.serverJS),
								options: {
										jshintrc: true
								}
						}
				},

				// CSSLint
				//=======================================
				csslint: {
						options: {
								csslintrc: '.csslintrc'
						},
						all: {
								src: watchFiles.clientCSS
						}
				},

				// Mocha Test (Testing your backend logic)
				//=======================================
				mochaTest: {
						src: watchFiles.mochaTests,
						options: {
								reporter: 'spec',
								require: 'server.js'
						}
				},


				// Karma (Configuration of your Test Runner)
				//=======================================
				karma: {
						unit: {
								configFile: 'karma.config.js'
						}
				}

		});

		// Load NPM tasks
		require('load-grunt-tasks')(grunt);

		// Making grunt default to force in order not to break the project.
		grunt.option('force', true);

		// Specify alias tasks
		//=======================================
		grunt.registerTask('default', ['dev']);

		grunt.registerTask('dev', ['env:development', 'sass:build', 'open', 'concurrent']);

		grunt.registerTask('prod', ['env:production', 'build', 'open', 'nodemon']);

		grunt.registerTask('build', ['clean:build', 'sass:build', 'uglify:build', 'cssmin:build']);

		grunt.registerTask('lint', ['jshint', 'csslint']);

		grunt.registerTask('mocha', ['env:test', 'mochaTest']);

		grunt.registerTask('jasmine', ['env:test', 'karma:unit']);

};