import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  
  // Imprimimos para ver qué valor exacto tiene
  console.log("Token recuperado en ProtectedRoute:", token);

  if (!token) {
    console.log("No hay token, redirigiendo al login...");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;