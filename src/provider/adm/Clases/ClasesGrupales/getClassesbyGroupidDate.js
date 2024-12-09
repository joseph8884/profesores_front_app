export async function getClassesbyGroupIDDate(idGroup, year, month) {
    try {
      const url = `https://profesoresbackend.onrender.com/admin/clase/equipo/clases/?teamID=${idGroup}&year=${year}&month=${month}`; 
      const token = sessionStorage.getItem("token"); // Retrieve the JWT token from session storage
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      const classList = data.map((group) => ({
        id: group.id,
        teacherID: group.teacherID,
        classType: group.classType,
        dateTime: group.dateTime,
        duration: group.duration,
        teamID: group.teamID,
        comment: group.comment,
        topic: group.topic,
        classHeld: group.classHeld,
        cancellationReason: group.cancellationReason,
        cancellationTiming: group.cancellationTiming,
        canceledBy: group.canceledBy,
      }));
      return classList;
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
      return [];
    }
  }
  