import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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

const data = [{"id":1,"photo":103,"name":"Alida Valero","email":"avalero0@arstechnica.com","countryCode":"AL","virtual":"01","phoneNumber":"329-380-2626","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2,"status":"inactivo"},
  {"id":2,"photo":102,"name":"Gigi Yitzhak","email":"gyitzhak1@google.com","countryCode":"UA","virtual":"01","phoneNumber":"180-516-6476","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3,"status":"inactivo"},
  {"id":3,"photo":103,"name":"Shae Toopin","email":"stoopin2@intel.com","countryCode":"BR","virtual":"01","phoneNumber":"621-151-7151","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2,"status":"inactivo"},
  {"id":4,"photo":102,"name":"Niccolo Gobourn","email":"ngobourn3@alibaba.com","countryCode":"CN","virtual":"01","phoneNumber":"897-676-0290","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4,"status":"inactivo"},
  {"id":5,"photo":103,"name":"Forester Taffarello","email":"ftaffarello4@wikimedia.org","countryCode":"UG","virtual":"01","phoneNumber":"823-401-4067","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3,"status":"activo"},
  {"id":6,"photo":102,"name":"Josy Ruller","email":"jruller5@shareasale.com","countryCode":"KP","virtual":"01","phoneNumber":"640-660-9465","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4,"status":"activo"},
  {"id":7,"photo":103,"name":"Carlyn Edmands","email":"cedmands6@house.gov","countryCode":"FR","virtual":"01","phoneNumber":"363-223-2922","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2,"status":"activo"},
  {"id":8,"photo":103,"name":"Viv Humpage","email":"vhumpage7@disqus.com","countryCode":"CN","virtual":"01","phoneNumber":"720-610-4327","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2,"status":"activo"},
  {"id":9,"photo":103,"name":"Franni Lomasny","email":"flomasny8@flickr.com","countryCode":"ID","virtual":"01","phoneNumber":"724-408-1569","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3,"status":"activo"},
  {"id":10,"photo":102,"name":"Jakob Faraker","email":"jfaraker9@jiathis.com","countryCode":"LT","virtual":"01","phoneNumber":"931-481-1879","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3,"status":"activo"},
  {"id":11,"photo":102,"name":"Derrek Sutherden","email":"dsutherdena@creativecommons.org","countryCode":"PH","virtual":"01","phoneNumber":"150-737-4988","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4,"status":"activo"},
  {"id":12,"photo":103,"name":"Pietra Alford","email":"palfordb@state.tx.us","countryCode":"CN","virtual":"01","phoneNumber":"481-285-6241","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2,"status":"activo"},
  {"id":13,"photo":102,"name":"Gerta Baltrushaitis","email":"gbaltrushaitisc@theglobeandmail.com","countryCode":"PK","virtual":"01","phoneNumber":"915-310-7291","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3,"status":"activo"},
  {"id":14,"photo":103,"name":"Gerry Meakin","email":"gmeakind@foxnews.com","countryCode":"RU","virtual":"01","phoneNumber":"142-219-2252","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4,"status":"activo"},
  {"id":15,"photo":103,"name":"Lauryn Fontanet","email":"lfontanete@youtu.be","countryCode":"ZA","virtual":"01","phoneNumber":"176-957-3352","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2,"status":"activo"},
  {"id":16,"photo":103,"name":"Seward Walsh","email":"swalshf@nationalgeographic.com","countryCode":"MX","virtual":"01","phoneNumber":"659-548-5512","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3,"status":"activo"},
  {"id":17,"photo":102,"name":"Sidney Jessel","email":"sjesselg@narod.ru","countryCode":"LT","virtual":"01","phoneNumber":"545-149-3515","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2,"status":"activo"},
  {"id":18,"photo":102,"name":"Sibyl Geipel","email":"sgeipelh@behance.net","countryCode":"PH","virtual":"01","phoneNumber":"878-268-7594","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4,"status":"activo"},
  {"id":19,"photo":102,"name":"Padriac Swindlehurst","email":"pswindlehursti@blogtalkradio.com","countryCode":"PH","virtual":"01","phoneNumber":"600-890-8005","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2,"status":"activo"},
  {"id":20,"photo":103,"name":"Zondra O'Towey","email":"zotoweyj@mac.com","countryCode":"PT","virtual":"01","phoneNumber":"496-194-9480","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3,"status":"activo"},
  {"id":21,"photo":102,"name":"Arabela Bankhurst","email":"abankhurstk@baidu.com","countryCode":"US","virtual":"01","phoneNumber":"434-743-6175","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2,"status":"activo"},
  {"id":22,"photo":103,"name":"Lindie Peacop","email":"lpeacopl@fc2.com","countryCode":"CN","virtual":"01","phoneNumber":"326-839-7216","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4,"status":"activo"},
  {"id":23,"photo":102,"name":"Trixy Blackboro","email":"tblackborom@reverbnation.com","countryCode":"AU","virtual":"01","phoneNumber":"588-332-0224","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3,"status":"activo"},
  {"id":24,"photo":102,"name":"Traver Diggar","email":"tdiggarn@addtoany.com","countryCode":"PT","virtual":"01","phoneNumber":"235-394-3450","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4,"status":"activo"},
  {"id":25,"photo":102,"name":"Daren Bancroft","email":"dbancrofto@cbc.ca","countryCode":"RU","virtual":"01","phoneNumber":"400-135-9441","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4,"status":"activo"},
  {"id":26,"photo":102,"name":"Kaleena Pepperd","email":"kpepperdp@msu.edu","countryCode":"ID","virtual":"01","phoneNumber":"117-466-5461","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2,"status":"activo"},
  {"id":27,"photo":103,"name":"Veronika Gostall","email":"vgostallq@sina.com.cn","countryCode":"RU","virtual":"01","phoneNumber":"666-146-3817","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2,"status":"activo"},
  {"id":28,"photo":102,"name":"Bambie Kik","email":"bkikr@ezinearticles.com","countryCode":"CN","virtual":"01","phoneNumber":"897-885-7911","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2,"status":"activo"},
  {"id":29,"photo":103,"name":"Henka Mushawe","email":"hmushawes@360.cn","countryCode":"FI","virtual":"01","phoneNumber":"212-191-1962","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4,"status":"activo"},
  {"id":30,"photo":102,"name":"Sofie Stanway","email":"sstanwayt@163.com","countryCode":"FR","virtual":"01","phoneNumber":"408-618-1452","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4,"status":"activo"}]

export function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null); 


  const handleRowClick = (row, event) => {
    localStorage.setItem("selected_student", JSON.stringify(row.original));
    if (event.target.closest(".dropdown-menu")) {
      return;
    }
    // Navigate to the detail page
    navigate("/admin/tablaestudiantes/estudiantesprivados/studentdetail");
  };

  const itemsPerPage = 8;
  const navigate = useNavigate();

  // Filter data based on search input
const filteredData = useMemo(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        ["name", "email", "id"].some((key) => {
          const value = item[key];
          return typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    return filtered;
  }, [searchTerm, statusFilter, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredData]);

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
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={row.original.status === "activo" ? "text-green-500" : "text-red-500"}>
          {row.getValue("status")}
        </span>
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

    // Manejador para cambiar el filtro de estado
    const toggleStatusFilter = (status) => {
      if (statusFilter === status) {
        setStatusFilter(null); // Si el filtro ya está activo, se desactiva
      } else {
        setStatusFilter(status.toLowerCase()); // Convertir a minúsculas para coincidir con los datos
      }
    };


  // Pagination logic with 3 dots for more than 9 pages
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Search by name, email or ID"
          className="w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Botones de filtros */}
        <Button
          variant={statusFilter === "activo" ? "solid" : "outline"}
          onClick={() => toggleStatusFilter("Activo")}
          className={statusFilter === "activo" ? "bg-green-500 text-white" : ""}
        >
          Activo
        </Button>
        <Button
          variant={statusFilter === "inactivo" ? "solid" : "outline"}
          onClick={() => toggleStatusFilter("Inactivo")}
          className={statusFilter === "inactivo" ? "bg-red-500 text-white" : ""}
        >
          Inactivo
        </Button>
        <Button variant="ghost" onClick={() => {
            setStatusFilter(null); 
            setSearchTerm("");
          }}>
          Clear filters
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Create new student +</Button>
          </SheetTrigger>
          <SheetContent>
            <CrearEditarEstudiante data={{}} />
          </SheetContent>
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
  );
}
