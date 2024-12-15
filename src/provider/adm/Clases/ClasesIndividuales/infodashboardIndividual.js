import { toast } from "sonner";
export async function infodashboardIndividual(idStudent, year, month) {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/clase/individual/dashboard/?studentID=${idStudent}&year=${year}&month=${month}`; 
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
      console.error("Error al obtener los estudiantes:", error);
      toast.error("No informacion de los estudiantes por obtener, intente mas tarde o otra fecha.", error);
      return [];
    } 
  }
  