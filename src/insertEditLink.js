module.exports = function insertEditLink(props) {
  var uniqueId = props.uniqueId;
  var options = props.options;
  var editBtns = "";

  editBtns += "<span class='inline-edit-btns inline-edit-btns-" + uniqueId + "'>";
  editBtns += "<a class='inline-edit-btn inline-edit-btn-editor-" + uniqueId + " inline-edit-btn-" + uniqueId + "'><i class='fa fa-pencil'></i></a>";
  if (options.extraButtons) {
      Object.keys(options.extraButtons).forEach(function(key, index) {
          editBtns += "<a class='inline-edit-btn inline-edit-btn-" + key + " inline-edit-btn-" + uniqueId + " inline-edit-btn-" + uniqueId + "-" + key + "'><i class='fa " + key + "'></i></a>";
      });
  }
  editBtns += "</span>";
  props.el.append(editBtns);
  if (options.extraButtons) {
      Object.keys(options.extraButtons).forEach(function(key, index) {
          // run respective functions and pass in the elements
          options.extraButtons[key]($('.inline-edit-btn-' + uniqueId + '-' + key), uniqueId);
      });
  }
  $('.inline-edit-btn-editor-' + uniqueId).click(function inlineEditLinkClick(e) {
      e.preventDefault();
      props.form.toggle();
      if (props.useOnEdit) {
          props.useOnEdit = false; // running once for each element
          options.onEdit(props); // callback
      }
  });
}