/* eslint-disable @typescript-eslint/no-explicit-any */
import setponitsService from '@logic/services/setpoints.service';
import { useQuery } from '@tanstack/react-query';

interface SetponitseQuery {
  [key: string]: any;
}

const useGetAllSetponits = (query: SetponitseQuery) => {
  return useQuery({
    queryKey: ['setponits', query],
    queryFn: async () => {
      const data = await setponitsService.getAllSetpoints(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllSetponits;
