# Carpeta `services`

Esta carpeta contiene los servicios utilizados para realizar solicitudes a APIs externas. Aquí se definen las URLs y los métodos específicos para interactuar con los endpoints de la API. Centralizar las llamadas a la API en esta carpeta permite una mejor organización y reutilización del código, además de facilitar el mantenimiento y las actualizaciones.

## Ejemplo de Uso

- **Archivo de Servicio API:** Un archivo que contiene las funciones de Axios para realizar solicitudes HTTP a diferentes endpoints.

  ```javascript
  // services/api.js
  import axios from 'axios';

  const BASE_URL = 'https://api.example.com';

  // Función para obtener usuarios
  export const fetchUsers = () => {
    return axios.get(`${BASE_URL}/users`);
  };

  // Función para obtener un usuario por ID
  export const fetchUserById = (userId) => {
    return axios.get(`${BASE_URL}/users/${userId}`);
  };

  // Función para crear un nuevo usuario
  export const createUser = (userData) => {
    return axios.post(`${BASE_URL}/users`, userData);
  };
