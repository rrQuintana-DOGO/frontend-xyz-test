import { TripData } from "./TripInterface";

interface Place {
  id_place: string; // Identificador único del lugar
  id_place_type?: string; // Opcional: Identificador del tipo de lugar
  id_geofence?: string; // Opcional: Identificador de la geocerca asociada
  name?: string; // Opcional: Nombre del lugar
  location?: string; // Opcional: Ubicación del lugar
  address?: string; // Opcional: Dirección del lugar
  status?: boolean; // Opcional: Estado del lugar (activo/inactivo)
  place_has_contacts?: PlaceContact[]; // Opcional: Lista de contactos asociados al lugar
  geofences?: Geofence; // Opcional: Geocerca asociada
  place_types?: PlaceType; // Opcional: Tipo de lugar
  trips_has_places?: TripPlace[]; // Opcional: Lista de viajes asociados al lugar
}

// Interfaces adicionales para las relaciones
interface PlaceContact {
  id_place_has_contact: string;
  id_place: string;
  id_contact: string;
  contacts: Contact; // Detalles del contacto
  places: Place; // Detalles del lugar
}

interface Geofence {
  id_geofence: string;
  name?: string;
  id_geofence_type?: string;
  coords?: object; // Coordenadas del área de la geocerca
  status?: boolean;
}

interface PlaceType {
  id_place_type: string;
  name?: string;
  status?: boolean;
}

interface TripPlace {
  id_trip_has_place: string;
  id_trip: string;
  id_place: string;
  trips: TripData; // Detalles del viaje
  places: Place; // Detalles del lugar
}

interface Contact {
  id_contact: string;
  name?: string;
  phone?: string;
  email?: string;
  status?: boolean;
}