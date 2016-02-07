import gulp from 'gulp';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';


const paths = {
    javascripts: [
        'source/**/*.js',
        'source/templates/*'
    ]
};


gulp.task('javascripts', () => {
    return gulp.src(paths.javascripts, { base: 'source' })
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('distribution'));
});


gulp.task('build', ['javascripts']);


gulp.task('watch', () => {
    gulp.watch(paths.javascripts, ['javascripts']);
});


gulp.task('default', ['build', 'watch']);
