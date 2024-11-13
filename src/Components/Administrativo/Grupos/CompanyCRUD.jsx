import React from "react";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import CrearCompany from "./CrearEditCompany.jsx";
import { TrashIcon } from "@radix-ui/react-icons";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Loader from "../../Loader/Loader";
import { delateCompany } from "../../../provider/adm/Grupos/deleteCompany";

const CompanyCRUD = ({
  companies,
  nit,
  setNit,
  idCompany,
  setName,
  name,
  setidCompany,
  loading,
  setLoading,
}) => {
  const handleDeleteCompany = async () => {
    setLoading(true);
    try {
      await delateCompany(idCompany);
    } catch (error) {
      console.error("Error creating student:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };
  return (
    <>
      {loading && <Loader />}
      <form className="space-y-4 mb-6 w-[100%]">
        <h3 className="text-lg font-semibold">Select Company</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4">
            <Select
              defaultValue={name}
              onValueChange={(value) => {
                const selectedCompany = companies.find(
                  (company) => company.name === value
                );
                if (selectedCompany) {
                  setNit(selectedCompany.nit);
                  setName(selectedCompany.name);
                  setidCompany(selectedCompany.id);
                }
              }}
            >
              <SelectTrigger className="w-[100%]">
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
              className="w-6 h-6 text-gray-400"
              onClick={async () => handleDeleteCompany()}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Pencil1Icon className="w-6 h-6 text-gray-400" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <CrearCompany
                  data={
                    name || nit ? { name: name, nit: nit, id: idCompany } : {}
                  }
                  context={name || nit ? "editar" : "crear"}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">NIT</label>
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
            <CrearCompany data={{}} context={"crear"} />
          </DialogContent>
        </Dialog>
      </form>
    </>
  );
};
export default CompanyCRUD;
