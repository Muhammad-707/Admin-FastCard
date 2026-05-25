import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://fastcard-1-o23z.onrender.com/api';

export interface Brand {
  id: number;
  brandName: string;
}

interface BrandState {
  brands: Brand[];
  loading: boolean;
}

const initialState: BrandState = {
  brands: [],
  loading: false,
};

export const fetchBrands = createAsyncThunk('brands/fetch', async () => {
  const response = await fetch(`${API_URL}/Brand/get-brands`);
  const data = await response.json();
  return data.data.brands; 
});

export const addBrand = createAsyncThunk('brands/add', async (brandName: string) => {
  await fetch(`${API_URL}/Brand/add-brand`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ brandName }),
  });
});

export const updateBrand = createAsyncThunk('brands/update', async ({ id, brandName }: { id: number, brandName: string }) => {
  await fetch(`${API_URL}/Brand/update-brand`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, brandName }),
  });
});

export const deleteBrand = createAsyncThunk('brands/delete', async (id: number) => {
  await fetch(`${API_URL}/Brand/delete-brand?id=${id}`, {
    method: 'DELETE',
  });
});

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => { state.loading = true; })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      });
  },
});

export default brandSlice.reducer;