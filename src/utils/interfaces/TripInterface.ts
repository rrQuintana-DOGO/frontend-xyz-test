
interface Driver {
  id_driver: string;
  name: string;
  license: string;
}

interface Event {
  id_event: string;
  name: string;
  description: string;
  timestamp: string;
}

interface UnitSetpoint {
  id_unit_setpoint: string;
  name: string;
  value: string;
}

interface TripStatus {
  id_status: string;
  name: string;
  status: boolean;
}

interface TripType {
  id_trip_type: string;
  name: string;
  description: string;
  status: boolean;
}

interface JourneyType {
  id_journey_type: string;
  name: string;
  description: string;
  status: boolean;
}

interface Carrier {
  id_carrier: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: boolean;
}

interface Route {
  id_route: string;
  name: string;
  description: string;
  version: number;
  status: boolean;
}

interface Client {
  id_client: string;
  name: string;
  company_name: string;
  address: string;
  status: boolean;
}

interface Phase {
  id_phase: string;
  name: string;
  status: boolean;
  symbol: string;
}

interface Place {
  id_place: string;
  name: string;
  estimate_arrive_date: string; // Timestamp en formato string
  real_arrive_date: string; // Timestamp en formato string
  places: Place;
}

interface TripData {
  id_trip: string;
  id_ext: string;
  eda: number;
  kilometers: number;
  description: string;
  load_size: number;
  fuel_level_start: number;
  fuel_level_end: number;
  status: TripStatus;
  trip_type: TripType;
  journey_type: JourneyType;
  carrier: Carrier;
  route: Route;
  client: Client;
  phase: Phase;
  eta: string; // ETA en formato string
  created_at: string; // Fecha de creación
  drivers: Driver[]; // Lista de conductores
  events: Event[]; // Lista de eventos
  units_setpoints: UnitSetpoint[]; // Lista de unidades de setpoints
  places: Place[]; // Array de lugares
  origin: Place; // Origen del viaje
  destination: Place; // Destino del viaje
  estimatedArrival: string; // Estimación de llegada
}

export type {
  TripData,
  Driver,
  Event,
  UnitSetpoint,
  TripStatus,
  TripType,
  JourneyType,
  Carrier,
  Route,
  Client,
  Phase,
  Place,
};