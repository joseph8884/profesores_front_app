import React from "react";
import NavMobile from "../../Nav/NavMobile";
import NavWeb from "../../Nav/NavWeb";
import { DataTableDemo } from "./DataTable";
import { Toaster } from "sonner"; 

const ProfesoresInactivos = () => {
  return (
<div className="min-h-screen flex" style={{ overflowY: 'hidden', height: '100vh', }}>
      <NavMobile />
      <NavWeb />
      <DataTableDemo />
      <Toaster />
    </div>
  );
};

export default ProfesoresInactivos;
