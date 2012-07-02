//TODO come up with a functional algorithm to do this
//But gosh, I have to say, this is a really clever one
module.exports = function parse(markdown) {
  var parsedObject = {},
      match;

  if (!(typeof markdown === 'string')) {
    markdown = markdown.toString();
  }

  while(match = markdown.match(/^([a-z]+):\s*(.*)\s*\n/i)) {
    var key = match[1].toLowerCase(),
      value = match[2];
    markdown = markdown.substr(match[0].length);
    parsedObject[key] = value;
  }
  parsedObject["markdown"] = markdown;
  return parsedObject;
}
