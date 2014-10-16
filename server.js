var express = require('express'),
	stylus = require('stylus'),
	nib = require('nib'),
	favicon = require('serve-favicon');

var server = express();

var routesController = require("./app/controllers/routesController");

server.set('views', __dirname + '/app/views');
server.set('view engine', 'jade');

server.use(favicon(__dirname + '/app/assets/favicon.ico'));

server.use(express.static(__dirname + '/'));

routesController(server);

server.listen(process.env.PORT || 2350);
console.log('Servidor corriendo en http://localhost:2350');