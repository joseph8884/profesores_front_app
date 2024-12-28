import React, { useState } from "react";
import { useAuth } from "../../../provider/auth/authProvider";
import postUser from "../../../provider/auth/login_request.js";
import atob from "atob";
import Loader from "../../Loader/Loader";

const LoginButton = ({ username, password }) => {
  const { setToken, setUserType } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const resp = await postUser({ username, password });
      console.log("Response:", resp);

      if (resp.ok) {
        setLoading(false);
        const data = await resp.json();
        setToken(data.token);
        const userType = parseJwt(data.token).role;
        setUserType(userType);

        if (userType === "ADMINISTRADOR") {
          window.location.href = "/admin/home";
        } else if (userType === "PROFESOR") {
          window.location.href = "/profesor/home";
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setLoading(false);
    } 
  };

  const parseJwt = (token) => {
    if (!token) return {};
    const base64Url = token.split(".")[1];
    const base64 = decodeURIComponent(
      atob(base64Url)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(base64);
  };

  const handleClick = (event) => {
    event.preventDefault();
    sessionStorage.setItem("username_admin", username);
    setTimeout(() => {
      handleLogin();
    }, 3 * 1000);
  };

  return (
    <>
      {loading && <Loader />}
      <button className="login-button" onClick={handleClick}>
        Let's Go &rarr;
      </button>
    </>
  );
};

export default LoginButton;
