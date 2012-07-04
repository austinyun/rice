var http = require("http"),
    fs = require("fs"),
    git = require("git-fs"),
    dot = require("dot"),
    router = require("choreographer").router(),
    parse = require("./parse");

module.exports = function rice() {

  git(process.cwd());
  console.log("Initialized git at " + process.cwd());

  var write404 = function(req, res, err) {
    err && console.log(error);
    res.writeHead(404, { "Content-Type": "text/plain"});
    res.end("Error 404: " + req.url + " not found.");
  },
      indexTemplate,
      articleTemplate;

  router.get("/", function(req, res) {
    if (!indexTemplate) {
      fs.readFile("templates/index.dot", function(err, data) {
        if (err) { return write404(req, res, err); }
        indexTemplate = dot.template(data);
      });
    }
    res.writeHead(200, { "Content-Type": "text/html"});
    res.end(indexTemplate(testArticleList));
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
    if (!articleTemplate) {
      console.log("Reading article template.");
      fs.readFile("templates/article.dot", function(err, data) {
        articleTemplate = dot.template(data);
      });
    }
    fs.readFile("posts/" + path + ".md", "utf-8", function(err, data) {
      if (err) { return write404(req, res, err); }
      console.log("Var serving " + path);
      res.end(articleTemplate(parse(data)));
    })
  });

  return http.createServer(router);
};
