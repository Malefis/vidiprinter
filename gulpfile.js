const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const uglifyCSS = require('gulp-uglifycss');
const uglifyJS = require('gulp-uglify-es').default;
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin')
const autoPrefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('serve', () => {
    browserSync.init({
        server: "./dist",
        notify: false
    });

    gulp.watch("src/scss/main.scss", ['sass']);
    gulp.watch("src/js/**/*.js", ['scripts']);
    gulp.watch("src/*.html", ['minifyHTML']);
    gulp.watch("dist/*.html").on('change', browserSync.reload)
    gulp.watch("dist/js/**/*.js").on('change', browserSync.reload)
    gulp.watch("dist/css/**/*.css").on('change', browserSync.reload)

});

gulp.task('sass', () => {
    return gulp.src("src/scss/main.scss")
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(rename("style.css"))
      .pipe(uglifyCSS({
        "maxLineLen": 80,
        "uglyComments": true
      }))
      .pipe(autoPrefixer())
      .pipe(sourcemaps.write("./maps"))
      .pipe(gulp.dest('./dist/css/'))
      .pipe(browserSync.stream());
  });
gulp.task("scripts", () => {
    return gulp.src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(uglifyJS(/* options */))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("./dist/js/"))
});
gulp.task('minifyHTML', () =>{
    return gulp.src('src/*html')
      .pipe(htmlmin({
          collapseWhitespace: true
      }))
      .pipe(gulp.dest('dist'));
});

gulp.task('default', ['minifyHTML','sass','serve']);

