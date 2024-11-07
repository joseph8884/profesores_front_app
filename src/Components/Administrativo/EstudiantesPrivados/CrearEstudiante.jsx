import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../ui/sheet";
import PhoneInput from "react-phone-input-2";
import { createEstudent } from "../../../provider/adm/EstudiantePersonalizado/postStudent";
import { updateStudentAPI } from "../../../provider/adm/EstudiantePersonalizado/putStudent";
import Loader from "../../Loader/Loader";

const CrearEditarEstudiante = ({ data, context }) => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [fullName, setFullName] = useState(data.fullName || "");
  const [email, setEmail] = useState(data.email || "");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "");
  const [hoursPurchased, setHoursPurchased] = useState(
    parseInt(data.hoursPurchased) || 0
  );
  const [hoursSpent, setHoursSpent] = useState(
    // Changed from horasRestantes
    parseInt(data.hoursSpented) || 0
  );
  const [lastLog, setLastLog] = useState(
    // Changed from lastRegister
    data.lastLog ? new Date(data.lastLog).toLocaleString() : "N/A"
  );
  const [status, setStatus] = useState(data.status ? "activo" : "inactivo"); // Adjusted for boolean status
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log("Preview result:", reader.result); // Verificación
            setFile(reader.result); // Actualiza la vista previa
            setFileError("");
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
    if (hoursPurchased < 0) {
      // Changed from horasPlaneadas
      alert("Hours purchased cannot be negative.");
      return false;
    }
    if (hoursSpent < 0) {
      // Changed from horasRestantes
      alert("Hours spent cannot be negative.");
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
        countryCode: 1,
        phoneNumber,
        hoursPurchased,
        hoursSpented: hoursSpent,
        lastLog: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAHkQ9ysAAAAASUVORK5CYII=",
        photo: file || data.photo, // Aquí envías la imagen como base64
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
          await updateStudentAPI(data.idUser, updatedData);
        } catch (error) {
          console.error("Error updating student:", error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      {loading && <Loader />} {/* Muestra el loader si loading es true */}
      <SheetContent
        side="right"
        className="w-full md:w-1/3 bg-gray-100 text-black min-h-screen p-6 overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader>
          <SheetTitle className="text-xl font-bold mb-4">
            {data.fullName ? "Edit Student" : "Create Student"}
          </SheetTitle>
          <SheetDescription>
            {data.fullName
              ? "Edit the details of the student."
              : "Fill in the details to create a new student."}
          </SheetDescription>
        </SheetHeader>

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

          {/* Hours Purchased Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hours Purchased
            </label>
            <input
              type="number"
              value={hoursPurchased} // Changed from horasPlaneadas
              onChange={(e) => setHoursPurchased(parseInt(e.target.value))} // Changed from setHorasPlaneadas
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Hours Spent Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hours Spent
            </label>
            <input
              type="number"
              value={hoursSpent} // Changed from horasRestantes
              onChange={(e) => setHoursSpent(parseInt(e.target.value))} // Changed from setHorasRestantes
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Last Log Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Log
            </label>
            <input
              type="text"
              value={lastLog} // Changed from lastRegister
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
      </SheetContent>
    </>
  );
};

export default CrearEditarEstudiante;
