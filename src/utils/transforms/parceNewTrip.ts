import { newTripValues } from "@pages/users/trips/components/form/tripsFormik";
import moment from "moment";

export interface TripDetails {
  id_trip_type: string;
  id_journey_type: string;
  id_carrier: string;
  description: string;
  eta: number;
  id_route: string;
  id_client: string;
  eda: number;
  id_phase: string;
  id_status: string;
  kilometers: number;
  load_size: number;
  fuel_level_start: number;
  fuel_level_end: number;
  events: string[];
  places: Place[];
  drivers: string[];
  units_setpoints: UnitSetpoint[];
  id_ext: string;
}

interface Place {
  id_place: string;
  estimate_arrive_date?: number; // Unix timestamp, optional
  estimate_departure_date: number; // Unix timestamp
  real_arrive_date?: number; // Unix timestamp, optional
  real_estimate_departure_date?: number; // Unix timestamp, optional
  action: number;
  phase: number;
}

interface UnitSetpoint {
  id_unit: string;
  id_setpoint: string;
}

export const parseNewTrip = (data: newTripValues) => {
  const trip: TripDetails = {
    id_ext: data.id_ext,
    id_trip_type: data.id_trip_type,
    id_journey_type: data.id_journey_type,
    id_client: data.id_client,
    id_route: data.id_route,
    id_carrier: data.id_carrier,
    description: data.description,
    eta: Math.floor(moment(data.places[data.places.length - 1].estimate_arrive_date).valueOf() / 1000),
    eda: Math.floor(moment(data.places[0].estimate_departure_date).valueOf() / 1000),
    kilometers: 0,
    load_size: 0,
    fuel_level_start: 0,
    fuel_level_end: 0,
    events: [],
    places: data.places.map((place) => ({
      id_place: place.id_place,
      estimate_arrive_date: Math.floor(moment(place.estimate_arrive_date).valueOf() / 1000),
      estimate_departure_date: Math.floor(moment(place.estimate_departure_date).valueOf() / 1000),
      action: Number(place.action),
      phase: 1,
    })),
    drivers: data.drivers,
    units_setpoints: data.units.map((unit) => ({
      id_unit: unit.id_unit,
      id_setpoint: unit.id_setpoint,
    })),
    id_phase: data.id_phase,
    id_status: data.id_status,
  };

  return trip;
}
