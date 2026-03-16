import React from "react";

export const GCC_COUNTRIES = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Jordan",
  "Egypt",
  "Lebanon",
  "Iraq",
  "Yemen",
  "Libya",
  "Morocco",
  "Tunisia",
  "Algeria",
  "Sudan",
  "Other",
];

export const HAIR_LENGTH_OPTIONS = [
  { value: "short", label: "Short", description: "Above chin" },
  { value: "chin_to_shoulder", label: "Chin to Shoulder", description: "Chin to shoulder length" },
  { value: "shoulder_to_midback", label: "Shoulder to Mid-Back", description: "Shoulder to mid-back" },
  { value: "midback_to_waist", label: "Mid-Back to Waist", description: "Mid-back to waist" },
  { value: "waist_plus", label: "Waist Length or Longer", description: "Waist length or longer" },
];

export const GENDER_OPTIONS = [
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "non_binary", label: "Non-binary" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export const HUMIDITY_RESPONSE_OPTIONS = [
  {
    value: "frizzy",
    label: "Expand and become frizzy",
    description: "My curls puff up and lose shape in humidity.",
    icon: "humidity_frizzy",
  },
  {
    value: "lose_definition",
    label: "Lose definition",
    description: "My curls fall flat or separate when it's humid.",
    icon: "humidity_limp",
  },
  {
    value: "stable",
    label: "Stay mostly the same",
    description: "Humidity doesn't affect my curls much.",
    icon: "humidity_stable",
  },
];

export const HAIR_GOALS_OPTIONS = [
  { value: "definition", label: "Long-lasting definition" },
  { value: "elongation", label: "Elongation" },
  { value: "moisture", label: "Moisture retention" },
  { value: "growth", label: "Hair growth & length retention" },
  { value: "volume", label: "Volume" },
  { value: "frizz_control", label: "Frizz control" },
  { value: "scalp_health", label: "Scalp health" },
];

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
    value: "wavy",
    label: "Soft waves",
    description: "Your hair dries into gentle, flowing S-shaped waves.",
    icon: "texture_wavy",
  },
  {
    value: "loose_curls",
    label: "Loose curls",
    description: "Your hair forms clearly defined, springy loops.",
    icon: "texture_curly",
  },
  {
    value: "spring_curls",
    label: "Spring curls",
    description: "Tight, bouncy ringlets that spring when stretched.",
    icon: "texture_coily",
  },
  {
    value: "tight_coils",
    label: "Tight coils",
    description: "Dense zig-zag or coil patterns with significant shrinkage.",
    icon: "texture_straight",
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