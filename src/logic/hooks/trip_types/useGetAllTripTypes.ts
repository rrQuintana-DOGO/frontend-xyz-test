/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import tripTypesService from '../../services/trips_types.service';

interface PlaceQuery {
  [key: string]: any;
}

const useGetAllTripTypes = (query: PlaceQuery) => {
  return useQuery({
    queryKey: ['trip_types', query],
    queryFn: async () => {
      const data = await tripTypesService.getAllTripTypes(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllTripTypes;
