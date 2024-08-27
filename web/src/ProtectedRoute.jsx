import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  // console.log('adminToken:', adminToken);

  if (!adminToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
