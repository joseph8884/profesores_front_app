import React from "react";
import { Button } from "../../ui/button";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../ui/sheet";

const CrearEditarEstudiante = ({ data }) => {
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
          {data.name ? "Edit the details of the student." : "Fill in the details to create a new student."}
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
      <form className="space-y-4">
        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={data.name || ""}
            onChange={() => {}}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter full name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={data.email || ""}
            onChange={() => {}}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter email"
          />
        </div>

        {/* Country Code Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Country Code</label>
          <input
            type="text"
            value={data.countryCode || ""}
            onChange={() => {}}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter country code"
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            value={data.phoneNumber || ""}
            onChange={() => {}}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter phone number"
          />
        </div>

        {/* Hours Purchased Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Hours Purchased</label>
          <input
            type="number"
            value={parseInt(data.horasPlaneadas) || 0}
            onChange={() => {}}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Hours Spent Field*/}
        <div>
          <label className="block text-sm font-medium text-gray-700">Hours Spent</label>
          <input
            type="number"
            value={parseInt(data.horasRestantes) || 0}
            onChange={() => {}}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Last Log Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Log</label>
          <input
            type="text"
            value={data.lastRegister ? new Date(data.lastRegister).toLocaleString() : "N/A"}
            onChange={() => {}}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md">
            Save Changes
          </Button>
        </div>
      </form>
    </SheetContent>
  );
};

export default CrearEditarEstudiante;
