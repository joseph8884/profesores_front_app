import { toast } from "sonner";

export async function dashboardTeacher(idTeacher, year, month) {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/dashboard/profesor?teacherID=${idTeacher}&year=${year}&month=${month}`; 
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
        hoursCanceledParticipantOnTime: data.hoursCanceledParticipantOnTime,
        hoursCanceledTeacherOnTime: data.hoursCanceledTeacherOnTime,
        classesHeldInPerson: data.classesHeldInPerson,
        classesHeldVirtual: data.classesHeldVirtual,
        hoursHeld: data.hoursHeld,
        hoursHeldVirtual: data.hoursHeldVirtual,
        hoursHeldInPerson: data.hoursHeldInPerson,
        hoursPlanned: data.hoursPlanned,
        //-------------------------------------------------------
        totalVirtualValue: data.totalVirtualValue,
        totalInPersonValue: data.totalInPersonValue,
        hoursCanceledParticipantLateVirtual: data.hoursCanceledParticipantLateVirtual,
        hoursCanceledParticipantLateInPerson: data.hoursCanceledParticipantLateInPerson,
        hoursCanceledTeacherLate: data.hoursCanceledTeacherLate,
      };
      return classList;
    } catch (error) {
      toast.error("Error fetching información classes, intente llenar los datos bancarios o intentelo mas tarde.", error.message);
    }
}