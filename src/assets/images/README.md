- **Imágenes:** Utiliza la carpeta `/assets/images` para almacenar todas las imágenes que necesites en tu aplicación.
  
  ```jsx
  import logo from '../assets/images/logo.png';

  function Header() {
    return <img src={logo} alt="Logo de la Empresa" />;
  }
