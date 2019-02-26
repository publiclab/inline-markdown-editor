// split by double-newline, but preserve HTML blocks as single sections:
module.exports = function divideIntoSections(content) {
  var sections = [];
  content = content.replace(/[\n]{2,}/g, "\n\n"); // manage double newlines (not sure exactly?)
  chunkArray = content.replace(/(<(.+).*>.+<\/\2>)/g,"@@@@@@$1").split(/@@@@@@|\n\n/);

  // ok, but now so 'hey' is split from the html.

//  chunkArray = chunkArray.filter(function (x) {
//    return (x !== undefined && x !== '' && x.match(/\S/) !== null); // probably overzealous filtering of "empty" sections
//  });

  chunkArray.forEach(function(chunk) {
    if (chunk.match(/<\w>/)) {
      sections.push(chunk); // it's an HTML chunk
    } else {
      sections = sections.concat(chunk.split("\n\n")); // split by double newline and add
    }
  });

  return sections;
}
