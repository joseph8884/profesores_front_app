import { useState } from "react";
import { Button } from "../../../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../../ui/select";
const EstudentData = ({ studentData }) => {
    // Initialize state for each field with new variable names
  const [fullName, setFullName] = useState(studentData.fullName || ""); // Changed from name to fullName
  const [email, setEmail] = useState(studentData.email || "");
  const [countryCode, setCountryCode] = useState(studentData.countryCode || "");
  const [phoneNumber, setPhoneNumber] = useState(studentData.phoneNumber || "");
  const [hoursPurchased, setHoursPurchased] = useState( // Changed from horasPlaneadas
    parseInt(studentData.hoursPurchased) || 0
  );
  const [hoursSpent, setHoursSpent] = useState( // Changed from horasRestantes
    parseInt(studentData.hoursSpented) || 0
  );
  const [lastLog, setLastLog] = useState( // Changed from lastRegister
    studentData.lastLog ? new Date(studentData.lastLog).toLocaleString() : "N/A"
  );
  const [status, setStatus] = useState(studentData.status ? "activo" : "inactivo"); // Adjusted for boolean status

  // Validation function
  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!fullName || !nameRegex.test(fullName)) { // Changed from name to fullName
      alert("Please enter a valid name.");
      return false;
    }
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return false;
    }
    if (!countryCode || !phoneRegex.test(countryCode)) {
      alert("Please enter a valid country code.");
      return false;
    }
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return false;
    }
    if (hoursPurchased < 0) { // Changed from horasPlaneadas
      alert("Hours purchased cannot be negative.");
      return false;
    }
    if (hoursSpent < 0) { // Changed from horasRestantes
      alert("Hours spent cannot be negative.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateFields()) return;

    if (window.confirm("Are you sure you want to save the changes?")) {
      const updatedData = {
        fullName, // Changed from name to fullName
        email,
        countryCode,
        phoneNumber,
        hoursPurchased, // Changed from horasPlaneadas
        hoursSpented: hoursSpent, // Changed from horasRestantes
        lastLog, // Changed from lastRegister
        status: status === "activo", // Convert back to boolean
      };
      console.log("Saved Data:", updatedData);
      // Aquí puedes agregar la lógica para guardar los datos actualizados
    }
  };

  return (
    <>
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
          <img
            src={studentData.photo || "/profilephoto.jpeg"}
            alt="User"
            className="h-32 w-32 object-cover rounded-full"
          />
        </div>
      </div>

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
          <input
            type="text"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter country code"
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            onChange={(e) => setLastLog(e.target.value)} // Changed from setLastRegister
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status{" "}
          </label>
          <Select defaultValue={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="text-sm font-medium text-gray-700">
              <SelectValue placeholder="status"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
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
