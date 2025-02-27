import React from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartItem } from '../../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, change: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Shopping Cart
      </Typography>
      {items.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <Box
                    component="img"
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    sx={{ width: 60, height: 60, mr: 2, objectFit: 'cover' }}
                  />
                  <ListItemText
                    primary={item.product.name}
                    secondary={`$${item.product.price.toFixed(2)}`}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Typography variant="h6" gutterBottom>
              Total: ${total.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Cart; 