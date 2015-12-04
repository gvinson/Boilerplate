## What's in this repo?
Files for JS, CSS, SCSS, Grunt and an HTML boilerplate

 ---  
 &nbsp;
# Included Javascript files
*Customize these files as needed*   

**Forms.js**  
JS object for validating and submitting forms. Also includes a Response object for the response from the form.   
This object uses the webshim located in the js vendor directory. It must be declared for legacy browser validation to work. 

 **Lightbox.js**  
 Easy peasy lightbox object. Requires .lightbox, .lightbox-link classes. Change them as needed though. These classes are also referenced in the scss files.  
 
 **MobileMenu.js**
 Handles click events for hamburger icons. Inject nav elements into a mobile-nav-wrapper.  
 
### JavaScript vendor files  
*These files work out of the box. No need for modifications*  

**js-webshim**  
 for form  validation 
 
 **respond.min.js**  
 for media queries in legacy browsers  
 
 **html5shiv.min.js**  
 for html5 elements in legacy browsers  
 
 **jquery-1.11.0.min.js**  
 a build of jquery
 
 **modernizr.min.js**  
 support detection for browser features such as svg, canvas...included by default with webshim
 
 **picturefill.min.js**  
 for making the html5 picture element work in legacy browsers   
 
 &nbsp;  
 
 ---  
 &nbsp;
 
# Included SCSS files
**_normalize.scss**  
for normalizing browsers  
*This file shouldn't need to be edited. It is already good to go.*

**_helpers.scss**  
for helper classes such as .mobile-only, .non-mobile and .clearfix  

**_global.scss**  
for global declarations site wide, such as a wrapper or html,body.  

**_grid.scss**  
for grid layouts such as an equal height grid or a simple grid. Uses a $totalColors sass variable that is set in vars.scss  

**_hamburger.scss**  
styles for a hamburger icon. Requires 4 html elements that are in this index.html file.  

**_mobile-nav.scss**  
has styles for a mobile navigation. Requires 2 html elements.  

**_lightbox.scss**  
simple styles for a basic lightbox  

**_vars.scss**  
for all sass variables. Place re-used colors, media query sizes, font names, and any other variables you want to create.  

**layout.scss**  
imports all other scss files. Importing order does matter.  


### SASS guidelines
**Create multiple files for different modules**.  
Such as one for the hamburger, one for the main-nav, one for the mobile-nav, one for the lightbox, one for the home-hero, one for the subpage-hero, on for typography, one for the grid...  
**Only nest selectors by 2 times.**  
**Compass's "Best Practices"** : http://compass-style.org/help/tutorials/best_practices/

### Compiling SCSS files into one
Separated files that need to be imported must be prefixed with "_", for example:  
_hamburger.scss  
Then, in the layout.scss file, @import "hamburger"; for all .scss files.  

 &nbsp;  
 
 ---  
 &nbsp; 

# GRUNT
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

### Grunt package installation 
First, make sure node, npm and grunt-cli are installed on your machine/vm.  
Once they are, in your terminal, cd into the projects directory and enter the command:
```
npm install
```
Packages may take a while to install, especially phantomJS. Give it time.  
Packages listed in the package.json file will be loaded into an node_modules directory.  
**Please add the node_modules directory to the .gitignore file**

### Running Grunt Tasks
In this Gruntfile.js file, the default grunt task will run the "watch" task when you enter "grunt" into the terminal.
```
grunt.registerTask('default', ['watch']);
```

To run another command at anytime, you may enter it in the terminal. Ex:
```
grunt jshint
```