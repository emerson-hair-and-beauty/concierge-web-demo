import React, { useState } from "react";
import RadioOptionCard from "./RadioOptionCard";
import { Box } from "@mui/material";

export default function SingleRadioOnboarding({ options }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleOptionClick = (index) => {
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        width: "100%", // Ensure container takes full width of parent
      }}
    >
      {options.map((option, index) => (
        <Box
          key={index}
          onClick={() => handleOptionClick(index)}
          sx={{
            // RESPONISVE WIDTH:
            // xs (mobile): 100% width
            // sm (tablet): 80% width
            // md (desktop): 50% width
            width: { xs: "100%", sm: "80%", md: "50%" },
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
  );
}
