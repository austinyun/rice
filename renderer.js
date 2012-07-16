var fs = require("fs"),
    async = require("async"),
    dot = require("dot"),
    parse = require("./parse");

function compileTemplate(template, callback) {
  async.waterfall([
      async.apply(fs.readFile, "templates/" + template + ".dot"),
      function(data, callback) { callback(null, dot.template(data)); }
      ], async.apply(callback)
      );
}

function indexArticles(callback) {
  var flow = [
    async.apply(fs.readdir, "posts/"),

    function(data, callback) { async.map(data, readPost, callback); },

    function sortByDate(parsed, callback) {
      var iterator = function(obj, callback) {
        // callback(null, obj.date);
        if (obj.date) {
          return callback(null, obj.date);
        } else {
          console.log(obj.title);
          return callback("Article has no date.") }
      }
      // Note that this sorts in reverse lexicographical order!
      async.sortBy(parsed, iterator,
          function(err, sorted) { callback(err, {"articles": sorted.reverse()} ); }
        );
    }
  ];

  async.waterfall(flow, async.apply(callback))
}

function readPost(path, callback) {
  async.waterfall([
      async.apply(fs.readFile, "posts/" + path, "utf-8"),
      async.apply(addFilepath, path),
      async.apply(parse)
  ], async.apply(callback))
}

function addFilepath(path, file, callback){
  var link = path.substr(0,path.length - 3),
      tag = "link:" + link + "\n";
  callback(null, tag + file);
}

module.exports = {

  home: function(res) {
    async.parallel([
      async.apply(compileTemplate, "index"),
      async.apply(indexArticles)
      ], function(err, results) {
        if (err) { throw err; }
        res.end(results[0](results[1]));
      }
      );
  },

  article: function(path, res, callback) {
    async.parallel([
        async.apply(compileTemplate, "article"),
        async.apply(readPost, path + ".md")
        ], function(err, results) {
          if (err) { return callback(err); }
          res.end(results[0](results[1]));
        }
        );
  }

}
