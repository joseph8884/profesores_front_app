import React from "react";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import Nav from "./Nav";

const NavMobile = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userType");
    window.location.href = "/login";
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
        <Nav />
        <div className="mt-auto p-4">
          <div className="flex items-center gap-2">
            <img
              src="/profilephoto.jpeg"
              alt="User"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Gustavo Xavier</p>
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
