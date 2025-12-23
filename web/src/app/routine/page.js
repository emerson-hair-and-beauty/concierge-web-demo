"use client";
// import RadioOptionCard from "./components/onboarding/RadioOptionCard";
import { useState } from "react";
import CustomRoutine from "@/components/custom-routine/CustomRoutine";
import { typographyStyles } from "../../styles/typographyStyles";
import { DUMMY_DATA } from "../../data/mockRoutine";
import ProfileSummary from "@/components/routine/ProfileSummary";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { Container, CircularProgress, Box, Typography } from "@mui/material";

// Helper to parse the unstructured content string
const parseProductContent = (content) => {
  // Extract name (everything before "Ingredients:" or just the start)
  const nameMatch = content.split(/Ingredients:|How to use:/)[0].trim();
  // Clean up name if it ends with a dot
  const name = nameMatch.endsWith(".") ? nameMatch.slice(0, -1) : nameMatch;

  // Extract brand - simplistic assumption: First word or two, or just use name as brand for now if unknown
  // For better UI, we can try to guess brand or just leave it empty if not structured.
  // Let's use the first word as "Brand" guess if we want, or just put 'Recommended'
  const brand = "Recommended";

  // Extract Tags
  const tagsMatch = content.match(/Tags:\s*(.*?)(?=\.|Hair finish:|$)/);
  const tags = tagsMatch
    ? tagsMatch[1]
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 3)
    : []; // Limit to 3 tags

  return {
    name,
    brand,
    tags,
  };
};

// Helper to transform the API response into the format CustomRoutine expects
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

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [apiRoutine, setApiRoutine] = useState(null);
  const selections = useOnboardingStore((s) => s.selections) || {};

  const handleCreateRoutine = async () => {
    setLoading(true);
    try {
      const payload = {
        porosity: selections.porosity_level || "Unknown",
        scalp: selections.scalp_condition || "Normal",
        damage: selections.is_damaged || "No",
        density: selections.hair_density || "Medium",
        texture: selections.hair_texture || "Wavy",
      };

      console.log("Creating routine with payload:", payload);

      const response = await fetch("/api/create-routine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data && data.result) {
        setApiRoutine(transformRoutineData(data));
      }
    } catch (error) {
      console.error("Error creating routine:", error);
    } finally {
      setLoading(false);
    }
  };

  const profile = {
    porosity: selections.porosity_level || "Unknown",
    texture: selections.hair_texture || "—",
    density: selections.hair_density || "—",
    damage: selections.is_damaged || "—",
    scalp: selections.scalp_condition || "—",
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ color: '#2D5A4A', mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#2D5A4A', fontWeight: 500 }}>
            Generating your custom hair care routine...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      {apiRoutine ? (
        <CustomRoutine routine={apiRoutine} />
      ) : (
        <ProfileSummary
          profile={profile}
          onViewRoutine={handleCreateRoutine}
        />
      )}
    </Container>
  );
}
