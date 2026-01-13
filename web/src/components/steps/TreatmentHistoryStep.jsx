import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { PROCESSING_OPTIONS } from "../../constants/onboardingData";

export default function TreatmentHistoryStep() {
  const value = useOnboardingStore((s) => s.selections.is_damaged);
  const options = PROCESSING_OPTIONS;

 const description = {
  title: "Has your hair been chemically treated?",
  description: "Select the option that best describes your hair's history.",
  footnote:
    "Include professional or at-home color, bleach, relaxers, or permanent waves.",
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
