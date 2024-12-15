import { toast } from "sonner";
export async function individualclassesByTeacherAndYearMonth(idStudent, year, month) {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/clase/individual/clases/profesor/?teacherID=${idStudent}&year=${year}&month=${month}`; 
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
        studentID: student.studentID,
        comment: student.comment,
        topic: student.topic,
        classHeld: student.classHeld,
        cancellationReason: student.cancellationReason,
        cancellationTiming: student.cancellationTiming,
        canceledBy: student.canceledBy,
      }));
      toast.success("Estudiantes obtenidos con éxito");
      return classList;
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
      toast.error("No hay estudiantes por obtener, intente mas tarde o otra fecha.", error);
      return [];
    }
  }
  