import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/auth/authProvider";
import postUser from "../../../provider/auth/login_request.js";

const LoginButton = ({ username, password }) => {
  const navigate = useNavigate();
  const { setToken, setUserType } = useAuth();

  const handleLogin = () => {
    //const resp = postUser({ username, password });
    //console.log("Response:", resp);
    setToken("this is a test token");

    // Example logic to determine user type
    if (username === "admin") {
      setUserType("admin");
      navigate("/home");
    } else if (username === "profesor") {
      setUserType("profesor");
      navigate("/home_profesores");
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    setTimeout(() => {
      handleLogin();
    }, 3 * 1000);
  };

  return (
    <button className="login-button" onClick={handleClick}>
      Let's Go &rarr;
    </button>
  );
};

export default LoginButton;