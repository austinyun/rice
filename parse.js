var jsonfinder = require("json-finder"),
    marked = require("marked"),
    hl = require("highlight").Highlight;

marked.setOptions({
    gfm: true,
    sanitize: true,
    highlight: hl
});

function generateSummary(content) {
    // Just pulls out everything until the first </p> tag.
    // TODO: Some better way of generating a summary
    return content.substr(0, content.search("</p>") + 4);
}

module.exports = function (markdown, callback) {
    jsonfinder(markdown, function(err, article, start, end) {
        if (err) {
            // JSON parse didn't find anything
            throw err; //Testing only; shouldn't blow up probably
        }
        article.html = marked(markdown.slice(end));
        article.summary = generateSummary(article.html);
        callback(null, article);
    });
};
