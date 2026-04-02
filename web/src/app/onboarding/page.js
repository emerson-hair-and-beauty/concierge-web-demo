"use client";

import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import { typographyStyles } from "../../styles/typographyStyles";
import { useRouter } from "next/navigation";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { useUserData } from "@/hooks/useUserData";
import { calculatePorosityLevel } from "@/utils/porosityScoring";
import { POROSITY_QUESTIONS } from "@/constants/onboardingData";

// Steps
import AboutYouStep from "@/components/steps/AboutYouStep";
import HairTextureStep from "@/components/steps/HairTextureStep";
import HairDensityStep from "@/components/steps/HairDensityStep";
import PorosityStep from "@/components/steps/PorosityStep";
import HumidityResponseStep from "@/components/steps/HumidityResponseStep";
import HairGoalsStep from "@/components/steps/HairGoalsStep";
import ScalpConditionStep from "@/components/steps/ScalpConditionStep";
import TreatmentHistoryStep from "@/components/steps/TreatmentHistoryStep";
import ProfileCreatingStep from "@/components/steps/ProfileCreatingStep";
import GoogleAuthStep from "@/components/steps/GoogleAuthStep";
import PhotoUploadStep from "@/components/steps/PhotoUploadStep";
import { syncToKlaviyo } from "@/app/actions/klaviyo";

const DARK_GREEN = "#2D5A4A";
const SAGE = "#95ABA1";
const LIGHT_BG = "#FDFCF9";
const SAND_GOLD = "#FFD97B";

// ─────────────────────────────────────────────────────────────
// SCREEN 0: Welcome — no progress bar, full-page splash
// ─────────────────────────────────────────────────────────────
function WelcomeScreen({ onStart }) {
  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          height: ["100vh", "100dvh"],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: DARK_GREEN,
          color: "#FFF",
          textAlign: "center",
          px: 3,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-30%",
            right: "-20%",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.04)",
            pointerEvents: "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-20%",
            left: "-15%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.03)",
            pointerEvents: "none",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            letterSpacing: 3,
            fontSize: { xs: "0.8rem", md: "0.9rem" },
            color: SAND_GOLD,
            mb: 5,
            position: "relative",
            zIndex: 2,
          }}
        >
          EMERSON
        </Typography>

        <Box sx={{ position: "relative", zIndex: 2, maxWidth: 480 }}>
          <Typography
            sx={{
              fontSize: { xs: "2.4rem", md: "3.2rem" },
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              mb: 2.5,
            }}
          >
            Welcome to{" "}
            <Box component="span" sx={{ color: SAND_GOLD, fontStyle: "italic", fontWeight: 400 }}>
              Emerson
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              mb: 2,
            }}
          >
            Where curl care meets intelligence.
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.88rem", md: "1rem" },
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              mb: 6,
              maxWidth: 380,
              mx: "auto",
            }}
          >
            Create your personalised curl profile and discover exactly what your hair needs.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={onStart}
            sx={{
              bgcolor: SAND_GOLD,
              color: DARK_GREEN,
              px: 6,
              py: 2,
              borderRadius: "100px",
              fontWeight: 800,
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: "0 8px 32px rgba(255,217,123,0.35)",
              "&:hover": {
                bgcolor: "#ffcf45",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 40px rgba(255,217,123,0.45)",
              },
              transition: "all 0.25s ease",
            }}
          >
            Create My Curl Profile
          </Button>

          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.35)",
              mt: 3,
            }}
          >
            Takes 30–45 seconds
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN ONBOARDING FLOW
// ─────────────────────────────────────────────────────────────

