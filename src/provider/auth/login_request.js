export default async function postUser(user) {
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    console.log('login usuario', user);
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  
    if (resp.ok) {
      console.log('el cliente se ha agregado correctamente');
    } else {
      console.error('Error al agregar la práctica');
    }
    return resp; // Asegúrate de que esto retorne la respuesta completa
  };
