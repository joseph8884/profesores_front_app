import React, { useEffect, useState } from "react";
import NavMobile from "../../Nav/NavMobile";
import NavWeb from "../../Nav/NavWeb";
import { Button } from "../../../ui/button";
import "./EstudianteDetalle.css";
import ModifircarEstudiante from "../CrearEstudiante";
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
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
const StudentDetail = () => {
  const [studentData, setStudentData] = useState(null);
  const [date, setDate] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("selected_student");
    if (data) {
      setStudentData(JSON.parse(data));
    }
    setDate({
      month: parseInt(new Date().getMonth().toString()) + 1,
      year: new Date().getFullYear().toString(),
    });
  }, []);
  
  const exportToExcel = () => {
    if (!studentData) {
      console.error("No student data available to export.");
      return;
    }

    // Asegurar que studentData es un array
    const data = Array.isArray(studentData) ? studentData : [studentData];

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

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex" style={{ overflowY: "hidden", height: "100vh", width:"100vw" }}>
      <NavMobile />
      <NavWeb />
      <div className="dashboard-studiantesadm">
        <div className="dashboardcontainer">
          <div className="tituloynotificaciones">
            <h2 className="text-xl font-bold text-gray-900">
              Estudiantes Individuales
            </h2>
            <BellIcon className="h-6 w-6" />
          </div>
          <div className="filtrosandbackbtn">
            <a href="/admin/tablaestudiantes/estudiantesprivados">
              <Button>Back</Button>
            </a>
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
              <Button onClick={exportToExcel}>
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
            <ModifircarEstudiante data={studentData} context={"editar"}/>
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

export default StudentDetail;
