import React from "react";
import CheckIcon from "@mui/icons-material/CheckCircleOutline";
import TextureIcon from "@mui/icons-material/Texture";
import OpacityIcon from "@mui/icons-material/Opacity";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SpaIcon from "@mui/icons-material/Spa";
import WavesIcon from "@mui/icons-material/Waves";
import CloudIcon from "@mui/icons-material/Cloud";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const POROSITY_QUESTIONS = [
  {
    key: "q1",
    question: "How does your hair feel when you touch it?",
    options: [
      { value: "smooth", label: "Smooth", icon: <TextureIcon /> },
      { value: "wiry", label: "Wiry", icon: <FlashOnIcon /> },
      { value: "rough", label: "Rough", icon: <SpaIcon /> },
    ],
  },
  {
    key: "q2",
    question: "How long does it take for your hair to get fully wet?",
    options: [
      { value: "quickly", label: "Quickly", icon: <OpacityIcon /> },
      { value: "moderately", label: "Moderately", icon: <WaterDropIcon /> },
      { value: "slowly", label: "Slowly", icon: <WavesIcon /> },
    ],
  },
  {
    key: "q3",
    question: "How long does it take for your hair to dry?",
    options: [
      { value: "quickly", label: "Quickly", icon: <FlashOnIcon /> },
      { value: "moderately", label: "Moderately", icon: <CloudIcon /> },
      { value: "slowly", label: "Slowly", icon: <WavesIcon /> },
    ],
  },
  {
    key: "q4",
    question: "Does your hair absorb products easily?",
    options: [
      { value: "yes", label: "Yes", icon: <CheckIcon /> },
      { value: "sometimes", label: "Sometimes", icon: <OpacityIcon /> },
      { value: "no", label: "No", icon: <ArrowDownwardIcon /> },
    ],
  },
  {
    key: "q5",
    question: "How does your hair react to humidity?",
    options: [
      { value: "frizzes", label: "Frizzes", icon: <CloudIcon /> },
      { value: "no_change", label: "No Change", icon: <CheckIcon /> },
      { value: "gets_flat", label: "Gets Flat", icon: <ArrowDownwardIcon /> },
    ],
  },
  {
    key: "q6",
    question: "Does your hair float or sink in water?",
    options: [
      { value: "floats", label: "Floats", icon: <ArrowUpwardIcon /> },
      { value: "sinks", label: "Sinks", icon: <ArrowDownwardIcon /> },
      { value: "slowly_sinks", label: "Slowly Sinks", icon: <WavesIcon /> },
    ],
  },
  {
    key: "q7",
    question: "How often does your hair need moisturizing?",
    options: [
      { value: "often", label: "Often", icon: <OpacityIcon /> },
      { value: "sometimes", label: "Sometimes", icon: <WaterDropIcon /> },
      { value: "rarely", label: "Rarely", icon: <CheckIcon /> },
    ],
  },
];
