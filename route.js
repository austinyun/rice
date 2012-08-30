var router = require("router")(),
    render = require("./render"),
    serve = require("./serve");

// Gets a Node request object
// Examines the URI asked for
// Dispatches

function routeArticle(req, res) {
    render.article(req, res, function(data) {
        serve.serve(req, res, data);
    });
}

function routeHome(req, res) {
    render.home(function(data) {
        serve.serve(req, res, data);
    });
}

module.exports = function() {
    router.get("/", routeHome);
    router.get("/robots.txt", serve.robots);
    router.get("/favicon.ico", serve.favicon);
    router.get("/public/*", serve.staticFile);
    router.get("/{article}", routeArticle);

    return router;
};
