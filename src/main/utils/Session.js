import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Session() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api-siblab/session/'); // hacer la petición para obtener la sesión del usuario
        setUser(response.data); // actualizar el estado con los datos de sesión del usuario
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <p>Hola {user.name}!</p> // mostrar información personalizada del usuario si se encuentra logueado
      ) : (
        <p>No has iniciado sesión.</p> // mostrar mensaje por defecto si no hay usuario logueado
      )}
    </div>
  );
}

export default Session;
