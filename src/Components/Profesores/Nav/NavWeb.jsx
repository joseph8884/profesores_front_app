import React, { useEffect, useState, useRef } from "react";
import { Button } from "../../ui/button";
import Nav from "./Nav";
import { teacherbyIdUser } from "../../../provider/profesor/teacherbyIdUser";
import { uploadPhoto } from "../../../provider/adm/uploadPhoto";
const NavWeb = () => {
  const [profesorData, setProfesorData] = useState({});
  const [file, setFile] = useState("/default_profile_photo.png");
  const fileInputRef = useRef(null); // Referencia al input de archivo

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      try {
        await uploadPhoto(
          "/profesor/informacion/actualizar/foto",
          "",
          selectedFile
        );

        const reader = new FileReader();
        reader.onloadend = () => {
          setFile(reader.result); // Almacena la imagen como una URL de datos
        };
        reader.readAsDataURL(selectedFile);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    } else {
      setFile("");
    }
    // Restablece el valor del input de archivo
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  useEffect(() => {
    const token = sessionStorage.getItem('token'); 
    const fetchProfesorData = async () => {
      const token_from_sessionStorage = sessionStorage.getItem("token");
      if (!token_from_sessionStorage) return {};
      const base64Url = token_from_sessionStorage.split(".")[1];
      const base64 = decodeURIComponent(
        atob(base64Url)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const data = JSON.parse(base64);
      const profe = await teacherbyIdUser(parseInt(data.id));
      setProfesorData(profe);
      try {
        const photoResp = await fetch(
          `${process.env.REACT_APP_API_URL}/photos/team/${profe.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
              "Content-Type": "image/jpeg",
            },
          }
        );
        if (!photoResp.ok) throw new Error("Photo not found");
        const photoBlob = await photoResp.blob();
        setFile(URL.createObjectURL(photoBlob));
      } catch (error) {
        console.error(`Error fetching photo for profesor ${profe.id}:`, error);
      }
    };
    fetchProfesorData();
  }, []);
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userType");
    window.location.href = "/";
  };
  return (
    <div className="hidden md:flex flex-col w-64 bg-blue-900 text-white min-h-screen">
      <div className="p-4">
        <img
          src="/LogoPRofesHorizontal.png"
          alt="Logo"
          className="h-12 mb-6 justify-center"
        />
        <Nav profesorId={profesorData.id} nombre={profesorData.fullName} />
      </div>
      <div className="mt-auto p-4">
        <div className="flex items-center gap-2">
          <img
            src={file}
            alt="User"
            className="h-10 w-10 rounded-full"
            onClick={(e) => {
              fileInputRef.current.click();
            }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}

            // Oculta el input de archivo
          />
          <div>
            <p className="font-semibold">{profesorData.fullName}</p>
            <Button variant="ghost" className="text-red-500" onClick={logout}>
              Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavWeb;
