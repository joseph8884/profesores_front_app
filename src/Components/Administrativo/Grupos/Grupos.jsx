import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NavMobile from "../Nav/NavMobile";
import NavWeb from "../Nav/NavWeb";
import Card from "./Card"; // Importa el componente de las cartas
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Sheet,
  SheetTrigger,
} from "../../ui/sheet";
import SheetContent from "./CrearModGrupo";
import { BellIcon } from "@radix-ui/react-icons";

const data =[{"id":1,"name":"Honorable","companyID":{"id":1,"name":"Buzzshare","nit":"787-09-1144"},"hoursPurchased":60,"hoursSpented":3,"photo":"RhoncusDui.tiff","status":false,"studentsTeams":[],"teamClasses":[]},
{"id":2,"name":"Dr","companyID":{"id":2,"name":"Mydeo","nit":"584-54-1305"},"hoursPurchased":62,"hoursSpented":64,"photo":"AliquetMassaId.ppt","status":false,"studentsTeams":[],"teamClasses":[]},
{"id":3,"name":"Mrs","companyID":{"id":3,"name":"Feedspan","nit":"643-27-0148"},"hoursPurchased":94,"hoursSpented":11,"photo":"Id.avi","status":false,"studentsTeams":[],"teamClasses":[]},
{"id":4,"name":"Dr","companyID":{"id":4,"name":"Jabberstorm","nit":"372-49-3343"},"hoursPurchased":11,"hoursSpented":36,"photo":"NuncViverra.avi","status":false,"studentsTeams":[],"teamClasses":[]},
{"id":5,"name":"Mrs","companyID":{"id":5,"name":"Jabbercube","nit":"888-07-4300"},"hoursPurchased":69,"hoursSpented":60,"photo":"Curabitur.ppt","status":false,"studentsTeams":[],"teamClasses":[]},
{"id":6,"name":"Honorable","companyID":{"id":6,"name":"Photospace","nit":"875-49-5892"},"hoursPurchased":48,"hoursSpented":37,"photo":"IaculisJusto.avi","status":true,"studentsTeams":[],"teamClasses":[]},
{"id":7,"name":"Ms","companyID":{"id":7,"name":"Avaveo","nit":"378-24-0104"},"hoursPurchased":46,"hoursSpented":52,"photo":"AnteIpsum.mov","status":true,"studentsTeams":[],"teamClasses":[]},
{"id":8,"name":"Mr","companyID":{"id":8,"name":"Livefish","nit":"299-38-9370"},"hoursPurchased":78,"hoursSpented":65,"photo":"PosuereNonummyInteger.png","status":false,"studentsTeams":[],"teamClasses":[]},
{"id":9,"name":"Rev","companyID":{"id":9,"name":"Wikivu","nit":"147-45-4949"},"hoursPurchased":40,"hoursSpented":90,"photo":"Vestibulum.xls","status":true,"studentsTeams":[],"teamClasses":[]},
{"id":10,"name":"Mr","companyID":{"id":10,"name":"Oyope","nit":"288-28-0321"},"hoursPurchased":75,"hoursSpented":92,"photo":"VolutpatEleifend.png","status":true,"studentsTeams":[],"teamClasses":[]},
{"id":11,"name":"Dr","companyID":{"id":11,"name":"Edgeclub","nit":"149-26-8477"},"hoursPurchased":43,"hoursSpented":30,"photo":"Hac.ppt","status":false,"studentsTeams":[],"teamClasses":[]},
{"id":12,"name":"Dr","companyID":{"id":12,"name":"Dynava","nit":"144-21-4627"},"hoursPurchased":72,"hoursSpented":43,"photo":"VolutpatSapienArcu.mpeg","status":false,"studentsTeams":[],"teamClasses":[]},
{"id":13,"name":"Honorable","companyID":{"id":13,"name":"Viva","nit":"795-42-8157"},"hoursPurchased":62,"hoursSpented":65,"photo":"Cubilia.mp3","status":true,"studentsTeams":[],"teamClasses":[]},
{"id":14,"name":"Ms","companyID":{"id":14,"name":"Pixonyx","nit":"220-07-8439"},"hoursPurchased":53,"hoursSpented":62,"photo":"AmetJustoMorbi.tiff","status":false,"studentsTeams":[],"teamClasses":[]},
{"id":15,"name":"Honorable","companyID":{"id":15,"name":"Brainlounge","nit":"347-47-9399"},"hoursPurchased":93,"hoursSpented":5,"photo":"Nulla.mp3","status":true,"studentsTeams":[],"teamClasses":[]},
{"id":16,"name":"Ms","companyID":{"id":16,"name":"Blognation","nit":"862-44-6932"},"hoursPurchased":33,"hoursSpented":7,"photo":"VelitNecNisi.pdf","status":false,"studentsTeams":[],"teamClasses":[]},
{"id":17,"name":"Mr","companyID":{"id":17,"name":"Twinte","nit":"109-30-1209"},"hoursPurchased":27,"hoursSpented":43,"photo":"InFaucibusOrci.tiff","status":false,"studentsTeams":[],"teamClasses":[]},
{"id":18,"name":"Honorable","companyID":{"id":18,"name":"Eabox","nit":"340-01-1278"},"hoursPurchased":56,"hoursSpented":8,"photo":"CuraeMaurisViverra.xls","status":true,"studentsTeams":[],"teamClasses":[]},
{"id":19,"name":"Rev","companyID":{"id":19,"name":"Trilith","nit":"497-19-0051"},"hoursPurchased":42,"hoursSpented":49,"photo":"VariusInteger.pdf","status":true,"studentsTeams":[],"teamClasses":[]},
{"id":20,"name":"Ms","companyID":{"id":20,"name":"Wordpedia","nit":"790-81-7773"},"hoursPurchased":18,"hoursSpented":4,"photo":"NamNulla.avi","status":true,"studentsTeams":[],"teamClasses":[]}];



