import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Components/Login&Register/Login/LoginForm.jsx';
import Register from './Components/Login&Register/Register/Register.jsx';
import HomeProfesores from './Components/Profesores/Home/Home.jsx';
import HomeAdministrativo from './Components/Administrativo/Home/Home.jsx';
import TablaEstudiantesProvados from './Components/Administrativo/EstudiantesPrivados/EstudiantesPrivados.jsx';
import GruposEmpresas from './Components/Administrativo/Grupos/Grupos.jsx';
import StudentDetail from './Components/Administrativo/EstudiantesPrivados/Dashboard/EstudianteDetalle.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home_profesores" element={<HomeProfesores />} />
        <Route path="/estudiantes_privados_administrativo" element={<TablaEstudiantesProvados />} />
        <Route path="/home" element={<HomeAdministrativo />} />
        <Route path='/grupos_administrativo' element={<GruposEmpresas/>}/>
        <Route path='/detail' element={<StudentDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;