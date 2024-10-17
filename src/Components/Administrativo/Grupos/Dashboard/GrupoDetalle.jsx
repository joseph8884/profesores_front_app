import React, {useEffect,useState} from "react";
import { useLocation } from "react-router-dom";
import NavMobile from "../../Nav/NavMobile";
import NavWeb from "../../Nav/NavWeb";
import { Button } from "../../../ui/button";
import "./GrupoDetalle.css";

const GroupDetail = () => {
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('groupData');
    if (data) {
      setGroupData(JSON.parse(data));
    }
  }, []);

  if (!groupData) {
    return <div>Loading...</div>;
  }


  return (
    <div className="min-h-screen flex">
      <NavMobile />
      <NavWeb />
      <div className="dashboard">
        <div className="dashboardcontainer">
          <div className="filtrosandbackbtn">
            <a href="/grupos_administrativo"><Button>Back</Button></a>
            {
            //Cosas de los filtros.
            }
          </div>
          <div className="resumenDeActividadAcademica">
            datos de la persona
          </div>
          <div className="calendario">
            Calendario
          </div>
          <div className="grafica">
            grafica
          </div>
          <div className="informacionDetalladaEstudiante">
            info del estudiante
          </div>
          <div className="ultimasclasesvistas">
            clases vistas
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

export default GroupDetail;
