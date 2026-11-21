/* Açaí Obrigatório + OneSignal Web SDK v16
   Worker único para o escopo /Sistema/.
   Não registrar sw.js separadamente no mesmo escopo.
*/
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener("notificationclick", function (event) {
  var data = event.notification && event.notification.data ? event.notification.data : {};
  var target = data.url || "/Sistema/";
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clients) {
      for (var i = 0; i < clients.length; i++) {
        var client = clients[i];
        if ("focus" in client) {
          if ("navigate" in client) client.navigate(target);
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    })
  );
});
