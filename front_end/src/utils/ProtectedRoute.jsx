
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const isAuthenticated =localStorage.getItem('token')
  const location = useLocation();

  return    isAuthenticated ? <Component /> : <Navigate to="/login" state={{ from: location }} />;

}
