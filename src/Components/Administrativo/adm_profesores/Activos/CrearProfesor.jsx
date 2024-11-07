import React, { useState } from "react";
import { Button } from "../../../ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import Loader from "../../../Loader/Loader";
import { postTeacher } from "../../../../provider/adm/profesores/postTeacher";
const CrearProfesorDialog = () => {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const handleCreateCompany = async () => {
    setLoading(true);
    const companyData = {
        fullName,
        email,
        registerDate: new Date().toISOString()
    };

    try {
     console.log("Data on create",companyData);
    await postTeacher(companyData);
      
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
        <DialogTitle>{"crear"}</DialogTitle>
        <DialogDescription>
          Ingrese el nombre y el nit de la empresa
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nombre
          </Label>
          <Input
            id="name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default CrearProfesorDialog;
