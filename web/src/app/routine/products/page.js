"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { typographyStyles } from "@/styles/typographyStyles";

export default function ProductsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ ...typographyStyles, fontWeight: 700, color: "#2D5A4A" }}
        >
          Your Recommended Products
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ ...typographyStyles, color: "#666" }}
        >
          This is where you'll find the best products for your hair type.
        </Typography>
      </Box>
    </Container>
  );
}
