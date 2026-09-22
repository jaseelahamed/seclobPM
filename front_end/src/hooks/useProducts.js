// hooks/useProducts.js
import useFetchData from "./use-fetch-data";
import { getProducts } from "../services/productapiCall"; 

const useProducts = (filters) => {
  return useFetchData("products", getProducts, filters);
};

export default useProducts;