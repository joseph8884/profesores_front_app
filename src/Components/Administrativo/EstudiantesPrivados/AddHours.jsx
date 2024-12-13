import React, { useState } from "react";
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
import { addHoursEndpoint } from "../../../provider/adm/EstudiantePersonalizado/PutAddHours";
const AddHours = ({ idStudent }) => {
  const [hours, setHours] = useState(0);
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const getIDfromtoken = () => {
    const token_from_sessionStorage = sessionStorage.getItem("token");
    if (!token_from_sessionStorage) return {};
    const base64Url = token_from_sessionStorage.split(".")[1];
    const base64 = decodeURIComponent(
      atob(base64Url)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const data = JSON.parse(base64);
    return parseInt(data.id);
  };
  const handleAddHours = async () => {
    setLoading(true);
    const add = {
      idStudent,
      idAdmin: getIDfromtoken(),
      hours,
    };

    try {
        await addHoursEndpoint(add);
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
        <DialogTitle>Añadir horas</DialogTitle>
        <DialogDescription>
          Ingrese las horas por añadir
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Valor en horas
          </Label>
          <Input
            id="hours"
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={handleAddHours}>
          Save changes
        </Button>
      </DialogFooter>
    </>
  );
};

export default AddHours;
