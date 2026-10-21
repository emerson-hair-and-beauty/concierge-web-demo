// Service Worker for Concierge PWA
// Handles push notifications and offline support

self.addEventListener("push", (event) => {
  if (!event.data) {
    console.log("[SW] Received push with no data");
    return;
  }

  try {
    const data = JSON.parse(event.data.text());

    const notificationOptions = {
      body: data.body,
      icon: data.icon || "/icons/icon-192x192.png",
      badge: data.badge || "/icons/icon-192x192.png",
      tag: "concierge-notification",
      requireInteraction: false,
      data: {
        url: data.data?.url || "/routine/summary",
      },
    };

    event.waitUntil(
      self.registration.showNotification(data.title, notificationOptions)
    );
  } catch (error) {
    console.error("[SW] Error handling push:", error);
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/routine/summary";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Check if app is already open
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        // Open new window if app is not open
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

self.addEventListener("notificationclose", (event) => {
  console.log("[SW] Notification closed:", event.notification.tag);
});
