var marked = require('marked'),
    hl = require('highlight').highlight;

marked.setOptions({
  gfm: true,
  highlight: function(code) {
    return hl(code);
  }
});

module.exports = function parse(markdown) {
  var parsedObject = {},
      match;

  while(match = markdown.match(/^([a-z]+):\s*(.*)\s*\n/i)) {
    var key = match[1].toLowerCase(),
      value = match[2];
    markdown = markdown.substr(match[0].length);
    parsedObject[key] = value;
  }
  parsedObject["html"] = marked(markdown)
  return parsedObject;
}
