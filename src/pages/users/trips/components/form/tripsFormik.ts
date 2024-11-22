/* eslint-disable @typescript-eslint/no-explicit-any */
import { transformStringToMoment} from '@utils/transforms/transformDates';
import * as Yup from 'yup';

export const newTripIntialValues = {
  id_ext: '',
  id_trip_type: '',
  id_journey_type: '',
  id_client: '',
  id_route: '',
  carta_porte: '', // No está en el endpoit
  operation: '', // No está en el endpoit
  description: '',

  eda: '', // Se calcula
  eta: '', // Se calcula

  places: [
    {
      id_place: '',
      action: '',
      estimate_departure_date: '',
      estimate_arrive_date: '',
      phase: 1,
    },
    {
      id_place: '',
      action: '',
      estimate_departure_date: '',
      estimate_arrive_date: '',
      phase: 1,
    },
  ],

  id_phase: '', // DEFAULT
  id_status: '', // DEFAULT
  kilometers: '', // DEFAULT 0
  load_size: '', // DEFAULT 0
  fuel_level_start: '', // DEFAULT 0
  fuel_level_end: '', // DEFAULT 0
  events: [],  // DEFAULT []

  id_carrier: '',
  drivers: [''],
  units: [
    {
      id_unit: '',
      id_setpoint: '',
    }
  ],
}

export const tripValidationSchema = Yup.object({
  id_ext: Yup.string().required('Campo requerido'),
  id_trip_type: Yup.string().required('Campo requerido'),
  id_journey_type: Yup.string().required('Campo requerido'),
  id_client: Yup.string().required('Campo requerido'),
  id_route: Yup.string().required('Campo requerido'),
  //description: Yup.string().required('Campo requerido'),
  places: Yup.array().of(
    Yup.object().shape({
      id_place: Yup.string().required('Campo requerido'),
      action: Yup.string().required('Campo requerido'),
      estimate_departure_date: Yup.string().required('Campo requerido'),
      estimate_arrive_date: Yup.string().required('Campo requerido'),
    })
  ),
  //id_phase: Yup.string().required('Campo requerido'),
  //id_status: Yup.string().required('Campo requerido'),
  //kilometers: Yup.number().required('Campo requerido'),
  //load_size: Yup.number().required('Campo requerido'),
  //fuel_level_start: Yup.number().required('Campo requerido'),
  //fuel_level_end: Yup.number().required('Campo requerido'),
  drivers: Yup.array().of(Yup.string().required('Campo requerido')),
  id_carrier: Yup.string().required('Campo requerido'),
  units: Yup.array().of(
    Yup.object().shape({
      id_unit: Yup.string().required('Campo requerido'),
      id_setpoint: Yup.string().required('Campo requerido'),
    })
  ),
});

export function transformToInitialValues(data: any) {
  return {
    id_ext: data.id_ext || '',
    id_trip_type: data.trip_type?.id_trip_type || '',
    id_journey_type: data.journey_type?.id_journey_type || '',
    id_client: data.client?.id_client || '',
    id_route: data.route?.id_route || '',
    carta_porte: '', // No está en el endpoint
    operation: '', // No está en el endpoint
    description: data.description || '',

    eda: data.eda || '', // Se calcula
    eta: data.eta || '', // Se calcula

    places: data.places.map((place: any) => ({
      id_place: place.id_place || '',
      action: place.action || '',
      estimate_departure_date: transformStringToMoment(place.estimate_departure_date) || '',
      estimate_arrive_date: transformStringToMoment(place.estimate_arrive_date) ||'',
      phase: 1,
    })) || [
      {
        id_place: '',
        action: '',
        estimate_departure_date: '',
        estimate_arrive_date: '',
        phase: 1,
      },
      {
        id_place: '',
        action: '',
        estimate_departure_date: '',
        estimate_arrive_date: '',
        phase: 1,
      },
    ],

    id_phase: data.phase?.id_phase || '', // DEFAULT
    id_status: data.status?.id_status || '', // DEFAULT
    kilometers: data.kilometers || 0, // DEFAULT 0
    load_size: data.load_size || 0, // DEFAULT 0
    fuel_level_start: data.fuel_level_start || 0, // DEFAULT 0
    fuel_level_end: data.fuel_level_end || 0, // DEFAULT 0
    events: data.events || [], // DEFAULT []

    id_carrier: data.carrier?.id_carrier || '',
    drivers: data.drivers.map((driver: { id_driver: any; }) => driver.id_driver) || [''],
    units: data.units_setpoints.map((unit: { unit: { id_unit: any; }; setpoint: { id_setpoint: any; }; }) => ({
      id_unit: unit.unit?.id_unit || '',
      id_setpoint: unit.setpoint?.id_setpoint || '',
    })) || [
      {
        id_unit: '',
        id_setpoint: '',
      },
    ],
  };
}

export interface newTripValues {
  id_ext: string;
  id_trip_type: string;
  id_journey_type: string;
  id_client: string;
  id_route: string;
  carta_porte: string;
  operation: string;
  description: string;
  eda: string;
  eta: string;
  places: {
    id_place: string;
    action: string;
    estimate_departure_date: string;
    estimate_arrive_date: string;
  }[];
  id_phase: string;
  id_status: string;
  kilometers: string;
  load_size: string;
  fuel_level_start: string;
  fuel_level_end: string;
  events: string[];
  id_carrier: string;
  drivers: string[];
  units: {
    id_unit: string;
    id_setpoint: string;
  }[];
}