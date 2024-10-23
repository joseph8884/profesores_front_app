import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(sessionStorage.getItem("token"));
  const [userType, setUserType] = useState(sessionStorage.getItem("userType"));

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setUserType_ = (type) => {
    setUserType(type);
    sessionStorage.setItem("userType", type);
  };

  useEffect(() => {
    if (token) {
      const userTypeFromToken = parseJwt(token).role;
      if (userType !== userTypeFromToken) {
        setUserType_(userTypeFromToken);
      }
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      sessionStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      sessionStorage.removeItem('token');
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userType,
      setUserType: setUserType_,
    }),
    [token, userType]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
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

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
