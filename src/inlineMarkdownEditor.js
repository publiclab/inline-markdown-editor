inlineMarkdownEditor = function inlineMarkdownEditor(o) {
  o.defaultMarkdown = o.defaultMarkdown || require('./defaultMarkdown.js');
  o.buildSectionForm = o.buildSectionForm || require('./buildSectionForm.js');
  o.insertEditLink = o.insertEditLink || require('./insertEditLink.js');
  o.onComplete = o.onComplete || require('./onComplete.js');
  o.onFail = o.onFail || require('./onFail.js');
  o.isEditable = o.isEditable || require('./isEditable.js');
  o.processSections = require('./processSections.js');
  var el = $(o.selector);
  // split by double-newline:
  var sections = el.html().split('\n\n');
  el.html('');
  o.processSections(sections, o);
  el.show();
  return {
    element: el,
    sections: sections,
    options: o
  };
}
module.exports = inlineMarkdownEditor;
