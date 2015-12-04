module.exports = function(grunt) {

// Project configuration
grunt.initConfig({	
	pkg: grunt.file.readJSON('package.json'),

	/**
	 * Critical CSS
	 * Generates critical css files to be placed in the head
	 * of the document in a <style></style> tag.
	 */
	criticalcss: {
		// Tasks for the home page
		home: {
			options: {
				url: "http://liquidfish.dev/",
				width: 1300, // width of screen
				height: 1500, // height of screen
				outputfile: "app/views/criticalcss.php", // output path
				filename: "public/css/layout.css", // the css file to read from
				buffer: 1024*1500, // Sets the maxBuffer for child_process.execFile in Node
				ignoreConsole: true
			}
		},
		// Task for certain subpage
        subpage: {
            options: {
                url: "http://liquidfish.dev/contact",
                width: 1300,
                height: 1500,
                outputfile: "app/views/subcriticalcss.php",
                filename: "public/css/layout.css",
                buffer: 1024*1500,
                ignoreConsole: true
            }
        },
    },

	/**
	 * Compass
	 * A third party tool that has easy to use
	 * mixins and functions for sass.
	 */
	compass: {	
		dist: {	
			options: {	
				sassDir: 'public/scss',
				cssDir: 'public/css',
				environment: 'production',
				outputStyle: 'compressed'
			}
		}
	},

	/**
	 * JSHint
	 * Goes through files within the files array and
	 * makes sure there aren't any bugs/js is valid.
	 */
	jshint: {
		files: [
			// ! denotes NOT to lint this file
			'Gruntfile.js', 
			'public/js/*.js', 
			'!public/js/_*.js', // denotes "no build" file
			'!public/js/*.min.js', // don't lint minified files
			'!public/js/vendor/*.*.js' // don't lint vendor files
		],
		options: {
	        curly: true,
	        eqeqeq: true,
	        undef: true,
	        boss: true,
	        browser: true,
	        asi: false,
	        devel: true,
	        globals: {
	          jQuery: true,
	          $: true,
	          module: true,
	          Modernizr: true,
	          console: true,
	          webshim: true,
	        }
	      }
    },

    /**
     * Watch
     * When any files listed below change,
     * the tasks associated with those files will
     * be ran.
     */
    watch: {
    	// Watches javascript files
    	scripts: {
    		files: ['<%= jshint.files %>'],
	    	tasks: ['jshint', 'concat', 'uglify']
    	},
    	// Watches sass files 
    	sass: {
	        files: [ 'public/scss/*.scss' ],
	        tasks: ['compass:dist','cmq:dist', 'cssmin:dist', 'criticalcss:subpage','cssmin:subcritical', 'criticalcss:home', 'cssmin:homecritical']
	    },
	    // Watches svg icons
	    icons: {
	    	files: [ 'public/img/original-svgs/*.svg'],
	    	tasks: ['grunticon']
	    }
    },

    /**
     * Grunticon
     * Takes all svg's in the original-svgs directory
     * and creates icons out of them with grunticon.
     * Reading the documentation on this is helpful.
     * https://github.com/filamentgroup/grunticon
     */
    grunticon: {
        myIcons: {
            files: [{
                expand: true,
                cwd: 'public/img/original-svgs',
                src: ['*.svg', '*.png'],
                dest: "public/img/icons" // task will create this folder
            }],
            options: {
            	// The default width and height will make all icons this size
            	// To override this, set the width/height in the css with
            	// the appropriate class name
            	// Creates icons with the .icon-xxx class name
            	defaultWidth: "90px",
            	defaultHeight: "90px"
            }
        }
    },

    /**
     * Minify and compress png, jpg and gif images
     * from the 'public/img' directory. Places
     * the minified images in 'public/img_optimized'
     */
    imagemin: {
    	dynamic: {                       
        files: [{
          expand: true,  // Enable dynamic expansion
          cwd: 'public/img/',  // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],  // Actual patterns to match
          dest: 'public/img_optimized/'  // Destination path prefix
        }]
      }
    },

  	/**
  	 * Combine Media Queries
  	 * Combines media queries with the same
  	 * media tests into one media query from the
  	 * given files
  	 */
	cmq: {
		options: {
			log: true // Logs task in terminal
		},
		dist: {
			files: {
			  'public/css': ['public/css/layout.css']
			}
		}
    },

    /**
     * Minfy CSS
     * Minfies the css files. Even minifies css within
     * php files, such as our critical css files.
     */
    cssmin: {
    	dist: {
    		files: [{
    			expand: true,
    			cwd: 'public/css', // working directory
    			src: ['layout.css'], // src file to minify
    			dest: 'public/css', // where to place minified file
    			ext: '.css' // minified file extension
    		}]
    	},
    	subcritical: {
    		files: [{
    			expand: true,
    			cwd: 'app/views',
    			src: ['subcriticalcss.php'],
    			dest: 'app/views',
    			ext: '.php'
    		}]
    	},
		homecritical: {
			files: [{
				expand: true,
				cwd: 'app/views',
				src: ['criticalcss.php'],
				dest: 'app/views',
				ext: '.php'
			}]
		}
    },

  /**
   * JavaScript Concatenation
   * Takes all files in the jshint files array (except for the Gruntfile.js) 
   * and puts them all in one file, build.min.js
   */
  concat: {
    dist: {
      src: ['<%= jshint.files %>', '!Gruntfile.js'],
      dest: 'public/js/build.min.js',
    }
  },

  /**
   * Uglify/Minify JavaScript file
   * Minifies the build.min.js file from our
   * concat task
   */
  uglify: {
  	dist: {
  	  files: {
  	    'public/js/build.min.js': ['<%= jshint.files %>', '!Gruntfile.js']
  	  }
  	},
  }  
});

/**
 * Load all compass plugins
 */
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-combine-media-queries');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-criticalcss');
grunt.loadNpmTasks('grunt-grunticon');
grunt.loadNpmTasks('grunt-contrib-imagemin');


/**
 * Declare the Default Grunt task
 */
grunt.registerTask('default', 
  ['watch']);

};
