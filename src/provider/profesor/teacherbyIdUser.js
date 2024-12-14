
export async function teacherbyIdUser(IdUser) {
    try {
      const url = `${process.env.REACT_APP_API_URL}/profesor/informacion/?idUser=${IdUser}`; 
      const token = sessionStorage.getItem("token"); // Retrieve the JWT token from session storage
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      const profesorData = {
        id: data.id,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        emergencyContact: data.emergencyContact,
        identificationNumber: data.identificationNumber,
        status: data.status,
        registerDate: data.registerDate,
        username: data.username,
      };
      return profesorData;
    } catch (error) {
      console.error("Error fetching classes:", error);
      return [];
    }
    // Asegúrate de que esto retorne la respuesta completa
  }
  