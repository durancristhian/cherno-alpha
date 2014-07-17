var express = require('express'),
	stylus = require('stylus'),
	nib = require('nib'),
	favicon = require('serve-favicon');

var server = express();

var routesController = require("./app/controllers/routesController");

server.set('views', __dirname + '/app/views');
server.set('view engine', 'jade');

// Favicon
server.use(favicon(__dirname + '/app/assets/favicon.ico'));

// Archivos estáticos
server.use(express.static(__dirname + '/app'));

// Módulo que contiene las rutas
routesController(server);

// Se corre el servidor
server.listen(process.env.PORT || 3000);

// Notificación en la consola
console.log('Servidor corriendo en http://localhost:3000');