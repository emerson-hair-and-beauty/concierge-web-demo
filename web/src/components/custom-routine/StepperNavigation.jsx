import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { typographyStyles } from '../../styles/typographyStyles';

export default function StepperNavigation({ 
  totalSteps, 
  currentStep, 
  completedSteps, 
  onStepChange 
}) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderTop: '2px solid #e7e5e4',
        py: 1.5,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
        boxShadow: '0 -8px 16px -4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      {/* Step counter */}
      <Typography
        variant="caption"
        sx={{
          ...typographyStyles,
          color: '#78716c',
          fontWeight: 500,
        }}
      >
        Step {currentStep + 1} of {totalSteps}
      </Typography>

      {/* Step indicators */}
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index === currentStep;
          const isCompleted = completedSteps[index];

          return (
            <Box
              key={index}
              onClick={() => onStepChange(index)}
              sx={{
                width: isActive ? 12 : 10,
                height: isActive ? 12 : 10,
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: isActive 
                  ? '#2D5B4B' 
                  : isCompleted 
                  ? '#86EFAC' 
                  : '#d6d3d1',
                '&:hover': {
                  transform: 'scale(1.2)',
                  bgcolor: isActive 
                    ? '#2D5B4B' 
                    : isCompleted 
                    ? '#4ADE80' 
                    : '#a8a29e',
                },
              }}
            >
              {isCompleted && !isActive && (
                <CheckCircleIcon
                  sx={{
                    fontSize: 16,
                    color: '#166534',
                    position: 'absolute',
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