const QUESTION_STEPS = [
  {
    key: "about_you",
    title: "About You",
    stepLabel: 1,
    component: <AboutYouStep />,
    validate: (sel) => !!(sel.first_name?.trim() && sel.location && sel.gender && sel.hair_length),
  },
  {
    key: "photo_upload",
    title: "Hair Photo",
    stepLabel: 2,
    component: <PhotoUploadStep />,
    validate: (sel) => true, // Optional step
  },
  {
    key: "hair_texture",
    title: "Curl Pattern",
    stepLabel: 3,
    component: <HairTextureStep />,
    validate: (sel) => !!sel.texture,
  },
  {
    key: "hair_density",
    title: "Hair Density",
    stepLabel: 4,
    component: <HairDensityStep />,
    validate: (sel) => !!sel.density,
  },
  {
    key: "hair_porosity",
    title: "Moisture Behaviour",
    stepLabel: 5,
    component: <PorosityStep />,
    validate: (sel) =>
      sel.hair_porosity &&
      POROSITY_QUESTIONS.every(
        (q) => sel.hair_porosity[q.key] !== undefined && sel.hair_porosity[q.key] !== null
      ),
  },
  {
    key: "humidity_response",
    title: "Humidity Response",
    stepLabel: 6,
    component: <HumidityResponseStep />,
    validate: (sel) => !!sel.humidity_response,
  },
  {
    key: "scalp_condition",
    title: "Scalp Health",
    stepLabel: 7,
    component: <ScalpConditionStep />,
    validate: (sel) => !!sel.scalp_condition,
  },
  {
    key: "treatment_history",
    title: "Treatment History",
    stepLabel: 8,
    component: <TreatmentHistoryStep />,
    validate: (sel) => !!sel.is_damaged,
  },
  {
    key: "hair_goals",
    title: "Curl Goals",
    stepLabel: 9,
    component: <HairGoalsStep />,
    validate: (sel) => Array.isArray(sel.hair_goals) && sel.hair_goals.length > 0,
  },
];

const TOTAL_QUESTION_STEPS = 9;
const GOOGLE_STEP_INDEX = 9;
const LOADING_STEP_INDEX = 10;

