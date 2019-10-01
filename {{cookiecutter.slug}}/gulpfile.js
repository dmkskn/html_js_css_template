'use strict';

const { series, parallel, src, dest, lastRun, watch } = require('gulp');
const newer = require('gulp-newer');
const postcss = require("gulp-postcss");
const del = require('del');


const postcssPlugins = [
  require("postcss-import"),
  require("postcss-url"),
  require("postcss-css-variables"),
  require("autoprefixer"),
  require("postcss-csso"),
]


const paths = {
  style: {
    src: 'src/assets/styles/style.css',
    dest: 'dest/assets/styles/'
  },
  scripts: {
    src: 'src/assets/scripts/**/*.js',
    dest: 'dest/assets/scripts/'
  },
  media: {
    src: 'src/assets/media/**/*.*',
    dest: 'dest/assets/media/'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dest/'
  }
};



function styles() {
  return src(paths.style.src)
    .pipe(postcss(postcssPlugins))
    .pipe(dest(paths.style.dest));
};


function media() {
  return src(paths.media.src, { since: lastRun("media") })
    .pipe(newer(paths.media.dest))
    .pipe(dest(paths.media.dest));
};


function scripts() {
  return src(paths.scripts.src)
    .pipe(dest(paths.scripts.dest));
};


function html() {
  return src(paths.html.src)
    .pipe(dest(paths.html.dest));
};


function clean() {
  return del("dest");
};



exports.media = styles;
exports.media = media;
exports.scripts = scripts;
exports.html = html;
exports.clean = clean;
exports.assets = series(styles, media, scripts);
exports.build = series(clean, parallel(exports.assets, html));