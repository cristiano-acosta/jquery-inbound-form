module.exports = function( grunt ) {

	grunt.initConfig( {

		// Import package manifest
		pkg: grunt.file.readJSON( "package.json" ),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: [ "src/jquery.inbound.form.js" ],
				dest: "dist/jquery.inbound.form.js"
			}
		},

		// Lint definitions
		jshint: {
			files: [ "src/jquery.inbound.form.js", "test/**/*.js" ],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		jscs: {
			src: "src/**/*.js",
			options: {
				config: ".jscsrc"
			}
		},

		// Minify definitions
		uglify: {
			dist: {
				src: [ "dist/jquery.inbound.form.js" ],
				dest: "dist/jquery.inbound.form.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// CoffeeScript compilation
		coffee: {
			compile: {
				files: {
					"dist/jquery.inbound.form.js": "src/jquery.inbound.form.coffee"
				}
			}
		},

		// karma test runner
		karma: {
			unit: {
				configFile: "karma.conf.js",
				background: true,
				singleRun: false,
				browsers: [ "PhantomJS", "Firefox" ]
			},

			//continuous integration mode: run tests once in PhantomJS browser.
			travis: {
				configFile: "karma.conf.js",
				singleRun: true,
				browsers: [ "PhantomJS" ]
			}
		},

    sass: {
      // this is the "dev" Sass config used with "grunt watch" command
      dev: {
        options: {
          style: 'expanded',
          // tell Sass to look in the Bootstrap stylesheets directory when compiling
          loadPath: 'bower_components/bootstrap-sass/assets/stylesheets',
        },
        files: {
          // the first path is the output and the second ids the input
          'demo/style.css': 'demo/sass/style.scss'
        }
      },
      // this is the "production" Sass config used with the "grunt buildcss" command
      dist: {
        options: {
          style: 'compressed',
          loadPath: 'bower_components/bootstrap-sass/assets/stylesheets'
        },
        files: {
          'demo/style.css': 'demo/sass/style.scss'
        }
      }
    },

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
			files: [ "src/*", "test/**/*" ],
			tasks: [ "default" ],
      sass: {
        files: 'demo/sass/*.scss',
        tasks: ['sass:dev']
      }
		}

	} );

	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-jscs" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-coffee" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-karma" );
  // sass
  grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask( "travis", [ "jshint", "karma:travis" ] );
	grunt.registerTask( "lint", [ "jshint", "jscs" ] );
	grunt.registerTask( "build", [ "concat", "uglify" ] );
	grunt.registerTask( "default", [ "jshint", "build", "karma:unit:run", "sass" ] );
  // "grunt buildcss" is the same as running "grunt sass:dist".
  // if I had other tasks, I could add them to this array.
  grunt.registerTask('buildcss', ['sass:dist']);
};
