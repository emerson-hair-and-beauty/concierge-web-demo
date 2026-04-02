import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { userId } = params;
  
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://concierge-jzf8.onrender.com';
    const response = await fetch(`${apiUrl}/api/scenarios/routine/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({}, { status: 200 }); // Return empty object if no routine found
      }
      const errorText = await response.text();
      return NextResponse.json({ error: "Backend error", details: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching routine:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
