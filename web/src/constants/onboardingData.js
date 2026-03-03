import React from "react";
// ... (Your existing Icon imports)

export const SCALP_OPTIONS = [
  {
    value: "oily",
    label: "Oily",
    description: "Your scalp feels greasy within 1–2 days of washing. You may notice excess oil at the roots or feel the need to wash frequently.",
    icon: "scalp_oily",
  },
  {
    value: "dry",
    label: "Dry",
    description: "Your scalp often feels tight, itchy, or uncomfortable. You may see small white flakes between washes.",
    icon: "scalp_dry",
  },
  {
    value: "normal",
    label: "Balanced",
    description: "Your scalp feels comfortable most of the time. It doesn't become very oily or very dry quickly.",
    icon: "scalp_normal",
  },
  {
    value: "sensitive",
    label: "Sensitive",
    description: "Your scalp reacts easily to new products. You may experience redness, stinging, or irritation.",
    icon: "scalp_sensitive",
  },
];

export const DENSITY_OPTIONS = [
  {
    value: "low",
    label: "Low Density",
    description: "You don't have a lot of hair overall. Your scalp is easy to see, even without parting your hair.",
    icon: "density_thin",
  },
  {
    value: "medium",
    label: "Medium Density",
    description: "You have a moderate amount of hair. Your scalp is mostly visible only where you part it.",
    icon: "density_medium",
  },
  {
    value: "high",
    label: "High Density",
    description: "You have a lot of hair overall. Your scalp is hard to see, and hair ties often feel snug.",
    icon: "density_thick",
  },
];

export const TEXTURE_OPTIONS = [
  {
    value: "straight",
    label: "Straight",
    description: "Your hair dries straight and rarely forms waves or curls.",
    icon: "texture_straight",
  },
  {
    value: "wavy",
    label: "Wavy",
    description: "Your hair forms soft bends or S-shaped waves.",
    icon: "texture_wavy",
  },
  {
    value: "curly",
    label: "Curly",
    description: "Your hair forms visible curls or ringlets that spring back when stretched.",
    icon: "texture_curly",
  },
  {
    value: "coily",
    label: "Coily",
    description: "Your hair forms tight coils or zig-zag patterns and appears shorter due to shrinkage.",
    icon: "texture_coily",
  },
];

export const PROCESSING_OPTIONS = [
  {
    value: "yes",
    label: "Chemically Treated",
    description: "Your hair has been coloured, bleached, relaxed, permed, or permanently altered in any way.",
    icon: "check_damaged",
  },
  {
    value: "no",
    label: "Not Chemically Treated",
    description: "Your hair has not been chemically altered. Heat styling (blow-drying or straightening) does not count.",
    icon: "check_solid",
  },
];

export const POROSITY_QUESTIONS = [
  {
    key: "q2",
    question: "In the shower, how quickly does your hair become fully wet?",
    options: [
      { value: "slowly", label: "Slowly", description: "Water sits on the surface for a while before soaking in.", icon: "porosity_slow" },
      { value: "moderately", label: "Moderately fast", description: "It becomes wet without much delay.", icon: "porosity_med" },
      { value: "quickly", label: "Very quickly", description: "It absorbs water almost immediately.", icon: "porosity_fast" },
    ],
  },
  {
    key: "q3",
    question: "After washing, how long does it take to air-dry completely?",
    options: [
      { value: "slowly", label: "A long time", description: "It can take several hours or more to fully dry.", icon: "porosity_slow" },
      { value: "moderately", label: "A few hours", description: null, icon: "porosity_med" },
      { value: "quickly", label: "Very quickly", description: "It dries within an hour.", icon: "porosity_fast" },
    ],
  },
  {
    key: "q4",
    question: "When you apply oils or creams, what usually happens?",
    options: [
      { value: "no", label: "They sit on the surface and feel heavy", description: null, icon: "porosity_rough" },
      { value: "sometimes", label: "They absorb after some time or light massaging", description: null, icon: "porosity_smooth" },
      { value: "yes", label: "They absorb very quickly and don't feel like they stay on the surface", description: null, icon: "check_solid" },
    ],
  },
];