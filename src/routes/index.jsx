import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/auth/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginForm from '../Components/Login&Register/Login/LoginForm.jsx';
import Register from '../Components/Login&Register/Register/Register.jsx';
import HomeProfesores from '../Components/Profesores/Home/Home.jsx';
import HomeAdministrativo from '../Components/Administrativo/Home/Home.jsx';
import TablaEstudiantesProvados from '../Components/Administrativo/EstudiantesPrivados/EstudiantesPrivados.jsx';
import GruposEmpresas from '../Components/Administrativo/Grupos/Grupos.jsx';
import StudentDetail from '../Components/Administrativo/EstudiantesPrivados/Dashboard/EstudianteDetalle.jsx';
import GroupDetail from '../Components/Administrativo/Grupos/Dashboard/GrupoDetalle.jsx';
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
            path: "/home",
            element: <HomeAdministrativo />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/estudiantes_privados_administrativo",
            element: <TablaEstudiantesProvados />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/grupos_administrativo",
            element: <GruposEmpresas />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/studentdetail",
            element: <StudentDetail />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/groupdetail",
            element: <GroupDetail />,
            errorElement: <ErrorBoundary />
          },
        ] : []),
        ...(userType === 'profesor' ? [
          {
            path: "/home_profesores",
            element: <HomeProfesores />,
            errorElement: <ErrorBoundary />
          },
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