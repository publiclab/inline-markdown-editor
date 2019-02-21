// split by double-newline, but preserve HTML blocks as single sections:
module.exports = function divideIntoSections(content) {
  var sections = [];
  content = content.replace(/[\n]{2,}/g, "\n\n"); // manage double newlines (not sure exactly?)

  // Split by <el>...</el> blocks, then parse the markdown text between it.
  // If we don't do this, it'll fail if there are double newlines inside HTML blocks, esp. <script> blocks.

  // test string: s = "<div>lala</div>\n\nhey<table class='hey'><p><table></table></p></table>\n\n## Markdown\n\n<p>Hi there</p>\n\n* One\n* Two"

  var jqueryCollection = $(content);

  jqueryCollection.toArray().forEach(function(chunk) {
    if (chunk.nodeName === "#text") {
      sections.concat(chunk.split("\n\n")); // split by double newline and add
    } else {
      sections.push(chunk.toString()); // it's an HTML chunk
    }
  });

  return sections;
}
