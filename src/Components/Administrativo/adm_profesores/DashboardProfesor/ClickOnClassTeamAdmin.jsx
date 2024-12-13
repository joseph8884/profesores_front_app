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
          `https://profesoresbackend.onrender.com/admin/equipo/team/${teamID}`,
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
          Teacher Information
        </h3>
        <p className="text-gray-600">ID: {teamData.teacherID.id}</p>
        <p className="text-gray-600">
          Full Name: {teamData.teacherID.fullName}
        </p>
        <p className="text-gray-600">
          Phone Number: {teamData.teacherID.phoneNumber}
        </p>
        <p className="text-gray-600">
          Emergency Contact: {teamData.teacherID.emergencyContact}
        </p>
        <p className="text-gray-600">
          Identification Type: {teamData.teacherID.identificationType}
        </p>
        <p className="text-gray-600">
          Identification Number: {teamData.teacherID.identificationNumber}
        </p>
        <p className="text-gray-600">
          Status: {teamData.teacherID.status ? "Active" : "Inactive"}
        </p>
        <p className="text-gray-600">
          Register Date:{" "}
          {new Date(teamData.teacherID.registerDate).toLocaleDateString()}
        </p>
        <p className="text-gray-600">Username: {teamData.teacherID.username}</p>
      </div>
    </div>
  );
}

export default ClickOnClassTeamAdmin;
