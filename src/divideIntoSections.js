// split by double-newline, but preserve HTML blocks as single sections:
module.exports = function divideIntoSections(content) {
  var sections = [];
  content = content.replace(/[\n]{2,}/g, "\n\n"); // manage double newlines (not sure exactly?)

  // somehow split by <el>...</el> blocks... we can't use regex for that, we have to parse HTML
  // then parse the markdown between it

  // If we don't do this, it'll fail if there are double newlines inside HTML blocks, esp. <script> blocks

  // test string: s = "<div>lala</div>\n\nhey<table class='hey'><p><table></table></p></table>\n\n## Markdown\n\n<p>Hi there</p>\n\n* One\n* Two"

  var jqueryCollection = $(content);

  jqueryCollection.toArray().forEach(function(chunk) {
//    if (chunk.nodeName === "#text") {
      sections += chunk.split("\n\n"); // split by double newline and add
//    } else {
//      sections.push(chunk); // it's an HTML chunk
//    }
  });

  return sections;
}
