import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import del from 'del';

const distDir = './dist';

gulp.task('default', ['clean', 'build', 'copy']);

gulp.task('clean', () => {
  del(distDir);
});

gulp.task(
  'build',
  () => gulp
    .src(['src/**/*.js'])
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(distDir)),
);

gulp.task(
  'copy',
  () => gulp
    .src(['src/**/*.json'])
    .pipe(gulp.dest('./dist')),
);
