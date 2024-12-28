import React, { useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import "./LoginForm.css";
import LoginButton from "./LoginButton.jsx";
import { Toaster } from "sonner";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="login">
      <div className="login-container">
        <img src="/LogoProfesores.png" alt="" />
        <div className="login-card">
          <h2>Login</h2>
          <form autoComplete="on">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your name"
                value={username}
                onChange={handleUsernameChange}
                autoComplete="username"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                />
                <span onClick={togglePasswordVisibility} className="password-toggle">
                  {showPassword ? <EyeClosedIcon className="icon" width={"20px"} height={"20px"} /> : <EyeOpenIcon className="icon" width={"20px"} height={"20px"}/>}
                </span>
              </div>
            </div>
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            <LoginButton username={username} password={password} />
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginForm;