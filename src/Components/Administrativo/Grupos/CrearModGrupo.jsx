import React, { useState, useEffect } from "react";
import { createTeam } from "../../../provider/adm/Grupos/crearTeam&Company";
import { Button } from "../../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import Loader from "../../Loader/Loader";
import CompanyCRUD from "./CompanyCRUD.jsx";
import { getCompanys } from "../../../provider/adm/Grupos/getCompany";
import TeamCRUD from "./TeamCRUD.jsx"; // Importa el nuevo componente

const CrearModGrupo = ({ initialData }) => {
  const [companies, setCompanies] = useState([]);
  const [nit, setNit] = useState("");
  const [idCompany, setidCompany] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Variables de estado para el equipo
  const [teamName, setTeamName] = useState("");
  const [teamCompanyID, setTeamCompanyID] = useState("");
  const [hoursPurchased, setHoursPurchased] = useState(0);
  const [hoursSpented, setHoursSpented] = useState(0);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data_fromAPI = await getCompanys();
        setCompanies(data_fromAPI);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleSubmit = () => {
    const combinedData = {
      company: {
        nit,
        idCompany,
        name,
      },
      team: {
        name: teamName,
        companyID: teamCompanyID,
        hoursPurchased,
        hoursSpented,
        photo,
      },
    };
    console.log("Combined Data:", JSON.stringify(combinedData, null, 2));
  };

  return (
    <>
      {loading && <Loader />}
      <div>
        

        {/* Company Form */}
        <CompanyCRUD
          companies={companies}
          setCompanies={setCompanies}
          nit={nit}
          setNit={setNit}
          idCompany={idCompany}
          setidCompany={setidCompany}
          name={name}
          setName={setName}
          loading={loading}
          setLoading={setLoading}
        />

        <TeamCRUD
          teamName={teamName}
          setTeamName={setTeamName}
          teamCompanyID={teamCompanyID}
          setTeamCompanyID={setTeamCompanyID}
          hoursPurchased={hoursPurchased}
          setHoursPurchased={setHoursPurchased}
          hoursSpented={hoursSpented}
          setHoursSpented={setHoursSpented}
          photo={photo}
          setPhoto={setPhoto}
        />
        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default CrearModGrupo;
