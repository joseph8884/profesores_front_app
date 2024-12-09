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
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { useLocation } from "react-router-dom";
import Calendar from "../../../Components/Administrativo/EstudiantesPrivados/Dashboard/Calendar";
import { BellIcon } from "@radix-ui/react-icons";
import Loader from "../../Loader/Loader";
import { individualclassesByTeacherAndYearMonth } from "../../../provider/profesor/EstudianteIndividual/individualclassesByTeacherAndYearMonth";
import { teamClassesByTeacherIdAndYearMonth } from "../../../provider/profesor/Grupos/teamClassesByTeacherIdAndYearMonth";
import { getStudentById } from "../../../provider/adm/EstudiantePersonalizado/getStudentById";
const DashBoardProfesor = () => {
  const [date, setDate] = useState([]);
  const [classes_grupo, setClasses_grupo] = useState([]);
  const [classes_estudiante, setClassesEstudiante] = useState([]);
  const [info, setInfo] = useState({});
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const teacherId = params.get("profesorId");

  useEffect(() => {
    setDate({
      month: parseInt(new Date().getMonth().toString()) + 1,
      year: new Date().getFullYear().toString(),
    });
  }, []);
  if (date.length === 0) {
    return <Loader />;
  }
  //TODO: trear info del estudiante por id con getStudentById and team

  return (
    <div
      className="min-h-screen flex"
      style={{ overflowY: "hidden", height: "100vh" }}
    >
      <NavMobile />
      <NavWeb />
      <div className="dashboardprofesor">
        <div className="dashboardcontainergroup">
          <div className="tituloynotificaciones">
            <h2 className="text-xl font-bold text-gray-900">
              Profesor ____ nombre ___ con id {teacherId}
            </h2>
            <BellIcon className="h-6 w-6" />
          </div>
          <div className="filtrosandbackbtn">
            <a href="/admin/profesores/activos">
              <Button>Back</Button>
            </a>
            <div className="actions">
              <Calendar
                setDate={(date) => setDate(date)}
                date={date}
                ID={teacherId}
                setClasses={setClassesEstudiante}
                getClasses={individualclassesByTeacherAndYearMonth}
                setClasses2={setClasses_grupo}
                getClasses2={teamClassesByTeacherIdAndYearMonth}
                getInforDashboard={info}
                setInforDashboard={setInfo}
              />

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
          </div>
          <div className="resumenDeActividadAcademica">
            <div className="actividadCard">
              <h3>Total de horas dictadas</h3>
              <p className="total">0</p>
            </div>
            <div className="actividadCard">
              <h3>Total de horas virtuales</h3>
              <p className="total">0</p>
            </div>
            <div className="actividadCard">
              <h3>Total de horas presenciales</h3>
              <p className="total">0</p>
            </div>
            <div className="actividadCard">
              <h3>T. horas canceladas a tiempo profesor</h3>
              <p className="total">0</p>
            </div>
          </div>
          <div className="informacionDetalladaEstudiante"></div>
          <div className="ultimas_clases_grupo">
            <h2>
              <b>Clases de los equipos</b>
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>clase ID</TableHead>
                  <TableHead>teacherID</TableHead>
                  <TableHead>Team ID</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo de clase</TableHead>
                  <TableHead>Duracion</TableHead>
                  <TableHead>Cancelacion</TableHead>
                  <TableHead>Cancelado por</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes_grupo.map((classData) => (
                  <Dialog key={classData.id}>
                    <DialogTrigger asChild>
                      <TableRow>
                        <TableCell>{classData.id}</TableCell>
                        <TableCell>{classData.teacherID}</TableCell>
                        <TableCell>{classData.teamID}</TableCell>
                        <TableCell>
                          {new Date(classData.dateTime).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{classData.classType}</TableCell>
                        <TableCell>{classData.duration} H</TableCell>
                        <TableCell>{classData.cancellationTiming}</TableCell>
                        <TableCell>{classData.canceledBy}</TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center justify-center p-1 rounded-lg text-white font-semibold ${
                              classData.classHeld
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full mr-3 bg-white"></span>
                            <span>
                              {classData.classHeld ? "Completed" : "Cancelled"}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] p-4">
                      <h3 className="text-lg font-bold">
                        Información de la clase
                      </h3>
                      <p>ID de clase: {classData.id}</p>
                      <p>Tipo de clase: {classData.classType}</p>
                      <p>Duración: {classData.duration} H</p>
                      <p>Cancelado por: {classData.canceledBy}</p>
                      {/* Agrega más detalles según sea necesario */}
                    </DialogContent>
                  </Dialog>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="ultimas_clases_estudiante">
            <h2>
              <b>Clases de los estudiantes privados</b>
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>clase ID</TableHead>
                  <TableHead>teacherID</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo de clase</TableHead>
                  <TableHead>Duracion</TableHead>
                  <TableHead>Cancelacion</TableHead>
                  <TableHead>Cancelado por</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes_estudiante.map((classData) => (
                  <Dialog key={classData.id}>
                    <DialogTrigger asChild>
                      <TableRow key={classData.id}>
                        <TableCell>{classData.id}</TableCell>
                        <TableCell>{classData.teacherID}</TableCell>
                        <TableCell>{classData.studentID}</TableCell>
                        <TableCell>
                          {new Date(classData.dateTime).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{classData.classType}</TableCell>
                        <TableCell>{classData.duration} H</TableCell>
                        <TableCell>{classData.cancellationTiming}</TableCell>
                        <TableCell>{classData.canceledBy}</TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center justify-center p-1 rounded-lg text-white font-semibold ${
                              classData.classHeld
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {/* Indicador de color: Verde para "activo", Rojo para "inactivo" */}
                            <span className="w-2 h-2 rounded-full mr-3 bg-white"></span>
                            {/* Texto del estado */}
                            <span>
                              {classData.classHeld ? "Completed" : "Cancelled"}{" "}
                              {/* Updated logic for status */}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] p-4">
                      <h3 className="text-lg font-bold">
                        Información de la clase
                      </h3>
                      <p>ID de clase: {classData.id}</p>
                      <p>Tipo de clase: {classData.classType}</p>
                      <p>Duración: {classData.duration} H</p>
                      <p>Cancelado por: {classData.canceledBy}</p>
                      {/* Agrega más detalles según sea necesario */}
                    </DialogContent>
                  </Dialog>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardProfesor;
