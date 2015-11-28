var browserSync = require("browser-sync").create();
var gulp = require("gulp");
var gulpLoadPlugins = require("gulp-load-plugins");
var path = require("path");
var plugins = gulpLoadPlugins();
var appDir = path.join(__dirname, "app");

var config = {
    browserSyncReloadDelay: 500,
    cssFiles: [
        path.join(appDir, "css", "**", "*.*")
    ],
    filesToWatch: [
      path.join(appDir, "controllers", "**", "*.js"),
      path.join(appDir, "css", "**", "*.*"),
      path.join(appDir, "js", "**", "*.js"),
      path.join(appDir, "views", "**", "*.jade")
    ],
    publicDir: path.join(appDir, "public"),
    publicDirFiles: path.join(appDir, "public", "**", "*.*"),
    serverFiles: [
        "server.js"
    ],
    stylusMainFile: path.join(appDir, "css", "styles.styl")
};

gulp.task("build:css", ["clean"], function () {

    return gulp.src(config.stylusMainFile)
        .pipe(plugins.stylus())
        .pipe(plugins.autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
        .pipe(plugins.rename({suffix: ".min"}))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(config.publicDir));
});

gulp.task("clean", function() {
    return gulp.src(config.publicDirFiles, {read: false})
        .pipe(plugins.clean());
});

gulp.task("nodemon", function (cb) {

    var called = false;
    var nodemon = plugins.nodemon({
        // starting point of our server/application
        script: config.serverFiles,
        // watch server file(s) that require server restart on change
        watch: config.serverFiles
    });

    nodemon.on("start", function onStart() {

        // ensure start only got called once
        if (!called) {

            called = true;
            cb();
        }
    });

    nodemon.on("restart", function onRestart() {

        // reload connected browsers after a slight delay
        setTimeout(function reload() {

            browserSync.reload();
        }, config.browserSyncReloadDelay);
    });

    nodemon.once("exit", function () {

      console.log("Exiting the process");
      process.exit();
    });

    return nodemon;
});

gulp.task("server", ["nodemon", "watch"], function () {

    var port = process.env.PORT || 3000;

    browserSync.init({
        // Browsersync can watch your files as you work
        // Changes you make will either be injected into the page (CSS & images)
        // or will cause all browsers to do a full-page refresh
        files: config.filesToWatch,

        // Don"t try to inject, just do a page refresh
        injectChanges: false,

        // Decide which URL to open automatically when Browsersync starts
        // Defaults to "local" if none set
        // Can be true, local, external, ui, ui-external, tunnel or false
        open: false,

        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 4000,

        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: "http://localhost:" + port,

        // Reload each browser when Browsersync is restarted
        reloadOnRestart: true,
    });
});

gulp.task("watch", function () {

    gulp.watch(config.cssFiles, ["build:css"], browserSync.reload);
});