var browserSync = require("browser-sync").create();
var del = require("del");
var gulp = require("gulp");
var gulpLoadPlugins = require("gulp-load-plugins");
var path = require("path");

var plugins = gulpLoadPlugins();
var appDir = path.join(__dirname, "app");

var config = {
  browserSync: {
    filesToWatch: [
      path.join(appDir, "css", "**", "*.styl"),
      path.join(appDir, "js", "**", "*.js"),
      path.join(appDir, "views", "**", "*.jade")
    ],
    reloadDelay: 1000
  },
  jade: {
    filesToWatch: path.join(appDir, "views", "*.jade"),
    indexHTML: path.join(appDir, "index.html"),
    mainFile: path.join(appDir, "views", "home.jade")
  },
  nodemon: {
    filesToWatch: [
      path.join("server.js"),
      path.join(appDir, "controllers", "**", "*.js")
    ],
    serverStartupFile: "server.js"
  },
  publicDir: path.join(appDir, "public"),
  publicDirFiles: path.join(appDir, "public", "**", "*.*"),
  stylusMainFile: path.join(appDir, "css", "styles.styl")
};

function restartClient () {
  setTimeout(function () {
    browserSync.reload();
  }, config.browserSync.reloadDelay);
}

gulp.task("build", ["build:html", "build:css"]);

gulp.task("build:css", ["clean:css"], function () {
  return gulp.src(config.stylusMainFile)
    .pipe(plugins.stylus())
    .pipe(plugins.autoprefixer("last 2 version"))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({suffix: ".min"}))
    .pipe(gulp.dest(config.publicDir));
});

gulp.task("build:html", ["clean:html"], function () {
  return gulp.src(config.jade.mainFile)
    .pipe(plugins.jade({}))
    .pipe(plugins.rename("index.html"))
    .pipe(gulp.dest(appDir));
});

gulp.task("clean:css", function() {
  return del(config.publicDirFiles);
});

gulp.task("clean:html", function() {
  return del(config.jade.indexHTML);
});

gulp.task("nodemon", function (cb) {
  var called = false;
  var nodemon = plugins.nodemon({
    script: config.nodemon.serverStartupFile,
    watch: config.nodemon.filesToWatch
  });

  nodemon.on("start", function onStart() {
    if (!called) {
      called = true;
      cb();
    }
  });

  nodemon.on("restart", restartClient);

  return nodemon;
});

gulp.task("server", ["nodemon", "watch"], function () {
  var port = process.env.PORT || 3000;

  browserSync.init({
    // Browsersync can watch your files as you work
    // Changes you make will either be injected into the page (CSS & images)
    // or will cause all browsers to do a full-page refresh
    files: config.browserSync.filesToWatch,

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
    reloadOnRestart: true
  });
});

gulp.task("watch", function () {
  gulp.watch(config.jade.filesToWatch, ["build:html"], restartClient);
  gulp.watch(config.stylusMainFile, ["build:css"], restartClient);
});