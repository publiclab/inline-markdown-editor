module.exports = function onEdit(props) {
  var editor;
  var options = props.options;
  var uniqueId = props.uniqueId;

  if (options.wysiwyg && $('#' + props.uniqueId).find('.wk-container').length === 0) {
      // insert rich editor
      var editorOptions = options.editorOptions || {};
      editorOptions.textarea = $('#' + uniqueId + ' textarea')[0];
      editorOptions.tagsModule = (editorOptions.tagsModule === true); // disable this to not require Bloodhound, unless overridden
      editor = new PL.Editor(editorOptions);
  }

  var cancelBtn = props.form.find('.cancel');
  var submitBtn = props.form.find('button.submit');

  cancelBtn.click(function inlineEditCancelClick(e) {
      e.preventDefault();
      props.form.hide();
  });
  submitBtn.click(function(e) {
      options.prepareAndSendSectionForm(props, editor, e);
  });

}