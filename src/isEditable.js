module.exports = function isEditable(markdown) {
  // filter? Only p,h1-5,ul?
  var editable = markdown.match(/</) === null; // has tags; exclueds HTML
      editable = editable && markdown.match(/\*\*\*\*/) === null; // no horizontal rules: ****
      editable = editable && markdown.match(/\-\-\-\-/) === null; // no horizontal rules: ----
// no emtpy whitespace!!
  return editable;
} 
