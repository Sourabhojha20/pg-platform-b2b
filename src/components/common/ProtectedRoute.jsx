import React from 'react';
import { Navigate } from 'react-router-dom';

import authService from '../../services/authService';

const ProtectedRoute = ({ children, allowedRoles, loginPath = "/login" }) => {
  const user = authService.getUser();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated || !user) {
    return <Navigate to={loginPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={loginPath} replace />;
  }

  return children;
};

export default ProtectedRoute;