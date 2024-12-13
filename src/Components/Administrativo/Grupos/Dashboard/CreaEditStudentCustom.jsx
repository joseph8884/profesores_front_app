import React, { useState } from "react";
import { Button } from "../../../ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../../ui/sheet";
import PhoneInput from "react-phone-input-2";
import { createEstudentCustom } from "../../../../provider/adm/Grupos/students/postStudentCustom";
import { updateStudentAPICustom } from "../../../../provider/adm/Grupos/students/putStudentCustom";
import Loader from "../../../Loader/Loader";

const CrearEditarEstudianteCustom = ({ data, context, idGroup }) => {
  const [fullName, setFullName] = useState(data.fullName || "");
  const [email, setEmail] = useState(data.email || "");
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || "");
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const [attendancePercentage, setAttendancePercentage] = useState(data.attendancePercentage || 0);
  const [attendedClassesCount, setAttendedClassesCount] = useState(data.attendedClassesCount || 0);

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
    if (attendancePercentage < 0) {
      // Changed from horasPlaneadas
      alert("Hours purchased cannot be negative.");
      return false;
    }
    if (attendedClassesCount < 0) {
      // Changed from horasRestantes
      alert("Hours spent cannot be negative.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    if (window.confirm("Are you sure you want to save the changes?")) {
      setLoading(true);

      const updatedData = {
        teamID: idGroup,
        fullName,
        phoneNumber,
        email,       
        attendancePercentage,
        attendedClassesCount
      };
      if (context === "create") {
        try {
          
          await createEstudentCustom(updatedData);
        } catch (error) {
          console.error("Error creating student:", error);
        } finally {
          setLoading(false);
          window.location.reload();
        }
      } else {
        try {
       
          await updateStudentAPICustom(data.id, updatedData);
        } catch (error) {
          console.error("Error updating student:", error);
        } finally {
          setLoading(false);
          window.location.reload();
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
              }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter phone number"
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

export default CrearEditarEstudianteCustom;
