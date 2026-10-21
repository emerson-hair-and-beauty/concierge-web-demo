export async function PATCH(request, { params }) {
  const { id } = params;
  const body = await request.json();

  if (!body.status) {
    return Response.json(
      { error: "status field is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://concierge-jzf8.onrender.com/api/recommendations/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("[API] Recommendation update error:", error);
    return Response.json(
      { error: "Failed to update recommendation" },
      { status: 500 }
    );
  }
}
