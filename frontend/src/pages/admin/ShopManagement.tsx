import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Shop } from '../../types';

const Input = styled('input')({
  display: 'none',
});

interface ShopManagementProps {
  shops: Shop[];
  onCreateShop: (shop: Partial<Shop>) => void;
  onUpdateShop: (shopId: number, shop: Partial<Shop>) => void;
  onDeleteShop: (shopId: number) => void;
}

interface EditDialogProps {
  open: boolean;
  shop: Shop | null;
  onClose: () => void;
  onSave: (shop: Partial<Shop>) => void;
}

const EditDialog: React.FC<EditDialogProps> = ({ open, shop, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Shop>>(shop || {});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      // In a real app, you would upload the file to a server and get back a URL
      setFormData(prev => ({
        ...prev,
        logoUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {shop ? 'Edit Shop' : 'Create New Shop'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Shop Name"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
          />
          <Box sx={{ textAlign: 'center' }}>
            <label htmlFor="shop-logo">
              <Input
                accept="image/*"
                id="shop-logo"
                type="file"
                onChange={handleImageChange}
              />
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload Logo
              </Button>
            </label>
            {(imagePreview || formData.logoUrl) && (
              <Box
                component="img"
                src={imagePreview || formData.logoUrl}
                alt="Shop logo preview"
                sx={{
                  mt: 2,
                  maxWidth: '100%',
                  maxHeight: 200,
                  objectFit: 'contain',
                }}
              />
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ShopManagement: React.FC<ShopManagementProps> = ({
  shops,
  onCreateShop,
  onUpdateShop,
  onDeleteShop,
}) => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (shop: Shop) => {
    setSelectedShop(shop);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedShop(null);
    setIsDialogOpen(true);
  };

  const handleSave = (shopData: Partial<Shop>) => {
    if (selectedShop) {
      onUpdateShop(selectedShop.id, shopData);
    } else {
      onCreateShop(shopData);
    }
    setIsDialogOpen(false);
  };

  return (
    <Container>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" color="primary">
          Manage Shops
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Add New Shop
        </Button>
      </Box>

      <Grid container spacing={3}>
        {shops.map((shop) => (
          <Grid item xs={12} sm={6} md={4} key={shop.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={shop.logoUrl}
                alt={shop.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" gutterBottom>
                    {shop.name}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(shop)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDeleteShop(shop.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {shop.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <EditDialog
        open={isDialogOpen}
        shop={selectedShop}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
      />
    </Container>
  );
};

export default ShopManagement; 