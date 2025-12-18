import React from "react";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined"; // Straight
import WavesOutlinedIcon from "@mui/icons-material/WavesOutlined"; // Wavy
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined"; // Curly (or specific curl icon)
import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined"; // Coily/Z-pattern
import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { typographyStyles } from "../../styles/typographyStyles";

export default function HairTextureStep() {
  const value = useOnboardingStore((s) => s.selections.hair_texture);
  const options = [
    {
      label: "Straight",
      description: "Hair falls without a curl pattern (Type 1).",
      icon: <StraightenOutlinedIcon />,
    },
    {
      label: "Wavy",
      description: "Hair forms a loose S-shape (Type 2).",
      icon: <WavesOutlinedIcon />,
    },
    {
      label: "Curly",
      description: "Hair forms spirals, loops, or distinct curls (Type 3).",
      icon: <LoopOutlinedIcon />,
    },
    {
      label: "Coily",
      description: "Hair forms tight coils, zig-zags, or corkscrews (Type 4).",
      icon: <BlurOnOutlinedIcon />,
    },
  ];

  const description = {
    title: "What is your hair pattern?",
    description: "Select the texture that best matches your natural hair",
    footnote: "Choose the pattern closest to your natural, unstyled hair",
  };

  return (
    <Box>
      <SingleRadioOnboarding
        options={options}
        description={description}
        stepKey="hair_texture"
        value={value}
        onChange={(value) => {
          console.log("hair_texture selected:", value);
          console.log(useOnboardingStore.getState().getSelections());
        }}
      />
    </Box>
  );
}
