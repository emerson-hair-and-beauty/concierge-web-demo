"use client";
import ScalpConditionStep from "@/components/steps/ScalpConditionStep";

import React, { useState } from "react";

export default function Onboarding() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Scalp Condition",
      component: <ScalpConditionStep />,
    },
    {
      title: "Density",
      component: <HairDensityStep />,
    },
    { title: "Porosity", component: <PorosityStep /> },
    { title: "Damage Level", component: <DamageLevelStep /> },
    { title: "Hair Texture", component: <HairTexture /> },
  ];

  return (
    <Box>
      {steps[activeStep].component}
      <Button
        onClick={() =>
          setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
        }
      ></Button>
    </Box>
  );
}
