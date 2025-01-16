import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import NavMobile from "../../Nav/NavMobile";
import NavWeb from "../../Nav/NavWeb";
import { Button } from "../../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import "./ProfesorDetalle.css";
import { Dialog, DialogContent, DialogTrigger } from "../../../ui/dialog";
import { BellIcon, DownloadIcon } from "@radix-ui/react-icons";
import Calendar from "../../EstudiantesPrivados/Dashboard/Calendar";
import Loader from "../../../Loader/Loader";
import ClickOnClassEstudentDetailAdmin from "./ClickOnClassEstudentDetailAdmin";
import CrearEditarProfesorBankData from "../CrearEditProfesorBankData";
import { individualclassesByTeacherAndYearMonth } from "../../../../provider/adm/Clases/ClasesIndividuales/individualclassesByTeacherAndYearMonth";
import { teamClassesByTeacherIdAndYearMonth } from "../../../../provider/adm/Clases/ClasesGrupales/teamClassesByTeacherIdAndYearMonth";
import { dashboardTeacher } from "../../../../provider/adm/profesores/dashboardTeacher";
import ClickOnClassTeamAdmin from "./ClickOnClassTeamAdmin";
import { Toaster } from "sonner";
const ProfesoresDashboard = () => {
  const [profesorData, setProfesorData] = useState(null);
  const [classes_grupo, setClasses_grupo] = useState([]);
  const [classes_estudiante, setClassesEstudiante] = useState([]);
  const [teacherInfoClasses, setTeacherInfoClasses] = useState([]);
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = localStorage.getItem("selected_teacher");
      if (data) {
        setProfesorData(JSON.parse(data));
      }
      setDate({
        month: parseInt(new Date().getMonth().toString()) + 1,
        year: new Date().getFullYear().toString(),
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  const exportToExcel = () => {
    if (!profesorData) {
      console.error("No student data available to export.");
      return;
    }

    // Asegurar que studentData es un array
    const data = Array.isArray(profesorData) ? profesorData : [profesorData];

    // Crear hoja de trabajo para datos del profesor
    const worksheetProfesor = XLSX.utils.json_to_sheet(data);
    const headers = Object.keys(data[0]);

    // Formatear encabezados: negrita y centrado
    headers.forEach((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 });
      if (!worksheetProfesor[cellAddress]) return;
      worksheetProfesor[cellAddress].s = {
        font: { bold: true },
        alignment: { horizontal: "center" },
      };
    });

    // Ajustar ancho de columnas
    const columnWidths = headers.map(() => ({ wpx: 150 }));
    worksheetProfesor["!cols"] = columnWidths;

    // Alternar color de filas
    for (let i = 1; i <= data.length; i++) {
      headers.forEach((_, j) => {
        const cellAddress = XLSX.utils.encode_cell({ c: j, r: i });
        if (!worksheetProfesor[cellAddress]) return;
        worksheetProfesor[cellAddress].s = {
          fill: {
            patternType: "solid",
            fgColor: { rgb: i % 2 === 0 ? "FFFFDDDD" : "FFFFFFFF" },
          },
        };
      });
    }

    // Crear libro de trabajo y agregar hojas
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheetProfesor, "DatosProfesor");

    // Agregar hoja para clases grupales
    if (classes_grupo.length > 0) {
      const worksheetGrupo = XLSX.utils.json_to_sheet(classes_grupo);
      XLSX.utils.book_append_sheet(workbook, worksheetGrupo, "ClasesGrupo");
    }

    // Agregar hoja para clases individuales
    if (classes_estudiante.length > 0) {
      const worksheetEstudiante = XLSX.utils.json_to_sheet(classes_estudiante);
      XLSX.utils.book_append_sheet(
        workbook,
        worksheetEstudiante,
        "ClasesEstudiante"
      );
    }

    // Agregar hoja para totales y estadísticas
    const totalsData = [
      {
        "Total Horas Canceladas por Estudiante":
          teacherInfoClasses.classesCanceledUser,
        "Total Horas Canceladas por Profesor":
          teacherInfoClasses.classesCanceledTeacher,
        "Total Clases Dictadas": teacherInfoClasses.hoursHeld,
        "Total Horas Virtuales": teacherInfoClasses.hoursHeldVirtual,
        "Total Horas Presenciales": teacherInfoClasses.hoursHeldInPerson,
      },
    ];
    const worksheetTotals = XLSX.utils.json_to_sheet(totalsData);
    XLSX.utils.book_append_sheet(workbook, worksheetTotals, "Totales");

    // Escribir el libro de trabajo en un buffer y guardarlo
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "DatosProfesorCompleto.xlsx");
  };

  if (!profesorData) {
    return <Loader />;
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ overflowY: "hidden", height: "100vh" }}
    >
      {loading && <Loader />}
      <NavMobile />
      <NavWeb />
      <div className="dashboardprofesor">
        <div className="dashboardcontainergroup">
          <div className="tituloynotificaciones">
            <h2 className="text-xl font-bold text-gray-900">
              Profesor {profesorData.fullName} con id {profesorData.id}
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
                ID={profesorData.id}
                setClasses={setClassesEstudiante}
                getClasses={individualclassesByTeacherAndYearMonth}
                setClasses2={setClasses_grupo}
                getClasses2={teamClassesByTeacherIdAndYearMonth}
                getInforDashboard={dashboardTeacher}
                setInforDashboard={setTeacherInfoClasses}
                setLoading={setLoading}
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
              <Button onClick={exportToExcel}>
                <DownloadIcon />
                Exportar
              </Button>
            </div>
          </div>
          <div className="resumenDeActividadAcademica">
            <div className="actividadCard">
              <h3>Clases canceladas estudiante tarde virual</h3>
              <p className="total">{teacherInfoClasses.hoursCanceledStudentLateVirtual}</p>
            </div>
            <div className="actividadCard">
              <h3>Classes canceled estudiante tarde presencial</h3>
              <p className="total">{teacherInfoClasses.hoursCanceledStudentLateInPerson }</p>
            </div>
            <div className="actividadCard">
              <h3>Clases en persona </h3>
              <p className="total">{teacherInfoClasses.classesHeldInPerson}</p>
            </div>
            <div className="actividadCard">
              <h3>Clases virtuales</h3>
              <p className="total">{teacherInfoClasses.classesHeldVirtual}</p>
            </div>
          </div>
          <div className="informacionDetalladaEstudiante">
            <CrearEditarProfesorBankData personal_info_teacher={profesorData} />
          </div>
          <div className="totales bg-white shadow-md rounded-lg p-6 text-sm">
            {" "}
            {/* Añadido text-sm para reducir el tamaño de la letra */}
            <div className="invoice-item flex justify-between border-b pb-2">
              <span className="font-semibold">Valor por Hora Virtual:</span>
              <span>
                $
                {teacherInfoClasses.hoursHeldVirtual
                  ? (
                      teacherInfoClasses.totalVirtualValue /
                      teacherInfoClasses.hoursHeldVirtual
                    ).toFixed(2)
                  : 0}{" "}
                por hora
              </span>
            </div>
            <div className="invoice-item flex justify-between border-b pb-2">
              <span className="font-semibold">Valor por Hora Presencial:</span>
              <span>
                $
                {teacherInfoClasses.hoursHeldInPerson
                  ? (
                      teacherInfoClasses.totalInPersonValue /
                      teacherInfoClasses.hoursHeldInPerson
                    ).toFixed(2)
                  : 0}{" "}
                por hora
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Totales</h2>
            <div className="invoice space-y-4">
              <div className="invoice-item flex justify-between border-b pb-2">
                <span className="font-semibold">Horas Totales:</span>
                <span>{teacherInfoClasses.hoursHeld || 0} horas</span>
              </div>
              <div className="invoice-item flex justify-between border-b pb-2">
                <span className="font-semibold">Horas Virtuales:</span>
                <span>{teacherInfoClasses.hoursHeldVirtual || 0} horas</span>
              </div>
              <div className="invoice-item flex justify-between border-b pb-2">
                <span className="font-semibold">Horas Presenciales:</span>
                <span>{teacherInfoClasses.hoursHeldInPerson || 0} horas</span>
              </div>
              <div className="invoice-item flex justify-between border-b pb-2">
                <span className="font-semibold">
                  Horas Canceladas por Estudiante (Virtual):
                </span>
                <span>
                  {teacherInfoClasses.hoursCanceledStudentLateVirtual || 0}{" "}
                  horas
                </span>
              </div>
              <div className="invoice-item flex justify-between border-b pb-2">
                <span className="font-semibold">
                  Horas Canceladas por Estudiante (Presencial):
                </span>
                <span>
                  {teacherInfoClasses.hoursCanceledStudentLateInPerson || 0}{" "}
                  horas
                </span>
              </div>
              <div className="invoice-item flex justify-between border-b pb-2">
                <span className="font-semibold">
                  Horas Canceladas por Profesor:
                </span>
                <span>
                  {teacherInfoClasses.hoursCanceledTeacherLate || 0} horas
                </span>
              </div>
              <div className="invoice-item flex justify-between border-b pb-2">
                <span className="font-semibold">Valor Total Virtual:</span>
                <span>
                  ${(teacherInfoClasses.totalVirtualValue || 0).toFixed(2)}
                </span>
              </div>
              <div className="invoice-item flex justify-between border-b pb-2">
                <span className="font-semibold">Valor Total Presencial:</span>
                <span>
                  ${(teacherInfoClasses.totalInPersonValue || 0).toFixed(2)}
                </span>
              </div>
              <div className="invoice-item flex justify-between text-xl font-bold mt-4">
                <span>Total Ganado:</span>
                <span>
                  $
                  {(
                    (teacherInfoClasses.totalVirtualValue || 0) +
                    (teacherInfoClasses.totalInPersonValue || 0)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="ultimas_clases_grupo">
            <h2>
              <b>Clases de los equipos</b>
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>clase ID</TableHead>
                  <TableHead>teacher ID</TableHead>
                  <TableHead>team ID</TableHead>
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
                        <TableCell>{classData.teacherId}</TableCell>
                        <TableCell>{classData.teamID}</TableCell>
                        <TableCell>
                          {new Date(classData.dateTime).toLocaleString("es", {
                            weekday: "long", // e.g., Monday
                            year: "numeric", // e.g., 2024
                            month: "long", // e.g., December
                            day: "numeric", // e.g., 9
                            hour: "2-digit", // e.g., 01
                            minute: "2-digit", // e.g., 30
                            second: "2-digit", // e.g., 45
                            hour12: true, // e.g., AM/PM format
                          })}
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
                      <ClickOnClassTeamAdmin teamID={classData.teamID} />
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
                  <TableHead>teacher ID</TableHead>
                  <TableHead>Estudiante ID</TableHead>
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
                          {new Date(classData.dateTime).toLocaleString("es", {
                            weekday: "long", // e.g., Monday
                            year: "numeric", // e.g., 2024
                            month: "long", // e.g., December
                            day: "numeric", // e.g., 9
                            hour: "2-digit", // e.g., 01
                            minute: "2-digit", // e.g., 30
                            second: "2-digit", // e.g., 45
                            hour12: true, // e.g., AM/PM format
                          })}
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
                      <ClickOnClassEstudentDetailAdmin
                        studentId={classData.studentID}
                      />
                    </DialogContent>
                  </Dialog>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ProfesoresDashboard;
