export async function getClassesByTeacherAndDateTimeBetweenDays(startDate, endDate) {
    try {
      const url = `${process.env.REACT_APP_API_URL}/profesor/clase/`; 
      const token = sessionStorage.getItem("token"); // Retrieve the JWT token from session storage
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          "Content-Type": "application/json",
        },
      });
      console.log(startDate, endDate);
      const data = await resp.json();
      const classList = data.map((classItem) => ({
        id: classItem.id,
        teacherId: classItem.teacherId,
        teacherName: classItem.teacherName,
        classType: classItem.classType,
        dateTime: classItem.dateTime,
        duration: classItem.duration,
        participantID: classItem.participantID,
        classScope: classItem.classScope,
        comment: classItem.comment,
        topic: classItem.topic,
        classStatus: classItem.classStatus,
        plannedDuration: classItem.plannedDuration,
        classCancellation: classItem.classCancellation,
      }));
      return classList;
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
      return [];
    }
    // Asegúrate de que esto retorne la respuesta completa
  }
  