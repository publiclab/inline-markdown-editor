module.exports = function onFail(error, uniqueId) {
  var message = $("#" + uniqueId + " .section-message");
  message.html(error);
};
