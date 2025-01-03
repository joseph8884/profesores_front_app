import { toast } from "sonner";
export async function infodashboardIndividual(idStudent, year, month) {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/clase/individual/dashboard/?studentID=${idStudent}&year=${year}&month=${month}`; 
      const token = sessionStorage.getItem("token"); 
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      const classList = {
        hoursCanceledStudentOnTime: data.hoursCanceledStudentOnTime,
        hoursCanceledTeacherOnTime: data.hoursCanceledTeacherOnTime,
        classesHeldInPerson: data.classesHeldInPerson,
        classesHeldVirtual: data.classesHeldVirtual,
        hoursHeld: data.hoursHeld,
        hoursHeldVirtual: data.hoursHeldVirtual,
        hoursHeldInPerson: data.hoursHeldInPerson,
        monthlyClassStats: data.monthlyClassStats.map(stat => ({
          month: stat.month,
          year: stat.year,
          classesHeld: stat.classesHeld,
          classesCanceled: stat.classesCanceled
        })),
        hoursCanceledStudentLateVirtual: data.hoursCanceledStudentLateVirtual,
        hoursCanceledStudentLateInPerson: data.hoursCanceledStudentLateInPerson,
        hoursCanceledTeacherLate: data.hoursCanceledTeacherLate,
      };
      return classList;
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
      toast.error("No informacion de los estudiantes por obtener, intente mas tarde o otra fecha.", error);
    } 
  }