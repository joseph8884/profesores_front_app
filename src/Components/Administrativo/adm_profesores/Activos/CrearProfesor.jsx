import React from "react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import CrearEditarProfesorInfoPersonal from "../CrearEditProfesoresInfoPersonal.jsx";
const CrearProfesorDialog = () => {
  return (
    <>
      <div className="overflow-y-auto max-h-[70vh] p-6">
        <DialogHeader>
          <DialogTitle>{"crear"}</DialogTitle>
          <DialogDescription>
            Ingrese el nombre y el nit de la empresa
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CrearEditarProfesorInfoPersonal data={{}} context="create" />
        </div>
      </div>
    </>
  );
};

export default CrearProfesorDialog;
