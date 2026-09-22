import { apiCall } from "./apiCall";

export const addToWishlist = async (productId) => {
    const response = await apiCall("post", "/wishlist", { productId },{});
    
    console.log(response,"response------------------")
    return response.data;
};

export const removeFromWishlist = async (productId) => {
  const response = await apiCall("delete", `/wishlist/${productId}`,{});
  return response.data;
};

export const getWishlist = async () => {
  const response = await apiCall("get", "/wishlist");
  return response.data;
};