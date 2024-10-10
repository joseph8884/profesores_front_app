import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home_profesores');
  };

  return (
    <button className="login-button" onClick={handleClick}>
      Let's Go &rarr;
    </button>
  );
};

export default LoginButton;
