var async = require("async"),
    http = require("http"),
    fs = require("fs"),
    router = require("choreographer").router(),
    renderer = require("./renderer");

module.exports = function rice() {

  function write404(req, res, err) {
    err && console.log(error);
    res.writeHead(404, { "Content-Type": "text/plain"});
    res.end("Error 404: " + req.url + " not found.");
  }

  router.get("/", function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html"});
    renderer.home(res);
  });

  router.get("/favicon.ico", function(req, res) {
    fs.readFile("public/images/favicon.ico", function(err, icon) {
      if (err) { return write404(req, res, err); }
      console.log("Favicon requested");
      res.writeHead(200, { "Content-Type": "image/x-icon"});
      res.end(icon);
    })
  });

  router.get("/public/stylesheets/*", function(req, res, path) {
    fs.readFile("public/stylesheets/" + path, function(err, stylesheet) {
      if (err) { return write404(req, res, err); }
      res.end(stylesheet);
    });
  });

  router.get("/public/images/*", function(req, res, path) {
    fs.readFile("public/images/" + path, function(err, data) {
      if (err) { return write404(req, res, err); }
      res.end(data);
    });
  });

  router.get("/*", function(req, res, path) {
    renderer.article(path, res);
  });

  return http.createServer(router);
};
