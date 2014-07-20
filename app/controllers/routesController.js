var routesController = function (server) {

	server.get('/', function (req, res) {

		res.render('home', {
			env: process.env.PORT || "dev"
		});
	});
};

module.exports = routesController;