/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import carriersService from '../../services/carriers.service';

interface CarrierQuery {
  [key: string]: any;
}

const useGetAllCarriers = (query: CarrierQuery) => {
  return useQuery({
    queryKey: ['carriers', query],
    queryFn: async () => {
      const data = await carriersService.getAllCarriers(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllCarriers;
