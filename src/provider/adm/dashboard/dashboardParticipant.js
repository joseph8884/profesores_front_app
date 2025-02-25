import {toast} from "sonner"
export async function dashboardParticipant(idParticipant, year, month) {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/dashboard/participante?participantID=${idParticipant}&year=${year}&month=${month}`; 
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
        monthlyClassStats: data.monthlyClassStats.map(stat => ({
          month: stat.month,
          year: stat.year,
          classesHeld: stat.classesHeld,
          classesCanceled: stat.classesCanceled
        })),
        hoursCanceledParticipantLateVirtual: data.hoursCanceledParticipantLateVirtual,
        hoursCanceledParticipantLateInPerson: data.hoursCanceledParticipantLateInPerson,
        hoursCanceledTeacherLate: data.hoursCanceledTeacherLate,
      };
      return classList;
    } catch (error) {
      toast.error("No se encontro informacion de las clases, por favor intente mas tarde");
      console.error("Error fetching classes:", error);
      return [];
    }
  }