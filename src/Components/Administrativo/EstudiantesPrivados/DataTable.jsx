import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
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
import {
  Sheet,
  SheetTrigger,
} from "../../ui/sheet";
import { MoreHorizontal } from "lucide-react"

import SheetContent from './CrearEstudiante';

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
    photo: "102",
    name: "jose Perez Rocha",
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
    photo: "102",
    name: "Tefa Perez Rocha",
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
    name: "Ana Maria Lopez",
    virtual: "02",
    presencial: "01",
    lastRegister: "15/09/2024",
    horasPlaneadas: "4H",
    horasRestantes: "02",
    canceladosTarde: "01",
    canceladosATiempo: "03",
    action: "View",
  },
  // Agrega más datos aquí para probar la paginación
];

// Estructura de columnas de la tabla
const columns = [
  {
    id: "photo",
    header: "Photo",
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "virtual",
    header: "Virtual",
    cell: ({ row }) => <div className="text-center">{row.getValue("virtual")}</div>,
  },
  {
    accessorKey: "presencial",
    header: "Presencial",
    cell: ({ row }) => <div className="text-center">{row.getValue("presencial")}</div>,
  },
  {
    accessorKey: "lastRegister",
    header: "Last Register",
    cell: ({ row }) => <div className="text-center">{row.getValue("lastRegister")}</div>,
  },
  {
    accessorKey: "horasPlaneadas",
    header: "Horas planeadas",
    cell: ({ row }) => <div className="text-center">{row.getValue("horasPlaneadas")}</div>,
  },
  {
    accessorKey: "horasRestantes",
    header: "Horas restantes",
    cell: ({ row }) => <div className="text-center">{row.getValue("horasRestantes")}</div>,
  },
  {
    accessorKey: "canceladosATiempo",
    header: "Canceladas a tiempo",
    cell: ({ row }) => <div className="text-center">{row.getValue("canceladosATiempo")}</div>,
  },
  {
    accessorKey: "canceladosTarde",
    header: "Cancelados tarde",
    cell: ({ row }) => <div className="text-center">{row.getValue("canceladosTarde")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
 
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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const navigate = useNavigate();

  // Función para cambiar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
  const handleRowClick = (row) => {
    const studentData = row.original;
    navigate(`/detail?data=${encodeURIComponent(JSON.stringify(studentData))}`);
  };
  const dataprueba={
    profileImage: "profilephoto.jpeg",
    name: "",
    email:"",
    dob:"",
    country:""
  }
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
        <Button>
          Crear nuevo estudiante +
        </Button>
      </SheetTrigger>
      <SheetContent data={dataprueba}/>
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
                <TableRow key={row.id} onClick={() => handleRowClick(row)}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
          {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map((page) => (
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
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
