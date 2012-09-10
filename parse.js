var jsonfinder = require("json-finder")(),
    marked = require("marked"),
    hl = require("highlight").Highlight;

marked.setOptions({
    gfm: true, // Github flavored Markdown
    sanitize: true,
    highlight: hl // Function used for syntax highlighting
});

function generateSummary(htmlContent) {
    // Just pulls out everything until the first </p> tag.
    // TODO: Some better way of generating a summary
    var firstParagraph = htmlContent.search("</p>") + 4;
    return htmlContent.substr(0, firstParagraph);
}

module.exports = function (post, callback) {
    jsonfinder(post, function(err, article, start, end) {
        if (err) {
            // JSON parse didn't find anything
            throw err; //Testing only; shouldn't blow up probably
        }

        var markdown = post.slice(end);
        article.html = marked(markdown);
        article.summary = generateSummary(article.html);
        callback(null, article);
    });
};
