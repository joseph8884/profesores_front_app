import React, { useState, useMemo, useEffect } from "react";
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
import { MoreHorizontal } from "lucide-react";
import Loader from "../../../Loader/Loader";
import { getAllProfesoresInactivos } from "../../../../provider/adm/profesores/getProfesoresInactivos";
import { changeStatusProfesor } from "../../../../provider/adm/profesores/changeStatus";
import { DataTableDemoTemplate } from "../../../ui/DataTableAdjusted";
import {deleteProfesor} from "../../../../provider/adm/profesores/deleteProfesor";
export function DataTableDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  //TraerData
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data_fromAPI = await getAllProfesoresInactivos();
        setData(data_fromAPI);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  //Filter

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
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
               onClick={async (value) => {
                setLoading(true)  
                try { 
                await changeStatusProfesor(student.id) 
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
                    await deleteProfesor(student.idUser);
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
      <div className="w-full p-10" style={{ overflowY: "scroll" }}>
        <div className="bg-white rounded-lg flex justify-between items-center p-5">
          <h2 className="text-xl font-bold text-gray-900">
            Lista de profesores inactivos
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
          
        </div>

        <DataTableDemoTemplate columns={columns} dataToShow={filteredData}  rowClickToNavigate={"#"} localstorage_name={"selection_teacher_inactiv"} />

      </div>
    </>
  );
}
