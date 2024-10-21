import React from "react";
import NavMobile from "../Nav/NavMobile";
import NavWeb from "../Nav/NavWeb";
import { DataTableDemo } from "./DataTable";

const EstudiantesPrivados = () => {
  return (
<div className="min-h-screen flex" style={{ overflowY: 'hidden', height: '100vh', }}>
      <NavMobile />
      <NavWeb />
      <DataTableDemo />
    </div>
  );
};

export default EstudiantesPrivados;
