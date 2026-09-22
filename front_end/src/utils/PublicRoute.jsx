// src/utils/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider"; 

const PublicRoute = ({ children }) => {
    const { user } = useAuth();
  const token =  localStorage.getItem("token");
console.log(user,"useruseruser")
  if (token) {
   
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;