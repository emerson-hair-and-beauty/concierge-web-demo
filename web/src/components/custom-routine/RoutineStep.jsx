import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Box, Button } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ProductCard from './ProductCard';
// import { useAutoScroll } from '../../hooks/useAutoScroll';

export default function RoutineStep({ step, stepNumber, isOpen, onToggle, isComplete, onComplete }) {
  // Removed useAutoScroll

  return (
    <Accordion 
      expanded={isOpen} 
      onChange={onToggle}
      disableGutters
      elevation={0}
      sx={{ 
        border: '1px solid',
        borderColor: isComplete ? '#bbf7d0' : '#e7e5e4', 
        bgcolor: isComplete ? '#f0fdf4' : 'white', // Slightly green background if complete
        borderRadius: '16px !important', 
        mb: 2,
        '&:before': { display: 'none' },
        overflow: 'hidden',
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#a8a29e' }} />}
        aria-controls={`panel${stepNumber}-content`}
        id={`panel${stepNumber}-header`}
        sx={{ p: 2 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
          <Box sx={{ 
            width: 48, 
            height: 48, 
            borderRadius: '50%', 
            bgcolor: isComplete ? '#dcfce7' : '#E8F3EE', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#2D5B4B',
            flexShrink: 0,
            transition: 'background-color 0.3s ease'
          }}>
             {isComplete ? <CheckCircleIcon sx={{ color: '#16a34a' }} /> : (step.icon ? <Typography variant="h6">{step.icon}</Typography> : <Typography variant="subtitle1" fontWeight="bold">{stepNumber}</Typography>)}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: '#78716c', fontWeight: 500 }}>Step {stepNumber}</Typography>
            </Box>
            <Typography variant="h6" sx={{ color: '#1c1917', fontWeight: 600, mb: 0.5 }}>{step.title}</Typography>
            <Typography variant="body2" sx={{ color: '#57534e' }}>{step.description}</Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 3, pt: 0, borderTop: '1px solid', borderColor: isComplete ? '#bbf7d0' : '#f5f5f4' }}>
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#1c1917', fontWeight: 600 }}>Detailed Instructions</Typography>
          <Typography variant="body2" sx={{ color: '#57534e', whiteSpace: 'pre-line' }}>
            {step.detailedInstructions}
          </Typography>
        </Box>

        {/* <Box sx={{ mb:  }}>
 <Typography variant="subtitle2" sx={{ mb: 2, color: '#1c1917', fontWeight: 600 }}>Key Ingredients to Look For</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {step.keyIngredients && step.keyIngredients.map((ingredient, idx) => (
              <Box key={idx} sx={{ px: 1.5, py: 0.5, bgcolor: isComplete ? '#dcfce7' : '#E8F3EE', borderRadius: 50 }}>
                <Typography variant="caption" sx={{ color: '#2D5B4B', fontWeight: 500 }}>{ingredient}</Typography>
              </Box>
            ))}
          </Box>
        </Box> */}

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: '#1c1917', fontWeight: 600 }}>Recommended Products</Typography>
          <Grid container spacing={2}>
            {step.recommendedProducts && step.recommendedProducts.map((product, idx) => (
              <Grid key={idx} size={{ xs: 12, md: 4 }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Button 
          fullWidth 
          variant={isComplete ? "outlined" : "contained"}
          size="large"
          startIcon={isComplete ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
          onClick={onComplete}
          sx={{ 
            bgcolor: isComplete ? 'transparent' : '#2D5B4B', 
            color: isComplete ? '#16a34a' : 'white',
            borderColor: isComplete ? '#16a34a' : 'transparent',
            '&:hover': { 
              bgcolor: isComplete ? '#f0fdf4' : '#244A3D',
              borderColor: isComplete ? '#15803d' : 'transparent' 
            },
            borderRadius: 50,
            py: 1.5,
            textTransform: 'none',
            boxShadow: 'none'
          }}
        >
          {isComplete ? "Completed" : "Mark as Complete"}
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}
