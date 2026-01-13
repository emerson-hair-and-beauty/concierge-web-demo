import { Card, CardContent, CardActions, Typography, Button, Chip, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function ProductCard({ product }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ bgcolor: '#EBE5E0', height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4">🧴</Typography>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 1.5, pb: '4px !important' }}>
        <Typography gutterBottom variant="subtitle2" component="div" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
          {product.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1, lineHeight: 1.1 }}>
          {product.brand}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {product.tags && product.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: '#f5f5f4', color: '#57534e' }} />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ p: 1.5, pt: 1 }}>
        <Button 
          fullWidth 
          variant="outlined" 
          size="small"
          startIcon={<InfoOutlinedIcon sx={{ fontSize: 16 }} />}
          sx={{ 
            borderRadius: 50, 
            py: 0.5,
            fontSize: '0.75rem',
            color: '#57534e', 
            borderColor: '#d6d3d1',
            textTransform: 'none',
            '&:hover': { bgcolor: '#fafaf9', borderColor: '#a8a29e' }
          }}
        >
          Info
        </Button>
      </CardActions>
    </Card>
  );
}
