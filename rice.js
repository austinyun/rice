var http = require("http"),
    fs = require("fs"),
    git = require("git-fs"),
    jade = require("jade"),
    router = require("choreographer").router();

module.exports = function rice() {

  // Initialize git-fs with the cwd
  git(process.cwd());

  router.get("/", function(req, res) {
    git.getHead( function(err, head) {
      if (err) { throw err; }
      git.readFile(head, "templates/index.jade", function(err, data) {
        if (err) { throw err; }
        res.writeHead(200, { "Content-Type": "text/html"});
        res.end(jade.compile(data, {"filename":"templates/index.jade"})(), "utf-8");
      });
    });
  });

  router.get("/favicon.ico", function(req, res) {
    fs.readFile("public/images/favicon.ico", function(err, icon) {
      if (err) { throw err; }
      console.log("Favicon requested");
      res.writeHead(200, { "Content-Type": "image/x-icon"});
      res.end(icon);
    })
  });

  router.get("/public/**", function(req, res, path) {
    fs.readFile("public/" + path, function(err, data) {
      if (err) { throw err; }
      console.log(path);
      res.end(data);
    });
  });

  router.get("/public/stylesheets/**", function(req, res, path) {
    fs.readFile("public/stylesheets/" + path, function(err, data) {
      if (err) { throw err; }
      console.log(path);
      res.end(data);
    });
  });

  router.get("/public/images/**", function(req, res, path) {
    fs.readFile("public/images/" + path, function(err, data) {
      if (err) { throw err; }
      console.log(path);
      res.end(data);
    });
  });

  router.get("/*", function(req, res, path) {
    console.log("Variable route hit");
    fs.readFile(path, function(err, data) {
      console.log("Var serving " + path);
      res.end(data);
    })
  });

  router.notFound(function(req, res) {
    res.writeHead(404, { "Content-Type": "text/plain"});
    res.end("Error 404: " + req.url + " not found.");
    console.log("router.notFound called on " + req.url);
  });

  return http.createServer(router);
};
