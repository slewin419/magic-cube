"use strict";

const gulp        = require("gulp");
const browsersync = require("browser-sync").create();
const sass        = require("gulp-sass");
const babel       = require("gulp-babel");

function serve(done){
  browsersync.init({
    server: {
      baseDir: "./"
    }
  });
  done();
}

function browserSyncReload(){
  browsersync.reload();
}

function css(){
  return gulp.src("index.scss")
    .pipe(sass())
    .pipe(gulp.dest("./"))
    .pipe(browsersync.stream());
}

function js(){
  return gulp.src("src/index.js")
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch("index.html").on('change', browserSyncReload);
  gulp.watch("index.scss", css, browserSyncReload);
  gulp.watch("src/index.js", js, browserSyncReload);
}

const build = gulp.series(serve, css, js, watchFiles);

exports.default = build;
