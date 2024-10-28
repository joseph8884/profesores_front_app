export async function createCompany(companyData) {
    const url = 'https://profesoresbackend.onrender.com/admin/equipo/empresa/crear';
    const token = sessionStorage.getItem('jwtToken'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'POST',
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

export async function createTeam(teamData) {
    const url = 'https://profesoresbackend.onrender.com/admin/equipo/crear';
    const token = sessionStorage.getItem('jwtToken'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teamData) // Convert the team data to JSON
        });

        if (!response.ok) {
            throw new Error('Failed to create team');
        }

        const data = await response.json();
        return data; // Return the response data
    } catch (error) {
        console.error('Error creating team:', error);
        throw error;
    }
}

