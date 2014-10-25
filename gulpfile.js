/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';

var argv = require('yargs').argv;

var gulp = require('gulp'),
    clean = require("gulp-clean"),
    uglify = require('gulp-uglifyjs'),
    server = require('gulp-express'),
    open = require("gulp-open"),
    sass = require('gulp-sass'),
    flatten = require('gulp-flatten'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-minify-css'),
    processhtml = require('gulp-processhtml'),
    streamify = require('gulp-streamify'),
    unpathify = require('unpathify');

var browserify = require('browserify'),
    reactify = require('reactify'),
    deamdify = require('deamdify'),
    source = require('vinyl-source-stream');

var paths = {
    scripts : ['./client/app.js'],
    html: ['client/index.html'],
    icons: ['resources/icons/favicon.ico'],
    images: ['resources/images/**/*.{png,jpeg,jpg}'],
    scss : ['resources/scss/main.scss'],
    watch: {
        js : ['client/**/*.js'],
        html: ['client/index.html'],
        scss : ['resources/scss/**/*.scss']
    }
};

var env = {
    production : argv.production || false
};

var dest = {
    js : 'build/js',
    html: 'build',
    css: 'build/css',
    icons: 'build/icons',
    images: 'build/images'
};

var appUrl = 'http://localhost:7878';

gulp.task('minify-js', ['build'], function() {
    return gulp.src(dest.js + '/app.js')
        .pipe(uglify('app.min.js'))
        .pipe(gulp.dest(dest.js))
});

gulp.task('minify-css', ['build'], function() {
    return gulp.src(dest.css + '/main.css')
        .pipe(cssmin())
        .pipe(rename(function(path){
            path.basename += '.min';
            path.extension += '.css'
        }))
        .pipe(gulp.dest(dest.css))
});

gulp.task('process-html', ['build'], function (cb) {
    gulp.src(dest.html + '/index.html', {read: false})
        .pipe(clean({force: true}));
    gulp.src(paths.html)
        .pipe(processhtml('index.html'))
        .pipe(gulp.dest(dest.html));
    cb();
});

gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest(dest.css));
});

gulp.task('clean', function() {
    return gulp.src([dest.html], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('copy', function(cb) {
    gulp.src(paths.icons)
        .pipe(gulp.dest(dest.icons));
    gulp.src(paths.images)
        .pipe(gulp.dest(dest.images));
    cb();
});

gulp.task('copy-html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(dest.html));
});

gulp.task('scripts', function() {
    // Main entry point
    return browserify(paths.scripts, {
        transform: [
            ['reactify', {everything : true}],
            'deamdify'
        ],
        insertGlobals : false,
        debug : !env.production
    })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(dest.js))
});

gulp.task('server', ['build'], function () {
    return server.run({
        file: 'server/server.js'
    });
});

gulp.task("open", ['server'], function(){
    return gulp.src("./build/index.html")
        .pipe(open("", {app: "chrome", url: appUrl}));
});

// Rerun the task when a file changes
gulp.task('watch', ['build'], function(cb) {
    gulp.watch(paths.watch.js, ['scripts']);
    gulp.watch(paths.watch.html, ['copy']);
    gulp.watch(paths.watch.scss, ['sass', 'copy']);
    cb();
});

gulp.task('build', ['sass', 'scripts', 'copy']);

// The default task
gulp.task('default', ['build', 'copy-html', 'watch', 'server', 'open']);

// Configure production target
gulp.task('minify', ['minify-js', 'minify-css', 'process-html']);
