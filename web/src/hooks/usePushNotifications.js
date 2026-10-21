import { useState, useEffect, useCallback } from "react";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

export function usePushNotifications(userId) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if Push Notifications are supported
  useEffect(() => {
    const supported =
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window;

    setIsSupported(supported);
  }, []);

  // Check if user is already subscribed
  useEffect(() => {
    if (!isSupported || !userId) return;

    const checkSubscription = async () => {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      } catch (err) {
        console.error("[usePushNotifications] Error checking subscription:", err);
      }
    };

    checkSubscription();
  }, [isSupported, userId]);

  // Subscribe to push notifications
  const subscribe = useCallback(async () => {
    if (!isSupported || !userId || !VAPID_PUBLIC_KEY) {
      setError("Push notifications not supported or missing configuration");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Request notification permission
      if (Notification.permission === "default") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          throw new Error("Notification permission denied");
        }
      }

      // Get service worker registration
      const registration = await navigator.serviceWorker.ready;

      // Subscribe to push manager
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      // Send subscription to backend
      const response = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          endpoint: subscription.endpoint,
          p256dh: arrayBufferToBase64(
            subscription.getKey("p256dh")
          ),
          auth: arrayBufferToBase64(subscription.getKey("auth")),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe on backend");
      }

      setIsSubscribed(true);
      console.log("[usePushNotifications] Successfully subscribed");
      return true;
    } catch (err) {
      console.error("[usePushNotifications] Subscribe error:", err);
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, userId]);

  // Unsubscribe from push notifications
  const unsubscribe = useCallback(async () => {
    if (!isSupported || !userId) return false;

    setIsLoading(true);
    setError(null);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        throw new Error("No subscription found");
      }

      // Unsubscribe from push manager
      await subscription.unsubscribe();

      // Notify backend
      await fetch(`/api/push/subscribe?userId=${userId}`, {
        method: "DELETE",
      });

      setIsSubscribed(false);
      console.log("[usePushNotifications] Successfully unsubscribed");
      return true;
    } catch (err) {
      console.error("[usePushNotifications] Unsubscribe error:", err);
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, userId]);

  return {
    isSupported,
    isSubscribed,
    isLoading,
    error,
    subscribe,
    unsubscribe,
  };
}

// Utility functions
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
