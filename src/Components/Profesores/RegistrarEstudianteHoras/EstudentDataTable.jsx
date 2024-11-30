import React, { useState, useMemo, useEffect } from "react";
import { Button } from "../../ui/button";
import { DataTableDemoTemplate } from "../../ui/DataTableAdjusted";
import { Input } from "../../ui/input";
import { BellIcon } from "@radix-ui/react-icons";
import { getStudentsCustom } from "../../../provider/profesor/EstudianteIndividual/getStudents";
import Loader from "../../Loader/Loader";


export function DataTableDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data_fromAPI = await getStudentsCustom();
        setData(data_fromAPI);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);
  // Filter data based on search input
  const filteredData = useMemo(() => {
    if (loading) return [];
    if (!searchTerm) return data;
    return data.filter((item) =>
      ["name", "email", "id"].some((key) => {
        const value = item[key];
        return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm, loading, data]);
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "photo",
      header: "Photo",
      cell: ({ row }) => (
        <img
          src={row.original.photo || "/profilephoto.jpeg"}
          alt="User"
          className="h-10 w-10 object-cover rounded-full"
        />
      ),
    },
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("phoneNumber")}</div>
      ),
    },
    {
      accessorKey: "lastLog",
      header: "Last Register",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("lastLog")}</div>
      ),
    },
  ];

  return (
    <div className="w-full">
            {loading && <Loader />}
            <div className="bg-white rounded-lg flex justify-between items-center p-5">
            <h2 className="text-xl font-bold text-gray-900">
              Lista de estudiantes individuales
            </h2>
            <BellIcon className="h-6 w-6" />
      </div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Search by name, email or ID"
          className="w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="ghost" onClick={() => setSearchTerm("")}>
          Clear filters
        </Button>
      </div>

      <DataTableDemoTemplate columns={columns} dataToShow={filteredData}  rowClickToNavigate={"/profesor/registrarhoras/estudianteindividual/estudiante"} localstorage_name={"selected_student_profesor"} />

    </div>
  );
}
