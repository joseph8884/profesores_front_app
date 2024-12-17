import React, { useState } from 'react';
import "./register.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
const Register = () => {
  const [phone, setPhone] = useState('');
  return (
    <div className="register">
      <div className="register-container">
        <img src="/LogoProfesores.png" alt="" />
        <div className="register-card">
          <h2>Create an Account</h2>
          <form className="register-form">
            <div className="input-group">
              <label htmlFor="firstName">Your Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Your Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Your E-mail</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
              <label htmlFor="confirmEmail">Confirm E-mail</label>
              <input
                type="email"
                id="confirmEmail"
                placeholder="Re-enter your email"
              />
            </div>
            <div className="input-group">
              <label htmlFor="emergencyContactName">
                Emergency Contact Name
              </label>
              <input
                type="text"
                id="emergencyContactName"
                placeholder="Emergency contact name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="emergencyContactNumber">
                Emergency Contact Number
              </label>
              <div className="phone-input-container">
                <PhoneInput
                  country={"co"} // Default country
                  value={phone}
                  onChange={setPhone}
                  inputStyle={{
                    width: "100%",
                    padding: "1.4rem",
                    borderRadius: "5px",
                    fontSize: "1rem",
                  }}
                  buttonStyle={{
                    borderRadius: "5px 0 0 5px",
                  }}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter a password"
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Repeat Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Repeat your password"
              />
            </div>
            <div className="uploadPhoto">
              <label htmlFor="uploadPhoto">Upload Photo</label>
              <input type="file" id="uploadPhoto" accept="image/*" />
            </div>
            <div className="terms-conditions">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                By continuing, you accept the{" "}
                <a href="#">terms and conditions</a>.
              </label>
            </div>
            <button type="submit" className="register-button">
              Create &rarr;
            </button>
          </form>
          <div className="login-link">
            <p>
              Already have an account? <a href="/">Log In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