export default function Onboarding() {
  const [screen, setScreen] = useState(-1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const selections = useOnboardingStore((s) => s.selections) || {};
  const setSelection = useOnboardingStore((s) => s.setSelection);
  const saveSummary = useOnboardingStore((s) => s.saveSummary);
  const { user } = useUserData();

  const isFirstQuestion = screen === 0;
  const isLastQuestion = screen === TOTAL_QUESTION_STEPS - 1;
  const isGoogleScreen = screen === GOOGLE_STEP_INDEX;
  const isLoadingScreen = screen === LOADING_STEP_INDEX;

  const currentStep = screen >= 0 && screen < TOTAL_QUESTION_STEPS ? QUESTION_STEPS[screen] : null;
  const isCurrentStepValid = currentStep ? currentStep.validate(selections) : false;

  const progress = screen >= 0 && screen < TOTAL_QUESTION_STEPS ? ((screen + 1) / TOTAL_QUESTION_STEPS) * 100 : 0;

  const handleNext = () => {
    if (isLastQuestion) {
      if (user) {
        handleSyncAndProgress();
      } else {
        setScreen(GOOGLE_STEP_INDEX);
      }
    } else {
      setScreen((prev) => prev + 1);
    }
  };

  const handleSyncAndProgress = async (authUser = null) => {
    try {
      const emailToSync = authUser?.email || user?.email;
      if (emailToSync) {
        const klaviyoData = {
          email: emailToSync,
          first_name: selections.first_name,
          location: selections.location,
          gender: selections.gender,
          hair_length: selections.hair_length,
          texture: selections.texture,
          density: selections.density,
          moisture_behaviour: calculatePorosityLevel(selections.hair_porosity),
          humidity_response: selections.humidity_response,
          hair_goals: selections.hair_goals,
          hair_photo_url: selections.hair_photo_url || null,
        };
        syncToKlaviyo(klaviyoData).catch(err => console.error("Klaviyo sync failed:", err));
      }
    } catch (e) {
      console.error("Error preparing Klaviyo data:", e);
    }
    setScreen(LOADING_STEP_INDEX);
  };

  const handleBack = () => {
    if (screen > 0) setScreen((prev) => prev - 1);
  };

  const handleGoogleComplete = (authUser) => {
    handleSyncAndProgress(authUser);
  };

  const handleLoadingComplete = useCallback(() => {
    if (selections.hair_porosity && !selections.moisture_behaviour) {
      const level = calculatePorosityLevel(selections.hair_porosity);
      setSelection("moisture_behaviour", level);
    }
    if (user) {
      saveSummary(user.uid);
    }
    router.push("/profile");
  }, [selections, user, saveSummary, setSelection, router]);

  // Welcome Screen
  if (screen === -1) {
    return <WelcomeScreen onStart={() => setScreen(0)} />;
  }

  // Google Auth Screen
  if (isGoogleScreen) {
    return (
      <Box sx={{ height: ["100vh", "100dvh"], display: "flex", flexDirection: "column", bgcolor: LIGHT_BG, overflow: "hidden" }}>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", px: 3 }}>
          <GoogleAuthStep onComplete={handleGoogleComplete} />
        </Box>
      </Box>
    );
  }

  // Loading Screen
  if (isLoadingScreen) {
    return (
      <Box sx={{ height: ["100vh", "100dvh"], display: "flex", flexDirection: "column", bgcolor: LIGHT_BG, overflow: "hidden" }}>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 3, md: 6 } }}>
          <ProfileCreatingStep onComplete={handleLoadingComplete} />
        </Box>
      </Box>
    );
  }

  // Question Steps
  return (
    <Box sx={{ height: ["100vh", "100dvh"], display: "flex", flexDirection: "column", bgcolor: LIGHT_BG, overflow: "hidden" }}>
      <Box sx={{ width: "100%", px: { xs: 2.5, sm: 4, md: 8 }, pt: { xs: 2.5, md: 4 }, pb: 1.5, flexShrink: 0 }}>
        <Box sx={{ maxWidth: "800px", mx: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
            <Typography sx={{ fontWeight: 800, letterSpacing: 2, fontSize: "0.8rem", color: DARK_GREEN, opacity: 0.7 }}>EMERSON</Typography>
            <Typography variant="body2" sx={{ ...typographyStyles, fontWeight: 600, fontSize: "0.82rem", color: SAGE }}>Step {currentStep?.stepLabel} of {TOTAL_QUESTION_STEPS}</Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ height: { xs: 5, md: 6 }, borderRadius: 4, bgcolor: "rgba(0,0,0,0.05)", "& .MuiLinearProgress-bar": { bgcolor: DARK_GREEN, borderRadius: 4, transition: "transform 0.4s ease" } }} />
          <Typography sx={{ ...typographyStyles, color: DARK_GREEN, fontWeight: 600, fontSize: { xs: "0.78rem", md: "0.9rem" }, mt: 1, opacity: 0.65, letterSpacing: "0.04em", textTransform: "uppercase" }}>{currentStep?.title}</Typography>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto", width: "100%", px: { xs: 2.5, sm: 4, md: 8 }, pb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Fade in key={screen} timeout={350}>
          <Box sx={{ width: "100%", maxWidth: "800px", mt: { xs: 2, md: 3 } }}>{currentStep?.component}</Box>
        </Fade>
      </Box>

      <Box sx={{ width: "100%", px: { xs: 2.5, sm: 4, md: 8 }, py: { xs: 2, md: 2.5 }, flexShrink: 0, bgcolor: "#FFF", borderTop: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 -4px 20px rgba(0,0,0,0.02)" }}>
        <Box sx={{ maxWidth: "800px", mx: "auto", display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Button onClick={handleBack} disabled={isFirstQuestion} variant="outlined" size={isMobile ? "medium" : "large"} sx={{ minWidth: { xs: "90px", sm: 120 }, color: SAGE, borderColor: SAGE, borderRadius: "12px", textTransform: "none", fontWeight: 600 }}>Previous</Button>
          <Button onClick={handleNext} variant="contained" disabled={!isCurrentStepValid} size={isMobile ? "medium" : "large"} sx={{ minWidth: { xs: "160px", sm: 200 }, borderRadius: "12px", textTransform: "none", fontWeight: 700, fontSize: { xs: "0.92rem", md: "1rem" }, bgcolor: isCurrentStepValid ? DARK_GREEN : SAGE }}>{isLastQuestion ? "Create My Curl Profile" : "Next Step"}</Button>
        </Box>
      </Box>
    </Box>
  );
}
