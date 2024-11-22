/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import unitsService from '../../services/units.service';

interface PlaceQuery {
  [key: string]: any;
}

const useGetAllUnits = (query: PlaceQuery) => {
  return useQuery({
    queryKey: ['units', query],
    queryFn: async () => {
      const data = await unitsService.getAllUnits(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllUnits;
