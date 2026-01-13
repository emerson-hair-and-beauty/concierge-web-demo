import React from "react";
// ... (Your existing Icon imports)

export const SCALP_OPTIONS = [
  {
    value: "oily",
    label: "Oily",
    description: "Feels greasy or 'flat' just a day after washing; prone to buildup.",
    icon: "scalp_oily",
  },
  {
    value: "dry",
    label: "Dry",
    description: "Often feels tight, itchy, or shows fine flakes; lacks natural shine.",
    icon: "scalp_dry",
  },
  {
    value: "normal",
    label: "Normal",
    description: "Stays fresh for 3+ days; rarely feels too greasy or too tight.",
    icon: "scalp_normal",
  },
  {
    value: "sensitive",
    label: "Sensitive",
    description: "Easily irritated; reacts with redness or stinging to new products.",
    icon: "scalp_sensitive",
  },
];

export const DENSITY_OPTIONS = [
  {
    label: "Thin",
    description: "Individual hairs are fine or sparse; I can easily see my scalp.",
    icon: "density_thin",
  },
  {
    label: "Medium",
    description: "A balanced amount of hair; my scalp is only visible at the part.",
    icon: "density_medium",
  },
  {
    label: "Thick",
    description: "A lot of hair; I can barely see my scalp and hair-ties feel tight.",
    icon: "density_thick",
  },
];

export const TEXTURE_OPTIONS = [
  {
    value: "straight",
    label: "Flat & Straight",
    description: "No matter what I do, my hair stays straight and rarely holds a curl.",
    icon: "texture_straight",
  },
  {
    value: "wavy",
    label: "Loose Waves",
    description: "My hair has a 'bend' or an S-shape, like I just came from the beach.",
    icon: "texture_wavy",
  },
  {
    value: "curly",
    label: "Defined Curls",
    description: "I have actual loops and ringlets that spring back when pulled.",
    icon: "texture_curly",
  },
  {
    value: "coily",
    label: "Tight Coils",
    description: "My hair has very tight patterns and looks much shorter than it actually is.",
    icon: "texture_coily",
  },
];

export const PROCESSING_OPTIONS = [
  {
    label: "Processed",
    description: "My hair has been chemically altered (bleach, color, perms, or relaxers).",
    icon: "check_damaged", // You can keep the icon name or rename it to 'check_processed'
  },
  {
    label: "Natural",
    description: "My hair is 'virgin' or has only been styled with heat tools.",
    icon: "check_solid",
  },
];

export const POROSITY_QUESTIONS = [
  {
    key: "q1",
    question: "How does your hair feel when you slide your fingers up a strand?",
    options: [
      { value: "smooth", label: "Silky & Smooth", icon: "porosity_smooth" },
      { value: "wiry", label: "Slightly Uneven", icon: "porosity_wiry" },
      { value: "rough", label: "Rough or Bumpy", icon: "porosity_rough" },
    ],
  },
  {
    key: "q2",
    question: "In the shower, how long does it take for your hair to get soaked?",
    options: [
      { value: "slowly", label: "A while—water beads off at first", icon: "porosity_slow" },
      { value: "moderately", label: "Normal—gets wet pretty quickly", icon: "porosity_med" },
      { value: "quickly", label: "Instantly—it 'drinks' the water", icon: "porosity_fast" },
    ],
  },
  {
    key: "q3",
    question: "After washing, how long does it take to air-dry completely?",
    options: [
      { value: "slowly", label: "Forever (can take half a day)", icon: "porosity_slow" },
      { value: "moderately", label: "A few hours", icon: "porosity_med" },
      { value: "quickly", label: "Very fast (under an hour)", icon: "porosity_fast" },
    ],
  },
  {
    key: "q4",
    question: "When you apply oils or creams, what happens?",
    options: [
      { value: "no", label: "They sit on top and feel greasy", icon: "porosity_rough" },
      { value: "sometimes", label: "They absorb after a little massage", icon: "porosity_smooth" },
      { value: "yes", label: "They disappear into my hair instantly", icon: "check_solid" },
    ],
  },
  {
    key: "q5",
    question: "How does your hair react to a humid or rainy day?",
    options: [
      { value: "frizzes", label: "It 'poofs' out and gets very frizzy", icon: "texture_coily" },
      { value: "no_change", label: "It stays mostly the same", icon: "check_solid" },
      { value: "gets_flat", label: "It loses volume and goes limp", icon: "texture_straight" },
    ],
  },
  {
    key: "q6",
    question: "How often does your hair feel 'thirsty' or parched?",
    options: [
      { value: "often", label: "Daily—it always feels dry", icon: "porosity_fast" },
      { value: "sometimes", label: "Every few days", icon: "porosity_med" },
      { value: "rarely", label: "Rarely—it stays moisturized", icon: "porosity_slow" },
    ],
  },
];