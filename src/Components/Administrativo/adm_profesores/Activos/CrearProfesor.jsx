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
      <div className="overflow-y-auto max-h-[70vh] p-5">
        <DialogHeader>
          <DialogTitle className="block text-lg">Crear profesor</DialogTitle>
          
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CrearEditarProfesorInfoPersonal data={{}} context="create" />
        </div>
      </div>
    </>
  );
};

export default CrearProfesorDialog;
