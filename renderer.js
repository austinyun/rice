var fs = require("fs"),
    async = require("async"),
    dot = require("dot"),
    parse = require("./parse");

function readPost(filename, callback) {
  fs.readFile("posts/" + filename, function(err, markdown) {
    var link = filename.substr(0,filename.length - 3);
    var linktag = "link: " + link + "\n";
    callback(null, linktag + markdown.toString());
  });
}

function indexArticles(callback) {
  fs.readdir("posts/", function(err, files) {
    async.map(files, readPost, function(err, markdown) {
      async.map(markdown, parse, function(err, results) {
        callback( {"articles": results} );
      });
    });
  });
}

function compileTemplate(template, callback) {
  async.waterfall(
      [
      function(callback){
        var file = "templates/" + template + ".dot";
        fs.readFile(file, function(err, data) {
          callback(err, data);
        });
      },

      function(arg, callback){
        callback(null, dot.template(arg));
      }

      ], function(err, compiledTemplate){
        callback(compiledTemplate);
      });
}

module.exports = {

  home: function(res) {
    async.parallel(
        [
        function(callback) {
          compileTemplate("index", function(compiledTemplate) {
            callback(null, compiledTemplate);
          });
        },

        function(callback) {
          indexArticles( function(index) {
            callback(null, index);
          });
        }

        ], function(err, results) {
          res.end(results[0](results[1]));
        }
        );
  },

  article: function(path, res, callback) {
    var file = "posts/" + path + ".md";
    async.parallel(
        [
        function(callback) {
          compileTemplate("article", function(compiledTemplate) {
            callback(null, compiledTemplate);
          });
        },

        function(callback) {
          fs.readFile(file, "utf-8", function(err, markdown) {
            if (err) { return callback(err); }
            parse(markdown, function(err, parsedArticle) {
              parsedArticle["link"] = path;
              callback(null, parsedArticle);
            });
          });
        }

        ], function(err, results) {
          if (err) { return callback(err); }
          res.end(results[0](results[1]));
        }
        );
  }
}
