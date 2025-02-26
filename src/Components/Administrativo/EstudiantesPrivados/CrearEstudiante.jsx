import React, { useState, useRef } from "react";
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
import { Toaster, toast } from "sonner";
import ScrollListProfesores from "../Grupos/ScrollListProfesores";
import { uploadPhoto } from "../../../provider/adm/uploadPhoto";

const CrearEditarEstudiante = ({ data, context, flag }) => {
  const [file, setFile] = useState(data.photo);
  const [fullName, setFullName] = useState(data.fullName || "");
  const [email, setEmail] = useState(data.email || "");
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "");
  const [hoursRemaining, sethoursRemaining] = useState(
    parseInt(data.hoursRemaining) || ""
  );
  const [teacherID, setTeacherID] = useState(
    data.teacherDescription ? data.teacherDescription.id : ""
  );
  const [teacherNameprev, setteacherNameprev] = useState(
    data.teacherDescription ? data.teacherDescription.fullName : ""
  );
  const [hoursPlanned, setHoursPlanned] = useState("" || data.hoursPlanned);
  const [ciudad, setCiudad] = useState(data.office || "");
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const fileInputRef = useRef(null); // Referencia al input de archivo

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      try {
        await uploadPhoto("/admin/estudiante/personalizado/actualizar/foto/", data.ID, selectedFile);
        
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

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!fullName || !nameRegex.test(fullName)) {
      toast.error("Please enter a valid name.");
      return false;
    }
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      return false;
    }
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      toast.error("Please enter a valid phone number.");
      return false;
    }
  };

  const handleSave = async () => {
    if (validateFields()) return;

    if (window.confirm("Are you sure you want to save the changes?")) {
      setLoading(true);
      const updatedData = {
        fullName,
        email,
        phoneNumber,
        hoursRemaining,
        hoursPlanned,
        teacherID,
        photo:
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAHkQ9ysAAAAASUVORK5CYII=",
        office: ciudad,
      };
      if (context === "create") {
        try {
          await createEstudent(updatedData);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          console.error("Error creating student", error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          await updateStudentAPI(data.ID, updatedData);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          console.error("Error changing data of student:", error);
        } finally {
          setLoading(false);
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
        { data.ID && flag && (
          <div
          className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
          onClick={(e) => {
            fileInputRef.current.click()
          }}
        >
          <img
            src={file }
            alt="uploadimage"
            className="h-32 w-32 object-cover rounded-full"
          />
          <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{display: "none"}}
          
          // Oculta el input de archivo
        />
        </div>
        )} 


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
              <SelectItem value="MEDELLIN">MEDELLÍN</SelectItem>
              <SelectItem value="BOGOTA">BOGOTÁ</SelectItem>
              <SelectItem value="CALI">CALI</SelectItem>
              <SelectItem value="BARRANQUILLA">BARRANQUILLA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profesor asignado
          </label>
          <ScrollListProfesores
            setTeacherID={setTeacherID}
            setprofesorSelectedToFilter={setteacherNameprev}
            profesorSelectedToFilter={teacherNameprev}
            setLoading={setLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Horas planeadas
          </label>
          <input
            type="number"
            value={hoursPlanned} // Changed from horasRestantes
            onChange={(e) => setHoursPlanned(parseInt(e.target.value))} // Changed from setHorasRestantes
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
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
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
            onClick={handleSave}
          >
            Save Changess
          </Button>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default CrearEditarEstudiante;
