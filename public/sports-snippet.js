/* Fitara sports tracking snippet - self-hosted copy (https) - live-site verification */
(function () {
  var PING = "https://api.tvarx.com/sports/ping";
  var SITE = "fitara-web";
  try {
    function send() {
      var body = "site=" + SITE + "&page=" + encodeURIComponent(window.location.href);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(PING + "?" + body);
      } else {
        var img = new Image();
        img.src = PING + "?" + body;
      }
    }
    if (document.readyState === "complete") {
      send();
    } else {
      window.addEventListener("load", send);
    }
  } catch (e) {}
})();