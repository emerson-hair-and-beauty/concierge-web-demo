import React from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined"; // Represents damage/change
import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { typographyStyles } from "../../styles/typographyStyles";

export default function DamageLevelStep() {
  const value = useOnboardingStore((s) => s.selections.is_damaged);
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

  const description = {
    title: "What's your damage level?",
    description: "Select the option that best describes your hair's condition",
    footnote:
      "Consider chemical treatments, heat styling, and overall hair health",
  };

  return (
    <Box>
      <SingleRadioOnboarding
        options={options}
        description={description}
        stepKey="is_damaged"
        value={value}
        onChange={(value) => {
          console.log("is_damaged selected:", value);
          console.log(useOnboardingStore.getState().getSelections());
        }}
      />
    </Box>
  );
}
