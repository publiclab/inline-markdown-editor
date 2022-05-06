module.exports = function insertFormIfMarkdown(props) {
  var options = props.options;

  if (options.isEditable(props.filteredMarkdown, options.preProcessor(options.originalMarkdown))) {
      var formHtml = options.buildSectionForm(props.uniqueId, props.filteredMarkdown);
      props.el.after(formHtml);

      props.form = $('#' + props.uniqueId);
      options.insertEditLink(props);
  }

}