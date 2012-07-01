var http = require("http"),
    fs = require("fs"),
    git = require("git-fs"),
    path = require("path"),
    router = require("choreographer").router();

module.exports = function rice() {

  // Someone tell me if the function scope here is fine or if I need to wrap
  // this in a var write404 = function(req, res) {

  function write404(req, res) {
    res.writeHead(404, { "Content-Type": "text/plain"});
    res.end("Error 404: " + req.url + " not found.");
    return res;
  }
  // Initialize git-fs with the cwd
  git(process.cwd());

  router.get("/", function (req, res) {
    res.end("Homepage");
  });

  router.get("/favicon.ico", function (req, res) {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end(fs.readFile("favicon.ico", function(err, icon) {
      if (err) { throw err; }
      return icon;
    }));
  });

  router.get("/*", function (req, res) {
    console.error("route hit");
    git.readFile("fs", req.url, function (err, data) {
      if (err) { return write404(req, res); }
      console.log(data.toString()); // Debugging code
      res.end(data.toString());
    });
  });

  return http.createServer(router);
};
