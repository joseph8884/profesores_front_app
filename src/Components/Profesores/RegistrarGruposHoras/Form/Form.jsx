import React, { useEffect, useState } from "react";
import NavMobile from "../../Nav/NavMobile";
import NavWeb from "../../Nav/NavWeb";
import { Button } from "../../../ui/button";
import "./Form.css";
import { BellIcon } from "@radix-ui/react-icons";
import GroupData from "./GrupData";
import FormSection from "./FormSection";
const FormGroup = () => {
  const [groupDATA, setStudentData] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem("groupData_profesor");
    if (data) {
      setStudentData(JSON.parse(data));
    }
  }, []);

  if (!groupDATA) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex" style={{ overflowY: 'hidden', height: '100vh', }}>
      <NavMobile />
      <NavWeb />
      <div className="dashboard-group">
        <div className="dashboardcontainerform">
          <div className="tituloynotificaciones">
            <h2 className="text-xl font-bold text-gray-900">
              Registrar Horas
            </h2>
            <div>
            <BellIcon className="h-6 w-6" />
            <a href="/profesor/registrarhoras/estudianteindividual">
              <Button>Back</Button>
            </a>
            
            </div>
          </div>
          <div className="resumenDeActividadAcademica">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-white rounded-lg">
                <h3>
                  Horas Compradas
                </h3>
                <p className="mt-2 text-3xl font-bold">
                  {groupDATA.horasPlaneadas}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3>
                  Horas Restantes
                </h3>
                <p className="mt-2 text-3xl font-bold">
                  {groupDATA.horasRestantes}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3>
                  Horas Canceladas
                </h3>
                <p className="mt-2 text-3xl font-bold">
                  {groupDATA.horasCanceladas}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3>
                  Canceladas por profesor
                </h3>
                <p className="mt-2 text-3xl font-bold">
                  {groupDATA.horasCanceladasProfesor}
                </p>
              </div>
            </div>
          </div>
          < FormSection groupDATA={groupDATA}/>
          <div className="informacionDetalladaEstudiante">
            <GroupData groupData={groupDATA} />
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

export default FormGroup;
