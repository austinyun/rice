var fs = require("fs"),
    async = require("async"),
    dot = require("dot"),
    parse = require("./parse");

function compileTemplate(template, callback) {
    async.waterfall([
        async.apply(fs.readFile, "templates/" + template + ".dot"),
        function(data, callback) { callback(null, dot.template(data)); }
    ], async.apply(callback));
}

function readPost(path, callback) {
    function addFilepath(path, file, callback) {
        var link = path.substr(0, path.length - 3),
            tag = "link:" + link + "\n";
        callback(null, tag + file);
    }

    async.waterfall([
        async.apply(fs.readFile, "posts/" + path, "utf-8"),
        async.apply(addFilepath, path),
        async.apply(parse)
    ], async.apply(callback));
}

function indexArticles(callback) {
    function readAllPosts(data, callback) {
        async.map(data, readPost, callback);
    }
    function sortByDate(articles, callback) {
        function iterator(obj, callback) {
            if (obj.date) {
                return callback(null, obj.date);
            }
            console.error(obj.title);
            return callback("Article has no date.");
        }
        // Note that this sorts in reverse lexicographical order!
        async.sortBy(articles, iterator,
            function(err, sorted) {
                if (err) { return callback(err); }
                callback(err, {"articles": sorted.reverse()});
            });
    }

    async.waterfall([
        async.apply(fs.readdir, "posts/"),
        async.apply(readAllPosts),
        async.apply(sortByDate)
    ], async.apply(callback));
}

function notFound(req, res, err) {
    if (err) { console.error(err); }
    res.writeHead(404, { "Content-Type": "text/plain"});
    res.end("Error 404: " + req.url + " not found.");
}

module.exports = {

    notFound: notFound,

    home: function(req, res) {
        async.parallel({
            "template": async.apply(compileTemplate, "index"),
            "posts": async.apply(indexArticles)
        }, function(err, results) {
            if (err) { throw err; }
            res.end(results.template(results.posts));
        });
    },

    article: function(req, res) {
        async.parallel({
            "template": async.apply(compileTemplate, "article"),
            "post": async.apply(readPost, req.url + ".md")
        }, function(err, results) {
            if (err) { return notFound(req, res, err); }
            res.end(results.template(results.post));
        });
    }

};
