/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import rolesService from '../../services/roles.service';

interface RolesQuery {
  [key: string]: any;
}

const useGetAllRoles = (query: RolesQuery) => {
  return useQuery({
    queryKey: ['roles', query],
    queryFn: async () => {
      const data = await rolesService.getAllRoles(query);
      return data;
    },
    staleTime: 5000,
    retry: (failureCount) => {
      return failureCount < 0;
    },
  });
};

export default useGetAllRoles;
