var routesController = function (server) {

	server.get('/', function (req, res) {

		res.render('home', {
			env: process.env.PORT || 3000,
			title: "Ariadna"
		});
	});
};

module.exports = routesController;