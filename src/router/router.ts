import { lazy } from "react";

export const LogIn = lazy(() => import("@/pages/Login/Login"));
export const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
export const Orders = lazy(() => import("@/pages/Orders/Orders"));
export const Products = lazy(() => import("@/pages/Products/Products")); 
export const Category = lazy(() => import("@/pages/Other/Category"));
export const Brand = lazy(() => import("@/pages/Other/Brands"));
export const Banner = lazy(() => import("@/pages/Other/Banner"));
export const AddProduct = lazy(() => import("@/components/shared/AddProduct"));
export const EditProduct = lazy(() => import("@/components/shared/EditProduct.tsx"));