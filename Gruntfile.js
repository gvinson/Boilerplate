module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({	
		pkg: grunt.file.readJSON('package.json'),

		criticalcss: {
	        home: {
	            options: {
	                url: "http://grantvinson.dev/",
	                width: 1300,
	                height: 1000,
	                outputfile: "public/css/home-criticalcss.css",
	                filename: "public/css/layout.css", // Using path.resolve( path.join( ... ) ) is a good idea here
	                buffer: 1024*1300,
	                ignoreConsole: true
	            }
	        },
	    },

		// Use Compass for SASS
		compass: {				// Task for compass plugin
			dist: {				// Target
				options: {		// Target options
					sassDir: 'public/sass',
					cssDir: 'public/css',
					environment: 'production',
					outputStyle: 'compressed'
				}
			}
		},

		// Lint JS
		jshint: {
			files: ['Gruntfile.js', 'public/js/*.js', '!public/js/*.min.js',],
			options: {
		        curly: true,
		        eqeqeq: true,
		        immed: true,
		        latedef: true,
		        newcap: true,
		        noarg: true,
		        sub: true,
		        undef: true,
		        boss: true,
		        eqnull: true,
		        browser: true,
		        asi: false,
		        devel: true,

		        globals: {
		          module: true,
		          require: true,
		          requirejs: true,
		          jQuery: true,
		          $: true,
		          Modernizr: true,
		          console: true,
		          define: true,
		          windowObj: true,
		          documentObj: true,
		          webshim: true
		        }
		      }
	    },

	    watch: {
	    	scripts: {
	    		files: ['<%= jshint.files %>'],
		    	tasks: ['jshint', 'concat', 'uglify']
	    	},
	    	sass: {
    	        files: [ 'public/sass/*.scss' ],
    	        tasks: ['compass:dist',/* 'criticalcss:home'*/]
    	    },
    	    options: {
      			spawn: false,
    		},
	    },

	  // Media Queries
	  cmq: {
	      options: {
	        log: false
	      },
	      your_target: {
	        files: {
	          'public/css': ['public/css/layout.css']
	        }
	      }
	    },

	  // Minimize Images
	  imagemin: {
	  	dynamic: {                       
	      files: [{
	        expand: true,                  // Enable dynamic expansion
	        cwd: 'public/img/',                   // Src matches are relative to this path
	        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
	        dest: 'public/img_optimized/'         // Destination path prefix
	      }]
	    }
	  },

	  // JS concatenation and minifying
	  concat: {
        dist: {
          src: ['<%= jshint.files %>', '!Gruntfile.js'],
          dest: 'public/js/build.min.js',
        }
      },
      uglify: {
      	dist: {
      	  files: {
      	    'public/js/build.min.js': ['public/js/*.*.js', 'public/js/!**/*.min.js']
      	  }
      	},
      }  
	});

	// Load compass plugin
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-combine-media-queries');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-criticalcss');

	// Default task(s).
	grunt.registerTask('default', 
	  ['imagemin', 'jshint', 'concat', 'uglify', 'compass:dist', 'cmq']);
};
