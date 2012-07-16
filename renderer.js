var fs = require("fs"),
    async = require("async"),
    dot = require("dot"),
    parse = require("./parse");

function readPost(filename, callback) {
  fs.readFile("posts/" + filename, "utf-8", function(err, markdown) {
    var link = filename.substr(0,filename.length - 3),
        linktag = "link: " + link + "\n";
    callback(err, linktag + markdown);
  });
}

function indexArticles(callback) {
  fs.readdir("posts/", function(err, files) {
      async.map(files, ra, function(err, results) {
        async.sortBy(results, function(obj, callback) {
          callback(err, obj.date);
        }, function(err, sorted) {
          callback(err, {"articles": sorted.reverse()} );
        });
      });
    });
}

function compileTemplate(template, callback) {
  async.waterfall(
      [
      async.apply(fs.readFile, "templates/" + template + ".dot"),

      function(data, callback) { callback(null, dot.template(data)); }

      ], function(err, compiledTemplate){
        callback(err, compiledTemplate);
      });
}

  function ra(file, callback) {
    async.waterfall([
        async.apply(readPost, file),
        async.apply(parse)
    ], function(err, results) {
      callback(err, results);
    })
  }

module.exports = {

  home: function(res) {
    async.parallel(
        [
        async.apply(compileTemplate, "index"),
        async.apply(indexArticles)
        ], function(err, results) {
          if (err) { throw err; }
          res.end(results[0](results[1]));
        }
        );
  },


  article: function(path, res, callback) {
    var file = path + ".md";
    async.parallel([
      async.apply(compileTemplate, "article"),
      async.apply(ra, file)

    ], function(err, results) {
      if (err) { return callback(err); }
      res.end(results[0](results[1]));
    }
    );
  }
}
