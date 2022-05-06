module.exports = function onComplete(props) {
  var message = props.form.find('.section-message');
  if (props.response === 200) {
      message.html('<i class="fa fa-check" style="color:green;"></i>');

      props.form.hide();

      // replace the section but reset our html and markdown
      props.html = props.options.defaultMarkdown(props.changes);
      props.el.html(props.html);
      props.options.insertEditLink(props);
      if (props.options.postProcessor) props.options.postProcessor(props.el); // add #hashtag and @callout links, extra CSS and deep links
  } else {
      message.html('<b style="color:#a33">There was an error</b> -- the wiki page may have changed while you were editing; save your content in the clipboard and try refreshing the page.');
  }
}