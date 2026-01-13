import { Card, Typography, Box } from '@mui/material';

export default function ProductCard({ product }) {
  const handleClick = () => {
    // TODO: Add product detail modal or navigation
    console.log('Product clicked:', product);
  };

  return (
    <Card 
      variant="outlined" 
      onClick={handleClick}
      sx={{ 
        borderRadius: 3, 
        height: 140,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderColor: '#a8a29e'
        }
      }}
    >
      {/* Background with emoji/image */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: '#EBE5E0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '4rem', opacity: 0.5 }}>🧴</Typography>
      </Box>

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 2
        }}
      />

      {/* Product name text */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 1.5,
          zIndex: 3
        }}
      >
        <Typography 
          variant="caption" 
          component="div" 
          sx={{ 
            fontWeight: 500, 
            lineHeight: 1.2,
            fontSize: '0.65rem',
            color: 'white',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          {product.name}
        </Typography>
      </Box>
    </Card>
  );
}
