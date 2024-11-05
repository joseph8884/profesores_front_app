import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { BellIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import { Sheet, SheetTrigger, SheetContent } from "../../ui/sheet";
import { MoreHorizontal } from "lucide-react";
import CrearEditarEstudiante from "./CrearEstudiante";
import { getStudents } from "../../../provider/adm/EstudiantePersonalizado/getStudents";
import { delateStudentAPI } from "../../../provider/adm/EstudiantePersonalizado/delateStudent";
import Loader from "../../Loader/Loader";

export function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  //Pagination variables
  const itemsPerPage = 10;
  const navigate = useNavigate();
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

    if (statusFilter !== null) {
      // Ensure statusFilter is checked correctly
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    return filtered;
  }, [data, searchTerm, statusFilter]);

  // Manejador para cambiar el filtro de estado
  const toggleStatusFilter = (status) => {
    if (statusFilter === status) {
      setStatusFilter(null); // Si el filtro ya está activo, se desactiva
    } else {
      setStatusFilter(status === "Activo"); // Set to true for "Activo" and false for "Inactivo"
    }
  };

  //ROWCLICK
  const handleRowClick = (row, event) => {
    localStorage.setItem("selected_student", JSON.stringify(row.original));
    if (event.target.closest(".dropdown-menu")) {
      return;
    }
    navigate("/admin/tablaestudiantes/estudiantesprivados/studentdetail");
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredData]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 9;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      if (currentPage <= 5) {
        for (let i = 1; i <= 6; i++) {
          pageNumbers.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        pageNumbers.push(<span key="dots-1">...</span>);
        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(totalPages)}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (currentPage >= totalPages - 4) {
        pageNumbers.push(
          <PaginationItem key={1}>
            <PaginationLink href="#" onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        );
        pageNumbers.push(<span key="dots-2">...</span>);
        for (let i = totalPages - 5; i <= totalPages; i++) {
          pageNumbers.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        pageNumbers.push(
          <PaginationItem key={1}>
            <PaginationLink href="#" onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        );
        pageNumbers.push(<span key="dots-3">...</span>);
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        pageNumbers.push(<span key="dots-4">...</span>);
        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(totalPages)}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
      accessorKey: "virtual",
      header: "Virtual",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("virtual")}</div>
      ),
    },
    {
      accessorKey: "presencial",
      header: "Presencial",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("presencial")}</div>
      ),
    },
    {
      accessorKey: "lastLog",
      header: "Ultimo registro de clase",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("lastLog")}</div>
      ),
    },
    {
      accessorKey: "hoursPurchased",
      header: "Horas Compradas",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("hoursPurchased")}</div>
      ),
    },
    {
      accessorKey: "hoursSpented",
      header: "Horas consumidas",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("hoursSpented")}</div>
      ),
    },
    {
      accessorKey: "canceladosATiempo",
      header: "Canceladas a tiempo",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("canceladosATiempo")}</div>
      ),
    },
    {
      accessorKey: "canceladosTarde",
      header: "Cancelados tarde",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("canceladosTarde")}</div>
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
                  <CrearEditarEstudiante data={student} context={"edit"} />
                </Sheet>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async (e) => {
                  e.stopPropagation();
                  setLoading(true);
                  try {
                    await delateStudentAPI(student.idUser);
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

  const table = useReactTable({
    data: currentItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

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
        <div className="flex items-center py-4 justify-between">
          <Input
            placeholder="Search by name, email or ID"
            className="w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Botones de filtros */}
          <Button
            variant={statusFilter === true ? "solid" : "outline"} // Check for true for "Activo"
            onClick={() => toggleStatusFilter("Activo")}
            className={statusFilter === true ? "bg-green-500 text-white" : ""}
          >
            Activo
          </Button>
          <Button
            variant={statusFilter === false ? "solid" : "outline"} // Check for false for "Inactivo"
            onClick={() => toggleStatusFilter("Inactivo")}
            className={statusFilter === false ? "bg-red-500 text-white" : ""}
          >
            Inactivo
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setStatusFilter(null);
              setSearchTerm("");
            }}
          >
            Clear filters
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Create new student +</Button>
            </SheetTrigger>
            <CrearEditarEstudiante data={{}} context={"create"} />
          </Sheet>
        </div>

        <div className="rounded-md border">
          <Table key={`table-page-${currentPage}`}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={(event) => handleRowClick(row, event)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {renderPageNumbers()}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
