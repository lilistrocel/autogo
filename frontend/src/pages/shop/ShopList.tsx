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
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Our Shops
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Discover our trusted auto parts vendors
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
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={shop.logoUrl}
                alt={shop.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {shop.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {shop.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/shops/${shop.id}`)}
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