export function notifyMe(message) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    var notification = new Notification(message);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission(function(permission) {
      if (permission === "granted") {
        var notification = new Notification(notification);
      }
    });
  }
}
