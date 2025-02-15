import React, {useState}from "react";
import NavMobile from "../Nav/NavMobile";
import NavWeb from "../Nav/NavWeb";
import DateSelecter from "./DateSelecter";
import ListClasses from "./ListClasses";

const RegistrarHoras = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  return (
<div className="flex" style={{ overflowY: 'hidden', height: '100vh', }}>
      <NavMobile />
      <NavWeb />
      <section className="flex-1 p-10 gap-4" style={{ overflowY: 'auto' }}>
        <DateSelecter 
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <h2>Clases disponibles</h2>
        <ListClasses
          startDate={startDate}
          endDate={endDate}        
        />
      </section>
      
    </div>
  );
};

export default RegistrarHoras;
