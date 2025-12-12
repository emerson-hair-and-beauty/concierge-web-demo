import React from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined"; // Represents damage/change
import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";

export default function DamageLevelStep() {
  const options = [
    {
      label: "Yes",
      description:
        "Hair has been chemically treated (color, bleach, perms, relaxers).",
      icon: <BrokenImageOutlinedIcon />,
    },
    {
      label: "No",
      description: "Hair is virgin or has only been treated with heat.",
      icon: <CheckCircleOutlineOutlinedIcon />,
    },
  ];

  return (
    <Box>
      <SingleRadioOnboarding options={options} />
    </Box>
  );
}
