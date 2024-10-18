import React, { useState } from "react";
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

const data = [
  {
    image: 'https://www.cocacolaep.com/assets/Uploads/resources/Coca-Cola-1210.jpg', 
    name: 'Coca-Cola',
    category: 'Carga y transporte',
    nit: '102754149-8',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7mURUpDDSiSt2zKcCYaVQCAew63wR-JnnaQ&s', 
    name: 'Nike',
    category: 'Carga y transporte',
    nit: '102754149-8',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', 
    name: 'Adidas',
    category: 'Carga y transporte',
    nit: '102754149-8',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfiYuZrWQi8QW2EW8LqsmiBbVidhnMPjkrWw&s', 
    name: 'Pepsi',
    category: 'Carga y transporte',
    nit: '102754149-8',
  },
  {
    image: 'https://outvio.com/static/43dda54a37da393abbf0fccc92840e86/e30c4/ckyycvha3000c7b9gfipieqcb.jpg', 
    name: 'Amazon',
    category: 'Carga y transporte',
    nit: '102754149-8',
  },
  {
    image: 'https://via.placeholder.com/150', 
    name: 'Tesla',
    category: 'Carga y transporte',
    nit: '102754149-8',
  },
];

const GruposEmpresas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Ajusta este valor según sea necesario
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    // Store data in local storage
    localStorage.setItem('groupData', JSON.stringify(row));
    // Navigate to the detail page
    navigate('/groupdetail');
  };

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

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const dataprueba = {
    profileImage: "profilephoto.jpeg",
    name: "",
    email: "",
    dob: "",
    country: ""
  };

  return (
    <div className="min-h-screen flex">
      <NavMobile />
      <NavWeb />

      <div className="flex-1 p-6">
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
              onClick={() => handleRowClick(item)}
            />
          ))}
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
    </div>
  );
};

export default GruposEmpresas;