import React, {useState, useEffect} from "react";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import Nav from "./Nav";
import {teacherbyIdUser} from "../../../provider/profesor/teacherbyIdUser"

const NavMobile = () => {
  const [profesorData, setProfesorData] = useState({});
  useEffect(() => {
    const fetchProfesorData = async () => {

        const token_from_sessionStorage = sessionStorage.getItem('token');
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
      const profe = await teacherbyIdUser(parseInt(data.id));
      setProfesorData(profe);
    }
    fetchProfesorData();
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userType");
    window.location.href = "/";
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Este botón será visible solo en pantallas pequeñas */}
        <Button variant="outline" className="md:hidden">
          ☰
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 md:flex flex-col w-64 bg-blue-900 text-white min-h-screen"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Menú</SheetTitle>
        </SheetHeader>
        <Nav profesorId={profesorData.id} nombre={profesorData.fullName}/>
        <div className="mt-auto p-4">
          <div className="flex items-center gap-2">
            <img
              src="/profilephoto.jpeg"
              alt="User"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{profesorData.fullName}</p>
              <Button variant="ghost" className="text-red-500" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default NavMobile;
