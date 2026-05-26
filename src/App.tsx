import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import ThemeProvider from "./components/shared/ThemeProvider";
import Layout from "./layout/layout";
import { LogIn, Dashboard, Products, AddProduct, EditProduct, Orders, Category, Brand, Banner } from "@/router/router";
import {Loader} from "./components/shared/loader";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
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
        element: <Suspense fallback={<Loader fullScreen={false} />}><Dashboard /></Suspense>,
      },
      {
        path: "orders",
        element: <Suspense fallback={<Loader fullScreen={false} />}><Orders /></Suspense>,
      },
      {
        path: "products",
        element: <Suspense fallback={<Loader fullScreen={false} />}><Products /></Suspense>,
      },
      {
        path: "addProduct",
        element: <Suspense fallback={<Loader fullScreen={false} />}><AddProduct /></Suspense>,
      },
      {
        path: "editProduct/:id",
        element: <Suspense fallback={<Loader fullScreen={false} />}><EditProduct /></Suspense>,
      },
      {
        path: "products/:id",
      },
      {
        path: "category",
        element: <Suspense fallback={<Loader fullScreen={false} />}><Category /></Suspense>,
      },
      {
        path: "brand",
        element: <Suspense fallback={<Loader fullScreen={false} />}><Brand /></Suspense>,
      },
      {
        path: "banner",
        element: <Suspense fallback={<Loader fullScreen={false} />}><Banner /></Suspense>,
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

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}