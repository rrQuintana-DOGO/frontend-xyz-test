/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import statusService from '../../services/status.service';

interface StatusQuery {
  [key: string]: any;
}

const useGetAllStatus = (query: StatusQuery) => {
  return useQuery({
    queryKey: ['status', query],
    queryFn: async () => {
      const data = await statusService.getStatus(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllStatus;
