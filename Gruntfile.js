module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({	
		pkg: grunt.file.readJSON('package.json'),

		// Create Critical CSS to be included in view
		criticalcss: {
			// Tasks for the home page
			home: {
				options: {
					url: "http://liquidfish.dev/",
					width: 1300,
					height: 1500,
					outputfile: "app/views/criticalcss.php", // the output path for the created file
					filename: "public/css/layout.css", // the css file to read from
					buffer: 1024*1500,
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

		// Use Compass for SASS
		compass: {	
			dist: {	
				options: {	
					sassDir: 'public/sass',
					cssDir: 'public/css',
					environment: 'production',
					outputStyle: 'compressed'
				}
			}
		},

		// Lint JS
		jshint: {
			// ! denotes NOT to lint this file
			files: [
				'Gruntfile.js', 
				'public/js/*.js', 
				'!public/js/*.min.js',
				'!public/js/vendor/*.*.js'
			],
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
		          webshim: true,
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
    	        tasks: ['compass:dist','cmq:dist', 'cssmin:dist', /*'criticalcss:subpage','cssmin:subcritical', 'criticalcss:home', 'cssmin:homecritical'*/]
    	    },
    	    icons: {
    	    	files: [ 'public/img/original-svgs/*.svg'],
    	    	tasks: ['grunticon']
    	    },
	    },

	    // Grunticon
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

	    // Minimize Images
	    imagemin: {
	    	dynamic: {                       
	        files: [{
	          expand: true,  // Enable dynamic expansion
	          cwd: 'public/img/',  // Src matches are relative to this path
	          src: ['**/*.{png,jpg,gif}'],  // Actual patterns to match
	          dest: 'public/img-optimized/'  // Destination path prefix
	        }]
	      }
	    },

	  // Media Queries
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

	    // Minify CSS
	    cssmin: {
	    	dist: {
	    		files: [{
	    			expand: true,
	    			cwd: 'public/css',
	    			src: ['layout.css'],
	    			dest: 'public/css',
	    			ext: '.css'
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
      	    'public/js/build.min.js': ['public/js/*.*.js', 'public/js/!**/*.min.js', '!public/js/vendor/*.*.js']
      	  }
      	},
      }  
	});

	// Load compass plugin
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

	// Default task(s).
	grunt.registerTask('default', 
	  ['watch']);
};
