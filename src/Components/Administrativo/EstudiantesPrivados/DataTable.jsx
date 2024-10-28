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
import {getStudents} from "../../../provider/adm/EstudiantePersonalizado/getStudents";
const data = [{"id":1,"fullName":"Diane Goodbarr","email":"dgoodbarr0@comsenz.com","countryCode":"CZ","phoneNumber":"154-733-4291","photo":"Maecenas.xls","hoursPurchased":85,"hoursSpented":78,"lastLog":"2024-10-17T00:00:00Z","status":false,"idUser":9,"individualClasses":[]},
{"id":2,"fullName":"Gan Lytle","email":"glytle1@instagram.com","countryCode":"CN","phoneNumber":"932-589-9053","photo":"PotentiCras.ppt","hoursPurchased":100,"hoursSpented":14,"lastLog":"2024-10-17T00:00:00Z","status":false,"idUser":5,"individualClasses":[]},
{"id":3,"fullName":"Logan Snazle","email":"lsnazle2@latimes.com","countryCode":"CN","phoneNumber":"324-316-6701","photo":"Lacinia.avi","hoursPurchased":3,"hoursSpented":20,"lastLog":"2024-10-17T00:00:00Z","status":true,"idUser":7,"individualClasses":[]},
{"id":4,"fullName":"Niven MacIlhagga","email":"nmacilhagga3@webeden.co.uk","countryCode":"US","phoneNumber":"202-486-3573","photo":"PedeMorbi.avi","hoursPurchased":3,"hoursSpented":60,"lastLog":"2024-10-17T00:00:00Z","status":true,"idUser":6,"individualClasses":[]},
{"id":5,"fullName":"Theodoric Rickhuss","email":"trickhuss4@engadget.com","countryCode":"ID","phoneNumber":"509-354-6945","photo":"MassaTemporConvallis.ppt","hoursPurchased":48,"hoursSpented":13,"lastLog":"2024-10-17T00:00:00Z","status":true,"idUser":2,"individualClasses":[]},
{"id":6,"fullName":"Guthry Braybrooks","email":"gbraybrooks5@blogger.com","countryCode":"CO","phoneNumber":"471-924-9156","photo":"Eget.png","hoursPurchased":25,"hoursSpented":70,"lastLog":"2024-10-17T00:00:00Z","status":true,"idUser":8,"individualClasses":[]},
{"id":7,"fullName":"Cassie Broek","email":"cbroek6@ucla.edu","countryCode":"CN","phoneNumber":"341-173-5668","photo":"Varius.mp3","hoursPurchased":95,"hoursSpented":40,"lastLog":"2024-10-17T00:00:00Z","status":true,"idUser":0,"individualClasses":[]},
{"id":8,"fullName":"Royal Fransewich","email":"rfransewich7@gmpg.org","countryCode":"PT","phoneNumber":"621-871-3599","photo":"VelAccumsanTellus.gif","hoursPurchased":69,"hoursSpented":59,"lastLog":"2024-10-17T00:00:00Z","status":false,"idUser":4,"individualClasses":[]},
{"id":9,"fullName":"Antonietta Dundendale","email":"adundendale8@nature.com","countryCode":"CN","phoneNumber":"785-187-3591","photo":"AmetSem.mov","hoursPurchased":84,"hoursSpented":35,"lastLog":"2024-10-17T00:00:00Z","status":true,"idUser":0,"individualClasses":[]},
{"id":10,"fullName":"Mary MacConnel","email":"mmacconnel9@soundcloud.com","countryCode":"GR","phoneNumber":"693-476-5956","photo":"Nulla.ppt","hoursPurchased":57,"hoursSpented":3,"lastLog":"2024-10-17T00:00:00Z","status":false,"idUser":9,"individualClasses":[]},
{"id":11,"fullName":"Louise Hemeret","email":"lhemereta@imdb.com","countryCode":"ID","phoneNumber":"311-478-7082","photo":"Nunc.pdf","hoursPurchased":33,"hoursSpented":98,"lastLog":"2024-10-17T00:00:00Z","status":true,"idUser":2,"individualClasses":[]},
{"id":12,"fullName":"Alika Calwell","email":"acalwellb@flickr.com","countryCode":"BR","phoneNumber":"852-298-1888","photo":"MaurisUllamcorper.mpeg","hoursPurchased":49,"hoursSpented":16,"lastLog":"2024-10-17T00:00:00Z","status":true,"idUser":1,"individualClasses":[]},
{"id":13,"fullName":"Sancho Climance","email":"sclimancec@drupal.org","countryCode":"CN","phoneNumber":"744-100-4627","photo":"Duis.xls","hoursPurchased":79,"hoursSpented":71,"lastLog":"2024-10-17T00:00:00Z","status":false,"idUser":3,"individualClasses":[]},
{"id":14,"fullName":"Jorry Iacovuzzi","email":"jiacovuzzid@themeforest.net","countryCode":"MY","phoneNumber":"674-162-8689","photo":"EgetNuncDonec.xls","hoursPurchased":100,"hoursSpented":29,"lastLog":"2024-10-17T00:00:00Z","status":false,"idUser":0,"individualClasses":[]},
{"id":15,"fullName":"Rubia Wiggins","email":"rwigginse@smugmug.com","countryCode":"ID","phoneNumber":"683-266-0467","photo":"InFaucibus.mp3","hoursPurchased":15,"hoursSpented":29,"lastLog":"2024-10-17T00:00:00Z","status":false,"idUser":9,"individualClasses":[]},
{"id":16,"fullName":"Irene Gabala","email":"igabalaf@cnn.com","countryCode":"ID","phoneNumber":"641-733-7822","photo":"UtEratId.txt","hoursPurchased":95,"hoursSpented":95,"lastLog":"2024-10-17T00:00:00Z","status":false,"idUser":2,"individualClasses":[]},
{"id":17,"fullName":"Gibb Perell","email":"gperellg@usgs.gov","countryCode":"PT","phoneNumber":"474-764-1384","photo":"LuctusTincidunt.jpeg","hoursPurchased":18,"hoursSpented":82,"lastLog":"2024-10-17T00:00:00Z","status":true,"idUser":4,"individualClasses":[]},
{"id":18,"fullName":"Leticia Branston","email":"lbranstonh@washington.edu","countryCode":"WS","phoneNumber":"399-800-5753","photo":"Libero.ppt","hoursPurchased":15,"hoursSpented":52,"lastLog":"2024-10-17T00:00:00Z","status":true,"idUser":1,"individualClasses":[]},
{"id":19,"fullName":"Donalt Abele","email":"dabelei@oaic.gov.au","countryCode":"FR","phoneNumber":"499-283-1962","photo":"NullaNeque.avi","hoursPurchased":72,"hoursSpented":27,"lastLog":"2024-10-17T00:00:00Z","status":true,"idUser":7,"individualClasses":[]},
{"id":20,"fullName":"Lindsey Murkitt","email":"lmurkittj@ustream.tv","countryCode":"ID","phoneNumber":"266-552-9548","photo":"SapienSapienNon.jpeg","hoursPurchased":27,"hoursSpented":28,"lastLog":"2024-10-17T00:00:00Z","status":false,"idUser":2,"individualClasses":[]}];




