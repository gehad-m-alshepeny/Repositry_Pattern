const {
    src,
    dest,
    task,
    watch,
    series,
    // parrallel
} = require("gulp");

const minifyJs = require("gulp-minify");
const sass = require('gulp-sass')(require('node-sass')); // must install a sass compiler such as "sass" package for "gulp-sass" to work.
const sourceMaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const autoPrefixer = require("gulp-autoprefixer");
var concat = require('gulp-concat');

/*******************************************
    Settings
*******************************************/

var paths = {
    styles: {
        input: ["./css/vendors/**/*", "./css/sass/main.scss"],
        watchInput: "./css/sass/**/*",
        output: "./css"
    },
    scripts: {
        input: [
            "./js/vendors/jquery-3.5.1.min.js",
            "./js/vendors/popper.min.js",
            "./js/vendors/bootstrap.min.js",
            "./js/vendors/select2.js",
            "./js/vendors/verify-code.js",
            "./js/vendors/intl-tel-input.js",
            "./js/vendors/jquery.dataTables.min.js",
            "./js/vendors/dataTables.select.min.js",
            "./js/vendors/dataTables.responsive.min.js",
            "./js/vendors/dropzone.min.js",
            "./js/vendors/jquery.bootstrap-touchspin.js",
            "./js/vendors/chart.js",
            "./js/vendors/toastr.min.js",
            "./js/vendors/nicescroll.js",
            "./js/vendors/coloris.min.js",
            "./js/vendors/imageUpload.js",
            "./js/pages/**/*"
        ],
        watchInput: "./js/pages/**/*.js",
        output: "./js"
    }
}

/*******************************************
    Gulp tasks
*******************************************/


// Handling style files
function styles() {
    // the initializer / master SCSS file, which will just be a file that imports everything
    return src(paths.styles.input)

        // Getting sourceMaps ready only if in development environment
        .pipe(sourceMaps.init())

        // Compiling SCSS files
        .pipe(sass().on("error", sass.logError))

        // Prefixing all styles to match cross browsers
        .pipe(autoPrefixer({
            cascade: true
        }))

        // the final filename of our combined css file
        .pipe(concat("style.min.css"))
        
        // Minifying our css file/s only if in production environment
        .pipe(cleanCSS())

        // Writing our sourceMaps only if in development environment
        .pipe(sourceMaps.write('/'))

        // Destination for the output
        .pipe(dest(paths.styles.output))
}


// Handling javascript files
function scripts() {
    //this is where our dev JS js are
    return src(paths.scripts.input)

        // This is the filename of the compressed version of our JS
        .pipe(concat("scripts.min.js"))

        // Minifying our js file/s only if in production environment
        // .pipe(minifyJs({
        //     ext: {
        //         src: '.js',
        //         min: '.js'
        //     },
        //     mangle: false,
        //     noSource: true,
        //     ignoreFiles: ['.combo.js', '.min.js']
        // }))

        // Destination for the output
        .pipe(dest(paths.scripts.output))
}


// Main watch function where we are watching files and reloading browser using browser_sync.
function watch_files() {
    watch(paths.styles.watchInput, styles);
    watch(paths.scripts.watchInput, scripts);
}


//  This is our main task when you run "gulp" in terminal
task("default", series(styles, scripts, watch_files));