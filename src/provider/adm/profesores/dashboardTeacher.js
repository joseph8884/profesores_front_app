import { toast } from "sonner";

export async function dashboardTeacher(idTeacher, year, month) {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/profesor/dashboard/?teacherID=${idTeacher}&year=${year}&month=${month}`; 
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
        totalVirtualValue: data.totalVirtualValue,
        totalInPersonValue: data.totalInPersonValue,
        hoursCanceledStudentLateVirtual: data.hoursCanceledStudentLateVirtual,
        hoursCanceledStudentLateInPerson: data.hoursCanceledStudentLateInPerson,
        hoursCanceledTeacherLate: data.hoursCanceledTeacherLate,
      };
      return classList;
    } catch (error) {
      toast.error("Error fetching información classes, intente llenar los datos bancarios o intentelo mas tarde.", error.message);
    }
}