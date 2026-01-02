import React, { useEffect, useState } from "react";
import RadioOptionCard from "./RadioOptionCard";
import { Box, Chip, Typography } from "@mui/material";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { typographyStyles } from "../../styles/typographyStyles";

// SingleRadioOnboarding now supports optional controlled usage and
// an optional `stepKey` prop. If `stepKey` is provided, the component
// will write the selected label into the onboarding store under that key.
export default function SingleRadioOnboarding({
  options,
  description,
  stepKey, // optional: key to write into the store (e.g. 'scalp_condition')
  value: controlledValue, // optional controlled value (label string or null)
  onChange, // optional change callback receiving (selectedLabel|null)
}) {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (controlledValue !== undefined && controlledValue !== null) {
      const idx = options.findIndex((o) => o.label === controlledValue);
      return idx >= 0 ? idx : null;
    }
    return null;
  });

  // Keep internal index in sync when controlledValue changes
  useEffect(() => {
    if (controlledValue !== undefined) {
      const idx = options.findIndex((o) => o.label === controlledValue);
      setSelectedIndex(idx >= 0 ? idx : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledValue, options]);

  const handleOptionClick = (index) => {
    const newIndex = selectedIndex === index ? null : index;
    setSelectedIndex(newIndex);

    const selectedLabel = newIndex === null ? null : options[newIndex].label;

    // call provided onChange callback
    if (onChange) onChange(selectedLabel);

    // If stepKey present, update the global onboarding store directly
    if (stepKey) {
      useOnboardingStore.getState().setSelection(stepKey, selectedLabel);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: "600px", // Better for readability and containment
        mx: "auto"
      }}
    >
      <Box sx={{ width: "100%", textAlign: "left", mb: 1 }}>
        <Typography sx={{ 
          ...typographyStyles.h2,
          fontSize: { xs: "1.5rem", md: "2rem" },
          mb: 0.5
        }}>
          {description.title}
        </Typography>
        <Typography sx={{ 
          ...typographyStyles.caption, 
          color: "#0009",
          fontSize: { xs: "0.85rem", md: "1rem" }
        }}>
          {description.description}
        </Typography>
      </Box>
      
      <Box sx={{ 
        width: "100%", 
        display: "flex", 
        flexDirection: "column", 
        gap: 2 
      }}>
        {options.map((option, index) => (
          <Box
            key={index}
            onClick={() => handleOptionClick(index)}
            sx={{
              width: "100%",
              cursor: "pointer",
            }}
          >
            <RadioOptionCard
              option={option}
              isChecked={selectedIndex === index}
            />
          </Box>
        ))}
      </Box>

      <Chip
        label={description.footnote}
        sx={{ 
          ...typographyStyles, 
          backgroundColor: "#F2F8F4", 
          mt: 2,
          px: 2, 
          py: 1.5,
          height: "auto",
          maxWidth: "100%",
          "& .MuiChip-label": {
            display: "block",
            whiteSpace: "normal",
            textAlign: "center",
            fontSize: { xs: "0.75rem", md: "0.875rem" }
          }
        }}
      />
    </Box>
  );
}
