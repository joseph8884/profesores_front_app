import React from "react";
import NavMobile from "../Nav/NavMobile";
import NavWeb from "../Nav/NavWeb";
import DateSelecter from "./DateSelecter";

const RegistrarHoras = () => {
  return (
<div className="flex" style={{ overflowY: 'hidden', height: '100vh', }}>
      <NavMobile />
      <NavWeb />
      <DateSelecter />
    </div>
  );
};

export default RegistrarHoras;
