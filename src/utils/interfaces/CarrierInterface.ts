import { TripData } from "./TripInterface";

interface Carrier {
  id_carrier: string; // Identificador único del transportista
  name?: string; // Nombre del transportista (opcional)
  phone?: string; // Número de teléfono del transportista (opcional)
  email?: string; // Correo electrónico del transportista (opcional)
  address?: string; // Dirección del transportista (opcional)
  status?: boolean; // Estado del transportista (activo/inactivo, opcional)
  carrier_has_contacts?: CarrierHasContact[]; // Relación con los contactos del transportista
  carrier_has_drivers?: CarrierHasDriver[]; // Relación con los conductores del transportista
  carrier_has_units?: CarrierHasUnit[]; // Relación con las unidades del transportista
  trips?: TripData[]; // Relación con los viajes asignados al transportista
}

interface CarrierHasContact {
  id_carrier_has_contact: string; // Identificador único de la relación
  id_contact?: string; // Identificador del contacto (opcional)
  id_carrier?: string; // Identificador del transportista (opcional)
  carriers?: Carrier; // Relación con el transportista
  contacts?: Contact; // Relación con el contacto
}

interface CarrierHasDriver {
  id_carrier_has_driver: string; // Identificador único de la relación
  id_carrier?: string; // Identificador del transportista (opcional)
  id_driver?: string; // Identificador del conductor (opcional)
  carriers?: Carrier; // Relación con el transportista
  drivers?: Driver; // Relación con el conductor
}

interface CarrierHasUnit {
  id_carrier_has_unit: string; // Identificador único de la relación
  id_unit?: string; // Identificador de la unidad (opcional)
  id_carrier?: string; // Identificador del transportista (opcional)
  carriers?: Carrier; // Relación con el transportista
}

interface Contact {
  id_contact: string; // Identificador único del contacto
  // Otras propiedades del contacto según tu modelo
}

interface Driver {
  id_driver: string; // Identificador único del conductor
  // Otras propiedades del conductor según tu modelo
}
