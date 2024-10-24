import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../ui/context-menu"
import SheetContentGrupo from "./CrearModGrupo";

import { Sheet, SheetTrigger, SheetContent } from "../../ui/sheet";
import { Button } from "../../ui/button";


const Card = ({ image, name, category, nit, status, onClick }) => {
  // Determinar el color del encabezado y del círculo según el estado
  const statusColor = status === "activo" ? "bg-green-500" : "bg-red-500";
  const statusText = status === "activo" ? "Activo" : "Inactivo";
  const data = {
    profileImage: image,
    name: name,
    category: category,
    nit: nit,
    status: status,
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-white shadow-lg rounded-lg p-4 relative" onClick={onClick}>
          {/* Encabezado de estado */}
          <div className={`absolute top-0 left-0 w-full p-2 text-white font-semibold ${statusColor} rounded-t-lg flex items-center`}>
            {/* Círculo del indicador */}
            <span className={`w-3 h-3 rounded-full mr-2 ${statusColor}`}></span>
            {statusText}
          </div>
          
          {/* Imagen */}
          <div className="mt-8">
            <img src={image} alt={name} className="h-32 w-full object-cover rounded-md" />
          </div>
          
          {/* Información */}
          <div className="mt-4">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-gray-500">{category}</p>
            <p className="text-sm text-gray-400">NIT: {nit}</p>
          </div>
        </div>
      </ContextMenuTrigger>
      
      {/* Menú contextual */}
      <ContextMenuContent>
        <ContextMenuItem>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Editar</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetContentGrupo data={data} />
          </SheetContent>
        </Sheet>
        </ContextMenuItem>
        <ContextMenuItem>Eliminar</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Card;
