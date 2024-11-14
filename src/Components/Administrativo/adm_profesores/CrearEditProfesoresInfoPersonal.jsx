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

const CrearEditarProfesorInfoPersonal = ({ data, context }) => {
  const [fullName, setFullName] = useState(data.fullName || "");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "");
  const [emergencyContact, setemergencyContact]= useState(data.emergencyContact || "");
  const [identificationType, setIdentificationType]= useState(data.identificationType || "");
  const [identificationNumber, setidentificationNumber]= useState(data.identificationNumber || "");

  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const validateFields = () => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!fullName || !nameRegex.test(fullName)) {
      // Changed from name to fullName
      alert("Please enter a valid name.");
      return false;
    }

    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid phone number.");
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
        phoneNumber,
        countryCode: "1",
        emergencyContact,
        identificationType,
        identificationNumber,
  };
      if (context === "create") {
        try {
          //await createEstudent(updatedData);
        } catch (error) {
          console.error("Error creating student:", error);
        } finally {
          setLoading(false);
          window.location.reload();
        }
      } else {
        try {
          //await updateStudentAPI(data.ID, updatedData);
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

        {/* Country Code Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country Code
          </label>
          <PhoneInput
            country={"co"} // Default country
            value={phoneNumber}
            onChange={(value, country) => {
              setPhoneNumber(value); // Guarda el número completo
              setCountryCode(country.countryCode); // Guarda el código del país
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter phone number"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contacto de Emergencia
          </label>
          <input
            type="number"
            value={emergencyContact} // Changed from horasPlaneadas
            onChange={(e) => setemergencyContact(parseInt(e.target.value))} // Changed from setHorasPlaneadas
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de identificación
          </label>
          <Select
            defaultValue={identificationType}
            onValueChange={(value) => setIdentificationType(value)}
          >
            <SelectTrigger className="w-[100%]">
              <SelectValue placeholder="Tipo de identificacion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="C.C">Cedula de Ciudadania</SelectItem>
              <SelectItem value="T.I">Tarjeta de identidad</SelectItem>
              <SelectItem value="Pasaporte">Pasaporte</SelectItem>
              <SelectItem value="Visa">Visa</SelectItem>
              <SelectItem value="Carnet Extranjeria">Carnet de extranjería</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Numero de identificación
          </label>
          <input
            type="number"
            value={identificationNumber} // Changed from horasPlaneadas
            onChange={(e) => setidentificationNumber(parseInt(e.target.value))} // Changed from setHorasPlaneadas
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de registro
          </label>
          <input
            type="text"
            value={
              data.registerDate
                ? new Date(data.registerDate).toLocaleString()
                : "No debe ingresar nada aca"
            } // Changed from lastRegister
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            readOnly
          />
        </div>
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

export default CrearEditarProfesorInfoPersonal;
