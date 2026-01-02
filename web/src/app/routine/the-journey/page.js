"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { typographyStyles } from "@/styles/typographyStyles";

export default function JourneyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ ...typographyStyles, fontWeight: 700, color: "#2D5A4A" }}
        >
          Your Hair Journey
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ ...typographyStyles, color: "#666" }}
        >
          Track your progress and see how your hair transforms over time.
        </Typography>
      </Box>
    </Container>
  );
}
