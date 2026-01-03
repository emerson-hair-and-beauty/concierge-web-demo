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
import LineWeightIcon from "@mui/icons-material/LineWeight";
import BalanceOutlinedIcon from "@mui/icons-material/BalanceOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import WavesOutlinedIcon from "@mui/icons-material/WavesOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";

export const SCALP_OPTIONS = [
  {
    value: "oily",
    label: "Oily",
    description: "Prone to sebum buildup, requires frequent cleansing.",
    icon: "scalp_oily",
  },
  {
    value: "dry",
    label: "Dry",
    description: "Prone to flaking, tightness, and itching/irritation.",
    icon: "scalp_dry",
  },
  {
    value: "normal",
    label: "Normal",
    description: "Well-balanced, healthy, and easy to manage.",
    icon: "scalp_normal",
  },
  {
    value: "sensitive",
    label: "Sensitive",
    description: "Reacts easily to products, prone to redness and discomfort.",
    icon: "scalp_sensitive",
  },
];

export const DENSITY_OPTIONS = [
  {
    label: "Thin",
    description: "Hair is sparse and fine; scalp is easily visible.",
    icon: "density_thin",
  },
  {
    label: "Medium",
    description:
      "Hair is neither sparse nor extremely thick; scalp is semi-visible.",
    icon: "density_medium",
  },
  {
    label: "Thick",
    description: "Hair is abundant and coarse; scalp is difficult to see.",
    icon: "density_thick",
  },
];

export const TEXTURE_OPTIONS = [
  {
    label: "Straight",
    description: "Hair falls without a curl pattern (Type 1).",
    icon: "texture_straight",
  },
  {
    label: "Wavy",
    description: "Hair forms a loose S-shape (Type 2).",
    icon: "texture_wavy",
  },
  {
    label: "Curly",
    description: "Hair forms spirals, loops, or distinct curls (Type 3).",
    icon: "texture_curly",
  },
  {
    label: "Coily",
    description: "Hair forms tight coils, zig-zags, or corkscrews (Type 4).",
    icon: "texture_coily",
  },
];

export const DAMAGE_OPTIONS = [
  {
    label: "Yes",
    description:
      "Hair has been chemically treated (color, bleach, perms, relaxers).",
    icon: "check_damaged",
  },
  {
    label: "No",
    description: "Hair is virgin or has only been treated with heat.",
    icon: "check_solid",
  },
];

export const POROSITY_QUESTIONS = [
  {
    key: "q1",
    question: "How does your hair feel when you touch it?",
    options: [
      { value: "smooth", label: "Smooth", icon: "porosity_smooth" },
      { value: "wiry", label: "Wiry", icon: "porosity_wiry" },
      { value: "rough", label: "Rough", icon: "porosity_rough" },
    ],
  },
  {
    key: "q2",
    question: "How long does it take for your hair to get fully wet?",
    options: [
      { value: "slowly", label: "Slowly", icon: "porosity_slow" },
      { value: "moderately", label: "Moderately", icon: "porosity_med" },
      { value: "quickly", label: "Quickly", icon: "porosity_fast" },
    ],
  },
  {
    key: "q3",
    question: "How long does it take for your hair to dry?",
    options: [
      { value: "slowly", label: "Slowly", icon: "porosity_slow" },
      { value: "moderately", label: "Moderately", icon: "porosity_med" },
      { value: "quickly", label: "Quickly", icon: "porosity_fast" },
    ],
  },
  {
    key: "q4",
    question: "Does your hair absorb products easily?",
    options: [
      { value: "yes", label: "Yes", icon: "check_solid" },
      { value: "sometimes", label: "Sometimes", icon: "porosity_smooth" },
      { value: "no", label: "No", icon: "porosity_rough" },
    ],
  },
  {
    key: "q5",
    question: "How does your hair react to humidity?",
    options: [
      { value: "frizzes", label: "Frizzes", icon: "texture_coily" },
      { value: "no_change", label: "No Change", icon: "check_solid" },
      { value: "gets_flat", label: "Gets Flat", icon: "texture_straight" },
    ],
  },
  {
    key: "q6",
    question: "How often does your hair need moisturizing?",
    options: [
      { value: "often", label: "Often", icon: "porosity_fast" },
      { value: "sometimes", label: "Sometimes", icon: "porosity_med" },
      { value: "rarely", label: "Rarely", icon: "porosity_slow" },
    ],
  },
];
