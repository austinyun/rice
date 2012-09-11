var router = require("router")(),
    render = require("./render"),
    serve = require("./serve");

function routeArticle(req, res) {
    render.article(req, res, function(data) {
        serve.serve(req, res, data);
    });
}

function routeJSON(req, res) {
    render.json(req, res, function(data) {
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
    router.get("/{article}.json", routeJSON);
    router.get("/{article}", routeArticle);

    return router;
};
