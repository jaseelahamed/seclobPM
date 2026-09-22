import { apiCall } from "@/services/apiCall";
import { URLS } from "@/constants/apiUrls";

export const getProducts = async (filters = {}) => {
  const response = await apiCall("get", URLS.PRODUCTS, null, filters);
  return response.data; // Make sure backend returns { products: [...], total: ..., totalPages: ... }
};

export const getProductById = async (id) => {
  const response = await apiCall("get", `${URLS.PRODUCTS}/${id}`);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await apiCall("put", `${URLS.PRODUCTS}/${id}`, productData);
  return response.data;
};