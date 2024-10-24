/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import tripsService from '../../services/trips.service';

interface TripsQuery {
  [key: string]: any;
}

const useGetAllTrips = (query: TripsQuery) => {
  return useQuery({
    queryKey: ['trips', query],
    queryFn: async () => {
      const data = await tripsService.getTrips(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllTrips;
