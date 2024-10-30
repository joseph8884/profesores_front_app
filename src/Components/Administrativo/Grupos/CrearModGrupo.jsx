import React, { useState, useEffect } from "react";
import {
  createTeam,
} from "../../../provider/adm/Grupos/crearTeam&Company";
import { getCompanys } from "../../../provider/adm/Grupos/getCompany";
import { Button } from "../../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../ui/dialog";
import CrearCompany from "./CrearCompany.jsx";
import { TrashIcon } from "@radix-ui/react-icons";
import Loader from "../../Loader/Loader";
import { delateCompany } from "../../../provider/adm/Grupos/deleteCompany";


const CrearModGrupo = ({ initialData }) => {
  const [companies, setCompanies] = useState([]);
  const [nit, setNit] = useState("");
  const [idCompany, setidCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamData, setTeamData] = useState({
    name: "",
    companyID: "",
    hoursPurchased: 0,
    hoursSpented: 0,
    photo: "",
  });
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data_fromAPI = await getCompanys();
        setCompanies(data_fromAPI);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

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
    }
  }, [initialData]);

  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({ ...prevData, [name]: value }));
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
    <>
      {loading && <Loader />}
      <SheetContent
        side="right"
        className="w-full md:w-1/3 bg-gray-100 text-black min-h-screen p-6 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-bold mb-4">
            Create or Modify Group
          </SheetTitle>
        </SheetHeader>

        {/* Company Form */}
        <form className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Select Company</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <div className="grid grid-cols-3 items-center gap-4">
              <Select
                onValueChange={(value) => {
                  const selectedCompany = companies.find(
                    (company) => company.name === value
                  );
                  if (selectedCompany) {
                    setNit(selectedCompany.nit); // Autocompletar el NIT
                    setidCompany(selectedCompany.id);
                  }
                }}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.name}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <TrashIcon
                className="w-6 h-6 text-gray-400 col-span-3"
                onClick={async () => {
                  setLoading(true);
                  try {
                    await delateCompany(idCompany);
                  } catch (error) {
                    console.error("Error creating student:", error);
                  } finally {
                    setLoading(false);
                    window.location.reload();
                  }
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              NIT
            </label>
            <input
              type="text"
              name="nit"
              value={nit}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter NIT"
              readOnly
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">Create Company +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <CrearCompany />
            </DialogContent>
          </Dialog>
        </form>

        {/* Team Form */}
        <form className="space-y-4">
          <h3 className="text-lg font-semibold">Create Team</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team Name
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Company ID
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Hours Purchased
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Photo
            </label>
            <input
              type="text"
              name="photo"
              value={teamData.photo}
              onChange={handleTeamChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter photo URL"
            />
          </div>
          <Button
            onClick={handleCreateTeam}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
          >
            Create Team
          </Button>
        </form>
      </SheetContent>
    </>
  );
};

export default CrearModGrupo;
