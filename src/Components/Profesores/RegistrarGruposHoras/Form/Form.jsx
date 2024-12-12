import React, { useEffect, useState } from "react";
import NavMobile from "../../Nav/NavMobile";
import NavWeb from "../../Nav/NavWeb";
import { Button } from "../../../ui/button";
import "./Form.css";
import { BellIcon } from "@radix-ui/react-icons";
import GroupData from "./GrupData";
import FormSection from "./FormSection";
import { useLocation } from "react-router-dom";
const FormGroup = () => {
  const [groupDATA, setStudentData] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const teacherId = params.get("profesorId");
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
              Registrar Horas para grupo: {groupDATA.name}, con el id: {groupDATA.id}.
            </h2>
            <div>
            <BellIcon className="h-6 w-6" />
            <a href={`/profesor/registrarhoras/grupos?&profesorId=${teacherId}`}>
              <Button>Back</Button>
            </a>
            
            </div>
          </div>
          < FormSection groupDATA={groupDATA}/>
          <div className="informacionDetalladaEstudiante">
            <GroupData groupData={groupDATA} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGroup;
