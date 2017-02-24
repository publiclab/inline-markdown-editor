module.exports = function processSections(sections, o) {
  sections.forEach(function(markdown) {
    processSection = require('./processSection.js');
    processSection(markdown, {
      replaceUrl:    o.replaceUrl,
      selector:      o.selector, 
      postProcessor: o.postProcessor,
      preProcessor:  o.preProcessor
    });
  });
}
