var gulp = require('gulp');
var webpackTasks = require('./gulp/webpack-tasks');

gulp.task('frontend-build', function(done) {
	webpackTasks.buildFrontend(done);
});

gulp.task('frontend-watch', function(done) {
	webpackTasks.watchFrontend(done);
});

gulp.task('backend-build', function(done) {
	webpackTasks.buildBackend(done);
});

gulp.task('backend-watch', function(done) {
	webpackTasks.watchBackend(done);
})

/**
 * Serve with frontend hot reloading
 */
gulp.task('serve', function(done) {
  webpackTasks.serve(done);
});

/**
 * Serve without hot reloading
 */
gulp.task('serve:freeze', function(done) {
  webpackTasks.watchBackend() && webpackTasks.watchFrontend();
});

gulp.task('build', function(done) {
  webpackTasks.buildBackend() && webpackTasks.buildFrontend();
});
