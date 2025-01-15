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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../ui/alert-dialog";
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
import { infodashboardGrupo } from "../../../../provider/adm/Clases/ClasesGrupales/infodashboardGrupo";
import { Toaster } from "sonner";
const GroupDetail = () => {
  const [groupData, setGroupData] = useState();
  const [classes, setClasses] = useState([]);
  const [date, setDate] = useState([]);
  const [inforDashboard, setInforDashboard] = useState([]);
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
      console.error("No group data available to export.");
      return;
    }

    // Datos del grupo
    const groupSheetData = [
      { "Nombre del Grupo": groupData.name },
      { ID: groupData.ID },
      // Agregar más campos relevantes si es necesario
    ];
    const groupWorksheet = XLSX.utils.json_to_sheet(groupSheetData);

    // Datos de las clases del grupo
    const classSheetData = classes.map((clase) => ({
      "Clase ID": clase.id,
      "Profesor ID": clase.teacherID,
      "Tipo de Clase": clase.classType,
      Fecha: new Date(clase.dateTime).toLocaleDateString(),
      Duración: `${clase.duration} H`,
      Estado: clase.classHeld ? "Completada" : "Cancelada",
      "Razón de Cancelación": clase.cancellationReason,
      "Momento de Cancelación": clase.cancellationTiming,
      "Cancelado por": clase.canceledBy,
    }));
    const classWorksheet = XLSX.utils.json_to_sheet(classSheetData);

    // Datos de totales y estadísticas
    const totalsData = [
      {
        "Total Horas Canceladas por Estudiante":
          inforDashboard.classesCanceledUser,
        "Total Horas Canceladas por Profesor":
          inforDashboard.classesCanceledTeacher,
        "Total Clases Dictadas": inforDashboard.hoursHeld,
        "Total Horas Virtuales": inforDashboard.hoursHeldVirtual,
        "Total Horas Presenciales": inforDashboard.hoursHeldInPerson,
      },
    ];
    const totalsWorksheet = XLSX.utils.json_to_sheet(totalsData);

    // Crear el libro de trabajo y agregar las hojas
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, groupWorksheet, "DatosGrupo");
    XLSX.utils.book_append_sheet(workbook, classWorksheet, "Clases");
    XLSX.utils.book_append_sheet(workbook, totalsWorksheet, "Totales");

    // Escribir el archivo Excel
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "DatosGrupoCompleto.xlsx");
  };

  if (!groupData || !date || !inforDashboard || !classes ) {
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
                getInforDashboard={infodashboardGrupo}
                setInforDashboard={setInforDashboard}
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
              <a
                href={`/admin/gruposvista/grupos/groupdetail/studentsgroupcrud?nameGroup=${encodeURIComponent(
                  groupData.name
                )}&teamId=${groupData.ID}&year=${date.year}&month=${
                  date.month
                }`}
              >
                <Button>
                  <PersonIcon />
                  Ver todos
                </Button>
              </a>
            </div>
          </div>
          <div className="resumenDeActividadAcademica">
            <div className="actividadCard">
              <h3>Total de horas canceladas tarde grupo virtual</h3>
              <p className="total">
                {inforDashboard.hoursCanceledStudentLateVirtual}
              </p>
            </div>
            <div className="actividadCard">
              <h3>Total de horas canceladas tarde grupo presencial</h3>
              <p className="total">
                {inforDashboard.hoursCanceledStudentLateInPerson}
              </p>
            </div>
            <div className="actividadCard">
              <h3>Total de clases dictadas</h3>
              <p className="total">{inforDashboard.hoursHeld}</p>
            </div>
            <div className="actividadCard">
              <h3>Total horas virtuales</h3>
              <p className="total">{inforDashboard.hoursHeldVirtual}</p>
            </div>
            <div className="actividadCard">
              <h3>Total horas presenciales</h3>
              <p className="total">{inforDashboard.hoursHeldInPerson}</p>
            </div>
          </div>
          {inforDashboard.monthlyClassStats && (
            <>
              <div className="pie">
                <PieChart data={inforDashboard} />
              </div>
              <div className="grafica">
                <Chart data={inforDashboard} />
              </div>
            </>
          )}

          <div className="informacionDetalladaEstudiante">
            <CrearModGrupo initialData={groupData} flag={1} />
          </div>
          <div className="ultimasclasesvistas">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Crear Clase</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[825px]">
                <ModificarClasesGrupo data={{}} teamID={groupData.ID} />
              </DialogContent>
            </Dialog>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>clase ID</TableHead>
                  <TableHead>teacherID</TableHead>
                  <TableHead>teacher name</TableHead>
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
                    <TableCell>{classData.teacherId}</TableCell>
                    <TableCell>{classData.teacherName}</TableCell>
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
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <TrashIcon className="w-6 h-6 text-gray-400" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              ¿Estás absolutamente seguro?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Esto eliminará
                              permanentemente la clase y todos sus datos
                              asociados.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async (e) => {
                                e.stopPropagation();
                                setLoading(true);
                                try {
                                  setLoading(true);
                                  await deleteTeamClass(classData.id);
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 2000);
                                } catch (error) {
                                  console.error(
                                    "Error eliminando la clase:",
                                    error
                                  );
                                } finally {
                                  setLoading(false);
                                }
                              }}
                            >
                              Sí, eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Pencil1Icon className="w-6 h-6 text-gray-400" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[825px]">
                          <ModificarClasesGrupo data={classData} teamID={groupData.ID} />
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
      <Toaster />
    </div>
  );
};

export default GroupDetail;
