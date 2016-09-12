 'use strict';

 // Imports
import gulp from 'gulp';
import vulcanize from 'gulp-vulcanize';
import crisper from 'gulp-crisper';
import jshint from 'gulp-jshint';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';

gulp.task("default", function () {
    return gulp.src("app/scripts/app.js")
        .pipe(gulp.dest("dist/scripts"));
});

gulp.task('vulcanize', function () {
  return gulp.src('app/elements/elements.html')
     .pipe(vulcanize({
             abspath: '',
             excludes: [],
             stripExcludes: false,
             inlineScripts: true,
             inlineCss: true
         }))
     .pipe(crisper())
     .pipe(gulp.dest('dist/elements'));
 });

 /**
  * Task to run local environment
  */
 gulp.task('serve', function () {
     browserSync({
         port: 5000,
         notify: false,
         logPrefix: 'PA',
         snippetOptions: {
             rule: {
                 match: '<span id="browser-sync-binding"></span>',
                 fn: function (snippet) {
                     return snippet;
                 }
             }
         },
         server: {
             baseDir: ['.tmp', 'app'],
             middleware: [ historyApiFallback() ],
             routes: {
                 '/bower_components': 'bower_components'
             }
         }
     });
     // TODO ADD watch
 });
