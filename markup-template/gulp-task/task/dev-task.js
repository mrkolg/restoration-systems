module.exports = function() {

	// dev style
	$.gulp.task("cssDev", function() {
		return $.gulp.src($.config.pathVar.path.src.styleDev)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gp.sourcemaps.init({loadMaps: true}))
			.pipe($.gp.sass({outputStyle: 'expanded'}))
			.pipe($.gp.sourcemaps.write('./sourcemaps'))
			.pipe($.gulp.dest($.config.pathVar.path.build.css))
	})

	// dev js
	$.gulp.task("jsDev", function() {
		return $.gulp.src($.config.pathVar.path.src.jsDev)
			.pipe($.gp.plumber({ errorHandler: $.gp.notify.onError("Error: <%= error.message %>") }))
			.pipe($.gp.rigger())
			.pipe($.gulp.dest($.config.pathVar.path.build.js))
	})


	// dev watch task
	$.gulp.task("watchDev", function() {
		$.gulp.watch($.config.pathVar.path.watch.dev, $.gulp.series(
			$.gulp.parallel("cssDev", "jsDev"),
			$.bsr
		))
	})

	// dev build task
	$.gulp.task('buildDev', $.gulp.series($.gulp.parallel("cssDev", "jsDev"))) //**, "watchDev"**//

};