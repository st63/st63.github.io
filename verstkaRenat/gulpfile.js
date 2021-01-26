const { src, dest, parallel, series, watch } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const richtypo = require('posthtml-richtypo');
const expressions = require('posthtml-expressions');
const removeAttributes = require('posthtml-remove-attributes');
const { quotes, sectionSigns, shortWords } = require('richtypo-rules-ru');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;

function scripts() {
  return src('src/script.js')
    .pipe(uglify())
    .pipe(dest('dist/'))
    .pipe(browserSync.stream())
}

function imgProcess() {
  return src('src/img/*.svg')
    .pipe(imagemin())
    .pipe(dest('dist/img/'))
}

function vendorCopy() {
  return src('src/vendor/**/*.*')
    .pipe(dest('dist/vendor/'));
}

function browser() {
  browserSync.init({
    server: { baseDir: 'dist/' },
    notify: false,
    online: true
  })
}

function styles() {
  return src('src/style.scss')
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss(({ level: { 1: { specialComments: 0 } } })))
    .pipe(dest('dist/css/'))
    .pipe(browserSync.stream())
}

function htmlProcess() {
  return src('src/pages/**/*.html')
    .pipe(
      posthtml([
        include(),
        expressions(),
        richtypo({
          attribute: 'data-typo',
          rules: [quotes, sectionSigns, shortWords],
        }),
        removeAttributes([
          'data-typo',
        ]),
      ]),
    )
    .pipe(dest('dist'));
}

function startWatch() {
  watch('src/**/*.js', series(scripts, browserSync.reload));
  watch('src/**/*.scss', series(styles, browserSync.reload));
  watch('src/pages/**/*.html', series(htmlProcess, browserSync.reload));
  watch('src/components/**/*.html', series(htmlProcess, browserSync.reload));
}

exports.browserSync = browser;
exports.scripts = scripts;
exports.styles = styles;
exports.html = htmlProcess;
exports.img = imgProcess;
exports.vendor = vendorCopy;
exports.start = parallel(styles, scripts, htmlProcess, imgProcess, vendorCopy, browser, startWatch);
