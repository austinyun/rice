var http = require("http"),
    fs = require("fs"),
    router = require("choreographer").router(),
    renderer = require("./renderer");

function write404(req, res, err) {
  if (err) { console.log(err); }
  res.writeHead(404, { "Content-Type": "text/plain"});
  res.end("Error 404: " + req.url + " not found.");
}

module.exports = function rice() {

  router.get("/", function(req, res) {
    renderer.home(res);
  });

  router.get("/favicon.ico", function(req, res) {
    fs.readFile("public/images/favicon.ico", function(err, icon) {
      if (err) { return write404(req, res, err); }
      res.writeHead(200, { "Content-Type": "image/x-icon"});
      res.end(icon);
    });
  });

  router.get("/robots.txt", function(req, res) {
    return write404(req, res);
  });

  router.get("/public/stylesheets/*", function(req, res, path) {
    fs.readFile("public/stylesheets/" + path, function(err, stylesheet) {
      if (err) { return write404(req, res, err); }
      res.writeHead(200, { "Content-Type": "text/css"})
      res.end(stylesheet);
    });
  });

  router.get("/public/images/*", function(req, res, path) {
    fs.readFile("public/images/" + path, function(err, image) {
      if (err) { return write404(req, res, err); }
      res.end(image);
    });
  });

  router.get("/*", function(req, res, path) {
    renderer.article(path, res, function(err) {
      write404(req, res, err);
    });
  });

  return http.createServer(router);
};
