import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavMobile from "../Nav/NavMobile";
import NavWeb from "../Nav/NavWeb";
import Card from "./Cards"; // Importa el componente de las cartas
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
import Loader from "../../Loader/Loader";
import { BellIcon } from "@radix-ui/react-icons";
import { getAllTeams } from "../../../provider/profesor/Grupos/getAllGrupos";

const GruposEmpresasProfesor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar el loading

  const itemsPerPage = 1; // Ajusta este valor según sea necesario
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
    localStorage.setItem("groupData_profesor", JSON.stringify(row));
    // Navigate to the detail page
    navigate("/profesor/registrarhoras/grupos/grupo");
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
        ["name", "id", "company.name", "company.nit"].some((key) => {
          const keys = key.split('.');
          let value = item;
          keys.forEach(k => {
            value = value[k];
          });
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    }
  
    return filtered;
  }, [data, searchTerm, loading]);
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
            placeholder="Search by Name, ID, Company Name, or NIT"
            className="w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="ghost"
            onClick={() => {
              setSearchTerm("");
            }}
          >
            Clear filters
          </Button>
        </div>

        {/* Sección de Cartas */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {filteredData.map((item, index) => (
            <Card
              key={index}
              image={item.photo}
              name={item.name}
              companyName={item.company.name}
              nit={item.company.nit}
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

export default GruposEmpresasProfesor;
