
# Carpeta `containers`

Los contenedores son componentes de mayor nivel que gestionan el estado y la lógica de la aplicación. Estos componentes suelen incluir otros componentes más pequeños y se encargan de la comunicación con servicios externos y el manejo de eventos.

## Ejemplo de Uso

- **Página de Inicio:** El componente `HomePage` puede actuar como un contenedor que maneja la lógica para mostrar una lista de productos.

  ```jsx
  // containers/HomePage/HomePage.js
  import React, { useState, useEffect } from 'react';
  import ProductList from '../../components/ProductList/ProductList';
  import { fetchProducts } from '../../services/api';

  function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetchProducts().then(setProducts);
    }, []);

    return <ProductList products={products} />;
  }

  export default HomePage;
