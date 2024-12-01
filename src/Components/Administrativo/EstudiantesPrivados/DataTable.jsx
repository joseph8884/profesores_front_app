import React, { useState, useMemo, useEffect } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { BellIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../ui/sheet";
import { MoreHorizontal } from "lucide-react";
import CrearEditarEstudiante from "./CrearEstudiante";
import { getStudents } from "../../../provider/adm/EstudiantePersonalizado/getStudents";
import { delateStudentAPI } from "../../../provider/adm/EstudiantePersonalizado/delateStudent";
import Loader from "../../Loader/Loader";
import { changeStatusStudent } from "../../../provider/adm/EstudiantePersonalizado/changeStatus";
import {DataTableDemoTemplate} from "../../ui/DataTableAdjusted"
export function DataTableDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [ciudadFilter, setCiudadFilter] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  //TraerData
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data_fromAPI = await getStudents();
        setData(data_fromAPI);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);


  const filteredData = useMemo(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        ["fullName", "email", "id"].some((key) => {
          // Updated to use "fullName"
          const value = item[key];
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    }

    if (statusFilter !== null) {
      // Ensure statusFilter is checked correctly
      filtered = filtered.filter((item) => item.status === statusFilter);
    }
    if (ciudadFilter) {
      filtered = filtered.filter((item) => item.office === ciudadFilter);
    }

    return filtered;
  }, [data, searchTerm, statusFilter, ciudadFilter]);

  // Manejador para cambiar el filtro de estado
  const toggleStatusFilter = (status) => {
    if (statusFilter === status) {
      setStatusFilter(null); // Si el filtro ya está activo, se desactiva
    } else {
      setStatusFilter(status === "Activo"); // Set to true for "Activo" and false for "Inactivo"
    }
  };

  //Tabla config
  const columns = [
    {
      accessorKey: "ID",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("ID")}</div>,
    },
    {
      accessorKey: "photo",
      header: "Photo",
      cell: ({ row }) => (
        <img
          src={row.original.photo || "/profilephoto.jpeg"}
          alt="User"
          className="h-10 w-10 object-cover rounded-full"
        />
      ),
    },
    {
      accessorKey: "fullName", // Changed from "name" to "fullName"
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
    },
    {
      accessorKey: "email", // Changed from "name" to "fullName"
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "hoursPurchased",
      header: "Horas Compradas",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("hoursPurchased")}</div>
      ),
    },
    {
      accessorKey: "hoursRemaining",
      header: "Horas consumidas",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("hoursRemaining")}</div>
      ),
    },
    {
      accessorKey: "office",
      header: "Ciudad a la que pertenece",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("office")}</div>
      ),
    },
    {
      accessorKey: "status", // No change needed here
      header: "Status",
      cell: ({ row }) => (
        <div
          className={`flex items-center justify-center p-1 rounded-lg text-white font-semibold ${
            row.original.status ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {/* Indicador de color: Verde para "activo", Rojo para "inactivo" */}
          <span className="w-2 h-2 rounded-full mr-3 bg-white"></span>
          {/* Texto del estado */}
          <span>
            {row.original.status ? "Activo" : "Inactivo"}{" "}
            {/* Updated logic for status */}
          </span>
        </div>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const student = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que el clic en el menú de acciones active el clic en la fila
                }}
              >
                <Sheet>
                  <SheetTrigger asChild>
                    {/* Este botón será visible solo en pantallas pequeñas */}
                    <Button variant="ghost">Editar</Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-full md:w-1/3 bg-gray-100 text-black min-h-screen p-6 overflow-y-auto"
                  >
                    <SheetHeader>
                      <SheetTitle className="text-xl font-bold mb-4">
                        Editar estudiante individual
                      </SheetTitle>
                      <SheetDescription>
                        Llena los datos para editar un estudiante{" "}
                        {student.fullName}.
                      </SheetDescription>
                    </SheetHeader>
                    <CrearEditarEstudiante data={student} context={"edit"} />
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async (value) => {
                  setLoading(true);
                  try {
                    await changeStatusStudent(student.ID);
                  } catch (error) {
                    console.error("Error updating student:", error);
                  } finally {
                    window.location.reload();
                    setLoading(false);
                  }
                }}
              >
                <Button variant="ghost">Cambiar estado</Button>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async (e) => {
                  e.stopPropagation();
                  setLoading(true);
                  try {
                    await delateStudentAPI(student.ID);
                  } catch (error) {
                    console.error("Error creating student:", error);
                  } finally {
                    setLoading(false);
                    window.location.reload();
                  }
                }}
              >
                <Button variant="ghost">Eliminar</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <div className="w-full" style={{ overflowY: "scroll" }}>
        <div className="bg-white rounded-lg flex justify-between items-center p-5">
          <h2 className="text-xl font-bold text-gray-900">
            Lista de estudiantes individuales
          </h2>
          <BellIcon className="h-6 w-6" />
        </div>
        <div className="flex items-center py-4 gap-6 justify-between">
          <Input
            placeholder="Search by name, email or ID"
            className="w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={ciudadFilter}
            onValueChange={(value) => setCiudadFilter(value)}
          >
            <SelectTrigger className="w-[50%]">
              <SelectValue placeholder="Seleccione una cuidad para filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MEDELLÍN">MEDELLÍN</SelectItem>
              <SelectItem value="BOGOTÁ">BOGOTÁ</SelectItem>
              <SelectItem value="CALI">CALI</SelectItem>
              <SelectItem value="BARRANQUILLA">BARRANQUILLA</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            onClick={() => {
              setStatusFilter(null);
              setSearchTerm("");
              setCiudadFilter("");
            }}
          >
            Clear filters
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Create new student +</Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full md:w-1/3 bg-gray-100 text-black min-h-screen p-6 overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle className="text-xl font-bold mb-4">
                  Crear estudiante individual
                </SheetTitle>
                <SheetDescription>
                  Llena los datos para crear un estudiante nuevo.
                </SheetDescription>
              </SheetHeader>
              <CrearEditarEstudiante data={{}} context={"create"} />
            </SheetContent>
          </Sheet>
        </div>
        <DataTableDemoTemplate columns={columns} dataToShow={filteredData}  rowClickToNavigate={"/admin/tablaestudiantes/estudiantesprivados/studentdetail"} localstorage_name={"selected_student"} />
      </div>
    </>
  );
}
