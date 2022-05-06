module.exports = function prepareAndSendSectionForm(props, editor, e) {
  var message = $('#' + props.uniqueId + ' .section-message');
  message.html('<i class="fa fa-spinner fa-spin" style="color:#ccc;"></i>');
  props.changes = editor ? editor.richTextModule.value() : props.form.find("textarea").val();
  props.options.submitSectionForm(e, props);
}