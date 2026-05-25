import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import ThemeProvider from "./components/shared/ThemeProvider";
import Layout from "./layout/layout";
import { LogIn, Dashboard, Products, AddProduct, EditProduct, Orders, Category, Brand, Banner } from "@/router/router";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <Suspense fallback={<div>Load...</div>}>
          <LogIn />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "dashboard",
          element: <Suspense fallback={<div>Load...</div>}><Dashboard /></Suspense>,
        },
        {
          path: "orders",
          element: <Suspense fallback={<div>Load...</div>}><Orders /></Suspense>,
        },
        {
          path: "products",
          element: <Suspense fallback={<div>Load...</div>}><Products /></Suspense>,
        },
        {
          path: "addProduct",
          element: <Suspense fallback={<div>Load...</div>}><AddProduct /></Suspense>,
        },
        {
          path: "editProduct/:id",
          element: <Suspense fallback={<div>Load...</div>}><EditProduct /></Suspense>,
        },
        {
          path: "products/:id",
        },
        {
          path: "category",
          element: <Suspense fallback={<div>Load...</div>}><Category /></Suspense>,
        },
        {
          path: "brand",
          element: <Suspense fallback={<div>Load...</div>}><Brand /></Suspense>,
        },
        {
          path: "banner",
          element: <Suspense fallback={<div>Load...</div>}><Banner /></Suspense>,
        },
        {
          path: "*",
          element: <Navigate to="/dashboard" replace />,
        }
      ],
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    }
  ]);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}