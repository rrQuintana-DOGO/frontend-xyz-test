
### `/utils/README.md`

# Carpeta `utils`

La carpeta `utils` contiene funciones utilitarias y módulos auxiliares que son independientes de los componentes o hooks específicos de la aplicación. Estas funciones proporcionan operaciones comunes y reutilizables que pueden ser utilizadas en diferentes partes de la aplicación.

## Estructura y Convenciones

- Las funciones utilitarias deben ser pequeñas, con una única responsabilidad, y reutilizables.
- Los nombres de los archivos deben reflejar la funcionalidad de las utilidades que contienen.
- Es recomendable organizar las funciones por contexto o propósito si hay una gran cantidad de utilidades.

## Ejemplo de Función Utilitaria

A continuación, se muestra un ejemplo de cómo podría estructurarse una función utilitaria simple.

### Archivo: `formatDate.ts`

```typescript
// formatDate.ts
import moment from 'moment';

/**
 * formateaFecha - Formatea una fecha a un formato legible usando moment.js.
 * @param fecha - Objeto Date que se va a formatear.
 * @param formato - Cadena que especifica el formato deseado (opcional).
 * @returns Fecha formateada en el formato especificado.
 */
function formateaFecha(fecha: Date, formato: string = 'DD/MM/YYYY'): string {
  return moment(fecha).format(formato);
}

export default formateaFecha;

