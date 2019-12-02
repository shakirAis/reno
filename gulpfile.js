"use strict";
const gulp = require('gulp');
const concat = require('gulp-concat');
const browsersync = require('browser-sync').create();
const del = require("del");
const eslint = require("gulp-eslint");
const plumber = require("gulp-plumber");

const { parallel } = require('gulp');

var devMode = false;

var paths = {
	styles: {
		src: 'src/css/**/*.css',
		dest: 'assets/css/'
	},
	scripts: {
		src: 'src/js/**/*.js',
		dest: 'assets/js/'
	},
	images: {
		src: 'src/img/**/*.*',
	  	dest: 'assets/img/'
	}
};

function css() {
	return (
		gulp
		.src(paths.styles.src)
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browsersync.stream())
	)
};

function js() {
	return gulp
		.src(paths.scripts.src)
        .pipe(concat('script.js'))
        .pipe(gulp.dest(paths.scripts.dest))
		.pipe(browsersync.stream())
};

function scriptsLint() {
	return gulp
	  .src([paths.scripts.src, "./gulpfile.js"])
	  .pipe(plumber())
	  .pipe(eslint())
	  .pipe(eslint.format())
	  .pipe(eslint.failAftepaths.scripts.srcrError());
  }

function img() {
	return (
		gulp
		.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browsersync.stream())
	)
};
function browserSync(done) {
	browsersync.init({
	  server: {
		baseDir: "."
	  },
	  port: 3000
	});
	done();
  }
  
// BrowserSync Reload
function browserSyncReload(done) {
	browsersync.reload();
	done();
}

function clean() {
	return del(["./assets"]);
  }

function watchFiles() {
	gulp.watch(paths.styles.src, css);
	gulp.watch(paths.scripts.src, js);
	gulp.watch(paths.scripts.src, gulp.series(scriptsLint, js));
	gulp.watch(paths.images.src, img);
	gulp.watch("./**/*.html", browserSyncReload);
}


// const js_all = gulp.series(scriptsLint, js);
const build = gulp.series(clean, gulp.parallel(css, js, img));
const watch = gulp.parallel(watchFiles, browserSync);
const defaultTask = gulp.parallel(build, watch);

exports.css = css;
exports.js = js;
exports.img = img;
exports.build = build;
exports.watch = watch;
exports.default = defaultTask;