var fs = require("fs"),
    async = require("async"),
    dot = require("dot"),
    extractMetadata = require("json-finder")(),
    hl = require("highlight").Highlight,
    parseMarkdown = require("marked").setOptions({
        gfm: true, // Github flavored Markdown
        highlight: hl
    });

function generateSummary(html) {
    var firstParagraph = html.search("</p>") + 4;
    return html.substr(0, firstParagraph);
}

function generatePost(path, callback) {
    fs.readFile("posts/" + path, "utf-8", function(err, rawFile) {
        if (err) { return callback(err); }
        extractMetadata(rawFile, function(err, article, start, end) {
            article.html = parseMarkdown(rawFile.slice(end));
            article.summary = generateSummary(article.html);
            article.link = path.substr(0, path.length - 3);
            callback(null, article);
        });
    });
}

function indexArticles(callback) {
    // Helpers
    function readAllPosts(data, callback) {
        async.map(data, generatePost, callback);
    }
    function sortByDate(articles, callback) {
        function iterator(obj, callback) {
            if (obj.date) {
                return callback(null, obj.date);
            }
            return callback(new Error("Article has no date."));
        }
        // Note that this sorts in reverse lexicographical order!
        // hence the sorted.reverse() at the end
        async.sortBy(articles, iterator, function(err, sorted) {
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

function compileTemplate(template, callback) {
    async.waterfall([
        async.apply(fs.readFile, "templates/" + template + ".dot"),
        function(data, callback) { callback(null, dot.template(data)); }
    ], async.apply(callback));
}

module.exports = {

    home: function(callback) {
        async.parallel({
            "template": async.apply(compileTemplate, "index"),
            "posts": async.apply(indexArticles)
        }, function(err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results.template(results.posts));
            }
        });
    },

    article: function(req, res, callback) {
        async.parallel({
            "template": async.apply(compileTemplate, "article"),
            "post": async.apply(generatePost, req.params.article + ".md")
        }, function(err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results.template(results.post));
            }
        });
    },

    json: function(req, res, callback) {
        var filepath = "posts/" + req.params.article + ".md";
        fs.readFile(filepath, "utf-8", function(err, rawFile) {
            if (err) {
                callback(err);
            } else {
                extractMetadata(rawFile, function(err, article, start, end) {
                    if (err) {
                        callback(err);
                    } else {
                        article.content = rawFile.slice(end);
                        callback(null, JSON.stringify(article));
                    }
                });
            }
        });
    }
};
