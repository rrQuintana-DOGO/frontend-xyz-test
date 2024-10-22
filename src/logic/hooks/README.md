# Carpeta `hooks`

Esta carpeta contiene hooks personalizados de React que encapsulan lógica reutilizable. Estos hooks pueden utilizar los servicios definidos en la carpeta `/services` para interactuar con APIs, tanto para operaciones de lectura (fetching) como de escritura (mutación).

## Ejemplo de Uso

- **Hook de Datos:** Un hook personalizado que utiliza los servicios de la carpeta `/services` para realizar solicitudes HTTP y manejar el estado de carga, los datos obtenidos y los errores.

- **Hook de Mutación:** Un hook personalizado para crear un nuevo usuario utilizando un servicio y la función de `mutate` para manejar la creación.


## Ejemplo de Uso

- **Hook de Datos:** Un hook personalizado que utiliza los servicios de la carpeta `/services` para realizar solicitudes HTTP y manejar el estado de carga, los datos obtenidos y los errores.

  ```jsx
  // hooks/useFetchData.js
  import { useState, useEffect } from 'react';
  import { fetchUsers } from '../services/api';

  /**
   * useFetchData - Hook personalizado para obtener datos de usuarios.
   * @returns {object} - Un objeto que contiene los datos, el estado de carga y cualquier error.
   */
  function useFetchData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const getUsers = async () => {
        try {
          const response = await fetchUsers();
          setData(response.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      getUsers();
    }, []);

    return { data, loading, error };
  }

  export default useFetchData;
  ```


  ### Uso del Hook de Datos

  ```jsx
  // Ejemplo de componente que usa useFetchData
  import React from 'react';
  import useFetchData from '../../hooks/useFetchData';

  function UserList() {
    const { data, loading, error } = useFetchData();

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  }

  export default UserList;
  ```

### Ejemplo de Hook de Mutación

  A continuación, un ejemplo de un hook que permite crear un usuario utilizando la función `mutate`.

  ```jsx
  // hooks/useCreateUser.js
  import { useState } from 'react';
  import { createUser } from '../services/api';

  /**
   * useCreateUser - Hook personalizado para crear un nuevo usuario.
   * @returns {object} - Un objeto que contiene la función de mutación, el estado de carga y cualquier error.
   */
  function useCreateUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * mutate - Función para crear un nuevo usuario.
     * @param {object} userData - Los datos del usuario a crear.
     * @returns {Promise<object>} - Promesa que resuelve con los datos del usuario creado.
     */
    const mutate = async (userData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await createUser(userData);
        return response.data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return { mutate, loading, error };
  }

  export default useCreateUser;
  ```

### Uso del Hook de Mutación

  ```jsx
  // Ejemplo de componente que usa useCreateUser
  import React, { useState } from 'react';
  import useCreateUser from '../../hooks/useCreateUser';

  function CreateUserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { mutate, loading, error } = useCreateUser();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const newUser = await mutate({ name, email });
        console.log('Usuario creado:', newUser);
      } catch (err) {
        console.error('Error al crear usuario:', err);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Usuario'}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    );
  }

  export default CreateUserForm;
  ```