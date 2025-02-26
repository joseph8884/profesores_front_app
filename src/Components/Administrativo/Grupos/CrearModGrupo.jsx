import React, { useState, useEffect, useRef } from "react";
import { createTeam, editTeam } from "../../../provider/adm/Grupos/crearTeam&Company";
import { Button } from "../../ui/button";
import Loader from "../../Loader/Loader";
import CompanyCRUD from "./CompanyCRUD.jsx";
import { getCompanys } from "../../../provider/adm/Grupos/getCompany";
import TeamCRUD from "./TeamCRUD.jsx"; // Importa el nuevo componente
import { uploadPhoto } from "../../../provider/adm/uploadPhoto";
const CrearModGrupo = ({ initialData, context, flag }) => {
  const [companies, setCompanies] = useState([]);
  const [nit, setNit] = useState(initialData.companyNIT || "");
  const [idCompany, setidCompany] = useState(initialData.companyID || "");
  const [name, setName] = useState(initialData.companyName || "");
  const [teacherID, setTeacherID] = useState(initialData.teacherDescription ? initialData.teacherDescription.id : "");
  const [teacherNameprev,setteacherNameprev] = useState(initialData.teacherDescription ? initialData.teacherDescription.fullName : "");
  const [loading, setLoading] = useState(false);
  const [hoursPlanned, setHoursPlanned] = useState(initialData.hoursPlanned || ""); 
  const fileInputRef = useRef(null);
  // Variables de estado para el equipo
  const [teamName, setTeamName] = useState(initialData.name||"" );
  const [photo, setPhoto] = useState(initialData.photo || "");
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
    const combinedData = {
      name: teamName,
      //hoursPlanned: hoursPlanned,
      companyID: idCompany,
      photo: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAHkQ9ysAAAAASUVORK5CYII=",
      teacherID: teacherID,
    };

    if (context === "create") {
      try {
        await createTeam(combinedData);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error creating student:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await editTeam(initialData.ID, combinedData);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error updating student:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      try {
        await uploadPhoto("/admin/equipo/actualizar/foto/", initialData.ID, selectedFile);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhoto(reader.result); // Almacena la imagen como una URL de datos
        };
        reader.readAsDataURL(selectedFile);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    } else {
      setPhoto("");
    }
        // Restablece el valor del input de archivo
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
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
          handleFileChange={handleFileChange}
          setTeacherID={setTeacherID}
          teacherNameprev={teacherNameprev}
          setteacherNameprev={setteacherNameprev}
          hoursPlanned={hoursPlanned}
          setHoursPlanned={setHoursPlanned}
          flag={flag}
          fileInputRef={fileInputRef}
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
