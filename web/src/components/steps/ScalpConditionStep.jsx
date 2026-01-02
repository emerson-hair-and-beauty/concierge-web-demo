import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { typographyStyles } from "../../styles/typographyStyles";
import { SCALP_OPTIONS } from "../../constants/onboardingData";

export default function ScalpConditionStep() {
  const value = useOnboardingStore((s) => s.selections.scalp_condition);
  const options = SCALP_OPTIONS;

  const description = {
    title: "Describe your scalp",
    description: "What condition best describes your scalp?",
    footnote: "Consider any irritation, dryness, oiliness, or sensitivity",
  };

  return (
    <Box>
      <SingleRadioOnboarding
        options={options}
        description={description}
        stepKey="scalp_condition"
        value={value}
        onChange={(value) => {
          console.log("scalp_condition selected:", value);
          console.log(useOnboardingStore.getState().getSelections());
        }}
      />
    </Box>
  );
}
