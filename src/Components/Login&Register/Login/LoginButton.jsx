import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/auth/authProvider";
import postUser from "../../../provider/auth/login_request.js";
import atob from "atob";

const LoginButton = ({ username, password }) => {
  const navigate = useNavigate();
  const { setToken, setUserType } = useAuth();

  const handleLogin = async () => {
    const resp = await postUser({ username, password }); // Cambiado para enviar un objeto con username y password
    console.log("Response:", resp);

    if (resp.ok) {
        const data = await resp.json(); // Obtener el token del response
        setToken(data.token); // Guardar el token en el estado
        const userType = parseJwt(data.token).role; // Decodificar el token para obtener el tipo de usuario
        setUserType(userType); // Establecer el tipo de usuario
        


        // Navegar según el tipo de usuario
        if (userType === "ADMINISTRADOR") {
            navigate("/admin/home");
        } else if (userType === "PROFESOR") {
            navigate("/profesor/home");
        }
        window.location.reload();
        
    } else {
        console.error('Error al iniciar sesión');
    }
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
