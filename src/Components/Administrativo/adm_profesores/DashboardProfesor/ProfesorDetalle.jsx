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
import { BellIcon, DownloadIcon } from "@radix-ui/react-icons";
import Calendar from "../../EstudiantesPrivados/Dashboard/Calendar";
import Loader from "../../../Loader/Loader";
import CrearEditarProfesorBankData from "../CrearEditProfesorBankData";
import {individualclassesByTeacherAndYearMonth} from "../../../../provider/adm/Clases/ClasesIndividuales/individualclassesByTeacherAndYearMonth"
import {teamClassesByTeacherIdAndYearMonth} from "../../../../provider/adm/Clases/ClasesGrupales/teamClassesByTeacherIdAndYearMonth"
import {dashboardTeacher} from "../../../../provider/adm/profesores/dashboardTeacher"
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
      XLSX.utils.book_append_sheet(workbook, worksheetEstudiante, "ClasesEstudiante");
    }

    // Agregar hoja para totales y estadísticas
    const totalsData = [
      { 
        "Total Horas Canceladas por Estudiante": teacherInfoClasses.classesCanceledUser,
        "Total Horas Canceladas por Profesor": teacherInfoClasses.classesCanceledTeacher,
        "Total Clases Dictadas": teacherInfoClasses.hoursHeld,
        "Total Horas Virtuales": teacherInfoClasses.hoursHeldVirtual,
        "Total Horas Presenciales": teacherInfoClasses.hoursHeldInPerson
      }
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
              <h3>Total de horas canceladas por el estudiante</h3>
              <p className="total">{teacherInfoClasses.classesCanceledUser}</p>
            </div>
            <div className="actividadCard">
              <h3>Total de horas canceladas por el profeosor </h3>
              <p className="total">{teacherInfoClasses.classesCanceledTeacher}</p>
            </div>
            <div className="actividadCard">
              <h3>Total de clases dictadas</h3>
              <p className="total">{teacherInfoClasses.hoursHeld}</p>
            </div>
            <div className="actividadCard">
              <h3>Total horas virtuales</h3>
              <p className="total">{teacherInfoClasses.hoursHeldVirtual}</p>
            </div>
            <div className="actividadCard">
              <h3>Total horas presenciales</h3>
              <p className="total">{teacherInfoClasses.hoursHeldInPerson}</p>
            </div>
            <h3>Total a pagar por horas virtuales {teacherInfoClasses.totalVirtualValue}</h3>
            <h3>Total a pagar por horas presenciales{teacherInfoClasses.totalInPersonValue}</h3>
          
          </div>
          <div className="informacionDetalladaEstudiante">
            <CrearEditarProfesorBankData personal_info_teacher={profesorData} />
          </div>
          <div className="ultimas_clases_grupo">
            <h2>
              <b>Clases de los equipos</b>
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>clase ID</TableHead>
                  <TableHead>teacherID</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo de clase</TableHead>
                  <TableHead>Duracion</TableHead>
                  <TableHead>Cancelacion</TableHead>
                  <TableHead>Cancelado por</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes_grupo.map((classData) => (
                  <TableRow key={classData.id}>
                    <TableCell>{classData.id}</TableCell>
                    <TableCell>{classData.teacherID}</TableCell>
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
                          classData.classHeld ? "bg-green-500" : "bg-red-500"
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
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo de clase</TableHead>
                  <TableHead>Duracion</TableHead>
                  <TableHead>Cancelacion</TableHead>
                  <TableHead>Cancelado por</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes_estudiante.map((classData) => (
                  <TableRow key={classData.id}>
                    <TableCell>{classData.id}</TableCell>
                    <TableCell>{classData.teacherID}</TableCell>
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
                          classData.classHeld ? "bg-green-500" : "bg-red-500"
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
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfesoresDashboard;
