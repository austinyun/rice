var marked = require('marked'),
    hl = require('highlight').Highlight;

marked.setOptions({
    gfm: true,
    sanitize: true,
    highlight: hl
});

module.exports = function (markdown, callback) {
    var parsedObject = {},
        pattern = /^([a-z]+):\s*([\w\s]*)\s*\n/i,
        match = markdown.match(pattern),
        key,
        value;

    // This loop matches all the metadata at the beginning
    // of the posts that are of the form "key: value"
    while (match) {
        key = match[1].toLowerCase();
        value = match[2];
        parsedObject.key = value;

        markdown = markdown.substr(match[0].length);
        match = markdown.match(pattern);
    }

    parsedObject.html = marked(markdown);
    parsedObject.summary = parsedObject.html.
        substr(0, parsedObject.html.search("</p>") + 4);

    callback(null, parsedObject);
};
