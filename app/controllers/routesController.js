var routesController = function (server) {
  server.get("/", function (req, res) {
    res.render("home");
  });
};

module.exports = routesController;