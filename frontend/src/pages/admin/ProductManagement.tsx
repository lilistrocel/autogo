import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Shop, Product } from '../../types';
import * as api from '../../services/api';

const Input = styled('input')({
  display: 'none',
});

interface ProductManagementProps {
  shops: Shop[];
}

const ProductManagement: React.FC<ProductManagementProps> = ({ shops }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedShop, setSelectedShop] = useState<number | ''>('');

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: null as File | null,
    imagePreview: '',
  });

  useEffect(() => {
    if (selectedShop !== '') {
      loadProducts(selectedShop);
    }
  }, [selectedShop]);

  const loadProducts = async (shopId: number) => {
    try {
      setLoading(true);
      const data = await api.getProducts(shopId);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShopChange = (event: SelectChangeEvent<number | ''>) => {
    setSelectedShop(event.target.value as number);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedShop === '') {
      setError('Please select a shop');
      return;
    }

    try {
      const productPayload = {
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        shop_id: selectedShop,
        imageUrl: productData.imagePreview, // In a real app, you would upload the image first
      };

      await api.createProduct(productPayload);
      await loadProducts(selectedShop);
      
      // Reset form
      setProductData({
        name: '',
        description: '',
        price: '',
        image: null,
        imagePreview: '',
      });
      setError(null);
    } catch (err) {
      setError('Failed to create product');
      console.error('Error creating product:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Add New Product
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="shop-select-label">Shop</InputLabel>
                <Select
                  labelId="shop-select-label"
                  id="shop-select"
                  value={selectedShop}
                  label="Shop"
                  onChange={handleShopChange}
                >
                  <MenuItem value="">
                    <em>Select a shop</em>
                  </MenuItem>
                  {shops.map((shop) => (
                    <MenuItem key={shop.id} value={shop.id}>
                      {shop.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Product Name"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={productData.price}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <Typography>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <label htmlFor="product-image">
                  <Input
                    accept="image/*"
                    id="product-image"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                  </Button>
                </label>
                {productData.imagePreview && (
                  <Box
                    component="img"
                    src={productData.imagePreview}
                    alt="Product preview"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: 200,
                      objectFit: 'contain',
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={selectedShop === ''}
              >
                Add Product
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {loading ? (
        <Typography sx={{ mt: 4 }}>Loading products...</Typography>
      ) : (
        products.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Products in {shops.find(s => s.id === selectedShop)?.name}
            </Typography>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Paper sx={{ p: 2 }}>
                    {product.imageUrl && (
                      <Box
                        component="img"
                        src={product.imageUrl}
                        alt={product.name}
                        sx={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                          mb: 2,
                        }}
                      />
                    )}
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography color="text.secondary">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )
      )}
    </Container>
  );
};

export default ProductManagement; 