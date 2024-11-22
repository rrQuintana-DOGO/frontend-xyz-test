/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import phasesService from '../../services/phases.service';

interface PhaseseQuery {
  [key: string]: any;
}

const useGetAllPhases = (query: PhaseseQuery) => {
  return useQuery({
    queryKey: ['phases', query],
    queryFn: async () => {
      const data = await phasesService.getAllPhases(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllPhases;
