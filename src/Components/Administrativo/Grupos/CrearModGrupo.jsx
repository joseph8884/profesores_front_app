import React, { useState, useEffect } from "react";
import { createCompany, createTeam } from "../../../provider/adm/Grupos/crearTeam&Company";
import { Button } from "../../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";

const CrearModGrupo = ({ initialData }) => {
  const [companyData, setCompanyData] = useState({ name: "", nit: "" });
  const [teamData, setTeamData] = useState({ name: "", companyID: "", hoursPurchased: 0, hoursSpented: 0, photo: "" });

  useEffect(() => {
    if (initialData) {
      // Pre-fill the form with the initial data
      setTeamData({
        name: initialData.name,
        companyID: initialData.companyID.id,
        hoursPurchased: initialData.hoursPurchased,
        hoursSpented: initialData.hoursSpented,
        photo: initialData.photo,
      });
      setCompanyData({
        name: initialData.companyID.name,
        nit: initialData.companyID.nit,
      });
    }
  }, [initialData]);

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateCompany = async () => {
    try {
      const response = await createCompany(companyData);
      console.log("Company created:", response);
      // Optionally update the companyID in teamData if needed
      setTeamData((prevData) => ({ ...prevData, companyID: response.id }));
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const handleCreateTeam = async () => {
    try {
      const response = await createTeam(teamData);
      console.log("Team created:", response);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <SheetContent
      side="right"
      className="w-full md:w-1/3 bg-gray-100 text-black min-h-screen p-6"
    >
      <SheetHeader>
        <SheetTitle className="text-xl font-bold mb-4">Create or Modify Group</SheetTitle>
      </SheetHeader>

      {/* Company Form */}
      <form className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold">Create Company</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="name"
            value={companyData.name}
            onChange={handleCompanyChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">NIT</label>
          <input
            type="text"
            name="nit"
            value={companyData.nit}
            onChange={handleCompanyChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter NIT"
          />
        </div>
        <Button onClick={handleCreateCompany} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md">
          Create Company
        </Button>
      </form>

      {/* Team Form */}
      <form className="space-y-4">
        <h3 className="text-lg font-semibold">Create Team</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Team Name</label>
          <input
            type="text"
            name="name"
            value={teamData.name}
            onChange={handleTeamChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter team name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company ID</label>
          <input
            type="number"
            name="companyID"
            value={teamData.companyID}
            onChange={handleTeamChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter company ID"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hours Purchased</label>
          <input
            type="number"
            name="hoursPurchased"
            value={teamData.hoursPurchased}
            onChange={handleTeamChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter hours purchased"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <input
            type="text"
            name="photo"
            value={teamData.photo}
            onChange={handleTeamChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter photo URL"
          />
        </div>
        <Button onClick={handleCreateTeam} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md">
          Create Team
        </Button>
      </form>
    </SheetContent>
  );
};

export default CrearModGrupo;
