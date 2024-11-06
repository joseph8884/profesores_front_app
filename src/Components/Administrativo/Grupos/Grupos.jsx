import React, { useState, useMemo, useEffect } from "react";
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
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import ManageTeamCompany from "./CrearModGrupo";
import Loader from "../../Loader/Loader";
import { BellIcon } from "@radix-ui/react-icons";
import { getAllTeams } from "../../../provider/adm/Grupos/getAllTeams";

const GruposEmpresas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar el loading

  const itemsPerPage = 6; // Ajusta este valor según sea necesario
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data_fromAPI = await getAllTeams();
        setData(data_fromAPI);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const handleRowClick = (row) => {
    // Store data in local storage
    localStorage.setItem("groupData", JSON.stringify(row));
    // Navigate to the detail page
    navigate("/admin/gruposvista/grupos/groupdetail");
  };

  // Función para cambiar de página
  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const filteredData = useMemo(() => {
    if (loading) return [];
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        ["name", "email", "id"].some((key) => {
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
  }, [data, searchTerm, statusFilter, loading]);

  const toggleStatusFilter = (status) => {
    if (statusFilter === status) {
      setStatusFilter(null); // Si el filtro ya está activo, se desactiva
    } else {
      setStatusFilter(status === "Activo"); // Set to true for "Activo" and false for "Inactivo"
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

  return (
    <div
      className="min-h-screen flex"
      style={{ overflowY: "hidden", height: "100vh" }}
    >
      {loading && <Loader />}
      <NavMobile />
      <NavWeb />

      <div className="flex-1 p-6" style={{ overflowY: "scroll" }}>
        <div className="bg-white rounded-lg flex justify-between items-center p-5">
          <h2 className="text-xl font-bold text-gray-900">Lista de grupos</h2>
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
              {/* Este botón será visible solo en pantallas pequeñas */}
              <Button>Crear nuevo grupo +</Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full md:w-1/3 bg-gray-100 text-black min-h-screen p-6 overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle className="text-xl font-bold mb-4">
                  Create or Modify Group
                </SheetTitle>
              </SheetHeader>
              <ManageTeamCompany initialData={{}} context={"create"} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Sección de Cartas */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {filteredData.map((item, index) => (
            <Card
              key={index}
              image={item.photo}
              name={item.name}
              companyName={item.companyName}
              nit={item.companyNIT}
              status={item.status}
              data={item}
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
