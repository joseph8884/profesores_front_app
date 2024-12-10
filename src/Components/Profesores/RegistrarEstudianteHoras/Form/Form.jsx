import React, { useEffect, useState } from "react";
import NavMobile from "../../Nav/NavMobile";
import NavWeb from "../../Nav/NavWeb";
import { Button } from "../../../ui/button";
import "./Form.css";
import { BellIcon } from "@radix-ui/react-icons";
import EstudentData from "./EstudentData";
import FormSection from "./FormSection";
const Form = () => {
  const [studentData, setStudentData] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem("selected_student_profesor");
    if (data) {
      setStudentData(JSON.parse(data));
    }
  }, []);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex" style={{ overflowY: 'hidden', height: '100vh', width:'100vw'}}>
      <NavMobile />
      <NavWeb />
      <div className="dashboard-student">
        <div className="dashboardcontainerform">
          <div className="tituloynotificaciones">
            <h2 className="font-bold ">
              Registrar Horas {studentData.fullName} y con id {studentData.id}
            </h2>
            <div>
            <BellIcon className="h-6 w-6" />
            <a href="/profesor/registrarhoras/estudianteindividual">
              <Button>Back</Button>
            </a>
            
            </div>
          </div>
          < FormSection data={studentData}/>
          <div className="informacionDetalladaEstudiante">
            <EstudentData studentData={studentData} />
          </div>
        </div>
      </div>

      {/**
         *       <h1>Student Detail</h1>
      <p>Name: {studentData.name}</p>
      <p>Virtual: {studentData.virtual}</p>
      <p>Presencial: {studentData.presencial}</p>
      <p>Last Register: {studentData.lastRegister}</p>
      <p>Horas Planeadas: {studentData.horasPlaneadas}</p>
      <p>Horas Restantes: {studentData.horasRestantes}</p>
      <p>Cancelados Tarde: {studentData.canceladosTarde}</p>
      <p>Cancelados A Tiempo: {studentData.canceladosATiempo}</p>
         */}
    </div>
  );
};

export default Form;
