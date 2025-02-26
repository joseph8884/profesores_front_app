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
import { BellIcon } from "@radix-ui/react-icons";
import { DownloadIcon } from "@radix-ui/react-icons";
import Calendar from "./Calendar";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Dialog, DialogContent, DialogTrigger } from "../../../ui/dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { Pencil1Icon } from "@radix-ui/react-icons";
import ModificarClases from "./classes/ModificarClases";
import { getClassesbyStudentIDDate } from "../../../../provider/adm/Clases/ClasesIndividuales/getClassesbyStudentIDDate";
import { deleteIndividualClass } from "../../../../provider/adm/Clases/ClasesIndividuales/deleteIndividualClass";
import { infodashboardIndividual } from "../../../../provider/adm/Clases/ClasesIndividuales/infodashboardIndividual";
import Loader from "../../../Loader/Loader";
import { Toaster } from "sonner";
const StudentDetail = () => {
  const [studentData, setStudentData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentInfoClasses, setStudentInfoClasses] = useState([]);
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

    // Datos completos del estudiante
    const studentSheetData = [
      { "Nombre Completo": studentData.fullName },
      { ID: studentData.id },
      { Email: studentData.email },
      { Teléfono: studentData.phoneNumber },
      { "Código de País": studentData.countryCode },
      { Estado: studentData.status ? "Activo" : "Inactivo" },
      // Agregar más campos relevantes si es necesario
    ];
    const studentWorksheet = XLSX.utils.json_to_sheet(studentSheetData);

    // Datos completos de las clases
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
          studentInfoClasses.classesCanceledUser,
        "Total Horas Canceladas por Profesor":
          studentInfoClasses.classesCanceledTeacher,
        "Total Clases Dictadas": studentInfoClasses.hoursHeld,
        "Total Horas Virtuales": studentInfoClasses.hoursHeldVirtual,
        "Total Horas Presenciales": studentInfoClasses.hoursHeldInPerson,
      },
    ];
    const totalsWorksheet = XLSX.utils.json_to_sheet(totalsData);

    // Crear el libro de trabajo y agregar las hojas
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, studentWorksheet, "DatosEstudiante");
    XLSX.utils.book_append_sheet(workbook, classWorksheet, "Clases");
    XLSX.utils.book_append_sheet(workbook, totalsWorksheet, "Totales");

    // Escribir el archivo Excel
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "DatosEstudianteCompleto.xlsx");
  };

  if (!studentData) {
    return (
      <div className="flex">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ overflowY: "hidden", height: "100vh" }}
    >
      {loading && <Loader />}
      <NavMobile />
      <NavWeb />
      <div className="dashboardstudiantesadmvista">
        <div className="dashboardcontainerstudentviewadmin">
          <div className="tituloynotificaciones">
            <h2 className="text-xl font-bold text-gray-900">
              Informacion Estudiante {studentData.fullName} con id=
              {studentData.ID}
            </h2>
            <BellIcon className="h-6 w-6" />
          </div>
          <div className="filtrosandbackbtn">
            <a href="/admin/tablaestudiantes/estudiantesprivados">
              <Button>Back</Button>
            </a>
            <div className="actions">
              <Calendar
                setDate={(date) => setDate(date)}
                date={date}
                ID={studentData.ID}
                setClasses={setClasses}
                getClasses={getClassesbyStudentIDDate}
                getInforDashboard={infodashboardIndividual}
                setInforDashboard={setStudentInfoClasses}
                setLoading={setLoading}
              />

              <Button
                onClick={() => {
                  const currentDate = new Date();
                  const dateObj = {
                    month: (currentDate.getMonth() + 1).toString(),
                    year: currentDate.getFullYear().toString(),
                  };
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
              <h3>Total de horas canceladas tarde estudiante virtual</h3>
              <p className="total">
                {studentInfoClasses.hoursCanceledStudentLateVirtual}{" "}
              </p>
            </div>
            <div className="actividadCard">
              <h3>Total de horas canceladas tarde estudiante presencial </h3>
              <p className="total">
                {studentInfoClasses.hoursCanceledStudentLateInPerson}
              </p>
            </div>
            <div className="actividadCard">
              <h3>Total de clases dictadas</h3>
              <p className="total">{studentInfoClasses.hoursHeld}</p>
            </div>
            <div className="actividadCard">
              <h3>Total horas virtuales</h3>
              <p className="total">{studentInfoClasses.hoursHeldVirtual}</p>
            </div>
            <div className="actividadCard">
              <h3>Total horas presenciales</h3>
              <p className="total">{studentInfoClasses.hoursHeldInPerson}</p>
            </div>
          </div>
          {studentInfoClasses.monthlyClassStats && (
            <>
              <div className="calendario">
                <PieChart data={studentInfoClasses} />
              </div>
              <div className="grafica">
                <Chart data={studentInfoClasses} />
              </div>
            </>
          )}
          <div className="informacionDetalladaEstudiante">
            <ModifircarEstudiante data={studentData} context={"editar"} flag={1} />
          </div>
          <div className="ultimasclasesvistas">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Crear Clase</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[825px]">
                <ModificarClases data={{}} studentID={studentData.ID} />
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
                              permanentemente la clase con ID {classData.id} y
                              todos sus datos asociados.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async (e) => {
                                e.stopPropagation();
                                setLoading(true);
                                try {
                                  await deleteIndividualClass(classData.id);
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 2000);
                                } catch (error) {
                                  console.error(
                                    "Error eliminando al estudiante:",
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
                          <ModificarClases data={classData} />
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

export default StudentDetail;
