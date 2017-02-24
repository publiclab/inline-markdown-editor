module.exports = function isEditable(markdown) {
  // filter? Only p,h1-5,ul?
  var editable = markdown.match(/</) === null; // has tags; exclueds HTML
  editable = editable && markdown.match(/\*\*\*\*/) === null; // no horizontal rules: ****
  editable = editable && markdown.match(/\-\-\-\-/) === null; // no horizontal rules: ----
  editable = editable && markdown === ''; // no blanks
// also add no pure whitespace
  return editable;
} 
