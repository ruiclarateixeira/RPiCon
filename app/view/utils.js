function handleServiceResponse(response) {
  if (response.ok) return response.json();
  throw Error(response.statusText);
}

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

module.exports = { notifyMe, handleServiceResponse };
