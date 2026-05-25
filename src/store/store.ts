import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/reducer/ProductSlice";
import authReducer from "@/reducer/authSlice";
import categoryReducer from '@/reducer/CategorySlice'; 
import brandReducer from '@/reducer/BrandSlice';
import bannerReducer from '@/reducer/BannerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    banner: bannerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;