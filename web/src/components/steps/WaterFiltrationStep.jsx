import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { WATER_FILTRATION_OPTIONS } from "../../constants/onboardingData";

export default function WaterFiltrationStep() {
  const value = useOnboardingStore((s) => s.selections.has_filtration);
  const options = WATER_FILTRATION_OPTIONS;

  const description = {
    title: "Water at home",
    description:
      "Hard water can leave mineral deposits that affect how your hair feels and behaves. Do you have any kind of water filtration at home?",
    footnote: "Water Quality",
  };

  return (
    <Box>
      <SingleRadioOnboarding
        options={options}
        description={description}
        stepKey="has_filtration"
        value={value}
        onChange={(value) => {
          console.log("has_filtration selected:", value);
        }}
      />
    </Box>
  );
}
