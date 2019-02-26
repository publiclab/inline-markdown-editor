// split by double-newline, but preserve HTML blocks as single sections:
module.exports = function divideIntoSections(content) {
  var sections = [];
  content = content.replace(/[\n]{2,}/g, "\n\n"); // manage double newlines (not sure exactly?)

  // test string: s = "<div>lala</div>\n\nhey<table class='hey'><p><table></table></p></table>\n\n## Markdown\n\n<p>Hi there</p>\n\n* One\n* Two"

  chunkArray = content.split(/[\n\n]|<\w.>?<\/\w.>/);
  // `s.split(/[\n\n]|<\w.>?<\/\w.>/)` isn't perfect - it probably fails on HTML across multiple lines. But... maybe progress...

  // actually, we have to split by <el>...</el> blocks, then parse the markdown text between it.
  // If we don't do this, it'll fail if there are double newlines inside HTML blocks, esp. <script> blocks.

  chunkArray = chunkArray.filter(function (x) {
    return (x !== undefined && x !== '' && x.match(/\S/) !== null); // probably overzealous filtering of "empty" sections
  });

  chunkArray.forEach(function(chunk) {
    if (chunk.match(/<\w>/)) {
      sections.push(chunk); // it's an HTML chunk
    } else {
      sections = sections.concat(chunk.split("\n\n")); // split by double newline and add
    }
  });

  return sections;
}
