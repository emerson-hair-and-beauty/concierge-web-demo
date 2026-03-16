/**
 * Telemetry utilities for interacting with the Concierge Backend.
 * These functions power automated scenarios and triggers.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://concierge-jzf8.onrender.com';

/**
 * Logs a wash event for the user.
 * Triggered when "I washed today" is clicked.
 */
export async function logWashDay(userId) {
  if (!userId) {
    console.error("Telemetry: userId is required for logging wash day");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/user/wash`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to log wash day: ${response.statusText}`);
    }

    console.log("Telemetry: Wash successfully recorded");
    return true;
  } catch (error) {
    console.error("Telemetry Error (Wash):", error);
    return false;
  }
}

/**
 * Updates the user's location.
 * Triggered on dashboard/app load.
 */
export async function updateUserLocation(userId, location) {
  if (!userId || !location) {
    console.warn("Telemetry: userId and location are required for updating location");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/user/location`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        user_id: userId,
        location: location 
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update location: ${response.statusText}`);
    }

    console.log("Telemetry: Location updated successfully");
    return true;
  } catch (error) {
    console.error("Telemetry Error (Location):", error);
    return false;
  }
}
