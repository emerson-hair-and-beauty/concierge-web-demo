export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://concierge-jzf8.onrender.com/api/recommendations/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("[API] Recommendations fetch error:", error);
    return Response.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
