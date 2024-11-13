import React, { useState, useEffect } from "react";
import { createTeam, editTeam } from "../../../provider/adm/Grupos/crearTeam&Company";
import { Button } from "../../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import Loader from "../../Loader/Loader";
import CompanyCRUD from "./CompanyCRUD.jsx";
import { getCompanys } from "../../../provider/adm/Grupos/getCompany";
import TeamCRUD from "./TeamCRUD.jsx"; // Importa el nuevo componente

const CrearModGrupo = ({ initialData, context }) => {
  const [companies, setCompanies] = useState([]);
  const [nit, setNit] = useState(initialData.companyNIT || "");
  const [idCompany, setidCompany] = useState(initialData.companyID || "");
  const [name, setName] = useState(initialData.companyName || "");
  const [loading, setLoading] = useState(false);

  // Variables de estado para el equipo
  const [teamName, setTeamName] = useState(String(initialData.name) );
  const [photo, setPhoto] = useState("");
  const [ciudad, setCiudad] = useState(initialData.city || "");
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

  const handleSubmit = async () => {
    setLoading(true);
    console.log("ciuadad seleccionada", ciudad);
    const combinedData = {
      name: teamName,
      companyID: idCompany,
      hoursPurchased: 0, // Este dato no existe en la lógica
      hoursSpented: initialData.hoursSpented,
      photo: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAHkQ9ysAAAAASUVORK5CYII=",
    };

    if (context === "create") {
      try {
        console.log("Data on create", combinedData);
        await createTeam(combinedData);
      } catch (error) {
        console.error("Error creating student:", error);
      } finally {
        setLoading(false);
        window.location.reload();
      }
    } else {
      try {
        await editTeam(initialData.ID, combinedData);
      } catch (error) {
        console.error("Error updating student:", error);
      } finally {
        setLoading(false);
        window.location.reload();
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Preview result:", reader.result); // Verificación
        setPhoto(reader.result); // Actualiza la vista previa
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPhoto("");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div style={{ overflowY: 'auto' }}>
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
          hoursSpented={initialData.hoursSpented || ""}
          photo={photo}
          setPhoto={setPhoto}
          ciudad={ciudad}
          setCiudad={setCiudad}
          handleFileChange={handleFileChange}
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
