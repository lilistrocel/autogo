import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Layout from './components/layout/Layout';
import ProductManagement from './pages/admin/ProductManagement';
import ShopManagement from './pages/admin/ShopManagement';
import ShopList from './pages/shop/ShopList';
import ShopDetail from './pages/shop/ShopDetail';
import Cart from './components/cart/Cart';
import { Shop } from './types';
import * as api from './services/api';
import { CartProvider } from './contexts/CartContext';

function App() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const data = await api.getShops();
      setShops(data);
      setError(null);
    } catch (err) {
      setError('Failed to load shops');
      console.error('Error loading shops:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShop = async (shopData: Partial<Shop>) => {
    try {
      const newShop = await api.createShop(shopData);
      setShops([...shops, newShop]);
    } catch (err) {
      console.error('Error creating shop:', err);
      throw err;
    }
  };

  const handleUpdateShop = async (shopId: number, shopData: Partial<Shop>) => {
    try {
      const updatedShop = await api.updateShop(shopId, shopData);
      setShops(shops.map(shop => 
        shop.id === updatedShop.id ? updatedShop : shop
      ));
    } catch (err) {
      console.error('Error updating shop:', err);
      throw err;
    }
  };

  const handleDeleteShop = async (shopId: number) => {
    try {
      await api.deleteShop(shopId);
      setShops(shops.filter(shop => shop.id !== shopId));
    } catch (err) {
      console.error('Error deleting shop:', err);
      throw err;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<ShopList shops={shops} />} />
              <Route path="/shops" element={<ShopList shops={shops} />} />
              <Route path="/shops/:shopId" element={<ShopDetail shops={shops} />} />
              <Route 
                path="/admin/shops" 
                element={
                  <ShopManagement 
                    shops={shops}
                    onCreateShop={handleCreateShop}
                    onUpdateShop={handleUpdateShop}
                    onDeleteShop={handleDeleteShop}
                  />
                } 
              />
              <Route path="/admin/products" element={<ProductManagement shops={shops} />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
