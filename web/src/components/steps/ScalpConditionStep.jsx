import OpacityIcon from "@mui/icons-material/Opacity";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Box } from "@mui/material";
import SingleRadioOnboarding from "../onboarding/SingleRadioOnboarding";

export default function ScalpConditionStep() {
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

  return (
    <Box>
      <SingleRadioOnboarding options={options} />
    </Box>
  );
}
