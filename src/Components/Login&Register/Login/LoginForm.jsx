import React from "react";
import "./LoginForm.css"; // CSS styling
import LoginButton from "./LoginButton.jsx"; // CSS styling

const LoginForm = () => {
  return (
    <div className="login">
      <div className="login-container">
        <img src="/LogoProfesores.png" alt="" />
        <div className="login-card">
          <h2>Login</h2>
          <form>
            <div className="input-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            <LoginButton />
            <div className="signup-link">
              <p>
                Don't have an account? <a href="/register">Sign Up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
