import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Remove the GET handler - let Next.js handle it
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

    const contentType = response.headers.get("content-type");
    
    if (!response.ok) {
      const errorData = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();
      
      console.error("Orchestrator API error:", errorData);
      
      return NextResponse.json(
        { 
          error: "Failed to call orchestrator",
          details: typeof errorData === 'string' ? errorData : errorData
        }, 
        { status: response.status }
      );
    }

    // Ensure we're getting JSON back
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      return NextResponse.json(
        { error: "Orchestrator returned non-JSON response", details: text },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Error in API proxy route:", error);
    return NextResponse.json(
      { 
        error: "Internal Server Error",
        message: error.message,
        details: error.toString()
      }, 
      { status: 500 }
    );
  }
}