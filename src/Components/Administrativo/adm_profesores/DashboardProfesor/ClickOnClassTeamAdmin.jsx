import React, { useEffect, useState } from "react";

function ClickOnClassTeamAdmin({ teamID }) {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/equipo/team/${teamID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTeamData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [teamID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mt-4">
          Team Information
        </h2>
        <p className="text-gray-600">ID: {teamData.id}</p>
        <p className="text-gray-600">Name: {teamData.name}</p>
        <p className="text-gray-600">Company ID: {teamData.companyID.id}</p>
        <p className="text-gray-600">Company Name: {teamData.companyID.name}</p>
        <p className="text-gray-600">Company NIT: {teamData.companyID.nit}</p>
        <p className="text-gray-600">
          Status: {teamData.status ? "Active" : "Inactive"}
        </p>
        <h3 className="text-lg font-semibold text-gray-800 mt-4">
          Profesor a cargo
        </h3>
        <p className="text-gray-600">ID: {teamData.teacherDescription.id}</p>
        <p className="text-gray-600">
          Full Name: {teamData.teacherDescription.fullName}
        </p>
      </div>
    </div>
  );
}

export default ClickOnClassTeamAdmin;
