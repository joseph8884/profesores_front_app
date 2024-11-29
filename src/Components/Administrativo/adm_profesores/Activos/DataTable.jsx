import React, { useState, useMemo, useEffect } from "react";
import { DataTableDemoTemplate } from "../../../ui/DataTableAdjusted";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { BellIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../../ui/sheet";
import { MoreHorizontal } from "lucide-react";
import Loader from "../../../Loader/Loader";
import { getAllProfesoresActivos } from "../../../../provider/adm/profesores/getProfesoresActivos";
import { Dialog, DialogContent, DialogTrigger } from "../../../ui/dialog";
import CrearProfesorDialog from "./CrearProfesor";
import {deleteProfesor} from "../../../../provider/adm/profesores/deleteProfesor";
import {changeStatusProfesor} from "../../../../provider/adm/profesores/changeStatus";
import CrearEditarProfesorPersonalInfo from "../CrearEditProfesoresInfoPersonal";
import CrearEditarProfesorBankData from "../CrearEditProfesorBankData";


export function DataTableDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  //TraerData
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data_fromAPI = await getAllProfesoresActivos();
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
    return filtered;
  }, [data, searchTerm]);



  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "idUser",
      header: "idUser",
      cell: ({ row }) => <div>{row.getValue("idUser")}</div>,
    },
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
    },
    {
      accessorKey: "countryCode",
      header: "Country Code",
      cell: ({ row }) => <div>{row.getValue("countryCode")}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
      accessorKey: "emergencyContact",
      header: "Emergency Contact",
      cell: ({ row }) => <div>{row.getValue("emergencyContact")}</div>,
    },
    {
      accessorKey: "identificationType",
      header: "Identification Type",
      cell: ({ row }) => <div>{row.getValue("identificationType")}</div>,
    },
    {
      accessorKey: "identificationNumber",
      header: "Identification Number",
      cell: ({ row }) => <div>{row.getValue("identificationNumber")}</div>,
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
        const profesor = row.original;
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
                    <Button variant="ghost">Editar informacion personal</Button>
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
                        {profesor.fullName}.
                      </SheetDescription>
                    </SheetHeader>
                  <CrearEditarProfesorPersonalInfo data={profesor} context={"edit"} />
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que el clic en el menú de acciones active el clic en la fila
                }}
              >
                <Sheet>
                  <SheetTrigger asChild>
                    {/* Este botón será visible solo en pantallas pequeñas */}
                    <Button variant="ghost">Editar informacion bancaria</Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-full md:w-1/3 bg-gray-100 text-black min-h-screen p-6 overflow-y-auto"
                  >
                    <SheetHeader>
                      <SheetTitle className="text-xl font-bold mb-4">
                        Editar profesor informacion bancaria
                      </SheetTitle>
                      <SheetDescription>
                        Llena los datos para editar{" "}
                        {profesor.fullName}.
                      </SheetDescription>
                    </SheetHeader>
                  <CrearEditarProfesorBankData personal_info_teacher={profesor} context={"edit"} />
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
               onClick={async (value) => {
                setLoading(true)  
                try { 
                await changeStatusProfesor(profesor.id) 
                }catch (error) {
                  console.error("Error updating student:", error);
                } finally {
                  window.location.reload();
                  setLoading(false);
                }
              }}>
                <Button variant="ghost">Cambiar estado</Button>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async (e) => {
                  e.stopPropagation();
                  setLoading(true);
                  try {
                    await deleteProfesor(profesor.idUser);
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
            Lista de profesores activos
          </h2>
          <BellIcon className="h-6 w-6" />
        </div>
        <div className="flex items-center py-4 justify-between">
          <Input
            placeholder="Search by name, email or ID"
            className="w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />


          <Button
            variant="ghost"
            onClick={() => {
              setSearchTerm("");
            }}
          >
            Clear filters
          </Button>
          <Dialog>
              <DialogTrigger asChild>
                <Button>Create new student +</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <CrearProfesorDialog/>
              </DialogContent>
            </Dialog>
        </div>
        <DataTableDemoTemplate columns={columns} dataToShow={filteredData}  rowClickToNavigate={"/admin/tablaestudiantes/estudiantesprivados/studentdetail"} localstorage_name={"selected_teacher"} />
      </div>
    </>
  );
}
