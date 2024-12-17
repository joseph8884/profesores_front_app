import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/auth/authProvider';

export const ProtectedRoute = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // If not authenticated, redirect to the login page
      window.location.href="/";
    } else {
      try {
        const userTypeFromToken = parseJwt(token).role;
        if (!userTypeFromToken) {
          throw new Error("Invalid token");
        }
      } catch (error) {
        console.error("Token error:", error);
        window.location.href="/";
      }
    }
  }, [token, navigate]);

  // If authenticated, render the child routes
  return token ? <Outlet /> : null;
};

// Función para decodificar el token JWT
const parseJwt = (token) => {
  if (!token) return {};
  const base64Url = token.split('.')[1];
  const base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(base64);
};

export default ProtectedRoute;
