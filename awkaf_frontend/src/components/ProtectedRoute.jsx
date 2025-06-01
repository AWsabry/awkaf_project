import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // Redirect to login if no user is found
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    // Redirect to login if user is not admin
    localStorage.removeItem('user'); // Clear invalid user data
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 