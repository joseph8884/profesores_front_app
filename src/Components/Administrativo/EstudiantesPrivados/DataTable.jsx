import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
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
  getPaginationRowModel,
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

// Datos ficticios adicionales
const data = [
  {
    photo: "102",
    name: "Carlos David Perez Rocha",
    virtual: "01",
    presencial: "02",
    lastRegister: "12/09/2024",
    horasPlaneadas: "3H",
    horasRestantes: "01",
    canceladosTarde: "03",
    canceladosATiempo: "02",
    action: "View",
  },
  {
    photo: "103",
    name: "Maria Fernanda Lopez",
    virtual: "02",
    presencial: "01",
    lastRegister: "10/08/2024",
    horasPlaneadas: "4H",
    horasRestantes: "02",
    canceladosTarde: "01",
    canceladosATiempo: "03",
    action: "View",
  },
  {
    photo: "104",
    name: "Juan Carlos Martinez",
    virtual: "03",
    presencial: "00",
    lastRegister: "15/07/2024",
    horasPlaneadas: "5H",
    horasRestantes: "03",
    canceladosTarde: "02",
    canceladosATiempo: "01",
    action: "View",
  },
  {
    photo: "105",
    name: "Ana Lucia Gomez",
    virtual: "00",
    presencial: "03",
    lastRegister: "20/06/2024",
    horasPlaneadas: "2H",
    horasRestantes: "01",
    canceladosTarde: "00",
    canceladosATiempo: "04",
    action: "View",
  },
  {
    photo: "106",
    name: "Pedro Antonio Ramirez",
    virtual: "01",
    presencial: "02",
    lastRegister: "25/05/2024",
    horasPlaneadas: "3H",
    horasRestantes: "02",
    canceladosTarde: "01",
    canceladosATiempo: "02",
    action: "View",
  },
  {
    photo: "107",
    name: "Laura Sofia Hernandez",
    virtual: "02",
    presencial: "01",
    lastRegister: "30/04/2024",
    horasPlaneadas: "4H",
    horasRestantes: "03",
    canceladosTarde: "02",
    canceladosATiempo: "01",
    action: "View",
  },
  {
    photo: "108",
    name: "Miguel Angel Torres",
    virtual: "03",
    presencial: "00",
    lastRegister: "05/03/2024",
    horasPlaneadas: "5H",
    horasRestantes: "04",
    canceladosTarde: "03",
    canceladosATiempo: "00",
    action: "View",
  },
  {
    photo: "109",
    name: "Isabella Martinez",
    virtual: "00",
    presencial: "03",
    lastRegister: "10/02/2024",
    horasPlaneadas: "2H",
    horasRestantes: "01",
    canceladosTarde: "00",
    canceladosATiempo: "03",
    action: "View",
  },
  {
    photo: "110",
    name: "Santiago Rodriguez",
    virtual: "01",
    presencial: "02",
    lastRegister: "15/01/2024",
    horasPlaneadas: "3H",
    horasRestantes: "02",
    canceladosTarde: "01",
    canceladosATiempo: "02",
    action: "View",
  },
  {
    photo: "111",
    name: "Valentina Garcia",
    virtual: "02",
    presencial: "01",
    lastRegister: "20/12/2023",
    horasPlaneadas: "4H",
    horasRestantes: "03",
    canceladosTarde: "02",
    canceladosATiempo: "01",
    action: "View",
  },
];

// Estructura de columnas de la tabla

export function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const columns = [
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
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
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
      accessorKey: "lastRegister",
      header: "Last Register",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("lastRegister")}</div>
      ),
    },
    {
      accessorKey: "horasPlaneadas",
      header: "Horas planeadas",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("horasPlaneadas")}</div>
      ),
    },
    {
      accessorKey: "horasRestantes",
      header: "Horas restantes",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("horasRestantes")}</div>
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
                  <CrearEditarEstudiante data={student} />
                </Sheet>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que el clic en el menú de acciones active el clic en la fila
                  // Aquí iría la lógica para eliminar el estudiante
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
  // Función para cambiar de página
  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  // Datos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const table = useReactTable({
    data: currentItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

  // Función para manejar el clic en una fila
  const handleRowClick = (row, event) => {
    // Evitar la navegación si se hace clic en el menú de acciones
    if (event.target.closest(".dropdown-menu")) {
      return;
    }
    // Navigate to the detail page
    navigate("/studentdetail");
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Name, email or id of the student"
          className="w-96"
        />
        <Button variant="ghost">Borrar filtros</Button>
        <Sheet>
          <SheetTrigger asChild>
            {/* Este botón será visible solo en pantallas pequeñas */}
            <Button>Crear nuevo estudiante +</Button>
          </SheetTrigger>
          <SheetContent>
            <CrearEditarEstudiante data={{}} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="rounded-md border">
        <Table>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages).keys()].map((page) => (
            <PaginationItem key={page + 1}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(page + 1)}
                isActive={currentPage === page + 1}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
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
  );
}