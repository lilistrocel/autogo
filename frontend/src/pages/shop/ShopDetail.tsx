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
  Snackbar,
  Alert,
} from '@mui/material';
import { Shop, Product } from '../../types';
import * as api from '../../services/api';
import { useCart } from '../../contexts/CartContext';

interface ShopDetailProps {
  shops: Shop[];
}

const ShopDetail: React.FC<ShopDetailProps> = ({ shops }) => {
  const { shopId } = useParams<{ shopId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

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

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedToCart(true);
  };

  const handleCloseSnackbar = () => {
    setAddedToCart(false);
  };

  if (!shop) {
    return (
      <Container>
        <Typography variant="h4" color="error">Shop not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          {shop.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {shop.description}
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : products.length === 0 ? (
        <Typography>No products available in this shop.</Typography>
      ) : (
        <Grid container spacing={3} sx={{ px: { xs: 1, sm: 2 } }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
                <Box sx={{ position: 'relative', pt: '70%' }}>
                  <CardMedia
                    component="img"
                    image={product.imageUrl || '/placeholder-image.webp'}
                    alt={product.name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
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
                    {product.name}
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
                    {product.description}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="primary"
                    sx={{ 
                      fontWeight: 600,
                      mb: 2,
                      fontSize: '1.1rem'
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2.5, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      borderRadius: 1.5,
                      py: 1,
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      letterSpacing: '0.02em'
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

      <Snackbar
        open={addedToCart}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ShopDetail; 