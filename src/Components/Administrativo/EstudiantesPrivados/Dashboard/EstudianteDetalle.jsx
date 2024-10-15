import React from "react";
import { useLocation } from "react-router-dom";
import NavMobile from "../../Nav/NavMobile";
import NavWeb from "../../Nav/NavWeb";

const StudentDetail = () => {
  const location = useLocation();
  const studentData = JSON.parse(decodeURIComponent(new URLSearchParams(location.search).get("data")));

  return (
    <div className="min-h-screen flex">
      <NavMobile />
      <NavWeb />
      <h1>Student Detail</h1>
      <p>Name: {studentData.name}</p>
      <p>Virtual: {studentData.virtual}</p>
      <p>Presencial: {studentData.presencial}</p>
      <p>Last Register: {studentData.lastRegister}</p>
      <p>Horas Planeadas: {studentData.horasPlaneadas}</p>
      <p>Horas Restantes: {studentData.horasRestantes}</p>
      <p>Cancelados Tarde: {studentData.canceladosTarde}</p>
      <p>Cancelados A Tiempo: {studentData.canceladosATiempo}</p>
    </div>
  );
};

export default StudentDetail;