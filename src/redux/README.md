# Carpeta `redux`

Esta carpeta contiene la configuración de Redux, incluyendo slices para diferentes partes del estado de la aplicación y la configuración del store.

## Ejemplo de Uso

- **Slice de Usuarios:** Define un slice para manejar el estado de los usuarios.

  ```jsx
  // redux/slices/userSlice.js
  import { createSlice } from "@reduxjs/toolkit";

  const userSlice = createSlice({
    name: "user",
    initialState: { user: null },
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      clearUser: (state) => {
        state.user = null;
      },
    },
  });

  export const { setUser, clearUser } = userSlice.actions;
  export default userSlice.reducer;
  ```

- **Configuración del Store:** Configura el store de Redux con los slices definidos.

  ```jsx
  // redux/store.js
  import { configureStore } from "@reduxjs/toolkit";
  import userReducer from "./slices/userSlice";

  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  export default store;
  ```

### Uso de Redux en Componentes

```jsx
// Ejemplo de componente que usa Redux
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../redux/slices/userSlice";

function UserComponent() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(setUser({ name: "John Doe" }));
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

export default UserComponent;
```
