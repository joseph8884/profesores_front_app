import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/auth/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginForm from '../Components/Login&Register/Login/LoginForm.jsx';
import Register from '../Components/Login&Register/Register/Register.jsx';
//Admin components

import HomeAdministrativo from '../Components/Administrativo/Home/Home.jsx';
import TablaEstudiantesProvados from '../Components/Administrativo/EstudiantesPrivados/EstudiantesPrivados.jsx';
import GruposEmpresas from '../Components/Administrativo/Grupos/Grupos.jsx';
import StudentDetail from '../Components/Administrativo/EstudiantesPrivados/Dashboard/EstudianteDetalle.jsx';
import GroupDetail from '../Components/Administrativo/Grupos/Dashboard/GrupoDetalle.jsx';

//Profesor components
import HomeProfesores from '../Components/Profesores/Home/Home.jsx';
import EstudianteTableAll from '../Components/Profesores/RegistrarEstudianteHoras/EstudianteTable.jsx';
import GruposAllView from '../Components/Profesores/RegistrarGruposHoras/GruposAllview.jsx';

//ErrorBoundary
import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary.jsx';

const Routes = () => {
  const { token, userType } = useAuth();

  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <LoginForm />,
      errorElement: <ErrorBoundary />
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorBoundary />
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      errorElement: <ErrorBoundary />,
      children: [
        ...(userType === 'admin' ? [
          {
            path: "/admin/home",
            element: <HomeAdministrativo />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/admin/tablaestudiantes/estudiantesprivados",
            element: <TablaEstudiantesProvados />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/admin/gruposvista/grupos",
            element: <GruposEmpresas />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/admin/tablaestudiantes/estudiantesprivados/studentdetail",
            element: <StudentDetail />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/admin/gruposvista/grupos/groupdetail",
            element: <GroupDetail />,
            errorElement: <ErrorBoundary />
          },
        ] : []),
        ...(userType === 'profesor' ? [
          {
            path: "/profesor/home",
            element: <HomeProfesores />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/profesor/registrarhoras/estudianteindividual",
            element: <EstudianteTableAll />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/profesor/registrarhoras/grupos",
            element: <GruposAllView />,
            errorElement: <ErrorBoundary />
          }
        ] : []),
      ],
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...(token ? routesForAuthenticatedOnly : []),
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;