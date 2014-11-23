/**
 *  MIT License
 *  Copyright of the modifications of Responsively.co
 *
 *  Derivative work of:
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var gulpPlugins = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
'ie >= 10',
'ie_mob >= 10',
'ff >= 30',
'chrome >= 34',
'safari >= 7',
'opera >= 23',
'ios >= 7',
'android >= 4.4',
'bb >= 10'
];

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src(['app/fonts/**'])
  .pipe(gulp.dest('dist/fonts'))
  .pipe(gulpPlugins.size({title: 'fonts'}));
});

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
  .pipe(reload({stream: true, once: true}))
  .pipe(gulpPlugins.jshint())
  .pipe(gulpPlugins.jshint.reporter('jshint-stylish'))
  .pipe(gulpPlugins.if(!browserSync.active, gulpPlugins.jshint.reporter('fail')));
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
  .pipe(gulpPlugins.cache(gulpPlugins.imagemin({
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('dist/images'))
  .pipe(gulpPlugins.size({title: 'images'}));
});

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'app/styles/*.scss',
    'app/styles/**/*.css'
    ])
    .pipe(gulpPlugins.changed('styles', {extension: '.scss'}))
    .pipe(gulpPlugins.rubySass({
      style: 'expanded',
      precision: 10
    })
    .on('error', console.error.bind(console))
  )
  .pipe(gulpPlugins.autoprefixer(AUTOPREFIXER_BROWSERS))
  .pipe(gulp.dest('.tmp/styles'))
  // Concatenate And Minify Styles
  .pipe(gulpPlugins.if('*.css', gulpPlugins.csso()))
  .pipe(gulp.dest('dist/styles'))
  .pipe(gulpPlugins.size({title: 'styles'}));
});

// Scan Your HTML For Assets & Optimize them
gulp.task('html', function () {
  var assets = gulpPlugins.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/**/*.html')
  .pipe(assets)
  // Concatenate And Minify JavaScript
  .pipe(gulpPlugins.if('*.js', gulpPlugins.uglify({preserveComments: 'some'})))
  // Concatenate And Minify Styles
  // In case you are still using useref build blocks
  .pipe(gulpPlugins.if('*.css', gulpPlugins.csso()))
  .pipe(assets.restore())
  .pipe(gulpPlugins.useref())
  // Minify Any HTML
  .pipe(gulpPlugins.if('*.html', gulpPlugins.minifyHtml()))
  // Output Files
  .pipe(gulp.dest('dist'))
  .pipe(gulpPlugins.size({title: 'html'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist', '.sass-cache']));

// Watch Files For Changes & Reload
gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    open: false, // Don't open the browser windows with the url when staring
    server: ['.tmp', 'app']
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['build'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    open: true, // Don't open the browser windows with the url when staring
    server: 'dist'
  });
});

gulp.task('init', function () {
  var directories = ['fonts', 'images', 'scripts', 'style'];
  var appPath = path.join(__dirname, 'app');
  
  console.info(chalk.cyan('Creating scaffolding'));
  try {
    directories.forEach(function (subdirname) {
      fs.mkdirSync(path.join(appPath, subdirname));
    });
  } catch (e) {
   console.error(chalk.red(
      'The project has already been initialized or modified before it, ' +
      'if you want to initialize, start a new one and execute init task before anything'));
    return;
  }
  
   console.info(chalk.cyan('Initialization done!!'));
});

// Build Production Files, the Default Task
gulp.task('build', ['clean'], function (cb) {
  runSequence('styles', ['jshint', 'html', 'images', 'fonts'], cb);
});
