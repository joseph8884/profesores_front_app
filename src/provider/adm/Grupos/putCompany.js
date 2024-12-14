export async function putCompany(companyData, id) {
    const url = `${process.env.REACT_APP_API_URL}/admin/equipo/empresa/actualizar/${id}`; 
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyData) // Convert the company data to JSON
        });

        if (!response.ok) {
            throw new Error('Failed to create company');
        }

        const data = await response.json();
        return data; // Return the response data
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
}