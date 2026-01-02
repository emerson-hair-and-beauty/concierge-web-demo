import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { TEXTURE_OPTIONS } from "../../constants/onboardingData";

export default function HairTextureStep() {
  const value = useOnboardingStore((s) => s.selections.hair_texture);
  const options = TEXTURE_OPTIONS;

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
