export async function teamClassesByTeacherIdAndYearMonth(idTeacher, year, month) {
    try {
      const url = `https://profesoresbackend.onrender.com/profesor/equipo/clases/profesor/?teacherID=${idTeacher}&year=${year}&month=${month}`; 
      const token = sessionStorage.getItem("token"); // Retrieve the JWT token from session storage
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      const classList = data.map((student) => ({
        id: student.id,
        teacherID: student.teacherID,
        classType: student.classType,
        dateTime: student.dateTime,
        duration: student.duration,
        teamID: student.teamID,
        comment: student.comment,
        topic: student.topic,
        classHeld: student.classHeld,
        cancellationReason: student.cancellationReason,
        cancellationTiming: student.cancellationTiming,
        canceledBy: student.canceledBy,
      }));
      return classList;
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
      return [];
    }
    // Asegúrate de que esto retorne la respuesta completa
  }
  