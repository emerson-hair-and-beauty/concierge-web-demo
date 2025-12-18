import React from "react";
import LineWeightIcon from "@mui/icons-material/LineWeight"; // Represents thinness/lightness
import BalanceOutlinedIcon from "@mui/icons-material/BalanceOutlined"; // Represents medium/balance
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined"; // Represents thickness/high density
import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { typographyStyles } from "../../styles/typographyStyles";

export default function HairDensityStep() {
  const value = useOnboardingStore((s) => s.selections.hair_density);
  const options = [
    {
      label: "Thin",
      description: "Hair is sparse and fine; scalp is easily visible.",
      icon: <LineWeightIcon />,
    },
    {
      label: "Medium",
      description:
        "Hair is neither sparse nor extremely thick; scalp is semi-visible.",
      icon: <BalanceOutlinedIcon />,
    },
    {
      label: "Thick",
      description: "Hair is abundant and coarse; scalp is difficult to see.",
      icon: <DensityMediumOutlinedIcon />,
    },
  ];

  const description = {
    title: "What's your hair density?",
    description: "How thick does your hair feel overall?",
    footnote:
      "Tie your hair in a ponytail and measure the circumference for a more accurate assessment",
  };

  return (
    <Box>
      <SingleRadioOnboarding
        options={options}
        description={description}
        stepKey="hair_density"
        value={value}
        onChange={(value) => {
          console.log("hair_density selected:", value);
          console.log(useOnboardingStore.getState().getSelections());
        }}
      />
    </Box>
  );
}
