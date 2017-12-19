/**
 * Display a desktop notification
 * @param {*String} tag Title of the notification
 * @param {*String} body Body of the notification
 */
function notifyMe(tag, body) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    var notification = new Notification(tag, { body: body });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission(function(permission) {
      if (permission === "granted") {
        var notification = new Notification(tag, { body: body });
      }
    });
  }
}

module.exports = { notifyMe };
