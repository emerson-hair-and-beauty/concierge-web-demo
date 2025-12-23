import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    console.log("Proxying request to Orchestrator:", body);

    const response = await fetch("https://concierge-jzf8.onrender.com/orchestrator/run-orchestrator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Orchestrator API error:", errorData);
      return NextResponse.json({ error: "Failed to call orchestrator" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API proxy route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
