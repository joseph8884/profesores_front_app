import React, { useState } from "react";
import { Button } from "../../ui/button";
import PhoneInput from "react-phone-input-2";
import { createEstudent } from "../../../provider/adm/EstudiantePersonalizado/postStudent";
import { updateStudentAPI } from "../../../provider/adm/EstudiantePersonalizado/putStudent";
import Loader from "../../Loader/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import AddHours from "./AddHours";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

const CrearEditarEstudiante = ({ data, context }) => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [fullName, setFullName] = useState(data.fullName || "");
  const [email, setEmail] = useState(data.email || "");
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "");
  const [hoursRemaining, sethoursRemaining] = useState(
    parseInt(data.hoursRemaining) || ""
  );
  const [ciudad, setCiudad] = useState(data.office || "");
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result); // Almacena la imagen como una URL de datos
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile("");
      setFileError("Please select a valid image file (jpg, jpeg, or png).");
    }
  };

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!fullName || !nameRegex.test(fullName)) {
      // Changed from name to fullName
      alert("Please enter a valid name.");
      return false;
    }
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return false;
    }
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return false;
    }
    if (hoursRemaining < 0 || isNaN(hoursRemaining)) {
      // Changed from horasPlaneadas
      alert("Hours purchased is invalid.");
      return false;
    }
    if (fileError) {
      alert(fileError);
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    if (window.confirm("Are you sure you want to save the changes?")) {
      setLoading(true);

      const updatedData = {
        fullName,
        email,
        countryCode: "1",
        phoneNumber,
        hoursRemaining,
        photo:
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAHkQ9ysAAAAASUVORK5CYII=",
        office: ciudad,
      };
      if (context === "create") {
        try {
          await createEstudent(updatedData);
        } catch (error) {
          console.error("Error creating student:", error);
        } finally {
          setLoading(false);
          window.location.reload();
        }
      } else {
        try {
          await updateStudentAPI(data.ID, updatedData);
        } catch (error) {
          console.error("Error updating student:", error);
        } finally {
          setLoading(false);
          window.location.href = "/admin/tablaestudiantes/estudiantesprivados";
        }
      }
    }
  };

  return (
    <>
      {loading && <Loader />} {/* Muestra el loader si loading es true */}
      {/* Form */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Vista previa de la imagen */}
        <div
          className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <img
            src={file || data.photo}
            alt="uploadimage"
            className="h-32 w-32 object-cover rounded-full"
          />

          <input
            type="file"
            id="fileInput"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={fullName} // Changed from name to fullName
            onChange={(e) => setFullName(e.target.value)} // Changed from setName to setFullName
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter full name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter email"
          />
        </div>

        {/* Country Code Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Numero de telefono
          </label>
          <PhoneInput
            country={"co"} // Default country
            value={phoneNumber}
            onChange={(value, country) => {
              setPhoneNumber(value); // Guarda el número completo
              //setCountryCode(country.countryCode); // Guarda el código del país
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ciudad a notificar
          </label>
          <Select
            defaultValue={ciudad}
            onValueChange={(value) => setCiudad(value)}
          >
            <SelectTrigger className="w-[100%]">
              <SelectValue placeholder="Seleccione una cuidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MEDELLÍN">MEDELLÍN</SelectItem>
              <SelectItem value="BOGOTÁ">BOGOTÁ</SelectItem>
              <SelectItem value="CALI">CALI</SelectItem>
              <SelectItem value="BARRANQUILLA">BARRANQUILLA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {context !== "create" && (
          <div>
            {/* Hours Spent Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Horas Restantes
              </label>
              <input
                type="number"
                value={hoursRemaining} // Changed from horasRestantes
                onChange={(e) => sethoursRemaining(parseInt(e.target.value))} // Changed from setHorasRestantes
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                readOnly
              />
            </div>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">Añadir horas a estudiante +</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <AddHours idStudent={data.ID} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
        {/* Save Button */}
        <div className="pt-4">
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </>
  );
};

export default CrearEditarEstudiante;
