import LoginForm from './Components/Login&Register/Login/LoginForm.jsx';
import Register from './Components/Login&Register/Register/Register.jsx';
import Home from './Components/Profesores/Home/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home_profesores" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
}
export default App;