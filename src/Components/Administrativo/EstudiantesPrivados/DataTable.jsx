// Importación de librerías adicionales si es necesario (mantén lucide-react y tanstack-react-table)
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import { ArrowUpDown, ChevronDown, Eye } from "lucide-react"; // Cambié MoreHorizontal por Eye
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import * as React from "react";

// Datos ficticios (puedes cambiar estos datos según tu aplicación)
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
  // Más filas de datos...
];

// Estructura de columnas de la tabla actualizada
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
    cell: () => (
      <Button variant="ghost" className="h-8 w-8 p-0">
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
];

// Componente actualizado
export function DataTableDemo() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;

  // Función para cambiar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Datos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  
  const table = useReactTable({
    data,
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        {/* Barra superior de búsqueda y Clear All */}
        <Input
          placeholder="Name, email or id of the student"
          className="w-96"
        />
        <Button variant="ghost">Clear All</Button>
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
                <TableRow key={row.id}>
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
            <PaginationItem>
              <PaginationLink href="#" onClick={() => handlePageChange(1)} isActive={currentPage === 1}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => handlePageChange(2)} isActive={currentPage === 2}>
                2
              </PaginationLink>
            </PaginationItem>
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
