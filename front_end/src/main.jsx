// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductList from "./pages/Products/ProductList";
import AddProduct from "@/pages/Products/AddProduct";
import { PATHS } from "@/constants/paths";

import { ReactQueryClientProvider } from "@/providers/QueryClientProvider";

import { AuthProvider } from "@/providers/AuthProvider";
import ProtectedRoute from "./utils/ProtectedRoute";
import NotFound from "@/pages/404";
import Register from "@/pages/Auth/Register";
import Login from "./pages/Auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./utils/PublicRoute";
import { ProductProvider } from "./context/ProductContext";
// import ProductDetails from "./pages/Products/ProductDetails";
import SingleProduct from "./pages/Products/SingleProduct";

const router = createBrowserRouter([
  {
    path: PATHS.LOGIN,
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: PATHS.REGISTER,

    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },

  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: PATHS.BASE_PATH,
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedRoute component={Dashboard} />,
        index: true,
      },
      {
        path: PATHS.PRODUCTS,
        element: <ProtectedRoute component={ProductList} />,
      },
      {
        path: `${PATHS.PRODUCTSDETAILS}/:id`,
        element: <ProtectedRoute component={SingleProduct} />,
      },

      {
        path: PATHS.WISHLIST,
        element: <ProtectedRoute component={() => <div>Wishlist</div>} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReactQueryClientProvider>
    <AuthProvider>
      <ProductProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </ProductProvider>
    </AuthProvider>
  </ReactQueryClientProvider>
);
