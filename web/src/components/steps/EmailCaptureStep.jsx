"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { typographyStyles } from "@/styles/typographyStyles";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";

const DARK_GREEN = "#2D5A4A";

export default function EmailCaptureStep({ onComplete }) {
  const email = useOnboardingStore((s) => s.selections.email);
  const setSelection = useOnboardingStore((s) => s.setSelection);
  const [localEmail, setLocalEmail] = useState(email || "");
  const [error, setError] = useState("");

  const validateEmail = (e) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    if (!isValid && e.length > 0) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(localEmail)) {
      setSelection("email", localEmail);
      if (onComplete) onComplete();
    } else if (localEmail.length === 0) {
      setError("Email is required to send your results");
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", textAlign: "center", py: 4 }}>
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "16px",
          bgcolor: "rgba(45,90,74,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 3,
        }}
      >
        <MarkEmailReadOutlinedIcon sx={{ fontSize: 32, color: DARK_GREEN }} />
      </Box>

      <Typography
        sx={{
          ...typographyStyles.h2,
          fontSize: { xs: "1.5rem", md: "1.9rem" },
          fontWeight: 800,
          color: DARK_GREEN,
          mb: 1.5,
        }}
      >
        Where should we send your results?
      </Typography>

      <Typography
        sx={{
          fontSize: "0.95rem",
          color: "#666",
          mb: 4,
          lineHeight: 1.6,
        }}
      >
        Enter your email to save your curl profile and receive your personalised
        routine breakdown.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="your@email.com"
          value={localEmail}
          onChange={(e) => {
            setLocalEmail(e.target.value);
            if (error) validateEmail(e.target.value);
          }}
          error={!!error}
          helperText={error}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: "#FFF",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: DARK_GREEN,
                borderWidth: "2px",
              },
            },
            "& .MuiInputBase-input": {
              py: 1.8,
              fontSize: "1rem",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{
            bgcolor: DARK_GREEN,
            color: "#FFF",
            py: 1.8,
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: "0 4px 14px rgba(45,90,74,0.2)",
            "&:hover": {
              bgcolor: "#265040",
              boxShadow: "0 6px 20px rgba(45,90,74,0.3)",
            },
          }}
        >
          Send My Results
        </Button>
      </form>
    </Box>
  );
}
