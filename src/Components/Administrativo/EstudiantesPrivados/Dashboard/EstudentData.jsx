import { useState } from "react";
import { Button } from "../../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import PhoneInput from "react-phone-input-2";
import { updateStudentAPI } from "../../../../provider/adm/EstudiantePersonalizado/putStudent";
const EstudentData = ({ studentData }) => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [fullName, setFullName] = useState(studentData.fullName || ""); // Changed from name to fullName
  const [email, setEmail] = useState(studentData.email || "");
  const [countryCode, setCountryCode] = useState(studentData.countryCode || "");
  const [phoneNumber, setPhoneNumber] = useState(studentData.phoneNumber || "");
  const [hoursPurchased, setHoursPurchased] = useState(
    // Changed from horasPlaneadas
    parseInt(studentData.hoursPurchased) || 0
  );
  const [hoursSpent, setHoursSpent] = useState(
    // Changed from horasRestantes
    parseInt(studentData.hoursSpented) || 0
  );
  const [lastLog, setLastLog] = useState(
    // Changed from lastRegister
    studentData.lastLog ? new Date(studentData.lastLog).toLocaleString() : "N/A"
  );
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  // Validation function
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
    if (hoursPurchased < 0 || isNaN(hoursPurchased)) {
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
        hoursPurchased,
        hoursSpented: hoursSpent,
        lastLog: "2024-10-17T17:22:48.123456Z",
        photo:
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAHkQ9ysAAAAASUVORK5CYII=",
      };
      try {
        await updateStudentAPI(studentData.ID, updatedData);
      } catch (error) {
        console.error("Error updating student:", error);
      } finally {
        setLoading(false);
        window.location.reload();
        window.location.href = "/admin/tablaestudiantes/estudiantesprivados";
      }
    }
  };

  return (
    <>
      {/* Form */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Vista previa de la imagen */}
        <div
          className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <img
            src={file || studentData.photo}
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
            className="phone mt-1 block w-64 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            readOnly
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
    </>
  );
};

export default EstudentData;
