# Carpeta `pages`

La carpeta `pages` contiene los componentes principales de la aplicación que representan las diferentes páginas vistas por los usuarios. Cada archivo en esta carpeta corresponde a una ruta específica en la aplicación y define la estructura y el contenido de la página asociada.

## Estructura y Convenciones

- **Componentes de Página**: Cada archivo en la carpeta `pages` representa una página distinta y debe exportar un componente React.
- **Uso de Contenedores**: Los componentes de página suelen importar y utilizar contenedores (desde la carpeta `containers`) para manejar la lógica principal y las interacciones complejas.
- **Componentes Globales y Propios**: Las páginas pueden incluir componentes globales (utilizados en múltiples páginas) y componentes específicos de la página (únicos para esa página).

## Ejemplo de Componente de Página

A continuación, se muestra un ejemplo de cómo podría estructurarse una página utilizando contenedores y componentes.

### Archivo: `HomePage.js`

```jsx
// pages/HomePage.jsx
import React from "react";
import MainContainer from "../containers/MainContainer"; // Contenedor principal que maneja la lógica de la página
import Header from "../components/Header"; // Componente global reutilizable
import Footer from "../components/Footer"; // Componente global reutilizable
import UserList from "../components/UserList"; // Componente específico para mostrar la lista de usuarios
import CustomBanner from "./components/CustomBanner"; // Componente propio de la página <- dentro de la carpeta de la página

function HomePage() {
  return (
    <MainContainer>
      <Header />
      <CustomBanner message="Bienvenido a nuestra plataforma" />
      <h1>Página Principal</h1>
      <UserList /> {/* Lista de usuarios obtenidos desde la API */}
      <Footer />
    </MainContainer>
  );
}

export default HomePage;
```


### Ejemplo de formulario

```jsx
// /components/UserForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useCreateUser from '../hooks/useCreateUser';

// Validación del formulario usando Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Nombre es requerido'),
  email: Yup.string().email('Email inválido').required('Email es requerido')
});

const UserForm: React.FC = () => {
  const { mutate, isLoading, isError, isSuccess } = useCreateUser();

  // Manejo del envío del formulario
  const handleSubmit = (values: { name: string; email: string }) => {
    mutate(values);
  };

  return (
    <div>
      <h1>Crear Usuario</h1>
      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="name">Nombre:</label>
              <Field id="name" name="name" type="text" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <Field id="email" name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Creando...' : 'Crear Usuario'}
            </button>

            {isError && <div>Error al crear el usuario. Intenta nuevamente.</div>}
            {isSuccess && <div>Usuario creado exitosamente.</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
```

### Uso de las Páginas en el Enrutador

```jsx
// Enrutador de la aplicación que define las rutas y las páginas correspondientes
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/UsersPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/contact" component={ContactPage} />
      </Switch>
    </Router>
  );
}

export default App;
```
