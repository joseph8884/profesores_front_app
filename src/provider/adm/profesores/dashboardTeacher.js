import { toast } from "sonner";

export async function dashboardTeacher(idTeacher, year, month) {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/profesor/dashboard/?teacherID=${idTeacher}&year=${year}&month=${month}`; 
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
        totalVirtualValue: data.totalVirtualValue,
        totalInPersonValue: data.totalInPersonValue,
      };
      return classList;
    } catch (error) {
      toast.error("Error fetching información classes, intente llenar los datos bancarios o intentelo mas tarde.", error.message);
      console.error("Error fetching classes:", error);
      return [];
    }
    // Asegúrate de que esto retorne la respuesta completa
  }
  