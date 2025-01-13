"use client";
import React, { useState } from "react";
import ScrollListProfesores from "./ScrollListProfesores";
import Loader from "../../Loader/Loader";
const TeamCRUD = ({
  teamName,
  setTeamName,
  photo,
  handleFileChange,
  setTeacherID,
  teacherNameprev,
  setteacherNameprev,
  hoursPlanned,
  setHoursPlanned,
  flag,
  fileInputRef,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loader />}
      <form className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold">Manage Team</h3>
        {/* Vista previa de la imagen */}
        {teamName && flag && (
          <div
            className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              fileInputRef.current.click();
            }}
          >
            <img
              src={photo}
              alt="uploadimage"
              className="h-32 w-32 object-cover rounded-full"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}

              // Oculta el input de archivo
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Team Name
          </label>
          <input
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter team name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teacher name
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
      </form>
    </>
  );
};

export default TeamCRUD;
