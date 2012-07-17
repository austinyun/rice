var marked = require('marked'),
    hl = require('highlight').Highlight;

marked.setOptions({
  gfm: true,
  sanitize: true,
  highlight: function(code) {
    return hl(code);
  }
});

module.exports = function (markdown, callback) {
  var parsedObject = {},
      match;

  while(match = markdown.match(/^([a-z]+):\s*(.*)\s*\n/i)) {
    var key = match[1].toLowerCase(),
      value = match[2];
    markdown = markdown.substr(match[0].length);
    parsedObject[key] = value;
  }
  parsedObject["html"] = marked(markdown);
  parsedObject["summary"] = parsedObject["html"].
    substr(0, parsedObject["html"].search("</p>") + 4);
  callback(null, parsedObject);
}
