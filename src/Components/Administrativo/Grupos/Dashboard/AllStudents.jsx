import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
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
} from "../../../ui/pagination";
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
import { Sheet, SheetTrigger } from "../../../ui/sheet";
import { MoreHorizontal } from "lucide-react";
//import CrearEditarEstudiante from "./CreaEditStudentCustom";
import { getStudentsCustomWithDate } from "../../../../provider/adm/Grupos/students/getStudetsCustombyTeamid";
//import { delateStudentAPI } from "../../../provider/adm/EstudiantePersonalizado/delateStudent";
import Loader from "../../../Loader/Loader";
import NavMobile from "../../Nav/NavMobile";
import NavWeb from "../../Nav/NavWeb";
import CrearEditarEstudianteCustom from "./CreaEditStudentCustom";
import { deleteTeamStudent } from "../../../../provider/adm/Grupos/students/deleteTeamStudent";
import { Toaster } from "sonner";
const StudentsGroupCRUD = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nameGroup = params.get("nameGroup");
  const teamId = params.get("teamId");
  const month = params.get("month");
  const year = params.get("year");
  //Pagination variables
  const itemsPerPage = 10;
  //TraerData
  useEffect(() => {
    setLoading(true);
    const fetchStudents = async () => {
      try {
        const data_fromAPI = await getStudentsCustomWithDate(
          teamId,
          month,
          year
        );
        setData(data_fromAPI);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
    setLoading(false);
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

  const columns = tableConfig();
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
    <div
      className="flex"
      style={{ overflowY: "hidden", height: "100vh", maxWidth: "100%" }}
    >
      <NavMobile />
      <NavWeb />

      {loading && <Loader />}
      <div className="w-full" style={{ overflowY: "scroll" }}>
        <div className="bg-white rounded-lg flex justify-between items-center p-5">
          <h2 className="text-xl font-bold text-gray-900">
            Lista de estudiantes del grupo <u>{nameGroup}</u>
          </h2>
          <BellIcon className="h-6 w-6" />
        </div>
        <div className="flex items-center py-4 justify-between">
          <a href="/admin/gruposvista/grupos/groupdetail">
            <Button>Back</Button>
          </a>
          <Input
            placeholder="Search by name, email or ID"
            className="w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Botones de filtros */}
          <Button
            variant="ghost"
            onClick={() => {
              setSearchTerm("");
            }}
          >
            Clear filters
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Create new student +</Button>
            </SheetTrigger>
            <CrearEditarEstudianteCustom
              data={{}}
              context={"create"}
              idGroup={teamId}
            />
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
                  <TableRow key={row.id}>
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
      <Toaster />
    </div>
  );
};

export default StudentsGroupCRUD;

const tableConfig = (setLoading) => {
  //Tabla config
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "teamID",
      header: "Team ID",
      cell: ({ row }) => <div>{row.getValue("teamID")}</div>,
    },
    {
      accessorKey: "fullName",
      header: "Full Name",
      cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "attendancePercentage",
      header: "Attendance Percentage",
      cell: ({ row }) => <div>{row.getValue("attendancePercentage")}%</div>,
    },
    {
      accessorKey: "classesAttended",
      header: "Attended Classes Count",
      cell: ({ row }) => <div>{row.getValue("classesAttended")}</div>,
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
                  <CrearEditarEstudianteCustom
                    data={student}
                    context={"edit"}
                    idGroup={student.teamID}
                  />
                </Sheet>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant="ghost">Eliminar</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        ¿Estás absolutamente seguro?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará
                        permanentemente al estudiante y todos sus datos
                        asociados.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            await deleteTeamStudent(student.id);
                            setTimeout(() => {
                              window.location.reload();
                            }, 2000);
                          } catch (error) {
                            console.error(
                              "Error eliminando al estudiante:",
                              error
                            );
                          }
                        }}
                      >
                        Sí, eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
