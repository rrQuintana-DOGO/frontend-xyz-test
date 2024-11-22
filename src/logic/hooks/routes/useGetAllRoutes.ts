/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import routesService from '../../services/routes.service';

interface RouteseQuery {
  [key: string]: any;
}

const useGetAllRoutes = (query: RouteseQuery) => {
  return useQuery({
    queryKey: ['routes', query],
    queryFn: async () => {
      const data = await routesService.getAllRoutes(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllRoutes;
