/* eslint-disable @typescript-eslint/no-explicit-any */
import driversService from '@logic/services/drivers.service';
import { useQuery } from '@tanstack/react-query';

interface DriversQuery {
  [key: string]: any;
}

const useGetAllDrivers = (query: DriversQuery) => {

  return useQuery({
    queryKey: ['drivers', query],
    queryFn: async () => {
      const data = await driversService.getAllDrivers(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllDrivers;
