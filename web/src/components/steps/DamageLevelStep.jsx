import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { DAMAGE_OPTIONS } from "../../constants/onboardingData";

export default function DamageLevelStep() {
  const value = useOnboardingStore((s) => s.selections.is_damaged);
  const options = DAMAGE_OPTIONS;

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
