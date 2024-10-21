import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../ui/context-menu"

const Card = ({ image, name, category, nit, onClick }) => {
  return (
    <ContextMenu>
    <ContextMenuTrigger>
    <div className="bg-white shadow-lg rounded-lg p-4" onClick={onClick}>
      <img src={image} alt={name} className="h-32 w-full object-cover rounded-md" />
      <div className="mt-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-sm text-gray-400">NIT: {nit}</p>
      </div>
    </div>
    </ContextMenuTrigger>
      <ContextMenuContent>
      <ContextMenuItem>Editar</ContextMenuItem>
      <ContextMenuItem>Eliminar</ContextMenuItem>
    </ContextMenuContent>
    </ContextMenu>
  );
};

export default Card;
