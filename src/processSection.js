module.exports = function processSection(markdown, o) {
  var html,
      randomNum = parseInt(Math.random() * 10000),
      uniqueId = "section-form-" + randomNum,
      filteredMarkdown = markdown;

  var originalSectionMarkdown = markdown;
  filteredMarkdown = o.preProcessor(markdown);
  html = o.defaultMarkdown(filteredMarkdown);

  $(o.selector).append('<div class="inline-section inline-section-' + uniqueId + '"></div>');
  var el = $(o.selector).find('.inline-section:last');
  el.append(html);

  if (o.postProcessor) o.postProcessor(el);


  o.insertFormIfMarkdown({
      uniqueId: uniqueId,
      el: el,
      filteredMarkdown: filteredMarkdown,
      originalSectionMarkdown: originalSectionMarkdown,
      useOnEdit: true,
      html: html,
      options: o
  });

}