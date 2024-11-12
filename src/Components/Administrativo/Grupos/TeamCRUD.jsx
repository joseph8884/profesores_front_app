import React from "react";
import { Button } from "../../ui/button";
import Loader from "../../Loader/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
const TeamCRUD = ({
  teamName,
  setTeamName,
  hoursSpented,
  setHoursSpented,
  photo,
  setPhoto,
  loading,
  status,
  setStatus,
  setLoading,
}) => {

  return (
    <>
      {loading && <Loader />}
      <form className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold">Manage Team</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter team name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hours Spend</label>
          <input
            type="number"
            value={hoursSpented}
            onChange={(e) => setHoursSpented(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter hours purchased"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter photo URL"
          />
        </div>
      </form>
    </>
  );
};

export default TeamCRUD;