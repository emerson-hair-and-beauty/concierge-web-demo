import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { typographyStyles } from "../../styles/typographyStyles";
import RoutineStep from "./RoutineStep";
import StepperNavigation from "./StepperNavigation";
import { useRoutineManager } from "../../hooks/useRoutineManager";

export default function CustomRoutine({ routine }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const {
    completedSteps,
    completedCount,
    handleComplete,
  } = useRoutineManager(routine.steps.length);

  const currentStep = routine.steps[currentStepIndex];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      pb: 12 // Space for fixed stepper navigation
    }}>

      <Container maxWidth="sm" sx={{ pt: 1, pb: 3, flexGrow: 1 }}>
        {/* Current Step Display */}
        <Box>
          <RoutineStep
            stepNumber={currentStepIndex + 1}
            step={currentStep}
            isComplete={!!completedSteps[currentStepIndex]}
            onComplete={() => handleComplete(currentStepIndex)}
          />
        </Box>
      </Container>

      {/* Stepper Navigation */}
      <StepperNavigation
        totalSteps={routine.steps.length}
        currentStep={currentStepIndex}
        completedSteps={completedSteps}
        onStepChange={setCurrentStepIndex}
      />
    </Box>
  );
}
