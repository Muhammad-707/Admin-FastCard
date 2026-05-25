import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://fastcard-1-o23z.onrender.com/api';

export interface Category {
  id: number;
  categoryName: string;
  categoryImage: string | null;
  subCategories?: any[];
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const sanitizeCategory = (cat: any): Category => ({
  ...cat,
  categoryImage: !cat.categoryImage || cat.categoryImage === 'null' || cat.categoryImage === 'undefined' ? null : cat.categoryImage
});

export const fetchCategories = createAsyncThunk('category/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/Category/get-categories`);
    return response.data.data.map(sanitizeCategory);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки категорий');
  }
});

export const addCategory = createAsyncThunk('category/addCategory', async (formData: FormData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/Category/add-category`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return sanitizeCategory(response.data.data);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка добавления');
  }
});

export const updateCategory = createAsyncThunk('category/updateCategory', async (formData: FormData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/Category/update-category`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return sanitizeCategory(response.data.data);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка обновления');
  }
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id: number, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/Category/delete-category?id=${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка удаления');
  }
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        const updatedCategory = action.payload;
        if (updatedCategory) {
          const index = state.categories.findIndex((c) => c.id === updatedCategory.id);
          if (index !== -1) state.categories[index] = updatedCategory;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
        state.categories = state.categories.filter((c) => c.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;