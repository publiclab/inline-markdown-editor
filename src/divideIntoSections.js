// split by double-newline, but preserve HTML blocks as single sections:
module.exports = function divideIntoSections(content) {
  var sections = [];
  content = content.replace(/[\n]{2,}/g, "\n\n"); // manage double newlines (not sure exactly?)

  var parser = require("node-html-parser");

  var chunks = parser.parse(content);

  chunks.childNodes.forEach(function(chunk) {

    var string = chunk.toString();
    if (chunk.nodeType !== 3) {
      sections.push(string); // it's an HTML chunk
    } else {
      // filter empty chunks
      string.split("\n\n").forEach(function(substring) {
        if (substring !== undefined && substring !== '' && substring.match(/\S/) !== null) {
          sections.push(substring); // split by double newline and add
        }
      });
    }

  });

  return sections;
}
