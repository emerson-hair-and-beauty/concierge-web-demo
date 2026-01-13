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
      {/* Fixed Header - Top Left */}
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1100,
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: 3,
          px: 2,
          py: 1,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #f5f5f4'
        }}
      >
        <Typography
          variant="body2"
          sx={{ 
            ...typographyStyles, 
            fontWeight: 600, 
            color: "#2D5B4B",
            mb: 0.25
          }}
        >
          Your Custom Routine
        </Typography>
        <Typography
          variant="caption"
          sx={{ ...typographyStyles, color: "#78716c", fontSize: '0.7rem' }}
        >
          {completedCount}/{routine.steps.length} completed
        </Typography>
      </Box>

      <Container maxWidth="sm" sx={{ pt: 10, pb: 3, flexGrow: 1 }}>
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
