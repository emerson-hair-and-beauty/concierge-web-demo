import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { AC_USAGE_OPTIONS } from "../../constants/onboardingData";

export default function AcUsageStep() {
  const value = useOnboardingStore((s) => s.selections.in_ac);
  const options = AC_USAGE_OPTIONS;

  const description = {
    title: "Time spent in AC",
    description:
      "Air conditioning changes how your hair retains moisture. Are you spending most of your day in AC?",
    footnote: "Climate Exposure",
  };

  return (
    <Box>
      <SingleRadioOnboarding
        options={options}
        description={description}
        stepKey="in_ac"
        value={value}
        onChange={(value) => {
          console.log("in_ac selected:", value);
        }}
      />
    </Box>
  );
}
