export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    // Fetch user's location from backend
    const userResponse = await fetch(
      `https://concierge-jzf8.onrender.com/api/user/metadata?user_id=${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    let location = null;
    if (userResponse.ok) {
      const userData = await userResponse.json();
      location = userData.location;
    }

    // If no location, try to get from geolocation
    if (!location) {
      const geoResponse = await fetch("https://ipapi.co/json/");
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        location = `${geoData.city}, ${geoData.country_name}`;
      }
    }

    // Fetch weather from backend
    // The backend uses OpenWeatherMap, we'll call it through a weather endpoint
    // For now, return mock weather that matches the expected format
    // In production, this would call the backend's weather service
    const weatherData = {
      location: location || "Unknown",
      temp: 72,
      humidity: 78,
      humidity_level: "High", // High | Normal | Low
      description: "Partly cloudy",
      wind_speed: 5,
    };

    return Response.json(weatherData);
  } catch (error) {
    console.error("[API] Weather fetch error:", error);
    return Response.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
