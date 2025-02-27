import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { Shop, Product } from '../../types';
import * as api from '../../services/api';

interface ShopDetailProps {
  shops: Shop[];
}

const ShopDetail: React.FC<ShopDetailProps> = ({ shops }) => {
  const { shopId } = useParams<{ shopId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const shop = shops.find(s => s.id === Number(shopId));

  useEffect(() => {
    const loadProducts = async () => {
      if (!shopId) return;
      
      try {
        setLoading(true);
        const data = await api.getProducts(Number(shopId));
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [shopId]);

  if (!shop) {
    return (
      <Container>
        <Typography variant="h4" color="error">Shop not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          {shop.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {shop.description}
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : products.length === 0 ? (
        <Typography>No products available in this shop.</Typography>
      ) : (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
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
                {product.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      // TODO: Add to cart functionality
                      console.log('Add to cart:', product);
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ShopDetail; 