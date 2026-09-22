
import axios from "axios";
import { Base_Url } from "./base_url";

export const apiCall = async (method, endPoint, data = null, params = null, is_formdata = false) => {
  const headers = {
    "Content-Type": is_formdata ? "multipart/form-data" : "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  const url = Base_Url + endPoint;

  try {
    const res = await axios({
      method,
      url,
      params,
      data,
      headers,
    });

    return {
      status: true,
      message: res.data.message || "Success",
      data: res.data,
    };
  } catch (error) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }

    const message = error?.response?.data?.message || error.message || "Something went wrong";
    throw { status: false, message };
  }
};
