module.exports = function processSection(markdown, o) {
  var html,
      randomNum   = parseInt(Math.random() * 10000),
      uniqueId    = "section-form-" + randomNum,
      filteredMarkdown = markdown;

  if (o.preProcessor) filteredMarkdown = o.preProcessor(markdown);
  html = o.defaultMarkdown(filteredMarkdown);

  $(o.selector).append('<div class="inline-section inline-section-' + uniqueId + '"></div>');
  var el = $(o.selector).find('.inline-section:last');
  el.append(html);

  if (o.postProcessor) o.postProcessor(el);
  var form = insertFormIfMarkdown(filteredMarkdown, el, uniqueId);

  var message = $('#' + uniqueId + ' .section-message');

  function insertFormIfMarkdown(_markdown, el, uniqueId) {
    if (o.isEditable(_markdown)) {
      var formHtml = o.buildSectionForm(uniqueId, _markdown);
      el.after(formHtml);
      var form = $('#' + uniqueId);
      o.insertEditLink(uniqueId, el, form, onEdit);
      function onEdit() {
        if (o.wysiwyg && $('#' + uniqueId).find('.wk-container').length === 0) {
          // insert rich editor
          editor = new PL.Editor({
            textarea: $('#' + uniqueId + ' textarea')[0]
          });
        }
        form.find('.cancel').click(function inlineEditCancelClick(e) {
          e.preventDefault();
          form.hide();
        });
        form.find('button.submit').click(function(e) {
          submitSectionForm(e, form, editor)
        });
      }
    }
 
    function submitSectionForm(e, form, _editor) {
      e.preventDefault();
      message.html('<i class="fa fa-spinner fa-spin" style="color:#ccc;"></i>');
      if (_editor) {
        changes = _editor.richTextModule.value(); // rich editor
      } else {
        changes = form.find('textarea').val();
      }
      // we should swap for a method like this:
      //o.sendChanges(markdown, changes);
      // but should do mocked ajax testing first
      $.post(o.replaceUrl, {
        before: markdown,
        after: changes
      })
      .done(function onComplete(response) {
        // we should need fewer things here:
        o.onComplete(response, markdown, html, el, uniqueId, form, o);
      }).error(function onFail(response) {
        o.onFail(response, uniqueId);
      }).fail(function onFail(response) {
        o.onFail(response, uniqueId);
      }); // these don't work?
    }
  }
}
