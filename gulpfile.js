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
  gulp.watch("index.scss", css);
  //gulp.watch("src/index.js", js);

  gulp.watch("index.html").on('change', browsersync.reload);
  //gulp.watch("index.scss").on('change', browsersync.reload);
  //gulp.watch("src/index.js").on('change', browsersync.reload);
}

const build = gulp.series(css, serve, watchFiles);

exports.default = build;