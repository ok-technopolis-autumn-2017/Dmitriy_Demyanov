const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const rebaseUrls = require('gulp-css-rebase-urls');


gulp.task('images-clean-dist', () =>
    gulp.src('./public/dist/images', {read: false})
        .pipe(clean())
);

gulp.task('images', ['images-clean-dist'], () =>
    gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./public/dist/images'))
);

gulp.task('images:watch', ['images'],  () =>
    gulp.watch('./src/images/**/*', ['images'])
);

gulp.task('index', () =>
    gulp.src('./index.html')
        .pipe(gulp.dest('./public/'))
);

gulp.task('index:watch', ['index'],  () =>
    gulp.watch('./index.html', ['index'])
);

gulp.task('sass', () =>
    gulp.src('./src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/dist/styles'))
);

gulp.task('sass:watch', ['sass'], () =>
    gulp.watch('./src/styles/**/*.scss', ['sass'])
);


// common
gulp.task('build', ['sass', 'images', 'index']);
gulp.task('default', ['sass:watch', 'images:watch', 'index:watch']);