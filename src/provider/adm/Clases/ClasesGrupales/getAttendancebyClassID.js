
export async function getAttendancebyClassID(idClass) {
    try {
      const url = `${process.env.REACT_APP_API_URL}/admin/clase/equipo/asistencia/clase/${idClass}`; 
      const token = sessionStorage.getItem("token"); // Retrieve the JWT token from session storage
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      const classList = data.map((attendance) => ({
        id: attendance.id,
        classID: attendance.classID,
        studentTeamID: attendance.studentTeamID,
        attended: attendance.attended,
      }));
      return classList;
    } catch (error) {
      return ;
    }
  }
  