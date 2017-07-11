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
    if (o.isEditable(_markdown, o.originalMarkdown)) {
      var formHtml = o.buildSectionForm(uniqueId, _markdown);
      el.after(formHtml);
      var form = $('#' + uniqueId);
      o.insertEditLink(uniqueId, el, form, onEdit, false, o);
      // plan for swappable editors; will need to specify both constructor and onEditorSubmit
      function onEdit() {
        var editor;
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
          prepareAndSendSectionForm(e, form, editor, _markdown);
        });
      }
    }

    function prepareAndSendSectionForm(e, form, _editor, _markdown) {
      message.html('<i class="fa fa-spinner fa-spin" style="color:#ccc;"></i>');
      if (_editor) {
        changes = _editor.richTextModule.value(); // rich editor
      } else {
        changes = form.find('textarea').val();
      }
      o.submitSectionForm(e, _markdown, changes, o);
    }

    // provide overridable default 
    o.submitSectionForm = o.submitSectionForm || function submitSectionForm(e, before, after, o) {
      e.preventDefault();
      $.post(o.replaceUrl, {
        before: before, // encodeURI(before)
        after: after // encodeURI(after)
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
