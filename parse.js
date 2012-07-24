var marked = require('marked'),
    hl = require('highlight').Highlight;

marked.setOptions({
    gfm: true,
    sanitize: true,
    highlight: hl
});

module.exports = function (markdown, callback) {
    var key, value, html,
        article = {},
        pattern = /^([a-z]+):\s*(.*)\s*\n/i,
        match = markdown.match(pattern);

    // This loop matches all the metadata at the beginning
    // of the posts that are of the form "key: value"
    while (match) {
        key = match[1].toLowerCase();
        value = match[2];
        article[key] = value;

        markdown = markdown.substr(match[0].length);
        match = markdown.match(pattern);
    }

    html = marked(markdown);
    article.html = html;
    article.summary = html.substr(0, html.search("</p>") + 4);

    callback(null, article);
};
