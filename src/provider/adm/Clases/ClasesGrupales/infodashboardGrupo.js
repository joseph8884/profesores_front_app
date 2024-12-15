import {toast} from "sonner"
export async function infodashboardGrupo(idGroup, year, month) {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/clase/equipo/dashboard/?teamID=${idGroup}&year=${year}&month=${month}`; 
      const token = sessionStorage.getItem("token"); // Retrieve the JWT token from session storage
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      const classList = {
        classesCanceledUser: data.classesCanceledUser,
        classesCanceledTeacher: data.classesCanceledTeacher,
        classesHeldInPerson: data.classesHeldInPerson,
        classesHeldVirtual: data.classesHeldVirtual,
        hoursHeld: data.hoursHeld,
        hoursHeldVirtual: data.hoursHeldVirtual,
        hoursHeldInPerson: data.hoursHeldInPerson,
      };
      return classList;
    } catch (error) {
      toast.error("No se encontro informacion de las clases, por favor intente mas tarde");
      console.error("Error fetching classes:", error);
      return [];
    }
    // Asegúrate de que esto retorne la respuesta completa
  }
  