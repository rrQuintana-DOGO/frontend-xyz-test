/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import trips from '../../../mocks/trips.json';

interface TripsQuery {
  [key: string]: any;
}

const useGetAllTrips = (query: TripsQuery) => {
  return useQuery({
    queryKey: ['trips', query],
    queryFn: async () => {
      const data = trips;

      // Simulación de una llamada al backend con un retraso de 1 segundo
      await new Promise((resolve) => setTimeout(resolve, 500));

      return data;
    },
    staleTime: 5000, // El tiempo durante el cual los datos se consideran "frescos"
    retry: (failureCount) => {
      // Definimos que no reintente si hay un error (solo para simulación)
      return failureCount < 0;
    },
  });
};

export default useGetAllTrips;
