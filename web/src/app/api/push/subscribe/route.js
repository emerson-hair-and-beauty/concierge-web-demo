export async function POST(request) {
  const body = await request.json();
  const { userId, endpoint, p256dh, auth } = body;

  if (!userId || !endpoint || !p256dh || !auth) {
    return Response.json(
      { error: "All subscription fields are required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      "https://concierge-jzf8.onrender.com/api/push/subscribe",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, endpoint, p256dh, auth }),
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("[API] Push subscription error:", error);
    return Response.json(
      { error: "Failed to subscribe to push notifications" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://concierge-jzf8.onrender.com/api/push/subscribe?user_id=${userId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("[API] Push unsubscribe error:", error);
    return Response.json(
      { error: "Failed to unsubscribe from push notifications" },
      { status: 500 }
    );
  }
}
