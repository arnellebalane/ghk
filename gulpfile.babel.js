import gulp from 'gulp';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';


gulp.task('javascripts', () => {
    return gulp.src('source/**/*.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('distribution'));
});


gulp.task('build', ['javascripts']);


gulp.task('watch', () => {
    gulp.watch('source/**/*.js', ['javascripts']);
});


gulp.task('default', ['build', 'watch']);
