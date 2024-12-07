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
import "./GrupoDetalle.css";
import CrearModGrupo from "../CrearModGrupo";
import { BellIcon, DownloadIcon, PersonIcon } from "@radix-ui/react-icons";
import Calendar from "../../EstudiantesPrivados/Dashboard/Calendar";
import Chart from "../../EstudiantesPrivados/Dashboard/Chart";
import PieChart from "../../EstudiantesPrivados/Dashboard/Chart2";
import { getClassesbyGroupIDDate } from "../../../../provider/adm/Clases/ClasesGrupales/getClassesbyGroupidDate";
import { Dialog, DialogContent, DialogTrigger } from "../../../ui/dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Loader from "../../../Loader/Loader";
import { deleteTeamClass } from "../../../../provider/adm/Clases/ClasesGrupales/deleteTeamClass";
import ModificarClasesGrupo from "./classes/ModificarClasesGrupo";
const GroupDetail = () => {
  const [groupData, setGroupData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem("groupData");
    if (data) {
      setGroupData(JSON.parse(data));
    }
    setDate({
      month: parseInt(new Date().getMonth().toString()) + 1,
      year: new Date().getFullYear().toString(),
    });
  }, []);

  const exportToExcel = () => {
    if (!groupData) {
      console.error("No student data available to export.");
      return;
    }

    // Asegurar que studentData es un array
    const data = Array.isArray(groupData) ? groupData : [groupData];

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

  if (!groupData) {
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
      <div className="dashboardgroup">
        <div className="dashboardcontainergroup">
          <div className="tituloynotificaciones">
            <h2 className="text-xl font-bold text-gray-900">
              Grupo {groupData.name}
            </h2>
            <BellIcon className="h-6 w-6" />
          </div>
          <div className="filtrosandbackbtn">
            <a href="/admin/gruposvista/grupos">
              <Button>Back</Button>
            </a>
            <div className="actions">
              <Calendar
                setDate={(date) => setDate(date)}
                date={date}
                ID={groupData.ID}
                setClasses={setClasses}
                getClasses={getClassesbyGroupIDDate}
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
              <a
                href={`/admin/gruposvista/grupos/groupdetail/studentsgroupcrud?nameGroup=${encodeURIComponent(
                  groupData.name
                )}&idGroup=${groupData.ID}`}
              >
                <Button>
                  <PersonIcon />
                  Ver todos
                </Button>
              </a>
            </div>
          </div>
          <div className="resumenDeActividadAcademica">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Horas Compradas
                </h3>
                <p className="mt-2 text-3xl font-bold">
                  {groupData.hoursPurchased}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Horas gastadas
                </h3>
                <p className="mt-2 text-3xl font-bold">
                  {groupData.hoursSpented}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Horas Canceladas
                </h3>
                <p className="mt-2 text-3xl font-bold">
                  {groupData.horasCanceladas}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Canceladas por profesor
                </h3>
                <p className="mt-2 text-3xl font-bold">
                  {groupData.horasCanceladasProfesor}
                </p>
              </div>
            </div>
          </div>
          <div className="pie">
            <PieChart />
          </div>
          <div className="grafica">
            <Chart />
          </div>
          <div className="informacionDetalladaEstudiante">
            <CrearModGrupo initialData={groupData} />
          </div>
          <div className="ultimasclasesvistas">
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
                {classes.map((classData) => (
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
                    <TableCell>
                      <TrashIcon
                        className="w-6 h-6 text-gray-400"
                        onClick={async () => {
                          try {
                            setLoading(true);
                            await deleteTeamClass(classData.id);
                          } catch (error) {
                            console.log("Error deleting class:", error);
                          } finally {
                            setLoading(false);
                            window.location.reload();
                          }
                        }}
                      />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Pencil1Icon className="w-6 h-6 text-gray-400" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[825px]">
                          <ModificarClasesGrupo data={classData} />
                        </DialogContent>
                      </Dialog>
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

export default GroupDetail;
