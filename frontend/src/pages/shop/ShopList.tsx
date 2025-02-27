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
      
      <Grid container spacing={3} sx={{ px: { xs: 1, sm: 2 } }}>
        {shops.map((shop) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={shop.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                borderRadius: 2,
                maxWidth: '360px',
                mx: 'auto',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={shop.logoUrl}
                alt={shop.name}
                sx={{ 
                  objectFit: 'cover',
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="h2"
                  sx={{ 
                    fontWeight: 600,
                    mb: 1.5,
                    fontSize: '1rem',
                    letterSpacing: '0.02em'
                  }}
                >
                  {shop.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    mb: 2,
                    fontSize: '0.9rem',
                    letterSpacing: '0.02em',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {shop.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2.5, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={() => navigate(`/shops/${shop.id}`)}
                  sx={{
                    borderRadius: 1.5,
                    py: 1,
                    textTransform: 'none',
                    fontSize: '0.9rem',
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