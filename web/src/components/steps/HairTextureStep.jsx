import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { TEXTURE_OPTIONS } from "../../constants/onboardingData";

export default function HairTextureStep() {
  const value = useOnboardingStore((s) => s.selections.hair_texture);
  const options = TEXTURE_OPTIONS;

  const description = {
    title: "What is your natural hair pattern?",
    description: "Choose the option that most closely matches your hair in its natural, air-dried state.",
    footnote: "Hair Texture",
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
