import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory';

export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async (_, { rejectWithValue }) => {
  const maxRetries = 5; 
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) {
        return rejectWithValue(error.response?.data || 'Failed to fetch inventory');
      }
      console.warn(`Retrying API call (${attempt}/${maxRetries})...`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
    }
  }
});

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    products: [],
    isAdmin: true,
    status: 'idle',
    error: null,
  },
  reducers: {
    updateProduct(state, action) {
      const { id, changes } = action.payload;
      const productIndex = id;

      if (state.products[productIndex]) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          ...changes,
        };
      }
    },
    deleteProduct(state, action) {
      state.products.splice(action.payload, 1);
    },
    disableProduct(state, action) {
      const product = state.products[action.payload];
      if (product) {
        product.disabled = true;
      }
    },
    toggleAdmin(state) {
      state.isAdmin = !state.isAdmin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.map((product) => ({
          ...product,
          disabled: false,
        }));
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      });
  },
});

export const { updateProduct, deleteProduct, disableProduct, toggleAdmin } = inventorySlice.actions;
export default inventorySlice.reducer;
