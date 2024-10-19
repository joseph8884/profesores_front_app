import React, { useState } from "react";
import "./LoginForm.css";
import LoginButton from "./LoginButton.jsx";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className="login">
      <div className="login-container">
        <img src="/LogoProfesores.png" alt="" />
        <div className="login-card">
          <h2>Login</h2>
          <form autoComplete="on">
            <div className="input-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="username"
                placeholder="Enter your name"
                value={username}
                onChange={handleUsernameChange}
                autoComplete="username"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
              />
            </div>
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            <LoginButton username={username} password={password} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;