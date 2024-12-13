import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../ui/context-menu";
import SheetContentGrupo from "./CrearModGrupo";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import { Button } from "../../ui/button";
import { changeStatusGroup } from "../../../provider/adm/Grupos/changeStatusTeam";
import {delateTeamAPI} from "../../../provider/adm/Grupos/deleteTeam";
import { toast } from "sonner";
const Card = ({ image, name, companyName, nit, status, onClick, data }) => {
  // Determinar el color del encabezado y del círculo según el estado
  const statusColor = status ? "bg-green-500" : "bg-red-500";
  const statusText = status ? "Activo" : "Inactivo";

  return (   
    <ContextMenu>
      
      <ContextMenuTrigger>
        <div
          className="bg-white shadow-lg rounded-lg p-4 relative"
          onClick={onClick}
        >
          {/* Encabezado de estado */}
          <div
            className={`absolute top-0 left-0 w-full p-2 text-white font-semibold ${statusColor} rounded-t-lg flex items-center`}
          >
            {/* Círculo del indicador */}
            <span className={`w-3 h-3 rounded-full mr-2 ${statusColor}`}></span>
            {statusText}
          </div>

          {/* Imagen */}
          <div className="mt-8">
            <img
              src={image}
              alt={name}
              className="h-32 w-full object-cover rounded-md"
            />
          </div>

          {/* Información */}
          <div className="mt-4">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-gray-600">
              Nombre de la empresa: {companyName}
            </p>
            <p className="text-sm text-gray-600">NIT: {nit}</p>
            <p className="text-sm text-gray-600">Id Team: {data.ID}</p>
            <p className="text-sm text-gray-600">Teacher name: {data.teacherID.fullName}</p>
            <p className="text-sm text-gray-600">Teacher status: {data.teacherID.status ? "Activo" : "Inactivo"}</p>
          </div>
        </div>
      </ContextMenuTrigger>

      {/* Menú contextual */}
      <ContextMenuContent>
        <ContextMenuItem>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"ghost"}>Editar</Button>
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
              <SheetContentGrupo initialData={data} context={"editar"} />
            </SheetContent>
          </Sheet>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={async (value) => {
            try {
              await delateTeamAPI(data.ID);
            } catch (error) {
              console.error("Error updating student:", error);
            } finally {
              window.location.reload();
            }
          }}
        >
          <Button variant={"ghost"}>Eliminar</Button>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={async () => {
            try {
              await changeStatusGroup(data.ID);
              toast.success("Estado del estudiante cambiado con éxito");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } catch (error) {
              toast.error(
                "Error cambiando el estado del estudiante, por favor intentar mas tarde"
              );
              console.error("Error changing status of student:", error);
            } 
          }}
        >
          <Button variant={"ghost"}>Cambiar estado</Button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Card;
