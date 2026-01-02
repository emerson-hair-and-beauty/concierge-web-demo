import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { DENSITY_OPTIONS } from "../../constants/onboardingData";

export default function HairDensityStep() {
  const value = useOnboardingStore((s) => s.selections.hair_density);
  const options = DENSITY_OPTIONS;

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
