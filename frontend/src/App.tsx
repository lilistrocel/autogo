import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Layout from './components/layout/Layout';
import ProductManagement from './pages/admin/ProductManagement';
import ShopManagement from './pages/admin/ShopManagement';
import ShopList from './pages/shop/ShopList';
import Cart from './components/cart/Cart';
import { CartItem } from './types';

function App() {
  // Mock cart data
  const cartItems: CartItem[] = [];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ShopList />} />
            <Route path="/shops" element={<ShopList />} />
            <Route path="/admin/shops" element={<ShopManagement />} />
            <Route path="/admin/products" element={<ProductManagement />} />
            <Route
              path="/cart"
              element={
                <Cart
                  items={cartItems}
                  onUpdateQuantity={(id, change) => console.log('Update quantity', id, change)}
                  onRemoveItem={(id) => console.log('Remove item', id)}
                />
              }
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
