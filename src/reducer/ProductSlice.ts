import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  productName: string;
  code: string;
  description: string;
  price: number;
  discountPrice: number;
  hasDiscount: boolean;
  quantity: number;
  image: string;
  categoryId: number;
  categoryName: string;
}

interface ProductState {
  products: Product[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    categoryId: string;
    page: number;
  };
}

const initialState: ProductState = {
  products: [],
  totalRecords: 0,
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
  filters: {
    search: "",
    categoryId: "",
    page: 1,
  },
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://fastcard-1-o23z.onrender.com/api";
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { products: ProductState };
      const { search, categoryId, page } = state.products.filters;
      
      const params = new URLSearchParams({ PageNumber: page.toString(), PageSize: "10" });
      if (search) params.append("ProductName", search);
      if (categoryId) params.append("CategoryId", categoryId);

      const response = await axios.get(`${BASE_URL}/Product/get-products?${params}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка загрузки");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${BASE_URL}/Product/delete-product?id=${id}`);
      dispatch(fetchProducts()); 
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка удаления");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<ProductState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filters.page = 1; 
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.totalRecords = action.payload.totalRecords || 0;
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilter, setPage } = productSlice.actions;
export default productSlice.reducer;