const GruposEmpresas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null); 
  const itemsPerPage = 6; // Ajusta este valor según sea necesario
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    // Store data in local storage
    localStorage.setItem('groupData', JSON.stringify(row));
    // Navigate to the detail page
    navigate('/admin/gruposvista/grupos/groupdetail');
  };

  // Función para cambiar de página
  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };


  

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
  }, [searchTerm, statusFilter]);
  const toggleStatusFilter = (status) => {
    if (statusFilter === status) {
      setStatusFilter(null); // Si el filtro ya está activo, se desactiva
    } else {
      setStatusFilter(status.toLowerCase()); // Convertir a minúsculas para coincidir con los datos
    }
  };
  // Datos para la página actual
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
  const dataprueba = {
    profileImage: "profilephoto.jpeg",
    name: "",
    email: "",
    dob: "",
    country: ""
  };

  return (
    <div className="min-h-screen flex" style={{ overflowY: 'hidden', height: '100vh',}}>
      <NavMobile />
      <NavWeb />

      <div className="flex-1 p-6" style={{ overflowY: 'scroll'}}>
      <div className="bg-white rounded-lg flex justify-between items-center p-5">
            <h2 className="text-xl font-bold text-gray-900">
              Lista de grupos
            </h2>
            <BellIcon className="h-6 w-6" />
      </div>
        <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Search by name or ID"
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
          }}>Borrar filtros</Button>
          <Sheet>
            <SheetTrigger asChild>
              {/* Este botón será visible solo en pantallas pequeñas */}
              <Button>
                Crear nuevo grupo +
              </Button>
            </SheetTrigger>
            <SheetContent data={dataprueba} />
          </Sheet>
        </div>

        {/* Sección de Cartas */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {currentItems.map((item, index) => (
            <Card
              key={index}
              image={item.image}
              name={item.name}
              category={item.category}
              nit={item.nit}
              status={item.status}
              onClick={() => handleRowClick(item)}
            />
          ))}
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
    </div>
  );
};

export default GruposEmpresas;