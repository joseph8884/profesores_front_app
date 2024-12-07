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
import { getClassesbyGroupIDDate } from "../../../../provider/adm/Clases/ClasesGrupales/getClassesbyGroupidDate";
import Loader from "../../../Loader/Loader";
import CrearEditarProfesorBankData from "../CrearEditProfesorBankData";
import { getBankDataTeacherbyID } from "../../../../provider/adm/profesores/BankData/getBankData";
const ProfesoresDashboard = () => {
  const [profesorData, setProfesorData] = useState(null);
  const [profesorBankData, setProfesorBankData] = useState(null);
  const [classes_grupo, setClasses_grupo] = useState([]);
  const [classes_estudiante, setClassesEstudiante] = useState([]);
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
      try {
        setProfesorBankData(await getBankDataTeacherbyID(data.id));
      } catch
        (error) {
        setProfesorBankData(null);
        console.error("No hay estudiantes", error);
      }
      finally {  
        setLoading(false);
      }
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

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Formatear encabezados: negrita y centrado
    const headers = Object.keys(data[0]);
    headers.forEach((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 });
      if (!worksheet[cellAddress]) return;
      worksheet[cellAddress].s = {
        font: { bold: true },
        alignment: { horizontal: "center" },
      };
    });

    // Ajustar ancho de columnas
    const columnWidths = headers.map(() => ({ wpx: 150 }));
    worksheet["!cols"] = columnWidths;

    // Alternar color de filas
    for (let i = 1; i <= data.length; i++) {
      headers.forEach((_, j) => {
        const cellAddress = XLSX.utils.encode_cell({ c: j, r: i });
        if (!worksheet[cellAddress]) return;
        worksheet[cellAddress].s = {
          fill: {
            patternType: "solid",
            fgColor: { rgb: i % 2 === 0 ? "FFFFDDDD" : "FFFFFFFF" },
          },
        };
      });
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DatosEstudiante");
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "DatosEstudiante.xlsx");
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
                ID={profesorData.ID}
                setClasses={setClassesEstudiante}
                getClasses={getClassesbyGroupIDDate}
                setClasses2={setClassesEstudiante}
                getClasses2={getClassesbyGroupIDDate}
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
          <div className="resumenDeActividadAcademica">jdnsa</div>
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
                          classData.classHelded ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {/* Indicador de color: Verde para "activo", Rojo para "inactivo" */}
                        <span className="w-2 h-2 rounded-full mr-3 bg-white"></span>
                        {/* Texto del estado */}
                        <span>
                          {classData.classHelded ? "Completed" : "Cancelled"}{" "}
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
                          classData.classHelded ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {/* Indicador de color: Verde para "activo", Rojo para "inactivo" */}
                        <span className="w-2 h-2 rounded-full mr-3 bg-white"></span>
                        {/* Texto del estado */}
                        <span>
                          {classData.classHelded ? "Completed" : "Cancelled"}{" "}
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
