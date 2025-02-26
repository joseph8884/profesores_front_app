import React from "react";
import NavMobile from "../Nav/NavMobile";
import NavWeb from "../Nav/NavWeb";
import { DataTableDemo } from "./EstudentDataTable";

const EstudiantesPrivados = () => {
  return (
<div className="flex" style={{ overflowY: 'hidden', height: '100vh', }}>
      <NavMobile />
      <NavWeb />
      <DataTableDemo />
    </div>
  );
};

export default EstudiantesPrivados;
