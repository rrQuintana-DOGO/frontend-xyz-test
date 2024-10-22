# Carpeta `components`

Esta carpeta contiene componentes reutilizables y de bajo nivel que se pueden utilizar en diferentes partes de la aplicación. Estos componentes generalmente no manejan lógica de negocio o estado de la aplicación.

## Ejemplo de Uso

- **Fuentes:** Crea un componente de botón genérico que pueda ser reutilizado en varios lugares de la aplicación.

  ```jsx
  // components/Button/Button.js
  import "./Button.css";

  function Button({ label, onClick }) {
    return (
      <button className="button" onClick={onClick}>
        {label}
      </button>
    );
  }

  export default Button;
  ```

  ```jsx
  // Uso del componente Button
  import Button from "./components/Button/Button";

  function App() {
    return <Button label="Click Me" onClick={() => alert("Button clicked!")} />;
  }
  ```
