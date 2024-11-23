/* eslint-disable @typescript-eslint/no-explicit-any */
import timeZonesService from '@logic/services/time_zones.service';
import { useQuery } from '@tanstack/react-query';

interface TimeZonesQuery {
  [key: string]: any;
}

const useGetAllTimeZones = (query: TimeZonesQuery) => {
  return useQuery({
    queryKey: ['time_zones', query],
    queryFn: async () => {
      const data = await timeZonesService.getAllTimeZones(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllTimeZones;
