import React, { useEffect, useState } from "react";
import NavMobile from "../../Nav/NavMobile";
import NavWeb from "../../Nav/NavWeb";
import { Button } from "../../../ui/button";
import "./EstudianteDetalle.css";
import EstudentData from "./EstudentData";
import Chart from "./Chart";
import PieChart from "./Chart2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { BellIcon } from "@radix-ui/react-icons";
import { DownloadIcon } from "@radix-ui/react-icons";
import Calendar from "./Calendar";
const StudentDetail = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("selected_student");
    if (data) {
      setStudentData(JSON.parse(data));
    }
  }, []);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex">
      <NavMobile />
      <NavWeb />
      <div className="dashboard">
        <div className="dashboardcontainer">
          <div className="tituloynotificaciones">
            <h2 className="text-xl font-bold text-gray-900">
              Estudiantes Individuales
            </h2>
            <BellIcon className="h-6 w-6" />
          </div>
          <div className="filtrosandbackbtn">
            <a href="/estudiantes_privados_administrativo">
              <Button>Back</Button>
            </a>
            <div className="actions">
              <Calendar />

              <Button>limpiar filtros</Button>
              <Button>
                <DownloadIcon />
                Exportar
              </Button>
            </div>
            {
              //Cosas de los filtros.
            }
          </div>
          <div className="resumenDeActividadAcademica">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Horas Compradas
                </h3>
                <p className="mt-2 text-3xl font-bold">
                  {studentData.horasPlaneadas}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Horas Restantes
                </h3>
                <p className="mt-2 text-3xl font-bold">
                  {studentData.horasRestantes}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Horas Canceladas
                </h3>
                <p className="mt-2 text-3xl font-bold">
                  {studentData.horasCanceladas}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Canceladas por profesor
                </h3>
                <p className="mt-2 text-3xl font-bold">
                  {studentData.horasCanceladasProfesor}
                </p>
              </div>
            </div>
          </div>
          <div className="calendario">
            <PieChart />
          </div>

          <div className="grafica">
            <Chart />
          </div>
          <div className="informacionDetalladaEstudiante">
            <EstudentData studentData={studentData} />
          </div>
          <div className="ultimasclasesvistas">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell>#12306</TableCell>
                  <TableCell>Nov 02, 2023</TableCell>
                  <TableCell>Carlos David Perez Rocha</TableCell>
                  <TableCell>Presencial</TableCell>
                  <TableCell>3H</TableCell>
                  <TableCell>Completed</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/**
         *       <h1>Student Detail</h1>
      <p>Name: {studentData.name}</p>
      <p>Virtual: {studentData.virtual}</p>
      <p>Presencial: {studentData.presencial}</p>
      <p>Last Register: {studentData.lastRegister}</p>
      <p>Horas Planeadas: {studentData.horasPlaneadas}</p>
      <p>Horas Restantes: {studentData.horasRestantes}</p>
      <p>Cancelados Tarde: {studentData.canceladosTarde}</p>
      <p>Cancelados A Tiempo: {studentData.canceladosATiempo}</p>
         */}
    </div>
  );
};

export default StudentDetail;
