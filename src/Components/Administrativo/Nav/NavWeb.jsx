import React from "react";
import { Button } from "../../ui/button";
import Nav from "./Nav";
const NavWeb = ()=>{
    return(  
        <div className="hidden md:flex flex-col w-64 bg-blue-900 text-white min-h-screen">
        <div className="p-4">
          <img
            src="/LogoPRofesHorizontal.png"
            alt="Logo"
            className="h-12 mb-6 justify-center"
          />
          <Nav />
        </div>
        <div className="mt-auto p-4">
          <div className="flex items-center gap-2">
            <img
              src="/profilephoto.jpeg"
              alt="User"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Gustavo Xavier</p>
              <Button variant="ghost" className="text-red-500">
                Log out
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
};
export default NavWeb;