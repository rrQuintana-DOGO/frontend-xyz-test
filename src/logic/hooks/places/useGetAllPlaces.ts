/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import placesService from '../../services/places.service';

interface PlaceQuery {
  [key: string]: any;
}

const useGetAllPlaces = (query: PlaceQuery) => {
  return useQuery({
    queryKey: ['places', query],
    queryFn: async () => {
      const data = await placesService.getAllPlaces(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllPlaces;
