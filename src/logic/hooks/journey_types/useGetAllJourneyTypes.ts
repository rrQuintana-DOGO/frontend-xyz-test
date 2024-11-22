/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import journeyTypesService from '../../services/journey_types.service';

interface PlaceQuery {
  [key: string]: any;
}

const useGetAllJourneyTypes = (query: PlaceQuery) => {
  return useQuery({
    queryKey: ['journey_types', query],
    queryFn: async () => {
      const data = await journeyTypesService.getAllJourneyTypes(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllJourneyTypes;
