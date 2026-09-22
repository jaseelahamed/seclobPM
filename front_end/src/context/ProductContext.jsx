import React, { createContext, useContext, useState } from "react";
import useProducts from "../hooks/useProducts";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    subcategory: "",
    search: "",
    page: 1,
    limit: 6,
  });

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useProducts(filters);

  const value = {
    products: data?.products || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    loading: isLoading,
    error,
    filters,
    setFilters,
    refetch,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};