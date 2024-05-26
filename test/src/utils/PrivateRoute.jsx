import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const PrivateRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
