import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../store/inventorySlice';

const EditModal = ({ open, onClose, productData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (productData) {
      setFormData({ ...productData });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {

    dispatch(updateProduct({ id: productData.id, changes: formData }));
    onClose(); 
  };

  const handleCancel = () => {
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle variant='h4'>Edit Product
      {productData && (
        <Typography variant="subtitle1" style={{ marginLeft: '0px', marginTop: '16px' }}>
          {productData.name}
        </Typography>
      )}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Category"
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Value"
              name="value"
              value={formData.value || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              name="price"
              value={formData.price || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
