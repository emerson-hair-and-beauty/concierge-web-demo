import React, { useState } from "react";

import { Box, Typography, Card, Stack, Divider, Grid } from "@mui/material";
import {typographyStyles }from "@/styles/typographyStyles";

import { POROSITY_QUESTIONS } from "@/constants/onboardingData";
import useOnboardingStore from "@/hooks/useOnboardingStore";

export default function PorosityStep() {
  const porosity = useOnboardingStore((s) => s.selections.hair_porosity);
  const setPorosity = useOnboardingStore((s) => s.setSelection);

  const handleSelect = (key, value) => {
    setPorosity("hair_porosity", {
      ...porosity,
      [key]: value,
    });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      {/* Header section instead of pagination buttons */}
      <Typography
        sx={{
          ...typographyStyles.h2,
          textAlign: "center",
          mb: 1,
          fontWeight: 700,
        }}
      >
        Porosity Quiz
      </Typography>
      <Typography
        sx={{
          ...typographyStyles.caption,
          textAlign: "center",
          color: "text.secondary",
          mb: 4,
        }}
      >
        Answer the following questions to help us determine your hair's
        porosity.
      </Typography>

      <Stack>
        {POROSITY_QUESTIONS.map((questionItem, index) => {
          const selected = porosity?.[questionItem.key] || null;

          return (
            <Box key={questionItem.key}>
              <Typography
                variant="subtitle1"
                mb={3}
                sx={{ ...typographyStyles.h4 }}
              >
                {`${index + 1}. ${questionItem.question}`}
              </Typography>

              <Grid container spacing={2}>
                {questionItem.options.map((option) => {
                  const isChecked = selected === option.value;
                  return (
                    <Grid item xs={12} sm={4} key={option.value}>
                      <Card
                        onClick={() =>
                          handleSelect(questionItem.key, option.value)
                        }
                        sx={{
                          cursor: "pointer",
                          border: isChecked
                            ? "2px solid #2D5A4A"
                            : "2px solid #e0e0e0",
                          backgroundColor: isChecked ? "#E8F4F0" : "white",
                          boxShadow: isChecked ? 3 : 1,
                          display: "flex",
                          flexDirection: "row", // Horizontal on mobile initially
                          alignItems: "center",
                          px: 2,
                          py: 2,
                          gap: 2,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            borderColor: "#2D5A4A",
                            backgroundColor: isChecked ? "#E8F4F0" : "#fafafa",
                          },
                        }}
                        elevation={0}
                      >
                        <Box
                          sx={{
                            color: isChecked ? "#2D5A4A" : "grey",
                            fontSize: 28,
                            display: "flex",
                          }}
                        >
                          {option.icon}
                        </Box>
                        <Typography
                          sx={{
                            ...typographyStyles.caption,
                            fontWeight: isChecked ? 600 : 400,
                            color: isChecked ? "#2D5A4A" : "text.primary",
                            fontSize: "0.9rem",
                            textAlign: "left"
                          }}
                        >
                          {option.label}
                        </Typography>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
              <Divider sx={{ my: 5 }} />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
