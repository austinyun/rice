var http = require("http"),
    fs = require("fs"),
    router = require("choreographer").router(),
    render = require("./render");

module.exports = function rice() {

    router.get("/", render.home);

    router.get("/robots.txt", render.notFound);

    router.get("/favicon.ico", function(req, res) {
        fs.readFile("public/images/favicon.ico", function(err, icon) {
            if (err) { return render.notFound(req, res, err); }
            res.writeHead(200, { "Content-Type": "image/x-icon"});
            res.end(icon);
        });
    });

    router.get("/public/stylesheets/*", function(req, res, path) {
        fs.readFile("public/stylesheets/" + path, function(err, stylesheet) {
            if (err) { return render.notFound(req, res, err); }
            res.writeHead(200, { "Content-Type": "text/css"});
            res.end(stylesheet);
        });
    });

    router.get("/public/images/*", function(req, res, path) {
        fs.readFile("public/images/" + path, function(err, image) {
            if (err) { return render.notFound(req, res, err); }
            res.end(image);
        });
    });

    router.get("/*", render.article);

    return http.createServer(router);
};
