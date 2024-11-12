import React, { useEffect, useState } from "react";
import NavMobile from "../Nav/NavMobile";
import NavWeb from "../Nav/NavWeb";
import { Button } from "../../ui/button";
import "./DashBoard.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Calendar from "./Calendar";
const DashBoardProfesor = () => {
  const [date, setDate] = useState([]);
  useEffect(() => {
    setDate({
      month: parseInt(new Date().getMonth().toString()) + 1,
      year: new Date().getFullYear().toString(),
    });
  }, []);

  return (
    <div className="flex" style={{ overflowY: "hidden", height: "100vh" }}>
      <NavMobile />
      <NavWeb />
      <div className="dashboard">
        <div className="dashboardcontainer">
          <div className="tituloynotificaciones">
            <h2 className="text-xl font-bold text-gray-900">
              Dashboard Profesor
            </h2>
          </div>
          <div className="filtrosandbackbtn">
            <div className="actions">
              <Calendar setDate={(date) => setDate(date)} date={date} />

              <Button
                onClick={() => {
                  const currentDate = new Date();
                  const dateObj = {
                    month: (currentDate.getMonth() + 1).toString(),
                    year: currentDate.getFullYear().toString(),
                  };
                  console.log(dateObj);
                  setDate(dateObj);
                }}
              >
                limpiar filtros
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
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Horas Restantes
                </h3>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Horas Canceladas
                </h3>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Canceladas por profesor
                </h3>
              </div>
            </div>
          </div>
          <div className="calendario">
          </div>

          <div className="grafica">
          </div>
          <div className="informacionDetalladaEstudiante">
            Algo va aca
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

    </div>
  );
};

export default DashBoardProfesor;
