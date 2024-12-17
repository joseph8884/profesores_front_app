import React, { useEffect, useState } from "react";

function ClickOnClassEstudentDetailAdmin({ studentId }) {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/estudiante/personalizado/estudiante/${studentId}`,
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
        setStudentData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">
          {studentData.fullName}
        </h1>
        <p className="text-gray-600">ID: {studentData.id}</p>
        <p className="text-gray-600">Email: {studentData.email}</p>
        <p className="text-gray-600">Phone: {studentData.phoneNumber}</p>
        <p className="text-gray-600">Office: {studentData.office}</p>
        <p className="text-gray-600">
          Hours Remaining: {studentData.hoursRemaining}
        </p>
        <img
          className="w-32 h-32 rounded-full mx-auto mt-4"
          src={`data:image/png;base64,${studentData.photo}`}
          alt="Student"
        />
        <p className="text-gray-600 mt-2">
          Status: {studentData.status ? "Active" : "Inactive"}
        </p>
        {studentData.latestPurchasedHour && (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mt-4">
              Latest Purchased Hour
            </h2>
            <p className="text-gray-600">
              Hours: {studentData.latestPurchasedHour.hours}
            </p>
            <p className="text-gray-600">
              Date:{" "}
              {new Date(
                studentData.latestPurchasedHour.date
              ).toLocaleDateString()}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ClickOnClassEstudentDetailAdmin;
