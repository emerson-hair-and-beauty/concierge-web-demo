import { Card, CardContent, CardActions, Typography, Button, Chip, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function ProductCard({ product }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ bgcolor: '#EBE5E0', height: 128, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h3">🧴</Typography>
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1.125rem', fontWeight: 600, color: '#1c1917' }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.brand}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {product.tags && product.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" sx={{ bgcolor: '#f5f5f4', color: '#57534e' }} />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          fullWidth 
          variant="outlined" 
          startIcon={<InfoOutlinedIcon />}
          sx={{ 
            borderRadius: 50, 
            color: '#57534e', 
            borderColor: '#d6d3d1',
            textTransform: 'none',
            '&:hover': { bgcolor: '#fafaf9', borderColor: '#a8a29e' }
          }}
        >
          More Info
        </Button>
      </CardActions>
    </Card>
  );
}
