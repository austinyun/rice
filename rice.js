var http = require("http"),
    lactate = require("lactate"),
    router = require("router")(),
    render = require("./render");

module.exports = function rice() {

    router.get("/", render.home);

    router.get("/robots.txt", render.notFound);

    router.get("/favicon.ico", function(req, res) {
        lactate.serve("public/images/favicon.ico", req, res);
    });

    router.get("/public/*", lactate.file);

    router.get("/{article}", render.article);

    return http.createServer(router);
};