export function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null); 
  /*
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      const data_fromAPI = await getStudents();
      setData(data_fromAPI);
    };
    fetchStudents();
  }, []);
*/
  const handleRowClick = (row, event) => {
    localStorage.setItem("selected_student", JSON.stringify(row.original));
    if (event.target.closest(".dropdown-menu")) {
      return;
    }
    // Navigate to the detail page
    navigate("/admin/tablaestudiantes/estudiantesprivados/studentdetail");
  };

  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Filter data based on search input
const filteredData = useMemo(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        ["fullName", "email", "id"].some((key) => { // Updated to use "fullName"
          const value = item[key];
          return typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    if (statusFilter !== null) { // Ensure statusFilter is checked correctly
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    return filtered;
  }, [searchTerm, statusFilter]);

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
        <div className={`flex items-center justify-center p-1 rounded-lg text-white font-semibold ${row.original.status ? "bg-green-500" : "bg-red-500"}`}>
          {/* Indicador de color: Verde para "activo", Rojo para "inactivo" */}
          <span className="w-2 h-2 rounded-full mr-3 bg-white"></span>
          {/* Texto del estado */}
          <span>
            {row.original.status ? "Activo" : "Inactivo"} {/* Updated logic for status */}
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
        setStatusFilter(status === "Activo"); // Set to true for "Activo" and false for "Inactivo"
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
    <div className="w-full" style={{ overflowY: 'scroll'}}>
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
