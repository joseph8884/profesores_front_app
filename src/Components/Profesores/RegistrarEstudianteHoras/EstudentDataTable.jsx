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


const data = [{"id":203,"photo":102,"name":"Caldwell Alflatt","email":"calflatt0@examiner.com","countryCode":"GR","virtual":"01","phoneNumber":"627-794-5382","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":101,"photo":102,"name":"Trumaine Knights","email":"tknights1@flavors.me","countryCode":"US","virtual":"01","phoneNumber":"478-124-4021","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4},
  {"id":102,"photo":103,"name":"Tripp Bullan","email":"tbullan2@biblegateway.com","countryCode":"PL","virtual":"01","phoneNumber":"762-766-7633","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3},
  {"id":102,"photo":102,"name":"Bunnie Bowmer","email":"bbowmer3@hc360.com","countryCode":"ID","virtual":"01","phoneNumber":"360-228-6165","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":103,"photo":103,"name":"Stanley McKague","email":"smckague4@blogs.com","countryCode":"FI","virtual":"01","phoneNumber":"452-995-0491","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":102,"photo":103,"name":"Mead Hatcher","email":"mhatcher5@spiegel.de","countryCode":"CN","virtual":"01","phoneNumber":"718-134-6453","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4},
  {"id":103,"photo":104,"name":"Lorry Farnish","email":"lfarnish6@e-recht24.de","countryCode":"HT","virtual":"01","phoneNumber":"386-192-1132","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4},
  {"id":101,"photo":103,"name":"Emlynn Rittelmeyer","email":"erittelmeyer7@dyndns.org","countryCode":"US","virtual":"01","phoneNumber":"919-327-7736","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":102,"photo":103,"name":"Jesse Beadham","email":"jbeadham8@livejournal.com","countryCode":"CN","virtual":"01","phoneNumber":"804-750-3167","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":103,"photo":102,"name":"Keslie Manolov","email":"kmanolov9@gov.uk","countryCode":"FR","virtual":"01","phoneNumber":"408-224-5344","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4},
  {"id":102,"photo":104,"name":"Waring Prestland","email":"wprestlanda@cafepress.com","countryCode":"SA","virtual":"01","phoneNumber":"528-280-3559","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":1},
  {"id":103,"photo":102,"name":"Tawnya Windous","email":"twindousb@sourceforge.net","countryCode":"CO","virtual":"01","phoneNumber":"414-276-4853","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":102,"photo":102,"name":"Guendolen Malden","email":"gmaldenc@reverbnation.com","countryCode":"KZ","virtual":"01","phoneNumber":"991-535-3766","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3},
  {"id":101,"photo":102,"name":"Xymenes Minchi","email":"xminchid@hubpages.com","countryCode":"CN","virtual":"01","phoneNumber":"294-589-2533","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":1},
  {"id":101,"photo":103,"name":"Marcela Gisbourn","email":"mgisbourne@google.it","countryCode":"CN","virtual":"01","phoneNumber":"977-271-7542","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":103,"photo":103,"name":"Thorny Langeley","email":"tlangeleyf@shareasale.com","countryCode":"MK","virtual":"01","phoneNumber":"462-841-1382","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4},
  {"id":201,"photo":104,"name":"Jarrod Djurdjevic","email":"jdjurdjevicg@xrea.com","countryCode":"ID","virtual":"01","phoneNumber":"593-737-6713","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":103,"photo":103,"name":"Kory Parminter","email":"kparminterh@de.vu","countryCode":"PE","virtual":"01","phoneNumber":"258-580-8188","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4},
  {"id":101,"photo":104,"name":"Hymie Gentsch","email":"hgentschi@sogou.com","countryCode":"CN","virtual":"01","phoneNumber":"507-367-5479","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3},
  {"id":102,"photo":102,"name":"Arny Mattaser","email":"amattaserj@desdev.cn","countryCode":"EE","virtual":"01","phoneNumber":"674-531-9686","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3},
  {"id":103,"photo":103,"name":"Fidela Wyrall","email":"fwyrallk@merriam-webster.com","countryCode":"PT","virtual":"01","phoneNumber":"135-239-3735","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4},
  {"id":103,"photo":102,"name":"Othello Francescozzi","email":"ofrancescozzil@time.com","countryCode":"UA","virtual":"01","phoneNumber":"988-270-9078","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3},
  {"id":103,"photo":103,"name":"Shawn Rawdall","email":"srawdallm@drupal.org","countryCode":"FR","virtual":"01","phoneNumber":"555-241-8547","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":1},
  {"id":101,"photo":104,"name":"Adriena Alastair","email":"aalastairn@slate.com","countryCode":"CN","virtual":"01","phoneNumber":"934-203-8886","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":1},
  {"id":103,"photo":102,"name":"Alvin Wardroper","email":"awardropero@patch.com","countryCode":"ID","virtual":"01","phoneNumber":"330-300-3594","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4},
  {"id":102,"photo":104,"name":"Iago Traice","email":"itraicep@ftc.gov","countryCode":"ID","virtual":"01","phoneNumber":"709-920-7973","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4},
  {"id":103,"photo":104,"name":"Corinne Casaro","email":"ccasaroq@histats.com","countryCode":"FR","virtual":"01","phoneNumber":"406-125-6307","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3},
  {"id":101,"photo":103,"name":"Bruno Buckleigh","email":"bbuckleighr@wired.com","countryCode":"AR","virtual":"01","phoneNumber":"332-140-5484","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3},
  {"id":102,"photo":103,"name":"Flory Piscopo","email":"fpiscopos@psu.edu","countryCode":"SV","virtual":"01","phoneNumber":"771-610-3504","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3},
  {"id":101,"photo":104,"name":"Lexy Luciano","email":"llucianot@squidoo.com","countryCode":"BG","virtual":"01","phoneNumber":"313-973-2107","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4},
  {"id":102,"photo":104,"name":"Phyllida Beddoe","email":"pbeddoeu@ask.com","countryCode":"PT","virtual":"01","phoneNumber":"363-838-2834","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4},
  {"id":103,"photo":102,"name":"Gabbie Corston","email":"gcorstonv@ucoz.com","countryCode":"ID","virtual":"01","phoneNumber":"301-137-0856","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":1},
  {"id":101,"photo":104,"name":"Larisa Callear","email":"lcallearw@bloglovin.com","countryCode":"CN","virtual":"01","phoneNumber":"166-159-2603","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":101,"photo":102,"name":"Gertrud Hardinge","email":"ghardingex@typepad.com","countryCode":"CN","virtual":"01","phoneNumber":"462-132-2903","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3},
  {"id":103,"photo":104,"name":"Gay MacKain","email":"gmackainy@vistaprint.com","countryCode":"ZA","virtual":"01","phoneNumber":"908-600-0108","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3},
  {"id":103,"photo":102,"name":"Mason Jennins","email":"mjenninsz@rambler.ru","countryCode":"ID","virtual":"01","phoneNumber":"375-827-9164","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":102,"photo":102,"name":"Vanny Barles","email":"vbarles10@amazon.co.jp","countryCode":"ID","virtual":"01","phoneNumber":"295-148-0656","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":103,"photo":103,"name":"Lexis Philpin","email":"lphilpin11@chronoengine.com","countryCode":"FR","virtual":"01","phoneNumber":"937-194-3817","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":1},
  {"id":101,"photo":104,"name":"Cordey Brownsett","email":"cbrownsett12@oakley.com","countryCode":"CN","virtual":"01","phoneNumber":"901-574-6973","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3},
  {"id":102,"photo":102,"name":"Rollin Spurgeon","email":"rspurgeon13@cornell.edu","countryCode":"SE","virtual":"01","phoneNumber":"586-227-9196","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":101,"photo":104,"name":"Gannie Durden","email":"gdurden14@ted.com","countryCode":"YE","virtual":"01","phoneNumber":"397-165-2736","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":102,"photo":102,"name":"Clarinda Gaskell","email":"cgaskell15@java.com","countryCode":"FR","virtual":"01","phoneNumber":"844-459-5558","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":3},
  {"id":103,"photo":104,"name":"Roz Borley","email":"rborley16@prlog.org","countryCode":"KG","virtual":"01","phoneNumber":"745-442-9772","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":102,"photo":104,"name":"Garrot Goroni","email":"ggoroni17@google.com.br","countryCode":"VN","virtual":"01","phoneNumber":"340-358-5616","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":102,"photo":103,"name":"Veronica Cristea","email":"vcristea18@usda.gov","countryCode":"GB","virtual":"01","phoneNumber":"336-804-5501","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":101,"photo":103,"name":"Hendrik Mulberry","email":"hmulberry19@ed.gov","countryCode":"ID","virtual":"01","phoneNumber":"673-352-6864","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":1},
  {"id":101,"photo":102,"name":"Wash Lomas","email":"wlomas1a@cam.ac.uk","countryCode":"PT","virtual":"01","phoneNumber":"512-195-9529","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":1},
  {"id":101,"photo":103,"name":"Jerrie Broadbear","email":"jbroadbear1b@wikispaces.com","countryCode":"AR","virtual":"01","phoneNumber":"930-329-9333","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":2},
  {"id":102,"photo":104,"name":"Urbain Matushevich","email":"umatushevich1c@purevolume.com","countryCode":"FR","virtual":"01","phoneNumber":"361-591-1536","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4},
  {"id":103,"photo":103,"name":"Lilia Ruffli","email":"lruffli1d@4shared.com","countryCode":"MX","virtual":"01","phoneNumber":"873-972-6565","presencial":"02","lastRegister":"12/9/2024","horasPlaneadas":"3H","horasRestantes":"01","canceladosTarde":"03","canceladosATiempo":"02","action":"View","horasCanceladas":"03","horasCanceladasProfesor":4}];


export function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRowClick = (row, event) => {
    localStorage.setItem("selected_student", JSON.stringify(row.original));
    if (event.target.closest(".dropdown-menu")) {
      return;
    }
    // Navigate to the detail page
    navigate("/studentdetail");
  };

  const itemsPerPage = 8;
  const navigate = useNavigate();

  // Filter data based on search input
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      ["name", "email", "id"].some((key) => {
        const value = item[key];
        return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm]);

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
        <Button variant="ghost" onClick={() => setSearchTerm("")}>
          Clear filters
        </Button>
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
