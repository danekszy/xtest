xtest
==================

xtest is a Front-end assignment project coded while I was taking part in a recruitment process.

## Development process notes
- CSS3 Pie not yet implemented
- Had to modify grunt task to accomodate package update (PR to be expected)
- Used image for intro header, since project scope is really narrow (bigger tasks would be better off with webfont)
- Allowed myself to go with dashed border instead of dotted separators (better performance, while not significantly different from design)
- Removed Modernizr from build since there's not much we can progressively enhance given the task and the scope of the project (no need for img fallbacks in this browser support reqs.)
- Code probably could be organized better and make better use of helpers, since it was hard for me to make good, informed decisions with such a small task

## Table of contents

- [Prerequisites](#prerequisites)
    - [Node.js](#1-nodejs)
    - [Grunt](#2-grunt)
    - [Bower](#3-bower)
- [Usage](#usage)
    - [Project Structure](#1-project-structure)
    - [Getting Started](#2-getting-started)
    - [Development](#3-development)
    - [WordPress Development](#4-wordpress-development)
- [Tips & Tricks](#tips--tricks)
    - [Working with Files in the dist Folder](#working-with-files-in-the-dist-folder)
    - [Writing Syles](#writing-styles)
    - [LibSass Notices](#libsass-notices)
    - [Adding 3rd-party Dependency via Bower](#adding-3rd-party-dependency-via-bower)
    - [Using Sprites](#using-sprites)
    - [Automatic SVG Fallbacks](#automatic-svg-fallbacks)

## Prerequisites

The following software needs to be installed if you want to use develop & build project created with XH Generator. These installations need to be done just once so you can skip this section if you have the software already installed.

(Note: As a command line replacement at Windows we recommend [ConEmu](https://code.google.com/p/conemu-maximus5/).)

### 1) Node.js

Install [Node.js](http://nodejs.org/) so you can work with `npm`, Node package manager.

### 2) Grunt
Then install [Grunt](http://gruntjs.com/)'s command line interface (CLI) globally:

```
npm install -g grunt-cli
```

### 3) Bower
For managing certain dependencies like Bootstrap, you will need [Bower](http://bower.io/), another package manager. Install it from the command line too:

```
npm install -g bower
```

Also make sure that [git](http://git-scm.com/) is installed as some bower packages require it to be fetched and installed. On Windows ensure that Git is installed in your PATH by selecting *Run Git from the Windows Command Prompt* option during installation (check this [screenshot](http://wiki.team-mediaportal.com/@api/deki/files/3808/=Git_Setup_-_Run_from_Windows_Command_Prompt.PNG)).



## Usage

### 1) Project Structure

The meaning of files and folders in generated project structure are as follows:

- **dist** - production / preview files are automatically generated here, this is where you check your work in a browser.
- **node_modules** - Node.js modules for various Grunt tasks, usually you don’t have to do anything about this folder
- **src** - source files, development is done here
   - **bower_components** - 3rd party libraries managed via [Bower](http://bower.io/)
   - **designs** - place to store design previews, sprite source files & so on
   - **grunt** - atomic grunt tasks configuration
   - **includes** - HTML partials like `head.html`, `scripts.html`, etc.
   - **scss** - SCSS files
     - `main.scss` - main file where other stylesheets are imported
     - **common** - common styles for most of pages
     - **components** - styles for page modules/components; this is where most of your styles will go
     - **setup** - various configurations and preprocesor helpers
     - **vendor** - styles overwriting/replacing library ones
   - **js**
     - `main.js` is a main JS file in project
   - `home.html`, etc. - HTML files composed from HTML partials
- `index.html` - project index with project pages listed
- `Gruntfile.js` - [Grunt](http://gruntjs.com/) file with various automation tasks defined in it
- `bower.json` - Bower dependencies in the project
- `package.json` - npm packages dependencies
- `.yo-rc.json` - Yeoman generator configuration file
- `.bowerrc` - configuration file for Bower
- `.editorconfig` - [EditorConfig](http://editorconfig.org/) configuration file to achieve consistent coding style
- `.gitattributes` - [Git](http://git-scm.com/) configuration file to force Unix line ending in all text files
- `.gitignore` - default Git ignore files and folders
- `.jshitrc` - [JSHint](http://www.jshint.com/) configuration


On a typical project, you will work in `src` folder and check your work in `dist` folder so you don’t have to touch other files. For more info about working with styles structure go to [Writing styles section](#writing-styles).

### 2) Getting Started

If you are joining an existing project which was set up using XH Generator (assuming that you have all [prerequisites](#prerequisites) installed), all you need to do is to clone the existing repository and install Bower and npm dependencies.

Let's imagine you have cloned/unpacked xtest project into `xtest` directory.

First, change the directory to your cloned project:

```
cd xtest
```

After that install Bower depedencies:

```
bower install
```

Then install npm dependencies:

```
npm install
```

Finally, (re)generate preview files in the dist folders:

```
grunt build
```

If everything went ok, the preview files will be generated and you will be able to check your work in the `dist` folder.

Now the project is set up and you can continue like described in the [Development](#3-development) section.

### 3) Development

When you have the basic setup done, you can start development. To re-compile HTML / SCSS file in real time you can use default task. Type

```
grunt
```

and this will start a task that will watch for changes in files and recompile them as needed. Additionaly, development server will be started and BrowserSync scripts injected.

To rebuild the whole project, use the grunt build task again

```
grunt build
```

To validate HTML, use the following task

```
grunt validate
```




## Tips & Tricks

### Working with Files in the `dist` Folder

In general, it’s not recommended that you work directly with files in the `dist`. The files in `dist` folder are automatically generated from the source files in `src` folder and by default `dist` folder is ignored in version control system.

HTML and CSS files are prettified for consistent formatting and a table of contents from imported SCSS stylesheets is generated at the beginning of `main.css` for better overview.

### Writing Styles

The following source files are generated in `src/scss` folders:

- `main.scss` - main file where other stylesheets are imported
- **common** - common styles for most of pages
  - `_layout.scss` - main page structure
  - `_utilites.scss` - utility classes (image replacement, hide, etc.)
- **components** - styles for page modules/components; this is where most of your styles will go
- **setup** - various configurations and preprocesor helpers
  - `_variables.scss` - variables file
  - `_mixins.scss` - mixins file
  - `_sprites.scss` - sprite mixin
  - `_sprites.scss.mustache` - template file for generating actual sprites code
- **vendor** - styles overwriting/replacing library ones

The following approach is recommended when creating styles:

1. Use `main.scss` only for importing other stylesheets. Do not write styles directly in this file!
2. Use variables and mixins files to store your variables and mixins.
3. Depending on your preferences for styles organization, you can organize them according modules & components (recommended, use **components** folder), or pages. A good practice is to name file the same as main class used for that component, for example if you create a component representing an article with `.article` as a main CSS class followed by `.article-title`, `.article-meta`, etc. and with `.article--featured` variant that will have slightly different color scheme, you will do everyone a favour by placing it in `scss/components/_article.scss` file instead of ~~`scss/components/_text.scss`~~.
4. If you find yourself overwriting/replacing default library styles, put them into **vendor** folder. A good examples of that are replacing library custom select or lightbox styles with your own or overwriting some Bootstrap styles that were not configurable.
5. Comment [main sections and subsections](https://github.com/xhtmlized/css-coding-standards#comments) appropriately.
6. By default [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) is enabled in project, which mean that you don't need to write prefixes for the standard CSS3 properties. It uses [Can I Use](http://caniuse.com/) database. However, please note that some popular properties (like `-webkit-appearance` or `-webkit-font-smoothing` are not a part of standard and need to be written with prefixes by you).

### LibSass notices

LibSass is much faster than Ruby Sass, however some features of Ruby Sass [may not yet be ported there or a bit faulty](http://benfrain.com/libsass-lightning-fast-sass-compiler-ready-prime-time/). Sometimes project requiremens force you to choose Ruby version over LibSass as some features of the libraries you would like to use may not be available in LibSass (like automatic sprite generation from [Compass](http://compass-style.org/)).

You can browse or add LibSass issues at [LibSass GitHub](https://github.com/sass/libsass/issues) page.

### Adding 3rd-party Dependency via Bower

Let’s say you want to add [Colorbox](http://www.jacklmoore.com/colorbox/) to your project. The following example shows how you can add it as a Bower package and merge its JS file into common `plugins.min.js` file.

1. First, install it via Bower

    ```
    bower install jquery-colorbox --save-dev
    ```

2. Then link it in `src/includes/scripts.html`. This will ensure that the library will be added to `plugins.min.js` file

    ```html
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/jquery.min.js">\x3C/script>')</script>
    <!-- build:js js/plugins.min.js -->
    <script src="bower_components/jquery-colorbox/jquery.colorbox-min.js"></script>
    <!-- endbuild -->
    <script src="js/main.js"></script>
    ```

3. Go to `src/bower_components/jquery-colorbox` and copy images from `example1/images` folder to `src/img/colorbox` folder.

4. Get `example1/colorbox.css` from the same dir, rename it to `_colorbox.scss`, store it in `src/scss/vendor` folder and adjust to your needs if needed.

5. Import `_colorbox.scss` in `main.scss`

    ```css
    @import "vendor/colorbox";
    ```

6. Replace all instances of `images/` in `_colorbox.scss` with `../img/colorbox/`

7. Run the `grunt build` task or `grunt` task

8. Now you can use Colorbox in your HTML files and initiate it from `src/js/main.js`

### Using Sprites

When relevant option is selected during setup, tasks for automatic sprite generation are added. Out-of-the-box only PNG files are supported, however if for some reason other source files are needed (like JPGs and GIFs) it is possible to add them (it will require installing some additional dependencies tough).

Sprites generation is accomplished using [grunt-spritesmith](https://github.com/Ensighten/grunt-spritesmith). Detailed documentation regarding available options and generation engines is described there.

In the XH Generator default configuration you are expected to put yor files in `src/img/sprites/1x/` directory for normal-density screens and `src/img/sprites/2x/` for retina & similar ones. Filename of the image should be the same - let's say `home.png`. When task finishes running (it may take some time, which is why sprite generation is optional feature), you will be able to use sprite helper mixins in your code. The one you're most interested in can be found in `src/scss/setup/_sprites.scss` - `sprite-retina` mixin. It takes two arguments (for now, we're planning to further simplify that) - variable that holds normal sprite data & variable that holds retina sprite data. Those variables were generated for you when task ran. To make it clearer, using SCSS for our example home icon you would do:

```css
.my-home-icon {
    @include sprite-retina($sprite-1x-home, $sprite-2x-home);
}
```

The exact variable names can be found in `src/scss/setup/_sprites@N.scss` files if you need to check them.

**Important!** Currently you need to provide **both** files (nomal & retina). If you do not, the output sprite images will differ and as a result generated `background-position` values will be incorrect.

### Automatic SVG Fallbacks

Vector graphics is increasingly more popular in web development due to its prefect look no matter the scale. As such you will probably find yourself using SVG files or icon fonts more and more often. However, not all browsers support SVGs out of the box, so fallbacks are needed. Currently XH Generator supports automatic optimization of SVG files (along with various other raster image formats) and PNG fallbacks creation. The caveat for correct automatic fallbacks is that SVG viewport needs to have proper size (PNG file will have the same dimensions). Also, if something seems off you can [play with optimization settings](https://github.com/sindresorhus/grunt-svgmin#available-optionsplugins) in `grunt/contrib-imagemin.js` task.
