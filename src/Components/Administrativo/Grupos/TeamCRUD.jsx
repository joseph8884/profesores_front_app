import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
 Input
} from "../../ui/input";
const TeamCRUD = ({
  teamName,
  setTeamName,
  hoursSpented,
  setHoursSpented,
  photo,
  setPhoto,
  ciudad,
  setCiudad,
  handleFileChange,
}) => {
  return (
    <>
      <form className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold">Manage Team</h3>
        <div
          className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <img
            src={photo}
            alt="uploadimage"
            className="h-32 w-32 object-cover rounded-full"
          />

          <input
            type="file"
            id="fileInput"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Team Name
          </label>
          <input
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value)
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter team name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hours Spend
          </label>
          <input
            type="number"
            value={hoursSpented}
            onChange={(e) => setHoursSpented(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter hours purchased"
            readOnly
          />
        </div>

        {
          //Esto hay que borrarlo
        }
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photo
          </label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter photo URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ciudad a notificar
          </label>
          <Select
          defaultValue={ciudad}
          onValueChange={(value) => setCiudad(value)}
          >
            <SelectTrigger className="w-[100%]">
              <SelectValue placeholder="Seleccione una cuidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MEDELLÍN">MEDELLÍN</SelectItem>
              <SelectItem value="BOGOTÁ">BOGOTÁ</SelectItem>
              <SelectItem value="CALI">CALI</SelectItem>
              <SelectItem value="BARRANQUILLA">BARRANQUILLA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </>
  );
};

export default TeamCRUD;
