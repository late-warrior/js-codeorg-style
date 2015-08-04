##Goal
  Use Highcharts as the base library. All the changes and enhancements should be independent and be written as plugins.  Upgrading the library version should be only a config change (bumping up version number in some configuration file).

  I want to come up with a build structure and process so to suit the above requirement.

  So, the goals of this new build system would be:

 * Separate library code from user code
 * Make it easy to update library code
 * Ability to *watch* over changes made and have *live reload* facility - developers changing *source* code can directly see their changes on the browser - this will improve productivity.  Today they either work directly on the build, in which case they have to remember to copy their changes back to source or they work on the source and run then *build* - this build takes time.
 * Establish a clear pattern for the way plugins must be written
 * Generate documentation easily
 * Make it easy to add test cases

### Maven vs Grunt/Gulp

Q) What is grunt/gulp ?

A) Grunt/Gulp are build tools that are nodejs based.  They can be used as a task runner for applications written in any language but are frequently used in nodejs/javascript web applications.  If you want to integrate it with maven, it is trivial using the maven-exec plugin, which can be used to execute any command-line utility.  There must be plugins now as well which help you gulp/grunt with maven.  

Q) Is using maven really necessary though ?

I think not.  It might be useful in applications which are already java based and have maven setup, but if you are using it in a standalone application, maven is just additional overhead.

Q) Why can't we just stick with ant ?

Lot of the operations we do in gulp can be done in ant - especially the file/directory manipulation stuff.  However gulp has a rich ecosystem of plugins to do things like:

 * Minification
 * Image compression
 * Font optimization
 * Watching and live reload
 * Source maps - to help work with minified code

 While there may be equivalents of these in maven, the fact that there is a *big* commnunity behind these plugins and the pace of development is very good.  A gulp minification plugin is more likely to be better maintained than a maven based one (yui-compressor for eg.)

### Scaffolding

I had no inclination towards any way to organize directories.  So, I headed over to (Yeoman)[http://yeoman.io] and made use of one of their *generators*.   A generator is a scaffolding tool that helps you get started quickly.  My only expectation from the generator was to create the folder structure for me and so I chose the simplest one available - gulp-webapp.

The scaffolding gave other benefits like jslinting, setting up test cases, coverage reports etc.

### Tools/terminology

This is the common lingo:

 * Managing Javascript modules - CMD, AMD and UMD
 * CMD - npm, AMD - requirejs
 * Bower - for frontend web development javascript management.  Node has nothing to do with such a script - putting constructs like 'require(jquery)' would fail
 * Browserify - to help you use node modules on the browser
 * Browserify-shim - extension to browserify to help you deal with libraries that are not CommonJS compliant and already leaked globals into the environment. Eg. jQuery
 * Component, Webpack - same functionality like browserify
 * Gulp plugins - lot of functionality can be included as gulp plugins.  For eg. to run jasmine test cases, we can include only gulp-karma instead of having to install karma separately and integrating it with gulp.

### Client side vs Server side Javascript

This was/is the single biggest source of confusion.  Constructs like 'require(jquery')' wont work on the client side.  If you want server like behavior on the client side (which isn't an outrageous thing to expect given that you are coding in javascript), we need to use something like browserify.  Also, we need to jump through hoops to make browserify work with libraries that weren't designed with CMD in mind.

##Using this repo

We need to have node and npm installed.  This is more of a systems configuration thing, but the easiest way to install (without needing to sudo) I felt was to:

 1. Download the node tar.gz binary file from [here](https://nodejs.org/download/) and put it somewhere on your drive (say /home/sriram/node-js/).  Untar and unzip.  This contains both node and npm.
 1. Add the node binary to your PATH - eg in your ~/.bashrc file - 
 
    export PATH=$HOME/software/node-v0.12.7-linux-x64/bin:$PATH
 
 1. Once node npm is installed, you need to instruct it to consider a certain directory as the *lib* which contains all the node modules installed in the system.  Any installation that runs with the 'g' flag will put modules into this folder.  This can be achieved by setting NODE_PATH to the directory where you want all your node modules to go into.
 
1. Install gulp - npm install -g gulp
1. Install bower - npm install -g bower
1. Install dependencies from this repo's package.json - npm install
1. Install bower components - bower install
1. Above steps are a one time thing and will ensure all development dependencies are met.  Some other ways to achieve this could be:
  * Write a git post-hook to run these commands automatically whenever someone git clone's the repo.
  * Write a gulp task to run these
  * Write a init script that will run these commands
1. Run 'gulp serve' to open a 'livereload' server.

 1. There is no concept of virtualenv.  If the module available in the system wide directory doesn't cut it for you, there is an option to install it in your project specific node_modules folder.
  
 1. Frankly, I still don't understand completely npm's module resolution algorithm.  Will have to observe it more closely.
 
#### TODO

I still need to find a way to organize code in userland as 'modules'.  Whether we really need this or we can live with a couple of globals in this application is a call that I need take.
