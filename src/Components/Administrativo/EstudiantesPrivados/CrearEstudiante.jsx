import React from "react";
import { Button } from "../../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";

const CrearEstudiante = ({ data }) => {
  return (
    <SheetContent
      side="right"
      className="w-full md:w-1/3 bg-gray-100 text-black min-h-screen p-6"
    >
      {/* Header */}
      <SheetHeader>
        <SheetTitle className="text-xl font-bold mb-4">Edit Student</SheetTitle>
      </SheetHeader>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
          <img
            src={data.profileImage || "/profilephoto.jpeg"}
            alt="User"
            className="h-32 w-32 object-cover rounded-full"
          />
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={data.name || ""}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={data.email || ""}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter email"
          />
        </div>

        {/* Date of Birth Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={data.dob || ""}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Country/Region Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Country/Region</label>
          <select
            value={data.country || ""}
            className="mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select a country</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Mexico">Mexico</option>
            <option value="USA">USA</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
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

export default CrearEstudiante;
