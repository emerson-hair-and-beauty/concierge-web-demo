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
    const { uid, ...payload } = body;
    
    console.log("Proxying request to Orchestrator:", payload);

    const response = await fetch("https://concierge-jzf8.onrender.com/orchestrator/run-orchestrator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      return NextResponse.json(
        { error: "Orchestrator returned non-JSON response", details: text },
        { status: 500 }
      );
    }

    const data = await response.json();
    const transformed = transformRoutineData(data);

    // If UID is provided, save to Firestore
    if (uid && transformed) {
      try {
        await setDoc(doc(db, "users", uid, "data", "routine"), {
          ...transformed,
          updatedAt: serverTimestamp(),
        });
        console.log(`Routine saved to Firestore for user: ${uid}`);
      } catch (fsError) {
        console.error("Error saving to Firestore in API:", fsError);
        // We don't fail the whole request just because Firestore save failed
      }
    }

    return NextResponse.json(transformed);
    
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

export const dynamic = 'force-dynamic';