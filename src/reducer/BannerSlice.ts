import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://fastcard-1-o23z.onrender.com/api';

export interface Banner {
  id: number;
  title: string;
  image: string; 
}

interface BannerState {
  banners: Banner[];
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  banners: [],
  loading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk('banner/fetchBanners', async () => {
  const response = await axios.get(`${API_URL}/banners`);
  return response.data;
});

export const addBanner = createAsyncThunk('banner/addBanner', async (formData: FormData) => {
  const response = await axios.post(`${API_URL}/banners`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const updateBanner = createAsyncThunk('banner/updateBanner', async (formData: FormData) => {
  const id = formData.get('id');
  const response = await axios.put(`${API_URL}/banners/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const deleteBanner = createAsyncThunk('banner/deleteBanner', async (id: number) => {
  await axios.delete(`${API_URL}/banners/${id}`);
  return id;
});

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action: PayloadAction<Banner[]>) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки баннеров';
      });
  },
});

export default bannerSlice.reducer;