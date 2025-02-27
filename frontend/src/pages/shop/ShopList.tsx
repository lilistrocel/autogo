import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Shop } from '../../types';

interface ShopListProps {
  shops: Shop[];
}

const ShopList: React.FC<ShopListProps> = ({ shops }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          color="primary"
          sx={{ 
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            letterSpacing: '-0.02em'
          }}
        >
          Categories
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ 
            fontSize: { xs: '1rem', md: '1.1rem' },
            maxWidth: '600px',
            mx: 'auto',
            fontWeight: 500,
            letterSpacing: '0.02em'
          }}
        >
          Please choose a category
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {shops.map((shop) => (
          <Grid item xs={12} sm={6} md={4} key={shop.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                borderRadius: 2,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={shop.logoUrl}
                alt={shop.name}
                sx={{ 
                  objectFit: 'cover',
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="h2"
                  sx={{ 
                    fontWeight: 600,
                    mb: 2,
                    fontSize: '1.1rem',
                    letterSpacing: '0.02em'
                  }}
                >
                  {shop.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    mb: 3,
                    fontSize: '0.9rem',
                    letterSpacing: '0.02em',
                    lineHeight: 1.6
                  }}
                >
                  {shop.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 3, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate(`/shops/${shop.id}`)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em'
                  }}
                >
                  Visit Shop
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShopList; 