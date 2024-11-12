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
import StudentsGroupCRUD from '../Components/Administrativo/Grupos/Dashboard/AllStudents.jsx';
import GroupDetail from '../Components/Administrativo/Grupos/Dashboard/GrupoDetalle.jsx';
import ProfesoresActivos from '../Components/Administrativo/adm_profesores/Activos/ProfesoresActivos.jsx';
import ProfesoresInactivos from '../Components/Administrativo/adm_profesores/Inactivos/ProfesoresInactivos.jsx';

//Profesor components
import HomeProfesores from '../Components/Profesores/Home/Home.jsx';
import EstudianteTableAll from '../Components/Profesores/RegistrarEstudianteHoras/EstudianteTable.jsx';
import EstudianteForm from '../Components/Profesores/RegistrarEstudianteHoras/Form/Form.jsx';
import GruposEmpresasProfesor from '../Components/Profesores/RegistrarGruposHoras/GruposAllview.jsx';
import FormGroup from '../Components/Profesores/RegistrarGruposHoras/Form/Form.jsx';
import DashBoardProfesor from '../Components/Profesores/DashboardProfesor/DashboardView.jsx';
//ErrorBoundary
import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary.jsx';

const Routes = () => {
  const { token, userType } = useAuth();

  const routesForPublic  = [
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
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page go to <a href="/login"><button>login</button></a></div>,
    }];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute errorElement={<ErrorBoundary />} />,
      children: [
        ...(userType === 'ADMINISTRADOR' ? [
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
          {
            path: "/admin/gruposvista/grupos/groupdetail/studentsgroupcrud",
            element: <StudentsGroupCRUD />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/admin/profesores/activos",
            element: <ProfesoresActivos />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/admin/profesores/inactivos",
            element: <ProfesoresInactivos />,
            errorElement: <ErrorBoundary />
          }
        ] : []),
        ...(userType === 'PROFESOR' ? [
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
            path: "/profesor/registrarhoras/estudianteindividual/estudiante",
            element: <EstudianteForm />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/profesor/registrarhoras/grupos",
            element: <GruposEmpresasProfesor />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/profesor/registrarhoras/grupos/grupo",
            element: <FormGroup />,
            errorElement: <ErrorBoundary />
          },
          {
            path: "/profesor/dashboard",
            element: <DashBoardProfesor />,
            errorElement: <ErrorBoundary />
          }
        ] : []),
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
