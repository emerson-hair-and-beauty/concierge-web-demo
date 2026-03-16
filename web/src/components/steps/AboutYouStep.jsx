"use client";
import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { typographyStyles } from "@/styles/typographyStyles";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { GCC_COUNTRIES, GENDER_OPTIONS, HAIR_LENGTH_OPTIONS } from "@/constants/onboardingData";

const DARK_GREEN = "#2D5A4A";
const SAGE = "#95ABA1";

export default function AboutYouStep() {
  const selections = useOnboardingStore((s) => s.selections);
  const setSelection = useOnboardingStore((s) => s.setSelection);

  const handleField = (key) => (e) => setSelection(key, e.target.value);

  return (
    <Box sx={{ maxWidth: 520, mx: "auto" }}>
      <Typography
        sx={{
          ...typographyStyles.h2,
          fontSize: { xs: "1.5rem", md: "1.9rem" },
          fontWeight: 800,
          color: DARK_GREEN,
          mb: 0.5,
        }}
      >
        About You
      </Typography>
      <Typography
        sx={{
          fontSize: "0.9rem",
          color: "#666",
          mb: 3.5,
          lineHeight: 1.6,
        }}
      >
        Help us personalise your curl profile.
      </Typography>

      <Stack spacing={3}>
        {/* First Name */}
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          value={selections.first_name || ""}
          onChange={handleField("first_name")}
          sx={fieldSx}
        />

        {/* Country */}
        <TextField
          label="Country"
          variant="outlined"
          select
          fullWidth
          value={selections.country || ""}
          onChange={handleField("country")}
          sx={fieldSx}
        >
          {GCC_COUNTRIES.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        {/* Gender */}
        <Box>
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#888",
              letterSpacing: "0.05em",
              mb: 1.5,
              textTransform: "uppercase",
            }}
          >
            Gender
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {GENDER_OPTIONS.map((g) => (
              <Box
                key={g.value}
                onClick={() => setSelection("gender", g.value)}
                sx={{
                  px: 2.5,
                  py: 1,
                  borderRadius: "100px",
                  border: "1.5px solid",
                  borderColor:
                    selections.gender === g.value ? DARK_GREEN : "rgba(0,0,0,0.15)",
                  bgcolor:
                    selections.gender === g.value
                      ? "rgba(45,90,74,0.07)"
                      : "transparent",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  "&:hover": {
                    borderColor: DARK_GREEN,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: selections.gender === g.value ? 700 : 500,
                    color: selections.gender === g.value ? DARK_GREEN : "#444",
                  }}
                >
                  {g.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Hair Length */}
        <Box>
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#888",
              letterSpacing: "0.05em",
              mb: 1.5,
              textTransform: "uppercase",
            }}
          >
            Hair Length
          </Typography>
          <Stack spacing={1}>
            {HAIR_LENGTH_OPTIONS.map((opt) => (
              <Box
                key={opt.value}
                onClick={() => setSelection("hair_length", opt.value)}
                sx={{
                  px: 2.5,
                  py: 1.5,
                  borderRadius: "12px",
                  border: "1.5px solid",
                  borderColor:
                    selections.hair_length === opt.value
                      ? DARK_GREEN
                      : "rgba(0,0,0,0.1)",
                  bgcolor:
                    selections.hair_length === opt.value
                      ? "rgba(45,90,74,0.07)"
                      : "#FFF",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.18s ease",
                  "&:hover": {
                    borderColor: DARK_GREEN,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: selections.hair_length === opt.value ? 700 : 500,
                    color:
                      selections.hair_length === opt.value ? DARK_GREEN : "#333",
                  }}
                >
                  {opt.label}
                </Typography>
                <Typography sx={{ fontSize: "0.78rem", color: "#999" }}>
                  {opt.description}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2D5A4A",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2D5A4A",
  },
};
