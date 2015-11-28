var compression = require("compression");
var express = require("express");
var favicon = require("serve-favicon");
var path = require("path");
var paths = {
  favicon: path.join(__dirname, "app", "assets", "favicon.ico"),
  routesController: path.join(__dirname, "app", "controllers", "routesController"),
  staticFiles: path.join(__dirname, "app"),
  views: path.join(__dirname, "app", "views")
};
var routesController = require(paths.routesController);
var server = express();

server.set("views", paths.views);
server.set("view engine", "jade");
server.set("port", process.env.PORT || 3000);

server.use(favicon(paths.favicon));
server.use(express.static(paths.staticFiles));
server.use(compression());

routesController(server);

server.listen(server.get("port"));