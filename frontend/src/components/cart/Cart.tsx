import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../../contexts/CartContext';

const Cart: React.FC = () => {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = () => {
    setCheckoutDialogOpen(true);
  };

  const handleConfirmCheckout = () => {
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      setCheckoutDialogOpen(false);
      setOrderSuccess(true);
    }, 1500);
  };

  const handleCloseDialog = () => {
    setCheckoutDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOrderSuccess(false);
  };

  return (
    <>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
          Shopping Cart
        </Typography>
        {items.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <>
            <List sx={{ mb: 4 }}>
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem sx={{ py: 2 }}>
                    <Box
                      component="img"
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      sx={{
                        width: 80,
                        height: 80,
                        mr: 2,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                          {item.product.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          ${item.product.price.toFixed(2)} each
                        </Typography>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 4 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                        sx={{ color: 'primary.main' }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ minWidth: '40px', textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, 1)}
                        sx={{ color: 'primary.main' }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="subtitle1" sx={{ minWidth: '80px', textAlign: 'right' }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Typography>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => removeFromCart(item.id)}
                        sx={{ color: 'secondary.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 4, textAlign: 'right' }}>
              <Typography variant="h5" gutterBottom color="primary">
                Total: ${total.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCheckout}
                sx={{
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Paper>

      <Dialog open={checkoutDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to place this order?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total amount: ${total.toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmCheckout}
            variant="contained"
            color="primary"
            autoFocus
          >
            Confirm Order
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={orderSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Order placed successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart; 