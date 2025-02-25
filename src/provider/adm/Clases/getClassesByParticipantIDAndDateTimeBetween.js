import { toast } from "sonner"
export async function getClassesByParticipantIDAndDateTimeBetween(idParticipant, year, month) {
    try {
        const url = `${process.env.REACT_APP_API_URL}/admin/clase/participante?participantID=${idParticipant}&year=${year}&month=${month}`;
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
            teacherId: student.teacherId,
            teacherName: student.teacherName,
            classType: student.classType,
            dateTime: student.dateTime,
            duration: student.duration,
            participantID: student.participantID,
            classScope: student.classScope,
            comment: student.comment,
            topic: student.topic,
            classStatus: student.classStatus,
            plannedDuration: student.plannedDuration,
            classCancellation: student.classCancellation ? {
                id: student.classCancellation.id,
                durationCancelled: student.classCancellation.durationCancelled,
                cancellationReason: student.classCancellation.cancellationReason,
                cancellationTiming: student.classCancellation.cancellationTiming,
                canceledBy: student.classCancellation.canceledBy,
                class_id: student.classCancellation.class_id,
            } : null,
        }));
        toast.success("Estudiantes obtenidos con éxito");
        return classList;
    } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
        toast.error("No hay estudiantes por obtener, intente mas tarde o otra fecha.", error);
        return [];
    }
}
