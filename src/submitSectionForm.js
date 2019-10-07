module.exports = function submitSectionForm(e, props) {
  var options = props.options;
  var uniqueId = props.uniqueId;

  e.preventDefault();
  $.post(options.replaceUrl, {
          before: props.originalSectionMarkdown, // encodeURI(before)
          after: props.changes // encodeURI(after)
      })
      .done(function onComplete(result, success, xhr) {
          if (result == "false") {
              options.onFail(result, uniqueId);
          } else {
              // we should need fewer things here: 
              props.response = xhr.status;
              options.onComplete(props);
          }
      }).fail(function onFail(response) {
          options.onFail(response, uniqueId);
      }); // these don't work?
}