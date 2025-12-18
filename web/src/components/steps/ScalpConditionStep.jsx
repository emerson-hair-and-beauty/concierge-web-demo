import OpacityIcon from "@mui/icons-material/Opacity";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";
import useOnboardingStore from "../../hooks/useOnboardingStore";
import { typographyStyles } from "../../styles/typographyStyles";

export default function ScalpConditionStep() {
  const value = useOnboardingStore((s) => s.selections.scalp_condition);
  const options = [
    {
      label: "Oily",
      description: "Prone to sebum buildup, requires frequent cleansing.",
      icon: <OpacityIcon />,
    },
    {
      label: "Dry",
      description: "Prone to flaking, tightness, and itching/irritation.",
      icon: <WbSunnyIcon />,
    },
    {
      label: "Normal",
      description: "Well-balanced, healthy, and easy to manage.",
      icon: <CheckCircleOutlineOutlinedIcon />,
    },
    {
      label: "Sensitive",
      description:
        "Reacts easily to products, prone to redness and discomfort.",
      icon: <WarningAmberOutlinedIcon />,
    },
  ];

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
