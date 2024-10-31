import React, { useState } from "react";
import { creaCompany } from "../../../provider/adm/Grupos/crearTeam&Company";
import {putCompany} from "../../../provider/adm/Grupos/putCompany";
import { Button } from "../../ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import Loader from "../../Loader/Loader";
const CrearCompany = ({data, context}) => {
  const [name, setName] = useState(data.name||"");
  const [nit, setNIT] = useState(data.nit||"");
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const handleCreateCompany = async () => {
    setLoading(true);
    const companyData = {
      name,
      nit,
    };
    if (!companyData.name || !companyData.nit) {
      console.error("Name and NIT are required.");
      setLoading(false);
      return;
    }

    try {
      if (context === "crear") {
        await creaCompany(companyData);
      } else{
        await putCompany(companyData, data.id);
      }
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
      <DialogHeader>
        <DialogTitle>{context}</DialogTitle>
        <DialogDescription>
          Ingrese el nombre y el nit de la empresa
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nombre de la compañia
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            NIT
          </Label>
          <Input
            id="NIT"
            type="text"
            value={nit}
            onChange={(e) => setNIT(e.target.value)}
            className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={handleCreateCompany}>
          Save changes
        </Button>
      </DialogFooter>
    </>
  );
};

export default CrearCompany;
