Includes basic files for JS, CSS, SCSS, Grunt and an HTML boilerplate

# INCLUDED FILES  

### Javascript
*Customize these files as needed*  
**Forms.js**  
JS object for validating and submitting forms. Also included a Response object for the response from the form.   
This object uses the webshim located in the js vendor directory. It must be declared for legacy browser validation to work.  
 **Lightbox.js**  
 Easy peasy lightbox object. Requires .lightbox, .lightbox-link classes. Change them as needed though. These classes are also referenced in the scss files.  
 **MobileMenu.js**
 Handles click events for hamburger icons. Inject nav elements into a mobile-nav-wrapper.   
 ####Vendors####
 **js-webshim** for form  
 **respond.js** for media queries in legacy browsers  
 **html5shiv.min** for html5 elements in legacy browsers  
 **jquery-1.11**  
 **modernizr.min.js**  
 **picturefill.min.js** for making the html5 picture element work in legacy browsers  
 
###SCSS###    
**normalize.scss** for normalizing browsers  
**helpers.scss** for helper classes such as .mobile-only, .non-mobile and .clearfix  
**global.scss** for global declarations site wide, such as a wrapper or html,body.  
**grid.scss** for grid layouts such as an equal height grid or a simple grid. Uses a $totalColors sass variable that is set in vars.scss  
**hamburger.scss** styles for a hamburger icon. Requires 4 html elements that are in this index.html file.  
**mobile-nav.scss** has styles for a mobile navigation. Requires 2 html elements.  
**lightbox.scss** simple styles for a basic lightbox  
**vars.scss** for all sass variables. Place re-used colors, media query sizes, font names, and any other variables you want to create.  
**layout.scss** imports all other scss files. Importing order does matter.  

# GUIDELINES  
### package.json File and Grunt Tasks
Included packages:  
**"grunt": "~0.4.2"**  
Basic tool for grunt to run locally in project  
Documentation: http://gruntjs.com/  

**"grunt-combine-media-queries": "~1.0.19"**  
Combines media queries in css file once scss files are compiled  
Documentation: https://github.com/buildingblocks/grunt-combine-media-queries

**"grunt-contrib-compass": "~0.9.0"**  
Adds compass for sass. Lots of cool features built in with compass.  
Documentation: http://compass-style.org/reference/compass/

**"grunt-contrib-concat": "~0.5.0"**  
Concatenates all js files into one  
Documentation: https://github.com/gruntjs/grunt-contrib-concat

**"grunt-contrib-cssmin": "^0.14.0"**  
Minifies css files (including criticalcss files)  
Documentation: https://github.com/gruntjs/grunt-contrib-cssmin

**"grunt-contrib-imagemin": "^1.0.0"**  
Minifies images in an specified folder (public/img) and outputs the minified images to another (public/img-optimized)  
Documentation: https://github.com/gruntjs/grunt-contrib-imagemin

**"grunt-contrib-jshint": "~0.10.0"**  
Lists JS files for errors. If any are found, the build will fail.  
Documentation: https://github.com/gruntjs/grunt-contrib-jshint

**"grunt-contrib-uglify": "~0.5.0"**  
Minifies js files once they are concatenated  
Documentation: https://github.com/gruntjs/grunt-contrib-uglify

**"grunt-contrib-watch": "^0.6.1"**  
Watches certain folders/files for changes and runs tasks for those files  
Documentation: https://github.com/gruntjs/grunt-contrib-watch

**"grunt-criticalcss": "0.6.0"**  
Creates the criticalcss for pages when scss files are updated/saved.  
The criticalcss needs to be placed in a style tag in the head element. Use a php require(file) to import them dynamically.  
Documentation: https://github.com/filamentgroup/grunt-criticalcss

**"grunt-grunticon": "^2.2.2"**  
Converts svgs into css/png and provides fallbacks and scripts.  
Documentation: https://github.com/filamentgroup/grunticon


###SASS/SCSS###
.scss files have the same syntax as regular .css files.  
.sass is similar but doesn't require {} or ;  
**Please use .scss**

**Separate elements into multiple .scss files.**   
Such as one for the hamburger, one for the main-nav, one for the mobile-nav, one for the lightbox, one for the home-hero, one for the subpage-hero, on for typography, one for the grid...  
Separated files that need to be imported must be prefixed with "_", for example:  
_hamburger.scss  
Then, in the layout.scss file, @import "filename" for all .scss files.  

Only nest selectors by 2 times. 
Compass's "Best Practices" : http://compass-style.org/help/tutorials/best_practices/