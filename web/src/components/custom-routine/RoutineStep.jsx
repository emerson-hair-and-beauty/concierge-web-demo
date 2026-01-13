import { Grid, Typography, Box, Checkbox } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ProductCard from './ProductCard';

export default function RoutineStep({ step, stepNumber, isComplete, onComplete }) {
  return (
    <Box
      sx={{ 
        border: '1px solid',
        borderColor: isComplete ? '#bbf7d0' : '#e7e5e4', 
        bgcolor: isComplete ? '#f0fdf4' : 'white',
        borderRadius: 3, 
        p: 2,
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}
    >
      {/* Step Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
        <Box sx={{ 
          width: 36, 
          height: 36, 
          borderRadius: '50%', 
          bgcolor: isComplete ? '#dcfce7' : '#E8F3EE', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#2D5B4B',
          flexShrink: 0,
          transition: 'background-color 0.3s ease'
        }}>
          {isComplete ? (
            <CheckCircleIcon sx={{ color: '#16a34a', fontSize: 20 }} />
          ) : (
            step.icon ? (
              <Typography variant="body1">{step.icon}</Typography>
            ) : (
              <Typography variant="body2" fontWeight="bold">{stepNumber}</Typography>
            )
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="caption" sx={{ color: '#78716c', fontWeight: 500, fontSize: '0.7rem' }}>
            Step {stepNumber}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#1c1917', fontWeight: 600, lineHeight: 1.2, mb: 0.5 }}>
            {step.title}
          </Typography>
          <Typography variant="caption" sx={{ color: '#57534e', fontSize: '0.75rem', lineHeight: 1.3 }}>
            {step.description}
          </Typography>
        </Box>
        <Checkbox
          checked={isComplete}
          onChange={onComplete}
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleIcon sx={{ color: '#16a34a' }} />}
          sx={{ p: 0 }}
        />
      </Box>

      {/* Detailed Instructions */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 0.5, color: '#1c1917', fontWeight: 600, fontSize: '0.75rem', display: 'block' }}>
          Instructions
        </Typography>
        <Typography variant="caption" sx={{ color: '#57534e', whiteSpace: 'pre-line', fontSize: '0.7rem', lineHeight: 1.4 }}>
          {step.detailedInstructions}
        </Typography>
      </Box>

      {/* Recommended Products */}
      <Box>
        <Typography variant="caption" sx={{ mb: 1, color: '#1c1917', fontWeight: 600, fontSize: '0.75rem', display: 'block' }}>
          Recommended Products
        </Typography>
        <Grid container spacing={1.5}>
          {step.recommendedProducts && step.recommendedProducts.map((product, idx) => (
            <Grid key={idx} size={{ xs: 6, sm: 4 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
