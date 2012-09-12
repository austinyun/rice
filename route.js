var router = require("router")(),
    render = require("./render"),
    serve = require("./serve"),
    e = require("./error");

//TODO: There must be some way to refactor all of these "route" functions
function routeHome(req, res) {
    render.home(function(err, data) {
        if (err) { return e.dispatch(req, res, err); }
        res.setHeader("Content-Type", "text/html");
        serve.serve(req, res, data);
    });
}

function routeArticle(req, res) {
    render.article(req, res, function(err, data) {
        if (err) { return e.dispatch(req, res, err); }
        res.setHeader("Content-Type", "text/html");
        serve.serve(req, res, data);
    });
}

function routeJSON(req, res) {
    render.json(req, res, function(err, data) {
        if (err) { return e.dispatch(req, res, err); }
        res.setHeader("Content-Type", "application/json");
        serve.serve(req, res, data);
    });
}

function routeMarkdown(req, res) {
    var markdownError = new e.Error501("Markdown requests unimplemented.");
    e.dispatch(req, res, markdownError);
}

module.exports = function() {
    router.get("/", routeHome);
    router.get("/robots.txt", serve.robots);
    router.get("/favicon.ico", serve.favicon);
    router.get("/public/*", serve.staticFile);
    router.get("/{article}.json", routeJSON);
    router.get("/{article}.markdown", routeMarkdown);
    router.get("/{article}", routeArticle);

    return router;
};
