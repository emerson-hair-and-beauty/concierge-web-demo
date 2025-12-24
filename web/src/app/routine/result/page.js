"use client";
import React, { useEffect } from "react";
import CustomRoutine from "@/components/custom-routine/CustomRoutine";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { Container, CircularProgress, Box, Typography } from "@mui/material";

export default function RoutineResult() {
  const selections = useOnboardingStore((s) => s.selections) || {};
  const generateRoutine = useOnboardingStore((s) => s.generateRoutine);
  
  const { apiRoutine, isGeneratingRoutine } = selections;

  useEffect(() => {
    // If we're here and not generating and don't have a routine, start it
    // This handles direct navigation or refreshes
    if (!apiRoutine && !isGeneratingRoutine) {
      generateRoutine();
    }
  }, [apiRoutine, isGeneratingRoutine, generateRoutine]);

  if (isGeneratingRoutine || !apiRoutine) {
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
      <CustomRoutine routine={apiRoutine} />
    </Container>
  );
}
