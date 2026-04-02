import { NextResponse } from 'next/server';
import { db } from '@/config/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const runtime = 'nodejs';

// Helper to parse the unstructured content string (copied from store for consistency)
const parseProductContent = (content) => {
  const nameMatch = content.split(/Ingredients:|How to use:/)[0].trim();
  const name = nameMatch.endsWith(".") ? nameMatch.slice(0, -1) : nameMatch;
  const brand = "Recommended";
  const tagsMatch = content.match(/Tags:\s*(.*?)(?=\.|Hair finish:|$)/);
  const tags = tagsMatch
    ? tagsMatch[1]
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 3)
    : [];
  return { name, brand, tags };
};

// Helper to transform the API response (copied from store for consistency)
// NOTE: This function explicitly picks only the necessary fields, 
// which ensures that 'thinking' or 'reasoning' data is NOT saved to Firestore.
const transformRoutineData = (data) => {
  if (!data || !data.result) return null;
  return {
    profile: "Your Personalized Routine",
    steps: data.result.map((step) => ({
      title: step.step,
      icon:
        step.step === "Cleanse"
          ? "💧"
          : step.step === "Condition"
          ? "🚿"
          : step.step === "Treat"
          ? "✨"
          : step.step.includes("Style")
          ? "🎨"
          : "🧴",
      description: step.action,
      detailedInstructions: step.notes,
      keyIngredients: step.ingredients,
      recommendedProducts: step.products.map((p) =>
        parseProductContent(p.content)
      ),
    })),
  };
};

export async function POST(request) {
  try {
    const body = await request.json();
    // The store now sends user_id, first_name, location, texture, density, moisture_behaviour, humidity_response, hair_goals
    
    console.log("Proxying request to Orchestrator:", JSON.stringify(body));

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://concierge-jzf8.onrender.com';
    const response = await fetch(`${apiUrl}/orchestrator/run-orchestrator`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log("Orchestrator response status:", response.status, response.statusText);

    if (!response.ok) {
       const errorText = await response.text();
       console.error("Backend error:", errorText);
       return NextResponse.json({ error: "Backend error", details: errorText }, { status: response.status });
    }

    // Pass the stream directly through to the frontend
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    
  } catch (error) {
    console.error("Error in API proxy route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';