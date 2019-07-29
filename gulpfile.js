'use strict';

var fs = require('fs');

const gulp        = require("gulp");
const browserSync = require("browser-sync").create();
const sass        = require("gulp-sass");
const babel       = require("gulp-babel");

//Set your paths here
var paths = {
  html: {
    src: "*.html",
    dist: null
  },
  scss: {
    src: "*.scss",
    dist: "./"
  },
  js: {
    src: "src/*.js",
    dist: "dist"
  }
};

function css(){
  return gulp.src(paths.scss.src)
  .pipe(sass())
  .pipe(gulp.dest(paths.scss.dist))
  .pipe(browserSync.stream());
}

function js(){
  return gulp.src(paths.js.src)
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(gulp.dest(paths.js.dist))
  .pipe(browserSync.stream());
}

function sync(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("*.scss", css);
  gulp.watch("src/*.js", js);
  gulp.watch(paths.html.src).on('change', browserSync.reload);
}

function defaultTask(){
  sync();
}

exports.default = defaultTask;