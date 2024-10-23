import React from "react";
import { useState } from "react";
import { Button } from "../../ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const CrearEditarEstudiante = ({ data }) => {
  // Initialize state for each field
  const [name, setName] = useState(data.name || "");
  const [email, setEmail] = useState(data.email || "");
  const [countryCode, setCountryCode] = useState(data.countryCode || "");
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "");
  const [horasPlaneadas, setHorasPlaneadas] = useState(
    parseInt(data.horasPlaneadas) || 0
  );
  const [horasRestantes, setHorasRestantes] = useState(
    parseInt(data.horasRestantes) || 0
  );
  const [lastRegister, setLastRegister] = useState(
    data.lastRegister ? new Date(data.lastRegister).toLocaleString() : "N/A"
  );
  const [status, setStatus] = useState(data.status || "inactivo");

  // Validation function
  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!name || !nameRegex.test(name)) {
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
    if (horasPlaneadas < 0) {
      alert("Hours purchased cannot be negative.");
      return false;
    }
    if (horasRestantes < 0) {
      alert("Hours spent cannot be negative.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateFields()) return;

    if (window.confirm("Are you sure you want to save the changes?")) {
      const updatedData = {
        name,
        email,
        countryCode,
        phoneNumber,
        horasPlaneadas,
        horasRestantes,
        lastRegister,
        status,
      };
      console.log("Saved Data:", updatedData);
      // Aquí puedes agregar la lógica para guardar los datos actualizados
    }
  };

  return (
    <SheetContent
      side="right"
      className="w-full md:w-1/3 bg-gray-100 text-black min-h-screen p-6 overflow-y-auto"
    >
      {/* Header */}
      <SheetHeader>
        <SheetTitle className="text-xl font-bold mb-4">
          {data.name ? "Edit Student" : "Create Student"}
        </SheetTitle>
        <SheetDescription>
          {data.name
            ? "Edit the details of the student."
            : "Fill in the details to create a new student."}
        </SheetDescription>
      </SheetHeader>
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
          <img
            src={data.photo || "/profilephoto.jpeg"}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={horasPlaneadas}
            onChange={(e) => setHorasPlaneadas(parseInt(e.target.value))}
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
            value={horasRestantes}
            onChange={(e) => setHorasRestantes(parseInt(e.target.value))}
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
            value={lastRegister}
            onChange={(e) => setLastRegister(e.target.value)}
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
    </SheetContent>
  );
};

export default CrearEditarEstudiante;
