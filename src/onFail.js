module.exports = function onFail(error, uniqueId) {
  console.log("In onFail"); //remove this
  var message = $("#" + uniqueId + " .section-message");
  message.html(error);
};
