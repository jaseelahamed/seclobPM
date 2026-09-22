import { apiCall } from "../../services/apiCall"; 
import { URLS } from "../../constants/apiUrls"; 

export const addCategory = async (data) => {
  const trimmedData = {
    name: data.name.trim(), 
  };

  const response = await apiCall("post", URLS.CATEGORIES, trimmedData, null, false);
  return response;
};
export const addSubCategory = async (data) => {

  const response = await apiCall("post", URLS.SUBCATEGORIES, data, null, false);
  return response;
};

export const getCategories = async () => {
    const response = await apiCall("get", URLS.CATEGORIES, null, null, false);
    return response?.data;
};
export const getSUbCategories = async () => {
  const response = await apiCall("get", URLS.SUBCATEGORIES, null, null, false);
  console.log(response,"qqqqqqqqqqqqqqqqqq")
    return response?.data;
};
  
export const addProduct = async (data) => {
    const response = await apiCall("post", URLS.PRODUCTS, data, null, false);
    return response?.data;
};
  
