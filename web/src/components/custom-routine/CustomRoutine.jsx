
import { Box, Container, Typography, Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RoutineStep from './RoutineStep';
import { useRoutineManager } from '../../hooks/useRoutineManager';

export default function CustomRoutine({ routine }) {
  const {
    openStepId,
    completedSteps,
    completedCount,
    handleToggle,
    handleComplete,
    markAllComplete
  } = useRoutineManager(routine.steps.length);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ 
        bgcolor: 'rgba(232, 243, 238, 0.5)', 
        backdropFilter: 'blur(4px)', 
        borderRadius: 6, 
        p: 4, 
        textAlign: 'center', 
        mb: 4 
      }}>
        <Box sx={{ 
          width: 48, 
          height: 48, 
          bgcolor: '#2D5B4B', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          mx: 'auto', 
          mb: 2,
          color: 'white'
        }}>
          <AutoAwesomeIcon />
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#1c1917', mb: 1 }}>
          Your Custom Routine
        </Typography>
        <Typography variant="body1" sx={{ color: '#5F6D68' }}>
          Personalized for: {routine.profile || "Your unique hair type"}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Typography variant="caption" sx={{ color: '#5F6D68' }}>
            {completedCount}/{routine.steps.length}
          </Typography>
        </Box>
      </Box>

      <Box>
        {routine.steps.map((step, index) => (
          <RoutineStep 
            key={index} 
            stepNumber={index + 1} 
            step={step} 
            isOpen={openStepId === index + 1}
            onToggle={handleToggle(index + 1)}
            isComplete={!!completedSteps[index]}
            onComplete={() => handleComplete(index)}
          />
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button 
          fullWidth 
          variant="contained" 
          size="large"
          onClick={markAllComplete}
          sx={{ 
            bgcolor: '#2D5B4B', 
            '&:hover': { bgcolor: '#244A3D' },
            borderRadius: 50,
            py: 1.5,
            textTransform: 'none',
            boxShadow: '0 10px 15px -3px rgba(45, 91, 75, 0.2)'
          }}
        >
          Mark All as Complete
        </Button>
      </Box>
    </Container>
  );
}
